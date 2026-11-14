export interface ComponentItem {
  name: string;
  category: string;
  usage: number;
  status: 'stable' | 'new';
  a11y: string;
}

export interface PerformanceMetric {
  metric: string;
  value: number | string;
  target: number | string;
  trend: 'up' | 'down' | 'stable';
}

export interface AccessibilityAuditItem {
  category: string;
  score: number;
  issues: number;
  status: 'pass' | 'warning';
}

export interface ComponentStats {
  total: number;
  stable: number;
  new: number;
  totalUsage: number;
}
