/**
 * Aurora Technical Dashboard — Types Layer (Mary Allen Wilkes Architecture)
 * Strict TypeScript types for technical monitoring, latencies, alerts, and services
 * Strictly < 350 lines
 */

export interface LatencyDataPoint {
  time: string;
  api: number;
  db: number;
  avg: number;
}

export interface ErrorRateDataPoint {
  time: string;
  rate: number;
  threshold: number;
}

export interface ServiceHealthPoint {
  name: string;
  value: number;
  color: string;
}

export interface ConcurrentUsersPoint {
  time: string;
  users: number;
  capacity: number;
}

export interface ApiEndpointPerformance {
  endpoint: string;
  latency: number;
  errorRate: number;
  throughput: number;
}

export interface TechnicalAlert {
  id: string;
  severity: 'warning' | 'info' | 'critical';
  service: string;
  message: string;
  timestamp: string;
}

export interface TechnicalServiceStatus {
  name: string;
  status: 'healthy' | 'degraded';
  latency: number;
  errorRate: number;
}

export type AuroraTab = 'health' | 'services' | 'apis' | 'alerts';
