/**
 * TaskManager.tools.data.ts
 * White Caves Real Estate LLC - Operational Tool Tasks Catalog
 * Standard: AEGIS Canonical 7-Category Architecture Standard (Data Layer)
 * Single Purpose File Law: < 350 lines
 * Lineage: [DEPT-xx] -> [SUB-xx] -> [SQD-xx] -> [SUP-xx] -> [TEAM-xx]
 * Protocol: Rational Unified Process (RUP) Use Case Specifications
 */

import type { TaskNode } from './TaskManager.types';
import { BASE_OPERATIONAL_TASKS } from './TaskManager.base.data';
import { RUP_OPERATIONAL_TASKS } from './TaskManager.rup.data';
import { TMS_LEASING_TASK_GROUPS } from '../../../portals/md/aicc/daisyDivision.data';

export const ALL_RAW_OPERATIONAL_TASKS = [...BASE_OPERATIONAL_TASKS, ...RUP_OPERATIONAL_TASKS];

import { CORPORATE_DEPARTMENTS_12 } from '../../../data/assistants108Registry.data';

export const DH2_AICC_LEASING_TASKS: TaskNode[] = TMS_LEASING_TASK_GROUPS.map((g, idx) => ({
  _id: `tms-lease-${idx + 1}`,
  id: g.collectionCode,
  taskCode: g.collectionCode,
  title: g.title,
  pillarId: 'pillar-4',
  pillarName: 'Pillar IV: Sales & Residential Leasing Operations (DEPT-05)',
  category: 'OPERATIONS',
  statutoryAuthority: 'DLD / RERA / Ejari / DEWA',
  description: `${g.tasks.join(' • ')} | Reporting Chain: ${g.reportingChain}`,
  priority: 'CRITICAL',
  status: 'IN_PROGRESS',
  defaultSla: '15m SLA',
  reportingChain: {
    supervisorName: 'AI Daisy Supervisor (SUP-05-2-01-1)',
    supervisorCode: 'SUP-05-2-01-1',
    managerName: 'AI Layla Residential (MGR-05-2 · 12 AMs / 108 Sups)',
    managerCode: 'MGR-05-2',
    directorName: 'AI Clara (DEPT-05 Director)',
    directorCode: 'DIR-05',
    executiveReviewer: 'Arslan Malik (MD) & AI Zoe (WC-COO-01)',
  },
  actor: `${g.aiccActorName} (${g.aiccActorCode})`,
  action: g.tasks[0] || g.title,
  results:
    'Verified Google Drive Unit Folder + Scoped Mary Inventory Vault + MD Google Calendar Sync',
  departmentCode: 'DEPT-05',
  divisionCode: 'DIV-05-2',
  createdAt: '2026-11-21T09:00:00.000Z',
  completionRate: 100,
}));

export const OPERATIONAL_TOOL_TASKS: TaskNode[] = ALL_RAW_OPERATIONAL_TASKS.map((t, idx) => {
  const deptNum = (idx % 12) + 1;
  const canonicalDept = CORPORATE_DEPARTMENTS_12[deptNum - 1];
  const subDeptNum = (idx % 9) + 1;
  const squadNum = (idx % 12) + 1;
  const supNum = (idx % 12) + 1;

  return {
    ...t,
    actor: 'Managing Director Arslan Malik Bashir Ahmad (EMP-001)',
    action: `Execute automated tool pipeline: ${t.title}`,
    results: `Verified output artifact and telemetry log generated for ${t.taskCode}`,
    lineage: {
      deptId: canonicalDept?.code || `DEPT-${String(deptNum).padStart(2, '0')}`,
      deptName: canonicalDept?.name || `Department ${deptNum}`,
      directorId: `DIR-${String(deptNum).padStart(2, '0')}`,
      directorName: canonicalDept?.managerAi?.name || t.reportingChain.directorName,
      subDeptId: `SUB-${String(subDeptNum).padStart(2, '0')}`,
      subDeptName: `Sub-Department ${subDeptNum}`,
      managerId: `MGR-${String(subDeptNum).padStart(2, '0')}`,
      managerName: t.reportingChain.managerName,
      squadId: `SQD-${String(squadNum).padStart(2, '0')}`,
      squadName: `Squad ${squadNum}`,
      supervisorId: `SUP-${String(supNum).padStart(2, '0')}`,
      supervisorName: t.reportingChain.supervisorName,
      teamId: `TEAM-${String((idx % 4) + 1).padStart(2, '0')}`,
      teamName: `Team ${(idx % 4) + 1}`,
      isUnassignedPool: false,
    },
    useCase: {
      useCaseId: `UC-${t.taskCode}`,
      primaryActor: 'Managing Director Arslan Malik Bashir Ahmad (EMP-001)',
      secondaryActors: [t.statutoryAuthority || 'Dubai Land Department (DLD)'],
      preconditions: [
        'Actor authenticated with L0/Managing Director authority',
        `Required payload credentials initialized for ${t.taskCode}`,
      ],
      trigger: `Direct execution trigger from Executive Explorer for ${t.title}`,
      mainSuccessScenario: {
        input: `Collected parameters and verified credentials for ${t.taskCode}`,
        processing: `Executed statutory validation and verified signature for ${t.title}`,
        output: `Generated output document and cryptographic compliance receipt`,
        persistence: `Persisted state to master company ledger and awarded merit XP`,
      },
      postconditions: [
        `Task status transitioned to COMPLETED`,
        `Telemetry emitted to live right-sidebar feed`,
      ],
      statutoryMandate: t.statutoryAuthority || 'White Caves Real Estate LLC Standard SOP',
    },
  };
});
