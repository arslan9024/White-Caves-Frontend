import React, { memo } from 'react';
import { Flame } from 'lucide-react';

export const LindaLeadUrgencyPill: React.FC<{ score?: number }> = memo(({ score = 88 }) => {
  const isHot = score > 80;
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '3px',
        background: isHot ? 'rgba(255,82,82,0.15)' : 'rgba(255,165,0,0.15)',
        color: isHot ? '#FF5252' : '#FFA500',
        padding: '1px 6px',
        borderRadius: '10px',
        fontSize: '9px',
        fontWeight: 700,
      }}
    >
      <Flame size={10} /> {score}% Intent
    </span>
  );
});
export default LindaLeadUrgencyPill;
