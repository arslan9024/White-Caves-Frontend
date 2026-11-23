import React from 'react';

export interface MavenOverviewTabProps {
  activeTab: 'rebalancer' | 'appreciation';
}

export const MavenOverviewTab: React.FC<MavenOverviewTabProps> = ({ activeTab }) => {
  return (
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
        {activeTab === 'rebalancer'
          ? 'Real Estate Portfolio Diversification Matrix'
          : '10-Year Capital Growth Forecasting'}
      </h4>
      <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary, #64748B)' }}>
        Optimizes client holdings across high-yield residential apartments, luxury capital
        appreciation villas, and commercial real estate.
      </p>
    </div>
  );
};
