import React, { memo } from 'react';

export const LindaMessageTailBubbleStyle: React.FC<{
  isOutbound?: boolean;
  children: React.ReactNode;
}> = memo(({ isOutbound = true, children }) => (
  <div
    style={{
      position: 'relative',
      background: isOutbound ? '#005C4B' : '#202C33',
      color: '#E9EDEF',
      padding: '6px 10px',
      borderRadius: '8px',
      maxWidth: '75%',
      fontSize: '12px',
      alignSelf: isOutbound ? 'flex-end' : 'flex-start',
    }}
  >
    {children}
  </div>
));
export default LindaMessageTailBubbleStyle;
