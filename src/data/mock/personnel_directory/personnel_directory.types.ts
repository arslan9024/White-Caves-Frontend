/**
 * Personnel Directory — Strongly-Typed Mock HR Data
 * Auto-generated from personnel_directory.json
 */

export type PersonnelRole = 'Manager' | 'Supervisor' | 'Agent' | 'Director' | string;

export interface PersonnelEntry {
  id: string;
  role: PersonnelRole;
  department: string;
  name: string;
  level: number;
  reportsTo?: string;
}


