import React, { useState } from 'react';
import {
  Home,
  FileText,
  Clock,
  Search,
  Plus,
  AlertCircle,
  ArrowUp,
  DollarSign,
} from 'lucide-react';
import { AssistantDocsTab } from './shared';
import './AssistantDashboard.css';
import { ACTIVE_LEASES } from './DaisyLeasingCRM.data';
import { DaisyInquiriesView, DaisyMaintenanceView } from './DaisyLeasingCRMViews';

export * from './DaisyLeasingCRM.data';

const DaisyLeasingCRM = () => {
  const [activeTab, setActiveTab] = useState('leases');

  return (
    <div className="assistant-dashboard daisy">
      <div className="assistant-header">
        <div
          className="assistant-avatar"
          style={{
            background:
              'linear-gradient(135deg, var(--accent-teal, #14B8A6) 0%, var(--accent-green, #10B981) 100%)',
          }}
        >
          <Home size={28} />
        </div>
        <div className="assistant-info">
          <h2>Daisy - Leasing & Tenant Manager</h2>
          <p>
            Manages rental properties, tenant communications, lease agreements, and maintenance
            requests
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
            style={{ background: 'rgba(20, 184, 166, 0.2)', color: 'var(--accent-teal, #14B8A6)' }}
          >
            <FileText size={20} />
          </div>
          <div className="stat-content">
            <span className="stat-value">156</span>
            <span className="stat-label">Active Leases</span>
          </div>
          <span className="stat-change positive">
            <ArrowUp size={14} /> 8
          </span>
        </div>
        <div className="stat-card">
          <div
            className="stat-icon"
            style={{ background: 'rgba(245, 158, 11, 0.2)', color: 'var(--accent-gold, #F59E0B)' }}
          >
            <Clock size={20} />
          </div>
          <div className="stat-content">
            <span className="stat-value">12</span>
            <span className="stat-label">Expiring Soon</span>
          </div>
          <span className="stat-change warning">30 days</span>
        </div>
        <div className="stat-card">
          <div
            className="stat-icon"
            style={{ background: 'rgba(16, 185, 129, 0.2)', color: 'var(--accent-green, #10B981)' }}
          >
            <DollarSign size={20} />
          </div>
          <div className="stat-content">
            <span className="stat-value">AED 18.5M</span>
            <span className="stat-label">Monthly Revenue</span>
          </div>
          <span className="stat-change positive">
            <ArrowUp size={14} /> 5%
          </span>
        </div>
        <div className="stat-card">
          <div
            className="stat-icon"
            style={{ background: 'rgba(239, 68, 68, 0.2)', color: 'var(--accent-red, #EF4444)' }}
          >
            <AlertCircle size={20} />
          </div>
          <div className="stat-content">
            <span className="stat-value">8</span>
            <span className="stat-label">Maintenance</span>
          </div>
          <span className="stat-change">Open</span>
        </div>
      </div>

      <div className="assistant-tabs">
        {['leases', 'inquiries', 'maintenance', 'renewals', 'docs'].map(tab => (
          <button
            key={tab}
            className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      <div className="tab-content">
        {activeTab === 'leases' && (
          <div className="leases-view">
            <div className="view-header">
              <div className="search-box">
                <Search size={16} />
                <input type="text" placeholder="Search leases..." />
              </div>
              <button className="add-btn">
                <Plus size={16} /> New Lease
              </button>
            </div>
            <div className="leases-table">
              <div className="table-header">
                <span>Unit</span>
                <span>Tenant</span>
                <span>Annual Rent</span>
                <span>End Date</span>
                <span>Days Left</span>
                <span>Status</span>
              </div>
              {ACTIVE_LEASES.map(lease => (
                <div key={lease.id} className="table-row">
                  <span className="unit-name">{lease.unit}</span>
                  <span>{lease.tenant}</span>
                  <span>AED {lease.rent.toLocaleString()}</span>
                  <span>{lease.endDate}</span>
                  <span className={lease.daysRemaining < 60 ? 'warning' : ''}>
                    {lease.daysRemaining}
                  </span>
                  <span className={`status-badge ${lease.status}`}>
                    {lease.status.replace('_', ' ')}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'inquiries' && <DaisyInquiriesView />}

        {activeTab === 'maintenance' && <DaisyMaintenanceView />}

        {activeTab === 'renewals' && (
          <div className="renewals-view">
            <h3>Lease Renewals</h3>
            <div className="renewal-summary">
              <div className="renewal-stat">
                <span className="value">12</span>
                <span className="label">Due This Month</span>
              </div>
              <div className="renewal-stat">
                <span className="value">8</span>
                <span className="label">Renewal Sent</span>
              </div>
              <div className="renewal-stat">
                <span className="value">5</span>
                <span className="label">Confirmed</span>
              </div>
              <div className="renewal-stat">
                <span className="value">2</span>
                <span className="label">Moving Out</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'docs' && (
          <AssistantDocsTab assistantId="daisy" assistantName="Daisy" assistantColor="#10B981" />
        )}
      </div>
    </div>
  );
};

export default DaisyLeasingCRM;

