/**
 * Shared CRM API Service Helpers & Dashboard Normalizers
 */

export const API = '/api';

export interface DashboardSummaryMetrics {
  totalLeads?: number;
  hotLeads?: number;
  wonLeads?: number;
  conversionRate?: number;
  totalProperties?: number;
  availableProperties?: number;
  totalAgents?: number;
  totalCommissions?: number;
  totalCommissionValue?: number;
  paidCommissionValue?: number;
  pipelineValue?: number;
  [key: string]: unknown;
}

export interface DashboardSummaryPayload {
  metrics?: DashboardSummaryMetrics;
  recentActivities?: unknown[];
  [key: string]: unknown;
}

export interface DashboardSummaryNormalized extends DashboardSummaryMetrics {
  metrics: DashboardSummaryMetrics;
  recentActivities: unknown[];
}

export interface DashboardKpisPayload {
  period?: string;
  kpis?: {
    newLeads?: number;
    wonDeals?: number;
    newListings?: number;
    totalRevenue?: number;
    avgDealSize?: number;
    conversionRate?: number;
    [key: string]: unknown;
  };
  [key: string]: unknown;
}

export interface DashboardKpisNormalized {
  period?: string;
  newLeads: number;
  wonDeals: number;
  newListings: number;
  revenue: number;
  avgDealSize: number;
  conversionRate: number;
  kpis: {
    newLeads: number;
    wonDeals: number;
    newListings: number;
    totalRevenue: number;
    avgDealSize: number;
    conversionRate: number;
  };
  [key: string]: unknown;
}

export interface DashboardExecutivePayload {
  leads?: {
    byStatus?: Record<string, number>;
    bySource?: Record<string, number>;
  };
  properties?: {
    byStatus?: Record<string, number>;
    byType?: Record<string, number>;
  };
  commissions?: Array<{
    status?: string;
    count?: number;
    totalValue?: number;
    [key: string]: unknown;
  }>;
  portfolioValue?: number;
  [key: string]: unknown;
}

export interface DashboardExecutiveNormalized extends DashboardExecutivePayload {
  leadsBySource: Record<string, number>;
  propertyByStatus: Record<string, number>;
  commissionSummary: {
    total: number;
    pending: number;
    paid: number;
  };
}

export async function parseResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const body = await res.json().catch(() => ({ message: res.statusText }));
    throw new Error(body.message || body.error || `Request failed (${res.status})`);
  }
  const json = await res.json();
  return json.data ?? json;
}

export function buildQuery(params?: Record<string, string>): string {
  if (!params || Object.keys(params).length === 0) return '';
  const qs = new URLSearchParams(params).toString();
  return qs ? `?${qs}` : '';
}

export function normalizeDashboardSummary(
  payload: DashboardSummaryPayload
): DashboardSummaryNormalized {
  const metrics = payload.metrics ?? {};
  return {
    ...metrics,
    metrics,
    recentActivities: Array.isArray(payload.recentActivities) ? payload.recentActivities : [],
  };
}

export function normalizeDashboardKpis(payload: DashboardKpisPayload): DashboardKpisNormalized {
  const kpis = payload.kpis ?? {};
  const normalized = {
    newLeads: Number(kpis.newLeads ?? 0),
    wonDeals: Number(kpis.wonDeals ?? 0),
    newListings: Number(kpis.newListings ?? 0),
    totalRevenue: Number(kpis.totalRevenue ?? 0),
    avgDealSize: Number(kpis.avgDealSize ?? 0),
    conversionRate: Number(kpis.conversionRate ?? 0),
  };

  return {
    period: typeof payload.period === 'string' ? payload.period : undefined,
    newLeads: normalized.newLeads,
    wonDeals: normalized.wonDeals,
    newListings: normalized.newListings,
    revenue: normalized.totalRevenue,
    avgDealSize: normalized.avgDealSize,
    conversionRate: normalized.conversionRate,
    kpis: normalized,
  };
}

export function normalizeDashboardExecutive(
  payload: DashboardExecutivePayload
): DashboardExecutiveNormalized {
  const commissions = Array.isArray(payload.commissions) ? payload.commissions : [];

  const commissionSummary = commissions.reduce<{ total: number; pending: number; paid: number }>(
    (acc, item) => {
      const value = Number(item.totalValue ?? 0);
      const status = String(item.status ?? '').toLowerCase();

      acc.total += value;
      if (status === 'pending') acc.pending += value;
      if (status === 'paid') acc.paid += value;

      return acc;
    },
    { total: 0, pending: 0, paid: 0 }
  );

  return {
    leads: payload.leads,
    properties: payload.properties,
    commissions,
    portfolioValue: Number(payload.portfolioValue ?? 0),
    leadsBySource: payload.leads?.bySource ?? {},
    propertyByStatus: payload.properties?.byStatus ?? {},
    commissionSummary,
  };
}
