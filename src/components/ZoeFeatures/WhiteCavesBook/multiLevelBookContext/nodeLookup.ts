// src/components/ZoeFeatures/WhiteCavesBook/multiLevelBookContext/nodeLookup.ts
import { MasterCorpusRoot } from '../treeTypes';

export interface NodeNavigationPatch {
  bookId: string;
  volId?: string;
  cantoId?: string;
  chapterId?: string;
  subChapterId?: string;
  sectionId?: string | null;
  topicId?: string | null;
  artifactId?: string | null;
  paragraphId?: string | null;
  resetBelowChapter?: boolean;
}

/**
 * Universal Hyperlink Navigator Lookup:
 * Finds any node across the 12-level hierarchy by its ID and returns the state patch to apply.
 */
export const findNodeNavigationPatch = (
  corpus: MasterCorpusRoot,
  targetId: string
): NodeNavigationPatch | null => {
  if (!targetId) return null;
  const cleanId = targetId.trim().replace(/^#/, '');

  for (const lib of corpus.libraries) {
    for (const b of lib.books) {
      if (b.bookId === cleanId) {
        return { bookId: b.bookId, resetBelowChapter: true };
      }
      for (const v of b.volumes) {
        if (v.nodeId === cleanId) {
          return { bookId: b.bookId, volId: v.nodeId, resetBelowChapter: true };
        }
        for (const c of v.cantos) {
          if (c.nodeId === cleanId) {
            return {
              bookId: b.bookId,
              volId: v.nodeId,
              cantoId: c.nodeId,
              resetBelowChapter: true,
            };
          }
          for (const ch of c.chapters) {
            if (ch.nodeId === cleanId || ch.chapterCode === cleanId) {
              return {
                bookId: b.bookId,
                volId: v.nodeId,
                cantoId: c.nodeId,
                chapterId: ch.nodeId,
                resetBelowChapter: true,
              };
            }
            for (const sc of ch.subChapters) {
              if (sc.nodeId === cleanId) {
                return {
                  bookId: b.bookId,
                  volId: v.nodeId,
                  cantoId: c.nodeId,
                  chapterId: ch.nodeId,
                  subChapterId: sc.nodeId,
                  sectionId: null,
                };
              }
              for (const sec of sc.sections) {
                if (sec.nodeId === cleanId) {
                  return {
                    bookId: b.bookId,
                    volId: v.nodeId,
                    cantoId: c.nodeId,
                    chapterId: ch.nodeId,
                    subChapterId: sc.nodeId,
                    sectionId: sec.nodeId,
                    topicId: null,
                  };
                }
                for (const top of sec.topics) {
                  if (top.nodeId === cleanId) {
                    return {
                      bookId: b.bookId,
                      volId: v.nodeId,
                      cantoId: c.nodeId,
                      chapterId: ch.nodeId,
                      subChapterId: sc.nodeId,
                      sectionId: sec.nodeId,
                      topicId: top.nodeId,
                      artifactId: null,
                    };
                  }
                  for (const art of top.artifacts) {
                    if (art.nodeId === cleanId) {
                      return {
                        bookId: b.bookId,
                        volId: v.nodeId,
                        cantoId: c.nodeId,
                        chapterId: ch.nodeId,
                        subChapterId: sc.nodeId,
                        sectionId: sec.nodeId,
                        topicId: top.nodeId,
                        artifactId: art.nodeId,
                        paragraphId: null,
                      };
                    }
                    for (const p of art.paragraphs) {
                      if (p.nodeId === cleanId) {
                        return {
                          bookId: b.bookId,
                          volId: v.nodeId,
                          cantoId: c.nodeId,
                          chapterId: ch.nodeId,
                          subChapterId: sc.nodeId,
                          sectionId: sec.nodeId,
                          topicId: top.nodeId,
                          artifactId: art.nodeId,
                          paragraphId: p.nodeId,
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
  return null;
};
