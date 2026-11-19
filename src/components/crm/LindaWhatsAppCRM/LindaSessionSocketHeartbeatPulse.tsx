import React, { memo } from 'react';

export const LindaSessionSocketHeartbeatPulse: React.FC<{ latencyMs?: number }> = memo(
  ({ latencyMs = 28 }) => (
    <span style={{ fontSize: '9px', color: latencyMs < 50 ? '#25D366' : '#F59E0B' }}>
      ⚡ {latencyMs}ms WSS
    </span>
  )
);
export default LindaSessionSocketHeartbeatPulse;
