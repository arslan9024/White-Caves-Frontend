import React, { memo } from 'react';
import { Octagon } from 'lucide-react';

export const LindaEmergencyStopBroadcastButton: React.FC<{ onStop?: () => void }> = memo(
  ({ onStop }) => (
    <button
      onClick={onStop}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '4px',
        background: 'rgba(239,68,68,0.15)',
        border: '1px solid rgba(239,68,68,0.4)',
        color: '#EF4444',
        padding: '3px 8px',
        borderRadius: '4px',
        fontSize: '10px',
        fontWeight: 700,
        cursor: 'pointer',
      }}
    >
      <Octagon size={11} /> Halt Outbound
    </button>
  )
);
export default LindaEmergencyStopBroadcastButton;
