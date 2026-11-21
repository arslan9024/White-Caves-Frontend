/**
 * floor-09-research-analytics/index.ts — Department Barrel (DEPT-09 / FL-09)
 */
import type { CanonicalDepartmentNode } from '../../types.ts';
import { FLOOR_09_DIRECTOR_TIER } from './director/index.ts';
import { FLOOR_09_SUB_DEPARTMENTS_TIER } from './sub-departments/index.ts';
import { FLOOR_09_MANAGERS_TIER, FLOOR_09_MANAGERS_DATA } from './managers/index.ts';
import { FLOOR_09_ASSISTANT_MANAGERS_TIER } from './assistant-managers/index.ts';
import { FLOOR_09_SUPERVISORS_TIER } from './supervisors/index.ts';

export * from './director/index.ts';
export * from './sub-departments/index.ts';
export * from './managers/index.ts';
export * from './assistant-managers/index.ts';
export * from './supervisors/index.ts';

export const FLOOR_09_DEPARTMENT: CanonicalDepartmentNode = {
  deptCode: "DEPT-09",
  floor: "FL-09",
  slug: "floor-09-research-analytics",
  name: "Research, Analytics & Market Intelligence",
  directorAi: "AI Elena",
  divisions: FLOOR_09_MANAGERS_DATA,
  director: FLOOR_09_DIRECTOR_TIER,
  subDepartments: FLOOR_09_SUB_DEPARTMENTS_TIER,
  managers: FLOOR_09_MANAGERS_TIER,
  assistantManagers: FLOOR_09_ASSISTANT_MANAGERS_TIER,
  supervisors: FLOOR_09_SUPERVISORS_TIER,
} as const;
