import React, { memo } from 'react';

export const LindaClientPreferredLanguageBadge: React.FC<{ lang?: string }> = memo(
  ({ lang = 'Arabic' }) => (
    <span
      style={{
        fontSize: '9px',
        color: '#00B0FF',
        background: 'rgba(0,176,255,0.1)',
        padding: '1px 5px',
        borderRadius: '4px',
      }}
    >
      Preferred: {lang}
    </span>
  )
);
export default LindaClientPreferredLanguageBadge;
