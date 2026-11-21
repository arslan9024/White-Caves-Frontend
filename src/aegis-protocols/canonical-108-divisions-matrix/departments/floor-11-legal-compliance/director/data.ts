/**
 * floor-11-legal-compliance/director/data.ts — Level 1 Department Director Entity Data
 */
import type { DirectorData } from '../../../types.ts';

export const FLOOR_11_DIRECTOR_DATA: DirectorData = {
  seatCode: 'MD-01.DIR-11',
  deptCode: "DEPT-11",
  floor: "FL-11",
  departmentName: "Legal, Compliance & Audit",
  directorAi: "AI Sofia",
  humanRole: "Legal, Compliance & Audit Corporate Director",
  reportsTo: 'MD-01',
} as const;
