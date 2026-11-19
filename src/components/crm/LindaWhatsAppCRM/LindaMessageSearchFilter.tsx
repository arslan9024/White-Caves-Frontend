import React, { memo } from 'react';
import { Search, X } from 'lucide-react';

interface Props {
  value: string;
  onChange: (val: string) => void;
  onClear: () => void;
}

export const LindaMessageSearchFilter: React.FC<Props> = memo(({ value, onChange, onClear }) => {
  return (
    <div style={{ position: 'relative', width: '100%', marginBottom: '8px' }}>
      <Search
        size={14}
        style={{
          position: 'absolute',
          left: '10px',
          top: '50%',
          transform: 'translateY(-50%)',
          color: 'rgba(255,255,255,0.4)',
        }}
      />
      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder="Search WhatsApp messages & phone numbers..."
        style={{
          width: '100%',
          padding: '6px 32px 6px 30px',
          background: 'rgba(255,255,255,0.06)',
          border: '1px solid rgba(255,255,255,0.12)',
          borderRadius: '8px',
          color: '#fff',
          fontSize: '12px',
          outline: 'none',
        }}
      />
      {value && (
        <button
          onClick={onClear}
          style={{
            position: 'absolute',
            right: '8px',
            top: '50%',
            transform: 'translateY(-50%)',
            background: 'none',
            border: 'none',
            color: '#aaa',
            cursor: 'pointer',
          }}
        >
          <X size={14} />
        </button>
      )}
    </div>
  );
});

export default LindaMessageSearchFilter;
