/**
 * DepartmentHierarchy.workflow.ts
 * 7-Category Architecture: Workflow Engine Layer
 * Universal 4-Stage I-P-O-V (Input, Processing, Output, View Sync) Engine
 */

import type {
  Hierarchy3TierState,
} from './DepartmentHierarchy.types';

export interface WorkflowResult<T = Hierarchy3TierState> {
  success: boolean;
  state: T;
  message: string;
}

export {
  executeDemoteEntityWorkflow,
  executeAssignPoolItemWorkflow,
  executeReassignTeamWorkflow,
} from './DepartmentHierarchy.poolWorkflow';

/**
 * Stage 1-4 I-P-O-V: Swaps Director positions while locking slot numbers (1..12) and codes (DEPT-01..12)
 */
export function executeSwapDirectorSlotsWorkflow(
  state: Hierarchy3TierState,
  sourceSlot: number,
  targetSlot: number
): WorkflowResult {
  // 1. INPUT GUARD
  if (
    sourceSlot < 1 ||
    sourceSlot > 12 ||
    targetSlot < 1 ||
    targetSlot > 12 ||
    sourceSlot === targetSlot
  ) {
    return { success: false, state, message: 'Invalid Director slot coordinates.' };
  }

  // 2. PROCESSING (Bhakti Protocol Content Swap)
  const directors = [...state.directors];
  const sIdx = directors.findIndex(d => d.slotNumber === sourceSlot);
  const tIdx = directors.findIndex(d => d.slotNumber === targetSlot);

  if (sIdx === -1 || tIdx === -1) {
    return { success: false, state, message: 'One or both Director slots not found.' };
  }

  const sItem = directors[sIdx];
  const tItem = directors[tIdx];

  const targetFixedCode = tItem.fixedCode;
  const sourceFixedCode = sItem.fixedCode;

  directors[sIdx] = { ...tItem, slotNumber: sourceSlot, fixedCode: sourceFixedCode };
  directors[tIdx] = { ...sItem, slotNumber: targetSlot, fixedCode: targetFixedCode };

  // 3. OUTPUT & 4. VIEW SYNC PAYLOAD
  return {
    success: true,
    state: { ...state, directors },
    message: `Swapped Director mandates between Slot #${sourceSlot} (${sourceFixedCode}) and Slot #${targetSlot} (${targetFixedCode}).`,
  };
}

/**
 * Stage 1-4 I-P-O-V: Swaps Division Manager task positions while locking slot numbers (1..9) and codes (MGR-01..09)
 */
export function executeSwapManagerSlotsWorkflow(
  state: Hierarchy3TierState,
  deptId: string,
  sourceSlot: number,
  targetSlot: number
): WorkflowResult {
  // 1. INPUT GUARD
  if (
    sourceSlot < 1 ||
    sourceSlot > 9 ||
    targetSlot < 1 ||
    targetSlot > 9 ||
    sourceSlot === targetSlot
  ) {
    return { success: false, state, message: 'Invalid Division Manager slot coordinates.' };
  }

  const managers = state.managersByDeptId[deptId] ? [...state.managersByDeptId[deptId]] : [];
  const sIdx = managers.findIndex(m => m.slotNumber === sourceSlot);
  const tIdx = managers.findIndex(m => m.slotNumber === targetSlot);

  if (sIdx === -1 || tIdx === -1) {
    return { success: false, state, message: 'Manager slots not found in department.' };
  }

  // 2. PROCESSING
  const sItem = managers[sIdx];
  const tItem = managers[tIdx];
  const sourceFixedCode = sItem.fixedCode;
  const targetFixedCode = tItem.fixedCode;

  managers[sIdx] = { ...tItem, slotNumber: sourceSlot, fixedCode: sourceFixedCode };
  managers[tIdx] = { ...sItem, slotNumber: targetSlot, fixedCode: targetFixedCode };

  // 3. OUTPUT
  return {
    success: true,
    state: {
      ...state,
      managersByDeptId: { ...state.managersByDeptId, [deptId]: managers },
    },
    message: `Swapped Division Manager task domains between Slot #${sourceSlot} and Slot #${targetSlot}.`,
  };
}

