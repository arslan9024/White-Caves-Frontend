// @ts-nocheck
import { createSlice } from "@reduxjs/toolkit";
import { CRM_NAV_TREE } from "./crmView/crmNavTree";
import { initialState, crmViewReducers } from "./crmView/reducers";

export { CRM_NAV_TREE };
export * from "./crmView/selectors";

const crmViewSlice = createSlice({
  name: "crmView",
  initialState,
  reducers: crmViewReducers,
});

export const {
  setActiveCategory,
  setActiveObjectId,
  setActiveAssistant,
  toggleSidebar,
  setSidebarOpen,
  toggleAiPanel,
  setAiPanelOpen,
  setSelectedAssistantForChat,
  setViewMode,
  setSearchQuery,
  setFilterState,
  clearFilters,
  addBreadcrumb,
  navigateToBreadcrumb,
  toggleFavorite,
  toggleNavGroup,
  setActiveSubItem,
  openDocument,
  closeDocument,
  navigateDocumentBack,
  navigateDocumentForward,
  clearDocumentHistory,
  resetCrmView,
} = crmViewSlice.actions;


export default crmViewSlice.reducer;

