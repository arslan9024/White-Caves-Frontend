/**
 * floor-02-marketing-branding/sub-departments/config.ts — Sub-Department Functional Tracks Config
 */
import type { SubDepartmentConfig } from '../../../types.ts';

export const FLOOR_02_SUB_DEPARTMENTS_CONFIG: SubDepartmentConfig = {
  tier: 'SUB_DEPARTMENT',
  deptCode: "DEPT-02",
  floor: "FL-02",
  tracksPerDepartment: 9,
} as const;
