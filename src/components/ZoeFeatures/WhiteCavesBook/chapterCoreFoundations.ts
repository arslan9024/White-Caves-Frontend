// Auto-generated 12-Level Living Book Chapter Node
import { ChapterNode } from './treeTypes';
import { FOUNDATIONS_MASTER_PLAN_SUB_CHAPTERS } from './chapterCoreFoundations/foundationsMasterPlanSubChapters';
import { FOUNDATIONS_PROGRESS_TRACKER_SUB_CHAPTERS } from './chapterCoreFoundations/foundationsProgressTrackerSubChapters';
import { FOUNDATIONS_TOOLING_GOVERNANCE_SUB_CHAPTERS } from './chapterCoreFoundations/foundationsToolingGovernanceSubChapters';

export {
  FOUNDATIONS_MASTER_PLAN_SUB_CHAPTERS,
  FOUNDATIONS_PROGRESS_TRACKER_SUB_CHAPTERS,
  FOUNDATIONS_TOOLING_GOVERNANCE_SUB_CHAPTERS,
};

export const CHAPTER_CORE_FOUNDATIONS: ChapterNode = {
  level: 5,
  nodeId: 'CH05-CORE-FOUNDATIONS',
  chapterNumber: 2,
  chapterCode: 'CH-02-FOUNDATIONS',
  title: 'Chapter 02: Sovereign Foundations & Operational Vision',
  subtitle: 'Grand Project Vision, Walkthroughs, Progress Audits & Tooling Assignments',
  readTimeMinutes: 30,
  overviewMarkdown:
    'This chapter establishes the foundational identity, organizational structure, and technical direction of White Caves Real Estate LLC. It documents the 1–12–108 corporate formula (1 Managing Director, 12 Departments, 108 fixed staff positions) alongside the parallel AI agent mesh governed by TURING-LAW-000. The corporate vision and brokerage mandate are detailed in [Enterprise Operations](CH05-WC-01), while the 42 constitutional protocols enforcing this vision are catalogued in the [Sovereign Protocol Canon](CH05-PROTOCOLS). For the autonomous development methodology driving continuous improvement, see [Strategic Plans](CH05-STRAT-PLANS) and the [Wave Sprints](CH05-WAVE-SPRINTS) execution chronicles.',
  subChapters: [
    ...FOUNDATIONS_MASTER_PLAN_SUB_CHAPTERS,
    ...FOUNDATIONS_PROGRESS_TRACKER_SUB_CHAPTERS,
    ...FOUNDATIONS_TOOLING_GOVERNANCE_SUB_CHAPTERS,
  ],
};
