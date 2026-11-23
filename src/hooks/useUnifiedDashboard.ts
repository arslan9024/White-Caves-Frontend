/**
 * useUnifiedDashboard Hook
 * ========================
 * Extracts ALL state management, data fetching, computed values, and
 * action handlers from UnifiedDashboardPage so the page component is
 * a thin rendering shell.
 *
 * Responsibilities:
 * - Redux selector reads (role, user, CRM data, sidebar state)
 * - Computed dashboard data & role-based filtering (useMemo)
 * - Data-fetching effects (leads, properties, agents, overview)
 * - Keyboard shortcut registration (Ctrl+B sidebar toggle)
 * - URL search-param sync for active tab
 * - Sidebar toggle / assistant selection handlers
 * - CRM module select / back handlers
 */

import { useState, useEffect, useMemo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { getSubNavItems, getModuleById } from '../features/featureRegistry';
import { clearDepartmentSelection } from '../store/slices/sidebarSlice';
import type { RootState } from '../store/store';
import { useAppDispatch } from '../store/store';
import { isCreatorSuperUserEmail } from '../utils/superUserAccess';

// Companion sub-modules under AEG-042
import {
  type DashboardData,
  type CRMModuleProps,
  type CRMEntity,
  type AbortableDispatch,
  EMPTY_CRM_ARRAY,
  normalizeDashboardError,
} from './dashboard/types';
import { filterDashboardDataByRole } from './dashboard/filterData';
import { useDashboardData } from './dashboard/useDashboardData';
import { useDashboardSidebar } from './dashboard/useDashboardSidebar';
import { useDashboardTabs } from './dashboard/useDashboardTabs';

// Re-export types & utilities for backwards compatibility
export type { DashboardData, CRMModuleProps, CRMEntity, AbortableDispatch };
export { EMPTY_CRM_ARRAY, normalizeDashboardError, filterDashboardDataByRole };
export * from './dashboard';

// ─── Main Hook ────────────────────────────────────────────────

export function useUnifiedDashboard() {
  const dispatch = useAppDispatch();

  // ─── Core Redux State ─────────────────────────────────────
  const currentRole = useSelector((state: RootState) => state.navigation?.activeRole || 'buyer');
  const currentModule = useSelector((state: RootState) => state.navigation?.currentModule);
  const currentSubModule = useSelector((state: RootState) => state.navigation?.currentSubModule);
  const user = useSelector((state: RootState) => state.user.currentUser);

  const isSuperUser = isCreatorSuperUserEmail((user as { email?: string } | null)?.email);

  // ─── Local UI State ───────────────────────────────────────
  const [selectedCRMModule, setSelectedCRMModule] = useState<string | null>(null);

  // ─── Feature Registry ─────────────────────────────────────
  const roleModule = getModuleById(currentModule ?? currentRole);
  const roleSubNavItems = getSubNavItems(currentRole, currentModule ?? currentRole);

  // ─── Sidebar Sub-hook ─────────────────────────────────────
  const {
    flyoutOpen,
    leftCollapsed,
    selectedDepartment,
    selectedAssistantRedux,
    handleToggleLeftSidebar,
    handleSelectAssistant,
  } = useDashboardSidebar();

  // ─── Tabs Sub-hook ────────────────────────────────────────
  const { activeTab, setActiveTab, availableTabs, roleInfo } = useDashboardTabs({
    currentRole,
    isSuperUser,
    selectedAssistantRedux,
  });

  // ─── CRM Data Sub-hook ────────────────────────────────────
  const { dashboardData, isLoading, error, dispatchDashboardFetches, handleRetryAll } =
    useDashboardData();

  // ─── Role-Based Data Filtering ────────────────────────────
  const filteredData = useMemo<DashboardData>(() => {
    return filterDashboardDataByRole({
      dashboardData,
      isSuperUser,
      currentRole,
      user,
    });
  }, [dashboardData, isSuperUser, currentRole, user]);

  // Fetch CRM data on mount (skip if already loaded)
  useEffect(() => {
    const requests = dispatchDashboardFetches();

    return () => {
      requests.forEach(request => request.abort?.());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- run once on mount
  }, [dispatchDashboardFetches]);

  // ─── CRM Module Handlers ──────────────────────────────────
  const handleCRMModuleSelect = useCallback(
    (moduleId: string): void => {
      dispatch(clearDepartmentSelection());
      setSelectedCRMModule(prev => (prev === moduleId ? prev : moduleId));
      setActiveTab(prev => (prev === '' ? prev : ''));
    },
    [dispatch, setActiveTab]
  );

  const handleBackFromCRM = useCallback((): void => {
    dispatch(clearDepartmentSelection());
    setSelectedCRMModule(prev => (prev === null ? prev : null));
    setActiveTab(prev => (prev === 'overview' ? prev : 'overview'));
  }, [dispatch, setActiveTab]);

  const handleWorkspaceSelect = useCallback(
    (tabId: string): void => {
      dispatch(clearDepartmentSelection());
      setSelectedCRMModule(prev => (prev === null ? prev : null));
      setActiveTab(prev => (prev === tabId ? prev : tabId));
    },
    [dispatch, setActiveTab]
  );

  // ─── Return ───────────────────────────────────────────────
  return {
    // Core state
    currentRole,
    currentModule,
    currentSubModule,
    user,

    // Tab / CRM module state
    activeTab,
    setActiveTab,
    selectedCRMModule,
    setSelectedCRMModule,

    // Data
    dashboardData,
    filteredData,
    isLoading,
    error,

    // Sidebar state
    flyoutOpen,
    leftCollapsed,
    selectedDepartment,
    selectedAssistantRedux,

    // Role info
    availableTabs,
    roleInfo,
    roleModule,
    roleSubNavItems,
    isSuperUser,

    // Handlers
    handleToggleLeftSidebar,
    handleSelectAssistant,
    handleRetryAll,
    handleCRMModuleSelect,
    handleBackFromCRM,
    handleWorkspaceSelect,
  } as const;
}
