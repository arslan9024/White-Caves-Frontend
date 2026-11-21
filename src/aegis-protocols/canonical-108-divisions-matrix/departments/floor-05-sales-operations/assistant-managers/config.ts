/**
 * floor-05-sales-operations/assistant-managers/config.ts — Level 3 Assistant Managers Fractal Config (12/Manager)
 */
import type { AssistantManagersConfig } from '../../../types.ts';

export const FLOOR_05_ASSISTANT_MANAGERS_CONFIG: AssistantManagersConfig = {
  tier: 'ASSISTANT_MANAGER',
  level: 3,
  deptCode: "DEPT-05",
  floor: "FL-05",
  assistantManagersPerManager: 12,
  departmentAssistantManagersTotal: 108,
  branchingFactorToSupervisors: 9,
  mode: 'FIXED_FRACTAL',
} as const;
