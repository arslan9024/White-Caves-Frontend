/**
 * supervisorTaskRegistry.data.ts — Canonical TMS Action & Task Assignment Map for Bhakti Supervisors
 * Maps TMS statutory/operational tasks directly to a single accountable AI Supervisor ID (SUP-{DD}-{M}-{AA}-{S})
 * with complete TURING-SUPERVISOR-CHAIN-019 authority hierarchy labels and DMS/TMS lockstep flags.
 * Standard: AEGIS Canonical Single Purpose File Law (< 350 lines, AEG-042)
 */

export interface SupervisorAuthorityChainLabel {
  executiveSponsor: 'MD-01 (Arslan Malik)';
  executivePartner: 'AI Zoe (COO)';
  departmentCode: string;
  directorId: string;
  divisionCode: string;
  managerId: string;
  unitCode: string;
  assistantManagerId: string;
  squadCode: string;
  supervisorId: string;
  supervisorName: string;
  taskCollectionLabel: string;
  dmsSynced: boolean;
  tmsSynced: boolean;
}

export interface SupervisorTaskAssignment {
  taskCode: string;
  title: string;
  deptCode: string;
  managerCode: string;
  assistantManagerId: string;
  supervisorId: string;
  supervisorName: string;
  taskCollectionLabel: string;
  authorityChain: SupervisorAuthorityChainLabel;
  statutoryAuthority?: string;
  slaLabel: string;
  xpReward: number;
}

export function buildSupervisorAuthorityLabel(
  deptSlot: number,
  managerSlot: number,
  assistantManagerSlot: number,
  supervisorSlot: number,
  supervisorName: string,
  taskCollectionLabel: string
): SupervisorAuthorityChainLabel {
  const dd = String(deptSlot).padStart(2, '0');
  const aa = String(assistantManagerSlot).padStart(2, '0');
  return {
    executiveSponsor: 'MD-01 (Arslan Malik)',
    executivePartner: 'AI Zoe (COO)',
    departmentCode: `DEPT-${dd}`,
    directorId: `DIR-${dd}`,
    divisionCode: `DIV-${dd}-${managerSlot}`,
    managerId: `MGR-${dd}-${managerSlot}`,
    unitCode: `UNIT-${dd}-${managerSlot}-${aa}`,
    assistantManagerId: `AMGR-${dd}-${managerSlot}-${aa}`,
    squadCode: `SQD-${dd}-${managerSlot}-${aa}-${supervisorSlot}`,
    supervisorId: `SUP-${dd}-${managerSlot}-${aa}-${supervisorSlot}`,
    supervisorName,
    taskCollectionLabel,
    dmsSynced: true,
    tmsSynced: true,
  };
}

