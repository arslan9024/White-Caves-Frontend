import { ContractParty, ViewingFormPayload } from '../HenryPdfEngineService';
import { ScanReview, canUseScan, saveReviewedScan, scanExpiry, validScanDate, VaultSaveOptions } from '../henryScanReview';
import henryEmiratesIdScannerService from '../HenryEmiratesIdScannerService';
import { readDocumentFields, normalizeDocumentDate, normalizeDocumentText, refreshCoverage, flagDocumentConflicts } from '../henryDocumentParsing';
import logger from '../../utils/logger';
import type { InternationalPassportExtractedData } from './henryPassport.types';
import { ARSLAN_MALIK_SAMPLE_PASSPORT } from './henryPassport.samples';
import { formatCnicNumber, parseTD3Mrz } from './mrzTd3Parser';

class HenryPassportScannerService {
  private inMemoryCache: InternationalPassportExtractedData | null = null;
  private listeners: Set<(data: InternationalPassportExtractedData | null) => void> = new Set();

  /**
   * Keeps extracted Passport data in session memory only
   */
  setCachedPassport(data: InternationalPassportExtractedData): void {
    if (!canUseScan(data)) return;
    this.inMemoryCache = structuredClone(data);
    this.notifyListeners(this.inMemoryCache);
  }

  /**
   * Retrieves active Passport from temporary session cache
   */
  getCachedPassport(): InternationalPassportExtractedData | null {
    if (this.inMemoryCache && canUseScan(this.inMemoryCache)) return this.refreshValidity(structuredClone(this.inMemoryCache));
    return null;
  }

  /**
   * Clears the active Passport session cache
   */
  clearCachedPassport(): void {
    this.inMemoryCache = null;
    this.notifyListeners(null);
  }

