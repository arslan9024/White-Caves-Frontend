/**
 * LandlordTenantsTab — Phase 29: Live API integration
 *
 * Tenant list derived from active leases.
 * Tenant details modal shows per-tenant PDC schedule (payments) and maintenance.
 *
 * @component
 */

import React, { FC, useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../../../store/store';
import '../../../pages/RolePages.css';

import {
  type TenantData,
  type TenantStatusFilter,
  TenantDetailModal,
  TenantCard,
  TenantControls,
  mapLeasesToTenants,
  filterTenants,
  useLandlordTenants,
} from './tenants';

// Re-export companion symbols to preserve full backwards-compatibility
export * from './tenants';

const LandlordTenantsTab: FC = () => {
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const [selectedTenant, setSelectedTenant] = useState<TenantData | null>(null);
  const [statusFilter, setStatusFilter] = useState<TenantStatusFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const { leases, loading, error } = useLandlordTenants(Boolean(currentUser));

  const tenants: TenantData[] = useMemo(() => mapLeasesToTenants(leases), [leases]);

  const filteredTenants = useMemo(
    () => filterTenants(tenants, statusFilter, searchQuery),
    [tenants, statusFilter, searchQuery]
  );

  if (!currentUser) {
    return (
      <div className="empty-state">
        <p>You must be logged in to view your tenants.</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="empty-state" data-testid="tenants-loading">
        <p>⏳ Loading your tenants…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="empty-state" data-testid="tenants-error">
        <p>⚠️ {error}</p>
        <button className="btn-secondary" onClick={() => window.location.reload()}>
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="landlord-tenants-tab">
      <div className="tab-header">
        <h3>Manage Tenants</h3>
        <p>View all current and past tenants across your properties</p>
      </div>

      <TenantControls
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
      />

      {filteredTenants.length === 0 ? (
        <div className="empty-state" data-testid="empty-state">
          <p>{searchQuery ? 'No tenants match your search.' : 'No tenants found.'}</p>
        </div>
      ) : (
        <div className="tenants-list">
          {filteredTenants.map(tenant => (
            <TenantCard
              key={`${tenant.id}-${tenant.leaseId}`}
              tenant={tenant}
              onSelect={setSelectedTenant}
            />
          ))}
        </div>
      )}

      {selectedTenant && (
        <TenantDetailModal tenant={selectedTenant} onClose={() => setSelectedTenant(null)} />
      )}
    </div>
  );
};

export default LandlordTenantsTab;
