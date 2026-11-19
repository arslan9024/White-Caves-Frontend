import React, { memo, useState } from 'react';

export const LindaAudioPlaybackSpeedToggle: React.FC<{ onToggle?: (rate: number) => void }> = memo(
  ({ onToggle }) => {
    const [speed, setSpeed] = useState(1);
    const next = () => {
      const s = speed === 1 ? 1.5 : speed === 1.5 ? 2 : 1;
      setSpeed(s);
      onToggle?.(s);
    };
    return (
      <button
        onClick={next}
        style={{
          background: 'rgba(255,255,255,0.06)',
          border: 'none',
          borderRadius: '4px',
          padding: '2px 6px',
          color: '#25D366',
          fontSize: '9px',
          fontWeight: 700,
          cursor: 'pointer',
        }}
      >
        {speed}x
      </button>
    );
  }
);
export default LindaAudioPlaybackSpeedToggle;
