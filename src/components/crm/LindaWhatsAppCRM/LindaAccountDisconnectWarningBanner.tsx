import React, { memo } from 'react';
import { AlertTriangle } from 'lucide-react';

export const LindaAccountDisconnectWarningBanner: React.FC<{ phone: string }> = memo(
  ({ phone }) => (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        padding: '4px 8px',
        background: 'rgba(255,82,82,0.1)',
        border: '1px solid #FF525230',
        borderRadius: '4px',
        color: '#FF5252',
        fontSize: '10px',
      }}
    >
      <AlertTriangle size={12} />
      <span>Line {phone} session disconnected. Re-link required.</span>
    </div>
  )
);
export default LindaAccountDisconnectWarningBanner;
