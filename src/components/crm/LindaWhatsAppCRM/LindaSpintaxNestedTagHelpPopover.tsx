import React, { memo } from 'react';

export const LindaSpintaxNestedTagHelpPopover: React.FC = memo(() => (
  <div
    style={{
      fontSize: '9px',
      color: '#94A3B8',
      padding: '4px 6px',
      background: 'rgba(255,255,255,0.03)',
      borderRadius: '4px',
    }}
  >
    💡 Tip: Use <code>&#123;Hi|Hello&#125; &#123;name&#125;</code> for natural variation.
  </div>
));
export default LindaSpintaxNestedTagHelpPopover;
