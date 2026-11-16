import { MaintenancePriority, MaintenanceStatus } from '../data/leasing';

export interface MaintenanceTabProps {
  requests: any[];
  onUpdateStatus?: (id: number, status: MaintenanceStatus) => void;
}

export const PRIORITY_ORDER: MaintenancePriority[] = ['critical', 'high', 'medium', 'low'];

export const PRIORITY_COLORS: Record<MaintenancePriority, { bg: string; text: string }> = {
  critical: { bg: 'rgba(239,68,68,0.15)', text: '#EF4444' },
  high: { bg: 'rgba(245,158,11,0.15)', text: '#F59E0B' },
  medium: { bg: 'rgba(99,102,241,0.15)', text: '#818CF8' },
  low: { bg: 'rgba(100,116,139,0.15)', text: '#94A3B8' },
};

export const STATUS_COLORS: Record<MaintenanceStatus, { bg: string; text: string }> = {
  pending: { bg: 'rgba(245,158,11,0.15)', text: '#F59E0B' },
  in_progress: { bg: 'rgba(59,130,246,0.15)', text: '#60A5FA' },
  scheduled: { bg: 'rgba(99,102,241,0.15)', text: '#818CF8' },
  completed: { bg: 'rgba(16,185,129,0.15)', text: '#10B981' },
  cancelled: { bg: 'rgba(100,116,139,0.15)', text: '#64748B' },
};

export const CATEGORY_COLORS: Record<string, string> = {
  HVAC: '#14B8A6',
  Plumbing: '#3B82F6',
  Electrical: '#F59E0B',
  Structural: '#EF4444',
  Landscaping: '#10B981',
};

export type FilterPriority = MaintenancePriority | 'all';
export type FilterStatus = MaintenanceStatus | 'all';

