import React, { memo } from 'react';
import { ShieldCheck, Activity } from 'lucide-react';

interface Props {
  currentWpm?: number;
  jitterMs?: number;
  burstRemaining?: number;
}

export const LindaAntiBanPacingIndicator: React.FC<Props> = memo(
  ({ currentWpm = 42, jitterMs = 350, burstRemaining = 5 }) => {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          padding: '6px 12px',
          background: 'rgba(37,211,102,0.08)',
          borderRadius: '8px',
          border: '1px solid rgba(37,211,102,0.2)',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            color: '#25D366',
            fontSize: '11px',
            fontWeight: 600,
          }}
        >
          <ShieldCheck size={14} />
          <span>Anti-Ban Active</span>
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            color: '#ccc',
            fontSize: '11px',
          }}
        >
          <Activity size={12} color="#00B0FF" />
          <span>{currentWpm} WPM (Gaussian)</span>
        </div>
        <div style={{ fontSize: '11px', color: '#888' }}>Jitter: ±{jitterMs}ms</div>
        <div
          style={{
            fontSize: '11px',
            color: burstRemaining > 2 ? '#69F0AE' : '#FFA500',
            marginLeft: 'auto',
            fontWeight: 600,
          }}
        >
          Burst: {burstRemaining} msgs
        </div>
      </div>
    );
  }
);

export default LindaAntiBanPacingIndicator;
