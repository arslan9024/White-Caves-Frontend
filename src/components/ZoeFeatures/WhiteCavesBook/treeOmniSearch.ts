/**
 * AEGIS 12-Level Sovereign Knowledge Tree — Omni-Search & Token Benchmark
 */

import type { MasterCorpusRoot } from './treeTypes';

export interface SearchMatch {
  nodeId: string;
  level: number;
  levelName: string;
  title: string;
  snippet: string;
  bookId: string;
  bookTitle: string;
  chapterTitle: string;
  tokenEstimate: number;
}

export function calculateTokenSavingsBenchmark(
  traditionalMarkdownTokenCost: number = 8000,
  surgicalNodeTokenCost: number = 50
): {
  markdownCost: number;
  surgicalCost: number;
  savingsPercentage: number;
  multiplierFactor: number;
} {
  const savings =
    ((traditionalMarkdownTokenCost - surgicalNodeTokenCost) / traditionalMarkdownTokenCost) * 100;
  const factor = traditionalMarkdownTokenCost / Math.max(1, surgicalNodeTokenCost);
  return {
    markdownCost: traditionalMarkdownTokenCost,
    surgicalCost: surgicalNodeTokenCost,
    savingsPercentage: Number(savings.toFixed(2)),
    multiplierFactor: Number(factor.toFixed(1)),
  };
}

export function search12LevelTree(
  root: MasterCorpusRoot,
  rawQuery: string,
  limit: number = 20
): SearchMatch[] {
  if (!rawQuery || rawQuery.trim().length < 2) return [];
  const q = rawQuery.toLowerCase().trim();
  const results: SearchMatch[] = [];

  for (const lib of root.libraries) {
    for (const book of lib.books) {
      for (const vol of book.volumes) {
        for (const canto of vol.cantos) {
          for (const ch of canto.chapters) {
            if (ch.title.toLowerCase().includes(q) || ch.subtitle.toLowerCase().includes(q)) {
              results.push({
                nodeId: ch.nodeId,
                level: 5,
                levelName: 'Chapter',
                title: ch.title,
                snippet: ch.subtitle,
                bookId: book.bookId,
                bookTitle: book.title,
                chapterTitle: ch.title,
                tokenEstimate: 60,
              });
              if (results.length >= limit) return results;
            }

            for (const sc of ch.subChapters) {
              if (sc.title.toLowerCase().includes(q) || sc.summary.toLowerCase().includes(q)) {
                results.push({
                  nodeId: sc.nodeId,
                  level: 6,
                  levelName: 'SubChapter',
                  title: sc.title,
                  snippet: sc.summary.slice(0, 120),
                  bookId: book.bookId,
                  bookTitle: book.title,
                  chapterTitle: ch.title,
                  tokenEstimate: 50,
                });
                if (results.length >= limit) return results;
              }

              for (const sec of sc.sections) {
                for (const top of sec.topics) {
                  for (const art of top.artifacts) {
                    if (art.title.toLowerCase().includes(q)) {
                      results.push({
                        nodeId: art.nodeId,
                        level: 9,
                        levelName: 'Artifact',
                        title: art.title,
                        snippet: `Artifact [${art.type}] in ${sec.title}`,
                        bookId: book.bookId,
                        bookTitle: book.title,
                        chapterTitle: ch.title,
                        tokenEstimate: 45,
                      });
                      if (results.length >= limit) return results;
                    }

                    for (const p of art.paragraphs) {
                      if (
                        p.narrative.toLowerCase().includes(q) ||
                        (p.header && p.header.toLowerCase().includes(q))
                      ) {
                        results.push({
                          nodeId: p.nodeId,
                          level: 10,
                          levelName: 'Paragraph',
                          title: p.header || `Paragraph ${p.paragraphNumber}`,
                          snippet: p.narrative.slice(0, 140) + '...',
                          bookId: book.bookId,
                          bookTitle: book.title,
                          chapterTitle: ch.title,
                          tokenEstimate: 35,
                        });
                        if (results.length >= limit) return results;
                      }

                      for (const s of p.sentences) {
                        if (s.statement.toLowerCase().includes(q)) {
                          results.push({
                            nodeId: s.nodeId,
                            level: 11,
                            levelName: 'Sentence',
                            title: `Sentence ${s.sentenceNumber}`,
                            snippet: s.statement,
                            bookId: book.bookId,
                            bookTitle: book.title,
                            chapterTitle: ch.title,
                            tokenEstimate: 25,
                          });
                          if (results.length >= limit) return results;
                        }

                        for (const l of s.lines) {
                          if (l.text.toLowerCase().includes(q)) {
                            results.push({
                              nodeId: l.nodeId,
                              level: 12,
                              levelName: 'Line',
                              title: `Line ${l.lineNumber}`,
                              snippet: l.text,
                              bookId: book.bookId,
                              bookTitle: book.title,
                              chapterTitle: ch.title,
                              tokenEstimate: 15,
                            });
                            if (results.length >= limit) return results;
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

  return results;
}
