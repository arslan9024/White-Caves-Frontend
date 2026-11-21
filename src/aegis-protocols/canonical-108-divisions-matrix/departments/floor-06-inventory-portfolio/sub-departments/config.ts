/**
 * floor-06-inventory-portfolio/sub-departments/config.ts — Sub-Department Functional Tracks Config
 */
import type { SubDepartmentConfig } from '../../../types.ts';

export const FLOOR_06_SUB_DEPARTMENTS_CONFIG: SubDepartmentConfig = {
  tier: 'SUB_DEPARTMENT',
  deptCode: "DEPT-06",
  floor: "FL-06",
  tracksPerDepartment: 9,
} as const;
