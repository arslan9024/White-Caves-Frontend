import React, { memo } from 'react';

export const LindaCampaignExecutionProgressGauge: React.FC<{ pct?: number }> = memo(
  ({ pct = 68 }) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '10px' }}>
      <div
        style={{
          width: '60px',
          height: '4px',
          background: 'rgba(255,255,255,0.1)',
          borderRadius: '2px',
          overflow: 'hidden',
        }}
      >
        <div style={{ width: `${pct}%`, height: '100%', background: '#25D366' }} />
      </div>
      <span style={{ color: '#25D366', fontWeight: 700 }}>{pct}%</span>
    </div>
  )
);
export default LindaCampaignExecutionProgressGauge;
