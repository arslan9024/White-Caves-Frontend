import React, { memo } from 'react';
import { QrCode, X } from 'lucide-react';

export const LindaAccountPairingQrModal: React.FC<{
  isOpen?: boolean;
  onClose?: () => void;
  phone?: string;
}> = memo(({ isOpen, onClose, phone = '+971505760056' }) => {
  if (!isOpen) return null;
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.8)',
        zIndex: 1300,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          background: '#0F172A',
          padding: '20px',
          borderRadius: '12px',
          border: '1px solid #334155',
          textAlign: 'center',
          color: '#fff',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
          <span style={{ fontSize: '12px', fontWeight: 600 }}>Pair {phone}</span>
          <button
            onClick={onClose}
            style={{ background: 'none', border: 'none', color: '#aaa', cursor: 'pointer' }}
          >
            <X size={14} />
          </button>
        </div>
        <div
          style={{
            background: '#fff',
            padding: '16px',
            borderRadius: '8px',
            display: 'inline-block',
            marginBottom: '12px',
          }}
        >
          <QrCode size={160} color="#000" />
        </div>
        <p style={{ margin: 0, fontSize: '10px', color: '#94A3B8' }}>
          Scan in WhatsApp › Linked Devices
        </p>
      </div>
    </div>
  );
});
export default LindaAccountPairingQrModal;
