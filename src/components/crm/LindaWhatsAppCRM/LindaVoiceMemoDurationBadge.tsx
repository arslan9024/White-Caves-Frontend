import React, { memo } from 'react';
import { Mic } from 'lucide-react';

export const LindaVoiceMemoDurationBadge: React.FC<{ durationSec?: number }> = memo(
  ({ durationSec = 18 }) => (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '3px',
        color: '#888',
        fontSize: '9px',
      }}
    >
      <Mic size={10} color="#25D366" /> 0:{durationSec < 10 ? `0${durationSec}` : durationSec}
    </span>
  )
);
export default LindaVoiceMemoDurationBadge;
