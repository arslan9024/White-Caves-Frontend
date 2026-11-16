import type { PerformanceBaseline } from './performanceBaseline.types';

/**
 * Performance baselines for the dashboard
 * All targets are based on real-world testing and user expectations
 */
export const PERFORMANCE_BASELINES: PerformanceBaseline[] = [
  {
    name: 'Initial Data Load',
    metric: 'initialLoadTime',
    target: 2000,
    unit: 'ms',
    threshold: 'hard',
    description: 'Time to load and display first set of KPI cards',
  },
  {
    name: 'Filter Application',
    metric: 'filterApplyTime',
    target: 1000,
    unit: 'ms',
    threshold: 'hard',
    description: 'Time to apply filter and reload data',
  },
  {
    name: 'Data Export',
    metric: 'exportGenerationTime',
    target: 1000,
    unit: 'ms',
    threshold: 'hard',
    description: 'Time to generate and download exported file',
  },
  {
    name: 'Cache Hit Rate',
    metric: 'cacheHitRate',
    target: 70,
    unit: '%',
    threshold: 'soft',
    description: 'Percentage of requests served from cache',
  },
  {
    name: 'Request Deduplication',
    metric: 'deduplicationRate',
    target: 80,
    unit: '%',
    threshold: 'soft',
    description: 'Percentage of duplicate requests eliminated',
  },
  {
    name: 'Memory Usage',
    metric: 'memoryUsage',
    target: 50,
    unit: 'MB',
    threshold: 'soft',
    description: 'Peak memory usage during normal operations',
  },
  {
    name: 'API Error Rate',
    metric: 'errorRate',
    target: 1,
    unit: '%',
    threshold: 'hard',
    description: 'Percentage of API requests that fail',
  },
  {
    name: 'Average Response Time',
    metric: 'averageResponseTime',
    target: 500,
    unit: 'ms',
    threshold: 'hard',
    description: 'Average API response time',
  },
  {
    name: 'P95 Response Time',
    metric: 'p95ResponseTime',
    target: 1500,
    unit: 'ms',
    threshold: 'soft',
    description: '95th percentile of API response times',
  },
  {
    name: 'P99 Response Time',
    metric: 'p99ResponseTime',
    target: 3000,
    unit: 'ms',
    threshold: 'soft',
    description: '99th percentile of API response times',
  },
];

