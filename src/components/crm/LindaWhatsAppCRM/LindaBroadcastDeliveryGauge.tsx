import React, { memo } from 'react';

export const LindaBroadcastDeliveryGauge: React.FC<{ delivered?: number; total?: number }> = memo(
  ({ delivered = 94, total = 100 }) => (
    <div
      style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '10px', color: '#aaa' }}
    >
      <span>Delivery Rate:</span>
      <span style={{ color: '#25D366', fontWeight: 700 }}>
        {Math.round((delivered / total) * 100)}%
      </span>
    </div>
  )
);
export default LindaBroadcastDeliveryGauge;
