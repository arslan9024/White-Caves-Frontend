/**
 * floor-03-human-resources/supervisors/config.ts — Level 4 Supervisors Fractal Stop-Boundary Config (9/AM = 108/Manager)
 */
import type { SupervisorsConfig } from '../../../types.ts';

export const FLOOR_03_SUPERVISORS_CONFIG: SupervisorsConfig = {
  tier: 'SUPERVISOR',
  level: 4,
  deptCode: "DEPT-03",
  floor: "FL-03",
  supervisorsPerAssistantManager: 9,
  supervisorsPerManager: 108,
  departmentSupervisorsTotal: 972,
  mode: 'FIXED_FRACTAL_STOP',
  manualChildTiers: ['TEAM_LEADER', 'EMPLOYEE'],
} as const;
