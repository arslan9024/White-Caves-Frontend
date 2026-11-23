/**
 * TopBar — Single unified navigation bar (56px)
 *
 * Merges the previous UnifiedNavbar + MainNavBar into one clean bar:
 *   [Logo] | [Breadcrumbs: Home > Dept > Service] ─── [⌘K Search] [🔔] [👤]
 *
 * Decomposed under AEGIS V5.1 AEG-042 (< 310 lines, target <= 300 lines).
 */

import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Search, Menu } from 'lucide-react';
import type { RootState } from '../../../store/store';
import { selectSessionUser } from '../../../store/selectors/sessionSelectors';
import { toggleCommandPalette } from '../../../store/slices/sidebarSlice';
import {
  TopBarContainer,
  LogoSection,
  LogoMark,
  LogoName,
  VerticalDivider,
  ActionsSection,
  SearchTrigger,
  SearchShortcut,
  HamburgerButton,
} from './styles';
import { useBreadcrumbs } from './useBreadcrumbs';
import { useTopBarDropdowns } from './useTopBarDropdowns';
import { TopBarBreadcrumbs } from './TopBarBreadcrumbs';
import { TopBarQuickActions } from './TopBarQuickActions';
import { TopBarNotifications } from './TopBarNotifications';
import { TopBarUserMenu } from './TopBarUserMenu';
import type { TopBarProps } from './types';

export const TopBar: React.FC<TopBarProps> = React.memo(function TopBar({
  notifications = [],
  onLogout,
  onMenuOpen,
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const crumbs = useBreadcrumbs();

  const user = useSelector((state: RootState) => selectSessionUser(state));

  const {
    showUserMenu,
    showNotifMenu,
    showQuickActions,
    userMenuRef,
    notifMenuRef,
    quickActionsRef,
    toggleUserMenu,
    toggleNotifMenu,
    toggleQuickActions,
    closeUserMenu,
    closeNotifMenu,
    closeQuickActions,
  } = useTopBarDropdowns();

  const handleSearchClick = useCallback(() => {
    dispatch(toggleCommandPalette());
  }, [dispatch]);

  return (
    <TopBarContainer>
      {/* Hamburger — visible on mobile/tablet only */}
      <HamburgerButton onClick={onMenuOpen} aria-label="Open navigation menu">
        <Menu size={20} />
      </HamburgerButton>

      {/* Logo */}
      <LogoSection onClick={() => navigate('/crm')} aria-label="Go to dashboard">
        <LogoMark>WC</LogoMark>
        <LogoName>White Caves</LogoName>
      </LogoSection>

      <VerticalDivider />

      {/* Breadcrumbs */}
      <TopBarBreadcrumbs crumbs={crumbs} />

      {/* Right actions */}
      <ActionsSection>
        {/* Quick actions */}
        <TopBarQuickActions
          isOpen={showQuickActions}
          anchorRef={quickActionsRef}
          onToggle={toggleQuickActions}
          onClose={closeQuickActions}
        />

        {/* Search trigger → opens Command Palette */}
        <SearchTrigger onClick={handleSearchClick} aria-label="Open search (Ctrl+K)">
          <Search size={16} />
          <span>Search…</span>
          <SearchShortcut>⌘K</SearchShortcut>
        </SearchTrigger>

        {/* Notifications */}
        <TopBarNotifications
          isOpen={showNotifMenu}
          anchorRef={notifMenuRef}
          notifications={notifications}
          onToggle={toggleNotifMenu}
          onClose={closeNotifMenu}
        />

        {/* User menu */}
        <TopBarUserMenu
          isOpen={showUserMenu}
          anchorRef={userMenuRef}
          user={user}
          onToggle={toggleUserMenu}
          onClose={closeUserMenu}
          onLogout={onLogout}
        />
      </ActionsSection>
    </TopBarContainer>
  );
});

export default TopBar;

// ── Re-exports for backwards compatibility & modular consumption ──────────
export * from './types';
export * from './constants';
export * from './useBreadcrumbs';
export * from './useTopBarDropdowns';
export * from './TopBarBreadcrumbs';
export * from './TopBarQuickActions';
export * from './TopBarNotifications';
export * from './TopBarUserMenu';
export * from './styles';
