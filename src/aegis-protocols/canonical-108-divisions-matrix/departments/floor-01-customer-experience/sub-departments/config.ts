/**
 * floor-01-customer-experience/sub-departments/config.ts — Sub-Department Functional Tracks Config
 */
import type { SubDepartmentConfig } from '../../../types.ts';

export const FLOOR_01_SUB_DEPARTMENTS_CONFIG: SubDepartmentConfig = {
  tier: 'SUB_DEPARTMENT',
  deptCode: "DEPT-01",
  floor: "FL-01",
  tracksPerDepartment: 9,
} as const;
