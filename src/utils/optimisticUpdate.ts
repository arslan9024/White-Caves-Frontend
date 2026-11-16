/**
 * Optimistic update with rollback helper (Point 42).
 */
export async function withOptimisticUpdate<T>(
  current: T,
  optimistic: T,
  apply: (state: T) => void,
  commit: () => Promise<void>
): Promise<boolean> {
  apply(optimistic);
  try {
    await commit();
    return true;
  } catch {
    apply(current);
    return false;
  }
}

