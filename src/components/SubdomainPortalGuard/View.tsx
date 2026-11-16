import React, { FC } from 'react';
import { PORTAL_GUARD_COPY, type SubdomainPortalGuardProps } from './Data.data';
import { useSubdomainPortalGuardLogic } from './Logic.logic';
import { portalGuardStyles as styles } from './Style.style';

export const SubdomainPortalGuardView: FC<SubdomainPortalGuardProps> = ({
  children,
  isAuthenticated,
  userRoles,
  preferredPortal,
  onLoginClick,
  onSetDefaultPortal,
}) => {
  const {
    activePortal,
    activeConfig,
    authorizedPortals,
    isAuthorizedForActive,
    setAsDefault,
    setSetAsDefault,
    navigateToPortal,
  } = useSubdomainPortalGuardLogic({
    isAuthenticated,
    userRoles,
    preferredPortal,
    onSetDefaultPortal,
  });

  if (!isAuthenticated) {
    return (
      <div style={styles.page} data-testid="portal-guard-login">
        <div style={styles.card}>
          <span style={styles.badge}>
            {activeConfig ? activeConfig.subdomain : 'app.whitecaves.com'}
          </span>
          <h1 style={styles.title}>
            {activeConfig ? activeConfig.label : PORTAL_GUARD_COPY.gatewayTitle}
          </h1>
          <p style={styles.subtitle}>
            {activeConfig ? activeConfig.description : PORTAL_GUARD_COPY.gatewaySubtitle}
          </p>
          <button type="button" style={styles.primaryBtn} onClick={onLoginClick}>
            {PORTAL_GUARD_COPY.signInButton}
          </button>
        </div>
      </div>
    );
  }

  if (activePortal === 'gateway' && authorizedPortals.length >= 2) {
    return (
      <div style={styles.page} data-testid="portal-guard-selector">
        <div style={styles.card}>
          <span style={styles.badge}>app.whitecaves.com</span>
          <h1 style={styles.title}>{PORTAL_GUARD_COPY.gatewayTitle}</h1>
          <p style={styles.subtitle}>{PORTAL_GUARD_COPY.gatewaySubtitle}</p>

          <div style={styles.grid}>
            {authorizedPortals.map(portal => (
              <button
                key={portal.id}
                type="button"
                style={styles.portalBtn}
                onClick={() => navigateToPortal(portal.id)}
              >
                <span style={styles.portalDomain}>{portal.subdomain}</span>
                <span style={styles.portalTitle}>{portal.label}</span>
                <span style={styles.portalDesc}>{portal.description}</span>
              </button>
            ))}
          </div>

          <label style={styles.checkboxRow}>
            <input
              type="checkbox"
              checked={setAsDefault}
              onChange={e => setSetAsDefault(e.target.checked)}
            />
            <span>{PORTAL_GUARD_COPY.setDefaultLabel}</span>
          </label>
        </div>
      </div>
    );
  }

  if (!isAuthorizedForActive) {
    return (
      <div style={styles.page} data-testid="portal-guard-redirect">
        <div style={styles.card}>
          <h1 style={styles.title}>{PORTAL_GUARD_COPY.unauthorizedTitle}</h1>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default SubdomainPortalGuardView;

