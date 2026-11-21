import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { logout } from "./authSlice";
import {
  type Property,
  type Lead,
  mockProperties,
  mockLeads,
  mockRegulatoryContracts,
} from "../mocks/dubaiRealEstateMocks";
import type {
  FavoriteItem,
  RecentlyViewedItem,
  Notification,
  NotificationState,
  LoadingState,
  Metrics,
  DashboardState,
} from "./dashboard/types";
import { initialState } from "./dashboard/types";
import {
  fetchDashboardMetrics,
  fetchFavoriteIdsThunk,
  fetchFavoritesThunk,
  addFavoriteThunk,
  removeFavoriteThunk,
} from "./dashboard/thunks";

// ── Re-exports ──
export type * from "./dashboard/types";
export * from "./dashboard/thunks";
export * from "./dashboard/selectors";


const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    setActiveTab: (state, action: PayloadAction<{ key: string; tab: string }>) => {
      const { key, tab } = action.payload;
      state.activeTabs[key] = tab;
    },
    setFilter: (state, action: PayloadAction<{ key: string; filter: Record<string, unknown> }>) => {
      const { key, filter } = action.payload;
      state.filters[key] = {
        ...((state.filters[key] as Record<string, unknown>) || {}),
        ...filter,
      };
    },
    clearFilter: (state, action: PayloadAction<{ key: string }>) => {
      const { key } = action.payload;
      delete state.filters[key];
    },
    setMetrics: (state, action: PayloadAction<{ role: string; data: Record<string, unknown> }>) => {
      const { role, data } = action.payload;
      state.metrics[role] = data;
    },
    toggleOfflineMode: (state) => {
      state.isOfflineMode = !state.isOfflineMode;
    },
    setOfflineMode: (state, action: PayloadAction<boolean>) => {
      state.isOfflineMode = action.payload;
    },
    addToFavorites: (state, action: PayloadAction<FavoriteItem>) => {
      const property = action.payload;
      if (!state.favorites.find(f => f.id === property.id)) {
        state.favorites.push(property);
      }
    },
    removeFromFavorites: (state, action: PayloadAction<string>) => {
      const propertyId = action.payload;
      state.favorites = state.favorites.filter(f => f.id !== propertyId);
    },
    addToRecentlyViewed: (state, action: PayloadAction<RecentlyViewedItem>) => {
      const property = action.payload;
      state.recentlyViewed = [
        property,
        ...state.recentlyViewed.filter(p => p.id !== property.id),
      ].slice(0, 10);
    },
    setNotifications: (state, action: PayloadAction<NotificationState>) => {
      state.notifications = action.payload;
    },
    markNotificationRead: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      const notification = state.notifications.items.find(n => n.id === id);
      if (notification) {
        notification.read = true;
        state.notifications.unreadCount = Math.max(0, state.notifications.unreadCount - 1);
      }
    },
    clearAllNotifications: state => {
      state.notifications.items = [];
      state.notifications.unreadCount = 0;
    },
    setLoading: (state, action: PayloadAction<{ key: string; loading: boolean }>) => {
      const { key, loading } = action.payload;
      state.loading[key] = loading;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    clearError: state => {
      state.error = null;
    },
    refreshDashboardData(state) {
      state.properties = mockProperties;
      state.leads = mockLeads;
      state.contracts = mockRegulatoryContracts;
    },
    updatePropertyStatus(state, action: PayloadAction<{ id: string; status: Property['status'] }>) {
      const { id, status } = action.payload;
      const prop = state.properties.find(p => p.id === id);
      if (prop) {
        prop.status = status;
      }
    },
    filterLeadsByStatus(state, action: PayloadAction<Lead['status']>) {
      const status = action.payload;
      state.leads = mockLeads.filter(lead => lead.status === status);
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchDashboardMetrics.pending, state => {
        state.loading.metrics = true;
        state.error = null;
      })
      .addCase(fetchDashboardMetrics.fulfilled, (state, action) => {
        const { role, data } = action.payload;
        state.metrics[role] = data;
        state.loading.metrics = false;
      })
      .addCase(fetchDashboardMetrics.rejected, (state, action) => {
        state.loading.metrics = false;
        state.error = action.payload || 'Unknown error';
      })
      // ── Favorites thunks ─────────────────────────────────────────────
      .addCase(fetchFavoriteIdsThunk.pending, state => {
        state.favoritesLoading = true;
      })
      .addCase(fetchFavoriteIdsThunk.fulfilled, (state, action) => {
        state.favoriteIds = action.payload;
        state.favoritesLoading = false;
      })
      .addCase(fetchFavoriteIdsThunk.rejected, state => {
        state.favoritesLoading = false;
      })
      .addCase(fetchFavoritesThunk.pending, state => {
        state.favoritesLoading = true;
      })
      .addCase(fetchFavoritesThunk.fulfilled, (state, action) => {
        state.favorites = action.payload.data.map(rec => ({
          id: rec.propertyId,
          title: rec.property?.title ?? '',
          location: rec.property?.location ?? '',
          price: String(rec.property?.price ?? ''),
          image: rec.property?.images?.[0],
        }));
        state.favoriteIds = action.payload.data.map(rec => rec.propertyId);
        state.favoritesLoading = false;
      })
      .addCase(fetchFavoritesThunk.rejected, state => {
        state.favoritesLoading = false;
      })
      .addCase(addFavoriteThunk.fulfilled, (state, action) => {
        const { propertyId, item } = action.payload;
        if (!state.favorites.find(f => f.id === propertyId)) {
          state.favorites.push(item);
        }
        if (!state.favoriteIds.includes(propertyId)) {
          state.favoriteIds.push(propertyId);
        }
      })
      .addCase(removeFavoriteThunk.fulfilled, (state, action) => {
        const propertyId = action.payload;
        state.favorites = state.favorites.filter(f => f.id !== propertyId);
        state.favoriteIds = state.favoriteIds.filter(id => id !== propertyId);
      })
      .addCase(logout, () => initialState);
  },
});

export const {
  setActiveTab,
  setFilter,
  clearFilter,
  setMetrics,
  addToFavorites,
  removeFromFavorites,
  addToRecentlyViewed,
  setNotifications,
  markNotificationRead,
  clearAllNotifications,
  setLoading,
  setError,
  clearError,
  toggleOfflineMode,
  setOfflineMode,
  refreshDashboardData,
  updatePropertyStatus,
  filterLeadsByStatus,
} = dashboardSlice.actions;

export default dashboardSlice.reducer;

