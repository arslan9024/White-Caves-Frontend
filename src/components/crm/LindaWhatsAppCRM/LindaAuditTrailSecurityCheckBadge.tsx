import React, { memo } from 'react';
import { Lock } from 'lucide-react';

export const LindaAuditTrailSecurityCheckBadge: React.FC = memo(() => (
  <span
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: '2px',
      fontSize: '9px',
      color: '#64748B',
    }}
  >
    <Lock size={9} /> End-to-End Encrypted Session Isolation
  </span>
));
export default LindaAuditTrailSecurityCheckBadge;
