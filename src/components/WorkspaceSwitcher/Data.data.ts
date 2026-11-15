import type { PortalConfig, PortalId } from '../../config/portalRegistry';

export interface WorkspaceSwitcherProps {
  currentPortal: PortalId | 'gateway';
  authorizedPortals: PortalConfig[];
  onSwitch?: (portalId: PortalId) => void;
}

export interface WorkspaceSwitcherCopy {
  ariaLabel: string;
  switchLabel: string;
}

export const WORKSPACE_SWITCHER_COPY: WorkspaceSwitcherCopy = {
  ariaLabel: 'Switch White Caves Workspace Portal',
  switchLabel: 'Workspace',
};
