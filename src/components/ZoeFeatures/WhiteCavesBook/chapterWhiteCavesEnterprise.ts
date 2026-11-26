// src/components/ZoeFeatures/WhiteCavesBook/chapterWhiteCavesEnterprise.ts
import { ChapterNode } from './treeTypes';
import { ENTERPRISE_SUBCHAPTERS_PART1 } from './chapterWhiteCavesEnterprise/visionDldFinance';
import { ENTERPRISE_SUBCHAPTERS_PART2 } from './chapterWhiteCavesEnterprise/communitiesVipJourney';

/**
 * Chapter 01 (White Caves): Enterprise Real Estate Operations & Brokerage Divisions
 * Contains authoritative real estate business SOPs, Dubai Land Department compliance,
 * and property floor operations across White Caves Real Estate LLC.
 */
export const CHAPTER_WHITE_CAVES_ENTERPRISE: ChapterNode = {
  level: 5,
  nodeId: 'CH05-WC-01',
  chapterNumber: 1,
  chapterCode: 'CH-01-ENTERPRISE',
  title: 'Chapter 01: White Caves Real Estate Enterprise Operations',
  subtitle: 'Dubai Brokerage Operations, 12 Corporate Floors, DLD/RERA Compliance & Client Journey',
  readTimeMinutes: 35,
  overviewMarkdown:
    'White Caves Real Estate LLC represents sovereign prop-tech engineering in Dubai. This volume covers the complete lifecycle of our 12 Corporate Floors, governed under statutory protocol AEG-012, with deep links to [Protocol Catalog](CH05-PROTOCOLS) and the autonomous [Turing Architecture](CH05-001). Cross-reference active departments via [Department SOPs](CH05-DEPARTMENT-SOPS) or review statutory escrow settlement rules in [Valkyrie Ledger](AEG-026).',
  subChapters: [...ENTERPRISE_SUBCHAPTERS_PART1, ...ENTERPRISE_SUBCHAPTERS_PART2],
};
