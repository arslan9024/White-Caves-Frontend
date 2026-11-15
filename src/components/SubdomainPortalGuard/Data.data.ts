import type { ReactNode } from 'react';
import type { PortalId, UserRole } from '../../config/portalRegistry';

export interface SubdomainPortalGuardProps {
  children: ReactNode;
  isAuthenticated: boolean;
  userRoles: UserRole[];
  preferredPortal?: PortalId | null;
  onLoginClick?: () => void;
  onSetDefaultPortal?: (portalId: PortalId) => void;
}

export const PORTAL_GUARD_COPY = {
  gatewayTitle: 'White Caves Unified Workspace Gateway',
  gatewaySubtitle: 'Select your authorized operational portal to continue.',
  setDefaultLabel: 'Set as default workspace',
  signInButton: 'Sign In to Continue',
  unauthorizedTitle: 'Redirecting to Authorized Portal...',
};
