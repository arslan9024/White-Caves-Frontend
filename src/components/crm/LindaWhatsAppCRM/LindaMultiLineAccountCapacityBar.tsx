import React, { memo } from 'react';

export const LindaMultiLineAccountCapacityBar: React.FC<{
  totalCapacity?: number;
  usedToday?: number;
}> = memo(({ totalCapacity = 225, usedToday = 142 }) => {
  const pct = Math.min(100, Math.round((usedToday / totalCapacity) * 100));
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        fontSize: '9px',
        color: '#94A3B8',
      }}
    >
      <span>Fleet Capacity:</span>
      <div
        style={{
          width: '50px',
          height: '4px',
          background: 'rgba(255,255,255,0.1)',
          borderRadius: '2px',
          overflow: 'hidden',
        }}
      >
        <div style={{ width: `${pct}%`, height: '100%', background: '#25D366' }} />
      </div>
      <span style={{ color: '#E2E8F0', fontWeight: 600 }}>
        {usedToday}/{totalCapacity}
      </span>
    </div>
  );
});
export default LindaMultiLineAccountCapacityBar;
