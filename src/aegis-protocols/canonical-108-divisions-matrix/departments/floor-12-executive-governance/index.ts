/**
 * floor-12-executive-governance/index.ts — Department Barrel (DEPT-12 / FL-12)
 */
import type { CanonicalDepartmentNode } from '../../types.ts';
import { FLOOR_12_DIRECTOR_TIER } from './director/index.ts';
import { FLOOR_12_SUB_DEPARTMENTS_TIER } from './sub-departments/index.ts';
import { FLOOR_12_MANAGERS_TIER, FLOOR_12_MANAGERS_DATA } from './managers/index.ts';
import { FLOOR_12_ASSISTANT_MANAGERS_TIER } from './assistant-managers/index.ts';
import { FLOOR_12_SUPERVISORS_TIER } from './supervisors/index.ts';

export * from './director/index.ts';
export * from './sub-departments/index.ts';
export * from './managers/index.ts';
export * from './assistant-managers/index.ts';
export * from './supervisors/index.ts';

export const FLOOR_12_DEPARTMENT: CanonicalDepartmentNode = {
  deptCode: "DEPT-12",
  floor: "FL-12",
  slug: "floor-12-executive-governance",
  name: "Executive, Governance & Strategy",
  directorAi: "AI Zayed",
  divisions: FLOOR_12_MANAGERS_DATA,
  director: FLOOR_12_DIRECTOR_TIER,
  subDepartments: FLOOR_12_SUB_DEPARTMENTS_TIER,
  managers: FLOOR_12_MANAGERS_TIER,
  assistantManagers: FLOOR_12_ASSISTANT_MANAGERS_TIER,
  supervisors: FLOOR_12_SUPERVISORS_TIER,
} as const;
