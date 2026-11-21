/**
 * floor-08-media-communications/managers/config.ts — Level 2 Division Managers Tier Config
 */
import type { ManagersConfig } from '../../../types.ts';

export const FLOOR_08_MANAGERS_CONFIG: ManagersConfig = {
  tier: 'MANAGER',
  level: 2,
  deptCode: "DEPT-08",
  floor: "FL-08",
  managersPerDepartment: 9,
  branchingFactorToAssistantManagers: 12,
  slaMinutes: 15,
  mode: 'FIXED_FRACTAL',
} as const;
