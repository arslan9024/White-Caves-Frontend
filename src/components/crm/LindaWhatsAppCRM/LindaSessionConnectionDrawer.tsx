import React, { memo } from 'react';
import { Wifi, RefreshCw } from 'lucide-react';

export const LindaSessionConnectionDrawer: React.FC<{ isOpen?: boolean; onClose?: () => void }> =
  memo(({ isOpen = false, onClose }) => {
    if (!isOpen) return null;
    return (
      <div
        style={{
          padding: '12px',
          background: '#1E293B',
          borderBottom: '1px solid #334155',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '11px',
            color: '#F8FAFC',
          }}
        >
          <Wifi size={14} color="#25D366" />
          <span>Connected to 5 WhatsApp Instances • Zero SingletonLock Contention</span>
        </div>
        <button
          onClick={onClose}
          style={{
            background: 'none',
            border: 'none',
            color: '#94A3B8',
            fontSize: '12px',
            cursor: 'pointer',
          }}
        >
          Close
        </button>
      </div>
    );
  });
export default LindaSessionConnectionDrawer;
