import React, { FC } from 'react';
import { Bell, ChevronDown } from 'lucide-react';
import {
  NavbarContainer,
  NavWing,
  OverhangingLogoWrapper,
  NavLink,
  QuickActionBtn,
  ProfileMenuWrapper,
  ProfileTrigger,
} from './TopNavbar.style';
import { useTopNavbarLogic, TopNavbarProps } from './TopNavbar.logic';
import { UserPreferencesDropdown } from '../layout/PublicNavbar/UserPreferencesDropdown';
import { NotificationsDropdown } from './NotificationsDropdown';
import ThemeToggle from '../ThemeToggle';

export type { TopNavbarProps };

export const TopNavbar: FC<TopNavbarProps> = props => {
  const {
    scrolled,
    currentPath,
    user,
    displayName,
    initial,
    photoURL,
    isProfileOpen,
    setIsProfileOpen,
    toggleProfile,
    isNotificationsOpen,
    setIsNotificationsOpen,
    toggleNotifications,
    handleNavigate,
  } = useTopNavbarLogic(props);

  const isZen = props.isZenMode;

  if (isZen) {
    return (
      <header
        className="wc-zen-topbar"
        data-testid="wc-zen-topbar"
        style={{
          height: '42px',
          background: 'rgba(15, 23, 42, 0.95)',
          borderBottom: '1px solid rgba(239, 68, 68, 0.35)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 16px',
          zIndex: 1000,
          position: props.sticky ? 'sticky' : 'relative',
          top: 0,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div
            onClick={() => handleNavigate(props.homeRoute || '/dashboard')}
            title="Return to Dashboard"
            data-testid="zen-logo-ring"
            style={{
              width: '28px',
              height: '28px',
              borderRadius: '50%',
              border: '2px solid #EF4444',
              padding: '2px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: '#FFFFFF',
              boxShadow: '0 0 10px rgba(239, 68, 68, 0.4)',
            }}
          >
            <img
              src="/company-logo.jpg"
              alt="White Caves Logo"
              style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'contain' }}
            />
          </div>
          <span
            style={{
              fontSize: '0.75rem',
              fontWeight: 800,
              color: '#F8FAFC',
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
            }}
          >
            AICC Zen Workspace
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <ThemeToggle compact={true} />

          <div style={{ position: 'relative' }}>
            <QuickActionBtn
              onClick={toggleNotifications}
              title="Notifications & Escalations"
              aria-label="Notifications"
              style={{ width: '28px', height: '28px' }}
            >
              <Bell size={13} />
              <div className="alert-pip" />
            </QuickActionBtn>
            <NotificationsDropdown
              isOpen={isNotificationsOpen}
              onClose={() => setIsNotificationsOpen(false)}
            />
          </div>

          <ProfileMenuWrapper>
            <ProfileTrigger
              onClick={toggleProfile}
              aria-expanded={isProfileOpen}
              aria-label="User profile and preferences"
              data-testid="profile-trigger"
              style={{ padding: '2px 8px', height: '28px' }}
            >
              <div
                className="avatar"
                style={{ width: '22px', height: '22px', fontSize: '0.65rem' }}
              >
                {photoURL ? <img src={photoURL} alt={displayName} /> : initial}
              </div>
              <ChevronDown size={11} color="#EF4444" />
            </ProfileTrigger>
            {isProfileOpen && (
              <UserPreferencesDropdown user={user} onClose={() => setIsProfileOpen(false)} />
            )}
          </ProfileMenuWrapper>
        </div>
      </header>
    );
  }

  return (
    <NavbarContainer
      $sticky={props.sticky}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      style={{
        boxShadow: scrolled ? '0 4px 24px rgba(0, 0, 0, 0.12)' : '0 4px 20px rgba(0, 0, 0, 0.04)',
      }}
      data-testid="top-navbar"
    >
      {/* ── Left Wing: Navigation Links (Single White Caves HQ Anchor) ── */}
      <NavWing $align="left">
        <NavLink
          $active={
            currentPath === '/' ||
            currentPath.startsWith('/dashboard') ||
            currentPath.startsWith('/crm')
          }
          onClick={() => {
            if (props.onToggleSidebar) {
              props.onToggleSidebar();
            } else {
              handleNavigate('/dashboard');
            }
          }}
          data-testid="navbar-white-caves-hq"
          title="White Caves HQ — Sovereign System Navigation"
        >
          🏢 White Caves HQ
        </NavLink>
      </NavWing>

      {/* ── Central Overhanging Logo (64px, 50% overhang, Dead Center) ──── */}
      <OverhangingLogoWrapper
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => {
          const targetHome =
            props.homeRoute ||
            (currentPath.startsWith('/dashboard') || currentPath.startsWith('/crm')
              ? '/dashboard'
              : '/');
          handleNavigate(targetHome);
        }}
        title={
          currentPath.startsWith('/dashboard')
            ? 'White Caves Dashboard Home'
            : 'White Caves Real Estate LLC — Sovereign Real Estate OS'
        }
        data-testid="navbar-logo-home"
      >
        <img src="/company-logo.jpg" alt="White Caves Logo" />
      </OverhangingLogoWrapper>

      {/* ── Right Wing: Notifications & Centralized Profile Menu ── */}
      <NavWing $align="right">
        {/* Light / Dark Mode Toggle */}
        <ThemeToggle compact={true} />

        {/* Notifications & Escalations */}
        <div style={{ position: 'relative' }}>
          <QuickActionBtn
            onClick={toggleNotifications}
            title="Notifications & Escalations"
            aria-label="Notifications"
          >
            <Bell size={16} />
            <div className="alert-pip" />
          </QuickActionBtn>
          <NotificationsDropdown
            isOpen={isNotificationsOpen}
            onClose={() => setIsNotificationsOpen(false)}
          />
        </div>

        {/* Centralized Profile Component (with telemetry, role badge, theme, and full suite) */}
        <ProfileMenuWrapper>
          <ProfileTrigger
            onClick={toggleProfile}
            aria-expanded={isProfileOpen}
            aria-label="User profile and preferences"
            data-testid="profile-trigger"
          >
            <div className="avatar">
              {photoURL ? <img src={photoURL} alt={displayName} /> : initial}
            </div>
            <div className="user-meta">
              <span className="name">{displayName}</span>
            </div>
            <ChevronDown size={14} color="#EF4444" />
          </ProfileTrigger>

          {isProfileOpen && (
            <UserPreferencesDropdown user={user} onClose={() => setIsProfileOpen(false)} />
          )}
        </ProfileMenuWrapper>
      </NavWing>
    </NavbarContainer>
  );
};

export default TopNavbar;
