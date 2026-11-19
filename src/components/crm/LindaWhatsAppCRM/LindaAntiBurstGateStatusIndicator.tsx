import React, { memo } from 'react';
import { ShieldCheck } from 'lucide-react';

export const LindaAntiBurstGateStatusIndicator: React.FC<{ status?: string }> = memo(
  ({ status = 'Armed (Max 6/5min)' }) => (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '4px',
        color: '#25D366',
        fontSize: '10px',
      }}
    >
      <ShieldCheck size={12} /> <span>Anti-Burst: {status}</span>
    </div>
  )
);
export default LindaAntiBurstGateStatusIndicator;
