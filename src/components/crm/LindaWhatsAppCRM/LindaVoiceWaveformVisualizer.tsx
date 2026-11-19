import React, { memo } from 'react';

export const LindaVoiceWaveformVisualizer: React.FC<{ active?: boolean }> = memo(
  ({ active = true }) => {
    const bars = [40, 70, 30, 90, 60, 20, 80, 50, 100, 45, 65, 85, 35, 75, 55];
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: '2px', height: '20px' }}>
        {bars.map((h, i) => (
          <span
            key={i}
            style={{
              width: '2px',
              height: `${active ? h : 20}%`,
              background: '#25D366',
              borderRadius: '1px',
            }}
          />
        ))}
      </div>
    );
  }
);
export default LindaVoiceWaveformVisualizer;
