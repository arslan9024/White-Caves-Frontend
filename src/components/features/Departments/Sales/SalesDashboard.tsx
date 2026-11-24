/**
 * Sales Department Dashboard
 *
 * Displays sales metrics, pipeline, deals, and team performance.
 * Features: Deal tracking, revenue metrics, sales pipeline visualization.
 * Live data from /api/departments/SALES/data and /api/leads.
 */

import React, { useState } from 'react';
import {
  Container,
  Header,
  HeaderTitle,
  HeaderSubtitle,
  StatusIndicator,
  MainContent,
  LeftColumn,
  RightColumn,
} from './styled';
import { SalesDashboardProps, Deal } from './types';
import { initialTeamData, calculatePipelineStages } from './constants';
import { useSalesData } from './useSalesData';
import { SalesMetricsOverview } from './SalesMetricsOverview';
import { SalesPipeline } from './SalesPipeline';
import { RecentDealsList } from './RecentDealsList';
import { TeamPerformance } from './TeamPerformance';
import { SalesQuickStats, DealDetailCard } from './SalesQuickStats';

export * from './types';
export * from './constants';
export * from './useSalesData';
export * from './SalesMetricsOverview';
export * from './SalesPipeline';
export * from './RecentDealsList';
export * from './TeamPerformance';
export * from './SalesQuickStats';
export * from './styled';

const SalesDashboard: React.FC<SalesDashboardProps> = ({
  featureId: _featureId = 'dept-sales',
  context: _context,
}) => {
  const { metrics, deals, loading } = useSalesData();
  const [selectedDeal, setSelectedDeal] = useState<Deal | null>(null);

  const pipelineStages = calculatePipelineStages(metrics);

  if (loading) {
    return (
      <Container>
        <Header>
          <div>
            <HeaderTitle>💰 Sales Department</HeaderTitle>
            <HeaderSubtitle>Loading live data…</HeaderSubtitle>
          </div>
        </Header>
      </Container>
    );
  }

  return (
    <Container>
      <Header>
        <div>
          <HeaderTitle>💰 Sales Department</HeaderTitle>
          <HeaderSubtitle>Track deals, revenue, and team performance</HeaderSubtitle>
        </div>
        <StatusIndicator>
          <span
            style={{
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              backgroundColor: '#10B981',
            }}
          />
          Active
        </StatusIndicator>
      </Header>

      {/* Key Metrics */}
      <SalesMetricsOverview metrics={metrics} />

      {/* Main Content */}
      <MainContent>
        <LeftColumn>
          {/* Sales Pipeline */}
          <SalesPipeline pipelineStages={pipelineStages} />

          {/* Recent Deals */}
          <RecentDealsList deals={deals} onSelectDeal={setSelectedDeal} />
        </LeftColumn>

        <RightColumn>
          {/* Team Performance */}
          <TeamPerformance teamData={initialTeamData} />

          {/* Quick Stats */}
          <SalesQuickStats metrics={metrics} />
        </RightColumn>
      </MainContent>

      {/* Deal Detail Modal/Card */}
      {selectedDeal && <DealDetailCard deal={selectedDeal} />}
    </Container>
  );
};

export default SalesDashboard;
