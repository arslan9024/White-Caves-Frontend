import React, { memo } from 'react';

export const LindaAccountUnreadBadgeRow: React.FC<{ unreads?: Record<string, number> }> = memo(
  ({ unreads = { 'Master 1': 4, 'Master 2': 0, 'Master 3': 2, Employee: 1, Servant: 0 } }) => (
    <div style={{ display: 'flex', gap: '8px', fontSize: '10px', color: '#94A3B8' }}>
      {Object.entries(unreads).map(([name, count]) => (
        <span key={name} style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
          {name}: <strong style={{ color: count > 0 ? '#25D366' : '#64748B' }}>{count}</strong>
        </span>
      ))}
    </div>
  )
);
export default LindaAccountUnreadBadgeRow;
