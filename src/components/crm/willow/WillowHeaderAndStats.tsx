import React from 'react';
import { Database, Server, Zap, Activity } from 'lucide-react';
import { API_ENDPOINTS, DATABASE_METRICS } from './data';
import type { ApiStatsSummary } from './types';

interface WillowHeaderAndStatsProps {
  apiStats: ApiStatsSummary;
}

export const WillowHeaderAndStats: React.FC<WillowHeaderAndStatsProps> = ({ apiStats }) => {
  return (
    <>
      <div className="assistant-header">
        <div
          className="assistant-avatar"
          style={{
            background:
              'linear-gradient(135deg, var(--accent-green, #22C55E) 0%, var(--accent-green, #10B981) 100%)',
          }}
        >
          <Database size={28} />
        </div>
        <div className="assistant-info">
          <h2>Willow - Elite Backend Engineer</h2>
          <p>API performance, database optimization, and system reliability</p>
        </div>
        <div className="assistant-status online">
          <span className="status-dot"></span>
          Active
        </div>
      </div>

      <div className="quick-stats">
        <div className="stat-card highlight">
          <div
            className="stat-icon"
            style={{ background: 'rgba(34, 197, 94, 0.2)', color: 'var(--accent-green, #22C55E)' }}
          >
            <Server size={20} />
          </div>
          <div className="stat-content">
            <span className="stat-value">{API_ENDPOINTS.length}</span>
            <span className="stat-label">API Endpoints</span>
          </div>
          <span className="stat-change positive">{apiStats.cachedEndpoints} cached</span>
        </div>
        <div className="stat-card">
          <div
            className="stat-icon"
            style={{ background: 'rgba(59, 130, 246, 0.2)', color: 'var(--accent-blue, #3B82F6)' }}
          >
            <Zap size={20} />
          </div>
          <div className="stat-content">
            <span className="stat-value">{apiStats.avgResponseTime}ms</span>
            <span className="stat-label">Avg Response</span>
          </div>
          <span className="stat-change positive">-12ms</span>
        </div>
        <div className="stat-card">
          <div
            className="stat-icon"
            style={{ background: 'rgba(245, 158, 11, 0.2)', color: 'var(--accent-gold, #F59E0B)' }}
          >
            <Activity size={20} />
          </div>
          <div className="stat-content">
            <span className="stat-value">{apiStats.avgSuccessRate}%</span>
            <span className="stat-label">Success Rate</span>
          </div>
          <span className="stat-change positive">+0.2%</span>
        </div>
        <div className="stat-card">
          <div
            className="stat-icon"
            style={{
              background: 'rgba(139, 92, 246, 0.2)',
              color: 'var(--accent-purple, #8B5CF6)',
            }}
          >
            <Database size={20} />
          </div>
          <div className="stat-content">
            <span className="stat-value">{DATABASE_METRICS.connections.current}</span>
            <span className="stat-label">DB Connections</span>
          </div>
        </div>
      </div>
    </>
  );
};
