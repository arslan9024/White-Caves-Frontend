/**
 * departmentKPIConfigs.ts
 * Department KPI Configurations and Definitions
 */

export interface DepartmentKPIConfig {
  key: string;
  label: string;
  format?: (value: unknown) => string;
  icon?: string;
  trend?: 'up' | 'down' | 'neutral';
  showProgress?: boolean;
  unit?: string;
}

export const toNumber = (value: unknown): number => {
  const parsed = typeof value === 'number' ? value : Number(value ?? 0);
  return Number.isFinite(parsed) ? parsed : 0;
};

export const toText = (value: unknown): string => String(value ?? '0');

export const salesKPIConfigs: DepartmentKPIConfig[] = [
  {
    key: 'totalLeads',
    label: 'Total Leads',
    icon: '👥',
    trend: 'up',
    format: v => toNumber(v).toLocaleString(),
  },
  {
    key: 'activeDeals',
    label: 'Active Deals',
    icon: '🤝',
    format: v => toText(v),
  },
  {
    key: 'conversionRate',
    label: 'Conversion Rate',
    icon: '📈',
    trend: 'up',
    format: v => `${toNumber(v).toFixed(1)}%`,
    unit: '%',
  },
  {
    key: 'monthlyRevenue',
    label: 'Monthly Revenue',
    icon: '💰',
    trend: 'up',
    format: v => `₹${(toNumber(v) / 1000000).toFixed(1)}M`,
  },
];

export const financeKPIConfigs: DepartmentKPIConfig[] = [
  {
    key: 'totalBudget',
    label: 'Total Budget',
    icon: '💵',
    format: v => `₹${(toNumber(v) / 1000000).toFixed(2)}M`,
  },
  {
    key: 'spent',
    label: 'Amount Spent',
    icon: '💸',
    trend: 'down',
    format: v => `₹${(toNumber(v) / 1000000).toFixed(2)}M`,
  },
  {
    key: 'remaining',
    label: 'Remaining Budget',
    icon: '🏦',
    trend: 'up',
    format: v => `₹${(toNumber(v) / 1000000).toFixed(2)}M`,
  },
  {
    key: 'utilizationRate',
    label: 'Budget Utilization',
    icon: '📊',
    showProgress: true,
    format: v => `${toNumber(v).toFixed(0)}%`,
    unit: '%',
  },
];

export const hrKPIConfigs: DepartmentKPIConfig[] = [
  {
    key: 'totalEmployees',
    label: 'Total Employees',
    icon: '👔',
    format: v => toText(v),
  },
  {
    key: 'activePositions',
    label: 'Open Positions',
    icon: '💼',
    format: v => toText(v),
  },
  {
    key: 'attendanceRate',
    label: 'Attendance Rate',
    icon: '📍',
    trend: 'up',
    format: v => `${toNumber(v).toFixed(1)}%`,
    unit: '%',
  },
  {
    key: 'turnoverRate',
    label: 'Turnover Rate',
    icon: '📊',
    trend: 'down',
    format: v => `${toNumber(v).toFixed(1)}%`,
    unit: '%',
  },
];

export const marketingKPIConfigs: DepartmentKPIConfig[] = [
  {
    key: 'campaigns',
    label: 'Active Campaigns',
    icon: '📢',
    format: v => toText(v),
  },
  {
    key: 'engagement',
    label: 'Engagement Rate',
    icon: '💬',
    trend: 'up',
    format: v => `${toNumber(v).toFixed(2)}%`,
    unit: '%',
  },
  {
    key: 'reach',
    label: 'Total Reach',
    icon: '📱',
    format: v => `${(toNumber(v) / 1000).toFixed(1)}K`,
  },
  {
    key: 'roi',
    label: 'Campaign ROI',
    icon: '💹',
    trend: 'up',
    format: v => `${toNumber(v).toFixed(1)}%`,
    unit: '%',
  },
];

export const operationsKPIConfigs: DepartmentKPIConfig[] = [
  {
    key: 'processCompleted',
    label: 'Processes Completed',
    icon: '✅',
    trend: 'up',
    format: v => toText(v),
  },
  {
    key: 'efficiency',
    label: 'Efficiency Rate',
    icon: '⚙️',
    trend: 'up',
    format: v => `${toNumber(v).toFixed(1)}%`,
    unit: '%',
  },
  {
    key: 'downtimeMinutes',
    label: 'Downtime',
    icon: '⏱️',
    trend: 'down',
    format: v => `${toText(v)} min`,
  },
  {
    key: 'costPerProcess',
    label: 'Cost Per Process',
    icon: '₹',
    trend: 'down',
    format: v => `₹${toNumber(v).toFixed(2)}`,
  },
];

export const itKPIConfigs: DepartmentKPIConfig[] = [
  {
    key: 'systemUptime',
    label: 'System Uptime',
    icon: '🖥️',
    trend: 'up',
    showProgress: true,
    format: v => `${toNumber(v).toFixed(2)}%`,
    unit: '%',
  },
  {
    key: 'ticketsResolved',
    label: 'Tickets Resolved',
    icon: '🎫',
    format: v => toText(v),
  },
  {
    key: 'avgResolutionTime',
    label: 'Avg Resolution Time',
    icon: '⏰',
    trend: 'down',
    format: v => `${toText(v)} hrs`,
  },
  {
    key: 'securityIncidents',
    label: 'Security Incidents',
    icon: '🔒',
    trend: 'down',
    format: v => toText(v),
  },
];

export const clientServicesKPIConfigs: DepartmentKPIConfig[] = [
  {
    key: 'activeClients',
    label: 'Active Clients',
    icon: '🤝',
    trend: 'up',
    format: v => toText(v),
  },
  {
    key: 'satisfactionScore',
    label: 'Satisfaction Score',
    icon: '⭐',
    trend: 'up',
    format: v => `${toNumber(v).toFixed(1)}/10`,
  },
  {
    key: 'ticketsOpen',
    label: 'Open Tickets',
    icon: '🎫',
    format: v => toText(v),
  },
  {
    key: 'responseTime',
    label: 'Avg Response Time',
    icon: '⏱️',
    trend: 'down',
    format: v => `${toText(v)} min`,
  },
];

export const propertyKPIConfigs: DepartmentKPIConfig[] = [
  {
    key: 'totalProperties',
    label: 'Total Properties',
    icon: '🏢',
    format: v => toText(v),
  },
  {
    key: 'occupancyRate',
    label: 'Occupancy Rate',
    icon: '🏠',
    trend: 'up',
    showProgress: true,
    format: v => `${toNumber(v).toFixed(1)}%`,
    unit: '%',
  },
  {
    key: 'maintenanceRequests',
    label: 'Pending Maintenance',
    icon: '🔧',
    format: v => toText(v),
  },
  {
    key: 'monthlyRevenue',
    label: 'Monthly Revenue',
    icon: '💰',
    trend: 'up',
    format: v => `₹${(toNumber(v) / 100000).toFixed(1)}L`,
  },
];
