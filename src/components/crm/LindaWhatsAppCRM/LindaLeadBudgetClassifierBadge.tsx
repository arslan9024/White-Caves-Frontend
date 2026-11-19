import React, { memo } from 'react';

export const LindaLeadBudgetClassifierBadge: React.FC<{ tier?: string }> = memo(
  ({ tier = '2M - 3M AED' }) => (
    <span
      style={{
        fontSize: '9px',
        color: '#FFD700',
        background: 'rgba(255,215,0,0.1)',
        padding: '1px 5px',
        borderRadius: '4px',
      }}
    >
      Budget: {tier}
    </span>
  )
);
export default LindaLeadBudgetClassifierBadge;
