/**
 * Unified Dashboard Types & Constants
 * ===================================
 * Defines interfaces, types, and constants for the Unified Dashboard.
 */

/** A generic CRM entity (property, lead, tenant, agent, etc.) keyed by string fields */
export type CRMEntity = Record<string, unknown>;

export type AbortableDispatch = { abort?: () => void };

export interface DashboardData {
  properties: CRMEntity[];
  agents: CRMEntity[];
  leads: CRMEntity[];
  hotLeads: CRMEntity[];
  commissions: CRMEntity[];
  recentActivities: CRMEntity[];
  overview: CRMEntity | null;
  contracts: CRMEntity[];
  tenants: CRMEntity[];
  payments: CRMEntity[];
  leases: CRMEntity[];
  applications: CRMEntity[];
  savedProperties: CRMEntity[];
  searchHistory: CRMEntity[];
  offers: CRMEntity[];
  sales: CRMEntity[];
  myRental: CRMEntity[];
  maintenanceRequests: CRMEntity[];
  leaseInfo: CRMEntity[];
  [key: string]: unknown;
}

/** Standard props passed to every CRM module and dashboard tab */
export interface CRMModuleProps {
  role: string;
  user: { id: string; name?: string; email: string; role?: string; [key: string]: unknown } | null;
  data: DashboardData;
}

/** Stable empty array constant for placeholder data fields */
export const EMPTY_CRM_ARRAY: CRMEntity[] = [];

/**
 * Normalizes raw dashboard error strings into friendly user messages.
 */
export const normalizeDashboardError = (rawError: string | null): string | null => {
  if (!rawError) return null;

  const normalized = rawError.toLowerCase();
  const isDatabaseUnavailable =
    normalized.includes('p1001') ||
    normalized.includes("can't reach database server") ||
    normalized.includes('database server') ||
    normalized.includes('econnrefused');

  if (isDatabaseUnavailable) {
    return 'CRM is currently in limited mode while the database connection recovers. You can continue browsing and retry shortly.';
  }

  return rawError;
};
