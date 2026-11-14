/**
 * Executive Dashboard — Panels Layer (Mary Allen Wilkes Architecture)
 * Subcomponents for Header Controls, KPI Cards, Charts, Analytics, Team Grid, and Alerts List
 * Strictly < 350 lines
 */

import React from 'react';
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import {
  Activity, AlertCircle, CheckCircle2, Calendar, Clock
} from 'lucide-react';
import type { TimeRange, DashboardTab } from './ExecutiveDashboard.types';
import {
  DEFAULT_KPIS,
  TEAM_METRICS,
  DEPARTMENT_METRICS,
  REVENUE_DATA,
  LEADS_QUALITY_DATA,
  DASHBOARD_ALERTS,
  UPCOMING_MEETINGS,
  RECENT_ACTIVITIES,
} from './ExecutiveDashboard.data';

export const DashboardHeaderPanel: React.FC<{
  timeRange: TimeRange;
  setTimeRange: (r: TimeRange) => void;
  refreshing: boolean;
  handleRefresh: () => void;
}> = ({ timeRange, setTimeRange, refreshing, handleRefresh }) => (
  <div className="dashboard-header">
    <div>
      <h1>Executive Dashboard</h1>
      <p>Welcome back, Managing Director</p>
    </div>
    <div className="dashboard-controls">
      <div className="time-range-selector">
        {(['day', 'week', 'month', 'quarter', 'year'] as TimeRange[]).map(range => (
          <button
            key={range}
            className={`range-btn ${timeRange === range ? 'active' : ''}`}
            onClick={() => setTimeRange(range)}
          >
            {range.charAt(0).toUpperCase() + range.slice(1)}
          </button>
        ))}
      </div>
      <button
        className={`refresh-btn ${refreshing ? 'refreshing' : ''}`}
        onClick={handleRefresh}
        disabled={refreshing}
      >
        <Activity size={16} className={refreshing ? 'spinning' : ''} />
        {refreshing ? 'Refreshing...' : 'Refresh'}
      </button>
    </div>
  </div>
);

export const KPICardsPanel: React.FC = () => (
  <section className="kpi-section">
    <h2>Key Performance Indicators</h2>
    <div className="kpi-grid">
      {DEFAULT_KPIS.map((kpi, idx) => {
        const Icon = kpi.icon;
        return (
          <div key={idx} className={`kpi-card ${kpi.color}`}>
            <div className="kpi-header">
              <Icon size={24} />
              <span className={`trend-badge ${kpi.trend}`}>{kpi.change}</span>
            </div>
            <div className="kpi-content">
              <h3>{kpi.label}</h3>
              <p className="kpi-value">{kpi.value}</p>
            </div>
          </div>
        );
      })}
    </div>
  </section>
);

export const DashboardTabsPanel: React.FC<{
  activeTab: DashboardTab;
  setActiveTab: (t: DashboardTab) => void;
}> = ({ activeTab, setActiveTab }) => (
  <div className="dashboard-tabs">
    {(['overview', 'analytics', 'team', 'alerts'] as DashboardTab[]).map(tab => (
      <button
        key={tab}
        className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
        onClick={() => setActiveTab(tab)}
      >
        {tab.charAt(0).toUpperCase() + tab.slice(1)}
      </button>
    ))}
  </div>
);

