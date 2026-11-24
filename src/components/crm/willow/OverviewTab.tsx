import React from 'react';
import { Server, Database } from 'lucide-react';
import { DATABASE_METRICS } from './data';
import type { ApiStatsSummary } from './types';

interface OverviewTabProps {
  apiStats: ApiStatsSummary;
}

export const OverviewTab: React.FC<OverviewTabProps> = ({ apiStats }) => {
  return (
    <div className="overview-grid">
      <div className="overview-section">
        <h3>
          <Server size={16} /> API Health
        </h3>
        <div className="health-metrics">
          <div className="health-item">
            <span>Total Calls (24h)</span>
            <span className="value">{apiStats.totalCalls.toLocaleString()}</span>
          </div>
          <div className="health-item">
            <span>Avg Response Time</span>
            <span className="value">{apiStats.avgResponseTime}ms</span>
          </div>
          <div className="health-item">
            <span>Success Rate</span>
            <span className="value success">{apiStats.avgSuccessRate}%</span>
          </div>
        </div>
      </div>
      <div className="overview-section">
        <h3>
          <Database size={16} /> Database Status
        </h3>
        <div className="health-metrics">
          <div className="health-item">
            <span>Active Connections</span>
            <span className="value">
              {DATABASE_METRICS.connections.current}/{DATABASE_METRICS.connections.max}
            </span>
          </div>
          <div className="health-item">
            <span>Index Hit Rate</span>
            <span className="value success">
              {DATABASE_METRICS.queryPerformance.indexHits}%
            </span>
          </div>
          <div className="health-item">
            <span>Storage Used</span>
            <span className="value">{DATABASE_METRICS.storage.percentage}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};
