import React from 'react';
import { vestaStyles } from './styles';

export const VestaHeader: React.FC = () => {
  return (
    <div style={vestaStyles.header}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <div style={vestaStyles.iconBox}>🔑</div>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <h2 style={{ margin: 0, fontSize: '1.3rem', fontWeight: 800 }}>
              Vesta AI — Snagging, Move-In & Handover
            </h2>
            <span style={vestaStyles.badge}>Handover Protocol</span>
          </div>
          <p
            style={{
              margin: '0.2rem 0 0 0',
              fontSize: '0.82rem',
              color: 'var(--color-fef3c7, #FEF3C7)',
            }}
          >
            Digital defect inspection reports, key handover certificates, DEWA/Empower onboarding,
            and contractor rectification SLA.
          </p>
        </div>
      </div>
    </div>
  );
};
