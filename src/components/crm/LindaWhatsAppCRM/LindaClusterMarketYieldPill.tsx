import React, { memo } from 'react';
import { TrendingUp } from 'lucide-react';

export const LindaClusterMarketYieldPill: React.FC<{ yieldPct?: string }> = memo(
  ({ yieldPct = '6.8%' }) => (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '3px',
        background: 'rgba(0,176,255,0.1)',
        color: '#00B0FF',
        padding: '2px 6px',
        borderRadius: '4px',
        fontSize: '9px',
        fontWeight: 600,
      }}
    >
      <TrendingUp size={10} /> Yield: {yieldPct}
    </span>
  )
);
export default LindaClusterMarketYieldPill;
