/**
 * floor-10-accounting-finance/index.ts — Department Barrel (DEPT-10 / FL-10)
 */
import type { CanonicalDepartmentNode } from '../../types.ts';
import { FLOOR_10_DIRECTOR_TIER } from './director/index.ts';
import { FLOOR_10_SUB_DEPARTMENTS_TIER } from './sub-departments/index.ts';
import { FLOOR_10_MANAGERS_TIER, FLOOR_10_MANAGERS_DATA } from './managers/index.ts';
import { FLOOR_10_ASSISTANT_MANAGERS_TIER } from './assistant-managers/index.ts';
import { FLOOR_10_SUPERVISORS_TIER } from './supervisors/index.ts';

export * from './director/index.ts';
export * from './sub-departments/index.ts';
export * from './managers/index.ts';
export * from './assistant-managers/index.ts';
export * from './supervisors/index.ts';

export const FLOOR_10_DEPARTMENT: CanonicalDepartmentNode = {
  deptCode: "DEPT-10",
  floor: "FL-10",
  slug: "floor-10-accounting-finance",
  name: "Accounting, Finance & Tax",
  directorAi: "AI Theodora",
  divisions: FLOOR_10_MANAGERS_DATA,
  director: FLOOR_10_DIRECTOR_TIER,
  subDepartments: FLOOR_10_SUB_DEPARTMENTS_TIER,
  managers: FLOOR_10_MANAGERS_TIER,
  assistantManagers: FLOOR_10_ASSISTANT_MANAGERS_TIER,
  supervisors: FLOOR_10_SUPERVISORS_TIER,
} as const;
