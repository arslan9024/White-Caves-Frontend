import React from 'react';
import { Zap, Shield, Wifi, CheckCircle, AlertTriangle } from 'lucide-react';
import { CACHE_STATS, SECURITY_CHECKS, REALTIME_CONNECTIONS } from './data';

export const CachingTab: React.FC = () => {
  return (
    <div className="caching-view">
      <h3>
        <Zap size={16} /> Cache Performance
      </h3>
      <div className="cache-stats">
        <div className="cache-card highlight">
          <span className="label">Hit Rate</span>
          <span className="value success">{CACHE_STATS.hitRate}%</span>
        </div>
        <div className="cache-card">
          <span className="label">Miss Rate</span>
          <span className="value">{CACHE_STATS.missRate}%</span>
        </div>
        <div className="cache-card">
          <span className="label">Total Hits</span>
          <span className="value">{CACHE_STATS.totalHits.toLocaleString()}</span>
        </div>
        <div className="cache-card">
          <span className="label">Memory Used</span>
          <span className="value">
            {CACHE_STATS.memoryUsed}MB / {CACHE_STATS.memoryTotal}MB
          </span>
        </div>
      </div>
    </div>
  );
};

export const SecurityTab: React.FC = () => {
  return (
    <div className="security-view">
      <h3>
        <Shield size={16} /> Security Checks
      </h3>
      <div className="security-list">
        {SECURITY_CHECKS.map(check => (
          <div key={check.name} className={`security-card ${check.status}`}>
            <div className="check-status">
              {check.status === 'pass' && <CheckCircle size={18} />}
              {check.status === 'warning' && <AlertTriangle size={18} />}
            </div>
            <div className="check-info">
              <span className="check-name">{check.name}</span>
              <span className="check-time">Last check: {check.lastCheck}</span>
            </div>
            <span className={`status-badge ${check.status}`}>{check.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export const RealtimeTab: React.FC = () => {
  return (
    <div className="realtime-view">
      <h3>
        <Wifi size={16} /> Real-time Connections
      </h3>
      <div className="realtime-grid">
        {REALTIME_CONNECTIONS.map(conn => (
          <div key={conn.type} className={`realtime-card ${conn.status}`}>
            <div className="conn-header">
              <Wifi size={18} />
              <span className="conn-type">{conn.type}</span>
              <span className={`status-indicator ${conn.status}`}></span>
            </div>
            <div className="conn-stats">
              <div className="stat">
                <span className="label">Active</span>
                <span className="value">{conn.active}</span>
              </div>
              <div className="stat">
                <span className="label">Peak</span>
                <span className="value">{conn.peak}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
