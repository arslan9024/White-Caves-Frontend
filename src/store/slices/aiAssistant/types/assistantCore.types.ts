// ============================================================================
// AI ASSISTANT DASHBOARD — TYPE DEFINITIONS
// Extracted from aiAssistantDashboardSlice.tsx for maintainability
// ============================================================================

export interface AssistantPermissions {
  viewableBy: string[];
  accessibleBy: string[];
  dataAccessLevel: 'full' | 'departmental' | 'limited';
}

export interface AssistantMetrics {
  lastActive: string | null;
  tasksCompleted: number;
  activeUsers: number;
  systemHealth: 'optimal' | 'degraded' | 'offline';
}

export interface QuickStat {
  value: number | string;
  label: string;
  change: number;
}

export interface TechStack {
  frontend: string[];
  backend: string[];
  database: string[];
  infrastructure: string[];
}

export interface SystemModules {
  [key: string]: boolean;
}

export interface DesignMetrics {
  componentCount: number;
  accessibilityScore: number;
  lighthouseScore: number;
  bundleSize: string;
}

export interface BackendMetrics {
  apiCount: number;
  avgResponseTime: number;
  cacheHitRate: number;
  dbConnections: number;
}

export interface AIAssistant {
  id: string;
  name: string;
  title: string;
  department: string;
  icon: string;
  colorScheme: string;
  avatar: string;
  description: string;
  capabilities: string[];
  permissions: AssistantPermissions;
  metrics: AssistantMetrics;
  quickStats: QuickStat;
  dashboardUrl: string;
  apiEndpoints: string[];
  techStack?: TechStack;
  systemModules?: SystemModules;
  designMetrics?: DesignMetrics;
  backendMetrics?: BackendMetrics;
}

export interface AssistantsRegistry {
  byId: Record<string, AIAssistant>;
  allIds: string[];
  isLoading: boolean;
  lastFetched: string | null;
}

export interface UIFilters {
  department: string;
  status: string;
  searchQuery: string;
}

export interface UIState {
  selectedAssistant: string;
  viewMode: string;
  layout: 'grid' | 'list';
  filters: UIFilters;
  dropdownOpen: boolean;
}

export interface SidebarState {
  isOpen: boolean;
  isCollapsed: boolean;
  activeAssistantId: string | null;
  position: 'left' | 'right';
}

export interface Notification {
  id: string;
  type: string;
  message: string;
  severity: 'info' | 'warning' | 'critical';
  isRead: boolean;
  timestamp: string;
  [key: string]: unknown;
}

export interface NotificationsState {
  byAssistantId: Record<string, Notification[]>;
  globalUnreadCount: number;
  lastFetched: string | null;
}

// ── Task lifecycle ───────────────────────────────────────────────────────

/**
 * The ordered lifecycle stages a task moves through.
 * created → queued → in_progress → pending_review → completed (or failed / cancelled)
 */

