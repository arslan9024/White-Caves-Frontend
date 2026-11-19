import React, { memo } from 'react';

export const LindaLeadFollowUpDatePicker: React.FC<{ onChange?: (date: string) => void }> = memo(
  ({ onChange }) => (
    <input
      type="date"
      onChange={e => onChange?.(e.target.value)}
      style={{
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.1)',
        color: '#ccc',
        borderRadius: '4px',
        padding: '2px 4px',
        fontSize: '9px',
        outline: 'none',
      }}
    />
  )
);
export default LindaLeadFollowUpDatePicker;
