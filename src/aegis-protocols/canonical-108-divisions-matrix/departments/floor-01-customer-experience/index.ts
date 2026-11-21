/**
 * floor-01-customer-experience/index.ts — Department Barrel (DEPT-01 / FL-01)
 */
import type { CanonicalDepartmentNode } from '../../types.ts';
import { FLOOR_01_DIRECTOR_TIER } from './director/index.ts';
import { FLOOR_01_SUB_DEPARTMENTS_TIER } from './sub-departments/index.ts';
import { FLOOR_01_MANAGERS_TIER, FLOOR_01_MANAGERS_DATA } from './managers/index.ts';
import { FLOOR_01_ASSISTANT_MANAGERS_TIER } from './assistant-managers/index.ts';
import { FLOOR_01_SUPERVISORS_TIER } from './supervisors/index.ts';

export * from './director/index.ts';
export * from './sub-departments/index.ts';
export * from './managers/index.ts';
export * from './assistant-managers/index.ts';
export * from './supervisors/index.ts';

export const FLOOR_01_DEPARTMENT: CanonicalDepartmentNode = {
  deptCode: "DEPT-01",
  floor: "FL-01",
  slug: "floor-01-customer-experience",
  name: "Customer Experience, Concierge & Hospitality",
  directorAi: "AI Corinne",
  divisions: FLOOR_01_MANAGERS_DATA,
  director: FLOOR_01_DIRECTOR_TIER,
  subDepartments: FLOOR_01_SUB_DEPARTMENTS_TIER,
  managers: FLOOR_01_MANAGERS_TIER,
  assistantManagers: FLOOR_01_ASSISTANT_MANAGERS_TIER,
  supervisors: FLOOR_01_SUPERVISORS_TIER,
} as const;
