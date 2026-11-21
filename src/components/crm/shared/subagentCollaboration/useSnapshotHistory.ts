import { useState } from 'react';
import {
  subagentOrchestrationService,
  type OrchestrationSnapshotComparePayload,
  type OrchestrationSnapshotDetail,
  type OrchestrationSnapshotRestorePreviewPayload,
  type OrchestrationSnapshotRestoreRecommendationPayload,
  type OrchestrationSnapshotSummary,
} from '../../../../services/subagentOrchestrationService';

interface UseSnapshotHistoryParams {
  assistantId?: string;
  setStatusError: (err: string | null) => void;
  reloadAll: () => Promise<void>;
}

export function useSnapshotHistory({
  assistantId,
  setStatusError,
  reloadAll,
}: UseSnapshotHistoryParams) {
  const [snapshots, setSnapshots] = useState<OrchestrationSnapshotSummary[]>([]);
  const [snapshotSearch, setSnapshotSearch] = useState<string>('');
  const [snapshotOrder, setSnapshotOrder] = useState<'asc' | 'desc'>('desc');
  const [snapshotLabelFilter, setSnapshotLabelFilter] = useState<string | null>(null);
  const [snapshotCompareTarget, setSnapshotCompareTarget] = useState<string>('current');
  const [snapshotHasMore, setSnapshotHasMore] = useState<boolean>(false);
  const [snapshotTotal, setSnapshotTotal] = useState<number>(0);
  const [snapshotFacets, setSnapshotFacets] = useState<Array<{ label: string; count: number }>>([]);
  const [selectedSnapshotPreview, setSelectedSnapshotPreview] =
    useState<OrchestrationSnapshotRestorePreviewPayload | null>(null);
  const [selectedSnapshotCompare, setSelectedSnapshotCompare] =
    useState<OrchestrationSnapshotComparePayload | null>(null);
  const [selectedSnapshotRecommendation, setSelectedSnapshotRecommendation] =
    useState<OrchestrationSnapshotRestoreRecommendationPayload | null>(null);
  const [snapshotLimit] = useState<number>(5);
  const [snapshotAction, setSnapshotAction] = useState<
    'export' | 'restore' | 'delete' | 'detail' | null
  >(null);
  const [selectedSnapshotFileName, setSelectedSnapshotFileName] = useState<string | null>(null);
  const [selectedSnapshotDetail, setSelectedSnapshotDetail] =
    useState<OrchestrationSnapshotDetail | null>(null);

  const runSnapshotAction = async (
    action: 'export' | 'restore' | 'delete' | 'detail',
    fallbackError: string,
    work: () => Promise<void>
  ) => {
    setSnapshotAction(action);
    setStatusError(null);
    try {
      await work();
    } catch (error) {
      setStatusError(error instanceof Error ? error.message : fallbackError);
    } finally {
      setSnapshotAction(null);
    }
  };

  const handleLoadMoreSnapshots = () =>
    !snapshotHasMore
      ? Promise.resolve()
      : runSnapshotAction('detail', 'Failed to load more snapshots', async () => {
          const response = await subagentOrchestrationService.getSnapshotHistory({
            offset: snapshots.length,
            limit: snapshotLimit,
            q: snapshotSearch,
            order: snapshotOrder,
            ...(snapshotLabelFilter ? { label: snapshotLabelFilter } : {}),
          });
          setSnapshots(prev => [...prev, ...response.data.items]);
          setSnapshotFacets(response.data.facets ?? []);
          setSnapshotHasMore(response.data.pageInfo.hasMore);
          setSnapshotTotal(response.data.pageInfo.total);
        });

  const handleExportSnapshot = () =>
    runSnapshotAction('export', 'Failed to export snapshot', async () => {
      await subagentOrchestrationService.exportSnapshot(
        assistantId ? `${assistantId}-panel` : 'command-center'
      );
      await reloadAll();
    });

  const handleRestoreLatestSnapshot = (fileName?: string) =>
    runSnapshotAction('restore', 'Failed to restore snapshot', async () => {
      const targetSnapshot = fileName ?? selectedSnapshotFileName ?? snapshots[0]?.fileName;
      await subagentOrchestrationService.restoreSnapshot(targetSnapshot);
      await reloadAll();
    });

  const handleSelectSnapshot = (fileName: string) =>
    runSnapshotAction('detail', 'Failed to load snapshot detail', async () => {
      const response = await subagentOrchestrationService.getSnapshot(fileName);
      setSelectedSnapshotFileName(fileName);
      setSelectedSnapshotDetail(response.data);
    });

  const handleDeleteSnapshot = (fileName: string) =>
    runSnapshotAction('delete', 'Failed to delete snapshot', async () => {
      await subagentOrchestrationService.deleteSnapshot(fileName);
      if (selectedSnapshotFileName === fileName) {
        setSelectedSnapshotFileName(null);
        setSelectedSnapshotDetail(null);
      }
      await reloadAll();
    });

  const handlePreviewSnapshotRestore = (fileName: string) =>
    runSnapshotAction('detail', 'Failed to preview snapshot', async () => {
      const response = await subagentOrchestrationService.getSnapshotRestorePreview(fileName);
      setSelectedSnapshotPreview(response.data);
    });

  const handleCompareSnapshot = (fileName: string) =>
    runSnapshotAction('detail', 'Failed to compare snapshot', async () => {
      const response = await subagentOrchestrationService.getSnapshotCompare(
        fileName,
        snapshotCompareTarget
      );
      setSelectedSnapshotCompare(response.data);
    });

  const handleRecommendSnapshotRestore = (fileName: string) =>
    runSnapshotAction('detail', 'Failed to load recommendation', async () => {
      const response = await subagentOrchestrationService.getSnapshotRestoreRecommendation(
        fileName,
        snapshotCompareTarget
      );
      setSelectedSnapshotRecommendation(response.data);
    });

  return {
    snapshots,
    setSnapshots,
    snapshotSearch,
    setSnapshotSearch,
    snapshotOrder,
    setSnapshotOrder,
    snapshotLabelFilter,
    setSnapshotLabelFilter,
    snapshotCompareTarget,
    setSnapshotCompareTarget,
    snapshotHasMore,
    setSnapshotHasMore,
    snapshotTotal,
    setSnapshotTotal,
    snapshotFacets,
    setSnapshotFacets,
    snapshotLimit,
    selectedSnapshotPreview,
    selectedSnapshotCompare,
    selectedSnapshotRecommendation,
    snapshotAction,
    selectedSnapshotFileName,
    setSelectedSnapshotFileName,
    selectedSnapshotDetail,
    setSelectedSnapshotDetail,
    handleLoadMoreSnapshots,
    handleExportSnapshot,
    handleRestoreLatestSnapshot,
    handleSelectSnapshot,
    handleDeleteSnapshot,
    handlePreviewSnapshotRestore,
    handleCompareSnapshot,
    handleRecommendSnapshotRestore,
  };
}
