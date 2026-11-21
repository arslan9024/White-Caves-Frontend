/**
 * floor-09-research-analytics/director/data.ts — Level 1 Department Director Entity Data
 */
import type { DirectorData } from '../../../types.ts';

export const FLOOR_09_DIRECTOR_DATA: DirectorData = {
  seatCode: 'MD-01.DIR-09',
  deptCode: "DEPT-09",
  floor: "FL-09",
  departmentName: "Research, Analytics & Market Intelligence",
  directorAi: "AI Elena",
  humanRole: "Research, Analytics & Market Intelligence Corporate Director",
  reportsTo: 'MD-01',
} as const;
