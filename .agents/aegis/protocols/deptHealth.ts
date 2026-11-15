/**
 * Zoe AI Command Center — Floors 1–13 Department Health Aggregator (Point 88).
 */
export function aggregateDepartmentHealth(scores: number[]): number {
  if (scores.length === 0) return 0;
  const sum = scores.reduce((acc, s) => acc + s, 0);
  return Number((sum / scores.length).toFixed(1));
}
