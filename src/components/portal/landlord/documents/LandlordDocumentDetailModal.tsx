/**
 * LandlordDocumentDetailModal.tsx — Detail modal for LandlordDocumentsTab
 * Single-purpose module (< 350 lines, AEG-042).
 */

import React, { FC } from 'react';
import type { DocumentEntry } from './landlordDocuments.data';

interface LandlordDocumentDetailModalProps {
  document: DocumentEntry;
  onClose: () => void;
}

export const LandlordDocumentDetailModal: FC<LandlordDocumentDetailModalProps> = ({
  document: selectedDocument,
  onClose,
}) => (
  <div
    className="modal-overlay"
    data-testid="document-detail-modal"
    onClick={onClose}
    role="dialog"
    aria-modal="true"
  >
    <div className="modal-content" onClick={event => event.stopPropagation()}>
      <button
        type="button"
        className="modal-close"
        aria-label="Close document details"
        onClick={onClose}
      >
        ×
      </button>

      <h4>Document Details</h4>
      <p>
        <strong>ID:</strong> {selectedDocument.id}
      </p>
      <p>
        <strong>Name:</strong> {selectedDocument.name}
      </p>
      <p>
        <strong>Type:</strong> {selectedDocument.type}
      </p>
      <p>
        <strong>Property:</strong> {selectedDocument.property}
      </p>
      <p>
        <strong>Issued Date:</strong> {selectedDocument.issuedDate}
      </p>
      {selectedDocument.url !== '#' && (
        <p>
          <strong>Download:</strong>{' '}
          <a href={selectedDocument.url} target="_blank" rel="noreferrer">
            Open document
          </a>
        </p>
      )}
    </div>
  </div>
);

export default LandlordDocumentDetailModal;
