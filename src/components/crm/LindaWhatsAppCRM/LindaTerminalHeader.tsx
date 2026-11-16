import React from 'react';

export interface LindaTerminalHeaderProps {
  // Presentational header props
}

export const LindaTerminalHeader: React.FC<LindaTerminalHeaderProps> = () => (
  <div
    style={{
      border: '1px solid rgba(217, 70, 239, 0.55)',
      background: 'rgba(217, 70, 239, 0.08)',
      borderRadius: 8,
      padding: '8px 12px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: 8,
      fontFamily: 'monospace',
      fontSize: 12,
    }}
  >
    <span style={{ color: '#F0ABFC', fontWeight: 700 }}>
      [PANEL 1 · HEADER] LINDA VISUAL TERMINAL v2.0.0-enterprise
    </span>
    <span style={{ color: '#E2E8F0' }}>
      MASTER: <strong style={{ color: '#4ADE80' }}>+971505760056 (LINKED)</strong> · GORAHA:{' '}
      <strong style={{ color: '#38BDF8' }}>SYNCED</strong> · ANTI-BAN:{' '}
      <strong style={{ color: '#FBBF24' }}>42 WPM GAUSSIAN</strong>
    </span>
  </div>
);
