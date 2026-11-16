import { createAsyncThunk } from "@reduxjs/toolkit";
import type {
  DateRange,
} from "../../../services/departmentService";
import { apiIntegration } from "../../../services/apiIntegration";

/**
 * Fetch all available departments (with caching and dedup)
 */
export const fetchAllDepartments = createAsyncThunk(
  'departments/fetchAll',
  async (forceRefresh: boolean = false, { rejectWithValue }) => {
    try {
      console.warn('[Redux] Fetching all departments (optimized)...');
      const departments = await apiIntegration.getDepartments(forceRefresh);
      return departments;
    } catch (error: unknown) {
      console.error('[Redux] Error fetching departments:', error);
      const e = error as { error?: string; message?: string };
      return rejectWithValue(e.error || e.message || 'Failed to fetch departments');
    }
  }
);

/**
 * Fetch department data (KPIs, trends, summary) with optimization
 */
export const fetchDepartmentData = createAsyncThunk(
  'departments/fetchData',
  async ({ code, forceRefresh }: { code: string; forceRefresh?: boolean }, { rejectWithValue }) => {
    try {
      console.warn(`[Redux] Fetching data for department: ${code} (optimized)...`);
      const data = await apiIntegration.getDepartmentData(code, forceRefresh);
      return { [code]: data };
    } catch (error: unknown) {
      console.error('[Redux] Error fetching department data:', error);
      const e = error as { error?: string; message?: string };
      return rejectWithValue(e.error || e.message || 'Failed to fetch department data');
    }
  }
);

/**
 * Fetch KPIs for a department (with pagination and caching)
 */
export const fetchDepartmentKPIs = createAsyncThunk(
  'departments/fetchKPIs',
  async (
    {
      code,
      dateRange: _dateRange,
      page = 1,
      pageSize = 20,
      forceRefresh: _forceRefresh,
    }: {
      code: string;
      dateRange?: DateRange;
      page?: number;
      pageSize?: number;
      forceRefresh?: boolean;
    },
    { rejectWithValue }
  ) => {
    try {
      console.warn(`[Redux] Fetching KPIs for department: ${code} (optimized, page ${page})...`);
      const response = await apiIntegration.getDepartmentKPIs(code, {
        page,
        pageSize,
      });
      return { code, kpis: response.data, pagination: response.pagination };
    } catch (error: unknown) {
      console.error('[Redux] Error fetching KPIs:', error);
      const e = error as { error?: string; message?: string };
      return rejectWithValue(e.error || e.message || 'Failed to fetch KPIs');
    }
  }
);

/**
 * Fetch trends for a department (with pagination and caching)
 */
export const fetchDepartmentTrends = createAsyncThunk(
  'departments/fetchTrends',
  async (
    {
      code,
      timeframe = 'monthly',
      page = 1,
      pageSize = 50,
      forceRefresh: _forceRefresh,
    }: {
      code: string;
      timeframe?: 'daily' | 'weekly' | 'monthly' | 'yearly';
      page?: number;
      pageSize?: number;
      forceRefresh?: boolean;
    },
    { rejectWithValue }
  ) => {
    try {
      console.warn(
        `[Redux] Fetching trends for department: ${code}, timeframe: ${timeframe} (optimized)...`
      );
      const response = await apiIntegration.getDepartmentTrends(code, timeframe, {
        page,
        pageSize,
      });
      return {
        code,
        trends: response.data,
        timeframe,
        pagination: response.pagination,
      };
    } catch (error: unknown) {
      console.error('[Redux] Error fetching trends:', error);
      return rejectWithValue(
        (error as { error?: string; message?: string }).error ||
          (error as { error?: string; message?: string }).message ||
          'Failed to fetch trends'
      );
    }
  }
);

/**
 * Fetch summary for a department
 */
export const fetchDepartmentSummary = createAsyncThunk(
  'departments/fetchSummary',
  async (code: string, { rejectWithValue }) => {
    try {
      console.warn(`[Redux] Fetching summary for department: ${code} (optimized)...`);
      const summary = await apiIntegration.getDepartmentData(code).then(data => data?.summary);
      return { code, summary };
    } catch (error: unknown) {
      console.error('[Redux] Error fetching summary:', error);
      return rejectWithValue(
        (error as { error?: string; message?: string }).error ||
          (error as { error?: string; message?: string }).message ||
          'Failed to fetch summary'
      );
    }
  }
);

