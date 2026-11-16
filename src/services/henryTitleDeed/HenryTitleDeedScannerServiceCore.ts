import { TenancyContractPayload, ContractParty } from '../HenryPdfEngineService';
import henryEmiratesIdScannerService from '../HenryEmiratesIdScannerService';
import {
  ScanReview,
  VaultSaveOptions,
  canUseScan,
  saveReviewedScan,
  validScanDate,
} from '../henryScanReview';
import type { DldTitleDeedExtractedData, DeedOwner } from './henryTitleDeed.types';
import { VIRIDIS_504_SAMPLE_TITLE_DEED, BUKO_COMMODITY_MADINAT_HIND_TITLE_DEED_SAMPLE } from './henryTitleDeed.samples';
import { parseTitleDeedDocumentText } from './henryTitleDeedParser';

class HenryTitleDeedScannerService {
  private cacheRevision = 0;
  private inMemoryCache: DldTitleDeedExtractedData | null = null;
  private listeners: Set<(data: DldTitleDeedExtractedData | null) => void> = new Set();

  /**
   * Keeps reviewed Title Deed data in session memory only
   */
  setCachedTitleDeed(data: DldTitleDeedExtractedData): void {
    this.cacheRevision++;
    if (!canUseScan(data)) {
      this.clearCachedTitleDeed();
      return;
    }
    this.inMemoryCache = structuredClone(data);
    this.notifyListeners(this.inMemoryCache);
  }

  /**
   * Retrieves active Title Deed from temporary session cache
   */
  getCachedTitleDeed(): DldTitleDeedExtractedData | null {
    if (this.inMemoryCache) return structuredClone(this.inMemoryCache);
    return null;
  }

  /**
   * Clears the active Title Deed session cache
   */
  clearCachedTitleDeed(): void {
    this.cacheRevision++;
    this.inMemoryCache = null;
    this.notifyListeners(null);
  }

