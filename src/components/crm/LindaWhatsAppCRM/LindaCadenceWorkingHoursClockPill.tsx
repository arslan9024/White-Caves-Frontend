import React, { memo } from 'react';
import { Clock } from 'lucide-react';

export const LindaCadenceWorkingHoursClockPill: React.FC<{ gstTime?: string; isOpen?: boolean }> =
  memo(({ gstTime = '14:24 GST', isOpen = true }) => (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '4px',
        background: 'rgba(255,255,255,0.05)',
        color: isOpen ? '#25D366' : '#F59E0B',
        padding: '2px 6px',
        borderRadius: '4px',
        fontSize: '9px',
        fontWeight: 600,
      }}
    >
      <Clock size={10} /> {gstTime} • {isOpen ? 'Window Open' : 'Hold Window'}
    </span>
  ));
export default LindaCadenceWorkingHoursClockPill;
