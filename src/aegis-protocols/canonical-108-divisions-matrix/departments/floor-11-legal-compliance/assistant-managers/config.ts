/**
 * floor-11-legal-compliance/assistant-managers/config.ts — Level 3 Assistant Managers Fractal Config (12/Manager)
 */
import type { AssistantManagersConfig } from '../../../types.ts';

export const FLOOR_11_ASSISTANT_MANAGERS_CONFIG: AssistantManagersConfig = {
  tier: 'ASSISTANT_MANAGER',
  level: 3,
  deptCode: "DEPT-11",
  floor: "FL-11",
  assistantManagersPerManager: 12,
  departmentAssistantManagersTotal: 108,
  branchingFactorToSupervisors: 9,
  mode: 'FIXED_FRACTAL',
} as const;
