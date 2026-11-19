import React, { memo, useState } from 'react';
import { StickyNote } from 'lucide-react';

export const LindaConversationNotesDrawer: React.FC<{ onSave: (note: string) => void }> = memo(
  ({ onSave }) => {
    const [note, setNote] = useState('');
    return (
      <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
        <StickyNote size={14} color="#FFA500" />
        <input
          type="text"
          value={note}
          onChange={e => setNote(e.target.value)}
          placeholder="Internal broker note (hidden from client)..."
          style={{
            flex: 1,
            padding: '4px 8px',
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '4px',
            color: '#fff',
            fontSize: '10px',
            outline: 'none',
          }}
        />
        <button
          onClick={() => {
            onSave(note);
            setNote('');
          }}
          style={{
            background: '#FFA500',
            border: 'none',
            borderRadius: '4px',
            padding: '4px 8px',
            fontSize: '9px',
            fontWeight: 700,
            color: '#000',
            cursor: 'pointer',
          }}
        >
          Save
        </button>
      </div>
    );
  }
);
export default LindaConversationNotesDrawer;
