/**
 * AEGIS V5.0 LCP & Non-Blocking Telemetry Guard (AEG-040)
 */

export const LCP_BUDGET_MS = 1200;

export interface LcpCheckResult {
  lcpMs: number;
  withinBudget: boolean;
  budgetMs: number;
}

export function evaluateLcpBudget(lcpMs: number, budgetMs = LCP_BUDGET_MS): LcpCheckResult {
  const safeLcp = Number.isFinite(lcpMs) && lcpMs >= 0 ? lcpMs : 0;
  return {
    lcpMs: safeLcp,
    withinBudget: safeLcp <= budgetMs,
    budgetMs,
  };
}
