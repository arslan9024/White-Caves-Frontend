/**
 * Aurora Technical Dashboard — Data Layer (Mary Allen Wilkes Architecture)
 * Default system health metrics, trend mocks, services lists, and active alerts
 * Strictly < 350 lines
 */

import type {
  LatencyDataPoint,
  ErrorRateDataPoint,
  ServiceHealthPoint,
  ConcurrentUsersPoint,
  ApiEndpointPerformance,
  TechnicalAlert,
  TechnicalServiceStatus,
} from './AuroraTechnicalDashboard.types';

export const LATENCY_TREND: LatencyDataPoint[] = [
  { time: '8:00 AM', api: 420, db: 35, avg: 428 },
  { time: '9:00 AM', api: 450, db: 42, avg: 456 },
  { time: '10:00 AM', api: 480, db: 48, avg: 488 },
  { time: '11:00 AM', api: 520, db: 55, avg: 530 },
  { time: '12:00 PM', api: 510, db: 52, avg: 520 },
  { time: '1:00 PM', api: 490, db: 48, avg: 498 },
  { time: '2:00 PM', api: 475, db: 45, avg: 482 },
  { time: '3:00 PM', api: 460, db: 42, avg: 467 },
];

export const ERROR_RATE_TREND: ErrorRateDataPoint[] = [
  { time: '8:00 AM', rate: 0.3, threshold: 0.5 },
  { time: '9:00 AM', rate: 0.35, threshold: 0.5 },
  { time: '10:00 AM', rate: 0.4, threshold: 0.5 },
  { time: '11:00 AM', rate: 0.45, threshold: 0.5 },
  { time: '12:00 PM', rate: 0.4, threshold: 0.5 },
  { time: '1:00 PM', rate: 0.35, threshold: 0.5 },
  { time: '2:00 PM', rate: 0.3, threshold: 0.5 },
  { time: '3:00 PM', rate: 0.25, threshold: 0.5 },
];

export const SERVICE_HEALTH: ServiceHealthPoint[] = [
  { name: 'Healthy', value: 10, color: '#10b981' },
  { name: 'Degraded', value: 1, color: '#fb923c' },
];

export const CONCURRENT_USERS_TREND: ConcurrentUsersPoint[] = [
  { time: '8:00 AM', users: 25, capacity: 100 },
  { time: '9:00 AM', users: 30, capacity: 100 },
  { time: '10:00 AM', users: 35, capacity: 100 },
  { time: '11:00 AM', users: 40, capacity: 100 },
  { time: '12:00 PM', users: 45, capacity: 100 },
  { time: '1:00 PM', users: 50, capacity: 100 },
  { time: '2:00 PM', users: 55, capacity: 100 },
  { time: '3:00 PM', users: 65, capacity: 100 },
];

export const API_PERFORMANCE: ApiEndpointPerformance[] = [
  { endpoint: '/auth/login', latency: 180, errorRate: 0.2, throughput: 450 },
  { endpoint: '/properties', latency: 220, errorRate: 0.3, throughput: 380 },
  { endpoint: '/leads', latency: 150, errorRate: 0.1, throughput: 520 },
  { endpoint: '/viewings/schedule', latency: 200, errorRate: 0.2, throughput: 280 },
  { endpoint: '/negotiations/create', latency: 210, errorRate: 0.15, throughput: 150 },
  { endpoint: '/documents/upload', latency: 300, errorRate: 0.4, throughput: 80 },
  { endpoint: '/messages/send', latency: 120, errorRate: 0.1, throughput: 920 },
  { endpoint: '/analytics/reports', latency: 600, errorRate: 0.5, throughput: 45 },
  { endpoint: '/webauthn/verify', latency: 280, errorRate: 0.3, throughput: 200 },
  { endpoint: '/system/health', latency: 45, errorRate: 0.05, throughput: 2000 },
];

export const TECHNICAL_ALERTS: TechnicalAlert[] = [
  {
    id: 'ALERT-001',
    severity: 'warning',
    service: 'Analytics Service',
    message: 'Report generation time >1s',
    timestamp: '14:32:15',
  },
  {
    id: 'ALERT-002',
    severity: 'info',
    service: 'MongoDB',
    message: 'Connection pool 70% utilized',
    timestamp: '14:25:42',
  },
];

export const TECHNICAL_SERVICES: TechnicalServiceStatus[] = [
  { name: 'Property Sourcing', status: 'healthy', latency: 120, errorRate: 0.1 },
  { name: 'Lead Management', status: 'healthy', latency: 95, errorRate: 0.05 },
  { name: 'Viewing Coordination', status: 'healthy', latency: 110, errorRate: 0.1 },
  { name: 'Negotiation Management', status: 'healthy', latency: 130, errorRate: 0.1 },
  { name: 'Document Management', status: 'healthy', latency: 150, errorRate: 0.2 },
  { name: 'Communication Service', status: 'healthy', latency: 100, errorRate: 0.05 },
  { name: 'Analytics Service', status: 'degraded', latency: 200, errorRate: 0.5 },
  { name: 'Authentication Service', status: 'healthy', latency: 80, errorRate: 0.05 },
  { name: 'API Gateway', status: 'healthy', latency: 50, errorRate: 0.02 },
  { name: 'WebAuthn Service', status: 'healthy', latency: 90, errorRate: 0.15 },
  { name: 'Session Management', status: 'healthy', latency: 70, errorRate: 0.03 },
];
