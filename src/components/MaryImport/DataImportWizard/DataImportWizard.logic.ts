/**
 * Data Import Wizard — Logic Layer (Mary Allen Wilkes Architecture)
 * State hook managing 6-step file upload, preview, mapping, validation, and execution
 * Strictly < 350 lines
 */

import { useState, useCallback } from 'react';
import { authFetch } from '../../../utils/authFetch';
import type {
  ImportStrategy,
  DeduplicationStrategy,
  ValidationResult,
  DuplicateRecord,
} from './DataImportWizard.types';

export function useDataImportWizardLogic() {
  const [currentStep, setCurrentStep] = useState(1);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [fileName, setFileName] = useState('');
  const [fileSize, setFileSize] = useState(0);
  const [uploadTime, setUploadTime] = useState<Date | null>(null);
  const [sheetNames, setSheetNames] = useState<string[]>([]);
  const [selectedSheet, setSelectedSheet] = useState('');
  const [preview, setPreview] = useState<Record<string, unknown>[]>([]);
  const [columns, setColumns] = useState<string[]>([]);
  const [totalRows, setTotalRows] = useState(0);
  const [columnMapping, setColumnMapping] = useState<Record<string, string>>({});
  const [validationResult, setValidationResult] = useState<ValidationResult | null>(null);
  const [importStrategy, setImportStrategy] = useState<ImportStrategy>('balanced');
  const [deduplicationStrategy] = useState<DeduplicationStrategy>('keep');
  const [duplicates, setDuplicates] = useState<DuplicateRecord[]>([]);
  const [statusMapping] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [importProgress] = useState(0);

  const handleFileUpload = useCallback(async (file: File | null) => {
    if (!file) return;

    setIsLoading(true);
    setError(null);
    setFileName(file.name);
    setFileSize(file.size);
    setUploadTime(new Date());

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await authFetch('/api/inventory/import/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Upload failed');

      const data = await response.json();
      setSessionId(data.data.sessionId);
      setSheetNames(data.data.sheetNames || []);
      setSelectedSheet(data.data.sheetNames?.[0] || '');
      setPreview(data.data.preview || []);
      setColumns(data.data.columns || Object.keys(data.data.preview?.[0] || {}));
      setTotalRows(data.data.totalRows || 0);
      setColumnMapping(data.data.columnMapping || {});

      setCurrentStep(2);
    } catch (err: any) {
      setError(err?.message || 'Error uploading file');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.currentTarget.classList.add('drag-over');
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.currentTarget.classList.remove('drag-over');
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.currentTarget.classList.remove('drag-over');
    const file = e.dataTransfer.files?.[0];
    if (file) {
      void handleFileUpload(file);
    }
  };

  const handleRunValidation = async () => {
    setIsLoading(true);
    try {
      const response = await authFetch('/api/inventory/import/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId,
          strategy: importStrategy,
          mapping: columnMapping,
        }),
      });
      const result = await response.json();
      setValidationResult(result.data?.validationResult || null);
      setDuplicates(result.data?.duplicates || []);
    } catch (err: any) {
      setError(err?.message || 'Validation failed');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    currentStep,
    setCurrentStep,
    sessionId,
    fileName,
    fileSize,
    uploadTime,
    sheetNames,
    selectedSheet,
    setSelectedSheet,
    preview,
    columns,
    totalRows,
    columnMapping,
    setColumnMapping,
    validationResult,
    importStrategy,
    setImportStrategy,
    deduplicationStrategy,
    duplicates,
    statusMapping,
    isLoading,
    error,
    setError,
    importProgress,
    handleFileUpload,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleRunValidation,
  };
}

