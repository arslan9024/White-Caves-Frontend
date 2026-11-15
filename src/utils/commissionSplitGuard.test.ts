import { describe, it, expect } from 'vitest';
import { calculateCommissionSplit } from './commissionSplitGuard';

describe('commissionSplitGuard (AEG-038)', () => {
  it('clamps broker commission splits between 60% and 70%', () => {
    expect(calculateCommissionSplit(100000, 65)).toEqual({
      grossCommission: 100000,
      brokerShare: 65000,
      houseShare: 35000,
      splitPercent: 65,
    });
    expect(calculateCommissionSplit(100000, 50).splitPercent).toBe(60);
    expect(calculateCommissionSplit(100000, 85).splitPercent).toBe(70);
  });
});
