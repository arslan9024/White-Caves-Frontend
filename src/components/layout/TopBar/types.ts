/**
 * Types for TopBar components
 * Decomposed under AEGIS V5.1 AEG-042 (< 310 lines)
 */

export interface TopBarProps {
  /** Notifications list for badge count */
  notifications?: Array<{ id: string; read: boolean }>;
  /** Callback when user clicks logout in the dropdown */
  onLogout?: () => void;
  /** Callback when user clicks hamburger (mobile) — opens MobileMenuDrawer */
  onMenuOpen?: () => void;
}

export interface BreadcrumbCrumb {
  label: string;
  path?: string;
  action?: () => void;
}
