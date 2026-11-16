// AEGIS V5.0 — useSubdomainIngress Hook
// Compliant with TURING-LAW-000, AEG-042 (<350 lines), TURING-LAW-043, TURING-LAW-044

import { useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '../store/store';
import { selectSessionUser } from '../store/selectors/sessionSelectors';
import { resolveSubdomainIngress } from '../utils/subdomainIngressResolver';
import { isSuperUserAliasRole, normalizeRoleToken } from '../utils/superUserAccess';
import { createLogger } from '../utils/logger';

const log = createLogger('SubdomainIngress');

/**
 * TURING-LAW-044 (Need-to-Know) role validation map.
 * Maps subdomain expectedRole to the set of normalized user roles that are authorized.
 */
const ROLE_AUTHORIZATION_MAP: Record<string, (role: string) => boolean> = {
  tenant: (role: string) => role === 'tenant',
  landlord: (role: string) => role === 'landlord' || role === 'property-owner',
  superadmin: (role: string) => isSuperUserAliasRole(role),
};

/**
 * TURING-LAW-043: Intro Phase
 * Validates subdomain ingress environment is ready for routing.
 */
function onIngressIntro(): boolean {
  if (typeof window === 'undefined') return false;
  return true;
}

/**
 * TURING-LAW-043: Outro Phase
 * Logs final routing decision for audit trail.
 */
function onIngressOutro(action: string, target?: string): void {
  if (process.env.NODE_ENV !== 'production') {
    log.info(`Ingress resolution: ${action}${target ? ` → ${target}` : ''}`);
  }
}

/**
 * Auto-routes users to the correct portal based on the browser hostname.
 *
 * Enforcement rules (TURING-LAW-044 — Need-to-Know):
 * 1. If subdomain requires auth and user is not logged in → redirect to /signin
 * 2. If subdomain requires a specific role and user's role doesn't match → block
 * 3. If subdomain has a targetPath and user is authorized → navigate to it
 *
 * This hook is idempotent — it runs once per mount and guards against re-runs.
 */
export function useSubdomainIngress(): void {
  const navigate = useNavigate();
  const location = useLocation();
  const user = useAppSelector(selectSessionUser);
  const isAuthLoading = useAppSelector(state => state.user.isLoading);
  const hasResolved = useRef(false);

  useEffect(() => {
    if (!onIngressIntro()) return;
    if (isAuthLoading) return;
    if (hasResolved.current) return;

    const resolution = resolveSubdomainIngress();

    // Default subdomain (localhost, apex) — no auto-routing needed
    if (resolution.subdomain === 'default') {
      onIngressOutro('skip-default');
      return;
    }

    // Auth subdomain — always allow, no role check
    if (resolution.subdomain === 'auth') {
      if (resolution.targetPath && location.pathname === '/') {
        hasResolved.current = true;
        navigate(resolution.targetPath, { replace: true });
        onIngressOutro('auth-redirect', resolution.targetPath);
      }
      return;
    }

    // App subdomain (general CRM gateway) — requires auth but no specific role
    if (resolution.subdomain === 'app') {
      if (resolution.requiresAuth && !user) {
        hasResolved.current = true;
        const returnTo = encodeURIComponent(location.pathname + location.search);
        navigate(`/signin?redirect_uri=${returnTo}`, { replace: true });
        onIngressOutro('app-auth-required', '/signin');
      }
      // User is logged in at app.whitecaves.com — let normal routing handle it
      return;
    }

    // Portal subdomains (tenant, landlord, md) — require auth + role
    if (resolution.requiresAuth && !user) {
      hasResolved.current = true;
      const returnTo = encodeURIComponent(
        resolution.targetPath || location.pathname + location.search
      );
      navigate(`/signin?redirect_uri=${returnTo}`, { replace: true });
      onIngressOutro('portal-auth-required', '/signin');
      return;
    }

    // TURING-LAW-044: Role-based access control for portal subdomains
    if (resolution.expectedRole && user) {
      const userRole = normalizeRoleToken(user.role) || '';
      const isAuthorized = ROLE_AUTHORIZATION_MAP[resolution.expectedRole];

      if (isAuthorized && !isAuthorized(userRole)) {
        // User's role doesn't match this subdomain — redirect to their correct portal
        hasResolved.current = true;
        navigate('/dashboard', { replace: true });
        onIngressOutro('role-mismatch-redirect', '/dashboard');
        return;
      }
    }

    // Authorized user on a portal subdomain — navigate to portal target
    if (resolution.targetPath && location.pathname === '/') {
      hasResolved.current = true;
      navigate(resolution.targetPath, { replace: true });
      onIngressOutro('portal-redirect', resolution.targetPath);
    }
  }, [isAuthLoading, user, navigate, location.pathname, location.search]);
}
