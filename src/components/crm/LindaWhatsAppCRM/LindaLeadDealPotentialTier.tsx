import React, { memo } from 'react';

export const LindaLeadDealPotentialTier: React.FC<{
  tier?: 'TIER_1_VIP' | 'TIER_2_BUYER' | 'TIER_3_INVESTOR';
}> = memo(({ tier = 'TIER_1_VIP' }) => {
  const meta = {
    TIER_1_VIP: { color: '#FFD700', bg: 'rgba(255,215,0,0.1)', text: '👑 VIP Deal (>3M)' },
    TIER_2_BUYER: { color: '#00B0FF', bg: 'rgba(0,176,255,0.1)', text: '💼 Direct Buyer' },
    TIER_3_INVESTOR: {
      color: '#25D366',
      bg: 'rgba(37,211,102,0.1)',
      text: '📈 Portfolio Investor',
    },
  }[tier];
  return (
    <span
      style={{
        display: 'inline-flex',
        padding: '2px 6px',
        borderRadius: '4px',
        background: meta.bg,
        color: meta.color,
        fontSize: '9px',
        fontWeight: 700,
      }}
    >
      {meta.text}
    </span>
  );
});
export default LindaLeadDealPotentialTier;