  /**
   * Registers a subscriber listener to receive active Title Deed cache mutations
   */
  onTitleDeedUpdated(listener: (data: DldTitleDeedExtractedData | null) => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  /**
   * Returns benchmark reference sample 2 (BUKO COMMODITY DMCC - Plot 7354 Madinat Hind 4)
   */
  getBukoSample(): DldTitleDeedExtractedData {
    const sample = {
      ...BUKO_COMMODITY_MADINAT_HIND_TITLE_DEED_SAMPLE,
      scannedAt: new Date().toISOString(),
      demoOnly: true,
      reviewConfirmed: false,
      isBlockchainVerified: false,
    };
    return sample;
  }

  private notifyListeners(data: DldTitleDeedExtractedData | null): void {
    this.listeners.forEach(listener => {
      try {
        listener(data ? structuredClone(data) : null);
      } catch (err) {
        console.error('Error notifying Henry Title Deed cache listener:', err);
      }
    });
  }
  /**
   * Scans an uploaded Title Deed PDF / image or returns reference sample
   */
  async scanTitleDeed(
    fileOrPreset?: File | 'sample' | 'sample_viridis' | 'sample_buko'
  ): Promise<DldTitleDeedExtractedData> {
    if (!fileOrPreset) throw new Error('Upload a title deed to scan.');
    if (typeof fileOrPreset === 'string')
      return fileOrPreset === 'sample_buko' ? this.getBukoSample() : this.getDemoExtractedData();
    const file = fileOrPreset;
    if (
      !['image/png', 'image/jpeg', 'application/pdf'].includes(file.type) ||
      !file.size ||
      file.size > 10 * 1024 * 1024
    )
      throw new Error('Use a PNG, JPEG or PDF under 10 MB.');
    const { ocrText, streamText, ocrConfidence, warnings } =
      await henryEmiratesIdScannerService.extractDocumentText(file, undefined, text => {
        const parsed = this.parseDocumentText(text);
        return (
          [
            !!parsed.certificateNumber,
            !!parsed.ownerNameEn || !!parsed.owners?.length,
            !!(parsed.propertyNumber || parsed.plotNumber),
          ].filter(Boolean).length / 3
        );
      });
    const text = `${ocrText}\n${streamText}`;
    if (!text.trim())
      throw new Error('No readable text. Rescan in good lighting with all deed edges visible.');
    const result = this.parseDocumentText(text);
    if (result.diagnostics) {
      result.diagnostics.ocrConfidence = ocrConfidence;
      result.diagnostics.warnings.push(...(warnings || []));
    }
    return { ...result, documentFormat: file.type };
  }

  parseDocumentText(text: string): DldTitleDeedExtractedData {
    return parseTitleDeedDocumentText(text);
  }

  /**
   * Alias for scanTitleDeed conforming to standard document ingestion interfaces
   */
  async scanDocument(fileOrPreset?: File | 'sample'): Promise<DldTitleDeedExtractedData> {
    return this.scanTitleDeed(fileOrPreset);
  }

  /**
   * Maps extracted Title Deed data directly into Tenancy Contract payload
   */
  toTenancyContractPayload(
    extracted: DldTitleDeedExtractedData,
    basePayload: TenancyContractPayload
  ): TenancyContractPayload {
    if (!canUseScan(extracted)) throw new Error('Confirm review before autofill.');
    const propertyTitle = `${extracted.propertyTypeEn} in ${extracted.buildingNameEn}`;
    const unitNumber = `Unit ${extracted.propertyNumber}, Floor ${extracted.floorNumber}, ${extracted.buildingNameEn}`;
    const community = `${extracted.communityEn}, Dubai (Plot: ${extracted.plotNumber})`;

    const landlord: ContractParty = {
      name: extracted.ownerNameEn,
      emiratesIdOrPassport: basePayload.landlord.emiratesIdOrPassport,
      phone: basePayload.landlord.phone || '',
      email: basePayload.landlord.email || '',
    };

    return {
      ...basePayload,
      propertyTitle,
      unitNumber,
      community,
      landlord,
    };
  }

  /**
   * Returns demo scanned Title Deed data (Akram Dib Nehme - Viridis A Unit 504)
   */
  getDemoExtractedData(): DldTitleDeedExtractedData {
    const demo = {
      ...VIRIDIS_504_SAMPLE_TITLE_DEED,
      scannedAt: new Date().toISOString(),
      demoOnly: true,
      reviewConfirmed: false,
      isBlockchainVerified: false,
    };
    return demo;
  }

  /**
   * Converts Extracted Title Deed into a clean CRM Property Inventory object
   */
  toCrmPropertyListing(extracted: DldTitleDeedExtractedData) {
    if (!canUseScan(extracted)) throw new Error('Confirm review before autofill.');
    const knownNumber = (
      key: 'totalAreaSqFt' | 'totalAreaSqM' | 'purchasePriceAed'
    ): number | undefined => {
      const evidence = extracted.diagnostics?.fields[key];
      return Number.isFinite(extracted[key]) &&
        extracted[key] >= 0 &&
        (evidence
          ? evidence.state === 'extracted' || evidence.state === 'derived'
          : extracted[key] > 0)
        ? extracted[key]
        : undefined;
    };
    return {
      title: `${extracted.buildingNameEn} — Unit ${extracted.propertyNumber} (${extracted.propertyTypeEn})`,
      propertyType: extracted.propertyTypeEn,
      community: extracted.communityEn,
      building: extracted.buildingNameEn,
      unitNumber: extracted.propertyNumber,
      floor: extracted.floorNumber,
      parking: extracted.parkingNumber,
      plotNumber: extracted.plotNumber,
      municipalityNumber: extracted.municipalityNumber,
      sizeSqFt: knownNumber('totalAreaSqFt'),
      sizeSqM: knownNumber('totalAreaSqM'),
      ownerName: extracted.ownerNameEn,
      ownerDldId: extracted.ownerDldNumber,
      lastPurchasePriceAed: knownNumber('purchasePriceAed'),
      titleDeedNumber: extracted.certificateNumber,
      mortgageStatus:
        extracted.mortgageState === 'unknown' || !extracted.mortgageStatusEn
          ? undefined
          : extracted.mortgageStatusEn,
    };
  }

  /**
   * Exports extracted data as a structured JSON object
   */
  exportToJson(extracted?: DldTitleDeedExtractedData): Record<string, any> {
    const data = extracted || this.getCachedTitleDeed();
    return JSON.parse(JSON.stringify(data));
  }

  /**
   * Exports extracted data as a formatted JSON string
   */
  exportToJsonString(extracted?: DldTitleDeedExtractedData): string {
    return JSON.stringify(this.exportToJson(extracted), null, 2);
  }

  /**
   * Persists extracted Title Deed record to backend database and local cache
   */
  async saveToDatabase(
    extracted?: DldTitleDeedExtractedData,
    options?: VaultSaveOptions
  ): Promise<{ success: boolean; id?: string; error?: string }> {
    const data = extracted || this.getCachedTitleDeed();
    if (!data) return { success: false, error: 'No reviewed document.' };
    const revision = this.cacheRevision;
    const result = await saveReviewedScan(
      'title_deed',
      data,
      data.certificateNumber,
      data.ownerNameEn,
      options
    );
    if (result.success && revision === this.cacheRevision) this.setCachedTitleDeed(data);
    return result;
  }
}
export { HenryTitleDeedScannerService };
export const henryTitleDeedScannerService = new HenryTitleDeedScannerService();
export default henryTitleDeedScannerService;

