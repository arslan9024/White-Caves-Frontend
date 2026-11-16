export type TaskLifecycleStage =
  | 'created'
  | 'queued'
  | 'in_progress'
  | 'pending_review'
  | 'completed'
  | 'failed'
  | 'cancelled';

/**
 * A single step / action that occurred within a task's lifecycle.
 * Each action is immutable once written; new entries are appended to the array.
 */
export interface TaskAction {
  /** Unique action ID — e.g. "ta_1714500000000" */
  id: string;
  /** Short camelCase action type — e.g. "file_uploaded", "review_requested", "approved" */
  type: string;
  /** Human-readable description — e.g. "Excel file uploaded with 23 units" */
  description: string;
  /** Who performed the action — assistant id, agent id, or "system" */
  actor: string;
  /** ISO timestamp when the action occurred */
  timestamp: string;
  /** Outcome of this individual action step */
  status: 'success' | 'failed' | 'pending';
  /** Optional short outcome note — e.g. "23 records imported" */
  result?: string;
}

/**
 * The final outcome record written when a task reaches a terminal lifecycle stage.
 */
export interface TaskResult {
  /** Overall outcome */
  outcome: 'success' | 'failed' | 'partial';
  /** Human-readable summary of what was achieved */
  summary: string;
  /** ISO timestamp when the task reached a terminal state */
  completedAt: string;
  /** Optional structured metrics — e.g. { unitsImported: 23, errors: 0 } */
  metrics?: Record<string, unknown>;
  /** Populated when outcome is "failed" or "partial" */
  errorMessage?: string;
}

export interface Task {
  id: string;
  title: string;
  priority: 'low' | 'medium' | 'high';
  status: 'pending' | 'in_progress' | 'completed' | 'assigned';
  assignedTo: string | null;
  dueDate: string;
  createdAt?: string;
  // ── Lifecycle fields ──────────────────────────────────────────────────
  /** Current position in the task lifecycle */
  lifecycleStage?: TaskLifecycleStage;
  /** Ordered log of every action / step performed on this task */
  actions?: TaskAction[];
  /** Terminal result — populated when lifecycleStage is "completed" or "failed" */
  result?: TaskResult;
  /** ISO timestamp when the task moved from "queued" to "in_progress" */
  startedAt?: string;
  /** ISO timestamp of the last state change */
  updatedAt?: string;
  /** ISO timestamp when the task reached a terminal lifecycle stage */
  completedAt?: string;
  [key: string]: unknown;
}

export interface TasksState {
  byAssistantId: Record<string, Task[]>;
  activeTasksCount: number;
}

export interface Activity {
  id: number;
  assistantId: string;
  action: string;
  target: string;
  timestamp: string;
  type: string;
  [key: string]: unknown;
}

export interface AssistantPerformance {
  overallHealth: number;
  activeTasks: number;
  criticalAlerts: Array<Record<string, unknown>>;
  recentActivity: Activity[];
}

export interface OwnerPreferences {
  favoriteAssistants: string[];
  defaultAssistant: string;
  dashboardLayout: string;
  notificationSettings: {
    assistantUpdates: boolean;
    criticalAlerts: boolean;
    performanceReports: boolean;
  };
}

export interface LiveUpdates {
  lastUpdate: string | null;
  connections: Record<string, unknown>;
  isConnected: boolean;
}

export interface ExecutiveSuggestion {
  id: string;
  fromAssistant: string;
  assistantDepartment: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  type: string;
  title: string;
  analysis: string;
  dataPoints: string[];
  projectedImpact: string;
  confidence: number;
  timestamp: string;
  status: 'unreviewed' | 'acknowledged' | 'pending';
}

export interface ExecutiveSuggestionsState {
  inbox: ExecutiveSuggestion[];
  filters: {
    priority: string;
    department: string;
    status: string;
  };
  lastRefresh: string;
}

