import React, { memo } from 'react';

interface Props {
  isSimulating: boolean;
  targetContact?: string;
}

export const LindaTypingSimulatorBadge: React.FC<Props> = memo(
  ({ isSimulating, targetContact }) => {
    if (!isSimulating) return null;

    return (
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          background: 'rgba(37,211,102,0.15)',
          padding: '2px 8px',
          borderRadius: '12px',
          fontSize: '10px',
          color: '#25D366',
        }}
      >
        <span style={{ display: 'flex', gap: '2px' }}>
          <span
            style={{ width: '4px', height: '4px', background: '#25D366', borderRadius: '50%' }}
          />
          <span
            style={{ width: '4px', height: '4px', background: '#25D366', borderRadius: '50%' }}
          />
          <span
            style={{ width: '4px', height: '4px', background: '#25D366', borderRadius: '50%' }}
          />
        </span>
        <span>Simulating human typing to {targetContact || 'client'}...</span>
      </div>
    );
  }
);

export default LindaTypingSimulatorBadge;
