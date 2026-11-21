/**
 * floor-09-research-analytics/managers/config.ts — Level 2 Division Managers Tier Config
 */
import type { ManagersConfig } from '../../../types.ts';

export const FLOOR_09_MANAGERS_CONFIG: ManagersConfig = {
  tier: 'MANAGER',
  level: 2,
  deptCode: "DEPT-09",
  floor: "FL-09",
  managersPerDepartment: 9,
  branchingFactorToAssistantManagers: 12,
  slaMinutes: 15,
  mode: 'FIXED_FRACTAL',
} as const;
