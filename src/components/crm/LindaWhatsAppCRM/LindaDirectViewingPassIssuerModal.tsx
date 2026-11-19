import React, { memo } from 'react';
import { QrCode, X } from 'lucide-react';

export const LindaDirectViewingPassIssuerModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  cluster?: string;
  unit?: string;
}> = memo(({ isOpen, onClose, cluster = 'Amazon', unit = 'Villa 14' }) => {
  if (!isOpen) return null;
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.75)',
        zIndex: 1300,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          background: '#1a1a2e',
          width: '320px',
          padding: '16px',
          borderRadius: '12px',
          border: '1px solid rgba(37,211,102,0.3)',
          color: '#fff',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '12px',
          }}
        >
          <h4 style={{ margin: 0, fontSize: '12px', color: '#25D366' }}>
            Damac Hills 2 Viewing Pass
          </h4>
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
            padding: '12px',
            borderRadius: '8px',
            display: 'inline-block',
            marginBottom: '8px',
          }}
        >
          <QrCode size={120} color="#000" />
        </div>
        <p style={{ fontSize: '10px', color: '#ccc', margin: 0 }}>
          Gate Entry Pass: {cluster} • {unit}
        </p>
      </div>
    </div>
  );
});
export default LindaDirectViewingPassIssuerModal;
