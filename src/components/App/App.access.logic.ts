import {
  isCreatorSuperUserEmail,
  normalizeRoleForUserContext,
  CANONICAL_SUPERUSER_ROLE,
  isSuperUserAliasRole,
} from '../../utils/superUserAccess';
import { UserRoleData } from './App.config';
export function resolveEffectiveRole(
  user: { role?: string; email?: string } | null,
  storedRoleData: UserRoleData | null
): string | null {
  if (isCreatorSuperUserEmail(user?.email)) return CANONICAL_SUPERUSER_ROLE;

  const serverRole = normalizeRoleForUserContext(user?.role, user?.email);
  const storedRole = normalizeRoleForUserContext(storedRoleData?.role, user?.email);

  if (storedRoleData && typeof storedRoleData.role === 'string') {
    return serverRole ?? storedRole;
  }

  return serverRole;
}
export function getRoleLandingPath(role: string | null | undefined, email?: string): string {
  const normalizedRole = normalizeRoleForUserContext(role, email);

  // TURING-LAW-044: MD/Super Admin → sovereign command center
  if (
    normalizedRole === CANONICAL_SUPERUSER_ROLE ||
    normalizedRole === 'managing_director' ||
    isSuperUserAliasRole(normalizedRole)
  ) {
    return '/md/command-center';
  }

  if (normalizedRole === 'landlord' || normalizedRole === 'property-owner') {
    return '/landlord-portal';
  }

  if (normalizedRole === 'tenant') {
    return '/tenant-portal';
  }

  return '/crm';
}
