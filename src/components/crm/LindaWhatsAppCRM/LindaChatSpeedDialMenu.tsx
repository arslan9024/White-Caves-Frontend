import React, { memo } from 'react';
import { PhoneCall, Calendar, MapPin, Send } from 'lucide-react';

interface Props {
  onAction: (act: string) => void;
}

export const LindaChatSpeedDialMenu: React.FC<Props> = memo(({ onAction }) => {
  return (
    <div style={{ display: 'flex', gap: '4px' }}>
      <button
        title="Log Call"
        onClick={() => onAction('call')}
        style={{
          background: 'rgba(255,255,255,0.06)',
          border: 'none',
          borderRadius: '6px',
          padding: '4px 6px',
          color: '#aaa',
          cursor: 'pointer',
        }}
      >
        <PhoneCall size={12} />
      </button>
      <button
        title="Schedule Viewing"
        onClick={() => onAction('schedule')}
        style={{
          background: 'rgba(255,255,255,0.06)',
          border: 'none',
          borderRadius: '6px',
          padding: '4px 6px',
          color: '#aaa',
          cursor: 'pointer',
        }}
      >
        <Calendar size={12} />
      </button>
      <button
        title="Send Location"
        onClick={() => onAction('location')}
        style={{
          background: 'rgba(255,255,255,0.06)',
          border: 'none',
          borderRadius: '6px',
          padding: '4px 6px',
          color: '#aaa',
          cursor: 'pointer',
        }}
      >
        <MapPin size={12} />
      </button>
    </div>
  );
});

export default LindaChatSpeedDialMenu;
