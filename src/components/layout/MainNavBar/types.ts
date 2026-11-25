import type React from 'react';

export interface UserProp {
  displayName?: string;
  email?: string;
  photoURL?: string;
}

export interface NotificationItem_T {
  id?: string | number;
  isRead: boolean;
  title: string;
  time?: string;
  color?: string;
  icon?: React.ReactNode;
  [key: string]: unknown;
}

export interface QuickStats {
  properties?: number;
  users?: number;
  leads?: number;
  systemHealth?: string;
}

export interface MainNavBarProps {
  theme?: string;
  onThemeToggle?: () => void;
  user?: UserProp | null;
  notifications?: NotificationItem_T[];
  onLogout?: () => void;
  isSuperUser?: boolean;
  quickStats?: QuickStats | null;
  leftSidebarCollapsed?: boolean;
  onToggleLeftSidebar?: () => void;
}

export type ProfileAction = 'admin' | 'profile' | 'settings' | 'billing' | 'help' | 'logout';
