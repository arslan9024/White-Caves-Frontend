// src/components/ZoeFeatures/WhiteCavesBook/multiLevelBookContext/useBookHistory.ts
import { useState, useMemo, useRef, useCallback, useEffect } from 'react';
import { TreeNavigationSnapshot, areSnapshotsEqual } from '../navigationHistoryTypes';

interface UseBookHistoryParams {
  initialBookId: string;
  currentSnapshot: TreeNavigationSnapshot;
  onApplySnapshot: (snap: TreeNavigationSnapshot) => void;
}

export interface BookHistoryControls {
  canGoBack: boolean;
  canGoForward: boolean;
  goBack: () => void;
  goForward: () => void;
  historyLength: number;
}

export const useBookHistory = ({
  initialBookId,
  currentSnapshot,
  onApplySnapshot,
}: UseBookHistoryParams): BookHistoryControls => {
  const initialSnapshot: TreeNavigationSnapshot = useMemo(
    () => ({
      bookId: initialBookId,
      volId: 'VL03-001',
      cantoId: 'CN04-001',
      chapterId: 'CH05-001',
      subChapterId: null,
      sectionId: null,
      topicId: null,
      artifactId: null,
      paragraphId: null,
      sentenceId: null,
      lineId: null,
    }),
    [initialBookId]
  );

  const [history, setHistory] = useState<TreeNavigationSnapshot[]>([initialSnapshot]);
  const [historyIndex, setHistoryIndex] = useState<number>(0);
  const historyIndexRef = useRef<number>(0);
  const isNavigatingHistoryRef = useRef<boolean>(false);

  useEffect(() => {
    historyIndexRef.current = historyIndex;
  }, [historyIndex]);

  // Push snapshot to history when state changes (unless navigating through history)
  useEffect(() => {
    if (isNavigatingHistoryRef.current) {
      isNavigatingHistoryRef.current = false;
      return;
    }

    const activeIdx = historyIndexRef.current;
    setHistory(prev => {
      const active = prev[activeIdx];
      if (active && areSnapshotsEqual(active, currentSnapshot)) {
        return prev;
      }
      // Truncate any forward history and append the new snapshot
      return [...prev.slice(0, activeIdx + 1), currentSnapshot];
    });
    setHistoryIndex(prev => prev + 1);
  }, [currentSnapshot]);

  const applySnapshot = useCallback(
    (snap: TreeNavigationSnapshot) => {
      isNavigatingHistoryRef.current = true;
      onApplySnapshot(snap);
    },
    [onApplySnapshot]
  );

  const canGoBack = historyIndex > 0;
  const canGoForward = historyIndex < history.length - 1;

  const goBack = useCallback(() => {
    if (historyIndex > 0) {
      const targetIndex = historyIndex - 1;
      const targetSnap = history[targetIndex];
      if (targetSnap) {
        setHistoryIndex(targetIndex);
        applySnapshot(targetSnap);
      }
    }
  }, [historyIndex, history, applySnapshot]);

  const goForward = useCallback(() => {
    if (historyIndex < history.length - 1) {
      const targetIndex = historyIndex + 1;
      const targetSnap = history[targetIndex];
      if (targetSnap) {
        setHistoryIndex(targetIndex);
        applySnapshot(targetSnap);
      }
    }
  }, [historyIndex, history, applySnapshot]);

  return {
    canGoBack,
    canGoForward,
    goBack,
    goForward,
    historyLength: history.length,
  };
};
