import React, { memo } from 'react';
import { AlertCircle } from 'lucide-react';

export const LindaEjariLeaseExpiryWarningRow: React.FC<{ expiryDate?: string }> = memo(
  ({ expiryDate = '30 Nov 2026' }) => (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
        padding: '4px 8px',
        background: 'rgba(245,158,11,0.1)',
        color: '#F59E0B',
        borderRadius: '4px',
        fontSize: '10px',
      }}
    >
      <AlertCircle size={12} />
      <span>Ejari Notice Due: Expiry on {expiryDate}</span>
    </div>
  )
);
export default LindaEjariLeaseExpiryWarningRow;
