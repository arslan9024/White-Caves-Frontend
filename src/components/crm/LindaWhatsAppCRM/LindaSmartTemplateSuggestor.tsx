import React, { memo } from 'react';
import { Lightbulb } from 'lucide-react';

interface Props {
  onInsert: (text: string) => void;
}

export const LindaSmartTemplateSuggestor: React.FC<Props> = memo(({ onInsert }) => {
  const suggestion = 'Dear Owner, we have a qualified cash buyer for your cluster villa.';

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        padding: '4px 8px',
        background: 'rgba(255,215,0,0.06)',
        borderRadius: '6px',
        border: '1px solid rgba(255,215,0,0.15)',
      }}
    >
      <Lightbulb size={12} color="#FFD700" />
      <span style={{ fontSize: '10px', color: '#ddd', flex: 1 }}>{suggestion}</span>
      <button
        onClick={() => onInsert(suggestion)}
        style={{
          background: '#FFD700',
          border: 'none',
          borderRadius: '4px',
          padding: '2px 6px',
          fontSize: '9px',
          fontWeight: 700,
          color: '#000',
          cursor: 'pointer',
        }}
      >
        Use
      </button>
    </div>
  );
});

export default LindaSmartTemplateSuggestor;
