/**
 * floor-02-marketing-branding/assistant-managers/config.ts — Level 3 Assistant Managers Fractal Config (12/Manager)
 */
import type { AssistantManagersConfig } from '../../../types.ts';

export const FLOOR_02_ASSISTANT_MANAGERS_CONFIG: AssistantManagersConfig = {
  tier: 'ASSISTANT_MANAGER',
  level: 3,
  deptCode: "DEPT-02",
  floor: "FL-02",
  assistantManagersPerManager: 12,
  departmentAssistantManagersTotal: 108,
  branchingFactorToSupervisors: 9,
  mode: 'FIXED_FRACTAL',
} as const;
