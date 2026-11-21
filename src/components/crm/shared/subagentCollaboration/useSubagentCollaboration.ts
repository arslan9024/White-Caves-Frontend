import { useEffect, useMemo, useRef, useState } from 'react';
import {
  canAssistantRequestTier,
  getAssistantExecutionProfile,
  getRecommendedCollaborators,
  type ModelTier,
} from '../../../../config/subagentOrchestration';
import {
  subagentOrchestrationService,
  type OrchestrationStatusPayload,
  type OrchestrationTask,
  type TaskState,
  type TaskType,
} from '../../../../services/subagentOrchestrationService';
import { useSnapshotHistory } from './useSnapshotHistory';

export interface UseSubagentCollaborationParams {
  assistantId?: string;
  weeklyPremiumRemaining: number;
  businessDaysRemaining: number;
}

export function getNextStates(state: TaskState): TaskState[] {
  switch (state) {
    case 'queued':
      return ['running', 'blocked', 'failed'];
    case 'running':
      return ['done', 'blocked', 'failed'];
    case 'blocked':
      return ['queued', 'failed'];
    case 'failed':
      return ['queued', 'blocked'];
    case 'done':
    default:
      return [];
  }
}

export function useSubagentCollaboration({
  assistantId,
  weeklyPremiumRemaining,
  businessDaysRemaining,
}: UseSubagentCollaborationParams) {
  const [statusData, setStatusData] = useState<OrchestrationStatusPayload | null>(null);
  const [statusError, setStatusError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [taskTitle, setTaskTitle] = useState<string>('');
  const [taskType, setTaskType] = useState<TaskType>('planning');
  const [requestedTier, setRequestedTier] = useState<ModelTier>('standard');
  const [contextGateApproved, setContextGateApproved] = useState<boolean>(false);
  const [isSubmittingTask, setIsSubmittingTask] = useState<boolean>(false);
  const [updatingTaskId, setUpdatingTaskId] = useState<string | null>(null);

  const reloadRef = useRef<() => Promise<void>>(async () => {});
  const snap = useSnapshotHistory({
    assistantId,
    setStatusError,
    reloadAll: () => reloadRef.current(),
  });

  const profile = assistantId ? getAssistantExecutionProfile(assistantId) : null;
  const collaborations = useMemo(
    () => (assistantId ? getRecommendedCollaborators(assistantId) : []),
    [assistantId]
  );

  const tierPolicyResult = useMemo(
    () =>
      !assistantId
        ? { allowed: true }
        : canAssistantRequestTier({ assistantId, requestedTier, contextGateApproved }),
    [assistantId, contextGateApproved, requestedTier]
  );

  const loadStatusData = async (preserveLength = true) => {
    const limit =
      preserveLength && snap.snapshots.length > 0 ? snap.snapshots.length : snap.snapshotLimit;
    const [response, snapshotResponse] = await Promise.all([
      subagentOrchestrationService.getStatus(),
      subagentOrchestrationService.getSnapshotHistory({
        offset: 0,
        limit,
        q: snap.snapshotSearch,
        order: snap.snapshotOrder,
        ...(snap.snapshotLabelFilter ? { label: snap.snapshotLabelFilter } : {}),
      }),
    ]);
    setStatusData(response.data);
    snap.setSnapshots(snapshotResponse.data.items);
    snap.setSnapshotFacets(snapshotResponse.data.facets ?? []);
    snap.setSnapshotHasMore(snapshotResponse.data.pageInfo.hasMore);
    snap.setSnapshotTotal(snapshotResponse.data.pageInfo.total);

    const preferredFileName =
      preserveLength &&
      snap.selectedSnapshotFileName &&
      snapshotResponse.data.items.some(s => s.fileName === snap.selectedSnapshotFileName)
        ? snap.selectedSnapshotFileName
        : (snapshotResponse.data.items[0]?.fileName ?? null);

    snap.setSelectedSnapshotFileName(preferredFileName);
    if (preferredFileName) {
      const detail = await subagentOrchestrationService.getSnapshot(preferredFileName);
      snap.setSelectedSnapshotDetail(detail.data);
    } else {
      snap.setSelectedSnapshotDetail(null);
    }
  };

  useEffect(() => {
    reloadRef.current = () => loadStatusData(true);
  });

  useEffect(() => {
    const load = async () => {
      setIsLoading(true);
      setStatusError(null);
      try {
        await loadStatusData(false);
      } catch (error) {
        setStatusError(
          error instanceof Error
            ? error.message
            : 'Failed to load orchestration status. Using local defaults.'
        );
      } finally {
        setIsLoading(false);
      }
    };
    void load();
  }, [snap.snapshotLimit, snap.snapshotSearch, snap.snapshotOrder, snap.snapshotLabelFilter]);

  const dailyPremiumCap =
    statusData?.quota.dailyCap ??
    Math.max(0, Math.floor(weeklyPremiumRemaining / Math.max(1, businessDaysRemaining)));
  const premiumConsumedToday = statusData?.quota.premiumConsumedToday ?? 0;
  const premiumRemainingToday =
    statusData?.quota.premiumRemainingToday ?? Math.max(0, dailyPremiumCap - premiumConsumedToday);

  const assistantTasks = useMemo(() => {
    if (!assistantId || !statusData?.tasks) return [] as OrchestrationTask[];
    return statusData.tasks.filter(task => task.assistantId === assistantId).slice(0, 5);
  }, [assistantId, statusData?.tasks]);

  const runtimeMetrics = useMemo(() => {
    if (statusData?.metrics) return statusData.metrics;
    const tasks = statusData?.tasks ?? [];
    return {
      totalTasks: tasks.length,
      queuedTasks: tasks.filter(task => task.state === 'queued').length,
      runningTasks: tasks.filter(task => task.state === 'running').length,
      doneTasks: tasks.filter(task => task.state === 'done').length,
      failedTasks: tasks.filter(task => task.state === 'failed').length,
      blockedTasks: tasks.filter(task => task.state === 'blocked').length,
      premiumTasks: tasks.filter(task => task.requestedTier === 'premium').length,
      standardTasks: tasks.filter(task => task.requestedTier === 'standard').length,
      freeTasks: tasks.filter(task => task.requestedTier === 'free').length,
      lastTaskCreatedAt: tasks.length > 0 ? tasks[0].createdAt : null,
    };
  }, [statusData?.metrics, statusData?.tasks]);

  const allowedTaskTypes = useMemo(
    () => (profile ? (profile.taskTypes as TaskType[]) : (['planning'] as TaskType[])),
    [profile]
  );

  useEffect(() => {
    if (!allowedTaskTypes.includes(taskType)) setTaskType(allowedTaskTypes[0] ?? 'planning');
  }, [allowedTaskTypes, taskType]);

  useEffect(() => {
    if (profile?.modelPolicy.defaultTier) setRequestedTier(profile.modelPolicy.defaultTier);
    setContextGateApproved(false);
  }, [profile?.id, profile?.modelPolicy.defaultTier]);

  const handleTaskStateUpdate = async (task: OrchestrationTask, nextState: TaskState) => {
    setUpdatingTaskId(task.id);
    setStatusError(null);
    try {
      const blockedReason =
        nextState === 'blocked'
          ? (task.blockedReason ?? 'Blocked by command center operator')
          : undefined;
      await subagentOrchestrationService.updateTaskState(task.id, nextState, blockedReason);
      await loadStatusData(true);
    } catch (error) {
      setStatusError(error instanceof Error ? error.message : 'Failed to update task state');
    } finally {
      setUpdatingTaskId(null);
    }
  };

  const handleAssignTask = async () => {
    if (!assistantId || !taskTitle.trim()) return;
    if (!tierPolicyResult.allowed) {
      setStatusError(tierPolicyResult.reason ?? 'Task blocked by tier policy');
      return;
    }
    setIsSubmittingTask(true);
    setStatusError(null);
    try {
      await subagentOrchestrationService.createTask({
        assistantId,
        taskType,
        title: taskTitle.trim(),
        requestedTier,
      });
      await loadStatusData(true);
      setTaskTitle('');
    } catch (error) {
      setStatusError(error instanceof Error ? error.message : 'Failed to assign task');
    } finally {
      setIsSubmittingTask(false);
    }
  };

  return {
    statusData,
    statusError,
    isLoading,
    profile,
    collaborations,
    tierPolicyResult,
    dailyPremiumCap,
    premiumConsumedToday,
    premiumRemainingToday,
    assistantTasks,
    runtimeMetrics,
    allowedTaskTypes,
    taskTitle,
    setTaskTitle,
    taskType,
    setTaskType,
    requestedTier,
    setRequestedTier,
    contextGateApproved,
    setContextGateApproved,
    isSubmittingTask,
    updatingTaskId,
    ...snap,
    handleTaskStateUpdate,
    handleAssignTask,
  };
}
