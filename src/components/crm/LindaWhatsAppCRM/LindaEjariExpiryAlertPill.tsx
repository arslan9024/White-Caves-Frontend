import React, { memo } from 'react';
import { AlertCircle } from 'lucide-react';

export const LindaEjariExpiryAlertPill: React.FC<{ daysLeft?: number }> = memo(
  ({ daysLeft = 45 }) => (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '4px',
        background: 'rgba(255,165,0,0.1)',
        color: '#FFA500',
        border: '1px solid #FFA50040',
        padding: '2px 6px',
        borderRadius: '4px',
        fontSize: '9px',
      }}
    >
      <AlertCircle size={10} />
      <span>Ejari expires in {daysLeft} days</span>
    </span>
  )
);
export default LindaEjariExpiryAlertPill;
