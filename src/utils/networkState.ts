/**
 * Skeleton loading & slow-network state helper (Point 47).
 */
export function shouldShowSkeleton(isLoading: boolean, hasData: boolean): boolean {
  return isLoading && !hasData;
}
