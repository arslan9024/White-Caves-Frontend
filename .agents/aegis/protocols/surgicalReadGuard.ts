/**
 * Surgical line-range read guard (Point 93 / TURING-LAW-000).
 */
export function isSurgicalReadRange(startLine: number, endLine: number, maxLines = 150): boolean {
  return startLine >= 1 && endLine >= startLine && endLine - startLine + 1 <= maxLines;
}
