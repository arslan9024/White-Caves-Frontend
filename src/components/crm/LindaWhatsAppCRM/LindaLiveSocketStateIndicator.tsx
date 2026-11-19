import React, { memo } from 'react';
import { Radio } from 'lucide-react';

export const LindaLiveSocketStateIndicator: React.FC<{ connected?: boolean; latencyMs?: number }> =
  memo(({ connected = true, latencyMs = 24 }) => (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
        fontSize: '10px',
        color: connected ? '#25D366' : '#FF5252',
      }}
    >
      <Radio size={12} />
      <span>WSS {connected ? `Live (${latencyMs}ms)` : 'Reconnecting...'}</span>
    </div>
  ));
export default LindaLiveSocketStateIndicator;
