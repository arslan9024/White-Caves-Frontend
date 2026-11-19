import React, { memo } from 'react';

export const LindaThreadTypingPulseIndicator: React.FC<{ contactName?: string }> = memo(
  ({ contactName = 'Client' }) => (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        fontSize: '10px',
        color: '#25D366',
        fontStyle: 'italic',
      }}
    >
      <span>{contactName} is typing...</span>
    </div>
  )
);
export default LindaThreadTypingPulseIndicator;
