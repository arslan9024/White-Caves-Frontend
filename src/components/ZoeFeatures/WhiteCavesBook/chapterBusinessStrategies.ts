// Auto-generated 12-Level Living Book Chapter Node
import { ChapterNode } from './treeTypes';
import { CREDIT_PRESERVATION_SUB_CHAPTERS } from './chapterBusinessStrategies/creditPreservationSubChapters';
import { DEPARTMENT_ROLES_RBAC_SUB_CHAPTER } from './chapterBusinessStrategies/departmentRolesRbacSubChapter';
import { DUBAI_BUSINESS_STRATEGY_SUB_CHAPTERS } from './chapterBusinessStrategies/dubaiBusinessStrategySubChapters';
import { ENGINE_CONTINUITY_SUB_CHAPTERS } from './chapterBusinessStrategies/engineContinuitySubChapters';
import { REPEATING_PROGRAMMING_FLOWS_SUB_CHAPTERS } from './chapterBusinessStrategies/repeatingProgrammingFlowsSubChapters';

export const CHAPTER_BUSINESS_STRATEGIES: ChapterNode = {
  level: 5,
  nodeId: 'CH05-BIZ-STRAT',
  chapterNumber: 32,
  chapterCode: 'CH-32-BIZ-STRAT',
  title: 'Chapter 32: Enterprise Business Strategies & Continuous Laws',
  subtitle: 'Credit Preservation Law, Dubai Market Strategy, RBAC Engine & Infinite Crucible',
  readTimeMinutes: 35,
  overviewMarkdown:
    'This chapter establishes the core operational strategies governing White Caves and the AEGIS autonomous engine. It articulates the statutory Credit Preservation Law under TURING-LAW-000, multi-tier rule routing, and Dubai off-plan investment strategies. Discover how Level 5 RBAC safeguards critical CRM flows and how autonomous autopilot iterations resolve backlogs via the Infinite Crucible. For the full engineering constitution, see the [Sovereign Protocol Canon](CH05-PROTOCOLS); for project milestones, visit [Strategic Plans](CH05-STRAT-PLANS) and [Wave Sprints](CH05-WAVE-SPRINTS).',
  subChapters: [
    ...CREDIT_PRESERVATION_SUB_CHAPTERS,
    DEPARTMENT_ROLES_RBAC_SUB_CHAPTER,
    ...DUBAI_BUSINESS_STRATEGY_SUB_CHAPTERS,
    ...ENGINE_CONTINUITY_SUB_CHAPTERS,
    ...REPEATING_PROGRAMMING_FLOWS_SUB_CHAPTERS,
  ],
};
