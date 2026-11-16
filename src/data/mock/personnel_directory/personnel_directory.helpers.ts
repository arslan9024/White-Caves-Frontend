import type { PersonnelEntry, PersonnelRole } from './personnel_directory.types';
import { PERSONNEL_MANAGERS } from './personnel_directory.managers';
import { PERSONNEL_SUPERVISORS_1 } from './personnel_directory.supervisors1';
import { PERSONNEL_SUPERVISORS_2 } from './personnel_directory.supervisors2';

export const PERSONNEL_DIRECTORY: PersonnelEntry[] = [
  ...PERSONNEL_MANAGERS,
  ...PERSONNEL_SUPERVISORS_1,
  ...PERSONNEL_SUPERVISORS_2,
];

export const getPersonnelById = (id: string): PersonnelEntry | undefined =>
  PERSONNEL_DIRECTORY.find(p => p.id === id);

export const getPersonnelByDepartment = (dept: string): PersonnelEntry[] =>
  PERSONNEL_DIRECTORY.filter(p => p.department === dept);

export const getPersonnelByRole = (role: PersonnelRole): PersonnelEntry[] =>
  PERSONNEL_DIRECTORY.filter(p => p.role === role);

export const getManagers = (): PersonnelEntry[] =>
  PERSONNEL_DIRECTORY.filter(p => p.role === 'Manager');

export default PERSONNEL_DIRECTORY;

