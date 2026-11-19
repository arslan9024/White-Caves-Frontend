import React, { memo } from 'react';

export const LindaChatStickyDateDivider: React.FC<{ dateLabel?: string }> = memo(
  ({ dateLabel = 'TODAY' }) => (
    <div style={{ display: 'flex', justifyContent: 'center', margin: '8px 0' }}>
      <span
        style={{
          background: '#182229',
          color: '#8696A0',
          padding: '3px 10px',
          borderRadius: '6px',
          fontSize: '9px',
          fontWeight: 600,
          textTransform: 'uppercase',
        }}
      >
        {dateLabel}
      </span>
    </div>
  )
);
export default LindaChatStickyDateDivider;
