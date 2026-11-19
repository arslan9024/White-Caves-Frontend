import React, { memo } from 'react';

export const LindaAccountHealthDiagnosticTableMini: React.FC = memo(() => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '4px',
      padding: '6px',
      background: 'rgba(0,0,0,0.2)',
      borderRadius: '6px',
      fontSize: '9px',
      color: '#94A3B8',
    }}
  >
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        color: '#E2E8F0',
        fontWeight: 600,
      }}
    >
      <span>5 WhatsApp Line Fleet</span>
      <span style={{ color: '#25D366' }}>100% Operational</span>
    </div>
  </div>
));
export default LindaAccountHealthDiagnosticTableMini;
