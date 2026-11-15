/**
 * Virtualized list window calculator for LindaChatListPane (Point 40).
 */
export function computeVirtualWindow(
  scrollTop: number,
  viewportHeight: number,
  itemHeight: number,
  totalItems: number,
  overscan = 3
): { startIndex: number; endIndex: number } {
  const start = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan);
  const visibleCount = Math.ceil(viewportHeight / itemHeight);
  const end = Math.min(totalItems - 1, start + visibleCount + overscan * 2);
  return { startIndex: start, endIndex: Math.max(start, end) };
}
