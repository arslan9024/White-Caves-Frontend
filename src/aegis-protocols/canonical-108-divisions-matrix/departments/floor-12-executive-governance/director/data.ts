/**
 * floor-12-executive-governance/director/data.ts — Level 1 Department Director Entity Data
 */
import type { DirectorData } from '../../../types.ts';

export const FLOOR_12_DIRECTOR_DATA: DirectorData = {
  seatCode: 'MD-01.DIR-12',
  deptCode: "DEPT-12",
  floor: "FL-12",
  departmentName: "Executive, Governance & Strategy",
  directorAi: "AI Zayed",
  humanRole: "Executive, Governance & Strategy Corporate Director",
  reportsTo: 'MD-01',
} as const;
