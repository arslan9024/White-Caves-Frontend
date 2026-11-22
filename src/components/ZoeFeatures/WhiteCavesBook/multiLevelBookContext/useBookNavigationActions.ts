// src/components/ZoeFeatures/WhiteCavesBook/multiLevelBookContext/useBookNavigationActions.ts
import { TreeNavigationSnapshot } from '../navigationHistoryTypes';
import { MasterCorpusRoot } from '../treeTypes';
import { findNodeNavigationPatch } from './nodeLookup';
import { NodeIdSetters, ResolvedBookNodes } from './types';

interface UseBookNavigationActionsParams {
  corpus: MasterCorpusRoot;
  nodes: ResolvedBookNodes;
  snapshot: TreeNavigationSnapshot;
  setters: NodeIdSetters;
}

export const useBookNavigationActions = ({
  corpus,
  nodes,
  snapshot,
  setters,
}: UseBookNavigationActionsParams) => {
  const { currentLibrary, currentBook, currentVolume } = nodes;
  const {
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
  } = setters;

  const resetToChapter = () => {
    setSubChapterId(null);
    setSectionId(null);
    setTopicId(null);
    setArtifactId(null);
    setParagraphId(null);
    setSentenceId(null);
    setLineId(null);
  };

  const selectBook = (id: string) => {
    setBookId(id);
    const targetBook = currentLibrary.books.find(b => b.bookId === id);
    if (targetBook && targetBook.volumes.length > 0) {
      const firstVol = targetBook.volumes[0];
      setVolId(firstVol.nodeId);
      if (firstVol.cantos.length > 0) {
        const firstCanto = firstVol.cantos[0];
        setCantoId(firstCanto.nodeId);
        if (firstCanto.chapters.length > 0) {
          setChapterId(firstCanto.chapters[0].nodeId);
        }
      }
    }
    resetToChapter();
  };

  const selectVolume = (id: string) => {
    setVolId(id);
    const target = currentBook.volumes.find(v => v.nodeId === id);
    if (target && target.cantos.length > 0) {
      setCantoId(target.cantos[0].nodeId);
      if (target.cantos[0].chapters.length > 0) {
        setChapterId(target.cantos[0].chapters[0].nodeId);
      }
    }
    resetToChapter();
  };

  const selectCanto = (id: string) => {
    setCantoId(id);
    const target = currentVolume.cantos.find(c => c.nodeId === id);
    if (target && target.chapters.length > 0) {
      setChapterId(target.chapters[0].nodeId);
    }
    resetToChapter();
  };

  const selectChapter = (id: string) => {
    setChapterId(id);
    resetToChapter();
  };

  const selectSubChapter = (id: string) => {
    setSubChapterId(id);
    setSectionId(null);
    setTopicId(null);
    setArtifactId(null);
    setParagraphId(null);
    setSentenceId(null);
    setLineId(null);
  };

  const selectSection = (id: string) => {
    setSectionId(id);
    setTopicId(null);
    setArtifactId(null);
    setParagraphId(null);
    setSentenceId(null);
    setLineId(null);
  };

  const selectTopic = (id: string) => {
    setTopicId(id);
    setArtifactId(null);
    setParagraphId(null);
    setSentenceId(null);
    setLineId(null);
  };

  const selectArtifact = (id: string) => {
    setArtifactId(id);
    setParagraphId(null);
    setSentenceId(null);
    setLineId(null);
  };

  const selectParagraph = (id: string) => {
    setParagraphId(id);
    setSentenceId(null);
    setLineId(null);
  };

  const selectSentence = (id: string) => {
    setSentenceId(id);
    setLineId(null);
  };

  const selectLine = (id: string) => {
    setLineId(id);
  };

  const navigateToNodeId = (targetId: string): boolean => {
    const patch = findNodeNavigationPatch(corpus, targetId);
    if (!patch) return false;

    setBookId(patch.bookId);
    if (patch.volId !== undefined) setVolId(patch.volId);
    if (patch.cantoId !== undefined) setCantoId(patch.cantoId);
    if (patch.chapterId !== undefined) setChapterId(patch.chapterId);
    if (patch.subChapterId !== undefined) setSubChapterId(patch.subChapterId);
    if (patch.sectionId !== undefined) setSectionId(patch.sectionId);
    if (patch.topicId !== undefined) setTopicId(patch.topicId);
    if (patch.artifactId !== undefined) setArtifactId(patch.artifactId);
    if (patch.paragraphId !== undefined) setParagraphId(patch.paragraphId);
    if (patch.resetBelowChapter) resetToChapter();

    return true;
  };

  const returnUpOneLevel = () => {
    if (snapshot.lineId) {
      setLineId(null);
    } else if (snapshot.sentenceId) {
      setSentenceId(null);
    } else if (snapshot.paragraphId) {
      setParagraphId(null);
    } else if (snapshot.artifactId) {
      setArtifactId(null);
    } else if (snapshot.topicId) {
      setTopicId(null);
    } else if (snapshot.sectionId) {
      setSectionId(null);
    } else if (snapshot.subChapterId) {
      setSubChapterId(null);
    }
  };

  return {
    selectBook,
    selectVolume,
    selectCanto,
    selectChapter,
    selectSubChapter,
    selectSection,
    selectTopic,
    selectArtifact,
    selectParagraph,
    selectSentence,
    selectLine,
    navigateToNodeId,
    returnUpOneLevel,
    resetToChapter,
  };
};
