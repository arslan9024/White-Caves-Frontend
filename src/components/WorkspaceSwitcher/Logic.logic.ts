import { useCallback, useState } from 'react';
import { getPortalUrl, PORTAL_STORAGE_KEY, type PortalId } from '../../config/portalRegistry';
import type { WorkspaceSwitcherProps } from './Data.data';

export function useWorkspaceSwitcherLogic({
  currentPortal,
  authorizedPortals,
  onSwitch,
}: WorkspaceSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);

  const activeConfig = authorizedPortals.find(p => p.id === currentPortal) ?? authorizedPortals[0];

  const toggleMenu = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  const handleSelectPortal = useCallback(
    (portalId: PortalId) => {
      setIsOpen(false);
      try {
        window.localStorage.setItem(PORTAL_STORAGE_KEY, portalId);
      } catch {
        // ignore storage errors
      }
      if (onSwitch) {
        onSwitch(portalId);
        return;
      }
      window.location.assign(getPortalUrl(portalId));
    },
    [onSwitch]
  );

  return {
    isOpen,
    activeConfig,
    toggleMenu,
    handleSelectPortal,
  };
}
