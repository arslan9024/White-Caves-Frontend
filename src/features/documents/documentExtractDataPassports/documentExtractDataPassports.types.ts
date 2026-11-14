/**
 * documentExtractDataPassports.types.ts
 * Type definitions and constants for passport MRZ data extraction.
 */

/** Supported sex/gender codes as encoded in the MRZ. */
export type PassportSex = 'M' | 'F' | 'X';

/** A single field-level validation issue discovered during extraction. */
export interface PassportExtractionIssue {
  readonly field: string;
  readonly message: string;
}

/** Normalized, structured passport data extracted from a document. */
export interface ExtractedPassportData {
  readonly documentType: string;
  readonly issuingCountry: string;
  readonly surname: string;
  readonly givenNames: string;
  readonly passportNumber: string;
  readonly nationality: string;
  readonly dateOfBirth: string; // ISO 8601 date (YYYY-MM-DD)
  readonly sex: PassportSex;
  readonly expiryDate: string; // ISO 8601 date (YYYY-MM-DD)
  readonly personalNumber: string | null;
}

/** Result of an extraction attempt: either success with data, or failure with issues. */
export type PassportExtractionResult =
  | {
      readonly success: true;
      readonly data: ExtractedPassportData;
      readonly issues: readonly PassportExtractionIssue[];
    }
  | {
      readonly success: false;
      readonly data: null;
      readonly issues: readonly PassportExtractionIssue[];
    };

export const MRZ_LINE_LENGTH = 44;
export const MRZ_CHAR_PATTERN = /^[A-Z0-9<]+$/;

export const CHAR_VALUES: Readonly<Record<string, number>> = (() => {
  const values: Record<string, number> = { '<': 0 };
  for (let i = 0; i <= 9; i += 1) {
    values[String(i)] = i;
  }
  for (let i = 0; i < 26; i += 1) {
    values[String.fromCharCode(65 + i)] = i + 10;
  }
  return values;
})();

export const WEIGHTS: readonly number[] = [7, 3, 1];
