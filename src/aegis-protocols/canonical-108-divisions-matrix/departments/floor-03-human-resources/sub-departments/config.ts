/**
 * floor-03-human-resources/sub-departments/config.ts — Sub-Department Functional Tracks Config
 */
import type { SubDepartmentConfig } from '../../../types.ts';

export const FLOOR_03_SUB_DEPARTMENTS_CONFIG: SubDepartmentConfig = {
  tier: 'SUB_DEPARTMENT',
  deptCode: "DEPT-03",
  floor: "FL-03",
  tracksPerDepartment: 9,
} as const;
