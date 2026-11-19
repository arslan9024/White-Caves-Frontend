import React, { memo } from 'react';

export const LindaAudioPlaybackProgressBar: React.FC<{ progressPct?: number }> = memo(
  ({ progressPct = 45 }) => (
    <div
      style={{
        width: '100%',
        height: '4px',
        background: 'rgba(255,255,255,0.1)',
        borderRadius: '2px',
        overflow: 'hidden',
      }}
    >
      <div style={{ width: `${progressPct}%`, height: '100%', background: '#25D366' }} />
    </div>
  )
);
export default LindaAudioPlaybackProgressBar;
