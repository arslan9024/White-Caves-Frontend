import React, { memo } from 'react';
import { Flame } from 'lucide-react';

export const LindaLeadBuyerAffinityHeatPill: React.FC<{
  affinity?: 'ULTRA_HIGH' | 'HIGH' | 'WARM' | 'COLD';
}> = memo(({ affinity = 'ULTRA_HIGH' }) => {
  const colors = { ULTRA_HIGH: '#FF5252', HIGH: '#FFA500', WARM: '#25D366', COLD: '#757575' };
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '3px',
        background: `${colors[affinity]}18`,
        color: colors[affinity],
        border: `1px solid ${colors[affinity]}40`,
        padding: '1px 6px',
        borderRadius: '4px',
        fontSize: '9px',
        fontWeight: 700,
      }}
    >
      <Flame size={10} /> {affinity.replace('_', ' ')}
    </span>
  );
});
export default LindaLeadBuyerAffinityHeatPill;
