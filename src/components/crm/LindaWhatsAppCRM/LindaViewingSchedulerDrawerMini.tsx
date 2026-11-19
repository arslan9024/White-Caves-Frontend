import React, { memo } from 'react';
import { CalendarCheck } from 'lucide-react';

export const LindaViewingSchedulerDrawerMini: React.FC<{ onBook?: () => void }> = memo(
  ({ onBook }) => (
    <button
      onClick={onBook}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '4px',
        background: 'rgba(0,176,255,0.12)',
        border: '1px solid rgba(0,176,255,0.3)',
        color: '#00B0FF',
        padding: '3px 8px',
        borderRadius: '6px',
        fontSize: '10px',
        cursor: 'pointer',
        fontWeight: 600,
      }}
    >
      <CalendarCheck size={12} />
      <span>Schedule Viewing Slot</span>
    </button>
  )
);
export default LindaViewingSchedulerDrawerMini;
