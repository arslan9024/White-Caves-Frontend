/**
 * Investor Dashboard — View Layer (Mary Allen Wilkes Architecture)
 * Orchestrator View Component
 */

import React from 'react';
import type { InvestorDashboardProps } from './InvestorDashboard.types';
import { INVESTOR_METRICS, PORTFOLIO_ASSETS } from './InvestorDashboard.data';
import { InvestorMetricsCards, PortfolioAssetTable } from './InvestorDashboard.panels';
import '../InvestorDashboard.css';

export const InvestorDashboardView: React.FC<InvestorDashboardProps> = () => {
  return (
    <div className="investor-dashboard-container" style={{ padding: '1rem', maxWidth: '100%' }}>
      {/* Metrics Cards */}
      <InvestorMetricsCards metrics={INVESTOR_METRICS} />

      {/* Asset Table */}
      <PortfolioAssetTable assets={PORTFOLIO_ASSETS} />
    </div>
  );
};

export default InvestorDashboardView;
