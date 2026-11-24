import { useMemo } from 'react';
import { API_ENDPOINTS } from './data';
import type { ApiStatsSummary } from './types';

export const useWillowBackendCRM = () => {
  const apiStats = useMemo<ApiStatsSummary>(
    () => ({
      totalCalls: API_ENDPOINTS.reduce((sum, e) => sum + e.calls, 0),
      avgResponseTime: Math.round(
        API_ENDPOINTS.reduce((sum, e) => sum + e.avgTime, 0) / API_ENDPOINTS.length
      ),
      avgSuccessRate: (
        API_ENDPOINTS.reduce((sum, e) => sum + e.successRate, 0) / API_ENDPOINTS.length
      ).toFixed(2),
      cachedEndpoints: API_ENDPOINTS.filter(e => e.cached).length,
    }),
    []
  );

  return {
    apiStats,
  };
};
