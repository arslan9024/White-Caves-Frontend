/**
 * CRM API Service — Centralized API calls for all CRM features
 */
import { authFetch, extractApiError } from '../utils/authFetch';

const API = '/api';

interface DashboardSummaryMetrics {
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

interface DashboardSummaryPayload {
  metrics?: DashboardSummaryMetrics;
  recentActivities?: unknown[];
  [key: string]: unknown;
}

interface DashboardSummaryNormalized extends DashboardSummaryMetrics {
  metrics: DashboardSummaryMetrics;
  recentActivities: unknown[];
}

interface DashboardKpisPayload {
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

interface DashboardKpisNormalized {
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

interface DashboardExecutivePayload {
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

interface DashboardExecutiveNormalized extends DashboardExecutivePayload {
  leadsBySource: Record<string, number>;
  propertyByStatus: Record<string, number>;
  commissionSummary: {
    total: number;
    pending: number;
    paid: number;
  };
}

// Helper to parse JSON response
async function parseResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const body = await res.json().catch(() => ({ message: res.statusText }));
    throw new Error(body.message || body.error || `Request failed (${res.status})`);
  }
  const json = await res.json();
  return json.data ?? json;
}

// Helper to build query string from params
function buildQuery(params?: Record<string, string>): string {
  if (!params || Object.keys(params).length === 0) return '';
  const qs = new URLSearchParams(params).toString();
  return qs ? `?${qs}` : '';
}

function normalizeDashboardSummary(payload: DashboardSummaryPayload): DashboardSummaryNormalized {
  const metrics = payload.metrics ?? {};
  return {
    ...metrics,
    metrics,
    recentActivities: Array.isArray(payload.recentActivities) ? payload.recentActivities : [],
  };
}

function normalizeDashboardKpis(payload: DashboardKpisPayload): DashboardKpisNormalized {
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

function normalizeDashboardExecutive(
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

// ─── Commissions ────────────────────────────────────────────────────────

export async function fetchCommissions(params?: Record<string, string>) {
  const res = await authFetch(`${API}/finance/commissions${buildQuery(params)}`);
  return parseResponse<unknown[]>(res);
}

export async function fetchCommission(id: string) {
  const res = await authFetch(`${API}/finance/commissions/${id}`);
  return parseResponse<Record<string, unknown>>(res);
}

export async function createCommission(data: Record<string, unknown>) {
  const res = await authFetch(`${API}/finance/commissions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return parseResponse<Record<string, unknown>>(res);
}

export async function updateCommission(id: string, data: Record<string, unknown>) {
  const res = await authFetch(`${API}/finance/commissions/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return parseResponse<Record<string, unknown>>(res);
}

// ─── Transactions ───────────────────────────────────────────────────────

export async function fetchTransactions(params?: Record<string, string>) {
  const res = await authFetch(`${API}/transactions${buildQuery(params)}`);
  return parseResponse<unknown[]>(res);
}

export async function fetchTransaction(id: string) {
  const res = await authFetch(`${API}/transactions/${id}`);
  return parseResponse<Record<string, unknown>>(res);
}

export async function createTransaction(data: Record<string, unknown>) {
  const res = await authFetch(`${API}/transactions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return parseResponse<Record<string, unknown>>(res);
}

export async function updateTransaction(id: string, data: Record<string, unknown>) {
  const res = await authFetch(`${API}/transactions/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return parseResponse<Record<string, unknown>>(res);
}

export async function deleteTransaction(id: string) {
  const res = await authFetch(`${API}/transactions/${id}`, { method: 'DELETE' });
  if (!res.ok) {
    throw new Error(await extractApiError(res, 'Failed to delete transaction'));
  }
  return id;
}

// ─── Clients ────────────────────────────────────────────────────────────

export * from './crmExtendedService';
