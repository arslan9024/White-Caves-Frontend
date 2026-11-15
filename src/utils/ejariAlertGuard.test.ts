import { describe, it, expect } from 'vitest';
import { getEjariAlertTier } from './ejariAlertGuard';

describe('ejariAlertGuard (AEG-027)', () => {
  it('classifies 90/60/30-day Ejari renewal alert tiers', () => {
    expect(getEjariAlertTier(120)).toBe('ok');
    expect(getEjariAlertTier(90)).toBe('90d');
    expect(getEjariAlertTier(60)).toBe('60d');
    expect(getEjariAlertTier(30)).toBe('30d');
    expect(getEjariAlertTier(0)).toBe('expired');
    expect(getEjariAlertTier(-5)).toBe('expired');
  });
});
