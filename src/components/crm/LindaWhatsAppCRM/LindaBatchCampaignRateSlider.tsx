import React, { memo, useState } from 'react';

export const LindaBatchCampaignRateSlider: React.FC<{ onChange?: (val: number) => void }> = memo(
  ({ onChange }) => {
    const [val, setVal] = useState(42);
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          fontSize: '10px',
          color: '#aaa',
        }}
      >
        <span>Pacing:</span>
        <input
          type="range"
          min={25}
          max={60}
          value={val}
          onChange={e => {
            setVal(Number(e.target.value));
            onChange?.(Number(e.target.value));
          }}
          style={{ accentColor: '#25D366' }}
        />
        <span style={{ color: '#25D366', fontWeight: 600 }}>{val} WPM</span>
      </div>
    );
  }
);
export default LindaBatchCampaignRateSlider;
