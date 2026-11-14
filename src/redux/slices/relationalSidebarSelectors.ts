// @ts-nocheck
export const selectSelectedDepartment = state => state.relationalSidebar.selectedDepartment;
export const selectSelectedService = state => state.relationalSidebar.selectedService;
export const selectSelectedSubitem = state => state.relationalSidebar.selectedSubitem;
export const selectSelectedAssistant = state => state.relationalSidebar.selectedAssistant;
export const selectActiveContext = state => state.relationalSidebar.activeContext;
export const selectShowFeatureSidebar = state => state.relationalSidebar.showFeatureSidebar;
export const selectFilteredAssistants = state => state.relationalSidebar.filteredAssistants;
export const selectFilteredServices = state => state.relationalSidebar.filteredServices;
export const selectAssistantNotifications = state => state.relationalSidebar.assistantNotifications;
export const selectContextData = state => state.relationalSidebar.contextData;
export const selectSelectionHistory = state => state.relationalSidebar.selectionHistory;
export const selectServiceStateCache = state => state.relationalSidebar.serviceStateCache;
export const selectMainContentLoading = state => state.relationalSidebar.mainContentLoading;
export const selectMainContentError = state => state.relationalSidebar.mainContentError;
export const selectDepartmentData = state => state.relationalSidebar.departmentData;
export const selectAssistantData = state => state.relationalSidebar.assistantData;

// Helper selector to get cached state for current service
export const selectCurrentServiceCache = state => {
  const dept = state.relationalSidebar.selectedDepartment;
  const service = state.relationalSidebar.selectedService;
  if (!dept || !service) return null;
  const cacheKey = `${dept}_${service}`;
  return state.relationalSidebar.serviceStateCache[cacheKey] || null;
};