export const OverviewChartsPanel: React.FC = () => (
  <div className="overview-section">
    <div className="chart-card">
      <h3>Revenue Trend</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={REVENUE_DATA}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="revenue" stroke="#10B981" name="Actual (M AED)" />
          <Line type="monotone" dataKey="target" stroke="#6B7280" name="Target (M AED)" strokeDasharray="5 5" />
          <Line type="monotone" dataKey="expense" stroke="#EF4444" name="Expenses (M AED)" />
        </LineChart>
      </ResponsiveContainer>
    </div>

    <div className="chart-card">
      <h3>Department Performance vs Target</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={DEPARTMENT_METRICS}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="value" fill="#8B5CF6" name="Actual" />
          <Bar dataKey="target" fill="#CBD5E1" name="Target" />
        </BarChart>
      </ResponsiveContainer>
    </div>

    <div className="chart-card">
      <h3>Lead Quality Distribution</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie data={LEADS_QUALITY_DATA} cx="50%" cy="50%" labelLine={false} label>
            {LEADS_QUALITY_DATA.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  </div>
);

export const AnalyticsGridPanel: React.FC = () => (
  <div className="analytics-section">
    <div className="grid-2col">
      <div className="card">
        <h3>Recent Activities</h3>
        <div className="activities-list">
          {RECENT_ACTIVITIES.map(activity => (
            <div key={activity.id} className="activity-item">
              <div className="activity-info">
                <strong>{activity.actor}</strong>
                <span className="activity-action">{activity.action}</span>
                <span className="activity-target">{activity.target}</span>
              </div>
              <div className="activity-meta">
                <span className="activity-value">{activity.value || activity.count}</span>
                <small>{activity.timestamp}</small>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        <h3>Quick Stats</h3>
        <div className="stats-list">
          <div className="stat-row">
            <span>Avg Deal Size</span>
            <strong>AED 1.8M</strong>
          </div>
          <div className="stat-row">
            <span>Win Rate</span>
            <strong>24.5%</strong>
          </div>
          <div className="stat-row">
            <span>Sales Pipeline</span>
            <strong>AED 89M</strong>
          </div>
          <div className="stat-row">
            <span>Avg Deal Cycle</span>
            <strong>24 days</strong>
          </div>
          <div className="stat-row">
            <span>Customer Satisfaction</span>
            <strong>4.8/5</strong>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export const TeamPerformancePanel: React.FC = () => (
  <div className="team-section">
    <h2>Team Performance</h2>
    <div className="team-grid">
      {TEAM_METRICS.map((member, idx) => (
        <div key={idx} className="team-card">
          <div className="team-header">
            <div className="team-avatar">{member.name.charAt(0)}</div>
            <div>
              <h4>{member.name}</h4>
              <p className="role">{member.role}</p>
            </div>
            <span className={`status-badge ${member.status}`}>{member.status}</span>
          </div>
          <div className="team-metrics">
            {Object.entries(member).map(([key, value]) => {
              if (['name', 'role', 'status'].includes(key)) return null;
              return (
                <div key={key} className="metric">
                  <span className="label">{key.replace(/([A-Z])/g, ' $1').toLowerCase()}</span>
                  <span className="value">{value}</span>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  </div>
);

export const AlertsAndMeetingsPanel: React.FC = () => (
  <div className="alerts-section">
    <h2>Alerts & Notifications</h2>
    <div className="alerts-list">
      {DASHBOARD_ALERTS.map(alert => (
        <div key={alert.id} className={`alert-item alert-${alert.type}`}>
          <div className="alert-icon">
            {alert.type === 'critical' && <AlertCircle size={20} />}
            {alert.type === 'warning' && <AlertCircle size={20} />}
            {alert.type === 'success' && <CheckCircle2 size={20} />}
            {alert.type === 'info' && <AlertCircle size={20} />}
          </div>
          <div className="alert-content">
            <h4>{alert.title}</h4>
            <p>{alert.message}</p>
            <small>{alert.timestamp}</small>
          </div>
          <button className="alert-action">{alert.action}</button>
        </div>
      ))}
    </div>

    <div className="meetings-section">
      <h3>Upcoming Meetings</h3>
      <div className="meetings-list">
        {UPCOMING_MEETINGS.map(meeting => (
          <div key={meeting.id} className="meeting-item">
            <Calendar size={20} />
            <div className="meeting-info">
              <h4>{meeting.title}</h4>
              <p>{meeting.attendees.join(', ')}</p>
            </div>
            <div className="meeting-time">
              <div className="time">{meeting.time}</div>
              <div className="date">{meeting.date}</div>
            </div>
            <Clock size={16} />
          </div>
        ))}
      </div>
    </div>
  </div>
);
