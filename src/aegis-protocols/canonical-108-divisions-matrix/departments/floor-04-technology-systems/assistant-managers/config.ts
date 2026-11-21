/**
 * floor-04-technology-systems/assistant-managers/config.ts — Level 3 Assistant Managers Fractal Config (12/Manager)
 */
import type { AssistantManagersConfig } from '../../../types.ts';

export const FLOOR_04_ASSISTANT_MANAGERS_CONFIG: AssistantManagersConfig = {
  tier: 'ASSISTANT_MANAGER',
  level: 3,
  deptCode: "DEPT-04",
  floor: "FL-04",
  assistantManagersPerManager: 12,
  departmentAssistantManagersTotal: 108,
  branchingFactorToSupervisors: 9,
  mode: 'FIXED_FRACTAL',
} as const;
