/**
 * Aurora Technical Dashboard — Panels Layer (Mary Allen Wilkes Architecture)
 * Subcomponents for Header, Navigation, Health Overview Charts, Services Table, APIs, and Alerts
 * Strictly < 350 lines
 */

import React from 'react';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import type { AuroraTab } from './AuroraTechnicalDashboard.types';
import {
  LATENCY_TREND,
  ERROR_RATE_TREND,
  SERVICE_HEALTH,
  CONCURRENT_USERS_TREND,
  API_PERFORMANCE,
  TECHNICAL_ALERTS,
  TECHNICAL_SERVICES,
} from './AuroraTechnicalDashboard.data';

export const AuroraHeaderPanel: React.FC<{
  refreshInterval: number;
  setRefreshInterval: (interval: number) => void;
}> = ({ refreshInterval, setRefreshInterval }) => (
  <header className="aurora-header">
    <div className="aurora-title">
      <h1>🤖 Aurora&apos;s Technical Monitoring Dashboard</h1>
      <p>Real-Time System Health & Performance Tracking (Wednesday, Jan 22)</p>
    </div>
    <div className="aurora-controls">
      <select
        value={refreshInterval}
        onChange={e => setRefreshInterval(parseInt(e.target.value))}
        className="refresh-select"
      >
        <option value={5000}>Refresh: 5s</option>
        <option value={10000}>Refresh: 10s</option>
        <option value={30000}>Refresh: 30s</option>
      </select>
      <span className="last-update">Last updated: {new Date().toLocaleTimeString()}</span>
    </div>
  </header>
);

export const AuroraNavigationPanel: React.FC<{
  activeTab: AuroraTab;
  setActiveTab: (t: AuroraTab) => void;
}> = ({ activeTab, setActiveTab }) => (
  <nav className="aurora-nav">
    <button
      className={`nav-btn ${activeTab === 'health' ? 'active' : ''}`}
      onClick={() => setActiveTab('health')}
    >
      🟢 Health Overview
    </button>
    <button
      className={`nav-btn ${activeTab === 'services' ? 'active' : ''}`}
      onClick={() => setActiveTab('services')}
    >
      🔧 Services ({TECHNICAL_SERVICES.filter(s => s.status === 'healthy').length}/
      {TECHNICAL_SERVICES.length})
    </button>
    <button
      className={`nav-btn ${activeTab === 'apis' ? 'active' : ''}`}
      onClick={() => setActiveTab('apis')}
    >
      📡 API Endpoints
    </button>
    <button
      className={`nav-btn ${activeTab === 'alerts' ? 'active' : ''}`}
      onClick={() => setActiveTab('alerts')}
    >
      🚨 Alerts ({TECHNICAL_ALERTS.filter(a => a.severity === 'critical').length})
    </button>
  </nav>
);

export const HealthOverviewPanel: React.FC = () => (
  <div className="aurora-health-grid">
    <section className="aurora-section">
      <h3>🟢 System Health Status</h3>
      <div className="health-summary">
        <div className="health-stat">
          <div className="stat-value">99.98%</div>
          <div className="stat-label">Uptime</div>
          <div className="stat-trend">↑ +0.05% vs target</div>
        </div>
        <div className="health-stat">
          <div className="stat-value">10/11</div>
          <div className="stat-label">Services Healthy</div>
          <div className="stat-trend">1 degraded (analytics)</div>
        </div>
        <div className="health-stat">
          <div className="stat-value">2</div>
          <div className="stat-label">Active Alerts</div>
          <div className="stat-trend">1 warning, 1 info</div>
        </div>
        <div className="health-stat">
          <div className="stat-value">460ms</div>
          <div className="stat-label">Avg API Latency</div>
          <div className="stat-trend">↓ 40ms below threshold</div>
        </div>
      </div>
    </section>

    <section className="aurora-section">
      <h3>📊 API Latency Trend (p95)</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={LATENCY_TREND}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
          <XAxis dataKey="time" stroke="#888" />
          <YAxis stroke="#888" />
          <Tooltip contentStyle={{ background: 'rgba(0,0,0,0.8)', border: '1px solid #10b981' }} />
          <Legend />
          <Line
            type="monotone"
            dataKey="api"
            stroke="#dc2626"
            strokeWidth={2}
            name="API Latency (ms)"
          />
          <Line
            type="monotone"
            dataKey="db"
            stroke="#10b981"
            strokeWidth={2}
            name="DB Latency (ms)"
          />
        </LineChart>
      </ResponsiveContainer>
    </section>

    <section className="aurora-section">
      <h3>📈 Error Rate Trend (Target: &lt;0.5%)</h3>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={ERROR_RATE_TREND}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
          <XAxis dataKey="time" stroke="#888" />
          <YAxis stroke="#888" />
          <Tooltip contentStyle={{ background: 'rgba(0,0,0,0.8)', border: '1px solid #10b981' }} />
          <Area
            type="monotone"
            dataKey="rate"
            fill="rgba(239, 68, 68, 0.3)"
            stroke="#ef4444"
            name="Error Rate %"
          />
          <Line
            type="stepAfter"
            dataKey="threshold"
            stroke="#10b981"
            strokeDasharray="5 5"
            name="Threshold"
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </section>

    <section className="aurora-section">
      <h3>👥 Concurrent Users vs Capacity</h3>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={CONCURRENT_USERS_TREND}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
          <XAxis dataKey="time" stroke="#888" />
          <YAxis stroke="#888" />
          <Tooltip contentStyle={{ background: 'rgba(0,0,0,0.8)', border: '1px solid #10b981' }} />
          <Area
            type="monotone"
            dataKey="capacity"
            fill="rgba(255, 255, 255, 0.05)"
            stroke="#888"
            name="Capacity"
          />
          <Area
            type="monotone"
            dataKey="users"
            fill="rgba(16, 185, 129, 0.3)"
            stroke="#10b981"
            strokeWidth={2}
            name="Active Users"
          />
        </AreaChart>
      </ResponsiveContainer>
    </section>

    <section className="aurora-section">
      <h3>🔍 Service Health Distribution</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={SERVICE_HEALTH}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, value }) => `${name}: ${value}`}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
          >
            {SERVICE_HEALTH.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip contentStyle={{ background: 'rgba(0,0,0,0.8)', border: '1px solid #10b981' }} />
        </PieChart>
      </ResponsiveContainer>
    </section>
  </div>
);

