/**
 * floor-10-accounting-finance/supervisors/config.ts — Level 4 Supervisors Fractal Stop-Boundary Config (9/AM = 108/Manager)
 */
import type { SupervisorsConfig } from '../../../types.ts';

export const FLOOR_10_SUPERVISORS_CONFIG: SupervisorsConfig = {
  tier: 'SUPERVISOR',
  level: 4,
  deptCode: "DEPT-10",
  floor: "FL-10",
  supervisorsPerAssistantManager: 9,
  supervisorsPerManager: 108,
  departmentSupervisorsTotal: 972,
  mode: 'FIXED_FRACTAL_STOP',
  manualChildTiers: ['TEAM_LEADER', 'EMPLOYEE'],
} as const;
