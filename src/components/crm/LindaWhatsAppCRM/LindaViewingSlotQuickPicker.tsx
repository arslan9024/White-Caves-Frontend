import React, { memo } from 'react';
import { Calendar } from 'lucide-react';

export const LindaViewingSlotQuickPicker: React.FC<{ onSelect: (time: string) => void }> = memo(
  ({ onSelect }) => {
    const slots = ['Today 16:00', 'Tomorrow 11:00', 'Tomorrow 17:30'];
    return (
      <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
        <Calendar size={12} color="#00B0FF" />
        {slots.map(s => (
          <button
            key={s}
            onClick={() => onSelect(s)}
            style={{
              background: 'rgba(0,176,255,0.1)',
              border: '1px solid #00B0FF40',
              color: '#00B0FF',
              borderRadius: '4px',
              padding: '2px 6px',
              fontSize: '9px',
              cursor: 'pointer',
            }}
          >
            {s}
          </button>
        ))}
      </div>
    );
  }
);
export default LindaViewingSlotQuickPicker;
