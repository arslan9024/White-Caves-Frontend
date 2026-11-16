/**
 * UnifiedWorkspaceLayout.data.ts — Facade for Workspace Navigation & Views
 */

import { EXECUTIVE_WORKSPACE_VIEWS } from './UnifiedWorkspaceLayout.executiveViews';
import { DEPARTMENT_WORKSPACE_VIEWS } from './UnifiedWorkspaceLayout.departmentViews';

export const WORKSPACE_VIEWS = [...EXECUTIVE_WORKSPACE_VIEWS, ...DEPARTMENT_WORKSPACE_VIEWS];

export { WORKSPACE_CATEGORIES, WORKSPACE_LAYOUT_TEXT } from './UnifiedWorkspaceLayout.constants';
export type {
  WorkspaceCategory,
  WorkspaceSubItem,
  WorkspaceKPI,
  WorkspaceViewItem,
} from './UnifiedWorkspaceLayout.types';

