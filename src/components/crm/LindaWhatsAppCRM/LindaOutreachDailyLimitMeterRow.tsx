import React, { memo } from 'react';

export const LindaOutreachDailyLimitMeterRow: React.FC<{ sent?: number; max?: number }> = memo(
  ({ sent = 28, max = 45 }) => (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        fontSize: '9px',
        color: '#94A3B8',
      }}
    >
      <span>Daily Send Limit:</span>
      <span style={{ color: sent > 35 ? '#F59E0B' : '#25D366', fontWeight: 700 }}>
        {sent}/{max}
      </span>
    </div>
  )
);
export default LindaOutreachDailyLimitMeterRow;
