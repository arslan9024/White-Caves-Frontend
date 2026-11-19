import React, { memo } from 'react';
import { UserCheck } from 'lucide-react';

interface Props {
  agentName?: string;
  shiftHours?: string;
}

export const LindaAgentShiftAssignmentBadge: React.FC<Props> = memo(
  ({ agentName = 'Arslan Malik', shiftHours = '09:00 - 18:00' }) => {
    return (
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '4px',
          fontSize: '10px',
          color: '#ccc',
          background: 'rgba(255,255,255,0.05)',
          padding: '2px 8px',
          borderRadius: '6px',
        }}
      >
        <UserCheck size={12} color="#00B0FF" />
        <span>
          {agentName} ({shiftHours})
        </span>
      </div>
    );
  }
);

export default LindaAgentShiftAssignmentBadge;
