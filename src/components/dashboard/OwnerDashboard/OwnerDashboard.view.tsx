/**
 * Owner Dashboard — View Layer (Mary Allen Wilkes Architecture)
 * Orchestrator View Component
 */

import React from 'react';
import type { OwnerDashboardProps } from './OwnerDashboard.types';
import { OWNER_METRICS, OWNER_PROPERTIES } from './OwnerDashboard.data';
import { OwnerMetricsCards, OwnerPropertiesTable } from './OwnerDashboard.panels';
import '../OwnerDashboard.css';

export const OwnerDashboardView: React.FC<OwnerDashboardProps> = () => {
  return (
    <div className="owner-dashboard-container" style={{ padding: '1rem', maxWidth: '100%' }}>
      {/* Portfolio KPI Cards */}
      <OwnerMetricsCards metrics={OWNER_METRICS} />

      {/* Properties Table */}
      <OwnerPropertiesTable properties={OWNER_PROPERTIES} />
    </div>
  );
};

export default OwnerDashboardView;

