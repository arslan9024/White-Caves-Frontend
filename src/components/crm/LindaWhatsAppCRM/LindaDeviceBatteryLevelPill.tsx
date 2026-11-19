import React, { memo } from 'react';
import { BatteryCharging } from 'lucide-react';

export const LindaDeviceBatteryLevelPill: React.FC<{ level?: number }> = memo(({ level = 92 }) => (
  <span
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: '4px',
      fontSize: '10px',
      color: level > 20 ? '#25D366' : '#FF5252',
    }}
  >
    <BatteryCharging size={13} /> {level}% Linked Phone
  </span>
));
export default LindaDeviceBatteryLevelPill;
