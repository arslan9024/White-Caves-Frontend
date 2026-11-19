import React, { memo } from 'react';
import { Search } from 'lucide-react';

export const LindaConversationSearchInputBar: React.FC<{ onSearch: (q: string) => void }> = memo(
  ({ onSearch }) => (
    <div style={{ position: 'relative', width: '100%' }}>
      <Search
        size={12}
        style={{
          position: 'absolute',
          left: '8px',
          top: '50%',
          transform: 'translateY(-50%)',
          color: '#666',
        }}
      />
      <input
        type="text"
        onChange={e => onSearch(e.target.value)}
        placeholder="Filter live chats..."
        style={{
          width: '100%',
          padding: '4px 8px 4px 26px',
          background: 'rgba(0,0,0,0.2)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: '6px',
          color: '#fff',
          fontSize: '10px',
          outline: 'none',
        }}
      />
    </div>
  )
);
export default LindaConversationSearchInputBar;
