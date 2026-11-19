import React, { memo } from 'react';

export const LindaLiveLineSyncPulse: React.FC<{ synced?: boolean }> = memo(({ synced = true }) => (
  <span
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: '4px',
      fontSize: '10px',
      color: synced ? '#25D366' : '#FFA500',
    }}
  >
    <span
      style={{
        width: '6px',
        height: '6px',
        borderRadius: '50%',
        background: synced ? '#25D366' : '#FFA500',
      }}
    />
    {synced ? 'Synced Live' : 'Re-syncing'}
  </span>
));
export default LindaLiveLineSyncPulse;
