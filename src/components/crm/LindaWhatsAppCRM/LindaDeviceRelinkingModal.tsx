import React, { memo, useState } from 'react';
import { QrCode, RefreshCw } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  phone: string;
}

export const LindaDeviceRelinkingModal: React.FC<Props> = memo(({ isOpen, onClose, phone }) => {
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.7)',
        zIndex: 1100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          background: '#1c1c28',
          padding: '24px',
          borderRadius: '12px',
          border: '1px solid rgba(255,255,255,0.1)',
          textAlign: 'center',
          color: '#fff',
          maxWidth: '320px',
        }}
      >
        <h4 style={{ margin: '0 0 12px 0', fontSize: '14px' }}>Relink Device: {phone}</h4>
        <div
          style={{
            width: '180px',
            height: '180px',
            background: '#fff',
            margin: '0 auto 16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '8px',
          }}
        >
          <QrCode size={140} color="#000" />
        </div>
        <p style={{ fontSize: '11px', color: '#aaa', margin: '0 0 16px 0' }}>
          Scan using Linked Devices in WhatsApp on your mobile phone.
        </p>
        <button
          onClick={onClose}
          style={{
            background: '#25D366',
            border: 'none',
            borderRadius: '6px',
            padding: '6px 16px',
            color: '#fff',
            fontSize: '12px',
            cursor: 'pointer',
          }}
        >
          Done / Close
        </button>
      </div>
    </div>
  );
});

export default LindaDeviceRelinkingModal;
