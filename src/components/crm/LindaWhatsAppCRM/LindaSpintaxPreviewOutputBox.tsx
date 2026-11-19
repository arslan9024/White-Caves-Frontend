import React, { memo } from 'react';

export const LindaSpintaxPreviewOutputBox: React.FC<{ resolvedSample?: string }> = memo(
  ({ resolvedSample = 'Hello Ahmed, we have a buyer for your villa.' }) => (
    <div
      style={{
        background: '#0F172A',
        border: '1px solid #334155',
        borderRadius: '6px',
        padding: '8px',
        color: '#94A3B8',
        fontSize: '10px',
        fontStyle: 'italic',
      }}
    >
      "{resolvedSample}"
    </div>
  )
);
export default LindaSpintaxPreviewOutputBox;
