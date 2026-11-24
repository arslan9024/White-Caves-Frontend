/**
 * supervisorTaskRegistry.data.ts — Canonical TMS Action & Task Assignment Map for Bhakti Supervisors
 * Maps TMS statutory/operational tasks directly to Supervisor IDs (SUP-{DD}-{M}-{AA}-{S})
 * Supports drag-and-drop reassignment and automatic leaderboard XP attribution.
 * Standard: AEGIS Canonical Single Purpose File Law (< 350 lines, AEG-042)
 */

export interface SupervisorTaskAssignment {
  taskCode: string;
  title: string;
  deptCode: string;
  managerCode: string;
  assistantManagerId: string;
  supervisorId: string;
  statutoryAuthority?: string;
  slaLabel: string;
  xpReward: number;
}

export const INITIAL_SUPERVISOR_TASK_ASSIGNMENTS: SupervisorTaskAssignment[] = [
  // DEPT-05: Sales, Services & Operations (Daisy Leasing MGR-05-2)
  {
    taskCode: 'TSK-002',
    title: 'DLD Form A (Listing Agreement) Verification & Filing',
    deptCode: 'DEPT-05',
    managerCode: 'MGR-05-2',
    assistantManagerId: 'AMGR-05-2-01',
    supervisorId: 'SUP-05-2-01-1',
    statutoryAuthority: 'DLD Trakheesi',
    slaLabel: '4 Hours',
    xpReward: 500,
  },
  {
    taskCode: 'TSK-006',
    title: 'Tenancy Ejari Online Registration & Barcode Issuance',
    deptCode: 'DEPT-05',
    managerCode: 'MGR-05-2',
    assistantManagerId: 'AMGR-05-2-01',
    supervisorId: 'SUP-05-2-01-2',
    statutoryAuthority: 'Ejari Portal',
    slaLabel: '2 Hours',
    xpReward: 500,
  },
  // DEPT-11: Legal, Compliance & Audit (Henry Records MGR-11-1)
  {
    taskCode: 'TSK-008',
    title: 'AML / CFT Sanctions Screening via UAE FIU GoAML',
    deptCode: 'DEPT-11',
    managerCode: 'MGR-11-1',
    assistantManagerId: 'AMGR-11-1-01',
    supervisorId: 'SUP-11-1-01-1',
    statutoryAuthority: 'UAE FIU / AML',
    slaLabel: '1 Hour',
    xpReward: 500,
  },
  {
    taskCode: 'TSK-005',
    title: 'Title Deed Instant Blockchain Validation via DLD API',
    deptCode: 'DEPT-11',
    managerCode: 'MGR-11-1',
    assistantManagerId: 'AMGR-11-1-01',
    supervisorId: 'SUP-11-1-01-2',
    statutoryAuthority: 'DLD Blockchain',
    slaLabel: '15 Mins',
    xpReward: 500,
  },
  // DEPT-10: Accounting, Finance & Tax (MGR-10-1)
  {
    taskCode: 'TSK-014',
    title: 'DLD 4% Transfer Fee Payment & Receipt Reconciliation',
    deptCode: 'DEPT-10',
    managerCode: 'MGR-10-1',
    assistantManagerId: 'AMGR-10-1-01',
    supervisorId: 'SUP-10-1-01-1',
    statutoryAuthority: 'DLD Treasury',
    slaLabel: '2 Hours',
    xpReward: 500,
  },
];

/**
 * Reassigns a task from one Supervisor ID to another (supports drag-and-drop role/task swaps).
 */
export function reassignTaskToSupervisor(
  assignments: SupervisorTaskAssignment[],
  taskCode: string,
  targetSupervisorId: string
): SupervisorTaskAssignment[] {
  const parts = targetSupervisorId.split('-'); // SUP-DD-M-AA-S
  const deptCode = parts.length >= 2 ? `DEPT-${parts[1]}` : '';
  const managerCode = parts.length >= 3 ? `MGR-${parts[1]}-${parts[2]}` : '';
  const assistantManagerId = parts.length >= 4 ? `AMGR-${parts[1]}-${parts[2]}-${parts[3]}` : '';

  return assignments.map(item =>
    item.taskCode === taskCode
      ? {
          ...item,
          deptCode: deptCode || item.deptCode,
          managerCode: managerCode || item.managerCode,
          assistantManagerId: assistantManagerId || item.assistantManagerId,
          supervisorId: targetSupervisorId,
        }
      : item
  );
}
