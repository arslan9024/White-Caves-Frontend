// ============================================================================
// AI ASSISTANT DASHBOARD SLICE — 100% Backwards-Compatible Facade
// ============================================================================
/* eslint-disable security/detect-object-injection */

import { createSlice } from '@reduxjs/toolkit';
import { getInitialState } from './aiAssistant/initialState';
import { assistantUIReducers } from './aiAssistant/caseReducers/assistantUIReducers';
import { taskNotificationReducers } from './aiAssistant/caseReducers/taskNotificationReducers';
import { domainOperationReducers } from './aiAssistant/caseReducers/domainOperationReducers';
import { taskLifecycleReducers } from './aiAssistant/caseReducers/taskLifecycleReducers';
import { addAIAssistantExtraReducers } from './aiAssistant/extraReducers';

// ── Re-export types ──
export type * from './aiAssistant/types';

// ── Re-export selectors ──
export * from './aiAssistant/selectors';

// ── Re-export thunks ──
export * from './aiAssistant/thunks';

// ── Re-export constants ──
export { DEPARTMENT_COLORS } from './aiAssistant/registry';

const aiAssistantDashboardSlice = createSlice({
  name: 'aiAssistantDashboard',
  initialState: getInitialState(),
  reducers: {
    ...assistantUIReducers,
    ...taskNotificationReducers,
    ...domainOperationReducers,
    ...taskLifecycleReducers,
  },
  extraReducers: addAIAssistantExtraReducers,
});

export const {
  selectAssistant,
  toggleFavorite,
  updateAssistantMetrics,
  updateAssistantHealth,
  setViewMode,
  setLayout,
  setDepartmentFilter,
  setStatusFilter,
  setSearchQuery,
  toggleDropdown,
  closeDropdown,
  addActivity,
  addAlert,
  dismissAlert,
  updateOwnerPreferences,
  setConnectionStatus,
  toggleSidebar,
  collapseSidebar,
  setSidebarActiveAssistant,
  addNotification,
  markNotificationRead,
  markAllNotificationsRead,
  clearNotifications,
  addTask,
  updateTaskStatus,
  assignTask,
  triggerUserAction,
  updateOliviaSyncSchedule,
  toggleOliviaMonitoring,
  updateOliviaPropertySync,
  updateOliviaMarketResearch,
  updateOliviaInsights,
  updateOliviaCoordination,
  updateOliviaSiteStatus,
  addOliviaActivity,
  addExecutiveSuggestion,
  updateSuggestionStatus,
  setSuggestionFilters,
  clearSuggestionFilters,
  requestVaultAccess,
  approveVaultRequest,
  denyVaultRequest,
  addIncomingLead,
  qualifyLead,
  routeLeadToSpecialist,
  updateLeadPipelineStage,
  addComplianceAuditLog,
  flagTransaction,
  advanceTaskLifecycle,
  addTaskAction,
  setTaskResult,
} = aiAssistantDashboardSlice.actions;

export default aiAssistantDashboardSlice.reducer;