export const ServicesTablePanel: React.FC = () => (
  <section className="aurora-section">
    <h3>🔧 Service Health Details</h3>
    <div className="services-table-wrapper">
      <table className="services-table">
        <thead>
          <tr>
            <th>Service</th>
            <th>Status</th>
            <th>Avg Latency</th>
            <th>Error Rate</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {TECHNICAL_SERVICES.map((svc, idx) => (
            <tr key={idx} className={`status-${svc.status}`}>
              <td className="service-name">{svc.name}</td>
              <td>
                <span className={`status-badge status-${svc.status}`}>
                  {svc.status === 'healthy' ? '✓ Healthy' : '⚠ Degraded'}
                </span>
              </td>
              <td>{svc.latency}ms</td>
              <td className={`error-rate ${svc.errorRate > 0.3 ? 'high' : 'low'}`}>
                {(svc.errorRate * 100).toFixed(2)}%
              </td>
              <td>
                <button className="action-btn">Details</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </section>
);

export const ApiEndpointsPanel: React.FC = () => (
  <section className="aurora-section">
    <h3>📡 API Endpoint Performance</h3>
    <div className="apis-table-wrapper">
      <table className="apis-table">
        <thead>
          <tr>
            <th>Endpoint</th>
            <th>p50 Latency</th>
            <th>Error Rate</th>
            <th>Throughput (req/s)</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {API_PERFORMANCE.map((api, idx) => {
            const isAboveThreshold = api.latency > 500;
            return (
              <tr key={idx} className={isAboveThreshold ? 'warning' : 'healthy'}>
                <td className="endpoint-name">{api.endpoint}</td>
                <td className={isAboveThreshold ? 'alert' : ''}>{api.latency}ms</td>
                <td className={api.errorRate > 0.3 ? 'alert' : ''}>
                  {(api.errorRate * 100).toFixed(1)}%
                </td>
                <td>{api.throughput}</td>
                <td>
                  <span className={`perf-badge ${isAboveThreshold ? 'warning' : 'healthy'}`}>
                    {isAboveThreshold ? '⚠ Slow' : '✓ Fast'}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  </section>
);

export const TechnicalAlertsPanel: React.FC = () => (
  <section className="aurora-section">
    <h3>🚨 Active Alerts</h3>
    {TECHNICAL_ALERTS.length === 0 ? (
      <div className="no-alerts">
        <p>✓ No active alerts</p>
      </div>
    ) : (
      <div className="alerts-list">
        {TECHNICAL_ALERTS.map((alert, idx) => (
          <div key={idx} className={`alert-item severity-${alert.severity}`}>
            <div className="alert-header">
              <span className="alert-id">{alert.id}</span>
              <span className={`severity-badge ${alert.severity}`}>
                {alert.severity.toUpperCase()}
              </span>
              <span className="alert-time">{alert.timestamp}</span>
            </div>
            <div className="alert-service">{alert.service}</div>
            <div className="alert-message">{alert.message}</div>
            <button className="dismiss-btn">Acknowledge</button>
          </div>
        ))}
      </div>
    )}
  </section>
);

