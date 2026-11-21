/**
 * floor-05-sales-operations/director/data.ts — Level 1 Department Director Entity Data
 */
import type { DirectorData } from '../../../types.ts';

export const FLOOR_05_DIRECTOR_DATA: DirectorData = {
  seatCode: 'MD-01.DIR-05',
  deptCode: "DEPT-05",
  floor: "FL-05",
  departmentName: "Sales, Services & Operations",
  directorAi: "AI Clara",
  humanRole: "Sales, Services & Operations Corporate Director",
  reportsTo: 'MD-01',
} as const;
