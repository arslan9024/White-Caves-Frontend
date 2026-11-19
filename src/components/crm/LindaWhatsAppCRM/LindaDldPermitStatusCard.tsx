import React, { memo } from 'react';
import { ShieldCheck } from 'lucide-react';

export const LindaDldPermitStatusCard: React.FC<{ permitNo?: string; status?: string }> = memo(
  ({ permitNo = 'RERA-2026-DH2-88', status = 'VALID' }) => (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '6px 10px',
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '6px',
        fontSize: '10px',
      }}
    >
      <span style={{ color: '#aaa', display: 'flex', alignItems: 'center', gap: '4px' }}>
        <ShieldCheck size={12} color="#25D366" /> {permitNo}
      </span>
      <span style={{ color: '#25D366', fontWeight: 700 }}>{status}</span>
    </div>
  )
);
export default LindaDldPermitStatusCard;
