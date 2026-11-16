import { createAsyncThunk } from "@reduxjs/toolkit";
import { authFetch } from "../../utils/authFetch";
import { getErrorMessage } from "../../constants";
import * as favoritesApi from "../../services/favoritesApi";
import {
  Property,
  Lead,
  RegulatoryContract,
  mockProperties,
  mockLeads,
  mockRegulatoryContracts,
} from "../../mocks/dubaiRealEstateMocks";
import type {
  FavoriteItem,
  DashboardState,
} from "./types";


interface FetchMetricsPayload {
  role: string;
  data: Record<string, unknown>;
}

export const fetchDashboardMetrics = createAsyncThunk<
  FetchMetricsPayload,
  string,
  { state: { dashboard: DashboardState }; rejectValue: string }
>('dashboard/fetchMetrics', async (role, { getState, rejectWithValue }) => {
  const isOfflineMode = getState().dashboard.isOfflineMode;
  if (isOfflineMode) {
    return { role, data: { offlineSimulated: true, generatedAt: new Date().toISOString() } };
  }
  try {
    const response = await authFetch(`/api/dashboard/${role}/metrics`);
    if (!response.ok) {
      throw new Error('Failed to fetch metrics');
    }
    return { role, data: await response.json() };
  } catch (error: unknown) {
    const message = getErrorMessage(error, 'Failed to fetch metrics');
    return rejectWithValue(message);
  }
});

// ─── Favorites Async Thunks (API-backed) ─────────────────────────────────────

/** Fetch all favorite IDs (lightweight — for heart toggle state) */
export const fetchFavoriteIdsThunk = createAsyncThunk<string[], void, { state: { dashboard: DashboardState }; rejectValue: string }>(
  'dashboard/fetchFavoriteIds',
  async (_, { getState, rejectWithValue }) => {
    if (getState().dashboard.isOfflineMode) return [];
    try {
      return await favoritesApi.fetchFavoriteIds();
    } catch (error: unknown) {
      const message = getErrorMessage(error, 'Failed to fetch favorites');
      return rejectWithValue(message);
    }
  }
);

/** Fetch full favorites with property data (for FavoriteListings page) */
export const fetchFavoritesThunk = createAsyncThunk<
  favoritesApi.PaginatedFavorites,
  { page?: number; pageSize?: number } | void,
  { state: { dashboard: DashboardState }; rejectValue: string }
>('dashboard/fetchFavorites', async (params, { getState, rejectWithValue }) => {
  if (getState().dashboard.isOfflineMode) return { data: [], pagination: { page: 1, pageSize: 20, total: 0, totalPages: 0 } };
  try {
    const page = params && 'page' in params ? params.page : 1;
    const pageSize = params && 'pageSize' in params ? params.pageSize : 20;
    return await favoritesApi.fetchFavorites(page, pageSize);
  } catch (error: unknown) {
    const message = getErrorMessage(error, 'Failed to fetch favorites');
    return rejectWithValue(message);
  }
});

/** Add a property to favorites via API */
export const addFavoriteThunk = createAsyncThunk<
  { propertyId: string; item: FavoriteItem },
  FavoriteItem,
  { state: { dashboard: DashboardState }; rejectValue: string }
>('dashboard/addFavorite', async (item, { getState, rejectWithValue }) => {
  if (getState().dashboard.isOfflineMode) return { propertyId: item.id, item };
  try {
    await favoritesApi.addFavorite(item.id);
    return { propertyId: item.id, item };
  } catch (error: unknown) {
    const message = getErrorMessage(error, 'Failed to add favorite');
    return rejectWithValue(message);
  }
});

/** Remove a property from favorites via API */
export const removeFavoriteThunk = createAsyncThunk<string, string, { state: { dashboard: DashboardState }; rejectValue: string }>(
  'dashboard/removeFavorite',
  async (propertyId, { getState, rejectWithValue }) => {
    if (getState().dashboard.isOfflineMode) return propertyId;
    try {
      await favoritesApi.removeFavorite(propertyId);
      return propertyId;
    } catch (error: unknown) {
      const message = getErrorMessage(error, 'Failed to remove favorite');
      return rejectWithValue(message);
    }
  }
);

