import React, { memo } from 'react';
import { AlertTriangle } from 'lucide-react';

export const LindaCircuitBreakerWarningPill: React.FC<{ isTripped?: boolean; line?: string }> =
  memo(({ isTripped = false, line = 'Master 2' }) =>
    isTripped ? (
      <span
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '3px',
          background: 'rgba(239,68,68,0.15)',
          color: '#EF4444',
          border: '1px solid rgba(239,68,68,0.3)',
          padding: '2px 6px',
          borderRadius: '4px',
          fontSize: '9px',
          fontWeight: 700,
        }}
      >
        <AlertTriangle size={10} /> Circuit Breaker Tripped: {line}
      </span>
    ) : (
      <span style={{ color: '#25D366', fontSize: '9px' }}>● All Circuit Breakers Armed</span>
    )
  );
export default LindaCircuitBreakerWarningPill;
