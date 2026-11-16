import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  GOV_API_TIMEOUT_MS,
  createIdempotencyKey,
  govApiFetch,
  maskUnitDoorNumber,
  calculateUaeTaxReserves,
} from './govApiGuard';
import * as authFetchModule from './authFetch';

describe('govApiGuard (AEG-011, AEG-012, AEG-017, AEG-028)', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('enforces 1500ms default timeout constant', () => {
    expect(GOV_API_TIMEOUT_MS).toBe(1500);
  });

  it('attaches Idempotency-Key on mutating govApiFetch calls', async () => {
    const spy = vi
      .spyOn(authFetchModule, 'authFetch')
      .mockResolvedValue(new Response(JSON.stringify({ ok: true }), { status: 200 }));

    await govApiFetch('/api/dld/verify', {
      method: 'POST',
      idempotencyKey: 'dld-test-123',
    });

    expect(spy).toHaveBeenCalledTimes(1);
    const [, init] = spy.mock.calls[0];
    const headers = new Headers(init?.headers);
    expect(headers.get('Idempotency-Key')).toBe('dld-test-123');
    expect(init?.signal).toBeDefined();
  });

  it('creates deterministic idempotency keys when seed is provided', () => {
    expect(createIdempotencyKey('ejari', 'contract-99')).toBe('ejari-contract-99');
    expect(createIdempotencyKey('trakheesi').startsWith('trakheesi-')).toBe(true);
  });

  it('masks unit door numbers per AEG-017', () => {
    expect(maskUnitDoorNumber('Villa 348')).toBe('Villa **8');
    expect(maskUnitDoorNumber('Apt 1205')).toBe('Apt ***5');
    expect(maskUnitDoorNumber('')).toBe('***');
  });

  it('calculates UAE 5% FTA VAT and 9% Corporate Tax reserves per AEG-028', () => {
    const res = calculateUaeTaxReserves(100000);
    expect(res.vat5Percent).toBe(5000);
    expect(res.corporateTax9Percent).toBe(9000);
    expect(res.netAfterReserves).toBe(86000);
  });
});

