import React, { memo } from 'react';

export const LindaAudioSpeedMultiplierBadge: React.FC<{ rate?: string }> = memo(
  ({ rate = '1.5x' }) => (
    <span
      style={{
        background: 'rgba(255,255,255,0.08)',
        color: '#25D366',
        padding: '1px 5px',
        borderRadius: '4px',
        fontSize: '9px',
        fontWeight: 700,
      }}
    >
      {rate}
    </span>
  )
);
export default LindaAudioSpeedMultiplierBadge;
