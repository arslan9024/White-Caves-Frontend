/**
 * floor-11-legal-compliance/managers/config.ts — Level 2 Division Managers Tier Config
 */
import type { ManagersConfig } from '../../../types.ts';

export const FLOOR_11_MANAGERS_CONFIG: ManagersConfig = {
  tier: 'MANAGER',
  level: 2,
  deptCode: "DEPT-11",
  floor: "FL-11",
  managersPerDepartment: 9,
  branchingFactorToAssistantManagers: 12,
  slaMinutes: 15,
  mode: 'FIXED_FRACTAL',
} as const;
