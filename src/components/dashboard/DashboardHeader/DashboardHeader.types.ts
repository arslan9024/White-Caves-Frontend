import { ComponentType } from 'react';

export interface DashboardFeature {
  id: string;
  label: string;
  icon?: string;
  component?: ComponentType<any> | string;
}

export interface AssistantContext {
  id?: string;
  name?: string;
  color?: string;
  features?: DashboardFeature[];
}

export interface NotificationItem {
  id?: string | number;
  message: string;
  timestamp?: string;
  isRead?: boolean;
}

export interface DashboardUser {
  displayName?: string | null;
  email?: string | null;
  photoURL?: string | null;
}

export interface DashboardHeaderProps {
  activeAssistant?: AssistantContext | null;
  onFeatureSelect?: (feature: DashboardFeature) => void;
  onMenuToggle?: () => void;
  notifications?: NotificationItem[];
  user?: DashboardUser | null;
  onLogout?: () => void;
}

