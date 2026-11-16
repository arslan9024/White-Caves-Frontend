// FILE: src/components/crm/LindaWhatsAppCRM/LindaLinkQrTab.tsx
import React, { FC } from 'react';
import { RefreshCw, ShieldCheck } from 'lucide-react';

export interface LindaLinkQrTabProps {
  loading: boolean;
  qrCodeUrl: string | null;
  onRefreshQr: () => void;
  onConfirmLinked: () => void;
}

export const LindaLinkQrTab: FC<LindaLinkQrTabProps> = ({
  loading,
  qrCodeUrl,
  onRefreshQr,
  onConfirmLinked,
}) => (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
    {loading ? (
      <div style={{ height: 180, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <RefreshCw size={24} className="animate-spin" color="#25D366" />
      </div>
    ) : qrCodeUrl ? (
      <div style={{ background: '#FFF', padding: 8, borderRadius: 8 }}>
        <img
          data-testid="link-qr-code-img"
          src={qrCodeUrl}
          alt="WhatsApp QR"
          style={{ width: 170, height: 170, display: 'block' }}
        />
      </div>
    ) : (
      <div style={{ fontSize: 11, color: '#8696A0' }}>No QR Available</div>
    )}
    <div style={{ fontSize: 10, color: '#8696A0', textAlign: 'center' }}>
      WhatsApp → Linked Devices → Link a Device → Scan QR
    </div>
    <div style={{ display: 'flex', gap: 8, width: '100%' }}>
      <button
        type="button"
        data-testid="link-refresh-qr-btn"
        onClick={onRefreshQr}
        style={{
          flex: 1,
          padding: '7px 10px',
          background: '#202C33',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: 6,
          color: '#E9EDEF',
          fontSize: 10,
          fontWeight: 700,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 4,
        }}
      >
        <RefreshCw size={12} />
        <span>Refresh QR</span>
      </button>
      <button
        type="button"
        data-testid="link-qr-success-btn"
        onClick={onConfirmLinked}
        style={{
          flex: 1,
          padding: '7px 10px',
          background: '#25D366',
          border: 'none',
          borderRadius: 6,
          color: '#0B141A',
          fontSize: 10,
          fontWeight: 700,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 4,
        }}
      >
        <ShieldCheck size={12} />
        <span>Done Scanning</span>
      </button>
    </div>
  </div>
);
