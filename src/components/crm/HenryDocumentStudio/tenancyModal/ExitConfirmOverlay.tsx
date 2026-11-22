import React, { FC } from 'react';
import { AlertCircle } from 'lucide-react';
import { HeaderBtn } from '../styles/HenryTenancyContractModal.style';

export interface ExitConfirmOverlayProps {
  onContinueEditing: () => void;
  onConfirmClose: () => void;
}

export const ExitConfirmOverlay: FC<ExitConfirmOverlayProps> = ({
  onContinueEditing,
  onConfirmClose,
}) => (
  <div
    style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.75)',
      zIndex: 999999,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backdropFilter: 'blur(4px)',
    }}
    onClick={e => e.stopPropagation()}
  >
    <div
      style={{
        background: '#0F172A',
        border: '1px solid #334155',
        borderRadius: '16px',
        padding: '24px',
        maxWidth: '420px',
        width: '90%',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
        color: '#F8FAFC',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
        <div
          style={{
            background: 'rgba(239, 68, 68, 0.2)',
            padding: '10px',
            borderRadius: '12px',
            color: 'var(--accent-red, #EF4444)',
          }}
        >
          <AlertCircle size={24} />
        </div>
        <h4 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 800 }}>
          Exit Tenancy Preparation?
        </h4>
      </div>

      <p
        style={{
          fontSize: '0.85rem',
          color: 'var(--color-94a3b8, #94A3B8)',
          lineHeight: 1.5,
          margin: '0 0 20px 0',
        }}
      >
        Your current progress is automatically saved to your draft vault. Do you want to continue
        editing or close the wizard?
      </p>

      <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
        <HeaderBtn $variant="secondary" onClick={onContinueEditing}>
          Continue Editing
        </HeaderBtn>
        <HeaderBtn $variant="danger" onClick={onConfirmClose}>
          Save & Exit
        </HeaderBtn>
      </div>
    </div>
  </div>
);
