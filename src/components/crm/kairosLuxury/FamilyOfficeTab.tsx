import React from 'react';

export const FamilyOfficeTab: React.FC = () => (
  <div
    style={{
      background: 'var(--white, #FFFFFF)',
      padding: '1.5rem',
      borderRadius: '12px',
      border: '1px solid var(--text-secondary, #E2E8F0)',
    }}
  >
    <h4
      style={{
        margin: '0 0 0.5rem 0',
        fontSize: '1rem',
        fontWeight: 800,
        color: 'var(--color-1e293b, #1E293B)',
      }}
    >
      Family Office Multi-Asset Real Estate Deck
    </h4>
    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary, #64748B)' }}>
      Tailored investment thesis and risk diversification across commercial, residential, and prime
      off-plan portfolios.
    </p>
  </div>
);
