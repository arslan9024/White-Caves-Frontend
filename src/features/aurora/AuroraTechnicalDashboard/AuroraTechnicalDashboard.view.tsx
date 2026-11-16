/**
 * Aurora Technical Dashboard — View Layer (Mary Allen Wilkes Architecture)
 * Root orchestrator component coordinating header, tabs, and panel views
 * Strictly < 350 lines
 */

import React from 'react';
import { useAuroraTechnicalDashboardLogic } from './AuroraTechnicalDashboard.logic';
import {
  AuroraHeaderPanel,
  AuroraNavigationPanel,
  HealthOverviewPanel,
  ServicesTablePanel,
  ApiEndpointsPanel,
  TechnicalAlertsPanel,
} from './AuroraTechnicalDashboard.panels';
import '../AuroraTechnicalDashboard.css';

export const AuroraTechnicalDashboard: React.FC = () => {
  const { activeTab, setActiveTab, refreshInterval, setRefreshInterval } =
    useAuroraTechnicalDashboardLogic();

  return (
    <div className="aurora-technical-dashboard">
      <AuroraHeaderPanel
        refreshInterval={refreshInterval}
        setRefreshInterval={setRefreshInterval}
      />

      <AuroraNavigationPanel activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="aurora-content">
        {activeTab === 'health' && <HealthOverviewPanel />}
        {activeTab === 'services' && <ServicesTablePanel />}
        {activeTab === 'apis' && <ApiEndpointsPanel />}
        {activeTab === 'alerts' && <TechnicalAlertsPanel />}
      </main>

      <footer className="aurora-footer">
        <p>
          Aurora&apos;s Technical Authority: Real-time monitoring, performance analysis, and
          infrastructure optimization
        </p>
      </footer>
    </div>
  );
};

export default AuroraTechnicalDashboard;

