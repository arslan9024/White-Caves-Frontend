/**
 * AEGIS V5.0 Gov API & UAE Statutory Compliance Guard
 * - AEG-011: 1500ms hard timeout on DLD, Ejari, and Trakheesi APIs
 * - AEG-012: Idempotency-Key enforcement on mutating gov requests
 * - AEG-017: Unit door number masking
 * - AEG-028: UAE 5% FTA VAT & 9% Corporate Tax reserve calculation
 */

import { authFetch } from './authFetch';

export const GOV_API_TIMEOUT_MS = 1500;

export interface GovFetchOptions extends RequestInit {
  idempotencyKey?: string;
  timeoutMs?: number;
}

/**
 * Generates a deterministic or random idempotency key for DLD/Ejari/Trakheesi mutations.
 */
export function createIdempotencyKey(
  namespace: 'dld' | 'ejari' | 'trakheesi',
  seed?: string
): string {
  if (seed) return `${namespace}-${seed}`;
  const random =
    typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function'
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
  return `${namespace}-${random}`;
}

/**
 * Wraps `authFetch` with a strict 1500ms AbortController timeout and Idempotency-Key header.
 */
export async function govApiFetch(
  input: RequestInfo | URL,
  options: GovFetchOptions = {}
): Promise<Response> {
  const { idempotencyKey, timeoutMs = GOV_API_TIMEOUT_MS, headers: rawHeaders, ...rest } = options;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  const headers = new Headers(rawHeaders);
  const method = (rest.method ?? 'GET').toUpperCase();
  if (!['GET', 'HEAD', 'OPTIONS'].includes(method) && !headers.has('Idempotency-Key')) {
    headers.set('Idempotency-Key', idempotencyKey ?? createIdempotencyKey('dld'));
  }

  try {
    return await authFetch(input, {
      ...rest,
      headers,
      signal: rest.signal ?? controller.signal,
    });
  } finally {
    clearTimeout(timer);
  }
}

/**
 * AEG-017: Masks unit door numbers in public/non-privileged views (e.g., "Villa 348" -> "Villa ***8").
 */
export function maskUnitDoorNumber(unit: string): string {
  const trimmed = unit.trim();
  if (!trimmed) return '***';
  return trimmed.replace(/\d+(?=\d$)/g, match => '*'.repeat(match.length));
}

export interface UaeTaxReserves {
  grossAmount: number;
  vat5Percent: number;
  corporateTax9Percent: number;
  netAfterReserves: number;
}

/**
 * AEG-028: Calculates UAE 5% FTA VAT and 9% Corporate Tax reserves.
 */
export function calculateUaeTaxReserves(grossAmount: number): UaeTaxReserves {
  const safeGross = Number.isFinite(grossAmount) && grossAmount > 0 ? grossAmount : 0;
  const vat5Percent = Number((safeGross * 0.05).toFixed(2));
  const corporateTax9Percent = Number((safeGross * 0.09).toFixed(2));
  const netAfterReserves = Number((safeGross - vat5Percent - corporateTax9Percent).toFixed(2));
  return {
    grossAmount: safeGross,
    vat5Percent,
    corporateTax9Percent,
    netAfterReserves,
  };
}

