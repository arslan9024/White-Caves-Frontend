import React, { memo } from 'react';
import { Home } from 'lucide-react';

export const LindaDamacHills2ClusterPill: React.FC<{ cluster?: string; unit?: string }> = memo(
  ({ cluster = 'Amazon', unit = 'Villa 12' }) => (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '3px',
        background: 'rgba(255,255,255,0.05)',
        color: '#CBD5E1',
        padding: '2px 6px',
        borderRadius: '4px',
        fontSize: '9px',
      }}
    >
      <Home size={10} color="#25D366" /> {cluster} • {unit}
    </span>
  )
);
export default LindaDamacHills2ClusterPill;
