/**
 * floor-08-media-communications/index.ts — Department Barrel (DEPT-08 / FL-08)
 */
import type { CanonicalDepartmentNode } from '../../types.ts';
import { FLOOR_08_DIRECTOR_TIER } from './director/index.ts';
import { FLOOR_08_SUB_DEPARTMENTS_TIER } from './sub-departments/index.ts';
import { FLOOR_08_MANAGERS_TIER, FLOOR_08_MANAGERS_DATA } from './managers/index.ts';
import { FLOOR_08_ASSISTANT_MANAGERS_TIER } from './assistant-managers/index.ts';
import { FLOOR_08_SUPERVISORS_TIER } from './supervisors/index.ts';

export * from './director/index.ts';
export * from './sub-departments/index.ts';
export * from './managers/index.ts';
export * from './assistant-managers/index.ts';
export * from './supervisors/index.ts';

export const FLOOR_08_DEPARTMENT: CanonicalDepartmentNode = {
  deptCode: "DEPT-08",
  floor: "FL-08",
  slug: "floor-08-media-communications",
  name: "Media, Public Relations & Communications",
  directorAi: "AI Maya",
  divisions: FLOOR_08_MANAGERS_DATA,
  director: FLOOR_08_DIRECTOR_TIER,
  subDepartments: FLOOR_08_SUB_DEPARTMENTS_TIER,
  managers: FLOOR_08_MANAGERS_TIER,
  assistantManagers: FLOOR_08_ASSISTANT_MANAGERS_TIER,
  supervisors: FLOOR_08_SUPERVISORS_TIER,
} as const;
