import React from 'react';
import { headerContainerStyle, headerIconWrapperStyle } from './MavenInvestmentCRM.styles';

export const MavenHeader: React.FC = () => {
  return (
    <div style={headerContainerStyle}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <div style={headerIconWrapperStyle}>📌</div>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <h2 style={{ margin: 0, fontSize: '1.3rem', fontWeight: 800 }}>
              Maven AI — Investment Portfolio & Feasibility
            </h2>
            <span
              style={{
                fontSize: '0.7rem',
                background: 'rgba(255, 255, 255, 0.15)',
                padding: '2px 8px',
                borderRadius: '4px',
                color: 'var(--color-bbf7d0, #BBF7D0)',
                fontWeight: 800,
              }}
            >
              Financial Engineering
            </span>
          </div>
          <p
            style={{
              margin: '0.2rem 0 0 0',
              fontSize: '0.82rem',
              color: 'var(--color-dcfce7, #DCFCE7)',
            }}
          >
            10-Year DCF / IRR financial modeling, Short-Term Airbnb vs Long-Term Ejari yield
            comparator, and portfolio risk rebalancing.
          </p>
        </div>
      </div>
    </div>
  );
};
