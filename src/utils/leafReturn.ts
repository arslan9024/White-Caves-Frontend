/**
 * Leaf-task completion parent-return helper (Point 45 / TURING-NAV-TREE-009).
 */
export async function completeLeafAndReturn<T>(
  saveTask: () => Promise<T>,
  returnToParent: () => void
): Promise<T> {
  const result = await saveTask();
  returnToParent();
  return result;
}

