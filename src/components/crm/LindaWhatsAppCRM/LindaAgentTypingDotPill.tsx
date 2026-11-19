import React, { memo } from 'react';

export const LindaAgentTypingDotPill: React.FC = memo(() => (
  <span style={{ display: 'inline-flex', gap: '2px', alignItems: 'center', padding: '2px 4px' }}>
    <span style={{ width: '3px', height: '3px', background: '#25D366', borderRadius: '50%' }} />
    <span style={{ width: '3px', height: '3px', background: '#25D366', borderRadius: '50%' }} />
    <span style={{ width: '3px', height: '3px', background: '#25D366', borderRadius: '50%' }} />
  </span>
));
export default LindaAgentTypingDotPill;
