import React, { memo } from 'react';
import { Activity } from 'lucide-react';

export const LindaMultiAccountThroughputRadar: React.FC<{
  activeLines?: number;
  msgsPerMin?: number;
}> = memo(({ activeLines = 5, msgsPerMin = 18 }) => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      padding: '6px 12px',
      background: 'rgba(37,211,102,0.06)',
      border: '1px solid rgba(37,211,102,0.2)',
      borderRadius: '8px',
      fontSize: '11px',
      color: '#fff',
    }}
  >
    <Activity size={14} color="#25D366" />
    <span>
      Throughput Radar: <strong style={{ color: '#25D366' }}>{msgsPerMin} msg/min</strong> across{' '}
      {activeLines} accounts
    </span>
  </div>
));
export default LindaMultiAccountThroughputRadar;
