/**
 * Dynamic chart Suspense fallback dimensions helper (Point 53).
 */
export function getChartFallbackBox(heightPx = 280) {
  return { height: `${heightPx}px`, width: '100%', role: 'status', 'aria-busy': true as const };
}

