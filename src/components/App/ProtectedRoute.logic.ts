import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useAppSelector } from '../../store/store';
import { selectSessionUser } from '../../store/selectors/sessionSelectors';
import { safeStorage } from '../../utils/safeStorage';
import { getCurrentPathWithQuery } from '../../utils/authSession';
import { normalizeRoleForUserContext } from '../../utils/superUserAccess';
import type { RouteDecision, UserRoleData } from './App.config';
import { getRoleLandingPath, resolveEffectiveRole } from './App.access.logic';

export function useProtectedRoute(allowedRoles?: string[]): RouteDecision {
  const location = useLocation();
  const user = useAppSelector(selectSessionUser);
  const isAuthLoading = useAppSelector(state => state.user.isLoading);
  const [userData, setUserData] = useState<Pick<UserRoleData, 'role' | 'status'> | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const hasLocalToken = !!safeStorage.get('token');

  useEffect(() => {
    if (isAuthLoading) return;
    if (!user && !hasLocalToken) {
      setUserData(null);
      setIsLoading(false);
      return;
    }
    if (!user && hasLocalToken) {
      // If auth check finished and user is still null even with a token,
      // the token is invalid/unauthorized or server is down. Stop spinner.
      setIsLoading(false);
      return;
    }
    const stored = safeStorage.getJSON<UserRoleData>('userRole');
    const effectiveRole = resolveEffectiveRole(user, stored);
    if (stored && typeof stored.role === 'string' && effectiveRole) {
      setUserData({ ...stored, role: effectiveRole });
    } else {
      setUserData(effectiveRole ? { role: effectiveRole } : null);
    }
    setIsLoading(false);
  }, [user, isAuthLoading, hasLocalToken]);

  if (isLoading || isAuthLoading) return { kind: 'loading' };
  if (!user) {
    return {
      kind: 'redirect',
      to: '/signin',
      from: getCurrentPathWithQuery(location.pathname, location.search, location.hash),
    };
  }
  if (!userData) return { kind: 'redirect', to: '/select-role' };
  if (userData.status === 'pending') return { kind: 'redirect', to: '/pending-approval' };
  if (allowedRoles) {
    const role = normalizeRoleForUserContext(userData.role, user?.email);
    const normalizedAllowedRoles = new Set(
      allowedRoles
        .map(value => normalizeRoleForUserContext(value, user?.email))
        .filter((value): value is string => Boolean(value))
    );
    if (!role || !normalizedAllowedRoles.has(role)) {
      return { kind: 'redirect', to: getRoleLandingPath(userData.role, user?.email) };
    }
  }
  return { kind: 'allow' };
}
