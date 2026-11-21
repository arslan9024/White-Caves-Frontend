/**
 * floor-10-accounting-finance/sub-departments/config.ts — Sub-Department Functional Tracks Config
 */
import type { SubDepartmentConfig } from '../../../types.ts';

export const FLOOR_10_SUB_DEPARTMENTS_CONFIG: SubDepartmentConfig = {
  tier: 'SUB_DEPARTMENT',
  deptCode: "DEPT-10",
  floor: "FL-10",
  tracksPerDepartment: 9,
} as const;
