import type { ApiLease, TenantData } from './types';

/** Map leases → TenantData view models */
export function mapLeasesToTenants(leases: ApiLease[]): TenantData[] {
  return leases.map(lease => ({
    id: lease.tenantId,
    leaseId: lease.id,
    name: lease.tenant?.name ?? 'Unknown Tenant',
    email: lease.tenant?.email ?? '',
    phone: lease.tenant?.phone ?? '',
    property: lease.property?.title ?? 'Unknown Property',
    propertyId: lease.propertyId,
    leaseStart: new Date(lease.startDate).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }),
    leaseEnd: new Date(lease.endDate).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }),
    status: lease.status === 'active' || lease.status === 'expiring' ? 'active' : 'expired',
    unitNumber:
      lease.tenantId === 'tenant-1'
        ? 'ART-1205'
        : lease.tenantId === 'tenant-2'
          ? 'DST-0907'
          : lease.tenantId === 'tenant-3'
            ? 'ART-2210'
            : lease.tenantId === 'tenant-4'
              ? 'BB-1402'
              : undefined,
    rentAmount: lease.monthlyRent,
  }));
}

export function filterTenants(
  tenants: TenantData[],
  statusFilter: 'all' | 'active' | 'expired',
  searchQuery: string
): TenantData[] {
  return tenants.filter(tenant => {
    const matchesStatus = statusFilter === 'all' || tenant.status === statusFilter;
    const normalizedSearch = searchQuery.toLowerCase();
    const matchesSearch =
      searchQuery === '' ||
      tenant.name.toLowerCase().includes(normalizedSearch) ||
      tenant.email.toLowerCase().includes(normalizedSearch) ||
      tenant.property.toLowerCase().includes(normalizedSearch);
    return matchesStatus && matchesSearch;
  });
}