export const INITIAL_SUPERVISOR_TASK_ASSIGNMENTS: SupervisorTaskAssignment[] = [
  // Track A — Auth Gateway, Role-Based Portals (MD/Landlord/Tenant) & 12-Stage Deal Cockpit
  {
    taskCode: 'TSK-PORTAL-01',
    title: 'Branded Auth Gateway, MD/Landlord/Tenant Portals & 12-Stage Deal Cockpit Sync',
    deptCode: 'DEPT-05',
    managerCode: 'MGR-05-2',
    assistantManagerId: 'AMGR-05-2-01',
    supervisorId: 'SUP-05-2-01-1',
    supervisorName: 'AI Noor (Leasing Portals & 12-Stage Deal Cockpit Supervisor)',
    taskCollectionLabel: 'TMS-COL-TRACK-A-LEASING-PORTALS',
    authorityChain: buildSupervisorAuthorityLabel(
      5,
      2,
      1,
      1,
      'AI Noor (Leasing Portals & 12-Stage Deal Cockpit Supervisor)',
      'TMS-COL-TRACK-A-LEASING-PORTALS'
    ),
    statutoryAuthority: 'DLD / Ejari / UAE 5% VAT',
    slaLabel: '2 Hours',
    xpReward: 500,
  },
  // Track B — Frontend Wave 2 Atomic Decomposition (AEG-042 < 350 lines)
  {
    taskCode: 'TSK-ARCH-W2',
    title: 'Wave 2 Atomic Decomposition of Oversized Frontend Monoliths (< 350 Lines AEG-042)',
    deptCode: 'DEPT-12',
    managerCode: 'MGR-12-1',
    assistantManagerId: 'AMGR-12-1-01',
    supervisorId: 'SUP-12-1-01-1',
    supervisorName: 'AI Mary Wilkes (Frontend Wave 2 Architecture Decomposition Supervisor)',
    taskCollectionLabel: 'TMS-COL-TRACK-B-ARCH-DECOMPOSITION',
    authorityChain: buildSupervisorAuthorityLabel(
      12,
      1,
      1,
      1,
      'AI Mary Wilkes (Frontend Wave 2 Architecture Decomposition Supervisor)',
      'TMS-COL-TRACK-B-ARCH-DECOMPOSITION'
    ),
    statutoryAuthority: 'AEGIS V5.1 / AEG-042',
    slaLabel: '4 Hours',
    xpReward: 500,
  },
  // Track B Wave 3 — Remaining Frontend Monoliths Atomic Decomposition (AEG-042 < 350 lines)
  {
    taskCode: 'TSK-ARCH-W3',
    title: 'Wave 3 Atomic Decomposition of 19 Oversized Frontend Monoliths (< 350 Lines AEG-042)',
    deptCode: 'DEPT-12',
    managerCode: 'MGR-12-1',
    assistantManagerId: 'AMGR-12-1-01',
    supervisorId: 'SUP-12-1-01-1',
    supervisorName:
      'AI Mary Wilkes (Frontend Wave 2 & Wave 3 Architecture Decomposition Supervisor)',
    taskCollectionLabel: 'TMS-COL-TRACK-B-ARCH-DECOMPOSITION',
    authorityChain: buildSupervisorAuthorityLabel(
      12,
      1,
      1,
      1,
      'AI Mary Wilkes (Frontend Wave 2 & Wave 3 Architecture Decomposition Supervisor)',
      'TMS-COL-TRACK-B-ARCH-DECOMPOSITION'
    ),
    statutoryAuthority: 'AEGIS V5.1 / AEG-042',
    slaLabel: '4 Hours',
    xpReward: 500,
  },
  // DEPT-05: Sales, Services & Operations (Daisy Leasing MGR-05-2)
  {
    taskCode: 'TSK-002',
    title: 'DLD Form A (Listing Agreement) Verification & Filing',
    deptCode: 'DEPT-05',
    managerCode: 'MGR-05-2',
    assistantManagerId: 'AMGR-05-2-01',
    supervisorId: 'SUP-05-2-01-1',
    supervisorName: 'AI Noor (Leasing Portals & 12-Stage Deal Cockpit Supervisor)',
    taskCollectionLabel: 'TMS-COL-DH2-STATUTORY-LEASING',
    authorityChain: buildSupervisorAuthorityLabel(
      5,
      2,
      1,
      1,
      'AI Noor (Leasing Portals & 12-Stage Deal Cockpit Supervisor)',
      'TMS-COL-DH2-STATUTORY-LEASING'
    ),
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
    supervisorName: 'AI Hana (Ejari & DEWA Statutory Registration Supervisor)',
    taskCollectionLabel: 'TMS-COL-DH2-EJARI-DEWA',
    authorityChain: buildSupervisorAuthorityLabel(
      5,
      2,
      1,
      2,
      'AI Hana (Ejari & DEWA Statutory Registration Supervisor)',
      'TMS-COL-DH2-EJARI-DEWA'
    ),
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
    supervisorName: 'AI Henry Compliance Supervisor 1',
    taskCollectionLabel: 'TMS-COL-LEGAL-AML-SCREENING',
    authorityChain: buildSupervisorAuthorityLabel(
      11,
      1,
      1,
      1,
      'AI Henry Compliance Supervisor 1',
      'TMS-COL-LEGAL-AML-SCREENING'
    ),
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
    supervisorName: 'AI Henry Title Deed Verification Supervisor 2',
    taskCollectionLabel: 'TMS-COL-LEGAL-TITLE-DEED',
    authorityChain: buildSupervisorAuthorityLabel(
      11,
      1,
      1,
      2,
      'AI Henry Title Deed Verification Supervisor 2',
      'TMS-COL-LEGAL-TITLE-DEED'
    ),
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
    supervisorName: 'AI Theodora Treasury & VAT Supervisor 1',
    taskCollectionLabel: 'TMS-COL-FINANCE-TREASURY-VAT',
    authorityChain: buildSupervisorAuthorityLabel(
      10,
      1,
      1,
      1,
      'AI Theodora Treasury & VAT Supervisor 1',
      'TMS-COL-FINANCE-TREASURY-VAT'
    ),
    statutoryAuthority: 'DLD Treasury',
    slaLabel: '2 Hours',
    xpReward: 500,
  },
];

/**
 * Reassigns a task from one Supervisor ID to another (supports drag-and-drop role/task swaps),
 * automatically recalculating full TURING-SUPERVISOR-CHAIN-019 hierarchy labels.
 */
export function reassignTaskToSupervisor(
  assignments: SupervisorTaskAssignment[],
  taskCode: string,
  targetSupervisorId: string
): SupervisorTaskAssignment[] {
  const parts = targetSupervisorId.split('-'); // SUP-DD-M-AA-S
  const deptSlot = Number(parts[1] || 0);
  const mgrSlot = Number(parts[2] || 0);
  const amgrSlot = Number(parts[3] || 0);
  const supSlot = Number(parts[4] || 0);
  const validCoords = deptSlot >= 1 && mgrSlot >= 1 && amgrSlot >= 1 && supSlot >= 1;

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
          authorityChain: validCoords
            ? buildSupervisorAuthorityLabel(
                deptSlot,
                mgrSlot,
                amgrSlot,
                supSlot,
                item.supervisorName,
                item.taskCollectionLabel
              )
            : { ...item.authorityChain, supervisorId: targetSupervisorId },
        }
      : item
  );
}
