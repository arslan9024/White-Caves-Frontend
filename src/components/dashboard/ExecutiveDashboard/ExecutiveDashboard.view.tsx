/**
 * Executive Dashboard — View Layer (Mary Allen Wilkes Architecture)
 * Root orchestrator component coordinating header, KPIs, navigation tabs, and tab panels
 * Strictly < 350 lines
 */

import React from 'react';
import { useExecutiveDashboardLogic } from './ExecutiveDashboard.logic';
import {
  DashboardHeaderPanel,
  KPICardsPanel,
  DashboardTabsPanel,
  OverviewChartsPanel,
  AnalyticsGridPanel,
  TeamPerformancePanel,
  AlertsAndMeetingsPanel,
} from './ExecutiveDashboard.panels';
import '../ExecutiveDashboard.css';

export const ExecutiveDashboard: React.FC = () => {
  const {
    timeRange,
    setTimeRange,
    activeTab,
    setActiveTab,
    refreshing,
    handleRefresh,
  } = useExecutiveDashboardLogic();

  return (
    <div className="executive-dashboard">
      <DashboardHeaderPanel
        timeRange={timeRange}
        setTimeRange={setTimeRange}
        refreshing={refreshing}
        handleRefresh={handleRefresh}
      />

      <KPICardsPanel />

      <DashboardTabsPanel
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {activeTab === 'overview' && <OverviewChartsPanel />}
      {activeTab === 'analytics' && <AnalyticsGridPanel />}
      {activeTab === 'team' && <TeamPerformancePanel />}
      {activeTab === 'alerts' && <AlertsAndMeetingsPanel />}
    </div>
  );
};

export default ExecutiveDashboard;
