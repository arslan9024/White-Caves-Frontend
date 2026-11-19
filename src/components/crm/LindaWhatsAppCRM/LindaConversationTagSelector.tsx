import React, { memo, useState } from 'react';
import { Tag } from 'lucide-react';

interface Props {
  tags?: string[];
  onAddTag: (tag: string) => void;
}

const AVAILABLE = ['Hot Seller', 'Cash Buyer', 'Tenant Relo', 'Damac Hills 2', 'Viewing Fixed'];

export const LindaConversationTagSelector: React.FC<Props> = memo(({ tags = [], onAddTag }) => {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', alignItems: 'center' }}>
      <Tag size={12} color="#aaa" />
      {tags.map((t, i) => (
        <span
          key={i}
          style={{
            background: 'rgba(37,211,102,0.1)',
            border: '1px solid rgba(37,211,102,0.3)',
            color: '#25D366',
            borderRadius: '4px',
            padding: '1px 6px',
            fontSize: '10px',
          }}
        >
          {t}
        </span>
      ))}
      {AVAILABLE.filter(a => !tags.includes(a))
        .slice(0, 2)
        .map((a, i) => (
          <button
            key={i}
            onClick={() => onAddTag(a)}
            style={{
              background: 'none',
              border: '1px dashed rgba(255,255,255,0.2)',
              color: '#888',
              borderRadius: '4px',
              padding: '1px 6px',
              fontSize: '10px',
              cursor: 'pointer',
            }}
          >
            + {a}
          </button>
        ))}
    </div>
  );
});

export default LindaConversationTagSelector;
