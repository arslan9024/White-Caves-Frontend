export type ModelTier = 'free' | 'standard' | 'premium';
export type TaskState = 'queued' | 'running' | 'done' | 'failed' | 'blocked';
export type TaskType =
  | 'research'
  | 'planning'
  | 'implementation'
  | 'review'
  | 'qa'
  | 'compliance'
  | 'documentation';

export interface AssistantExecutionProfile {
  id: string;
  role: string;
  modelPolicy: {
    defaultTier: ModelTier;
    premiumAllowed: boolean;
    requiresContextGate: boolean;
  };
  capabilities: string[];
  taskTypes: TaskType[];
}

export interface CollaborationEdge {
  from: string;
  to: string;
  reason: string;
}

export interface OrchestrationTask {
  id: string;
  assistantId: string;
  taskType: TaskType;
  title: string;
  state: TaskState;
  requestedTier: ModelTier;
  blockedReason: string | null;
  createdAt: string;
}

export interface OrchestrationStatusPayload {
  profiles: Record<string, AssistantExecutionProfile>;
  collaborationGraph: CollaborationEdge[];
  quota: {
    weeklyPremiumRemaining: number;
    businessDaysRemaining: number;
    dailyCap: number;
    premiumConsumedToday: number;
    premiumRemainingToday: number;
  };
  metrics?: {
    totalTasks: number;
    queuedTasks: number;
    runningTasks: number;
    doneTasks: number;
    failedTasks: number;
    blockedTasks: number;
    premiumTasks: number;
    standardTasks: number;
    freeTasks: number;
    lastTaskCreatedAt: string | null;
  };
  tasks: OrchestrationTask[];
}

export interface OrchestrationMetricsPayload {
  quota: {
    weeklyPremiumRemaining: number;
    businessDaysRemaining: number;
    dailyCap: number;
    premiumConsumedToday: number;
    premiumRemainingToday: number;
  };
  metrics: {
    totalTasks: number;
    queuedTasks: number;
    runningTasks: number;
    doneTasks: number;
    failedTasks: number;
    blockedTasks: number;
    premiumTasks: number;
    standardTasks: number;
    freeTasks: number;
    lastTaskCreatedAt: string | null;
  };
}

export interface OrchestrationSnapshotSummary {
  fileName: string;
  createdAt: string;
  taskCount: number;
  label: string | null;
}

export interface OrchestrationSnapshotDetail extends OrchestrationSnapshotSummary {
  quota: {
    weeklyPremiumRemaining: number;
    businessDaysRemaining: number;
    premiumConsumedToday: number;
  };
  metrics: OrchestrationMetricsPayload['metrics'];
  tasks: OrchestrationTask[];
}

export interface OrchestrationSnapshotHistoryPayload {
  items: OrchestrationSnapshotSummary[];
  facets: Array<{ label: string; count: number }>;
  pageInfo: {
    offset: number;
    limit: number;
    total: number;
    hasMore: boolean;
    query: string;
    order: 'asc' | 'desc';
    label: string | null;
  };
}

export interface OrchestrationSnapshotComparePayload {
  targetQuery: string;
  source: {
    snapshot: OrchestrationSnapshotSummary;
    quota: {
      weeklyPremiumRemaining: number;
      businessDaysRemaining: number;
      premiumConsumedToday: number;
    };
    metrics: OrchestrationMetricsPayload['metrics'];
  };
  target: {
    kind: 'current' | 'snapshot';
    snapshot: OrchestrationSnapshotSummary | null;
    quota: {
      weeklyPremiumRemaining: number;
      businessDaysRemaining: number;
      premiumConsumedToday: number;
    };
    metrics: OrchestrationMetricsPayload['metrics'];
  };
  delta: {
    totalTasks: number;
    queuedTasks: number;
    runningTasks: number;
    doneTasks: number;
    failedTasks: number;
    blockedTasks: number;
    premiumTasks: number;
    weeklyPremiumRemaining: number;
    businessDaysRemaining: number;
    premiumConsumedToday: number;
  };
}

export interface OrchestrationSnapshotRestoreRecommendationPayload {
  source: {
    fileName: string;
    createdAt: string;
    label: string | null;
  };
  target: string;
  delta: {
    totalTasks: number;
    runningTasks: number;
    failedTasks: number;
    premiumConsumedToday: number;
  };
  recommendation: {
    decision: 'safe' | 'caution' | 'risky';
    score: number;
    reasons: string[];
  };
}

export interface OrchestrationSnapshotRestorePreviewPayload {
  snapshot: OrchestrationSnapshotSummary;
  current: {
    quota: {
      weeklyPremiumRemaining: number;
      businessDaysRemaining: number;
      premiumConsumedToday: number;
    };
    metrics: OrchestrationMetricsPayload['metrics'];
  };
  preview: {
    quota: {
      weeklyPremiumRemaining: number;
      businessDaysRemaining: number;
      premiumConsumedToday: number;
    };
    metrics: OrchestrationMetricsPayload['metrics'];
  };
  delta: {
    totalTasks: number;
    queuedTasks: number;
    runningTasks: number;
    doneTasks: number;
    failedTasks: number;
    blockedTasks: number;
    premiumConsumedToday: number;
  };
}
