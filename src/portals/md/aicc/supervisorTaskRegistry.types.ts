/**
 * supervisorTaskRegistry.types.ts — Types and Authority Chain Helpers for Bhakti Supervisors
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
