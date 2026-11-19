import React, { memo } from 'react';

export const LindaBroadcastDeliveryStatsMini: React.FC = memo(() => (
  <div
    style={{
      display: 'flex',
      gap: '8px',
      fontSize: '9px',
      color: '#aaa',
      padding: '4px 8px',
      background: 'rgba(255,255,255,0.02)',
      borderRadius: '4px',
    }}
  >
    <span>Sent: 220</span>
    <span style={{ color: '#25D366' }}>Delivered: 218</span>
    <span style={{ color: '#00B0FF' }}>Read: 194</span>
    <span style={{ color: '#E040FB' }}>Replies: 42</span>
  </div>
));
export default LindaBroadcastDeliveryStatsMini;
