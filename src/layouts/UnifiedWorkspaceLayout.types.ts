/**
 * UnifiedWorkspaceLayout.types.ts — Layout & Workspace Type Definitions
 */

import type React from 'react';

export interface WorkspaceCategory {
  id: string;
  label: string;
  icon: string;
  badge?: string;
  isMdHub?: boolean;
}

export interface WorkspaceSubItem {
  id: string;
  label: string;
  code: string;
  path?: string;
  status?: string;
}

export interface WorkspaceKPI {
  label: string;
  value: string;
  trend?: string;
}

export interface WorkspaceViewItem {
  id: string;
  code: string;
  title: string;
  category: string;
  path: string;
  departmentFloor?: string;
  assistantCode?: string;
  description?: string;
  isLocked?: boolean;
  minLevel?: number;
  badge?: string;
  subItems?: WorkspaceSubItem[];
  kpis?: WorkspaceKPI[];
}

export interface UnifiedWorkspaceLayoutProps {
  currentUserEmail?: string;
  initialViewId?: string;
  defaultSidebarOpen?: boolean;
  children?: React.ReactNode;
}

