export interface ApiEndpoint {
  path: string;
  method: string;
  avgTime: number;
  successRate: number;
  calls: number;
  cached: boolean;
}

export interface DatabaseMetrics {
  connections: {
    current: number;
    max: number;
    available: number;
  };
  queryPerformance: {
    avgTime: number;
    slowQueries: number;
    indexHits: number;
  };
  storage: {
    used: number;
    total: number;
    percentage: number;
  };
  operations: {
    reads: number;
    writes: number;
    updates: number;
    deletes: number;
  };
}

export interface CacheStats {
  hitRate: number;
  missRate: number;
  totalHits: number;
  totalMisses: number;
  memoryUsed: number;
  memoryTotal: number;
  ttlAvg: number;
}

export interface SecurityCheck {
  name: string;
  status: 'pass' | 'warning' | 'fail' | string;
  lastCheck: string;
}

export interface RealtimeConnection {
  type: string;
  active: number;
  peak: number;
  status: 'healthy' | 'degraded' | 'down' | string;
}

export interface ApiStatsSummary {
  totalCalls: number;
  avgResponseTime: number;
  avgSuccessRate: string;
  cachedEndpoints: number;
}
