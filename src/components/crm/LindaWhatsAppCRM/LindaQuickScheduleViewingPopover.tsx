import React, { memo } from 'react';
import { Calendar } from 'lucide-react';

export const LindaQuickScheduleViewingPopover: React.FC<{ onBook?: (slot: string) => void }> = memo(
  ({ onBook }) => (
    <div style={{ display: 'flex', gap: '4px' }}>
      {['10:00 AM', '03:00 PM', '05:30 PM'].map(s => (
        <button
          key={s}
          onClick={() => onBook?.(s)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '2px',
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid #334155',
            color: '#CBD5E1',
            borderRadius: '4px',
            padding: '2px 5px',
            fontSize: '9px',
            cursor: 'pointer',
          }}
        >
          <Calendar size={9} /> {s}
        </button>
      ))}
    </div>
  )
);
export default LindaQuickScheduleViewingPopover;
