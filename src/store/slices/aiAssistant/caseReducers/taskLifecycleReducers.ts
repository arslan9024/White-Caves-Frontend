// @ts-nocheck
/* eslint-disable security/detect-object-injection */
import type { PayloadAction } from '@reduxjs/toolkit';
import type {
  AIAssistantDashboardState,
  TaskLifecycleStage,
  TaskAction,
  TaskResult,
} from '../types';

export const taskLifecycleReducers = {
    advanceTaskLifecycle: (
      state,
      action: PayloadAction<{
        assistantId: string;
        taskId: string;
        stage: TaskLifecycleStage;
      }>
    ) => {
      const { assistantId, taskId, stage } = action.payload;
      const tasks = state.tasks.byAssistantId[assistantId];
      if (!tasks) return;
      const task = tasks.find(t => t.id === taskId);
      if (!task) return;

      const now = new Date().toISOString();
      task.lifecycleStage = stage;
      task.updatedAt = now;

      // Sync status to lifecycle stage
      if (stage === 'in_progress') {
        task.status = 'in_progress';
        task.startedAt = task.startedAt ?? now;
      } else if (stage === 'completed') {
        task.status = 'completed';
        task.completedAt = now;
        state.tasks.activeTasksCount = Math.max(0, state.tasks.activeTasksCount - 1);
      } else if (stage === 'failed' || stage === 'cancelled') {
        // Terminal stages: keep the task's current status unchanged so callers
        // can see where in the workflow the failure occurred, but mark completedAt.
        task.completedAt = now;
      } else if (stage === 'queued' || stage === 'created') {
        task.status = 'pending';
      }

      // Auto-generate a lifecycle notification
      const LIFECYCLE_NOTIF: Record<
        TaskLifecycleStage,
        { message: string; severity: Notification['severity'] }
      > = {
        created: {
          message: `Task created: "${task.title}"`,
          severity: 'info',
        },
        queued: {
          message: `Task queued and awaiting action: "${task.title}"`,
          severity: 'info',
        },
        in_progress: {
          message: `Task started — now in progress: "${task.title}"`,
          severity: 'info',
        },
        pending_review: {
          message: `Action required: "${task.title}" is waiting for your review`,
          severity: 'warning',
        },
        completed: {
          message: `✓ Task completed: "${task.title}"`,
          severity: 'info',
        },
        failed: {
          message: `✗ Task failed: "${task.title}" — please investigate`,
          severity: 'critical',
        },
        cancelled: {
          message: `Task cancelled: "${task.title}"`,
          severity: 'info',
        },
      };

      const notifCfg = LIFECYCLE_NOTIF[stage];
      if (!state.notifications.byAssistantId[assistantId]) {
        state.notifications.byAssistantId[assistantId] = [];
      }
      state.notifications.byAssistantId[assistantId].unshift({
        id: `n_lc_${Date.now()}_${taskId}`,
        type: 'task_lifecycle',
        message: notifCfg.message,
        severity: notifCfg.severity,
        isRead: false,
        timestamp: now,
        taskId,
        lifecycleStage: stage,
      } as Notification);
      state.notifications.globalUnreadCount += 1;
    },

    /**
     * Appends an action step to a task's action log and fires a notification
     * whose severity reflects the action's outcome (success → info, pending → warning,
     * failed → critical).
     */
    addTaskAction: (
      state,
      action: PayloadAction<{
        assistantId: string;
        taskId: string;
        taskAction: Omit<TaskAction, 'id' | 'timestamp'>;
      }>
    ) => {
      const { assistantId, taskId, taskAction } = action.payload;
      const tasks = state.tasks.byAssistantId[assistantId];
      if (!tasks) return;
      const task = tasks.find(t => t.id === taskId);
      if (!task) return;

      const now = new Date().toISOString();
      if (!task.actions) task.actions = [];
      task.actions.push({
        ...taskAction,
        id: `ta_${Date.now()}`,
        timestamp: now,
      } as TaskAction);
      task.updatedAt = now;

      // Auto-generate notification based on action status
      const severity: Notification['severity'] =
        taskAction.status === 'failed'
          ? 'critical'
          : taskAction.status === 'pending'
            ? 'warning'
            : 'info';

      const message =
        taskAction.status === 'failed'
          ? `Action failed on "${task.title}": ${taskAction.description}`
          : taskAction.status === 'pending'
            ? `Pending action on "${task.title}": ${taskAction.description}`
            : `Action completed on "${task.title}": ${taskAction.description}`;

      if (!state.notifications.byAssistantId[assistantId]) {
        state.notifications.byAssistantId[assistantId] = [];
      }
      state.notifications.byAssistantId[assistantId].unshift({
        id: `n_ta_${Date.now()}`,
        type: 'task_action',
        message,
        severity,
        isRead: false,
        timestamp: now,
        taskId,
        actionType: taskAction.type,
      } as Notification);
      state.notifications.globalUnreadCount += 1;
    },

    /**
     * Writes the final TaskResult onto a task, moves it to the correct terminal
     * lifecycle stage (completed / failed), and fires a result notification.
     */
    setTaskResult: (
      state,
      action: PayloadAction<{
        assistantId: string;
        taskId: string;
        result: TaskResult;
      }>
    ) => {
      const { assistantId, taskId, result } = action.payload;
      const tasks = state.tasks.byAssistantId[assistantId];
      if (!tasks) return;
      const task = tasks.find(t => t.id === taskId);
      if (!task) return;

      const now = new Date().toISOString();
      task.result = result;
      task.updatedAt = now;
      task.completedAt = result.completedAt;

      // Map outcome to lifecycle stage:
      //   success  → completed   (terminal, fully done)
      //   partial  → pending_review (more action may be needed)
      //   failed   → failed      (terminal, error state)
      if (result.outcome === 'failed') {
        task.lifecycleStage = 'failed';
      } else if (result.outcome === 'partial') {
        task.lifecycleStage = 'pending_review';
      } else {
        task.lifecycleStage = 'completed';
        task.status = 'completed';
        state.tasks.activeTasksCount = Math.max(0, state.tasks.activeTasksCount - 1);
      }

      // Auto-generate result notification
      const severity: Notification['severity'] =
        result.outcome === 'failed'
          ? 'critical'
          : result.outcome === 'partial'
            ? 'warning'
            : 'info';

      const statusLabel =
        result.outcome === 'failed'
          ? '✗ Failed'
          : result.outcome === 'partial'
            ? '⚠ Partially completed'
            : '✓ Completed';

      if (!state.notifications.byAssistantId[assistantId]) {
        state.notifications.byAssistantId[assistantId] = [];
      }
      state.notifications.byAssistantId[assistantId].unshift({
        id: `n_res_${Date.now()}`,
        type: 'task_result',
        message: `${statusLabel}: "${task.title}" — ${result.summary}`,
        severity,
        isRead: false,
        timestamp: now,
        taskId,
        outcome: result.outcome,
      } as Notification);
      state.notifications.globalUnreadCount += 1;
    },
};

