/**
 * Load Testing Types, Performance Baselines & Resource Limits
 * Extracted from load-test.config.ts for AEGIS AEG-042 (< 350 lines compliance).
 */

export interface LoadTestScenario {
  name: string;
  description: string;
  duration: number; // seconds
  rampUp: number; // seconds
  virtualUsers: number;
  thinkTime: number; // milliseconds
  endpoints: LoadTestEndpoint[];
  successCriteria: SuccessCriteria;
}

export interface LoadTestEndpoint {
  name: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  path: string;
  weight: number; // percentage of traffic
  body?: Record<string, unknown>;
  headers?: Record<string, string>;
  expectedStatus: number;
}

export interface SuccessCriteria {
  maxResponseTime: number; // ms
  p95ResponseTime: number; // ms
  p99ResponseTime: number; // ms
  errorRate: number; // percentage
  throughput: number; // requests per second
}

export interface LoadTestResults {
  scenario: string;
  timestamp: string;
  duration: number;
  totalRequests: number;
  successfulRequests: number;
  failedRequests: number;
  successRate: number;
  throughput: number;
  avgResponseTime: number;
  minResponseTime: number;
  maxResponseTime: number;
  p50ResponseTime: number;
  p95ResponseTime: number;
  p99ResponseTime: number;
  errors: Record<string, number>;
}

export const PERFORMANCE_BASELINES = {
  healthCheck: { maxTime: 100, avgTime: 50 },
  apiGet: { maxTime: 1000, avgTime: 300 },
  apiPost: { maxTime: 2000, avgTime: 800 },
  database: { maxTime: 500, avgTime: 100 },
  cache: { maxTime: 50, avgTime: 10 },
};

export const RESOURCE_LIMITS = {
  maxMemory: 2048, // MB
  maxCPU: 80, // percentage
  maxConnections: 500,
  maxDatabaseConnections: 100,
};
