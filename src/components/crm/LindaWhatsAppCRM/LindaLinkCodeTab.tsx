// FILE: src/components/crm/LindaWhatsAppCRM/LindaLinkCodeTab.tsx
import React, { FC } from 'react';
import { KeyRound, CheckCircle2 } from 'lucide-react';
import { inputFieldStyle, primaryActionBtnStyle } from './LindaLinkAccountModal.style';

export interface LindaLinkCodeTabProps {
  phoneNumber: string;
  setPhoneNumber: (v: string) => void;
  pairingCode: string | null;
  countdown: number;
  loading: boolean;
  onGenerateCode: () => void;
  onConfirmLinked: () => void;
}

export const LindaLinkCodeTab: FC<LindaLinkCodeTabProps> = ({
  phoneNumber,
  setPhoneNumber,
  pairingCode,
  countdown,
  loading,
  onGenerateCode,
  onConfirmLinked,
}) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
    <div>
      <label style={{ fontSize: 11, color: '#8696A0', display: 'block', marginBottom: 4 }}>
        WhatsApp Phone (with Country Code)
      </label>
      <input
        type="text"
        data-testid="link-phone-input"
        placeholder="+971 50 123 4567"
        value={phoneNumber}
        onChange={e => setPhoneNumber(e.target.value)}
        style={inputFieldStyle}
      />
    </div>
    {!pairingCode ? (
      <button
        type="button"
        data-testid="link-generate-code-btn"
        onClick={onGenerateCode}
        disabled={loading}
        style={primaryActionBtnStyle}
      >
        <KeyRound size={15} />
        <span>{loading ? 'Generating...' : 'Generate 8-Digit Pairing Code'}</span>
      </button>
    ) : (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div
          style={{
            background: 'rgba(37, 211, 102, 0.1)',
            border: '1px dashed #25D366',
            borderRadius: 8,
            padding: 12,
            textAlign: 'center',
          }}
        >
          <div style={{ fontSize: 10, color: '#8696A0', textTransform: 'uppercase' }}>
            Enter Code on Device
          </div>
          <div
            data-testid="link-pairing-code-display"
            style={{
              fontSize: 24,
              fontWeight: 900,
              letterSpacing: 3,
              color: '#25D366',
              fontFamily: 'monospace',
              margin: '6px 0',
            }}
          >
            {pairingCode}
          </div>
          <div style={{ fontSize: 10, color: '#E9EDEF' }}>Expires in {countdown}s</div>
        </div>
        <div style={{ fontSize: 10, color: '#8696A0', lineHeight: 1.4 }}>
          WhatsApp → Linked Devices → Link with phone number instead → Enter code
        </div>
        <button
          type="button"
          data-testid="link-confirm-paired-btn"
          onClick={onConfirmLinked}
          style={{
            padding: '8px 12px',
            background: 'rgba(37, 211, 102, 0.2)',
            border: '1px solid #25D366',
            borderRadius: 6,
            color: '#25D366',
            fontWeight: 700,
            fontSize: 11,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 6,
          }}
        >
          <CheckCircle2 size={14} />
          <span>Confirm Linked & Connect</span>
        </button>
      </div>
    )}
  </div>
);
