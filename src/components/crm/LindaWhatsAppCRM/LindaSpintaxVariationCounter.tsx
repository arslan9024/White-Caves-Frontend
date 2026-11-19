import React, { memo } from 'react';

export const LindaSpintaxVariationCounter: React.FC<{ count?: number }> = memo(({ count = 27 }) => (
  <span
    style={{
      fontSize: '9px',
      color: '#25D366',
      background: 'rgba(37,211,102,0.1)',
      padding: '1px 5px',
      borderRadius: '4px',
    }}
  >
    {count} Unique Combos
  </span>
));
export default LindaSpintaxVariationCounter;
