import React from 'react';

interface WhatsAppManualModalProps {
  manualCodeInput: string;
  setManualCodeInput: (val: string) => void;
  onClose: () => void;
  onConfirm: () => void;
}

export const WhatsAppManualModal: React.FC<WhatsAppManualModalProps> = ({
  manualCodeInput,
  setManualCodeInput,
  onClose,
  onConfirm,
}) => {
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="manual-session-modal-title"
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(15, 23, 42, 0.75)',
        backdropFilter: 'blur(4px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 99999,
        padding: '1rem',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: 420,
          backgroundColor: '#0F172A',
          borderRadius: 16,
          border: '1px solid rgba(255, 255, 255, 0.15)',
          padding: '1.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
        }}
      >
        <h3
          id="manual-session-modal-title"
          style={{ margin: 0, color: '#FFFFFF', fontSize: '1.125rem' }}
        >
          Enter WhatsApp Session Code
        </h3>
        <p style={{ margin: 0, color: '#94A3B8', fontSize: '0.85rem' }}>
          Paste the verification code generated from your paired WhatsApp Web device.
        </p>
        <input
          type="text"
          data-testid="manual-session-code-input"
          placeholder="e.g. WA-SESSION-97150..."
          value={manualCodeInput}
          onChange={e => setManualCodeInput(e.target.value)}
          style={{
            width: '100%',
            padding: '10px 12px',
            background: '#1E293B',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: 8,
            color: '#FFFFFF',
            fontSize: '0.9rem',
            boxSizing: 'border-box',
          }}
        />
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            gap: '0.75rem',
            marginTop: '0.5rem',
          }}
        >
          <button
            type="button"
            onClick={onClose}
            style={{
              padding: '8px 14px',
              borderRadius: 8,
              background: 'transparent',
              border: '1px solid #475569',
              color: '#94A3B8',
              cursor: 'pointer',
              fontSize: '0.85rem',
            }}
          >
            Cancel
          </button>
          <button
            type="button"
            data-testid="confirm-manual-code-btn"
            onClick={onConfirm}
            disabled={!manualCodeInput.trim()}
            style={{
              padding: '8px 16px',
              borderRadius: 8,
              background: '#EF4444',
              border: 'none',
              color: '#FFFFFF',
              fontWeight: 700,
              cursor: manualCodeInput.trim() ? 'pointer' : 'not-allowed',
              opacity: manualCodeInput.trim() ? 1 : 0.6,
              fontSize: '0.85rem',
            }}
          >
            Verify Code
          </button>
        </div>
      </div>
    </div>
  );
};

