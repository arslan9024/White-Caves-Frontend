import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  dispatchLindaTakeover,
  syncHenryMeritAndCommission,
  buildHenryReraPreFill,
} from './titaniumBridge';
import * as authFetchModule from './authFetch';

describe('titaniumBridge (Cross-Repo Real-Time Telemetry)', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('dispatches Linda takeover with pauseVardonBot=true', async () => {
    const spy = vi
      .spyOn(authFetchModule, 'authFetch')
      .mockResolvedValue(new Response(JSON.stringify({ ok: true }), { status: 200 }));

    const result = await dispatchLindaTakeover('conv-42', '+971505760056', 'Hello from Zoe');
    expect(result.ok).toBe(true);
    expect(spy).toHaveBeenCalledWith(
      '/api/linda/send/conv-42',
      expect.objectContaining({ method: 'POST' })
    );
  });

  it('syncs +500 XP statutory gate and computes 60%->70% commission split', async () => {
    vi.spyOn(authFetchModule, 'authFetch').mockResolvedValue(
      new Response(JSON.stringify({ ok: true }), { status: 200 })
    );

    const res = await syncHenryMeritAndCommission('rec-1', 'EMIRATES_ID', 4500, 100000);
    expect(res.ok).toBe(true);
    expect(res.newXp).toBe(5000);
    expect(res.commission.splitPercent).toBe(65);
    expect(res.commission.brokerShare).toBe(65000);
  });

  it('builds Form A for seller and Form B for buyer HOT_LEADs', () => {
    const sellerForm = buildHenryReraPreFill({
      conversationId: 'c1',
      phone: '+971500000001',
      role: 'seller',
      unit: 'Villa 348',
      project: 'Palm Jumeirah',
    });
    expect(sellerForm.formType).toBe('FORM_A');

    const buyerForm = buildHenryReraPreFill({
      conversationId: 'c2',
      phone: '+971500000002',
      role: 'buyer',
      unit: 'Apt 1205',
      project: 'Marina Gate',
    });
    expect(buyerForm.formType).toBe('FORM_B');
  });
});
