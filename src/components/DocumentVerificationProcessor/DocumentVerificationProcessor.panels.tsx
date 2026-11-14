/**
 * Document Verification Processor — Panels Layer (Mary Allen Wilkes Architecture)
 * Subcomponents for Upload Form, Progress Bar, and Extracted Verification Results
 * Strictly < 350 lines
 */

import React from 'react';
import {
  Upload,
  FileCheck,
  CheckCircle,
  Loader2,
  X,
  RefreshCw,
  Eye,
  EyeOff,
  Download,
  Copy,
} from 'lucide-react';
import { DOCUMENT_TYPES } from './DocumentVerificationProcessor.types';
import type { VerificationResult } from './DocumentVerificationProcessor.types';
import { formatFieldLabel } from './DocumentVerificationProcessor.logic';

export const UploadPanel: React.FC<{
  documentType: string;
  loading: boolean;
  uploadProgress: number;
  file: File | null;
  preview: string | null;
  fileInputRef: React.RefObject<HTMLInputElement>;
  handleDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  handleDragLeave: (e: React.DragEvent<HTMLDivElement>) => void;
  handleDrop: (e: React.DragEvent<HTMLDivElement>) => void;
  handleFileSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleReset: () => void;
  handleUpload: () => void;
}> = ({
  documentType,
  loading,
  uploadProgress,
  file,
  preview,
  fileInputRef,
  handleDragOver,
  handleDragLeave,
  handleDrop,
  handleFileSelect,
  handleReset,
  handleUpload,
}) => (
  <div className="verification-step">
    <div className="step-header">
      <Upload size={32} className={loading ? 'icon spinning' : 'icon'} />
      <div>
        <h3>Upload {DOCUMENT_TYPES[documentType]?.label || 'Document'}</h3>
        <p className="step-description">Ensure document is clear and all details are visible</p>
      </div>
    </div>

    <div
      className="upload-area"
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={() => fileInputRef.current?.click()}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept={DOCUMENT_TYPES[documentType]?.accept || 'image/*'}
        onChange={handleFileSelect}
        disabled={loading}
        aria-label="Upload document"
        className="file-input"
      />

      {preview ? (
        <div className="preview-container">
          <img src={preview} alt="Document preview" className="preview-image" />
          <div className="preview-info">
            <p className="file-name">{file?.name}</p>
            <p className="file-size">{((file?.size || 0) / 1024).toFixed(2)} KB</p>
          </div>
        </div>
      ) : (
        <div className="upload-placeholder">
          <Upload size={48} />
          <p className="upload-text">Drag and drop your document here, or click to select</p>
          <p className="upload-hint">Supported formats: JPG, PNG, GIF (Max 10MB)</p>
        </div>
      )}
    </div>

    {loading && uploadProgress > 0 && (
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${uploadProgress}%` }} />
      </div>
    )}

    <div className="button-group">
      {file && !loading && (
        <>
          <button className="btn btn-secondary" onClick={handleReset} aria-label="Clear selection">
            <X size={18} />
            Clear
          </button>
          <button className="btn btn-primary" onClick={handleUpload} disabled={loading}>
            {loading ? (
              <>
                <Loader2 size={18} className="spinner" />
                Processing...
              </>
            ) : (
              <>
                <FileCheck size={18} />
                Verify Document
              </>
            )}
          </button>
        </>
      )}
      {!file && (
        <button
          className="btn btn-primary"
          onClick={() => fileInputRef.current?.click()}
          disabled={loading}
        >
          <Upload size={18} />
          Select Document
        </button>
      )}
    </div>
  </div>
);

export const ResultPanel: React.FC<{
  result: VerificationResult;
  showRawData: boolean;
  setShowRawData: (show: boolean) => void;
  handleCopyText: (text: string) => void;
  handleReset: () => void;
  handleDownloadResult: () => void;
}> = ({
  result,
  showRawData,
  setShowRawData,
  handleCopyText,
  handleReset,
  handleDownloadResult,
}) => (
  <div className="verification-step">
    <div className="step-header">
      <CheckCircle
        size={32}
        className={`icon ${result.validation?.isValid ? 'success' : 'warning'}`}
      />
      <div>
        <h3>{result.validation?.isValid ? 'Verification Complete' : 'Verification Issues'}</h3>
        <p className="step-description">
          Processed with {Math.round(result.confidence)}% confidence
        </p>
      </div>
    </div>

    {result.validation && (
      <div className={`validation-box ${result.validation.isValid ? 'success' : 'warning'}`}>
        <h4>Validation Status</h4>
        {result.validation.errors.length > 0 && (
          <div className="errors">
            <p className="error-label">Errors:</p>
            <ul>
              {result.validation.errors.map((error, idx) => (
                <li key={idx}>{error}</li>
              ))}
            </ul>
          </div>
        )}
        {result.validation.warnings.length > 0 && (
          <div className="warnings">
            <p className="warning-label">Warnings:</p>
            <ul>
              {result.validation.warnings.map((warning, idx) => (
                <li key={idx}>{warning}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    )}

    {result.parsedData?.extractedFields && (
      <div className="extracted-data-box">
        <div className="box-header">
          <h4>Extracted Information</h4>
          <button
            className="toggle-btn"
            onClick={() => setShowRawData(!showRawData)}
            title={showRawData ? 'Hide raw text' : 'Show raw text'}
          >
            {showRawData ? (
              <>
                <EyeOff size={16} />
                Hide Raw
              </>
            ) : (
              <>
                <Eye size={16} />
                Show Raw
              </>
            )}
          </button>
        </div>

        {showRawData && result.rawText && (
          <div className="raw-text-section">
            <div className="raw-text-header">
              <p>Raw OCR Text:</p>
              <button
                className="copy-btn"
                onClick={() => handleCopyText(result.rawText!)}
                title="Copy raw text"
              >
                <Copy size={16} />
              </button>
            </div>
            <pre className="raw-text">{result.rawText}</pre>
          </div>
        )}

        <div className="fields-grid">
          {Object.entries(result.parsedData.extractedFields).map(
            ([key, value]) =>
              value && (
                <div key={key} className="field-item">
                  <label>{formatFieldLabel(key)}</label>
                  <p>{String(value)}</p>
                </div>
              )
          )}
        </div>
      </div>
    )}

    {result.verification && (
      <div className="document-status-box">
        <h4>Document Status</h4>
        <div className="status-info">
          <p>
            Status:{' '}
            <span className={result.verification.isExpired ? 'expired' : 'valid'}>
              {result.verification.isExpired ? 'Expired' : 'Valid'}
            </span>
          </p>
          {result.verification.daysUntilExpiry !== null && (
            <p>
              Days Until Expiry: <strong>{result.verification.daysUntilExpiry}</strong>
            </p>
          )}
          {result.verification.messages.length > 0 && (
            <div className="status-messages">
              {result.verification.messages.map((msg, idx) => (
                <p key={idx} className="status-message">
                  • {msg}
                </p>
              ))}
            </div>
          )}
        </div>
      </div>
    )}

    <div className="button-group">
      <button className="btn btn-secondary" onClick={handleReset}>
        <RefreshCw size={18} />
        Upload Another
      </button>
      <button className="btn btn-secondary" onClick={handleDownloadResult}>
        <Download size={18} />
        Download Result
      </button>
    </div>
  </div>
);
