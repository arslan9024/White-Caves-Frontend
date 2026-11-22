import type { LucideIcon } from 'lucide-react';

export interface MetricItem {
  label: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'stable';
}

export interface ActionItem {
  label: string;
  icon: LucideIcon;
}

export interface ServiceStat {
  label: string;
  value: string;
}

export interface ServiceContent {
  description: string;
  stats: ServiceStat[];
  actions: ActionItem[];
}

export interface DepartmentContent {
  name: string;
  icon: string;
  color: string;
  bgGradient: string;
  description: string;
  metrics: MetricItem[];
  services: Record<string, ServiceContent>;
}
