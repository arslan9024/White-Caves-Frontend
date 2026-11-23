/**
 * Types and interfaces for LandlordTenantsTab.
 */

export interface ApiLease {
  id: string;
  propertyId: string;
  tenantId: string;
  monthlyRent: number;
  depositAmount: number;
  startDate: string;
  endDate: string;
  status: string;
  ejariNumber?: string | null;
  nextPaymentDue?: string | null;
  tenant: { id: string; name: string; email: string; phone: string } | null;
  property: { id: string; title: string; location: string; type: string } | null;
}

export interface ApiPdc {
  id: string;
  chequeNumber?: string | null;
  amount: number;
  dueDate: string;
  status: string; // pending | cleared | bounced | cancelled
}

export interface ApiMaintenance {
  id: string;
  title: string;
  priority: string;
  status: string;
  createdAt: string;
  property: { id: string; title: string } | null;
}

export interface TenantData {
  id: string;
  leaseId: string;
  name: string;
  email: string;
  phone: string;
  property: string;
  propertyId: string;
  leaseStart: string;
  leaseEnd: string;
  status: 'active' | 'expired';
  unitNumber?: string;
  rentAmount: number;
}

export type DetailTab = 'info' | 'payments' | 'maintenance';
export type TenantStatusFilter = 'all' | 'active' | 'expired';