  /**
   * Registers a subscriber listener to receive active Passport cache mutations
   */
  onPassportUpdated(listener: (data: InternationalPassportExtractedData | null) => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notifyListeners(data: InternationalPassportExtractedData | null): void {
    this.listeners.forEach((listener) => {
      try {
        listener(data ? structuredClone(data) : null);
      } catch (err) {
        logger.error('Henry passport cache listener failed', { errorName: err instanceof Error ? err.name : 'UnknownError' });
      }
    });
  }

  formatCnicNumber(rawNumber: string): string {
    return formatCnicNumber(rawNumber);
  }

  parseTD3Mrz(line1: string, line2: string): Partial<InternationalPassportExtractedData> {
    return parseTD3Mrz(line1, line2);
  }

  /**
   * Scans an uploaded Passport bio-data page or preloaded reference sample
   */
  async scanPassport(fileOrPreset?: File | 'sample'): Promise<InternationalPassportExtractedData> {
    if (!fileOrPreset || fileOrPreset === 'sample') {
      this.clearCachedPassport();
      const demo = {
        ...structuredClone(ARSLAN_MALIK_SAMPLE_PASSPORT),
        demoOnly: true, reviewConfirmed: false,
        scannedAt: new Date().toISOString(),
      };
      return demo;
    }

    this.clearCachedPassport();
    if (!['application/pdf', 'image/png', 'image/jpeg'].includes(fileOrPreset.type) ||
      !fileOrPreset.size || fileOrPreset.size > 10 * 1024 * 1024)
      throw new Error('Upload a non-empty PDF, JPEG or PNG up to 10 MB.');
    const extraction = await henryEmiratesIdScannerService.extractDocumentText(fileOrPreset, undefined, text => {
      const parsed = this.parsePassportText(text);
      return [!!parsed.passportNumber, !!parsed.fullName, !!(parsed.issuingCountry || parsed.issuingCountryCode),
        validScanDate(parsed.dateOfBirth), validScanDate(parsed.dateOfExpiry)].filter(Boolean).length / 5;
    });
    const result = this.parsePassportText([extraction.ocrText, extraction.streamText].filter(Boolean).join('\n'));
    result.documentFormat = fileOrPreset.type;
    result.diagnostics!.ocrConfidence = extraction.ocrConfidence;
    result.diagnostics!.warnings.push(...(extraction.warnings || []));
    return result;
  }

  parsePassportText(text: string): InternationalPassportExtractedData {
    const { values, diagnostics } = readDocumentFields(text, {
      passportNumber: ['Passport Number', 'Passport No.', 'Passport No', 'رقم الجواز', 'رقم جواز السفر'],
      fullName: ['Full Name', 'Name', 'الاسم الكامل', 'الاسم'],
      surname: ['Surname', 'اسم العائلة', 'اللقب'], givenNames: ['Given Names', 'Given Name(s)', 'Given Name', 'الأسماء'],
      issuingCountry: ['Issuing Country', 'بلد الإصدار'], issuingCountryCode: ['Country Code', 'رمز الدولة'],
      nationality: ['Nationality', 'الجنسية'], nationalityCode: ['Nationality Code'],
      dateOfBirth: ['Date of Birth', 'Birth Date', 'تاريخ الميلاد'],
      dateOfExpiry: ['Date of Expiry', 'Expiry Date', 'تاريخ الانتهاء'],
      dateOfIssue: ['Date of Issue', 'Issue Date', 'تاريخ الإصدار'],
      gender: ['Sex', 'Gender', 'الجنس'], placeOfBirth: ['Place of Birth', 'مكان الميلاد'],
      fatherName: ['Father Name', 'اسم الأب'], nationalIdentityNumber: ['National ID', 'Identity Number', 'رقم الهوية'],
      issuingAuthority: ['Issuing Authority', 'سلطة الإصدار'], bookletNumber: ['Booklet Number'],
      trackingNumber: ['Tracking Number'], passportType: ['Passport Type'],
    });
    const value = (key: string) => values[key]?.[0] || '';
    flagDocumentConflicts(diagnostics);
    const lines = normalizeDocumentText(text).toUpperCase().split('\n').map(line => line.replace(/\s/g, ''));
    const pairs = lines.flatMap((line, index) => /^P[A-Z<][A-Z<]{42}$/.test(line)
      ? [{ line1: line, line2: lines[index + 1] || '' }] : []);
    const candidates = pairs.map(pair => this.parseTD3Mrz(pair.line1, pair.line2));
    const validCandidates = candidates.filter(candidate => !!candidate.passportNumber);
    const result: InternationalPassportExtractedData = {
      passportNumber: value('passportNumber'), passportType: value('passportType'),
      issuingCountry: value('issuingCountry'), issuingCountryCode: value('issuingCountryCode'),
      bookletNumber: value('bookletNumber'), trackingNumber: value('trackingNumber'),
      issuingAuthority: value('issuingAuthority'), surname: value('surname'), givenNames: value('givenNames'),
      fullName: value('fullName'), fatherName: value('fatherName'), nationalIdentityNumber: value('nationalIdentityNumber'),
      dateOfBirth: normalizeDocumentDate(value('dateOfBirth')), gender: /^(M|MALE|ذكر)$/i.test(value('gender')) ? 'M' : /^(F|FEMALE|أنثى)$/i.test(value('gender')) ? 'F' : '',
      placeOfBirth: value('placeOfBirth'), nationality: value('nationality'), nationalityCode: value('nationalityCode'),
      dateOfIssue: normalizeDocumentDate(value('dateOfIssue')), dateOfExpiry: normalizeDocumentDate(value('dateOfExpiry')),
      isExpired: false, validityYears: 0, mrz: validCandidates[0]?.mrz || pairs[0] || { line1: '', line2: '' },
      confidenceScore: 0, scannedAt: new Date().toISOString(), demoOnly: false, reviewConfirmed: false, diagnostics,
    };
    for (const [key, candidate] of validCandidates.flatMap(mrz => Object.entries(mrz))) {
      if (!candidate || typeof candidate !== 'string') continue;
      const current = result[key as keyof InternationalPassportExtractedData];
      const equivalent = (a: string, b: string) => a.toUpperCase().replace(/[^A-Z0-9]/g, '') === b.toUpperCase().replace(/[^A-Z0-9]/g, '');
      const evidence = diagnostics.fields[key];
      if (evidence?.state === 'conflict' || current && typeof current === 'string' && !equivalent(current, candidate))
        diagnostics.fields[key] = { state: 'conflict', source: 'mrz',
          values: [...new Set([...(evidence?.values || []), ...(typeof current === 'string' && current ? [current] : []), candidate])] };
      else if (!current) {
        Object.assign(result, { [key]: candidate });
        diagnostics.fields[key] = { state: 'extracted', source: 'mrz', values: [candidate] };
      }
    }
    if (!result.fullName && (result.givenNames || result.surname)) {
      result.fullName = `${result.givenNames} ${result.surname}`.trim();
      diagnostics.fields.fullName = { state: 'derived', source: 'text', values: [result.fullName] };
    }
    for (const [key, start, end] of [['dateOfBirth', 13, 19], ['dateOfExpiry', 21, 27]] as const) {
      const readings = [...new Set(validCandidates.map(candidate => candidate.mrz!.line2.slice(start, end)))];
      const visible = result[key];
      const evidence = diagnostics.fields[key];
      if (readings.length > 1 || visible && readings.some(raw => visible.split('/').reverse().join('').slice(2) !== raw))
        diagnostics.fields[key] = { state: 'conflict', source: 'mrz',
          values: [...new Set([...(evidence?.values || []), ...readings])] };
    }
    if (validCandidates.length < pairs.length) diagnostics.warnings.push('TD3 MRZ failed format or check digits; review visible fields.');
    if (!result.dateOfBirth || !result.dateOfExpiry) diagnostics.warnings.push('Four-digit date years require visible source evidence or manual review; MRZ centuries are not guessed.');
    refreshCoverage(diagnostics);
    return this.refreshValidity(result);
  }

  refreshValidity(data: InternationalPassportExtractedData): InternationalPassportExtractedData {
    const validityYears = validScanDate(data.dateOfIssue) && validScanDate(data.dateOfExpiry)
      ? Math.max(0, Math.round((Date.parse(data.dateOfExpiry.split('/').reverse().join('-')) -
        Date.parse(data.dateOfIssue.split('/').reverse().join('-'))) / (365.25 * 86400000))) : 0;
    return { ...data, isExpired: scanExpiry(data.dateOfExpiry).isExpired, validityYears };
  }

  /**
   * Alias for scanPassport conforming to standard document ingestion interfaces
   */
  async scanDocument(
    fileOrPreset?: File | 'sample'
  ): Promise<InternationalPassportExtractedData> {
    return this.scanPassport(fileOrPreset);
  }

  /**
   * Returns demo scanned Passport data (Arslan Malik - DR0760143)
   */
  getDemoExtractedData(): InternationalPassportExtractedData {
    this.clearCachedPassport();
    const demo = { ...structuredClone(ARSLAN_MALIK_SAMPLE_PASSPORT), scannedAt: new Date().toISOString(), demoOnly: true, reviewConfirmed: false };
    return demo;
  }

  /**
   * Converts Extracted Passport data into a ContractParty object for Tenancy Contracts
   */
  toContractParty(
    extracted: InternationalPassportExtractedData,
    phone: string = '',
    email: string = ''
  ): ContractParty {
    if (!canUseScan(extracted)) throw new Error('Passport review required; benchmark extraction cannot autofill.');
    return {
      name: extracted.fullName,
      emiratesIdOrPassport: `Passport: ${extracted.passportNumber} (${extracted.issuingCountryCode})`,
      phone,
      email,
    };
  }

  /**
   * Converts Extracted Passport into a Form B Viewing Register client payload
   */
  toViewingClientPayload(
    extracted: InternationalPassportExtractedData,
    basePayload: Partial<ViewingFormPayload> = {}
  ): Partial<ViewingFormPayload> {
    if (!canUseScan(extracted)) throw new Error('Passport review required; benchmark extraction cannot autofill.');
    return {
      ...basePayload,
      clientName: extracted.fullName,
      clientPassportOrEid: `Passport: ${extracted.passportNumber}`,
    };
  }

  /**
   * Exports extracted data as a structured JSON object
   */
  exportToJson(extracted?: InternationalPassportExtractedData): Record<string, any> {
    const data = extracted || this.getCachedPassport() || ARSLAN_MALIK_SAMPLE_PASSPORT;
    return JSON.parse(JSON.stringify(data));
  }

  /**
   * Exports extracted data as a formatted JSON string
   */
  exportToJsonString(extracted?: InternationalPassportExtractedData): string {
    return JSON.stringify(this.exportToJson(extracted), null, 2);
  }

  /**
   * Persists extracted Passport record to backend database and session cache
   */
  async saveToDatabase(extracted?: InternationalPassportExtractedData, options: VaultSaveOptions = {}): Promise<{ success: boolean; id?: string; error?: string }> {
    if (!extracted) return { success: false, error: 'Review required. Nothing was saved.' };
    return saveReviewedScan('passport', extracted, extracted.passportNumber, extracted.fullName, options);
  }
}

export { HenryPassportScannerService };
export const henryPassportScannerService = new HenryPassportScannerService();
export default henryPassportScannerService;

