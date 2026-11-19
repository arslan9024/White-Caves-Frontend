import React, { memo } from 'react';
import { User } from 'lucide-react';

export const LindaLeadAssignedAgentChip: React.FC<{ agentName?: string }> = memo(
  ({ agentName = 'Arslan Malik' }) => (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '3px',
        background: 'rgba(255,255,255,0.04)',
        padding: '2px 6px',
        borderRadius: '4px',
        fontSize: '9px',
        color: '#aaa',
      }}
    >
      <User size={10} color="#00B0FF" /> {agentName}
    </div>
  )
);
export default LindaLeadAssignedAgentChip;
