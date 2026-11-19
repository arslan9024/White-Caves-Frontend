import React, { memo } from 'react';

export const LindaBuyerMortgagePreApprovalPill: React.FC<{
  isCash?: boolean;
  isPreApproved?: boolean;
}> = memo(({ isCash = true, isPreApproved = false }) => (
  <span
    style={{
      display: 'inline-flex',
      padding: '1px 5px',
      borderRadius: '3px',
      fontSize: '9px',
      background: isCash ? 'rgba(37,211,102,0.15)' : 'rgba(0,176,255,0.15)',
      color: isCash ? '#25D366' : '#00B0FF',
      fontWeight: 600,
    }}
  >
    {isCash ? '💵 Cash Buyer' : isPreApproved ? '🏦 Mortgage Approved' : '🏦 Mortgage Seeking'}
  </span>
));
export default LindaBuyerMortgagePreApprovalPill;
