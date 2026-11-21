/**
 * floor-06-inventory-portfolio/index.ts — Department Barrel (DEPT-06 / FL-06)
 */
import type { CanonicalDepartmentNode } from '../../types.ts';
import { FLOOR_06_DIRECTOR_TIER } from './director/index.ts';
import { FLOOR_06_SUB_DEPARTMENTS_TIER } from './sub-departments/index.ts';
import { FLOOR_06_MANAGERS_TIER, FLOOR_06_MANAGERS_DATA } from './managers/index.ts';
import { FLOOR_06_ASSISTANT_MANAGERS_TIER } from './assistant-managers/index.ts';
import { FLOOR_06_SUPERVISORS_TIER } from './supervisors/index.ts';

export * from './director/index.ts';
export * from './sub-departments/index.ts';
export * from './managers/index.ts';
export * from './assistant-managers/index.ts';
export * from './supervisors/index.ts';

export const FLOOR_06_DEPARTMENT: CanonicalDepartmentNode = {
  deptCode: "DEPT-06",
  floor: "FL-06",
  slug: "floor-06-inventory-portfolio",
  name: "Inventory, Portfolio & Asset Management",
  directorAi: "AI Sentinel",
  divisions: FLOOR_06_MANAGERS_DATA,
  director: FLOOR_06_DIRECTOR_TIER,
  subDepartments: FLOOR_06_SUB_DEPARTMENTS_TIER,
  managers: FLOOR_06_MANAGERS_TIER,
  assistantManagers: FLOOR_06_ASSISTANT_MANAGERS_TIER,
  supervisors: FLOOR_06_SUPERVISORS_TIER,
} as const;
