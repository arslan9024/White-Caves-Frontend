/**
 * White Caves Real Estate LLC - Document Upload Drawer Component
 * Standard: AEGIS Canonical 7-Category Architecture Standard (Drawer)
 * Single Purpose File Law: < 350 lines
 */

import React, { FC, useState, useEffect, useMemo } from 'react';
import { X, UploadCloud } from 'lucide-react';
import { DocumentItem, DocumentType } from './DocumentManager.types';
import { useDirtyStateGuard } from '../../../hooks/useDirtyStateGuard';
import { UnsavedChangesModal, TaskActionBar } from '../../common/UnsavedChangesModal';
import {
  DRAWER_BODY_STYLE,
  DRAWER_HEADER_STYLE,
  DRAWER_OVERLAY_STYLE,
  DRAWER_PANEL_STYLE,
  FIELD_INPUT_STYLE,
  FIELD_LABEL_STYLE,
} from './DocumentUploadDrawer.styles';

interface DocumentUploadDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (docData: Partial<DocumentItem>) => void;
}

export const DocumentUploadDrawer: FC<DocumentUploadDrawerProps> = ({
  isOpen,
  onClose,
  onSave,
}) => {
  const [initialSnapshot, setInitialSnapshot] = useState<string>('');
  const [title, setTitle] = useState('');
  const [docType, setDocType] = useState<DocumentType>('TITLE_DEED');
  const [docCode, setDocCode] = useState('');
  const [entityName, setEntityName] = useState('');
  const [dealId, setDealId] = useState('DEAL-001');
  const [propertyId, setPropertyId] = useState('REP-001');

  useEffect(() => {
    if (isOpen) {
      setTitle('');
      setDocType('TITLE_DEED');
      setDocCode('');
      setEntityName('');
      setDealId('DEAL-001');
      setPropertyId('REP-001');
      setInitialSnapshot(
        JSON.stringify({
          title: '',
          docType: 'TITLE_DEED',
          docCode: '',
          entityName: '',
          dealId: 'DEAL-001',
          propertyId: 'REP-001',
        })
      );
    }
  }, [isOpen]);

  const isDirty = useMemo(() => {
    if (!isOpen) return false;
    const current = JSON.stringify({
      title,
      docType,
      docCode,
      entityName,
      dealId,
      propertyId,
    });
    return Boolean(initialSnapshot && current !== initialSnapshot);
  }, [isOpen, title, docType, docCode, entityName, dealId, propertyId, initialSnapshot]);

  const { showPrompt, proceed, cancel, confirmExit } = useDirtyStateGuard({
    isDirty,
    onConfirmDiscard: onClose,
  });

  if (!isOpen) return null;

  const handleSaveData = (shouldClose: boolean) => {
    if (!title.trim()) return;
    onSave({
      title,
      docType,
      docCode: docCode || `${docType.slice(0, 3)}-${Date.now().toString().slice(-4)}`,
      entityName,
      dealId,
      propertyId,
      status: 'VERIFIED',
      ocrConfidence: 99.2,
      fileSizeKB: 1200,
    });
    if (shouldClose) {
      onClose();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSaveData(true);
  };

  return (
    <div style={DRAWER_OVERLAY_STYLE} data-testid="document-upload-drawer">
      <div style={DRAWER_PANEL_STYLE}>
        <div style={DRAWER_HEADER_STYLE}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <UploadCloud size={18} color="#38BDF8" />
            <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 800, color: '#FFFFFF' }}>
              Upload Statutory Document Dossier
            </h3>
          </div>
          <button
            onClick={onClose}
            data-testid="close-upload-drawer"
            style={{
              background: 'transparent',
              border: 'none',
              color: '#94A3B8',
              cursor: 'pointer',
            }}
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} style={DRAWER_BODY_STYLE}>
          <div>
            <label style={FIELD_LABEL_STYLE}>Document Title</label>
            <input
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="e.g. Ejari Tenancy Agreement 2026"
              data-testid="doc-title-input"
              required
              style={FIELD_INPUT_STYLE}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <label style={FIELD_LABEL_STYLE}>Statutory Doc Type</label>
              <select
                value={docType}
                onChange={e => setDocType(e.target.value as DocumentType)}
                data-testid="doc-type-select"
                style={FIELD_INPUT_STYLE}
              >
                <option value="TITLE_DEED">Title Deed</option>
                <option value="EMIRATES_ID">Emirates ID</option>
                <option value="PASSPORT">Passport</option>
                <option value="EJARI_CONTRACT">Ejari Contract</option>
                <option value="PAYMENT_RECEIPT">Payment Receipt</option>
                <option value="TRADE_LICENSE">Trade License</option>
                <option value="MOU_FORM_F">MOU Form F</option>
                <option value="NOC_CERTIFICATE">Developer NOC</option>
              </select>
            </div>

            <div>
              <label style={FIELD_LABEL_STYLE}>Document Reference Code</label>
              <input
                type="text"
                value={docCode}
                onChange={e => setDocCode(e.target.value)}
                placeholder="e.g. TD-908124"
                style={FIELD_INPUT_STYLE}
              />
            </div>
          </div>

          <div>
            <label style={FIELD_LABEL_STYLE}>Counterparty Entity / Holder Name</label>
            <input
              type="text"
              value={entityName}
              onChange={e => setEntityName(e.target.value)}
              placeholder="e.g. Hassan Al-Nuaimi"
              data-testid="doc-entity-input"
              required
              style={FIELD_INPUT_STYLE}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <label style={FIELD_LABEL_STYLE}>Associated Deal ID</label>
              <input
                type="text"
                value={dealId}
                onChange={e => setDealId(e.target.value)}
                placeholder="DEAL-001"
                data-testid="doc-deal-input"
                style={FIELD_INPUT_STYLE}
              />
            </div>

            <div>
              <label style={FIELD_LABEL_STYLE}>Target Property Unit</label>
              <input
                type="text"
                value={propertyId}
                onChange={e => setPropertyId(e.target.value)}
                placeholder="REP-001"
                style={FIELD_INPUT_STYLE}
              />
            </div>
          </div>

          <div style={{ marginTop: 'auto', paddingTop: '16px' }}>
            <TaskActionBar
              isDirty={isDirty}
              onSave={() => handleSaveData(false)}
              onSaveAndClose={() => handleSaveData(true)}
              onCancel={() => confirmExit(onClose)}
              saveLabel="Save Document"
              saveAndCloseLabel="Save & Close"
              saveTestId="save-doc-btn"
            />
          </div>
        </form>
      </div>

      <UnsavedChangesModal isOpen={showPrompt} onProceed={proceed} onCancel={cancel} />
    </div>
  );
};
