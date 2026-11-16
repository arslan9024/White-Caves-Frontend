/**
 * Enhanced Real API Hooks
 * Optimized hooks with caching, dedup, and performance monitoring support
 */

import { useDispatch, useSelector } from 'react-redux';
import { useCallback, useEffect } from 'react';
import {
  fetchAllDepartments,
  fetchDepartmentData,
  fetchDepartmentKPIs,
  fetchDepartmentTrends,
  fetchDepartmentSummary,
  selectDepartments,
  selectDepartmentData,
  selectDepartmentKPIs,
  selectDepartmentTrends,
  selectDepartmentSummaries,
  selectDepartmentLoading,
  selectDepartmentsFetchError,
  selectDepartmentDataError,
  selectDepartmentKPIsError,
  selectDepartmentTrendsError,
  selectDepartmentSummaryError,
  clearError,
} from '../store/slices/departmentSlice';
import { PaginationParams } from '../services/apiOptimizer';
import type { RootState } from '../store/store';

export {
  usePerformanceStats,
  useCacheManagement,
  useBatchFetchDepartments,
} from './useOptimizedCacheHooks';

/**
 * Enhanced hook to fetch and manage all departments
 */
export const useDepartmentsOptimized = (forceRefresh = false) => {
  const dispatch = useDispatch();
  const departments = useSelector(selectDepartments);
  const loading = useSelector((state: RootState) => selectDepartmentLoading(state).departments);
  const error = useSelector(selectDepartmentsFetchError);

  useEffect(() => {
    if ((departments.length === 0 || forceRefresh) && !loading) {
      dispatch(fetchAllDepartments(forceRefresh) as any);
    }
  }, [dispatch, departments.length, loading, forceRefresh]);

  const clearDepartmentError = useCallback(() => {
    dispatch(clearError('departments') as any);
  }, [dispatch]);

  const refresh = useCallback(() => {
    dispatch(fetchAllDepartments(true) as any);
  }, [dispatch]);

  return {
    departments,
    loading,
    error,
    clearError: clearDepartmentError,
    refresh,
  };
};

/**
 * Enhanced hook to fetch and manage department data
 */
export const useDepartmentDataOptimized = (code: string | null, forceRefresh = false) => {
  const dispatch = useDispatch();
  const departmentData = useSelector(selectDepartmentData);
  const data = code ? departmentData[code] : null;
  const loading = useSelector((state: RootState) => selectDepartmentLoading(state).data);
  const error = useSelector(selectDepartmentDataError);

  useEffect(() => {
    if (code && (!data || forceRefresh)) {
      dispatch(fetchDepartmentData({ code, forceRefresh }) as any);
    }
  }, [code, dispatch, data, forceRefresh]);

  const clearDataError = useCallback(() => {
    dispatch(clearError('data') as any);
  }, [dispatch]);

  const refresh = useCallback(() => {
    if (code) {
      dispatch(fetchDepartmentData({ code, forceRefresh: true }) as any);
    }
  }, [code, dispatch]);

  return {
    data,
    loading,
    error,
    clearError: clearDataError,
    refresh,
    isLoaded: !!data,
  };
};

/**
 * Enhanced hook to fetch and manage department KPIs with pagination
 */
export const useDepartmentKPIsOptimized = (
  code: string | null,
  pagination?: PaginationParams,
  forceRefresh = false
) => {
  const dispatch = useDispatch();
  const kpisMap = useSelector(selectDepartmentKPIs);
  const kpis = code ? kpisMap[code] || [] : [];
  const loading = useSelector((state: RootState) => selectDepartmentLoading(state).kpis);
  const error = useSelector(selectDepartmentKPIsError);

  useEffect(() => {
    if (code && (!kpis.length || forceRefresh)) {
      dispatch(
        fetchDepartmentKPIs({
          code,
          dateRange: undefined,
          page: pagination?.page || 1,
          pageSize: pagination?.pageSize || 20,
          forceRefresh,
        }) as any
      );
    }
  }, [code, pagination?.page, pagination?.pageSize, dispatch, kpis.length, forceRefresh]);

  const clearKPIError = useCallback(() => {
    dispatch(clearError('kpis') as any);
  }, [dispatch]);

  const refresh = useCallback(() => {
    if (code) {
      dispatch(
        fetchDepartmentKPIs({
          code,
          page: pagination?.page || 1,
          pageSize: pagination?.pageSize || 20,
          forceRefresh: true,
        }) as any
      );
    }
  }, [code, pagination, dispatch]);

  return {
    kpis,
    loading,
    error,
    clearError: clearKPIError,
    refresh,
    isEmpty: kpis.length === 0,
  };
};

/**
 * Enhanced hook to fetch and manage department trends with pagination
 */
export const useDepartmentTrendsOptimized = (
  code: string | null,
  timeframe: 'daily' | 'weekly' | 'monthly' | 'yearly' = 'monthly',
  pagination?: PaginationParams,
  forceRefresh = false
) => {
  const dispatch = useDispatch();
  const trendsMap = useSelector(selectDepartmentTrends);
  const trends = code ? trendsMap[code] || [] : [];
  const loading = useSelector((state: RootState) => selectDepartmentLoading(state).trends);
  const error = useSelector(selectDepartmentTrendsError);

  useEffect(() => {
    if (code && (!trends.length || forceRefresh)) {
      dispatch(
        fetchDepartmentTrends({
          code,
          timeframe,
          page: pagination?.page || 1,
          pageSize: pagination?.pageSize || 50,
          forceRefresh,
        }) as any
      );
    }
  }, [
    code,
    timeframe,
    pagination?.page,
    pagination?.pageSize,
    dispatch,
    trends.length,
    forceRefresh,
  ]);

  const clearTrendError = useCallback(() => {
    dispatch(clearError('trends') as any);
  }, [dispatch]);

  const refresh = useCallback(() => {
    if (code) {
      dispatch(
        fetchDepartmentTrends({
          code,
          timeframe,
          page: pagination?.page || 1,
          pageSize: pagination?.pageSize || 50,
          forceRefresh: true,
        }) as any
      );
    }
  }, [code, timeframe, pagination, dispatch]);

  return {
    trends,
    loading,
    error,
    clearError: clearTrendError,
    refresh,
    isEmpty: trends.length === 0,
  };
};

/**
 * Hook to manage department summary
 */
export const useDepartmentSummaryOptimized = (code: string | null, forceRefresh = false) => {
  const dispatch = useDispatch();
  const summariesMap = useSelector(selectDepartmentSummaries);
  const summary = code ? summariesMap[code] : null;
  const loading = useSelector((state: RootState) => selectDepartmentLoading(state).summary);
  const error = useSelector(selectDepartmentSummaryError);

  useEffect(() => {
    if (code && (!summary || forceRefresh)) {
      dispatch(fetchDepartmentSummary(code) as any);
    }
  }, [code, dispatch, summary, forceRefresh]);

  const clearSummaryError = useCallback(() => {
    dispatch(clearError('summary') as any);
  }, [dispatch]);

  const refresh = useCallback(() => {
    if (code) {
      dispatch(fetchDepartmentSummary(code) as any);
    }
  }, [code, dispatch]);

  return {
    summary,
    loading,
    error,
    clearError: clearSummaryError,
    refresh,
  };
};

// Export original hooks for backward compatibility
export {
  useDepartments,
  useDepartmentData,
  useDepartmentKPIs,
  useDepartmentTrends,
  useDepartmentSummary,
} from './useRealAPI';

