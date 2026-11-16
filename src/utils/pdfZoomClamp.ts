/**
 * Tenancy Agreement PDF pinch-to-zoom scale clamp (Point 50).
 */
export function clampPdfZoom(scale: number, min = 0.5, max = 3.0): number {
  return Number(Math.min(max, Math.max(min, scale)).toFixed(2));
}

