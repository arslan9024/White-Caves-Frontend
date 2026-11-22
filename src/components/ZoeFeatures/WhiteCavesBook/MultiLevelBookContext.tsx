// src/components/ZoeFeatures/WhiteCavesBook/MultiLevelBookContext.tsx
import React, { createContext, useContext, useState, useMemo, useCallback, useEffect } from 'react';
import { AEGIS_12_LEVEL_CORPUS } from './masterLibraryData';
import { TreeNavigationSnapshot } from './navigationHistoryTypes';
import { MasterCorpusRoot } from './treeTypes';
import {
  buildNavigationBreadcrumbs,
  computeActiveLevel,
  resolveCurrentNodes,
} from './multiLevelBookContext/bookDerivations';
import {
  MultiLevelBookContextType,
  MultiLevelBookProviderProps,
} from './multiLevelBookContext/types';
import { useBookHistory } from './multiLevelBookContext/useBookHistory';
import { useBookNavigationActions } from './multiLevelBookContext/useBookNavigationActions';

const MultiLevelBookContext = createContext<MultiLevelBookContextType | null>(null);

export const MultiLevelBookProvider: React.FC<MultiLevelBookProviderProps> = ({
  children,
  initialBookId = 'book-01-white-caves',
}) => {
  const [corpus] = useState<MasterCorpusRoot>(AEGIS_12_LEVEL_CORPUS);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Selected level keys
  const [bookId, setBookId] = useState<string>(initialBookId);
  const [volId, setVolId] = useState<string>('VL03-001');
  const [cantoId, setCantoId] = useState<string>('CN04-001');
  const [chapterId, setChapterId] = useState<string>('CH05-001');
  const [subChapterId, setSubChapterId] = useState<string | null>(null);
  const [sectionId, setSectionId] = useState<string | null>(null);
  const [topicId, setTopicId] = useState<string | null>(null);
  const [artifactId, setArtifactId] = useState<string | null>(null);
  const [paragraphId, setParagraphId] = useState<string | null>(null);
  const [sentenceId, setSentenceId] = useState<string | null>(null);
  const [lineId, setLineId] = useState<string | null>(null);

  // Sync initialBookId if parent changes
  useEffect(() => {
    if (initialBookId) {
      setBookId(initialBookId);
    }
  }, [initialBookId]);

  const currentSnapshot: TreeNavigationSnapshot = useMemo(
    () => ({
      bookId,
      volId,
      cantoId,
      chapterId,
      subChapterId,
      sectionId,
      topicId,
      artifactId,
      paragraphId,
      sentenceId,
      lineId,
    }),
    [
      bookId,
      volId,
      cantoId,
      chapterId,
      subChapterId,
      sectionId,
      topicId,
      artifactId,
      paragraphId,
      sentenceId,
      lineId,
    ]
  );

  const handleApplySnapshot = useCallback((snap: TreeNavigationSnapshot) => {
    setBookId(snap.bookId);
    setVolId(snap.volId);
    setCantoId(snap.cantoId);
    setChapterId(snap.chapterId);
    setSubChapterId(snap.subChapterId);
    setSectionId(snap.sectionId);
    setTopicId(snap.topicId);
    setArtifactId(snap.artifactId);
    setParagraphId(snap.paragraphId);
    setSentenceId(snap.sentenceId);
    setLineId(snap.lineId);
  }, []);

  const historyControls = useBookHistory({
    initialBookId,
    currentSnapshot,
    onApplySnapshot: handleApplySnapshot,
  });

  const resolvedNodes = useMemo(
    () => resolveCurrentNodes(corpus, currentSnapshot),
    [corpus, currentSnapshot]
  );

  const activeLevel = useMemo(() => computeActiveLevel(resolvedNodes), [resolvedNodes]);

  const breadcrumbs = useMemo(
    () => buildNavigationBreadcrumbs(corpus, resolvedNodes),
    [corpus, resolvedNodes]
  );

  const navigationActions = useBookNavigationActions({
    corpus,
    nodes: resolvedNodes,
    snapshot: currentSnapshot,
    setters: {
      setBookId,
      setVolId,
      setCantoId,
      setChapterId,
      setSubChapterId,
      setSectionId,
      setTopicId,
      setArtifactId,
      setParagraphId,
      setSentenceId,
      setLineId,
    },
  });

  return (
    <MultiLevelBookContext.Provider
      value={{
        corpus,
        ...resolvedNodes,
        activeLevel,
        breadcrumbs,
        searchQuery,
        setSearchQuery,
        ...historyControls,
        ...navigationActions,
      }}
    >
      {children}
    </MultiLevelBookContext.Provider>
  );
};

export const useMultiLevelBook = (): MultiLevelBookContextType => {
  const ctx = useContext(MultiLevelBookContext);
  if (!ctx) {
    throw new Error('useMultiLevelBook must be used within MultiLevelBookProvider');
  }
  return ctx;
};
