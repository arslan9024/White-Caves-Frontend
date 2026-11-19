import React, { memo, useState } from 'react';

export const LindaClientCurrencySwitchToggle: React.FC<{
  onToggle?: (curr: 'AED' | 'USD' | 'EUR' | 'GBP') => void;
}> = memo(({ onToggle }) => {
  const [curr, setCurr] = useState<'AED' | 'USD' | 'EUR' | 'GBP'>('AED');
  const cycle = () => {
    const next = curr === 'AED' ? 'USD' : curr === 'USD' ? 'EUR' : curr === 'EUR' ? 'GBP' : 'AED';
    setCurr(next);
    onToggle?.(next);
  };
  return (
    <button
      onClick={cycle}
      style={{
        background: 'rgba(255,255,255,0.06)',
        border: '1px solid rgba(255,255,255,0.12)',
        borderRadius: '4px',
        padding: '2px 6px',
        color: '#69F0AE',
        fontSize: '9px',
        fontWeight: 700,
        cursor: 'pointer',
      }}
    >
      Currency: {curr}
    </button>
  );
});
export default LindaClientCurrencySwitchToggle;
