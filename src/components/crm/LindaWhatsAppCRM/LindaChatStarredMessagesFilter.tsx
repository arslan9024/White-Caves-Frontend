import React, { memo, useState } from 'react';
import { Star } from 'lucide-react';

export const LindaChatStarredMessagesFilter: React.FC<{ onToggle: (starred: boolean) => void }> =
  memo(({ onToggle }) => {
    const [active, setActive] = useState(false);
    return (
      <button
        onClick={() => {
          setActive(!active);
          onToggle(!active);
        }}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          background: active ? 'rgba(255,215,0,0.15)' : 'rgba(255,255,255,0.04)',
          border: `1px solid ${active ? '#FFD700' : 'rgba(255,255,255,0.1)'}`,
          padding: '4px 8px',
          borderRadius: '6px',
          color: active ? '#FFD700' : '#888',
          fontSize: '10px',
          cursor: 'pointer',
        }}
      >
        <Star size={12} fill={active ? '#FFD700' : 'none'} />
        <span>Starred</span>
      </button>
    );
  });
export default LindaChatStarredMessagesFilter;
