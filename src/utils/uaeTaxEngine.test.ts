import { describe, it, expect } from 'vitest';
import { calculateUaeTaxSummary } from './uaeTaxEngine';

describe('uaeTaxEngine (5% VAT + 9% Corporate Tax)', () => {
  it('applies 0% corporate tax below AED 375,000 net profit', () => {
    const res = calculateUaeTaxSummary(500_000, 200_000);
    expect(res.vatPayableAed).toBe(25_000);
    expect(res.netProfitAed).toBe(300_000);
    expect(res.taxableCorporateProfitAed).toBe(0);
    expect(res.corporateTaxReserveAed).toBe(0);
  });

  it('applies 9% corporate tax only on profit above AED 375,000', () => {
    const res = calculateUaeTaxSummary(1_000_000, 225_000);
    expect(res.vatPayableAed).toBe(50_000);
    expect(res.netProfitAed).toBe(775_000);
    expect(res.taxableCorporateProfitAed).toBe(400_000);
    expect(res.corporateTaxReserveAed).toBe(36_000);
  });
});
