import React, { memo } from 'react';

export const LindaContactSyncTimestampBadge: React.FC<{ lastSync?: string }> = memo(
  ({ lastSync = '2m ago' }) => (
    <span style={{ fontSize: '9px', color: '#666' }}>Synced {lastSync}</span>
  )
);
export default LindaContactSyncTimestampBadge;
