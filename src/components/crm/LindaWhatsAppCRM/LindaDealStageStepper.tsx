import React, { memo } from 'react';

export const LindaDealStageStepper: React.FC<{ stage?: number }> = memo(({ stage = 2 }) => {
  const steps = ['Inquiry', 'Viewing', 'Offer', 'MoU', 'DLD Transfer'];
  return (
    <div
      style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '9px', color: '#888' }}
    >
      {steps.map((st, i) => (
        <span
          key={st}
          style={{ color: i <= stage ? '#25D366' : '#555', fontWeight: i === stage ? 700 : 400 }}
        >
          {i > 0 && ' › '} {st}
        </span>
      ))}
    </div>
  );
});
export default LindaDealStageStepper;
