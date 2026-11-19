import React, { memo, useState, useRef } from 'react';
import { Play, Pause, Volume2 } from 'lucide-react';

interface AudioProps {
  src?: string;
  durationSec?: number;
}

export const LindaAudioVoicePlayer: React.FC<AudioProps> = memo(({ durationSec = 14 }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        background: 'rgba(0,0,0,0.2)',
        padding: '6px 12px',
        borderRadius: '16px',
        width: '220px',
      }}
    >
      <button
        onClick={togglePlay}
        style={{
          background: '#25D366',
          border: 'none',
          borderRadius: '50%',
          width: '28px',
          height: '28px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          color: '#fff',
        }}
      >
        {isPlaying ? <Pause size={14} /> : <Play size={14} />}
      </button>
      <div
        style={{
          flex: 1,
          height: '4px',
          background: 'rgba(255,255,255,0.2)',
          borderRadius: '2px',
          position: 'relative',
        }}
      >
        <div
          style={{
            width: `${progress}%`,
            height: '100%',
            background: '#25D366',
            borderRadius: '2px',
          }}
        />
      </div>
      <span style={{ fontSize: '10px', color: '#aaa' }}>
        0:{durationSec < 10 ? `0${durationSec}` : durationSec}
      </span>
      <Volume2 size={12} color="#aaa" />
    </div>
  );
});

export default LindaAudioVoicePlayer;
