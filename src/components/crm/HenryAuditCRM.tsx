import React, { useState } from 'react';
import {
  BookOpen,
  Clock,
  FileText,
  Search,
  Users,
  Activity,
  Shield,
  AlertCircle,
  CheckCircle,
  Download,
  TrendingUp,
  ArrowUp,
} from 'lucide-react';
import AssistantDocsTab from './shared/AssistantDocsTab';
import KYCAMLDashboard from './shared/KYCAMLDashboard';
import './AssistantDashboard.css';
import {
  TIMELINE_EVENTS,
  AUDIT_LOGS,
  COMPLIANCE_REPORTS,
  ASSISTANT_COLORS,
} from './henryAuditCRM.data';

const HenryAuditCRM = () => {
  const [activeTab, setActiveTab] = useState('compliance');
  const [searchQuery, setSearchQuery] = useState('');

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'lead_created':
        return <Users size={16} />;
      case 'property_updated':
        return <Activity size={16} />;
      case 'payment_received':
        return <CheckCircle size={16} />;
      case 'contract_signed':
        return <FileText size={16} />;
      case 'compliance_check':
        return <Shield size={16} />;
      case 'suggestion_sent':
        return <TrendingUp size={16} />;
      default:
        return <Activity size={16} />;
    }
  };

  return (
    <div className="assistant-dashboard henry">
      <div className="assistant-header">
        <div
          className="assistant-avatar"
          style={{
            background:
              'linear-gradient(135deg, var(--accent-purple, #7C3AED) 0%, var(--color-5b21b6, #5B21B6) 100%)',
          }}
        >
          <BookOpen size={28} />
        </div>
        <div className="assistant-info">
          <h2>Henry - Compliance Officer & Record Keeper</h2>
          <p>
            KYC/AML compliance management, immutable audit trails, cross-system analytics, and
            automated compliance reporting
          </p>
        </div>
        <div className="assistant-status online">
          <span className="status-dot"></span>
          Active
        </div>
      </div>

      <div className="quick-stats">
        <div className="stat-card">
          <div
            className="stat-icon"
            style={{
              background: 'rgba(124, 58, 237, 0.2)',
              color: 'var(--accent-purple, #7C3AED)',
            }}
          >
            <Activity size={20} />
          </div>
          <div className="stat-content">
            <span className="stat-value">12,847</span>
            <span className="stat-label">Events Logged</span>
          </div>
          <span className="stat-change positive">
            <ArrowUp size={14} /> 342 today
          </span>
        </div>
        <div className="stat-card">
          <div
            className="stat-icon"
            style={{ background: 'rgba(16, 185, 129, 0.2)', color: 'var(--accent-green, #10B981)' }}
          >
            <Shield size={20} />
          </div>
          <div className="stat-content">
            <span className="stat-value">100%</span>
            <span className="stat-label">Data Integrity</span>
          </div>
          <span className="stat-change positive">Verified</span>
        </div>
        <div className="stat-card">
          <div
            className="stat-icon"
            style={{ background: 'rgba(245, 158, 11, 0.2)', color: 'var(--accent-gold, #F59E0B)' }}
          >
            <Clock size={20} />
          </div>
          <div className="stat-content">
            <span className="stat-value">38</span>
            <span className="stat-label">AI Assistants</span>
          </div>
          <span className="stat-change">All monitored</span>
        </div>
        <div className="stat-card">
          <div
            className="stat-icon"
            style={{ background: 'rgba(239, 68, 68, 0.2)', color: 'var(--accent-red, #EF4444)' }}
          >
            <AlertCircle size={20} />
          </div>
          <div className="stat-content">
            <span className="stat-value">2</span>
            <span className="stat-label">Anomalies</span>
          </div>
          <span className="stat-change warning">Under review</span>
        </div>
      </div>

      <div className="assistant-tabs">
        {['compliance', 'timeline', 'audit', 'reports', 'analytics', 'docs'].map(tab => (
          <button
            key={tab}
            className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab === 'docs'
              ? 'Documentation'
              : tab === 'compliance'
                ? 'KYC/AML Compliance'
                : tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      <div className="tab-content">
        {activeTab === 'compliance' && (
          <KYCAMLDashboard
            assistant="henry"
            accessLevel="full"
            showTabs={['queue', 'profiles', 'alerts', 'pep', 'sanctions', 'audit', 'reports']}
          />
        )}

        {activeTab === 'timeline' && (
          <div className="timeline-view">
            <div className="view-header">
              <div className="search-box">
                <Search size={16} />
                <input
                  type="text"
                  placeholder="Search events..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="filter-group">
                <select>
                  <option value="all">All Assistants</option>
                  <option value="linda">Linda</option>
                  <option value="mary">Mary</option>
                  <option value="clara">Clara</option>
                </select>
                <select>
                  <option value="all">All Types</option>
                  <option value="lead">Leads</option>
                  <option value="property">Properties</option>
                  <option value="payment">Payments</option>
                </select>
              </div>
            </div>
            <div className="timeline-list">
              {TIMELINE_EVENTS.map(event => (
                <div key={event.id} className="timeline-event">
                  <div className="event-time">{event.timestamp.split(' ')[1]}</div>
                  <div className="event-line">
                    <div
                      className="event-dot"
                      style={{
                        background:
                          ASSISTANT_COLORS[event.assistant] || 'var(--text-secondary, #6B7280)',
                      }}
                    >
                      {getEventIcon(event.type)}
                    </div>
                  </div>
                  <div className="event-content">
                    <div className="event-header">
                      <span className="event-entity">{event.entity}</span>
                      <span className="event-type">{event.type.replace(/_/g, ' ')}</span>
                    </div>
                    <p className="event-details">{event.details}</p>
                    <div className="event-meta">
                      <span className="event-user">{event.user}</span>
                      <span className="event-date">{event.timestamp.split(' ')[0]}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'audit' && (
          <div className="audit-view">
            <h3>Security Audit Log</h3>
            <div className="audit-table">
              <table>
                <thead>
                  <tr>
                    <th>Action</th>
                    <th>User</th>
                    <th>IP Address</th>
                    <th>Timestamp</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {AUDIT_LOGS.map(log => (
                    <tr key={log.id} className={log.status === 'failed' ? 'failed' : ''}>
                      <td>{log.action}</td>
                      <td>{log.user}</td>
                      <td>{log.ip}</td>
                      <td>{log.timestamp}</td>
                      <td>
                        <span className={`status-badge ${log.status}`}>
                          {log.status === 'success' ? (
                            <CheckCircle size={12} />
                          ) : (
                            <AlertCircle size={12} />
                          )}
                          {log.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'reports' && (
          <div className="reports-view">
            <h3>Compliance Reports</h3>
            <div className="reports-grid">
              {COMPLIANCE_REPORTS.map(report => (
                <div key={report.id} className="report-card">
                  <div className="report-icon">
                    <FileText size={24} />
                  </div>
                  <div className="report-content">
                    <h4>{report.name}</h4>
                    <div className="report-meta">
                      <span>{report.type}</span>
                      <span>{report.generated}</span>
                    </div>
                  </div>
                  <div className="report-actions">
                    <span className={`status-badge ${report.status}`}>
                      {report.status.replace('_', ' ')}
                    </span>
                    {report.status === 'completed' && (
                      <button className="download-btn">
                        <Download size={14} />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="analytics-view">
            <h3>Timeline Analytics</h3>
            <div className="analytics-grid">
              <div className="analytics-card">
                <h4>Events by Assistant</h4>
                <div className="chart-placeholder">Chart coming soon</div>
              </div>
              <div className="analytics-card">
                <h4>Activity Heatmap</h4>
                <div className="chart-placeholder">Chart coming soon</div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'docs' && (
          <AssistantDocsTab assistantId="henry" assistantName="Henry" assistantColor="#7C3AED" />
        )}
      </div>
    </div>
  );
};

export default HenryAuditCRM;
