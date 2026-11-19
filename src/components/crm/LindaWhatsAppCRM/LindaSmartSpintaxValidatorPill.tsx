import React, { memo } from 'react';
import { CheckCircle2 } from 'lucide-react';

export const LindaSmartSpintaxValidatorPill: React.FC<{ isValid?: boolean }> = memo(
  ({ isValid = true }) => (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '3px',
        color: isValid ? '#25D366' : '#FF5252',
        fontSize: '9px',
      }}
    >
      <CheckCircle2 size={10} /> Spintax: {isValid ? 'Syntax Balanced' : 'Unclosed Braces'}
    </span>
  )
);
export default LindaSmartSpintaxValidatorPill;
