import { apiClient } from '../utils/apiClient';

export * from './subagentOrchestrationService.types';
import type {
  ModelTier,
  TaskState,
  TaskType,
  AssistantExecutionProfile,
  CollaborationEdge,
  OrchestrationTask,
  OrchestrationStatusPayload,
  OrchestrationMetricsPayload,
  OrchestrationSnapshotSummary,
  OrchestrationSnapshotDetail,
  OrchestrationSnapshotHistoryPayload,
  OrchestrationSnapshotComparePayload,
  OrchestrationSnapshotRestoreRecommendationPayload,
  OrchestrationSnapshotRestorePreviewPayload,
} from './subagentOrchestrationService.types';

const BASE = '/orchestration';

export const subagentOrchestrationService = {
  async getStatus() {
    return (await apiClient.get(`${BASE}/status`)) as {
      success: boolean;
      data: OrchestrationStatusPayload;
    };
  },

  async getTasks(assistantId?: string) {
    const query = assistantId ? `?assistantId=${encodeURIComponent(assistantId)}` : '';
    return (await apiClient.get(`${BASE}/tasks${query}`)) as {
      success: boolean;
      data: OrchestrationTask[];
    };
  },

  async getMetrics() {
    return (await apiClient.get(`${BASE}/metrics`)) as {
      success: boolean;
      data: OrchestrationMetricsPayload;
    };
  },

  async getSnapshots() {
    return (await apiClient.get(`${BASE}/snapshots`)) as {
      success: boolean;
      data: OrchestrationSnapshotSummary[];
    };
  },

  async getSnapshotHistory(options?: {
    offset?: number;
    limit?: number;
    q?: string;
    order?: 'asc' | 'desc';
    label?: string;
  }) {
    const params = new URLSearchParams();
    if (typeof options?.offset === 'number' && Number.isFinite(options.offset)) {
      params.set('offset', String(Math.max(0, Math.floor(options.offset))));
    }
    if (typeof options?.limit === 'number' && Number.isFinite(options.limit)) {
      params.set('limit', String(Math.max(1, Math.floor(options.limit))));
    }
    if (typeof options?.q === 'string' && options.q.trim().length > 0) {
      params.set('q', options.q.trim());
    }
    if (options?.order === 'asc' || options?.order === 'desc') {
      params.set('order', options.order);
    }
    if (typeof options?.label === 'string' && options.label.trim().length > 0) {
      params.set('label', options.label.trim());
    }
    const query = params.toString();
    const url = `${BASE}/snapshots/history${query ? `?${query}` : ''}`;

    return (await apiClient.get(url)) as {
      success: boolean;
      data: OrchestrationSnapshotHistoryPayload;
    };
  },

  async getSnapshot(fileName: string) {
    return (await apiClient.get(`${BASE}/snapshots/${encodeURIComponent(fileName)}`)) as {
      success: boolean;
      data: OrchestrationSnapshotDetail;
    };
  },

  async getSnapshotRestorePreview(fileName: string) {
    return (await apiClient.get(`${BASE}/snapshots/${encodeURIComponent(fileName)}/preview`)) as {
      success: boolean;
      data: OrchestrationSnapshotRestorePreviewPayload;
    };
  },

  async getSnapshotCompare(fileName: string, target?: string) {
    const params = new URLSearchParams();
    if (typeof target === 'string' && target.trim().length > 0) {
      params.set('target', target.trim());
    }
    const query = params.toString();
    const url = `${BASE}/snapshots/${encodeURIComponent(fileName)}/compare${query ? `?${query}` : ''}`;

    return (await apiClient.get(url)) as {
      success: boolean;
      data: OrchestrationSnapshotComparePayload;
    };
  },

  async getSnapshotRestoreRecommendation(fileName: string, target?: string) {
    const params = new URLSearchParams();
    if (typeof target === 'string' && target.trim().length > 0) {
      params.set('target', target.trim());
    }
    const query = params.toString();
    const url = `${BASE}/snapshots/${encodeURIComponent(fileName)}/recommend-restore${query ? `?${query}` : ''}`;

    return (await apiClient.get(url)) as {
      success: boolean;
      data: OrchestrationSnapshotRestoreRecommendationPayload;
    };
  },

  async exportSnapshot(label?: string) {
    const payload =
      typeof label === 'string' && label.trim().length > 0 ? { label: label.trim() } : {};

    return (await apiClient.post(`${BASE}/snapshots/export`, payload)) as {
      success: boolean;
      data: OrchestrationSnapshotSummary;
    };
  },

  async restoreSnapshot(fileName?: string) {
    const payload =
      typeof fileName === 'string' && fileName.trim().length > 0
        ? { fileName: fileName.trim() }
        : {};

    return (await apiClient.post(`${BASE}/snapshots/restore`, payload)) as {
      success: boolean;
      data: {
        snapshot: OrchestrationSnapshotSummary;
        metrics: OrchestrationMetricsPayload['metrics'];
      };
    };
  },

  async deleteSnapshot(fileName: string) {
    return (await apiClient.delete(`${BASE}/snapshots/${encodeURIComponent(fileName)}`)) as {
      success: boolean;
      data: {
        snapshot: OrchestrationSnapshotSummary;
        remaining: OrchestrationSnapshotSummary[];
      };
    };
  },

  async createTask(payload: {
    assistantId: string;
    taskType: TaskType;
    title: string;
    requestedTier?: ModelTier;
  }) {
    return (await apiClient.post(`${BASE}/tasks`, payload)) as {
      success: boolean;
      data: OrchestrationTask;
    };
  },

  async updateTaskState(id: string, state: TaskState, blockedReason?: string) {
    const payload =
      typeof blockedReason === 'string' && blockedReason.trim().length > 0
        ? { state, blockedReason: blockedReason.trim() }
        : { state };

    return (await apiClient.patch(`${BASE}/tasks/${id}/state`, payload)) as {
      success: boolean;
      data: OrchestrationTask;
    };
  },
};
