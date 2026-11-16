// Department registry for White Caves Real Estate LLC
import { DepartmentID, DepartmentRegistryEntry } from './departmentRegistry/departmentRegistry.types';
import { CORE_DEPARTMENTS_PART1 } from './departmentRegistry/departmentRegistry.part1';
import { CORE_DEPARTMENTS_PART2 } from './departmentRegistry/departmentRegistry.part2';

export type * from './departmentRegistry/departmentRegistry.types';

export const DEPARTMENT_REGISTRY: Record<DepartmentID, DepartmentRegistryEntry> = {
  ...CORE_DEPARTMENTS_PART1,
  ...CORE_DEPARTMENTS_PART2,
} as Record<DepartmentID, DepartmentRegistryEntry>;

export function getDepartment(id: DepartmentID): DepartmentRegistryEntry {
  return DEPARTMENT_REGISTRY[id];
}

export function listDepartments(): DepartmentRegistryEntry[] {
  return Object.values(DEPARTMENT_REGISTRY);
}

