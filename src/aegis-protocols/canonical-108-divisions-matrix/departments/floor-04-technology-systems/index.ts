/**
 * floor-04-technology-systems/index.ts — Department Barrel (DEPT-04 / FL-04)
 */
import type { CanonicalDepartmentNode } from '../../types.ts';
import { FLOOR_04_DIRECTOR_TIER } from './director/index.ts';
import { FLOOR_04_SUB_DEPARTMENTS_TIER } from './sub-departments/index.ts';
import { FLOOR_04_MANAGERS_TIER, FLOOR_04_MANAGERS_DATA } from './managers/index.ts';
import { FLOOR_04_ASSISTANT_MANAGERS_TIER } from './assistant-managers/index.ts';
import { FLOOR_04_SUPERVISORS_TIER } from './supervisors/index.ts';

export * from './director/index.ts';
export * from './sub-departments/index.ts';
export * from './managers/index.ts';
export * from './assistant-managers/index.ts';
export * from './supervisors/index.ts';

export const FLOOR_04_DEPARTMENT: CanonicalDepartmentNode = {
  deptCode: "DEPT-04",
  floor: "FL-04",
  slug: "floor-04-technology-systems",
  name: "Technology, Systems & Digital Infrastructure",
  directorAi: "AI Aurora",
  divisions: FLOOR_04_MANAGERS_DATA,
  director: FLOOR_04_DIRECTOR_TIER,
  subDepartments: FLOOR_04_SUB_DEPARTMENTS_TIER,
  managers: FLOOR_04_MANAGERS_TIER,
  assistantManagers: FLOOR_04_ASSISTANT_MANAGERS_TIER,
  supervisors: FLOOR_04_SUPERVISORS_TIER,
} as const;
