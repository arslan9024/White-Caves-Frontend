/**
 * Book of White Caves continuous sync validator (Point 86 / TURING-BOOK-011).
 */
export function isBookIndexSynced(chapterCount: number, indexedCount: number): boolean {
  return chapterCount > 0 && chapterCount === indexedCount;
}
