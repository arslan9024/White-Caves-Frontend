import React, { memo } from 'react';

export const LindaMasterAccountSelectionModal: React.FC<{
  isOpen?: boolean;
  onClose?: () => void;
}> = memo(({ isOpen, onClose }) => {
  if (!isOpen) return null;
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.7)',
        zIndex: 1250,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          background: '#1E293B',
          padding: '16px',
          borderRadius: '10px',
          width: '300px',
          color: '#fff',
        }}
      >
        <h4 style={{ margin: '0 0 10px 0', fontSize: '13px' }}>Select Active WhatsApp Line</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {[
            '+971505760056 (Arslan Malik)',
            '+971503869886 (Master 2)',
            '+971505110636 (Master 3)',
          ].map(acc => (
            <button
              key={acc}
              onClick={onClose}
              style={{
                padding: '6px',
                textAlign: 'left',
                background: 'rgba(255,255,255,0.05)',
                border: 'none',
                color: '#E2E8F0',
                borderRadius: '4px',
                fontSize: '11px',
                cursor: 'pointer',
              }}
            >
              {acc}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
});
export default LindaMasterAccountSelectionModal;
