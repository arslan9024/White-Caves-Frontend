import React, { memo } from 'react';
import { Zap } from 'lucide-react';

interface Props {
  onSelect: (text: string) => void;
}

const TEMPLATES = [
  'Good afternoon! Thank you for contacting White Caves Real Estate.',
  'Could you please share your preferred layout and budget?',
  'I have scheduled the viewing for tomorrow at 4:00 PM GST.',
  'Let me check the title deed records and revert immediately.',
];

export const LindaQuickReplyBar: React.FC<Props> = memo(({ onSelect }) => {
  return (
    <div
      style={{
        display: 'flex',
        gap: '6px',
        overflowX: 'auto',
        padding: '4px 0',
        scrollbarWidth: 'none',
      }}
    >
      {TEMPLATES.map((tpl, i) => (
        <button
          key={i}
          onClick={() => onSelect(tpl)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            whiteSpace: 'nowrap',
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '12px',
            padding: '3px 10px',
            color: '#ddd',
            fontSize: '11px',
            cursor: 'pointer',
          }}
        >
          <Zap size={10} color="#25D366" />
          {tpl.slice(0, 30)}...
        </button>
      ))}
    </div>
  );
});

export default LindaQuickReplyBar;
