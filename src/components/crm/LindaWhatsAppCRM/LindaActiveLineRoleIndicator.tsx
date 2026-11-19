import React, { memo } from 'react';
import { Shield } from 'lucide-react';

export const LindaActiveLineRoleIndicator: React.FC<{
  role?: 'PRIMARY_MASTER' | 'SECONDARY_MASTER' | 'EMPLOYEE' | 'SERVANT';
}> = memo(({ role = 'PRIMARY_MASTER' }) => {
  const meta = {
    PRIMARY_MASTER: { bg: '#25D36620', color: '#25D366', label: '👑 Primary Master' },
    SECONDARY_MASTER: { bg: '#00B0FF20', color: '#00B0FF', label: '⭐ Master Line' },
    EMPLOYEE: { bg: '#E040FB20', color: '#E040FB', label: '🏢 Employee Desk' },
    SERVANT: { bg: '#FFA50020', color: '#FFA500', label: '📡 Outreach Line' },
  }[role];
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '4px',
        background: meta.bg,
        color: meta.color,
        padding: '2px 8px',
        borderRadius: '4px',
        fontSize: '10px',
        fontWeight: 600,
      }}
    >
      <Shield size={11} /> {meta.label}
    </span>
  );
});
export default LindaActiveLineRoleIndicator;
