import React, { memo } from 'react';
import { UserCheck } from 'lucide-react';

export const LindaClientPassportVerifiedPill: React.FC<{ isKycComplete?: boolean }> = memo(
  ({ isKycComplete = true }) => (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '3px',
        background: isKycComplete ? 'rgba(37,211,102,0.1)' : 'rgba(255,82,82,0.1)',
        color: isKycComplete ? '#25D366' : '#FF5252',
        padding: '1px 6px',
        borderRadius: '4px',
        fontSize: '9px',
      }}
    >
      <UserCheck size={10} />
      <span>KYC: {isKycComplete ? 'Verified' : 'Pending'}</span>
    </span>
  )
);
export default LindaClientPassportVerifiedPill;
