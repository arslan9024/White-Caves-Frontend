/**
 * Level 5 RBAC permission evaluator (Point 49 / AEG-003).
 */
export type RbacLevel = 1 | 2 | 3 | 4 | 5;

export function hasRbacAccess(userLevel: RbacLevel, requiredLevel: RbacLevel): boolean {
  return userLevel >= requiredLevel;
}
