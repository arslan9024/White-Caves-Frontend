// src/components/ZoeFeatures/WhiteCavesBook/multiLevelBookContext/bookDerivations.ts
import { TreeNavigationSnapshot } from '../navigationHistoryTypes';
import { MasterCorpusRoot, NavigationBreadcrumb } from '../treeTypes';
import { ResolvedBookNodes } from './types';

export const resolveCurrentNodes = (
  corpus: MasterCorpusRoot,
  snapshot: TreeNavigationSnapshot
): ResolvedBookNodes => {
  const currentLibrary = corpus.libraries[0];
  const currentBook =
    currentLibrary.books.find(b => b.bookId === snapshot.bookId) || currentLibrary.books[0];
  const currentVolume =
    currentBook.volumes.find(v => v.nodeId === snapshot.volId) || currentBook.volumes[0];
  const currentCanto =
    currentVolume.cantos.find(c => c.nodeId === snapshot.cantoId) || currentVolume.cantos[0];
  const currentChapter =
    currentCanto.chapters.find(ch => ch.nodeId === snapshot.chapterId) || currentCanto.chapters[0];

  const currentSubChapter = snapshot.subChapterId
    ? currentChapter.subChapters.find(sc => sc.nodeId === snapshot.subChapterId) || null
    : null;

  const currentSection =
    currentSubChapter && snapshot.sectionId
      ? currentSubChapter.sections.find(s => s.nodeId === snapshot.sectionId) || null
      : null;

  const currentTopic =
    currentSection && snapshot.topicId
      ? currentSection.topics.find(t => t.nodeId === snapshot.topicId) || null
      : null;

  const currentArtifact =
    currentTopic && snapshot.artifactId
      ? currentTopic.artifacts.find(a => a.nodeId === snapshot.artifactId) || null
      : null;

  const currentParagraph =
    currentArtifact && snapshot.paragraphId
      ? currentArtifact.paragraphs.find(p => p.nodeId === snapshot.paragraphId) || null
      : null;

  const currentSentence =
    currentParagraph && snapshot.sentenceId
      ? currentParagraph.sentences.find(s => s.nodeId === snapshot.sentenceId) || null
      : null;

  const currentLine =
    currentSentence && snapshot.lineId
      ? currentSentence.lines.find(l => l.nodeId === snapshot.lineId) || null
      : null;

  return {
    currentLibrary,
    currentBook,
    currentVolume,
    currentCanto,
    currentChapter,
    currentSubChapter,
    currentSection,
    currentTopic,
    currentArtifact,
    currentParagraph,
    currentSentence,
    currentLine,
  };
};

export const computeActiveLevel = (nodes: ResolvedBookNodes): number => {
  if (nodes.currentLine) return 12;
  if (nodes.currentSentence) return 11;
  if (nodes.currentParagraph) return 10;
  if (nodes.currentArtifact) return 9;
  if (nodes.currentTopic) return 8;
  if (nodes.currentSection) return 7;
  if (nodes.currentSubChapter) return 6;
  return 5; // Chapter level baseline
};

export const buildNavigationBreadcrumbs = (
  corpus: MasterCorpusRoot,
  nodes: ResolvedBookNodes
): NavigationBreadcrumb[] => {
  const {
    currentLibrary,
    currentBook,
    currentVolume,
    currentCanto,
    currentChapter,
    currentSubChapter,
    currentSection,
    currentTopic,
    currentArtifact,
    currentParagraph,
    currentSentence,
    currentLine,
  } = nodes;

  const breadcrumbs: NavigationBreadcrumb[] = [
    { level: 0, levelName: 'L0: Corpus', label: corpus.corpusName, pathId: 'corpus' },
    {
      level: 1,
      levelName: 'L1: Library',
      label: currentLibrary.title,
      pathId: currentLibrary.libraryId,
    },
    { level: 2, levelName: 'L2: Book', label: currentBook.title, pathId: currentBook.bookId },
    {
      level: 3,
      levelName: 'L3: Volume',
      label: `Vol ${currentVolume.volumeNumber}`,
      pathId: currentVolume.nodeId,
    },
    {
      level: 4,
      levelName: 'L4: Canto',
      label: `Canto ${currentCanto.cantoNumber}`,
      pathId: currentCanto.nodeId,
    },
    {
      level: 5,
      levelName: 'L5: Chapter',
      label: currentChapter.chapterCode,
      pathId: currentChapter.nodeId,
    },
  ];

  if (currentSubChapter) {
    breadcrumbs.push({
      level: 6,
      levelName: 'L6: Sub-Ch',
      label: `SC-${currentSubChapter.subChapterNumber}`,
      pathId: currentSubChapter.nodeId,
    });
  }
  if (currentSection) {
    breadcrumbs.push({
      level: 7,
      levelName: 'L7: Section',
      label: `§ ${currentSection.sectionNumber}`,
      pathId: currentSection.nodeId,
    });
  }
  if (currentTopic) {
    breadcrumbs.push({
      level: 8,
      levelName: 'L8: Topic',
      label: `T-${currentTopic.topicNumber}`,
      pathId: currentTopic.nodeId,
    });
  }
  if (currentArtifact) {
    breadcrumbs.push({
      level: 9,
      levelName: 'L9: File',
      label: `Art #${currentArtifact.artifactNumber}`,
      pathId: currentArtifact.nodeId,
    });
  }
  if (currentParagraph) {
    breadcrumbs.push({
      level: 10,
      levelName: 'L10: Para',
      label: `¶ ${currentParagraph.paragraphNumber}`,
      pathId: currentParagraph.nodeId,
    });
  }
  if (currentSentence) {
    breadcrumbs.push({
      level: 11,
      levelName: 'L11: Sentence',
      label: `S.${currentSentence.sentenceNumber}`,
      pathId: currentSentence.nodeId,
    });
  }
  if (currentLine) {
    breadcrumbs.push({
      level: 12,
      levelName: 'L12: Line',
      label: `Line ${currentLine.lineNumber}`,
      pathId: currentLine.nodeId,
    });
  }

  return breadcrumbs;
};
