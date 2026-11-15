/**
 * Deterministic dead-code unused-export detector helper (Point 89).
 */
export function findUnusedExports(
  exportedSymbols: string[],
  referencedSymbols: Set<string>
): string[] {
  return exportedSymbols.filter(sym => !referencedSymbols.has(sym));
}
