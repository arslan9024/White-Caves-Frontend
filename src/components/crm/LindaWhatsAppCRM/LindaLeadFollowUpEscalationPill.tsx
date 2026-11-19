import React, { memo } from 'react';
import { ArrowUpRight } from 'lucide-react';

export const LindaLeadFollowUpEscalationPill: React.FC<{
  level?: 'LEVEL_1' | 'LEVEL_2' | 'DIRECTOR';
}> = memo(({ level = 'LEVEL_1' }) => (
  <span
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: '2px',
      background: 'rgba(255,82,82,0.12)',
      color: '#FF5252',
      border: '1px solid rgba(255,82,82,0.3)',
      padding: '1px 5px',
      borderRadius: '4px',
      fontSize: '9px',
      fontWeight: 700,
    }}
  >
    <ArrowUpRight size={10} /> Escalate: {level}
  </span>
));
export default LindaLeadFollowUpEscalationPill;
