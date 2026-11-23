/**
 * Filter Dashboard Data Helper
 * =============================
 * Handles role-based slicing and filtering of dashboard CRM data.
 */

import type { CRMEntity, DashboardData } from './types';

interface FilterParams {
  dashboardData: DashboardData;
  isSuperUser: boolean;
  currentRole: string;
  user: { id: string; name?: string; email: string; role?: string; [key: string]: unknown } | null;
}

export function filterDashboardDataByRole({
  dashboardData,
  isSuperUser,
  currentRole,
  user,
}: FilterParams): DashboardData {
  if (isSuperUser) {
    return dashboardData;
  }

  if (!dashboardData) return dashboardData;

  const filtered = { ...dashboardData };

  switch (currentRole) {
    case 'landlord':
      filtered.properties = (dashboardData.properties ?? []).filter(p => p.ownerId === user?.id);
      filtered.tenants = (dashboardData.tenants ?? []).filter(t => t.landlordId === user?.id);
      filtered.agents = (dashboardData.agents ?? []).filter(
        a => a.id === (user as CRMEntity)?.assignedAgentId
      );
      filtered.leases = (dashboardData.leases ?? []).filter(l => l.landlordId === user?.id);
      filtered.payments = (dashboardData.payments ?? []).filter(p => p.landlordId === user?.id);
      break;

    case 'tenant':
      filtered.myRental = (dashboardData.myRental ?? []).filter(r => r.tenantId === user?.id);
      filtered.payments = (dashboardData.payments ?? []).filter(p => p.tenantId === user?.id);
      filtered.maintenanceRequests = (dashboardData.maintenanceRequests ?? []).filter(
        m => m.tenantId === user?.id
      );
      filtered.leaseInfo = (dashboardData.leaseInfo ?? []).filter(l => l.tenantId === user?.id);
      break;

    case 'leasing-agent':
      filtered.properties = (dashboardData.properties ?? []).filter(
        p => p.managingAgentId === user?.id
      );
      filtered.tenants = (dashboardData.tenants ?? []).filter(t => t.agentId === user?.id);
      filtered.contracts = (dashboardData.contracts ?? []).filter(c => c.agentId === user?.id);
      filtered.applications = (dashboardData.applications ?? []).filter(
        a => a.agentId === user?.id
      );
      break;

    case 'secondary-sales-agent':
      filtered.properties = (dashboardData.properties ?? []).filter(p => p.agentId === user?.id);
      filtered.leads = (dashboardData.leads ?? []).filter(l => l.agentId === user?.id);
      filtered.contracts = (dashboardData.contracts ?? []).filter(c => c.agentId === user?.id);
      break;

    case 'buyer':
      filtered.savedProperties = (dashboardData.savedProperties ?? []).filter(
        p => p.userId === user?.id
      );
      filtered.searchHistory = (dashboardData.searchHistory ?? []).filter(
        s => s.userId === user?.id
      );
      filtered.offers = (dashboardData.offers ?? []).filter(o => o.buyerId === user?.id);
      filtered.applications = (dashboardData.applications ?? []).filter(
        a => a.buyerId === user?.id
      );
      break;

    case 'seller':
      filtered.properties = (dashboardData.properties ?? []).filter(p => p.sellerId === user?.id);
      filtered.offers = (dashboardData.offers ?? []).filter(o => {
        const propertyBelongsToSeller = (dashboardData.properties ?? []).some(
          p => p.id === o.propertyId && p.sellerId === user?.id
        );
        return propertyBelongsToSeller;
      });
      filtered.sales = (dashboardData.sales ?? []).filter(s => s.sellerId === user?.id);
      break;

    default:
      filtered.properties = [];
      filtered.leads = [];
      break;
  }

  return filtered;
}
