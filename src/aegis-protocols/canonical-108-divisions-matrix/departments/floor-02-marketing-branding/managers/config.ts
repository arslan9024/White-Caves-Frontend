/**
 * floor-02-marketing-branding/managers/config.ts — Level 2 Division Managers Tier Config
 */
import type { ManagersConfig } from '../../../types.ts';

export const FLOOR_02_MANAGERS_CONFIG: ManagersConfig = {
  tier: 'MANAGER',
  level: 2,
  deptCode: "DEPT-02",
  floor: "FL-02",
  managersPerDepartment: 9,
  branchingFactorToAssistantManagers: 12,
  slaMinutes: 15,
  mode: 'FIXED_FRACTAL',
} as const;
