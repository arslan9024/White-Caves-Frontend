export interface PerformanceBaseline {
  name: string;
  metric: string;
  target: number;
  unit: string;
  threshold: 'hard' | 'soft'; // hard = must meet, soft = warning
  description: string;
}

export interface PerformanceMetrics {
  initialLoadTime: number;
  filterApplyTime: number;
  exportGenerationTime: number;
  cacheHitRate: number;
  deduplicationRate: number;
  memoryUsage: number;
  errorRate: number;
  averageResponseTime: number;
  p95ResponseTime: number;
  p99ResponseTime: number;
}

export interface BaselineComparisonResult {
  baseline: PerformanceBaseline;
  actual: number;
  passed: boolean;
  difference: number;
  percentDifference: number;
}

