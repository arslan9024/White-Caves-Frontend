import React, { memo } from 'react';

export const LindaTitleDeedVerificationBadgeMini: React.FC<{ verified?: boolean }> = memo(
  ({ verified = true }) => (
    <span style={{ fontSize: '9px', color: verified ? '#25D366' : '#64748B' }}>
      {verified ? '🛡️ DLD Verified' : '○ Title Pending'}
    </span>
  )
);
export default LindaTitleDeedVerificationBadgeMini;
