import React from 'react';
import { formatCurrency } from '../../../../utils';
import { SalesMetrics, Deal } from './types';
import { getStageColor } from './constants';
import { SectionCard, SectionTitle } from './styled';

interface SalesQuickStatsProps {
  metrics: SalesMetrics;
}

export const SalesQuickStats: React.FC<SalesQuickStatsProps> = ({ metrics }) => {
  return (
    <SectionCard>
      <SectionTitle>📈 Quick Stats</SectionTitle>
      <div style={{ display: 'grid', gap: '12px' }}>
        <div
          style={{
            padding: '12px',
            backgroundColor: '#F0F9FF',
            borderRadius: '8px',
            borderLeft: '4px solid #3B82F6',
          }}
        >
          <div
            style={{
              color: 'var(--text-secondary, #6B7280)',
              fontSize: '12px',
              marginBottom: '4px',
            }}
          >
            Closed Deals This Month
          </div>
          <div style={{ fontSize: '24px', fontWeight: 700 }}>{metrics.closedDeals}</div>
        </div>
        <div
          style={{
            padding: '12px',
            backgroundColor: '#F7FEE7',
            borderRadius: '8px',
            borderLeft: '4px solid #10B981',
          }}
        >
          <div
            style={{
              color: 'var(--text-secondary, #6B7280)',
              fontSize: '12px',
              marginBottom: '4px',
            }}
          >
            Avg Deal Size
          </div>
          <div style={{ fontSize: '20px', fontWeight: 700 }}>
            {formatCurrency(metrics.avgDealSize)}
          </div>
        </div>
        <div
          style={{
            padding: '12px',
            backgroundColor: '#FCE4E6',
            borderRadius: '8px',
            borderLeft: '4px solid #EF4444',
          }}
        >
          <div
            style={{
              color: 'var(--text-secondary, #6B7280)',
              fontSize: '12px',
              marginBottom: '4px',
            }}
          >
            Win Probability Avg
          </div>
          <div style={{ fontSize: '24px', fontWeight: 700 }}>62%</div>
        </div>
      </div>
    </SectionCard>
  );
};

interface DealDetailCardProps {
  deal: Deal;
}

export const DealDetailCard: React.FC<DealDetailCardProps> = ({ deal }) => {
  return (
    <SectionCard
      style={{
        marginTop: '24px',
        backgroundColor: '#F9FAFB',
        borderLeft: `4px solid ${getStageColor(deal.stage)}`,
      }}
    >
      <SectionTitle>Deal Details: {deal.client}</SectionTitle>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        <div>
          <span style={{ color: 'var(--text-secondary, #6B7280)', fontSize: '12px' }}>
            Property
          </span>
          <p style={{ fontWeight: 600, margin: '4px 0 0 0' }}>{deal.property}</p>
        </div>
        <div>
          <span style={{ color: 'var(--text-secondary, #6B7280)', fontSize: '12px' }}>
            Deal Value
          </span>
          <p style={{ fontWeight: 600, margin: '4px 0 0 0' }}>
            {formatCurrency(deal.value)}
          </p>
        </div>
        <div>
          <span style={{ color: 'var(--text-secondary, #6B7280)', fontSize: '12px' }}>
            Current Stage
          </span>
          <p
            style={{
              fontWeight: 600,
              margin: '4px 0 0 0',
              textTransform: 'capitalize',
            }}
          >
            {deal.stage}
          </p>
        </div>
        <div>
          <span style={{ color: 'var(--text-secondary, #6B7280)', fontSize: '12px' }}>
            Win Probability
          </span>
          <p style={{ fontWeight: 600, margin: '4px 0 0 0' }}>{deal.probability}%</p>
        </div>
        <div>
          <span style={{ color: 'var(--text-secondary, #6B7280)', fontSize: '12px' }}>
            Assigned Agent
          </span>
          <p style={{ fontWeight: 600, margin: '4px 0 0 0' }}>{deal.agent}</p>
        </div>
        <div>
          <span style={{ color: 'var(--text-secondary, #6B7280)', fontSize: '12px' }}>
            Created Date
          </span>
          <p style={{ fontWeight: 600, margin: '4px 0 0 0' }}>{deal.createdAt}</p>
        </div>
      </div>
    </SectionCard>
  );
};
