import {
  ROLES,
  ROLE_HIERARCHY,
  OWNER_EXCLUSIVE_FEATURES,
  ROLE_ALIAS_MAP,
  RANK_1_ROLES,
  RANK_2_ROLES,
  RANK_3_ROLES,
} from './permissions.constants';
import { ROLE_PERMISSIONS } from './permissions.matrix';

/** Resolve any role string (frontend UI or canonical) to the canonical backend key. */
export function resolveBackendRole(role: string): string {
  // eslint-disable-next-line security/detect-object-injection
  return ROLE_ALIAS_MAP[role] ?? role;
}

export function getRank(role: string | null): number {
  if (!role) return 0;
  const resolved = resolveBackendRole(role);
  if ((RANK_2_ROLES as string[]).includes(resolved)) return 2;
  if ((RANK_3_ROLES as string[]).includes(resolved)) return 3;
  if ((RANK_1_ROLES as string[]).includes(resolved)) return 1;
  return 0;
}

export function isStaff(role: string | null): boolean {
  return getRank(role) === 2;
}

export function isCustomer(role: string | null): boolean {
  return getRank(role) === 3;
}

export function isGeneralUser(role: string | null): boolean {
  return getRank(role) === 1;
}

export function hasPermission(userRole: string | null, permission: string): boolean {
  if (!userRole || !permission) return false;
  const resolved = resolveBackendRole(userRole);
  // eslint-disable-next-line security/detect-object-injection
  const rolePermissions = ROLE_PERMISSIONS[resolved] || [];
  return rolePermissions.includes(permission);
}

export function hasAnyPermission(userRole: string | null, permissions: string[]): boolean {
  if (!userRole || !permissions || permissions.length === 0) return false;
  return permissions.some(permission => hasPermission(userRole, permission));
}

export function hasAllPermissions(userRole: string | null, permissions: string[]): boolean {
  if (!userRole || !permissions || permissions.length === 0) return false;
  return permissions.every(permission => hasPermission(userRole, permission));
}

export function isOwner(userRole: string | null): boolean {
  if (!userRole) return false;
  return resolveBackendRole(userRole) === ROLES.OWNER;
}

export function isAgent(userRole: string | null): boolean {
  if (!userRole) return false;
  const resolved = resolveBackendRole(userRole);
  return (
    resolved === ROLES.AGENT ||
    resolved === ROLES.LEASING_AGENT ||
    resolved === ROLES.SALES_AGENT ||
    resolved === ROLES.LEASING_AGENT_CANONICAL ||
    resolved === ROLES.SALES_AGENT_CANONICAL
  );
}

export function isManager(userRole: string | null): boolean {
  if (!userRole) return false;
  const resolved = resolveBackendRole(userRole);
  return resolved === ROLES.OWNER || resolved === ROLES.MANAGER;
}

export function isAdmin(userRole: string | null): boolean {
  if (!userRole) return false;
  const resolved = resolveBackendRole(userRole);
  return resolved === ROLES.OWNER || resolved === ROLES.MANAGER || resolved === ROLES.ADMIN;
}

export function canAccessFeature(userRole: string | null, featureId: string): boolean {
  if (OWNER_EXCLUSIVE_FEATURES.includes(featureId)) {
    return isOwner(userRole);
  }
  return true;
}

export function getRoleLevel(userRole: string): number {
  const resolved = resolveBackendRole(userRole);
  // eslint-disable-next-line security/detect-object-injection
  return ROLE_HIERARCHY[resolved] || 0;
}

const EMPTY_PERMISSIONS: string[] = [];

export function getPermissionsForRole(role: string): string[] {
  // eslint-disable-next-line security/detect-object-injection
  return ROLE_PERMISSIONS[role] || EMPTY_PERMISSIONS;
}

