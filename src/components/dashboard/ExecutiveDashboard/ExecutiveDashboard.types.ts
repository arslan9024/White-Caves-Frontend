/**
 * Executive Dashboard — Types Layer (Mary Allen Wilkes Architecture)
 * Strict TypeScript types for KPI, Metrics, Activities, and Alert Models
 * Strictly < 350 lines
 */

import type { LucideIcon } from 'lucide-react';

export interface KPIItem {
  label: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'neutral';
  color: string;
  icon: LucideIcon;
}

export interface TeamMetric {
  name: string;
  role: string;
  status: string;
  [key: string]: string | number;
}

export interface DepartmentMetric {
  name: string;
  kpis: string;
  value: number;
  target: number;
  color: string;
}

export interface RevenueMetric {
  month: string;
  revenue: number;
  target: number;
  expense: number;
}

export interface LeadQualityMetric {
  name: string;
  value: number;
  color: string;
}

export interface DashboardAlert {
  id: number;
  type: 'critical' | 'warning' | 'info' | 'success';
  title: string;
  message: string;
  timestamp: string;
  action: string;
}

export interface MeetingItem {
  id: number;
  title: string;
  attendees: string[];
  time: string;
  date: string;
  duration: string;
}

export interface ActivityItem {
  id: number;
  actor: string;
  action: string;
  target: string;
  value?: string;
  count?: string;
  timestamp: string;
}

export type TimeRange = 'day' | 'week' | 'month' | 'quarter' | 'year';
export type DashboardTab = 'overview' | 'analytics' | 'team' | 'alerts';

