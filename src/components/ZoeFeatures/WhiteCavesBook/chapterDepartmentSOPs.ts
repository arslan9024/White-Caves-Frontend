// Auto-generated 12-Level Living Book Chapter Node
import { ChapterNode } from './treeTypes';
import { DEPARTMENT_SOP_CORE_AUTOMATION_SUBCHAPTERS } from './chapterDepartmentSOPs/subChaptersCoreAutomation';
import { DEPARTMENT_SOP_STATUTORY_FINANCE_SUBCHAPTERS } from './chapterDepartmentSOPs/subChaptersStatutoryFinance';
import { DEPARTMENT_SOP_LEASING_LEGAL_SUBCHAPTERS } from './chapterDepartmentSOPs/subChaptersLeasingLegal';
import { DEPARTMENT_SOP_SECURITY_SUBCHAPTERS } from './chapterDepartmentSOPs/subChaptersSecurity';

export const CHAPTER_DEPARTMENT_SOPS: ChapterNode = {
  level: 5,
  nodeId: 'CH05-DEPT-SOPS',
  chapterNumber: 30,
  chapterCode: 'CH-30-DEPT-SOPS',
  title: 'Chapter 30: 12 Corporate Department Operations & Governance',
  subtitle: 'SOPs, Compliance Gates, Financial Controls & CRM Primitives across All Floors',
  readTimeMinutes: 45,
  overviewMarkdown:
    'This chapter codifies the operational blueprints for all 12 corporate brokerage floors of White Caves Real Estate LLC. Each department enforces statutory checkpoints governed by AEG-004 through AEG-009, with dedicated AI supervisors. Highlights include Floor 01 Luxury Sales, Floor 02 Strategic Off-Plan allocations, Floor 04 Residential Leasing with 90/60/30-day Ejari notifications ([Protocol Canon](CH05-PROTOCOLS)), Floor 06 Revenue & Tax Reserves (5% VAT, 9% Corporate Tax under AEG-028), and Floor 10 RERA Compliance screening. For the overarching corporate charter, explore [Enterprise Operations](CH05-WC-01); for historical delivery tracks, see [Phase History](CH05-PHASE-EXEC).',
  subChapters: [
    ...DEPARTMENT_SOP_CORE_AUTOMATION_SUBCHAPTERS,
    ...DEPARTMENT_SOP_STATUTORY_FINANCE_SUBCHAPTERS,
    ...DEPARTMENT_SOP_LEASING_LEGAL_SUBCHAPTERS,
    ...DEPARTMENT_SOP_SECURITY_SUBCHAPTERS,
  ],
};
