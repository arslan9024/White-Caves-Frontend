import React from 'react';
import { COMMUNITIES_TREND } from '../CipherMarketCRM.data';

export const TrendsPanel: React.FC = () => (
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
        margin: '0 0 1rem 0',
        fontSize: '1rem',
        fontWeight: 800,
        color: 'var(--color-1e293b, #1E293B)',
      }}
    >
      Dubai Prime Neighborhood Price Growth & Demand Index
    </h4>
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '1rem',
      }}
    >
      {COMMUNITIES_TREND.map(c => (
        <div
          key={c.name}
          style={{
            padding: '1.25rem',
            background: 'var(--color-f8fafc, #F8FAFC)',
            borderRadius: '8px',
            border: '1px solid var(--text-secondary, #E2E8F0)',
          }}
        >
          <div
            style={{ fontWeight: 800, color: 'var(--color-1e293b, #1E293B)', fontSize: '0.95rem' }}
          >
            {c.name}
          </div>
          <div
            style={{
              fontSize: '1.4rem',
              fontWeight: 800,
              color: 'var(--accent-teal, #0D9488)',
              marginTop: '4px',
            }}
          >
            {c.avgPriceSqft}
          </div>
          <div
            style={{
              display: 'flex',
              justifySelf: 'stretch',
              justifyContent: 'space-between',
              marginTop: '8px',
              fontSize: '0.75rem',
            }}
          >
            <span style={{ color: 'var(--accent-green, #10B981)', fontWeight: 800 }}>
              {c.change12m} (12 Mo)
            </span>
            <span
              style={{
                background: 'var(--color-ccfbf1, #CCFBF1)',
                color: 'var(--accent-teal, #0F766E)',
                padding: '2px 6px',
                borderRadius: '4px',
                fontWeight: 700,
              }}
            >
              {c.demand}
            </span>
          </div>
        </div>
      ))}
    </div>
  </div>
);
