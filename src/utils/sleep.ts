// Utility to pause execution for a given number of milliseconds.
// Used for campaign jitter and rate‑limiting.
export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}
