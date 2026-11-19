import React, { memo } from 'react';

export const LindaBroadcastFilterClusterDrawer: React.FC<{ onFilter: (cluster: string) => void }> =
  memo(({ onFilter }) => (
    <div style={{ display: 'flex', gap: '4px', overflowX: 'auto', padding: '2px 0' }}>
      {['All Clusters', 'Amazon', 'Coursetia', 'Sanctuary', 'Vardon'].map(c => (
        <button
          key={c}
          onClick={() => onFilter(c)}
          style={{
            whiteSpace: 'nowrap',
            background: 'rgba(255,255,255,0.04)',
            border: 'none',
            borderRadius: '4px',
            padding: '2px 6px',
            color: '#ccc',
            fontSize: '9px',
            cursor: 'pointer',
          }}
        >
          {c}
        </button>
      ))}
    </div>
  ));
export default LindaBroadcastFilterClusterDrawer;
