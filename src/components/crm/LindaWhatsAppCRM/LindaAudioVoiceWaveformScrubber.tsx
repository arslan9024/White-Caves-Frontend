import React, { memo, useState } from 'react';
import { Volume2 } from 'lucide-react';

export const LindaAudioVoiceWaveformScrubber: React.FC<{ duration?: string }> = memo(
  ({ duration = '0:22' }) => {
    const [pos, setPos] = useState(35);
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '4px 8px',
          background: 'rgba(0,0,0,0.25)',
          borderRadius: '6px',
          width: '200px',
        }}
      >
        <Volume2 size={12} color="#25D366" />
        <input
          type="range"
          min={0}
          max={100}
          value={pos}
          onChange={e => setPos(Number(e.target.value))}
          style={{ flex: 1, accentColor: '#25D366', height: '3px' }}
        />
        <span style={{ fontSize: '9px', color: '#888', fontFamily: 'monospace' }}>{duration}</span>
      </div>
    );
  }
);
export default LindaAudioVoiceWaveformScrubber;
