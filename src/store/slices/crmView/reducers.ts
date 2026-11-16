// @ts-nocheck
import { CRM_NAV_TREE, CRM_OBJECT_CATEGORIES, AI_ASSISTANTS_REGISTRY } from "./crmNavTree";

const initialState = {
  activeCategory: 'executive',
  activeSubItem: 'md-dashboard',
  activeObjectId: null,
  activeAssistant: null,
  sidebarOpen: true,
  aiPanelOpen: false,
  selectedAssistantForChat: null,
  viewMode: 'grid',
  searchQuery: '',
  filterState: {},
  navTree: CRM_NAV_TREE,
  expandedGroups: ['executive'],
  objectCategories: CRM_OBJECT_CATEGORIES,
  aiAssistants: AI_ASSISTANTS_REGISTRY,
  breadcrumbs: [{ id: 'executive', label: 'Executive Overview' }, { id: 'md-dashboard', label: 'MD Dashboard' }],
  recentObjects: [],
  favoriteObjects: [],
  documentViewMode: 'dashboard',
  activeDocument: null,
  documentHistory: [],
  documentHistoryIndex: -1,
};


export const crmViewReducers = {
    setActiveCategory: (state, action) => {
      state.activeCategory = action.payload;
      state.activeObjectId = null;
      state.activeAssistant = null;
      state.breadcrumbs = [{ id: action.payload, label: CRM_OBJECT_CATEGORIES[action.payload]?.label || action.payload }];
    },
    
    setActiveObjectId: (state, action) => {
      state.activeObjectId = action.payload;
      if (action.payload) {
        const exists = state.recentObjects.find(o => o.id === action.payload);
        if (!exists) {
          state.recentObjects = [
            { id: action.payload, category: state.activeCategory, timestamp: Date.now() },
            ...state.recentObjects
          ].slice(0, 10);
        }
      }
    },
    
    setActiveAssistant: (state, action) => {
      state.activeAssistant = action.payload;
      state.activeCategory = 'assistants';
      state.activeObjectId = action.payload;
      const assistant = AI_ASSISTANTS_REGISTRY.find(a => a.id === action.payload);
      if (assistant) {
        state.breadcrumbs = [
          { id: 'assistants', label: 'AI Assistants' },
          { id: action.payload, label: assistant.name }
        ];
      }
    },
    
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    
    setSidebarOpen: (state, action) => {
      state.sidebarOpen = action.payload;
    },
    
    toggleAiPanel: (state) => {
      state.aiPanelOpen = !state.aiPanelOpen;
    },
    
    setAiPanelOpen: (state, action) => {
      state.aiPanelOpen = action.payload;
    },
    
    setSelectedAssistantForChat: (state, action) => {
      state.selectedAssistantForChat = action.payload;
      if (action.payload && !state.aiPanelOpen) {
        state.aiPanelOpen = true;
      }
    },
    
    setViewMode: (state, action) => {
      state.viewMode = action.payload;
    },
    
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    
    setFilterState: (state, action) => {
      state.filterState = { ...state.filterState, ...action.payload };
    },
    
    clearFilters: (state) => {
      state.filterState = {};
      state.searchQuery = '';
    },
    
    addBreadcrumb: (state, action) => {
      const exists = state.breadcrumbs.find(b => b.id === action.payload.id);
      if (!exists) {
        state.breadcrumbs.push(action.payload);
      }
    },
    
    navigateToBreadcrumb: (state, action) => {
      const index = state.breadcrumbs.findIndex(b => b.id === action.payload);
      if (index >= 0) {
        state.breadcrumbs = state.breadcrumbs.slice(0, index + 1);
        state.activeCategory = action.payload;
        state.activeObjectId = null;
      }
    },
    
    toggleFavorite: (state, action) => {
      const { id, category } = action.payload;
      const exists = state.favoriteObjects.find(f => f.id === id);
      if (exists) {
        state.favoriteObjects = state.favoriteObjects.filter(f => f.id !== id);
      } else {
        state.favoriteObjects.push({ id, category, timestamp: Date.now() });
      }
    },

    toggleNavGroup: (state, action) => {
      const groupId = action.payload;
      if (state.expandedGroups.includes(groupId)) {
        state.expandedGroups = state.expandedGroups.filter(g => g !== groupId);
      } else {
        state.expandedGroups.push(groupId);
      }
    },

    setActiveSubItem: (state, action) => {
      const { categoryId, subItemId, categoryLabel, subItemLabel } = action.payload;
      state.activeCategory = categoryId;
      state.activeSubItem = subItemId;
      state.activeObjectId = subItemId;
      state.breadcrumbs = [
        { id: categoryId, label: categoryLabel },
        { id: subItemId, label: subItemLabel }
      ];
      if (!state.expandedGroups.includes(categoryId)) {
        state.expandedGroups.push(categoryId);
      }
    },

    openDocument: (state, action) => {
      const doc = action.payload;
      state.documentViewMode = 'document';
      state.activeDocument = doc;
      if (state.documentHistoryIndex < state.documentHistory.length - 1) {
        state.documentHistory = state.documentHistory.slice(0, state.documentHistoryIndex + 1);
      }
      state.documentHistory.push(doc);
      state.documentHistoryIndex = state.documentHistory.length - 1;
    },

    closeDocument: (state) => {
      state.documentViewMode = 'dashboard';
      state.activeDocument = null;
    },

    navigateDocumentBack: (state) => {
      if (state.documentHistoryIndex > 0) {
        state.documentHistoryIndex -= 1;
        state.activeDocument = state.documentHistory[state.documentHistoryIndex];
      }
    },

    navigateDocumentForward: (state) => {
      if (state.documentHistoryIndex < state.documentHistory.length - 1) {
        state.documentHistoryIndex += 1;
        state.activeDocument = state.documentHistory[state.documentHistoryIndex];
      }
    },

    clearDocumentHistory: (state) => {
      state.documentHistory = [];
      state.documentHistoryIndex = -1;
    },
    
    resetCrmView: () => initialState,
};

export { initialState };

