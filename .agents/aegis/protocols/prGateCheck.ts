/**
 * Objective PR Review Checklist Gate (Point 94 / AEG-042).
 */
export function evaluatePrGate(checks: {
  tscPassed: boolean;
  testsPassed: boolean;
  maxFileLines: number;
}): { passed: boolean; failures: string[] } {
  const failures: string[] = [];
  if (!checks.tscPassed) failures.push('TypeScript check failed');
  if (!checks.testsPassed) failures.push('Tests failed');
  if (checks.maxFileLines > 350) failures.push('File exceeds 350-line limit');
  return { passed: failures.length === 0, failures };
}
