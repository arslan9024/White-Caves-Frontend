import React, { memo } from 'react';

interface Props {
  accounts?: string[];
  selected?: string;
  onSelect?: (acc: string) => void;
}

export const LindaAccountPillSwitcher: React.FC<Props> = memo(
  ({
    accounts = [
      '+971505760056',
      '+971503869886',
      '+971505110636',
      '+971589969886',
      '+971553633595',
    ],
    selected = '+971505760056',
    onSelect,
  }) => (
    <div style={{ display: 'flex', gap: '4px', overflowX: 'auto', padding: '4px 0' }}>
      {accounts.map(acc => {
        const isSel = acc === selected;
        return (
          <button
            key={acc}
            onClick={() => onSelect?.(acc)}
            style={{
              background: isSel ? '#25D366' : 'rgba(255,255,255,0.05)',
              color: isSel ? '#000' : '#CBD5E1',
              border: 'none',
              borderRadius: '12px',
              padding: '3px 10px',
              fontSize: '10px',
              fontWeight: isSel ? 700 : 500,
              cursor: 'pointer',
              whiteSpace: 'nowrap',
            }}
          >
            {acc.slice(-4)}
          </button>
        );
      })}
    </div>
  )
);
export default LindaAccountPillSwitcher;
