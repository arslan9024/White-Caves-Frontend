// src/components/ZoeFeatures/WhiteCavesBook/multiLevelBookContext/types.ts
import { Dispatch, ReactNode, SetStateAction } from 'react';
import {
  MasterCorpusRoot,
  ProjectLibraryNode,
  BookNode,
  VolumeNode,
  CantoNode,
  ChapterNode,
  SubChapterNode,
  SectionNode,
  TopicNode,
  LeafArtifactNode,
  ParagraphNode,
  SentenceNode,
  LineNode,
  NavigationBreadcrumb,
} from '../treeTypes';

export interface MultiLevelBookContextType {
  corpus: MasterCorpusRoot;
  currentLibrary: ProjectLibraryNode;
  currentBook: BookNode;
  currentVolume: VolumeNode;
  currentCanto: CantoNode;
  currentChapter: ChapterNode;
  currentSubChapter: SubChapterNode | null;
  currentSection: SectionNode | null;
  currentTopic: TopicNode | null;
  currentArtifact: LeafArtifactNode | null;
  currentParagraph: ParagraphNode | null;
  currentSentence: SentenceNode | null;
  currentLine: LineNode | null;
  activeLevel: number;
  breadcrumbs: NavigationBreadcrumb[];
  searchQuery: string;
  setSearchQuery: (q: string) => void;

  // History stack controls
  canGoBack: boolean;
  canGoForward: boolean;
  goBack: () => void;
  goForward: () => void;
  historyLength: number;

  // Level selector actions
  selectBook: (bookId: string) => void;
  selectVolume: (volId: string) => void;
  selectCanto: (cantoId: string) => void;
  selectChapter: (chapterId: string) => void;
  selectSubChapter: (subId: string) => void;
  selectSection: (secId: string) => void;
  selectTopic: (topId: string) => void;
  selectArtifact: (artId: string) => void;
  selectParagraph: (pId: string) => void;
  selectSentence: (sId: string) => void;
  selectLine: (lId: string) => void;
  navigateToNodeId: (nodeId: string) => boolean;
  returnUpOneLevel: () => void;
  resetToChapter: () => void;
}

export interface MultiLevelBookProviderProps {
  children: ReactNode;
  initialBookId?: string;
}

export interface ResolvedBookNodes {
  currentLibrary: ProjectLibraryNode;
  currentBook: BookNode;
  currentVolume: VolumeNode;
  currentCanto: CantoNode;
  currentChapter: ChapterNode;
  currentSubChapter: SubChapterNode | null;
  currentSection: SectionNode | null;
  currentTopic: TopicNode | null;
  currentArtifact: LeafArtifactNode | null;
  currentParagraph: ParagraphNode | null;
  currentSentence: SentenceNode | null;
  currentLine: LineNode | null;
}

export interface NodeIdSetters {
  setBookId: Dispatch<SetStateAction<string>>;
  setVolId: Dispatch<SetStateAction<string>>;
  setCantoId: Dispatch<SetStateAction<string>>;
  setChapterId: Dispatch<SetStateAction<string>>;
  setSubChapterId: Dispatch<SetStateAction<string | null>>;
  setSectionId: Dispatch<SetStateAction<string | null>>;
  setTopicId: Dispatch<SetStateAction<string | null>>;
  setArtifactId: Dispatch<SetStateAction<string | null>>;
  setParagraphId: Dispatch<SetStateAction<string | null>>;
  setSentenceId: Dispatch<SetStateAction<string | null>>;
  setLineId: Dispatch<SetStateAction<string | null>>;
}
