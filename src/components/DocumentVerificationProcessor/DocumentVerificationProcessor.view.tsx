/**
 * Document Verification Processor — View Layer (Mary Allen Wilkes Architecture)
 * Root orchestrator component coordinating Upload & Result states, Banners, and Status
 * Strictly < 350 lines
 */

import React from 'react';
import { AlertTriangle, X } from 'lucide-react';
import type { DocumentVerificationProcessorProps } from './DocumentVerificationProcessor.types';
import {
  useDocumentVerificationProcessorLogic,
  formatFieldLabel,
} from './DocumentVerificationProcessor.logic';
import { UploadPanel, ResultPanel } from './DocumentVerificationProcessor.panels';
import '../DocumentVerificationProcessor.css';

export const DocumentVerificationProcessor: React.FC<DocumentVerificationProcessorProps> & {
  formatFieldLabel?: (fieldName: string) => string;
} = props => {
  const {
    fileInputRef,
    file,
    preview,
    loading,
    result,
    error,
    setError,
    statusMessage,
    setStatusMessage,
    showRawData,
    setShowRawData,
    uploadProgress,
    handleFileSelect,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleUpload,
    handleReset,
    handleCopyText,
    handleDownloadResult,
  } = useDocumentVerificationProcessorLogic(props);

  return (
    <div className="document-verification-processor">
      {/* Error Banner */}
      {error && (
        <div className="error-banner">
          <AlertTriangle size={20} />
          <span>{error}</span>
          <button className="close-btn" onClick={() => setError(null)} aria-label="Close error">
            <X size={18} />
          </button>
        </div>
      )}

      {/* Status Message */}
      {statusMessage && (
        <div
          role={statusMessage.type === 'error' ? 'alert' : 'status'}
          data-testid="document-verification-status-banner"
          className={statusMessage.type === 'error' ? 'error-banner' : 'success-banner'}
          style={
            statusMessage.type === 'error'
              ? undefined
              : {
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: '#ECFDF3',
                  color: '#027A48',
                  border: '1px solid #12B76A',
                  borderRadius: '8px',
                  padding: '10px 12px',
                  marginBottom: '12px',
                }
          }
        >
          <span>{statusMessage.type === 'error' ? '⚠️' : '✅'}</span>
          <span>{statusMessage.text}</span>
          <button
            className="close-btn"
            onClick={() => setStatusMessage(null)}
            aria-label="Close status"
          >
            <X size={18} />
          </button>
        </div>
      )}

      <div className="verification-container">
        {!result && (
          <UploadPanel
            documentType={props.documentType}
            loading={loading}
            uploadProgress={uploadProgress}
            file={file}
            preview={preview}
            fileInputRef={fileInputRef}
            handleDragOver={handleDragOver}
            handleDragLeave={handleDragLeave}
            handleDrop={handleDrop}
            handleFileSelect={handleFileSelect}
            handleReset={handleReset}
            handleUpload={handleUpload}
          />
        )}

        {result && (
          <ResultPanel
            result={result}
            showRawData={showRawData}
            setShowRawData={setShowRawData}
            handleCopyText={handleCopyText}
            handleReset={handleReset}
            handleDownloadResult={handleDownloadResult}
          />
        )}
      </div>
    </div>
  );
};

DocumentVerificationProcessor.formatFieldLabel = formatFieldLabel;

export default DocumentVerificationProcessor;

