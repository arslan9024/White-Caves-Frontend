import React, { memo } from 'react';

export const LindaFiveAccountStatusBarMini: React.FC<{ onlineCount?: number }> = memo(
  ({ onlineCount = 5 }) => (
    <div
      style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '9px', color: '#aaa' }}
    >
      <span
        style={{
          width: '6px',
          height: '6px',
          borderRadius: '50%',
          background: onlineCount === 5 ? '#25D366' : '#FFA500',
        }}
      />
      <span>Fleet: {onlineCount}/5 Accounts Operational</span>
    </div>
  )
);
export default LindaFiveAccountStatusBarMini;
