// src/components/ZoeFeatures/WhiteCavesBook/treeQueryEngine.ts
/**
 * AEGIS 12-Level Sovereign Knowledge Tree Query Engine (TURING-LAW-000)
 * Enables sub-60-token surgical node resolution across the 12-level hierarchy.
 */

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
} from './treeTypes';
import {
  type SearchMatch,
  calculateTokenSavingsBenchmark,
  search12LevelTree,
} from './treeOmniSearch';

export { type SearchMatch, calculateTokenSavingsBenchmark, search12LevelTree };

export type TreeNode =
  | MasterCorpusRoot
  | ProjectLibraryNode
  | BookNode
  | VolumeNode
  | CantoNode
  | ChapterNode
  | SubChapterNode
  | SectionNode
  | TopicNode
  | LeafArtifactNode
  | ParagraphNode
  | SentenceNode
  | LineNode;

export interface QueryCoordinate {
  corpusName?: string;
  libraryId?: string;
  bookId?: string;
  volumeId?: string;
  cantoId?: string;
  chapterId?: string;
  subChapterId?: string;
  sectionId?: string;
  topicId?: string;
  artifactId?: string;
  paragraphId?: string;
  sentenceId?: string;
  lineId?: string;
}

export interface NodeLookupResult {
  node: TreeNode;
  level: number;
  lineage: {
    level: number;
    titleOrId: string;
  }[];
  tokenEstimate: number;
}

export function findNodeById(
  root: MasterCorpusRoot,
  targetNodeId: string
): NodeLookupResult | null {
  for (const lib of root.libraries) {
    if (lib.libraryId === targetNodeId) {
      return {
        node: lib,
        level: 1,
        lineage: [
          { level: 0, titleOrId: root.corpusName },
          { level: 1, titleOrId: lib.title },
        ],
        tokenEstimate: 40,
      };
    }
    for (const book of lib.books) {
      if (book.bookId === targetNodeId) {
        return {
          node: book,
          level: 2,
          lineage: [
            { level: 0, titleOrId: root.corpusName },
            { level: 1, titleOrId: lib.title },
            { level: 2, titleOrId: book.title },
          ],
          tokenEstimate: 45,
        };
      }
      for (const vol of book.volumes) {
        if (vol.nodeId === targetNodeId) {
          return {
            node: vol,
            level: 3,
            lineage: [
              { level: 0, titleOrId: root.corpusName },
              { level: 1, titleOrId: lib.title },
              { level: 2, titleOrId: book.title },
              { level: 3, titleOrId: vol.title },
            ],
            tokenEstimate: 50,
          };
        }
        for (const canto of vol.cantos) {
          if (canto.nodeId === targetNodeId) {
            return {
              node: canto,
              level: 4,
              lineage: [
                { level: 0, titleOrId: root.corpusName },
                { level: 1, titleOrId: lib.title },
                { level: 2, titleOrId: book.title },
                { level: 3, titleOrId: vol.title },
                { level: 4, titleOrId: canto.title },
              ],
              tokenEstimate: 50,
            };
          }
          for (const ch of canto.chapters) {
            if (ch.nodeId === targetNodeId || ch.chapterCode === targetNodeId) {
              return {
                node: ch,
                level: 5,
                lineage: [
                  { level: 0, titleOrId: root.corpusName },
                  { level: 1, titleOrId: lib.title },
                  { level: 2, titleOrId: book.title },
                  { level: 3, titleOrId: vol.title },
                  { level: 4, titleOrId: canto.title },
                  { level: 5, titleOrId: ch.title },
                ],
                tokenEstimate: 60,
              };
            }
            for (const sc of ch.subChapters) {
              if (sc.nodeId === targetNodeId) {
                return {
                  node: sc,
                  level: 6,
                  lineage: [
                    { level: 0, titleOrId: root.corpusName },
                    { level: 5, titleOrId: ch.title },
                    { level: 6, titleOrId: sc.title },
                  ],
                  tokenEstimate: 50,
                };
              }
              for (const sec of sc.sections) {
                if (sec.nodeId === targetNodeId) {
                  return {
                    node: sec,
                    level: 7,
                    lineage: [
                      { level: 5, titleOrId: ch.title },
                      { level: 6, titleOrId: sc.title },
                      { level: 7, titleOrId: sec.title },
                    ],
                    tokenEstimate: 45,
                  };
                }
                for (const top of sec.topics) {
                  if (top.nodeId === targetNodeId) {
                    return {
                      node: top,
                      level: 8,
                      lineage: [
                        { level: 6, titleOrId: sc.title },
                        { level: 7, titleOrId: sec.title },
                        { level: 8, titleOrId: top.title },
                      ],
                      tokenEstimate: 40,
                    };
                  }
                  for (const art of top.artifacts) {
                    if (art.nodeId === targetNodeId) {
                      return {
                        node: art,
                        level: 9,
                        lineage: [
                          { level: 7, titleOrId: sec.title },
                          { level: 8, titleOrId: top.title },
                          { level: 9, titleOrId: art.title },
                        ],
                        tokenEstimate: 50,
                      };
                    }
                    for (const p of art.paragraphs) {
                      if (p.nodeId === targetNodeId) {
                        return {
                          node: p,
                          level: 10,
                          lineage: [
                            { level: 8, titleOrId: top.title },
                            { level: 9, titleOrId: art.title },
                            { level: 10, titleOrId: p.header || p.nodeId },
                          ],
                          tokenEstimate: Math.max(15, Math.ceil(p.narrative.length / 4)),
                        };
                      }
                      for (const s of p.sentences) {
                        if (s.nodeId === targetNodeId) {
                          return {
                            node: s,
                            level: 11,
                            lineage: [
                              { level: 9, titleOrId: art.title },
                              { level: 10, titleOrId: p.header || p.nodeId },
                              { level: 11, titleOrId: s.nodeId },
                            ],
                            tokenEstimate: Math.max(10, Math.ceil(s.statement.length / 4)),
                          };
                        }
                        for (const l of s.lines) {
                          if (l.nodeId === targetNodeId) {
                            return {
                              node: l,
                              level: 12,
                              lineage: [
                                { level: 0, titleOrId: root.corpusName },
                                { level: 2, titleOrId: book.title },
                                { level: 5, titleOrId: ch.title },
                                { level: 9, titleOrId: art.title },
                                { level: 10, titleOrId: p.header || p.nodeId },
                                { level: 11, titleOrId: s.nodeId },
                                { level: 12, titleOrId: `L#${l.lineNumber}` },
                              ],
                              tokenEstimate: Math.max(5, Math.ceil(l.text.length / 4)),
                            };
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  return null;
}

export function queryTreeCoordinate(
  root: MasterCorpusRoot,
  coord: QueryCoordinate
): TreeNode | null {
  const checks: Array<[string | undefined, number]> = [
    [coord.lineId, 12],
    [coord.sentenceId, 11],
    [coord.paragraphId, 10],
    [coord.artifactId, 9],
    [coord.topicId, 8],
    [coord.sectionId, 7],
    [coord.subChapterId, 6],
    [coord.chapterId, 5],
  ];
  for (const [id, expectedLevel] of checks) {
    if (id) {
      const res = findNodeById(root, id);
      if (res && res.level === expectedLevel) return res.node;
    }
  }
  return null;
}
