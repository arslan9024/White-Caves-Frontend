import React, { memo } from 'react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const LindaBroadcastHistoryModal: React.FC<Props> = memo(({ isOpen, onClose }) => {
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
          width: '420px',
          padding: '20px',
          borderRadius: '12px',
          color: '#fff',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '14px' }}>
          <h4 style={{ margin: 0, fontSize: '13px' }}>Recent Broadcast Campaigns</h4>
          <button
            onClick={onClose}
            style={{ background: 'none', border: 'none', color: '#888', cursor: 'pointer' }}
          >
            ✕
          </button>
        </div>
        <div
          style={{
            fontSize: '11px',
            color: '#aaa',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
          }}
        >
          <div
            style={{ padding: '8px', background: 'rgba(255,255,255,0.03)', borderRadius: '6px' }}
          >
            <div style={{ fontWeight: 600, color: '#25D366' }}>Damac Hills 2 Investors Wave 4</div>
            <div>Sent: 180 msgs • Success: 98.2% • 5 Lines Rotated</div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default LindaBroadcastHistoryModal;
