import React, { FC } from 'react';
import { X, Printer, RotateCcw, Sparkles, UploadCloud } from 'lucide-react';
import { ModalHeader, HeaderBtn } from '../styles/HenryTenancyContractModal.style';

export interface TenancyModalHeaderProps {
  statusMessage: string | null;
  onTriggerMasterUpload: () => void;
  onResetToBlank: () => void;
  onLoadCameliaSample: () => void;
  onLoadJanusiaSample: () => void;
  onPrint: () => void;
  onAttemptClose: () => void;
}

export const TenancyModalHeader: FC<TenancyModalHeaderProps> = ({
  statusMessage,
  onTriggerMasterUpload,
  onResetToBlank,
  onLoadCameliaSample,
  onLoadJanusiaSample,
  onPrint,
  onAttemptClose,
}) => (
  <>
    <ModalHeader>
      <div className="header-left">
        <span style={{ fontSize: '1.8rem' }}>🏛️</span>
        <div>
          <h3 className="header-title">
            Prepare New Tenancy Contract{' '}
            <span style={{ color: 'var(--accent-red, #EF4444)' }}>
              · Official DLD Unified Template
            </span>
          </h3>
          <p className="header-subtitle">
            Government of Dubai / Land Department Bilingual Form (عقد إيجار) · Guided 6-Stage
            Preparation & Auto-Fill
          </p>
        </div>
      </div>

      <div className="header-actions">
        <HeaderBtn
          $variant="primary"
          onClick={onTriggerMasterUpload}
          title="Upload full tenancy contract to auto-fill all fields at once"
          style={{
            background:
              'linear-gradient(135deg, var(--accent-red, #EF4444), var(--accent-red, #DC2626))',
            color: 'var(--white, #FFF)',
          }}
        >
          <UploadCloud size={14} /> Upload Contract & Auto-Fill
        </HeaderBtn>
        <HeaderBtn onClick={onResetToBlank} title="Reset to fresh blank official DLD template">
          <RotateCcw size={14} /> Blank Template
        </HeaderBtn>
        <HeaderBtn onClick={onLoadCameliaSample} title="Load benchmark sample: Camelia 608">
          <Sparkles size={14} color="#F59E0B" /> Camelia 608
        </HeaderBtn>
        <HeaderBtn onClick={onLoadJanusiaSample} title="Load benchmark sample: Janusia XH2858B">
          <Sparkles size={14} color="#38BDF8" /> Janusia XH2858B
        </HeaderBtn>
        <HeaderBtn $variant="secondary" onClick={onPrint}>
          <Printer size={14} /> Print / PDF
        </HeaderBtn>
        <HeaderBtn $variant="danger" onClick={onAttemptClose} title="Close / Exit Wizard">
          <X size={16} />
        </HeaderBtn>
      </div>
    </ModalHeader>

    {statusMessage && (
      <div
        style={{
          background: 'linear-gradient(90deg, rgba(239, 68, 68, 0.15), rgba(15, 23, 42, 0.9))',
          borderBottom: '1px solid rgba(239, 68, 68, 0.3)',
          padding: '6px 1.75rem',
          fontSize: '0.82rem',
          fontWeight: 700,
          color: '#38BDF8',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        <span>⚡</span> {statusMessage}
      </div>
    )}
  </>
);
