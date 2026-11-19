import React, { memo } from 'react';
import { ShieldCheck } from 'lucide-react';

export const LindaReraDldPermitBadge: React.FC<{ permitNumber?: string }> = memo(
  ({ permitNumber = 'DLD-PERMIT-2026-9941' }) => (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '4px',
        background: 'rgba(37,211,102,0.1)',
        border: '1px solid #25D36640',
        padding: '2px 8px',
        borderRadius: '4px',
        fontSize: '10px',
        color: '#25D366',
      }}
    >
      <ShieldCheck size={12} />
      <span>RERA Verified: {permitNumber}</span>
    </div>
  )
);
export default LindaReraDldPermitBadge;
