import React from 'react';
import { formatCurrency } from '../../../../utils';
import { SalesMetrics } from './types';
import {
  MetricsGrid,
  MetricCard,
  MetricValue,
  MetricLabel,
  MetricChange,
} from './styled';

interface SalesMetricsOverviewProps {
  metrics: SalesMetrics;
}

export const SalesMetricsOverview: React.FC<SalesMetricsOverviewProps> = ({ metrics }) => {
  return (
    <MetricsGrid>
      <MetricCard>
        <MetricLabel>Total Revenue (YTD)</MetricLabel>
        <MetricValue>{formatCurrency(metrics.totalRevenue)}</MetricValue>
        <MetricChange positive>↑ 12.5% from last month</MetricChange>
      </MetricCard>

      <MetricCard>
        <MetricLabel>Active Deals</MetricLabel>
        <MetricValue>{metrics.activeDeals}</MetricValue>
        <MetricChange positive>↑ 3 from last week</MetricChange>
      </MetricCard>

      <MetricCard>
        <MetricLabel>Conversion Rate</MetricLabel>
        <MetricValue>{metrics.conversionRate}%</MetricValue>
        <MetricChange>Target: 55%</MetricChange>
      </MetricCard>

      <MetricCard>
        <MetricLabel>Pipeline Value</MetricLabel>
        <MetricValue>{formatCurrency(metrics.pipelineValue)}</MetricValue>
        <MetricChange positive>↑ 8.3% growth</MetricChange>
      </MetricCard>
    </MetricsGrid>
  );
};
