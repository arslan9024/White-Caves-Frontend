import React from 'react';

export const ForecastPanel: React.FC = () => (
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
      12-Month Predictive Price Appreciation Model
    </h4>
    <p
      style={{
        margin: '0 0 1.25rem 0',
        fontSize: '0.8rem',
        color: 'var(--text-secondary, #64748B)',
      }}
    >
      Multi-variable forecast taking into account supply pipeline, DLD velocity, and interest rate
      macro trends.
    </p>
    <div
      style={{
        background: 'var(--color-f0fdfa, #F0FDFA)',
        border: '1px solid var(--color-99f6e4, #99F6E4)',
        padding: '1.25rem',
        borderRadius: '8px',
      }}
    >
      <div style={{ fontWeight: 800, color: 'var(--accent-teal, #0F766E)' }}>
        Projected Dubai Prime Capital Appreciation: +11.2% in 2026-2027
      </div>
      <div style={{ fontSize: '0.78rem', color: 'var(--color-475569, #475569)', marginTop: '4px' }}>
        Highest velocity forecast in luxury waterfront properties and green master-planned villa
        communities.
      </div>
    </div>
  </div>
);
