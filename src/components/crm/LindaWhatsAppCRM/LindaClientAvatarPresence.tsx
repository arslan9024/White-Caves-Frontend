import React, { memo } from 'react';

export const LindaClientAvatarPresence: React.FC<{ name: string; isOnline?: boolean }> = memo(
  ({ name, isOnline = true }) => (
    <div style={{ position: 'relative', width: '32px', height: '32px' }}>
      <div
        style={{
          width: '32px',
          height: '32px',
          borderRadius: '50%',
          background: '#334155',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fff',
          fontSize: '12px',
          fontWeight: 700,
        }}
      >
        {name.charAt(0).toUpperCase()}
      </div>
      <span
        style={{
          position: 'absolute',
          bottom: 0,
          right: 0,
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          background: isOnline ? '#25D366' : '#94A3B8',
          border: '1.5px solid #1e1e2d',
        }}
      />
    </div>
  )
);
export default LindaClientAvatarPresence;
