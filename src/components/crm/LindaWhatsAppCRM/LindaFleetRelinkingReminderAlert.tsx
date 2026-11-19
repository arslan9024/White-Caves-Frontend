import React, { memo } from 'react';
import { RefreshCw } from 'lucide-react';

export const LindaFleetRelinkingReminderAlert: React.FC<{ needsRelinkCount?: number }> = memo(
  ({ needsRelinkCount = 0 }) =>
    needsRelinkCount > 0 ? (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          padding: '4px 8px',
          background: 'rgba(245,158,11,0.1)',
          color: '#F59E0B',
          borderRadius: '4px',
          fontSize: '9px',
        }}
      >
        <RefreshCw size={10} /> {needsRelinkCount} Line(s) require QR re-authentication
      </div>
    ) : null
);
export default LindaFleetRelinkingReminderAlert;
