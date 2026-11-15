/**
 * AEGIS V5.0 Level 5 RBAC Guard (AEG-003)
 */

export type RbacLevel = 1 | 2 | 3 | 4 | 5;

export function hasRequiredRbacLevel(
  userLevel: number | undefined | null,
  requiredLevel: RbacLevel
): boolean {
  if (typeof userLevel !== 'number' || !Number.isFinite(userLevel)) {
    return false;
  }
  return userLevel >= requiredLevel;
}
