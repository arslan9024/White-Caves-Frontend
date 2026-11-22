// Auto-generated 12-Level Living Book Chapter Node
import { ChapterNode } from './treeTypes';
import { PHASE_FOUNDATION_SUB_CHAPTERS } from './chapterPhaseHistory/phaseFoundationSubChapters';
import { PHASE_AUDIT_SUB_CHAPTERS } from './chapterPhaseHistory/phaseAuditSubChapters';
import { PHASE_HANDOVER_SUB_CHAPTERS } from './chapterPhaseHistory/phaseHandoverSubChapters';
import { PHASE_AUTOPILOT_TURNS_SUB_CHAPTERS } from './chapterPhaseHistory/phaseAutopilotTurnsSubChapters';

export const CHAPTER_PHASE_HISTORY: ChapterNode = {
  level: 5,
  nodeId: 'CH05-PHASE-EXEC',
  chapterNumber: 33,
  chapterCode: 'CH-33-PHASE-EXEC',
  title: 'Chapter 33: Historical Engineering Phases & Migrations',
  subtitle: 'Consolidated historical milestones from Phase 0 through Phase 6',
  readTimeMinutes: 48,
  overviewMarkdown:
    'This chapter documents the developmental journey of White Caves Real Estate CRM from Phase 0 foundation through Phase 6 sovereign stabilization. Trace the evolution of our 12 Corporate Floors, the introduction of the dual-track agent mesh, DLD compliance milestones, and the establishment of TURING-LAW-000. For current operational blueprints, see [Department SOPs](CH05-DEPT-SOPS) and the [Sovereign Protocol Canon](CH05-PROTOCOLS); for recent delivery iterations, consult [Wave Sprints](CH05-WAVE-SPRINTS).',
  subChapters: [
    ...PHASE_FOUNDATION_SUB_CHAPTERS,
    ...PHASE_AUDIT_SUB_CHAPTERS,
    ...PHASE_HANDOVER_SUB_CHAPTERS,
    ...PHASE_AUTOPILOT_TURNS_SUB_CHAPTERS,
  ],
};
