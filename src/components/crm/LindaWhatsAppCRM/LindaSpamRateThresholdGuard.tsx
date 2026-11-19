import React, { memo } from 'react';
import { Shield, Check } from 'lucide-react';

interface Props {
  spamRatio?: number;
}

export const LindaSpamRateThresholdGuard: React.FC<Props> = memo(({ spamRatio = 0.02 }) => {
  const isSafe = spamRatio < 0.05;

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        padding: '4px 8px',
        background: isSafe ? 'rgba(37,211,102,0.05)' : 'rgba(255,82,82,0.1)',
        borderRadius: '6px',
        border: `1px solid ${isSafe ? '#25D36630' : '#FF525230'}`,
      }}
    >
      <Shield size={12} color={isSafe ? '#25D366' : '#FF5252'} />
      <span style={{ fontSize: '10px', color: isSafe ? '#69F0AE' : '#FF5252' }}>
        Spam Ratio: {(spamRatio * 100).toFixed(1)}% ({isSafe ? 'Healthy' : 'High Risk'})
      </span>
    </div>
  );
});

export default LindaSpamRateThresholdGuard;
