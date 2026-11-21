/**
 * canonical-108-divisions-matrix/validators/matrixIntegrity.ts
 * Deterministic Integrity Validator for the 1-12-108 Repeating Fractal Matrix
 */
import type { Canonical108DivisionsMatrix } from '../types.ts';

export interface MatrixIntegrityResult {
  valid: boolean;
  mdCount: number;
  departmentCount: number;
  subDepartmentCount: number;
  divisionManagerCount: number;
  assistantManagerCount: number;
  supervisorCount: number;
  fixedSeatsTotal: number;
  errors: string[];
}

export function validateCanonical108MatrixIntegrity(
  matrix: Canonical108DivisionsMatrix
): MatrixIntegrityResult {
  const errors: string[] = [];
  const departments = matrix.departments ?? [];
  const seenDeptCodes = new Set<string>();
  const seenDivCodes = new Set<string>();

  let subDepartmentCount = 0;
  let divisionManagerCount = 0;
  let assistantManagerCount = 0;
  let supervisorCount = 0;

  if (departments.length !== 12) {
    errors.push(`Expected 12 departments, got ${departments.length}`);
  }

  for (const dept of departments) {
    if (!dept.deptCode || !dept.floor || !dept.name || !dept.directorAi) {
      errors.push(`Department missing required metadata: ${JSON.stringify(dept.deptCode)}`);
    }
    if (seenDeptCodes.has(dept.deptCode)) {
      errors.push(`Duplicate deptCode: ${dept.deptCode}`);
    }
    seenDeptCodes.add(dept.deptCode);

    const divs = dept.divisions ?? [];
    if (divs.length !== 9) {
      errors.push(`Department ${dept.deptCode} expected 9 divisions, got ${divs.length}`);
    }

    subDepartmentCount += dept.subDepartments?.data.length ?? 0;
    divisionManagerCount += divs.length;
    assistantManagerCount +=
      dept.assistantManagers?.data.reduce((s, c) => s + c.assistantManagerSlots, 0) ?? 0;
    supervisorCount +=
      dept.supervisors?.data.reduce((s, c) => s + c.totalSupervisorsInDivision, 0) ?? 0;

    for (let idx = 0; idx < divs.length; idx++) {
      const div = divs[idx];
      if (!div.code || !div.title || !div.aiManager || !div.humanRole) {
        errors.push(`Division in ${dept.deptCode} missing required fields: ${div.code}`);
      }
      if (div.slot !== idx + 1) {
        errors.push(`Division ${div.code} expected slot ${idx + 1}, got ${div.slot}`);
      }
      if (div.desksCount !== 12) {
        errors.push(`Division ${div.code} expected desksCount 12, got ${div.desksCount}`);
      }
      if (seenDivCodes.has(div.code)) {
        errors.push(`Duplicate division code: ${div.code}`);
      }
      seenDivCodes.add(div.code);
    }
  }

  const mdCount = 1;
  const departmentCount = departments.length;
  const fixedSeatsTotal =
    mdCount + departmentCount + divisionManagerCount + assistantManagerCount + supervisorCount;

  if (subDepartmentCount !== 108) errors.push(`Expected 108 sub-departments, got ${subDepartmentCount}`);
  if (divisionManagerCount !== 108) errors.push(`Expected 108 division managers, got ${divisionManagerCount}`);
  if (assistantManagerCount !== 1296)
    errors.push(`Expected 1296 assistant managers, got ${assistantManagerCount}`);
  if (supervisorCount !== 11664) errors.push(`Expected 11664 supervisors, got ${supervisorCount}`);
  if (fixedSeatsTotal !== 13081) errors.push(`Expected 13081 fixed seats, got ${fixedSeatsTotal}`);

  return {
    valid: errors.length === 0,
    mdCount,
    departmentCount,
    subDepartmentCount,
    divisionManagerCount,
    assistantManagerCount,
    supervisorCount,
    fixedSeatsTotal,
    errors,
  };
}
