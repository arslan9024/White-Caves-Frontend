/**
 * Document Verification Processor — Types Layer (Mary Allen Wilkes Architecture)
 * Single-purpose type definitions strictly < 350 lines
 */

export interface DocumentTypeOption {
  label: string;
  accept: string;
}

export const DOCUMENT_TYPES: Record<string, DocumentTypeOption> = {
  emirates_id: { label: 'Emirates ID', accept: 'image/*' },
  passport: { label: 'Passport', accept: 'image/*' },
  visa: { label: 'UAE Visa', accept: 'image/*' },
};

export interface StatusMessage {
  type: 'error' | 'success';
  text: string;
}

export interface VerificationResult {
  success: boolean;
  documentType: string;
  rawText?: string;
  confidence: number;
  parsedData?: {
    extractedFields?: Record<string, string | number | null | undefined>;
  };
  validation?: {
    isValid: boolean;
    errors: string[];
    warnings: string[];
  };
  verification?: {
    isExpired: boolean;
    daysUntilExpiry: number | null;
    messages: string[];
  };
  timestamp: Date;
}

export interface DocumentVerificationProcessorProps {
  documentType: string;
  onSuccess?: (response: unknown) => void;
  onError?: (error: unknown) => void;
  required?: boolean;
  userId?: string;
  token?: string;
}

