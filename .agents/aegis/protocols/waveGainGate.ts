/**
 * Perpetual Ouroboros >= 5% wave velocity gain gate (Point 99).
 */
export function meetsWaveGainTarget(
  previousScore: number,
  currentScore: number,
  minGainPct = 5
): boolean {
  if (previousScore <= 0) return currentScore > 0;
  const gainPct = ((currentScore - previousScore) / previousScore) * 100;
  return gainPct >= minGainPct;
}
