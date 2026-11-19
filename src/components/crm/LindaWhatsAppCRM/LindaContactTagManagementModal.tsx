import React, { memo } from 'react';

export const LindaContactTagManagementModal: React.FC<{ isOpen: boolean; onClose: () => void }> =
  memo(({ isOpen, onClose }) => {
    if (!isOpen) return null;
    return (
      <div
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.7)',
          zIndex: 1200,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            background: '#1c1c28',
            width: '300px',
            padding: '16px',
            borderRadius: '10px',
            color: '#fff',
          }}
        >
          <h4 style={{ margin: '0 0 10px 0', fontSize: '12px' }}>Custom Lead Tags</h4>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginBottom: '12px' }}>
            {['V2 Owner', 'Investor Club', 'VIP Russian', 'Off-Plan Buyer'].map(t => (
              <span
                key={t}
                style={{
                  background: 'rgba(37,211,102,0.1)',
                  color: '#25D366',
                  padding: '2px 6px',
                  borderRadius: '4px',
                  fontSize: '10px',
                }}
              >
                {t}
              </span>
            ))}
          </div>
          <button
            onClick={onClose}
            style={{
              width: '100%',
              background: '#334155',
              border: 'none',
              color: '#fff',
              borderRadius: '4px',
              padding: '6px',
              fontSize: '10px',
              cursor: 'pointer',
            }}
          >
            Close
          </button>
        </div>
      </div>
    );
  });
export default LindaContactTagManagementModal;
