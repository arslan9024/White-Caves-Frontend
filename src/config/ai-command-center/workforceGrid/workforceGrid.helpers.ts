import { DepartmentGridNode, DepartmentSupervisor, DepartmentManager } from './workforceGrid.types';
import { ALL_DEPARTMENTS } from './workforceGrid.departments';

export const getDepartmentById = (deptId: string): DepartmentGridNode | undefined =>
  ALL_DEPARTMENTS.find(d => d.deptId === deptId);

export const getDepartmentByCode = (code: string): DepartmentGridNode | undefined =>
  ALL_DEPARTMENTS.find(d => d.deptCode.toLowerCase() === code.toLowerCase());

export const getAllSupervisors = (): DepartmentSupervisor[] =>
  ALL_DEPARTMENTS.flatMap(d => d.supervisors);

export const getSupervisorById = (id: string): DepartmentSupervisor | undefined =>
  getAllSupervisors().find(s => s.id === id);

export const getAllManagers = (): DepartmentManager[] =>
  ALL_DEPARTMENTS.map(d => d.manager);

