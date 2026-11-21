/**
 * floor-07-partnerships-alliances/index.ts — Department Barrel (DEPT-07 / FL-07)
 */
import type { CanonicalDepartmentNode } from '../../types.ts';
import { FLOOR_07_DIRECTOR_TIER } from './director/index.ts';
import { FLOOR_07_SUB_DEPARTMENTS_TIER } from './sub-departments/index.ts';
import { FLOOR_07_MANAGERS_TIER, FLOOR_07_MANAGERS_DATA } from './managers/index.ts';
import { FLOOR_07_ASSISTANT_MANAGERS_TIER } from './assistant-managers/index.ts';
import { FLOOR_07_SUPERVISORS_TIER } from './supervisors/index.ts';

export * from './director/index.ts';
export * from './sub-departments/index.ts';
export * from './managers/index.ts';
export * from './assistant-managers/index.ts';
export * from './supervisors/index.ts';

export const FLOOR_07_DEPARTMENT: CanonicalDepartmentNode = {
  deptCode: "DEPT-07",
  floor: "FL-07",
  slug: "floor-07-partnerships-alliances",
  name: "Partnerships, Alliances & Capital Growth",
  directorAi: "AI Maktoum",
  divisions: FLOOR_07_MANAGERS_DATA,
  director: FLOOR_07_DIRECTOR_TIER,
  subDepartments: FLOOR_07_SUB_DEPARTMENTS_TIER,
  managers: FLOOR_07_MANAGERS_TIER,
  assistantManagers: FLOOR_07_ASSISTANT_MANAGERS_TIER,
  supervisors: FLOOR_07_SUPERVISORS_TIER,
} as const;
