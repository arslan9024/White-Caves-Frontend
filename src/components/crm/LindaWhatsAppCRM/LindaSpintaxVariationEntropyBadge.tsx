import React, { memo } from 'react';
import { Shuffle } from 'lucide-react';

export const LindaSpintaxVariationEntropyBadge: React.FC<{
  combinations?: number;
  entropyPct?: number;
}> = memo(({ combinations = 108, entropyPct = 96.4 }) => (
  <div
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: '4px',
      background: 'rgba(224,64,251,0.08)',
      border: '1px solid rgba(224,64,251,0.3)',
      padding: '2px 8px',
      borderRadius: '10px',
      fontSize: '10px',
      color: '#E040FB',
    }}
  >
    <Shuffle size={11} />
    <span>
      Entropy: {entropyPct}% ({combinations} variants)
    </span>
  </div>
));
export default LindaSpintaxVariationEntropyBadge;
