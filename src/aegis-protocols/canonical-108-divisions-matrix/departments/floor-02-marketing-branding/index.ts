/**
 * floor-02-marketing-branding/index.ts — Department Barrel (DEPT-02 / FL-02)
 */
import type { CanonicalDepartmentNode } from '../../types.ts';
import { FLOOR_02_DIRECTOR_TIER } from './director/index.ts';
import { FLOOR_02_SUB_DEPARTMENTS_TIER } from './sub-departments/index.ts';
import { FLOOR_02_MANAGERS_TIER, FLOOR_02_MANAGERS_DATA } from './managers/index.ts';
import { FLOOR_02_ASSISTANT_MANAGERS_TIER } from './assistant-managers/index.ts';
import { FLOOR_02_SUPERVISORS_TIER } from './supervisors/index.ts';

export * from './director/index.ts';
export * from './sub-departments/index.ts';
export * from './managers/index.ts';
export * from './assistant-managers/index.ts';
export * from './supervisors/index.ts';

export const FLOOR_02_DEPARTMENT: CanonicalDepartmentNode = {
  deptCode: "DEPT-02",
  floor: "FL-02",
  slug: "floor-02-marketing-branding",
  name: "Marketing, Branding & Digital Acquisition",
  directorAi: "AI Olivia",
  divisions: FLOOR_02_MANAGERS_DATA,
  director: FLOOR_02_DIRECTOR_TIER,
  subDepartments: FLOOR_02_SUB_DEPARTMENTS_TIER,
  managers: FLOOR_02_MANAGERS_TIER,
  assistantManagers: FLOOR_02_ASSISTANT_MANAGERS_TIER,
  supervisors: FLOOR_02_SUPERVISORS_TIER,
} as const;
