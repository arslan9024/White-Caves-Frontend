import React from 'react';
import { Network, BarChart3, HardDrive } from 'lucide-react';
import { DATABASE_METRICS } from './data';

export const DatabaseTab: React.FC = () => {
  return (
    <div className="database-view">
      <div className="db-section">
        <h3>
          <Network size={16} /> Connection Pool
        </h3>
        <div className="connection-stats">
          <div className="pool-bar">
            <div
              className="pool-used"
              style={{
                width: `${(DATABASE_METRICS.connections.current / DATABASE_METRICS.connections.max) * 100}%`,
              }}
            ></div>
          </div>
          <div className="pool-info">
            <span>Active: {DATABASE_METRICS.connections.current}</span>
            <span>Available: {DATABASE_METRICS.connections.available}</span>
            <span>Max: {DATABASE_METRICS.connections.max}</span>
          </div>
        </div>
      </div>
      <div className="db-section">
        <h3>
          <BarChart3 size={16} /> Query Performance
        </h3>
        <div className="query-stats">
          <div className="stat-box">
            <span className="label">Avg Query Time</span>
            <span className="value">{DATABASE_METRICS.queryPerformance.avgTime}ms</span>
          </div>
          <div className="stat-box">
            <span className="label">Slow Queries</span>
            <span className="value warning">
              {DATABASE_METRICS.queryPerformance.slowQueries}
            </span>
          </div>
          <div className="stat-box">
            <span className="label">Index Hits</span>
            <span className="value success">
              {DATABASE_METRICS.queryPerformance.indexHits}%
            </span>
          </div>
        </div>
      </div>
      <div className="db-section">
        <h3>
          <HardDrive size={16} /> Operations Summary
        </h3>
        <div className="operations-grid">
          <div className="op-card reads">
            <span>Reads</span>
            <span>{DATABASE_METRICS.operations.reads.toLocaleString()}</span>
          </div>
          <div className="op-card writes">
            <span>Writes</span>
            <span>{DATABASE_METRICS.operations.writes.toLocaleString()}</span>
          </div>
          <div className="op-card updates">
            <span>Updates</span>
            <span>{DATABASE_METRICS.operations.updates.toLocaleString()}</span>
          </div>
          <div className="op-card deletes">
            <span>Deletes</span>
            <span>{DATABASE_METRICS.operations.deletes.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
