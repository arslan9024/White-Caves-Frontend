import type { InternationalPassportExtractedData } from './henryPassport.types';
import { validScanDate } from '../henryScanReview';

export function formatCnicNumber(rawNumber: string): string {
  const cleaned = (rawNumber || '').replace(/\D/g, '');
  if (cleaned.length === 13) {
    return `${cleaned.slice(0, 5)}-${cleaned.slice(5, 12)}-${cleaned.slice(12)}`;
  }
  return rawNumber;
}

export function parseTD3Mrz(line1: string, line2: string): Partial<InternationalPassportExtractedData> {
  const l1 = (line1 || '').trim().toUpperCase();
  const l2 = (line2 || '').trim().toUpperCase();
  const check = (value: string, digit: string) =>
    /^\d$/.test(digit) && value.split('').reduce((sum, char, index) =>
      sum + (char === '<' ? 0 : parseInt(char, 36)) *
      [7, 3, 1][index % 3]!, 0) % 10 === Number(digit);
  if (!/^P[A-Z<][A-Z<]{42}$/.test(l1) || !/^[A-Z0-9<]{44}$/.test(l2) ||
    !/^[A-Z<]{3}$/.test(l2.slice(10, 13)) ||
    ![l2.slice(13, 19), l2.slice(21, 27)].every(raw => /^\d{6}$/.test(raw) &&
      validScanDate(`${raw.slice(4, 6)}/${raw.slice(2, 4)}/20${raw.slice(0, 2)}`)) ||
    !check(l2.slice(0, 9), l2[9]!) || !check(l2.slice(13, 19), l2[19]!) ||
    !check(l2.slice(21, 27), l2[27]!) ||
    !check(l2.slice(0, 10) + l2.slice(13, 20) + l2.slice(21, 43), l2[43]!)) {
    return {};
  }
  const passportType = l1.slice(0, 1);
  const issuingCountryCode = l1.slice(2, 5).replace(/</g, '');
  const nameSection = l1.slice(5);
  const nameParts = nameSection.split('<<').filter(Boolean);
  const surname = (nameParts[0] || '').replace(/</g, ' ').trim();
  const givenNames = (nameParts[1] || '').replace(/</g, ' ').trim();
  const fullName = `${givenNames} ${surname}`.trim();

  // Line 2 Extraction
  const passportNumber = l2.slice(0, 9).replace(/</g, '');
  const nationalityCode = l2.slice(10, 13).replace(/</g, '');
  const gender = l2[20] === 'F' ? 'F' : l2[20] === 'M' ? 'M' : '';

  return {
    passportType,
    issuingCountryCode,
    nationalityCode,
    surname,
    givenNames,
    fullName,
    passportNumber,
    gender,
    mrz: { line1: l1, line2: l2 },
  };
}

