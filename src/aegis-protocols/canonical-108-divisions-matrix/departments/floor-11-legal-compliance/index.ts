/**
 * floor-11-legal-compliance/index.ts — Department Barrel (DEPT-11 / FL-11)
 */
import type { CanonicalDepartmentNode } from '../../types.ts';
import { FLOOR_11_DIRECTOR_TIER } from './director/index.ts';
import { FLOOR_11_SUB_DEPARTMENTS_TIER } from './sub-departments/index.ts';
import { FLOOR_11_MANAGERS_TIER, FLOOR_11_MANAGERS_DATA } from './managers/index.ts';
import { FLOOR_11_ASSISTANT_MANAGERS_TIER } from './assistant-managers/index.ts';
import { FLOOR_11_SUPERVISORS_TIER } from './supervisors/index.ts';

export * from './director/index.ts';
export * from './sub-departments/index.ts';
export * from './managers/index.ts';
export * from './assistant-managers/index.ts';
export * from './supervisors/index.ts';

export const FLOOR_11_DEPARTMENT: CanonicalDepartmentNode = {
  deptCode: "DEPT-11",
  floor: "FL-11",
  slug: "floor-11-legal-compliance",
  name: "Legal, Compliance & Audit",
  directorAi: "AI Sofia",
  divisions: FLOOR_11_MANAGERS_DATA,
  director: FLOOR_11_DIRECTOR_TIER,
  subDepartments: FLOOR_11_SUB_DEPARTMENTS_TIER,
  managers: FLOOR_11_MANAGERS_TIER,
  assistantManagers: FLOOR_11_ASSISTANT_MANAGERS_TIER,
  supervisors: FLOOR_11_SUPERVISORS_TIER,
} as const;
