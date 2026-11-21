/**
 * floor-11-legal-compliance/supervisors/config.ts — Level 4 Supervisors Fractal Stop-Boundary Config (9/AM = 108/Manager)
 */
import type { SupervisorsConfig } from '../../../types.ts';

export const FLOOR_11_SUPERVISORS_CONFIG: SupervisorsConfig = {
  tier: 'SUPERVISOR',
  level: 4,
  deptCode: "DEPT-11",
  floor: "FL-11",
  supervisorsPerAssistantManager: 9,
  supervisorsPerManager: 108,
  departmentSupervisorsTotal: 972,
  mode: 'FIXED_FRACTAL_STOP',
  manualChildTiers: ['TEAM_LEADER', 'EMPLOYEE'],
} as const;
