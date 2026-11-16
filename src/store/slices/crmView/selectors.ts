// @ts-nocheck
import { createSelector } from "@reduxjs/toolkit";
import { CRM_NAV_TREE, AI_ASSISTANTS_REGISTRY } from "./crmNavTree";

const selectCrmView = state => state.crmView;

export const selectActiveCategory = createSelector(
  [selectCrmView],
  cv => cv?.activeCategory || 'dashboard'
);

export const selectActiveObjectId = createSelector(
  [selectCrmView],
  cv => cv?.activeObjectId
);

export const selectActiveAssistant = createSelector(
  [selectCrmView],
  cv => cv?.activeAssistant
);

export const selectSidebarOpen = createSelector(
  [selectCrmView],
  cv => cv?.sidebarOpen ?? true
);

export const selectAiPanelOpen = createSelector(
  [selectCrmView],
  cv => cv?.aiPanelOpen ?? false
);

export const selectSelectedAssistantForChat = createSelector(
  [selectCrmView],
  cv => cv?.selectedAssistantForChat
);

export const selectViewMode = createSelector(
  [selectCrmView],
  cv => cv?.viewMode || 'grid'
);

export const selectSearchQuery = createSelector(
  [selectCrmView],
  cv => cv?.searchQuery || ''
);

export const selectFilterState = createSelector(
  [selectCrmView],
  cv => cv?.filterState || {}
);

export const selectBreadcrumbs = createSelector(
  [selectCrmView],
  cv => cv?.breadcrumbs || []
);

export const selectRecentObjects = createSelector(
  [selectCrmView],
  cv => cv?.recentObjects || []
);

export const selectFavoriteObjects = createSelector(
  [selectCrmView],
  cv => cv?.favoriteObjects || []
);

export const selectAllAiAssistants = createSelector(
  [selectCrmView],
  cv => cv?.aiAssistants || AI_ASSISTANTS_REGISTRY
);

export const selectAiAssistantById = (assistantId) => createSelector(
  [selectAllAiAssistants],
  assistants => assistants.find(a => a.id === assistantId)
);

export const selectAiAssistantsByDepartment = createSelector(
  [selectAllAiAssistants],
  assistants => {
    const grouped = {};
    assistants.forEach(a => {
      if (!grouped[a.dept]) grouped[a.dept] = [];
      grouped[a.dept].push(a);
    });
    return grouped;
  }
);

export const selectNavTree = createSelector(
  [selectCrmView],
  cv => cv?.navTree || CRM_NAV_TREE
);

export const selectExpandedGroups = createSelector(
  [selectCrmView],
  cv => cv?.expandedGroups || []
);

export const selectActiveSubItem = createSelector(
  [selectCrmView],
  cv => cv?.activeSubItem
);

export const selectDocumentViewMode = createSelector(
  [selectCrmView],
  cv => cv?.documentViewMode || 'dashboard'
);

export const selectActiveDocument = createSelector(
  [selectCrmView],
  cv => cv?.activeDocument
);

export const selectDocumentHistory = createSelector(
  [selectCrmView],
  cv => cv?.documentHistory || []
);

export const selectDocumentHistoryIndex = createSelector(
  [selectCrmView],
  cv => cv?.documentHistoryIndex ?? -1
);

export const selectCanNavigateBack = createSelector(
  [selectDocumentHistoryIndex],
  index => index > 0
);

export const selectCanNavigateForward = createSelector(
  [selectDocumentHistory, selectDocumentHistoryIndex],
  (history, index) => index < history.length - 1
);

