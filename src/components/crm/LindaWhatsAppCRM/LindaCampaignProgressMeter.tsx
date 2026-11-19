import React, { memo } from 'react';

export const LindaCampaignProgressMeter: React.FC<{ sent: number; total: number }> = memo(
  ({ sent = 42, total = 50 }) => {
    const pct = Math.min(100, Math.round((sent / total) * 100));
    return (
      <div
        style={{
          width: '100%',
          height: '4px',
          background: 'rgba(255,255,255,0.1)',
          borderRadius: '2px',
          overflow: 'hidden',
        }}
      >
        <div style={{ width: `${pct}%`, height: '100%', background: '#25D366' }} />
      </div>
    );
  }
);
export default LindaCampaignProgressMeter;
