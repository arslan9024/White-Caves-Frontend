import React, { memo } from 'react';
import { Check } from 'lucide-react';

export const LindaSingletonLockScrubAlert: React.FC<{ cleanedCount?: number }> = memo(
  ({ cleanedCount = 0 }) => (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '2px',
        fontSize: '9px',
        color: '#94A3B8',
      }}
    >
      <Check size={10} color="#25D366" /> Lock Sandboxes: Clear ({cleanedCount})
    </span>
  )
);
export default LindaSingletonLockScrubAlert;
