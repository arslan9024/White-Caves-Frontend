export type ActivityType = 'create' | 'update' | 'download' | 'system';
export type AdminTabId = 'overview' | 'users' | 'analytics' | 'settings';

export interface DashboardActivity {
  id: string | number;
  user: string;
  action: string;
  time: string;
  type: ActivityType;
}

export interface DashboardUser {
  id: string | number;
  name: string;
  role: string;
  status: string;
  lastActive: string;
}

export interface SystemMetrics {
  totalUsers: number;
  activeUsers: number;
  totalProperties: number;
  activeListings: number;
  totalTransactions: number;
  completedTransactions: number;
  systemHealth: 'excellent' | 'good' | 'warning';
  uptime: number;
  responseTime: number;
  errorRate: number;
}

export interface DashboardSummaryResponse {
  success?: boolean;
  data?: {
    metrics?: {
      totalProperties?: number;
      availableProperties?: number;
      totalCommissions?: number;
      totalCommissionValue?: number;
      paidCommissionValue?: number;
    };
    recentActivities?: Array<{
      id?: string | number;
      type?: string;
      action?: string;
      description?: string;
      timestamp?: string;
      user?: string;
    }>;
  };
}

export interface DashboardActivitiesResponse {
  success?: boolean;
  data?: Array<{
    id?: string | number;
    type?: string;
    action?: string;
    description?: string;
    timestamp?: string;
    user?: string;
  }>;
}

export interface UsersResponse {
  success?: boolean;
  data?: Array<{
    id?: string;
    name?: string;
    role?: string;
    status?: string;
    updatedAt?: string;
    createdAt?: string;
  }>;
}

export const FALLBACK_SYSTEM_METRICS: SystemMetrics = {
  totalUsers: 1243,
  activeUsers: 567,
  totalProperties: 3421,
  activeListings: 1987,
  totalTransactions: 856,
  completedTransactions: 742,
  systemHealth: 'excellent',
  uptime: 99.98,
  responseTime: 142,
  errorRate: 0.02,
};

export const FALLBACK_RECENT_ACTIVITIES: DashboardActivity[] = [
  {
    id: 'activity-1',
    user: 'John Doe',
    action: 'Created new property listing',
    time: '2 hours ago',
    type: 'create',
  },
  {
    id: 'activity-2',
    user: 'Jane Smith',
    action: 'Updated contract terms',
    time: '1 day ago',
    type: 'update',
  },
  {
    id: 'activity-3',
    user: 'Ahmed Hassan',
    action: 'Downloaded monthly report',
    time: '3 days ago',
    type: 'download',
  },
  {
    id: 'activity-4',
    user: 'System',
    action: 'Database backup completed',
    time: '5 days ago',
    type: 'system',
  },
];

export const FALLBACK_USERS: DashboardUser[] = [
  {
    id: 'user-1',
    name: 'John Doe',
    role: 'admin',
    status: 'active',
    lastActive: '2 hours ago',
  },
  {
    id: 'user-2',
    name: 'Jane Smith',
    role: 'manager',
    status: 'active',
    lastActive: '1 day ago',
  },
  {
    id: 'user-3',
    name: 'Ahmed Hassan',
    role: 'agent',
    status: 'inactive',
    lastActive: '3 days ago',
  },
];

export const mapActivityType = (rawType: string): ActivityType => {
  if (rawType.includes('create')) return 'create';
  if (rawType.includes('download')) return 'download';
  if (rawType.includes('system')) return 'system';
  return 'update';
};

