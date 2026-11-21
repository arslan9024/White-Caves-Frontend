/**
 * floor-04-technology-systems/managers/config.ts — Level 2 Division Managers Tier Config
 */
import type { ManagersConfig } from '../../../types.ts';

export const FLOOR_04_MANAGERS_CONFIG: ManagersConfig = {
  tier: 'MANAGER',
  level: 2,
  deptCode: "DEPT-04",
  floor: "FL-04",
  managersPerDepartment: 9,
  branchingFactorToAssistantManagers: 12,
  slaMinutes: 15,
  mode: 'FIXED_FRACTAL',
} as const;
