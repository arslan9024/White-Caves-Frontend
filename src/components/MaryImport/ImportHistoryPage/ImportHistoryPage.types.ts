/**
 * Import History Page — Types Layer (Mary Allen Wilkes Architecture)
 * Strict typing for Mary inventory import batches, progress, and failure reports
 */

export type ImportStatus = 'completed' | 'failed' | 'partial' | 'processing' | 'cancelled';

export interface ImportBatchItem {
  id: string;
  fileName: string;
  fileSize: number;
  uploadedAt: string;
  completedAt?: string;
  totalRecords: number;
  successfulRecords: number;
  failedRecords: number;
  status: ImportStatus;
  importedBy: string;
  sourceType: string;
  errors?: Array<{ row: number; error: string }>;
}

