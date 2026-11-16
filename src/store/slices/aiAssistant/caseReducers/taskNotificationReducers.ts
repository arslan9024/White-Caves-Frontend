// @ts-nocheck
/* eslint-disable security/detect-object-injection */
import type { PayloadAction } from '@reduxjs/toolkit';
import type { AIAssistantDashboardState, Notification, Task } from '../types';
import { MAX_ACTIVITY_LOG } from '../initialState';

export const taskNotificationReducers = {
    addNotification: (
      state,
      action: PayloadAction<{
        assistantId: string;
        notification: Omit<Notification, 'id' | 'timestamp' | 'isRead'>;
      }>
    ) => {
      const { assistantId, notification } = action.payload;
      if (!state.notifications.byAssistantId[assistantId]) {
        state.notifications.byAssistantId[assistantId] = [];
      }
      state.notifications.byAssistantId[assistantId].unshift({
        ...notification,
        id: `n${Date.now()}`,
        timestamp: new Date().toISOString(),
        isRead: false,
      } as Notification);
      state.notifications.globalUnreadCount += 1;
    },
    markNotificationRead: (
      state,
      action: PayloadAction<{ assistantId: string; notificationId: string }>
    ) => {
      const { assistantId, notificationId } = action.payload;
      const notifications = state.notifications.byAssistantId[assistantId];
      if (notifications) {
        const notification = notifications.find(n => n.id === notificationId);
        if (notification && !notification.isRead) {
          notification.isRead = true;
          state.notifications.globalUnreadCount = Math.max(
            0,
            state.notifications.globalUnreadCount - 1
          );
        }
      }
    },
    markAllNotificationsRead: (state, action: PayloadAction<string>) => {
      const assistantId = action.payload;
      const notifications = state.notifications.byAssistantId[assistantId];
      if (notifications) {
        const unreadCount = notifications.filter(n => !n.isRead).length;
        notifications.forEach(n => {
          n.isRead = true;
        });
        state.notifications.globalUnreadCount = Math.max(
          0,
          state.notifications.globalUnreadCount - unreadCount
        );
      }
    },
    clearNotifications: (state, action: PayloadAction<string>) => {
      state.notifications.byAssistantId[action.payload] = [];
    },

    // ── Task management ─────────────────────────────────────────────────
    addTask: (
      state,
      action: PayloadAction<{
        assistantId: string;
        task: Omit<Task, 'id' | 'createdAt' | 'status'>;
      }>
    ) => {
      const { assistantId, task } = action.payload;
      if (!state.tasks.byAssistantId[assistantId]) {
        state.tasks.byAssistantId[assistantId] = [];
      }
      state.tasks.byAssistantId[assistantId].push({
        ...task,
        id: `t${Date.now()}`,
        createdAt: new Date().toISOString(),
        status: 'pending',
      } as Task);
      state.tasks.activeTasksCount += 1;
    },
    updateTaskStatus: (
      state,
      action: PayloadAction<{ assistantId: string; taskId: string; status: Task['status'] }>
    ) => {
      const { assistantId, taskId, status } = action.payload;
      const tasks = state.tasks.byAssistantId[assistantId];
      if (tasks) {
        const task = tasks.find(t => t.id === taskId);
        if (task) {
          const wasActive = task.status !== 'completed';
          task.status = status;
          if (status === 'completed' && wasActive) {
            state.tasks.activeTasksCount = Math.max(0, state.tasks.activeTasksCount - 1);
          }
        }
      }
    },
    assignTask: (
      state,
      action: PayloadAction<{ assistantId: string; taskId: string; agentId: string }>
    ) => {
      const { assistantId, taskId, agentId } = action.payload;
      const tasks = state.tasks.byAssistantId[assistantId];
      if (tasks) {
        const task = tasks.find(t => t.id === taskId);
        if (task) {
          task.assignedTo = agentId;
          task.status = 'assigned';
        }
      }
    },

    // ── Cross-assistant coordination ────────────────────────────────────
    triggerUserAction: (
      state,
      action: PayloadAction<{
        actionType: string;
        sourceAssistant: string;
        targetAssistants: string[];
        data: Record<string, unknown>;
      }>
    ) => {
      const { actionType, sourceAssistant, targetAssistants, data } = action.payload;
      targetAssistants.forEach(targetId => {
        if (!state.notifications.byAssistantId[targetId]) {
          state.notifications.byAssistantId[targetId] = [];
        }
        state.notifications.byAssistantId[targetId].unshift({
          id: `n${Date.now()}_${targetId}`,
          type: actionType,
          message: `Action from ${sourceAssistant}: ${(data.message as string) || actionType}`,
          severity: (data.severity as Notification['severity']) || 'info',
          isRead: false,
          timestamp: new Date().toISOString(),
          sourceAssistant,
          data,
        });
        state.notifications.globalUnreadCount += 1;
      });
    },

    // ── Olivia automation ───────────────────────────────────────────────
};
