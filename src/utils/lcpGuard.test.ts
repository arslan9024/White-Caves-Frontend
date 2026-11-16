import { describe, it, expect } from 'vitest';
import { LCP_BUDGET_MS, evaluateLcpBudget } from './lcpGuard';

describe('lcpGuard (AEG-040)', () => {
  it('enforces 1200ms default LCP budget', () => {
    expect(LCP_BUDGET_MS).toBe(1200);
    expect(evaluateLcpBudget(850).withinBudget).toBe(true);
    expect(evaluateLcpBudget(1200).withinBudget).toBe(true);
    expect(evaluateLcpBudget(1450).withinBudget).toBe(false);
  });
});

