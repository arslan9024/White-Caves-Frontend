/**
 * Sovereign autopilot rollback checkpoint metadata (Point 98).
 */
export function createRollbackCheckpoint(waveId: string, gitSha: string) {
  return {
    waveId: waveId.trim(),
    gitSha: gitSha.trim(),
    createdAtIso: new Date().toISOString(),
  };
}
