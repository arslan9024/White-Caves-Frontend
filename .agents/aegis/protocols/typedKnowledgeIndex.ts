/**
 * Compiler-checked AEGIS knowledge chapter registry (Point 96 / TURING-DUAL-FORMAT-014).
 */
export interface KnowledgeChapter {
  id: string;
  title: string;
  path: string;
}

export const CORE_KNOWLEDGE_CHAPTERS: readonly KnowledgeChapter[] = [
  {
    id: 'ch-11',
    title: 'Siddhanta Operational Kernel',
    path: '.agents/book-white-caves/chapter-11-siddhanta-operational-kernel.html',
  },
];
