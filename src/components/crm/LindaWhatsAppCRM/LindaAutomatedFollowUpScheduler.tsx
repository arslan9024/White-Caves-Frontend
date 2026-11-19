import React, { memo, useState } from 'react';
import { CalendarClock, Check } from 'lucide-react';

export const LindaAutomatedFollowUpScheduler: React.FC = memo(() => {
  const [scheduled, setScheduled] = useState(false);

  const schedule = (hours: number) => {
    setScheduled(true);
    setTimeout(() => setScheduled(false), 3000);
  };

  return (
    <div
      style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: '#aaa' }}
    >
      <CalendarClock size={12} color="#00B0FF" />
      <span>Follow-up:</span>
      <button
        onClick={() => schedule(24)}
        style={{
          background: 'none',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '4px',
          color: '#ccc',
          padding: '1px 6px',
          fontSize: '10px',
          cursor: 'pointer',
        }}
      >
        24h
      </button>
      <button
        onClick={() => schedule(72)}
        style={{
          background: 'none',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '4px',
          color: '#ccc',
          padding: '1px 6px',
          fontSize: '10px',
          cursor: 'pointer',
        }}
      >
        3 Days
      </button>
      {scheduled && <span style={{ color: '#25D366' }}>✓ Scheduled</span>}
    </div>
  );
});

export default LindaAutomatedFollowUpScheduler;
