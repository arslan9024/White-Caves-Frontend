import { authFetch } from '../utils/authFetch';
import logger from '../utils/logger';
import type { ExtractionDiagnostics } from './henryDocumentParsing';

export interface ScanReview {
  demoOnly?: boolean;
  reviewConfirmed?: boolean;
  missingFields?: string[];
  diagnostics?: ExtractionDiagnostics;
  expiryAcknowledgedFor?: string;
  vaultSource?: { documentId: string; docType: 'emirates_id' | 'title_deed'; loadedAt: string };
}

export interface VaultSaveOptions {
  driveOrigin?: { proof: string };
  sources?: File[];
  leadId?: string;
  propertyId?: string;
  tenancyId?: string;
  transactionId?: string;
  replacesId?: string;
}

export function canUseScan(data: ScanReview | null | undefined): boolean {
  return assessScanReadiness(data).status === 'ready_to_use';
}

export type ScanReadiness =
  | { status: 'needs_rescan'; reasons: string[] }
  | { status: 'needs_review'; reasons: string[] }
  | { status: 'ready_to_use'; reasons: [] };

/** Readiness is a review gate, not an authenticity or accuracy estimate. */
export function assessScanReadiness(data: ScanReview | null | undefined): ScanReadiness {
  if (!data) return { status: 'needs_rescan', reasons: ['Upload a readable document.'] };
  const fields = data as ScanReview & Record<string, unknown>;
  const present = (key: string) =>
    typeof fields[key] === 'string' &&
    !!(fields[key] as string).trim() &&
    !/^(?:n\/?a|unknown|unreadable|undefined|null|not available|[-?]+)$/i.test(
      (fields[key] as string).trim()
    );
  const missing = new Set(data.missingFields || []);
  if ('passportNumber' in fields) {
    for (const key of ['passportNumber', 'fullName']) if (!present(key)) missing.add(key);
    if (!present('issuingCountryCode') && !present('issuingCountry')) missing.add('issuingCountry');
    for (const key of ['dateOfBirth', 'dateOfExpiry'])
      if (typeof fields[key] !== 'string' || !validScanDate(fields[key] as string)) missing.add(key);
    if (!/^[A-Z0-9]{5,12}$/i.test(String(fields.passportNumber))) missing.add('passportNumber');
    if (validScanDate(String(fields.dateOfBirth)) &&
      Date.parse(String(fields.dateOfBirth).split('/').reverse().join('-')) > Date.now())
      missing.add('dateOfBirth');
    const time = (value: unknown) => typeof value === 'string' && validScanDate(value)
      ? Date.parse(value.split('/').reverse().join('-')) : NaN;
    if (time(fields.dateOfBirth) >= time(fields.dateOfExpiry)) missing.add('dateOfBirth');
    if (fields.dateOfIssue && (!Number.isFinite(time(fields.dateOfIssue)) ||
      time(fields.dateOfIssue) < time(fields.dateOfBirth) ||
      time(fields.dateOfIssue) > time(fields.dateOfExpiry))) missing.add('dateOfIssue');
  }
  if ('financials' in fields) {
    const record = (value: unknown): Record<string, unknown> =>
      value && typeof value === 'object' && !Array.isArray(value) ? value as Record<string, unknown> : {};
    const landlord = record(fields.landlord), tenant = record(fields.tenant);
    const property = record(fields.property), financials = record(fields.financials);
    if (property.usage !== undefined && !['', 'residential', 'commercial', 'industrial'].includes(String(property.usage)))
      missing.add('property.usage');
    for (const key of ['areaSqM', 'areaSqFt'])
      if (property[key] !== undefined && (typeof property[key] !== 'number' ||
        !Number.isFinite(property[key]) || Number(property[key]) < 0)) missing.add(`property.${key}`);
    for (const [key, value] of Object.entries({
      'landlord.name': landlord.name, 'tenant.name': tenant.name,
      'property.buildingName': property.buildingName, 'property.propertyNumber': property.propertyNumber,
    })) if (typeof value !== 'string' || !value.trim() || /^(unknown|n\/a)$/i.test(value)) missing.add(key);
    for (const key of ['periodFrom', 'periodTo'])
      if (typeof financials[key] !== 'string' || !validScanDate(String(financials[key])))
        missing.add(`financials.${key}`);
    if (typeof financials.annualRentAed !== 'number' || !Number.isFinite(financials.annualRentAed) || financials.annualRentAed <= 0)
      missing.add('financials.annualRentAed');
    for (const key of ['contractValueAed', 'securityDepositAed'])
      if (financials[key] !== undefined && (typeof financials[key] !== 'number' ||
        !Number.isFinite(financials[key]) || Number(financials[key]) < 0)) missing.add(`financials.${key}`);
    if (validScanDate(String(financials.periodFrom)) && validScanDate(String(financials.periodTo)) &&
      Date.parse(String(financials.periodFrom).split('/').reverse().join('-')) >=
      Date.parse(String(financials.periodTo).split('/').reverse().join('-')))
      missing.add('financials.periodTo');
  }
  if ('idNumber' in fields) {
    if (typeof fields.idNumber !== 'string' || !/^784-\d{4}-\d{7}-\d$/.test(fields.idNumber))
      missing.add('idNumber');
    if (!present('fullNameEn') || !/[a-z]{2}/i.test(String(fields.fullNameEn)))
      missing.add('fullNameEn');
    if (typeof fields.expiryDate !== 'string' || !validScanDate(fields.expiryDate))
      missing.add('expiryDate');
  }
  if ('certificateNumber' in fields) {
    if (
      typeof fields.certificateNumber !== 'string' ||
      !/^\d{1,12}\/\d{4}$/.test(fields.certificateNumber)
    )
      missing.add('certificateNumber');
    if (!present('ownerNameEn') || !/[a-z]{2}/i.test(String(fields.ownerNameEn)))
      missing.add('ownerNameEn');
    if (!present('propertyNumber') && !present('plotNumber')) missing.add('propertyNumber');
  }
  for (const key of ['dateOfBirth', 'issueDate', 'registrationDate']) {
    if (
      fields[key] !== undefined &&
      fields[key] !== '' &&
      (typeof fields[key] !== 'string' || !validScanDate(fields[key] as string))
    )
      missing.add(key);
  }
  if ('idNumber' in fields) {
    const time = (value: unknown) =>
      typeof value === 'string' && validScanDate(value)
        ? Date.parse(value.split('/').reverse().join('-'))
        : NaN;
    if (time(fields.dateOfBirth) > Date.now()) missing.add('dateOfBirth');
    if (time(fields.issueDate) > time(fields.expiryDate)) missing.add('issueDate');
    if (time(fields.dateOfBirth) > time(fields.issueDate)) missing.add('dateOfBirth');
  }
  if (missing.size)
    return {
      status: 'needs_rescan',
      reasons: [...missing].map(
        key => `Missing or invalid ${key}; correct from the source or rescan.`
      ),
    };
  const reasons: string[] = [];
  if (data.demoOnly) reasons.push('Demo documents cannot be reused.');
  if (('passportNumber' in fields || 'financials' in fields) && data.demoOnly !== false)
    reasons.push('A real uploaded source is required.');
  if (Object.values(data.diagnostics?.fields || {}).some(field => field.state === 'conflict'))
    reasons.push('Resolve source conflicts before reuse.');
  if (
    'idNumber' in fields &&
    typeof fields.expiryDate === 'string' &&
    scanExpiry(fields.expiryDate).isExpired &&
    data.expiryAcknowledgedFor !== fields.expiryDate
  )
    reasons.push(
      'Expired ID: explicitly acknowledge this expiry; it is not current identification.'
    );
  const passportExpiry = fields.dateOfExpiry;
  if ('passportNumber' in fields && typeof passportExpiry === 'string' &&
    scanExpiry(passportExpiry).isExpired && data.expiryAcknowledgedFor !== passportExpiry)
    reasons.push('Expired passport: explicitly acknowledge this expiry; it is not current identification.');
  if (data.reviewConfirmed !== true) reasons.push('Confirm a fresh source review.');
  return reasons.length
    ? { status: 'needs_review', reasons }
    : { status: 'ready_to_use', reasons: [] };
}

/** Validate the archived schema against the existing scanner shape before entering its UI. */
export { hydrateVaultScan, validScanDate, scanExpiry, saveReviewedScan } from './henryScanVaultHydrator';
