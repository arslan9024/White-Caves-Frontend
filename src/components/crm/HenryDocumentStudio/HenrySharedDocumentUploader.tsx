/**
 * HenrySharedDocumentUploader.tsx
 *
 * Reusable, High-Fidelity Document Upload & OCR Ingestion Component
 * for White Caves Henry AI Document Studio.
 */

import React, { FC, useEffect, useRef, useState, DragEvent } from 'react';
import { UploadCloud, CheckCircle2, Sparkles, Trash2, Save } from 'lucide-react';
import { HenryPerspectiveEditor } from './HenryPerspectiveEditor';
import {
  UploaderContainer,
  HeaderSection,
  DropzoneBox,
  ExtractedSummaryBox,
  ActionToolbar,
  ActionBtn,
} from './HenrySharedDocumentUploader.styles';

export type SupportedDocType = 'auto' | 'emirates_id' | 'passport' | 'title_deed' | 'contract';

export interface HenrySharedDocumentUploaderProps {
  docType?: SupportedDocType;
  title: string;
  subtitle?: string;
  acceptedFormats?: string;
  isProcessing?: boolean;
  onFileUpload: (file: File, original?: File) => Promise<void> | void;
  onFileSelected?: () => void;
  maxFileSizeMb?: number;
  onSampleLoad?: () => void;
  onSave?: () => void;
  onDiscard?: () => void;
  saveDisabled?: boolean;
  resetSignal?: number;
  extractedSummary?: {
    title: string;
    fields: { label: string; value: string | number | undefined; isHighlight?: boolean }[];
  } | null;
  accentColor?: string;
}

