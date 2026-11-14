import { useCallback, useEffect, useState } from 'react';
import { apiIntegration } from '../services/apiIntegration';
import { DepartmentData } from '../services/departmentService';

/**
 * Hook to get performance statistics
 */
export const usePerformanceStats = () => {
  const [stats, setStats] = useState(apiIntegration.getPerformanceStats());

  useEffect(() => {
    const interval = setInterval(() => {
      setStats(apiIntegration.getPerformanceStats());
    }, 5000);

    setStats(apiIntegration.getPerformanceStats());

    return () => clearInterval(interval);
  }, []);

  return stats;
};

/**
 * Hook to manage cache
 */
export const useCacheManagement = () => {
  const clearCache = useCallback((pattern?: string) => {
    apiIntegration.clearCache(pattern);
  }, []);

  const getCacheInfo = useCallback(() => {
    return apiIntegration.getCacheInfo();
  }, []);

  const getCacheStats = useCallback(() => {
    return apiIntegration.getCacheInfo();
  }, []);

  return {
    clearCache,
    getCacheInfo,
    getCacheStats,
  };
};

/**
 * Hook to batch fetch departments
 */
export const useBatchFetchDepartments = (codes: string[], forceRefresh = false) => {
  const [data, setData] = useState<Map<string, DepartmentData> | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const result = await apiIntegration.batchFetchDepartments(codes, forceRefresh);
        setData(result);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error(String(err)));
        setData(null);
      } finally {
        setIsLoading(false);
      }
    };

    if (codes.length > 0) {
      fetchData();
    }
  }, [codes, forceRefresh]);

  return {
    data,
    loading: isLoading,
    error,
  };
};
