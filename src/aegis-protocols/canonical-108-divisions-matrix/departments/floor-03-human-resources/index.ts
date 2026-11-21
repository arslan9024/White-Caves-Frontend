/**
 * floor-03-human-resources/index.ts — Department Barrel (DEPT-03 / FL-03)
 */
import type { CanonicalDepartmentNode } from '../../types.ts';
import { FLOOR_03_DIRECTOR_TIER } from './director/index.ts';
import { FLOOR_03_SUB_DEPARTMENTS_TIER } from './sub-departments/index.ts';
import { FLOOR_03_MANAGERS_TIER, FLOOR_03_MANAGERS_DATA } from './managers/index.ts';
import { FLOOR_03_ASSISTANT_MANAGERS_TIER } from './assistant-managers/index.ts';
import { FLOOR_03_SUPERVISORS_TIER } from './supervisors/index.ts';

export * from './director/index.ts';
export * from './sub-departments/index.ts';
export * from './managers/index.ts';
export * from './assistant-managers/index.ts';
export * from './supervisors/index.ts';

export const FLOOR_03_DEPARTMENT: CanonicalDepartmentNode = {
  deptCode: "DEPT-03",
  floor: "FL-03",
  slug: "floor-03-human-resources",
  name: "Human Resources, Performance & Recruiting",
  directorAi: "AI Selena",
  divisions: FLOOR_03_MANAGERS_DATA,
  director: FLOOR_03_DIRECTOR_TIER,
  subDepartments: FLOOR_03_SUB_DEPARTMENTS_TIER,
  managers: FLOOR_03_MANAGERS_TIER,
  assistantManagers: FLOOR_03_ASSISTANT_MANAGERS_TIER,
  supervisors: FLOOR_03_SUPERVISORS_TIER,
} as const;
