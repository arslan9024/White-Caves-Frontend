/**
 * AEGIS Engineering Velocity & Backlog Burndown Reporter (Point 92).
 */
export function computeWaveVelocity(completedPoints: number, totalPoints = 99) {
  const pct = Number(((completedPoints / totalPoints) * 100).toFixed(1));
  return {
    completedPoints,
    remainingPoints: Math.max(0, totalPoints - completedPoints),
    completionPct: pct,
  };
}
