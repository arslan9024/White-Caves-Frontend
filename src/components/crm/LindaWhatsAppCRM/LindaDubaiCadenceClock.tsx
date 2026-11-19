import React, { memo, useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

export const LindaDubaiCadenceClock: React.FC = memo(() => {
  const [timeStr, setTimeStr] = useState('');
  const [isBusinessHours, setIsBusinessHours] = useState(false);

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Dubai',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      };
      const dubaiTime = now.toLocaleTimeString('en-US', options);
      setTimeStr(dubaiTime);

      const hour = parseInt(dubaiTime.split(':')[0], 10);
      setIsBusinessHours(hour >= 9 && hour < 20);
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        padding: '4px 10px',
        background: 'rgba(0,0,0,0.3)',
        borderRadius: '8px',
        border: '1px solid rgba(255,255,255,0.1)',
      }}
    >
      <Clock size={12} color="#00B0FF" />
      <span style={{ fontSize: '11px', color: '#fff', fontFamily: 'monospace' }}>
        {timeStr} GST
      </span>
      <span
        style={{
          width: '6px',
          height: '6px',
          borderRadius: '50%',
          background: isBusinessHours ? '#25D366' : '#FFA500',
        }}
      />
      <span style={{ fontSize: '10px', color: isBusinessHours ? '#69F0AE' : '#FFA500' }}>
        {isBusinessHours ? 'Active Window' : 'Cadence Pause'}
      </span>
    </div>
  );
});

export default LindaDubaiCadenceClock;
