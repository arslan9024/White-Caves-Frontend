// @ts-nocheck
import { createSlice } from '@reduxjs/toolkit';
import {
  fetchDepartmentData,
  fetchAssistantData,
  fetchContextualData,
} from './relationalSidebarThunks';

export {
  fetchDepartmentData,
  fetchAssistantData,
  fetchContextualData,
};

export * from './relationalSidebarSelectors';

const initialState = {
  // Left Sidebar State
  selectedDepartment: null,
  selectedService: null,
  selectedSubitem: null,
  departments: [],
  filteredServices: [],
  departmentData: null,
  departmentLoading: false,
  departmentError: null,

  // Right Sidebar State
  selectedAssistant: null,
  filteredAssistants: [],
  assistantData: null,
  assistantLoading: false,
  assistantError: null,
  assistantNotifications: {}, // { assistantId: { count, messages: [] } }

  // Context-Specific Sidebar State
  activeContext: null, // 'inventory', 'analytics', 'leasing', etc.
  contextData: null,
  contextLoading: false,
  contextError: null,
  showFeatureSidebar: false,

  // Selection History (tracks last 3 for state persistence)
  selectionHistory: [], // [{ dept, service, subitem, filters, scrollPos, timestamp }]
  maxHistoryLength: 3,

  // Service State Cache (for filter/scroll persistence)
  serviceStateCache: {}, // { "SALES_pipeline": { filters: {...}, scrollPos: 0 } }

  // Main Content View State
  mainContentLoading: false,
  mainContentError: null,

  // Relational State
  relationshipMap: {}, // { departmentId: [assistantIds], assistantId: [serviceIds] }
};

const relationalSidebarSlice = createSlice({
  name: 'relationalSidebar',
  initialState,
  reducers: {
    // Left Sidebar Actions
    setSelectedDepartment: (state, action) => {
      state.selectedDepartment = action.payload;
      state.selectedService = null;
      state.selectedSubitem = null;
      state.activeContext = null;
      state.showFeatureSidebar = false;
    },

    setSelectedService: (state, action) => {
      state.selectedService = action.payload;
      state.selectedSubitem = null;
      state.activeContext = null;
      state.showFeatureSidebar = false;
    },

    setSelectedSubitem: (state, action) => {
      state.selectedSubitem = action.payload;
    },

    setFilteredServices: (state, action) => {
      state.filteredServices = action.payload;
    },

    // Right Sidebar Actions
    setSelectedAssistant: (state, action) => {
      state.selectedAssistant = action.payload;
    },

    setFilteredAssistants: (state, action) => {
      state.filteredAssistants = action.payload;
    },

    // Context-Specific Sidebar Actions
    setActiveContext: (state, action) => {
      state.activeContext = action.payload.context;
      state.showFeatureSidebar = action.payload.context !== null;
    },

    clearActiveContext: state => {
      state.activeContext = null;
      state.contextData = null;
      state.showFeatureSidebar = false;
    },

    // Selection History Management (max 3 entries)
    addToSelectionHistory: (state, action) => {
      const { dept, service, subitem, filters = {}, scrollPos = 0 } = action.payload;

      const entry = {
        dept,
        service,
        subitem,
        filters,
        scrollPos,
        timestamp: new Date().toISOString(),
      };

      state.selectionHistory = [entry, ...state.selectionHistory];

      if (state.selectionHistory.length > state.maxHistoryLength) {
        state.selectionHistory = state.selectionHistory.slice(0, state.maxHistoryLength);
      }
    },

    restoreFromHistory: (state, action) => {
      const { dept, service, subitem } = action.payload;
      state.selectedDepartment = dept;
      state.selectedService = service;
      state.selectedSubitem = subitem;
    },

    clearSelectionHistory: state => {
      state.selectionHistory = [];
    },

    // Service State Cache (for filter/scroll persistence)
    cacheServiceState: (state, action) => {
      const { dept, service, filters, scrollPos } = action.payload;
      const cacheKey = `${dept}_${service}`;
      state.serviceStateCache[cacheKey] = {
        filters,
        scrollPos,
        timestamp: new Date().toISOString(),
      };
    },

    restoreServiceState: (state, action) => {
      const { dept, service } = action.payload;
      const cacheKey = `${dept}_${service}`;
      return state.serviceStateCache[cacheKey] || null;
    },

    clearServiceStateCache: state => {
      state.serviceStateCache = {};
    },

    // Main Content Loading States
    setMainContentLoading: (state, action) => {
      state.mainContentLoading = action.payload;
    },

    setMainContentError: (state, action) => {
      state.mainContentError = action.payload;
    },

    // Notification Actions
    addNotification: (state, action) => {
      const { assistantId, message } = action.payload;
      if (!state.assistantNotifications[assistantId]) {
        state.assistantNotifications[assistantId] = {
          count: 0,
          messages: [],
        };
      }
      state.assistantNotifications[assistantId].messages.push(message);
      state.assistantNotifications[assistantId].count += 1;
    },

    clearNotifications: (state, action) => {
      const assistantId = action.payload;
      if (state.assistantNotifications[assistantId]) {
        state.assistantNotifications[assistantId].count = 0;
        state.assistantNotifications[assistantId].messages = [];
      }
    },

    // Relationship Map Actions
    setRelationshipMap: (state, action) => {
      state.relationshipMap = action.payload;
    },

    // Bulk Reset
    resetRelationalSidebar: () => {
      return initialState;
    },
  },

  extraReducers: builder => {
    builder
      .addCase(fetchDepartmentData.pending, state => {
        state.departmentLoading = true;
        state.departmentError = null;
      })
      .addCase(fetchDepartmentData.fulfilled, (state, action) => {
        state.departmentLoading = false;
        state.departmentData = action.payload;
      })
      .addCase(fetchDepartmentData.rejected, (state, action) => {
        state.departmentLoading = false;
        state.departmentError = action.payload;
      });

    builder
      .addCase(fetchAssistantData.pending, state => {
        state.assistantLoading = true;
        state.assistantError = null;
      })
      .addCase(fetchAssistantData.fulfilled, (state, action) => {
        state.assistantLoading = false;
        state.assistantData = action.payload;
      })
      .addCase(fetchAssistantData.rejected, (state, action) => {
        state.assistantLoading = false;
        state.assistantError = action.payload;
      });

    builder
      .addCase(fetchContextualData.pending, state => {
        state.contextLoading = true;
        state.contextError = null;
      })
      .addCase(fetchContextualData.fulfilled, (state, action) => {
        state.contextLoading = false;
        state.contextData = action.payload;
      })
      .addCase(fetchContextualData.rejected, (state, action) => {
        state.contextLoading = false;
        state.contextError = action.payload;
      });
  },
});

export const {
  setSelectedDepartment,
  setSelectedService,
  setSelectedSubitem,
  setFilteredServices,
  setSelectedAssistant,
  setFilteredAssistants,
  setActiveContext,
  clearActiveContext,
  addToSelectionHistory,
  restoreFromHistory,
  clearSelectionHistory,
  cacheServiceState,
  restoreServiceState,
  clearServiceStateCache,
  setMainContentLoading,
  setMainContentError,
  addNotification,
  clearNotifications,
  setRelationshipMap,
  resetRelationalSidebar,
} = relationalSidebarSlice.actions;

export default relationalSidebarSlice.reducer;

