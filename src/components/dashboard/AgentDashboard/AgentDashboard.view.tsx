/**
 * Agent Dashboard — View Layer (Mary Allen Wilkes Architecture)
 * Orchestrator View Component
 */

import React from 'react';
import type { AgentDashboardProps } from './AgentDashboard.types';
import { AGENT_METRICS, DAILY_ACTIVITY, TOP_LEADS } from './AgentDashboard.data';
import { AgentMetricsOverview, DailyActivityChart, TopLeadsTable } from './AgentDashboard.panels';
import '../AgentDashboard.css';

export const AgentDashboardView: React.FC<AgentDashboardProps> = () => {
  return (
    <div className="agent-dashboard-container" style={{ padding: '1rem', maxWidth: '100%' }}>
      {/* Metrics Overview */}
      <AgentMetricsOverview metrics={AGENT_METRICS} />

      {/* Activity Chart */}
      <DailyActivityChart data={DAILY_ACTIVITY} />

      {/* Priority Leads Table */}
      <TopLeadsTable leads={TOP_LEADS} />
    </div>
  );
};

export default AgentDashboardView;
