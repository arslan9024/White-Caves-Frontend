import React, { memo } from 'react';

export const LindaOutreachDailyLimitIndicator: React.FC<{ remaining?: number }> = memo(
  ({ remaining = 7 }) => (
    <span style={{ fontSize: '9px', color: remaining > 5 ? '#69F0AE' : '#FFA500' }}>
      {remaining} messages left in quota
    </span>
  )
);
export default LindaOutreachDailyLimitIndicator;
