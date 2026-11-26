// src/components/ZoeFeatures/WhiteCavesBook/chapterOfProtocols.ts
import { ChapterNode } from './treeTypes';
import { PROTOCOL_SUBCHAPTERS_PART1 } from './chapterOfProtocols/prometheusTuringPhoenix';
import { PROTOCOL_SUBCHAPTERS_PART2 } from './chapterOfProtocols/valkyrieApocalypse';

export const CHAPTER_OF_PROTOCOLS: ChapterNode = {
  level: 5,
  nodeId: 'CH05-PROTOCOLS',
  chapterNumber: 42,
  chapterCode: 'CH-42-PROTOCOLS',
  title: 'Chapter 42: The Sovereign Protocol Canon (AEG-001 to AEG-042)',
  subtitle: 'Unified Mathematical Constitution: Prometheus, Turing, Phoenix, Valkyrie & Apocalypse',
  readTimeMinutes: 25,
  overviewMarkdown:
    'This is the constitutional bedrock of AEGIS V5.0 — the 42 statutory engineering protocols that govern every autonomous agent, every UI component, and every backend service across all White Caves repositories. The protocols are organized into five doctrinal pillars: Prometheus (AEG-001–009) governs frontend primitives and the [Context Triad](T08-P1.1.1); Turing (AEG-010–017) enforces zero-waste velocity and is explored in depth in [The Grand Architecture](CH05-001); Phoenix (AEG-018–025) handles security and testing contracts; Valkyrie (AEG-026–033) covers Dubai regulatory compliance, Ejari alerts, and VAT reserves (see [Enterprise Operations](CH05-WC-01)); and Apocalypse (AEG-034–042) powers OCR, market intelligence, and the XP leaderboard system. Every chapter in this library references specific AEG codes — click any protocol badge to navigate directly here.',
  subChapters: [...PROTOCOL_SUBCHAPTERS_PART1, ...PROTOCOL_SUBCHAPTERS_PART2],
};