export const HenrySharedDocumentUploader: FC<HenrySharedDocumentUploaderProps> = ({
  docType = 'auto',
  title,
  subtitle,
  acceptedFormats = 'application/pdf,image/png,image/jpeg',
  isProcessing = false,
  onFileUpload,
  onFileSelected,
  maxFileSizeMb = 10,
  onSampleLoad,
  onSave,
  onDiscard,
  saveDisabled = false,
  resetSignal,
  extractedSummary,
  accentColor = '#EF4444',
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [manualCorrection, setManualCorrection] = useState(false);
  const correctionGeneration = useRef(0);
  const [pendingCorrection, setPendingCorrection] = useState<{
    file: File;
    generation: number;
  } | null>(null);

  const clearCorrection = () => {
    correctionGeneration.current++;
    setPendingCorrection(null);
  };

  useEffect(() => {
    correctionGeneration.current++;
    setPendingCorrection(null);
    setUploadError('');
    return () => {
      correctionGeneration.current++;
    };
  }, [resetSignal]);

  const uploadFile = async (file: File, original?: File) => {
    if (isProcessing) return;
    onFileSelected?.();
    setUploadError('');
    clearCorrection();
    const generation = correctionGeneration.current;
    if (
      !['application/pdf', 'image/png', 'image/jpeg'].includes(file.type) ||
      !file.size ||
      file.size > maxFileSizeMb * 1024 * 1024
    ) {
      setUploadError(
        `Use a PNG, JPEG or PDF under ${maxFileSizeMb} MB. Rescan with all edges visible.`
      );
      return;
    }
    if (manualCorrection && !original && file.type !== 'application/pdf') {
      setPendingCorrection({ file, generation });
      return;
    }
    try {
      await onFileUpload(file, original);
    } catch {
      if (generation === correctionGeneration.current)
        setUploadError('Upload failed. Please rescan or retry.');
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      void uploadFile(file);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      void uploadFile(file);
      e.target.value = '';
    }
  };

  return (
    <UploaderContainer $accentColor={accentColor}>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileInputChange}
        accept={acceptedFormats}
        style={{ display: 'none' }}
        aria-label="Upload document"
      />
      <input
        type="file"
        ref={cameraInputRef}
        accept="image/png,image/jpeg"
        capture="environment"
        onChange={handleFileInputChange}
        style={{ display: 'none' }}
        aria-label="Camera document capture"
      />
      <ActionBtn
        type="button"
        disabled={isProcessing}
        onClick={() => cameraInputRef.current?.click()}
      >
        Capture with camera
      </ActionBtn>
      {uploadError && <p role="alert">{uploadError}</p>}
      {(docType === 'emirates_id' || docType === 'title_deed') && (
        <>
          <label>
            <input
              type="checkbox"
              checked={manualCorrection}
              disabled={isProcessing}
              onChange={event => {
                setManualCorrection(event.target.checked);
                clearCorrection();
              }}
            />
            Manual four-corner correction before scanning
          </label>
          <p>PDF corner correction is unsupported; PDFs scan without correction.</p>
          {pendingCorrection && (
            <HenryPerspectiveEditor
              key={pendingCorrection.generation}
              file={pendingCorrection.file}
              onConfirm={(corrected, original) => {
                if (pendingCorrection.generation === correctionGeneration.current)
                  void uploadFile(corrected, original);
              }}
              onCancel={() => {
                if (pendingCorrection.generation === correctionGeneration.current)
                  clearCorrection();
              }}
            />
          )}
        </>
      )}

      <HeaderSection>
        <div className="title-group">
          <h4>{title}</h4>
          {subtitle && <p>{subtitle}</p>}
        </div>

        {onSampleLoad && (
          <ActionBtn
            type="button"
            onClick={() => {
              clearCorrection();
              onSampleLoad();
            }}
            $variant="secondary"
            disabled={isProcessing}
          >
            <Sparkles size={13} color={accentColor} /> Load Demo Benchmark
          </ActionBtn>
        )}
      </HeaderSection>

      <DropzoneBox
        $isDragOver={isDragOver}
        $accentColor={accentColor}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        role="button"
        tabIndex={0}
        aria-label="Browse document"
        onKeyDown={event => {
          if (event.key === 'Enter' || event.key === ' ') fileInputRef.current?.click();
        }}
      >
        <div className="dropzone-icon">
          <UploadCloud size={32} color={accentColor} style={{ margin: '0 auto' }} />
        </div>
        <div className="dropzone-text">
          {isProcessing ? '⚡ Analyzing & Extracting Data...' : 'Drop file here or click to browse'}
        </div>
        <div className="dropzone-sub">
          PNG, JPEG or PDF · maximum {maxFileSizeMb} MB · avoid glare and show all edges
        </div>
      </DropzoneBox>

      {/* Extracted Details Box */}
      {extractedSummary && extractedSummary.fields.length > 0 && (
        <ExtractedSummaryBox $accentColor={accentColor}>
          <div className="summary-header">
            <CheckCircle2 size={15} /> {extractedSummary.title}
          </div>
          <div className="fields-grid">
            {extractedSummary.fields.map((field, idx) => (
              <div key={idx} className="field-item">
                <div className="field-label">{field.label}</div>
                <div
                  className="field-value"
                  style={{
                    color: field.isHighlight ? accentColor : 'var(--color-0f172a, #0F172A)',
                  }}
                >
                  {field.value !== undefined && field.value !== '' ? field.value : '—'}
                </div>
              </div>
            ))}
          </div>
        </ExtractedSummaryBox>
      )}

      {/* Save & Discard Buttons */}
      {(onSave || onDiscard) && (
        <ActionToolbar>
          {onDiscard && (
            <ActionBtn
              type="button"
              onClick={() => {
                clearCorrection();
                onDiscard();
              }}
              $variant="danger"
            >
              <Trash2 size={13} /> Discard
            </ActionBtn>
          )}
          {onSave && (
            <ActionBtn
              type="button"
              onClick={onSave}
              disabled={saveDisabled || isProcessing}
              $variant="primary"
              $accentColor={accentColor}
            >
              <Save size={13} /> Save to Vault
            </ActionBtn>
          )}
        </ActionToolbar>
      )}
    </UploaderContainer>
  );
};

export default HenrySharedDocumentUploader;

