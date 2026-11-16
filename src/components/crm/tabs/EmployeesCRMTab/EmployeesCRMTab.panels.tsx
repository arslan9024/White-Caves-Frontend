import React from 'react';
import { Users, Building2, Shield, Search, ChevronDown, UserPlus, Mail, Phone, MoreHorizontal } from 'lucide-react';
import { DEPARTMENTS, EMPLOYEES } from './EmployeesCRMTab.data';
import { Employee } from './EmployeesCRMTab.types';

export const EmployeesCRMHeader: React.FC = () => (
  <div className="crm-main-header">
    <div>
      <h1 className="crm-main-title">Employees</h1>
      <p className="crm-main-subtitle">Manage team members and organizational roles</p>
    </div>
    <button className="crm-btn crm-btn-primary">
      <UserPlus size={18} /> Add Employee
    </button>
  </div>
);

export const EmployeesCRMStatsDeck: React.FC = () => (
  <div className="crm-stats-grid">
    <div className="crm-stat-card">
      <div className="crm-stat-icon navy">
        <Users size={24} />
      </div>
      <div className="crm-stat-content">
        <div className="crm-stat-value">103</div>
        <div className="crm-stat-label">Total Employees</div>
      </div>
    </div>
    <div className="crm-stat-card">
      <div className="crm-stat-icon success">
        <Building2 size={24} />
      </div>
      <div className="crm-stat-content">
        <div className="crm-stat-value">10</div>
        <div className="crm-stat-label">Departments</div>
      </div>
    </div>
    <div className="crm-stat-card">
      <div className="crm-stat-icon gold">
        <Shield size={24} />
      </div>
      <div className="crm-stat-content">
        <div className="crm-stat-value">12</div>
        <div className="crm-stat-label">Managers</div>
      </div>
    </div>
  </div>
);

export const EmployeesCRMSearchBar: React.FC<{
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedDept: string;
  setSelectedDept: (d: string) => void;
}> = ({ searchQuery, setSearchQuery, selectedDept, setSelectedDept }) => (
  <div className="crm-card" style={{ marginBottom: '16px' }}>
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
      <div className="crm-search" style={{ flex: 1, minWidth: '200px' }}>
        <Search size={18} className="crm-search-icon" />
        <input
          type="text"
          className="crm-search-input"
          placeholder="Search employees..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
        />
      </div>
      <div
        className="crm-tabs"
        style={{ marginBottom: 0, background: 'transparent', padding: 0 }}
      >
        {DEPARTMENTS.slice(0, 5).map(dept => (
          <button
            key={dept}
            className={`crm-tab ${selectedDept === dept ? 'active' : ''}`}
            onClick={() => setSelectedDept(dept)}
          >
            {dept}
          </button>
        ))}
        <button className="crm-tab">
          More <ChevronDown size={14} />
        </button>
      </div>
    </div>
  </div>
);

export const EmployeesCRMTable: React.FC<{
  employees: Employee[];
  getTierBadgeClass: (tier: string) => string;
}> = ({ employees, getTierBadgeClass }) => (
  <div className="crm-table-wrapper">
    <table className="crm-table">
      <thead>
        <tr>
          <th>Employee</th>
          <th>Role</th>
          <th>Department</th>
          <th>Tier</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {employees.map(emp => (
          <tr key={emp.id}>
            <td>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '10px',
                    background: 'var(--crm-navy)',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: '600',
                    fontSize: '0.875rem',
                  }}
                >
                  {emp.avatar}
                </div>
                <div>
                  <div style={{ fontWeight: '600', color: 'var(--text-primary)' }}>
                    {emp.name}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    {emp.email}
                  </div>
                </div>
              </div>
            </td>
            <td>{emp.role}</td>
            <td>
              <span
                style={{
                  fontSize: '0.75rem',
                  padding: '4px 10px',
                  borderRadius: '12px',
                  background: 'var(--surface-secondary)',
                  color: 'var(--text-secondary)',
                }}
              >
                {emp.department}
              </span>
            </td>
            <td>
              <span className={getTierBadgeClass(emp.tier)}>
                {emp.tier.charAt(0).toUpperCase() + emp.tier.slice(1)}
              </span>
            </td>
            <td>
              <span
                style={{
                  fontSize: '0.75rem',
                  padding: '4px 10px',
                  borderRadius: '12px',
                  background:
                    emp.status === 'active'
                      ? 'rgba(16, 185, 129, 0.1)'
                      : 'rgba(239, 68, 68, 0.1)',
                  color: emp.status === 'active' ? '#10B981' : '#EF4444',
                  fontWeight: '500',
                }}
              >
                {emp.status === 'active' ? 'Active' : 'Inactive'}
              </span>
            </td>
            <td>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  className="crm-toggle-btn"
                  style={{ width: '32px', height: '32px' }}
                  title="Email"
                >
                  <Mail size={14} />
                </button>
                <button
                  className="crm-toggle-btn"
                  style={{ width: '32px', height: '32px' }}
                  title="Call"
                >
                  <Phone size={14} />
                </button>
                <button
                  className="crm-toggle-btn"
                  style={{ width: '32px', height: '32px' }}
                  title="More"
                >
                  <MoreHorizontal size={14} />
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export const EmployeesCRMFooter: React.FC<{
  shownCount: number;
  totalCount: number;
}> = ({ shownCount, totalCount }) => (
  <div
    style={{
      marginTop: '16px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    }}
  >
    <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
      Showing {shownCount} of {totalCount} employees
    </span>
    <div style={{ display: 'flex', gap: '8px' }}>
      <button className="crm-btn crm-btn-secondary">Previous</button>
      <button className="crm-btn crm-btn-secondary">Next</button>
    </div>
  </div>
);

