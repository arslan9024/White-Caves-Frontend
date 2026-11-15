/**
 * AEGIS Token Budget Guard (Point 97 / TURING-SHELL-015).
 * Enforces <= 8,000 input tokens per /aegis-task.
 */
export const AEGIS_TASK_TOKEN_BUDGET = 8_000;

export function checkTaskTokenBudget(usedTokens: number): {
  withinBudget: boolean;
  remainingTokens: number;
} {
  const remainingTokens = AEGIS_TASK_TOKEN_BUDGET - usedTokens;
  return { withinBudget: remainingTokens >= 0, remainingTokens };
}
