import React, { FC } from 'react';
import { WORKSPACE_SWITCHER_COPY, type WorkspaceSwitcherProps } from './Data.data';
import { useWorkspaceSwitcherLogic } from './Logic.logic';
import { workspaceSwitcherStyles as styles } from './Style.style';

export const WorkspaceSwitcherView: FC<WorkspaceSwitcherProps> = props => {
  const { authorizedPortals, currentPortal } = props;
  const { isOpen, activeConfig, toggleMenu, handleSelectPortal } = useWorkspaceSwitcherLogic(props);

  // Only render when user has 2+ authorized portals
  if (authorizedPortals.length < 2) {
    return null;
  }

  return (
    <div style={styles.container} data-testid="workspace-switcher">
      <button
        type="button"
        style={styles.trigger}
        onClick={toggleMenu}
        aria-label={WORKSPACE_SWITCHER_COPY.ariaLabel}
        aria-expanded={isOpen}
      >
        <span style={styles.badge} />
        <span>{activeConfig?.shortLabel ?? WORKSPACE_SWITCHER_COPY.switchLabel}</span>
      </button>

      {isOpen && (
        <div style={styles.menu} role="menu">
          {authorizedPortals.map(portal => {
            const isActive = portal.id === currentPortal;
            return (
              <button
                key={portal.id}
                type="button"
                role="menuitem"
                style={{
                  ...styles.item,
                  ...(isActive ? styles.itemActive : {}),
                }}
                onClick={() => handleSelectPortal(portal.id)}
              >
                <span style={styles.itemTitle}>{portal.shortLabel}</span>
                <span style={styles.itemSubdomain}>{portal.subdomain}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default WorkspaceSwitcherView;

