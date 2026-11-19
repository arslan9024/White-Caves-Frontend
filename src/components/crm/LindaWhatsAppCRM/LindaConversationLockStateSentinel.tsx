import React, { memo } from 'react';
import { Lock, Unlock } from 'lucide-react';

export const LindaConversationLockStateSentinel: React.FC<{ isLocked?: boolean }> = memo(
  ({ isLocked = false }) => (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '3px',
        fontSize: '9px',
        color: isLocked ? '#FFA500' : '#25D366',
      }}
    >
      {isLocked ? <Lock size={10} /> : <Unlock size={10} />}
      <span>{isLocked ? 'Assigned Exclusively' : 'Shared Queue'}</span>
    </span>
  )
);
export default LindaConversationLockStateSentinel;
