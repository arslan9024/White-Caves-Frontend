/**
 * CRM API Service — Centralized API calls for all CRM features
 */
import { authFetch, extractApiError } from '../utils/authFetch';
import { API, parseResponse, buildQuery } from './crmServiceHelpers';

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
