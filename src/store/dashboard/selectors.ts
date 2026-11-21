import { createSelector } from "@reduxjs/toolkit";
import type { DashboardState, FavoriteItem } from "./types";


export const selectFavorites = createSelector(
  (state: { dashboard?: DashboardState }) => state.dashboard?.favorites,
  (favorites): FavoriteItem[] => favorites || [],
  {
    devModeChecks: {
      identityFunctionCheck: 'never',
    },
  }
);
export const selectFavoriteIds = createSelector(
  (state: { dashboard?: DashboardState }) => state.dashboard?.favoriteIds,
  (ids): string[] => ids || [],
  {
    devModeChecks: {
      identityFunctionCheck: 'never',
    },
  }
);
export const selectFavoritesLoading = (state: { dashboard?: DashboardState }) =>
  state.dashboard?.favoritesLoading ?? false;
export const selectNotifications = (state: { dashboard?: DashboardState }) =>
  state.dashboard?.notifications;

// NOTE: Unused selectors removed in Round 124 dead-code cleanup.
// Re-add if needed: selectActiveTab, selectFilter, selectMetrics, selectRecentlyViewed, selectIsLoading


