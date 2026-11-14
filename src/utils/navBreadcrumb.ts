/**
 * Hierarchical Tree-State Navigation & Leaf-Return helper (Point 36 / TURING-NAV-TREE-009).
 */
export function formatBreadcrumbPath(segments: string[]): string {
  return segments
    .map(s => s.trim())
    .filter(Boolean)
    .join(' > ');
}

export function returnToParentPath(segments: string[]): string[] {
  return segments.length > 1 ? segments.slice(0, -1) : segments;
}
