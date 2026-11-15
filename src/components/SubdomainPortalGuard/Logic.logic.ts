import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  getAuthorizedPortals,
  getPortalUrl,
  isRoleAuthorizedForPortal,
  PORTAL_REGISTRY,
  PREFERRED_PORTAL_STORAGE_KEY,
  resolveActivePortal,
  type PortalId,
} from '../../config/portalRegistry';
import type { SubdomainPortalGuardProps } from './Data.data';

export function useSubdomainPortalGuardLogic({
  isAuthenticated,
  userRoles,
  preferredPortal,
  onSetDefaultPortal,
}: Omit<SubdomainPortalGuardProps, 'children'>) {
  const [setAsDefault, setSetAsDefault] = useState(false);
  const activePortal = useMemo(() => resolveActivePortal(), []);
  const authorizedPortals = useMemo(() => getAuthorizedPortals(userRoles), [userRoles]);

  const isAuthorizedForActive = useMemo(() => {
    if (activePortal === 'gateway') return true;
    return isRoleAuthorizedForPortal(userRoles, activePortal);
  }, [activePortal, userRoles]);

  const navigateToPortal = useCallback(
    (portalId: PortalId) => {
      if (setAsDefault) {
        try {
          window.localStorage.setItem(PREFERRED_PORTAL_STORAGE_KEY, portalId);
        } catch {
          // ignore storage errors
        }
        onSetDefaultPortal?.(portalId);
      }
      window.location.assign(getPortalUrl(portalId));
    },
    [onSetDefaultPortal, setAsDefault]
  );

  // Auto-redirect logic for single-portal users or unauthorized subdomains
  useEffect(() => {
    if (!isAuthenticated) return;

    if (activePortal === 'gateway') {
      if (preferredPortal && isRoleAuthorizedForPortal(userRoles, preferredPortal)) {
        window.location.assign(getPortalUrl(preferredPortal));
        return;
      }
      if (authorizedPortals.length === 1) {
        window.location.assign(getPortalUrl(authorizedPortals[0].id));
      }
      return;
    }

    if (!isAuthorizedForActive && authorizedPortals.length > 0) {
      window.location.assign(getPortalUrl(authorizedPortals[0].id));
    }
  }, [
    activePortal,
    authorizedPortals,
    isAuthenticated,
    isAuthorizedForActive,
    preferredPortal,
    userRoles,
  ]);

  const activeConfig = activePortal === 'gateway' ? null : PORTAL_REGISTRY[activePortal];

  return {
    activePortal,
    activeConfig,
    authorizedPortals,
    isAuthorizedForActive,
    setAsDefault,
    setSetAsDefault,
    navigateToPortal,
  };
}
