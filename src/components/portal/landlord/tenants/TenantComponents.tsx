import React, { FC } from 'react';
import type { TenantData } from './types';

export interface TenantCardProps {
  tenant: TenantData;
  onSelect: (tenant: TenantData) => void;
}

export const TenantCard: FC<TenantCardProps> = ({ tenant, onSelect }) => {
  return (
    <div
      className="tenant-card"
      data-testid={`tenant-row-${tenant.id}`}
      onClick={() => onSelect(tenant)}
      role="button"
      tabIndex={0}
      onKeyPress={e => {
        if (e.key === 'Enter' || e.key === ' ') onSelect(tenant);
      }}
    >
      <h4>{tenant.name}</h4>
      <p className="email">{tenant.email}</p>
      <p className="phone">{tenant.phone}</p>
      <p className="property">{tenant.property}</p>
      <span className={`status-badge status-${tenant.status}`}>
        {tenant.status === 'active' ? 'Active' : 'Expired'}
      </span>
    </div>
  );
};

export interface TenantControlsProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  statusFilter: 'all' | 'active' | 'expired';
  onStatusFilterChange: (status: 'all' | 'active' | 'expired') => void;
}

export const TenantControls: FC<TenantControlsProps> = ({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
}) => {
  return (
    <div className="tab-controls">
      <div className="search-box">
        <input
          type="text"
          placeholder="Search by name, email, or property..."
          value={searchQuery}
          onChange={e => onSearchChange(e.target.value)}
          data-testid="tenant-search"
        />
      </div>

      <div className="filter-controls">
        <label>Filter by status:</label>
        <select
          value={statusFilter}
          onChange={e => onStatusFilterChange(e.target.value as 'all' | 'active' | 'expired')}
          data-testid="status-filter"
        >
          <option value="all">All Tenants</option>
          <option value="active">Active Leases</option>
          <option value="expired">Expired Leases</option>
        </select>
      </div>
    </div>
  );
};
