import React, { memo } from 'react';
import { Activity } from 'lucide-react';

export const LindaGaussianTypingCurvePill: React.FC<{ wpm?: number }> = memo(({ wpm = 42 }) => (
  <span
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: '3px',
      background: 'rgba(37,211,102,0.1)',
      color: '#25D366',
      padding: '2px 6px',
      borderRadius: '4px',
      fontSize: '9px',
    }}
  >
    <Activity size={10} /> {wpm} WPM Gaussian
  </span>
));
export default LindaGaussianTypingCurvePill;
