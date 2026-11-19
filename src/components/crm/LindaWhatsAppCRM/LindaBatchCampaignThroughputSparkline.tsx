import React, { memo } from 'react';

export const LindaBatchCampaignThroughputSparkline: React.FC = memo(() => (
  <div style={{ display: 'flex', alignItems: 'flex-end', gap: '2px', height: '14px' }}>
    {[3, 6, 4, 9, 7, 5, 8, 10, 6, 8].map((h, i) => (
      <span key={i} style={{ width: '2px', height: `${h * 10}%`, background: '#25D366' }} />
    ))}
  </div>
));
export default LindaBatchCampaignThroughputSparkline;
