import React, { memo } from 'react';

export const LindaLeadAssignedBrokerAvatarSnippet: React.FC<{ brokerName?: string }> = memo(
  ({ brokerName = 'Arslan Malik' }) => (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
        fontSize: '10px',
        color: '#94A3B8',
      }}
    >
      <span
        style={{
          width: '16px',
          height: '16px',
          borderRadius: '50%',
          background: '#25D366',
          color: '#000',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: 800,
          fontSize: '8px',
        }}
      >
        {brokerName.charAt(0)}
      </span>
      <span>{brokerName}</span>
    </div>
  )
);
export default LindaLeadAssignedBrokerAvatarSnippet;
