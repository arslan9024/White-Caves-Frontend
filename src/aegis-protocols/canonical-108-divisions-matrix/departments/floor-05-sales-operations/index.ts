/**
 * floor-05-sales-operations/index.ts — Department Barrel (DEPT-05 / FL-05)
 */
import type { CanonicalDepartmentNode } from '../../types.ts';
import { FLOOR_05_DIRECTOR_TIER } from './director/index.ts';
import { FLOOR_05_SUB_DEPARTMENTS_TIER } from './sub-departments/index.ts';
import { FLOOR_05_MANAGERS_TIER, FLOOR_05_MANAGERS_DATA } from './managers/index.ts';
import { FLOOR_05_ASSISTANT_MANAGERS_TIER } from './assistant-managers/index.ts';
import { FLOOR_05_SUPERVISORS_TIER } from './supervisors/index.ts';

export * from './director/index.ts';
export * from './sub-departments/index.ts';
export * from './managers/index.ts';
export * from './assistant-managers/index.ts';
export * from './supervisors/index.ts';

export const FLOOR_05_DEPARTMENT: CanonicalDepartmentNode = {
  deptCode: "DEPT-05",
  floor: "FL-05",
  slug: "floor-05-sales-operations",
  name: "Sales, Services & Operations",
  directorAi: "AI Clara",
  divisions: FLOOR_05_MANAGERS_DATA,
  director: FLOOR_05_DIRECTOR_TIER,
  subDepartments: FLOOR_05_SUB_DEPARTMENTS_TIER,
  managers: FLOOR_05_MANAGERS_TIER,
  assistantManagers: FLOOR_05_ASSISTANT_MANAGERS_TIER,
  supervisors: FLOOR_05_SUPERVISORS_TIER,
} as const;
