// @ts-nocheck
/* eslint-disable security/detect-object-injection */
import type { PayloadAction } from '@reduxjs/toolkit';
import type { AIAssistantDashboardState } from '../types';
import { MAX_RECENT_ASSISTANTS, MAX_ACTIVITY_LOG } from '../initialState';

export const assistantUIReducers = {
    // ── Core assistant selection ────────────────────────────────────────
    selectAssistant: (state, action: PayloadAction<string>) => {
      state.ui.selectedAssistant = action.payload;
      if (!state.recent.includes(action.payload)) {
        state.recent.unshift(action.payload);
        if (state.recent.length > MAX_RECENT_ASSISTANTS) state.recent.pop();
      } else {
        state.recent = state.recent.filter(id => id !== action.payload);
        state.recent.unshift(action.payload);
      }
      state.ui.dropdownOpen = false;
    },

    toggleFavorite: (state, action: PayloadAction<string>) => {
      const index = state.favorites.indexOf(action.payload);
      if (index === -1) {
        state.favorites.push(action.payload);
      } else {
        state.favorites.splice(index, 1);
      }
      state.ownerPreferences.favoriteAssistants = [...state.favorites];
    },

    updateAssistantMetrics: (
      state,
      action: PayloadAction<{ assistantId: string; metrics: Partial<AssistantMetrics> }>
    ) => {
      const { assistantId, metrics } = action.payload;
      if (state.allAssistants.byId[assistantId]) {
        state.allAssistants.byId[assistantId].metrics = {
          ...state.allAssistants.byId[assistantId].metrics,
          ...metrics,
        };
      }
    },

    updateAssistantHealth: (
      state,
      action: PayloadAction<{ assistantId: string; health: AssistantMetrics['systemHealth'] }>
    ) => {
      const { assistantId, health } = action.payload;
      if (state.allAssistants.byId[assistantId]) {
        state.allAssistants.byId[assistantId].metrics.systemHealth = health;
      }
    },

    // ── UI state ────────────────────────────────────────────────────────
    setViewMode: (state, action: PayloadAction<string>) => {
      state.ui.viewMode = action.payload;
    },
    setLayout: (state, action: PayloadAction<'grid' | 'list'>) => {
      state.ui.layout = action.payload;
    },
    setDepartmentFilter: (state, action: PayloadAction<string>) => {
      state.ui.filters.department = action.payload;
    },
    setStatusFilter: (state, action: PayloadAction<string>) => {
      state.ui.filters.status = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.ui.filters.searchQuery = action.payload;
    },
    toggleDropdown: state => {
      state.ui.dropdownOpen = !state.ui.dropdownOpen;
    },
    closeDropdown: state => {
      state.ui.dropdownOpen = false;
    },

    // ── Performance & activity ──────────────────────────────────────────
    addActivity: (state, action: PayloadAction<Omit<Activity, 'id' | 'timestamp'>>) => {
      const activity = {
        ...action.payload,
        id: Date.now(),
        timestamp: new Date().toISOString(),
      } as Activity;
      state.assistantPerformance.recentActivity.unshift(activity);
      if (state.assistantPerformance.recentActivity.length > MAX_ACTIVITY_LOG) {
        state.assistantPerformance.recentActivity.pop();
      }
    },
    addAlert: (state, action: PayloadAction<Record<string, unknown>>) => {
      state.assistantPerformance.criticalAlerts.push(action.payload);
    },
    dismissAlert: (state, action: PayloadAction<string>) => {
      state.assistantPerformance.criticalAlerts = state.assistantPerformance.criticalAlerts.filter(
        alert => (alert as Record<string, unknown>).id !== action.payload
      );
    },

    // ── Owner preferences ───────────────────────────────────────────────
    updateOwnerPreferences: (
      state,
      action: PayloadAction<Partial<typeof state.ownerPreferences>>
    ) => {
      state.ownerPreferences = { ...state.ownerPreferences, ...action.payload };
    },
    setConnectionStatus: (state, action: PayloadAction<boolean>) => {
      state.liveUpdates.isConnected = action.payload;
      state.liveUpdates.lastUpdate = new Date().toISOString();
    },

    // ── Sidebar ─────────────────────────────────────────────────────────
    toggleSidebar: state => {
      state.sidebar.isOpen = !state.sidebar.isOpen;
    },
    collapseSidebar: (state, action: PayloadAction<boolean>) => {
      state.sidebar.isCollapsed = action.payload;
    },
    setSidebarActiveAssistant: (state, action: PayloadAction<string | null>) => {
      state.sidebar.activeAssistantId = action.payload;
    },

    // ── Notifications ───────────────────────────────────────────────────
};

