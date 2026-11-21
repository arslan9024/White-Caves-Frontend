/**
 * floor-10-accounting-finance/director/data.ts — Level 1 Department Director Entity Data
 */
import type { DirectorData } from '../../../types.ts';

export const FLOOR_10_DIRECTOR_DATA: DirectorData = {
  seatCode: 'MD-01.DIR-10',
  deptCode: "DEPT-10",
  floor: "FL-10",
  departmentName: "Accounting, Finance & Tax",
  directorAi: "AI Theodora",
  humanRole: "Accounting, Finance & Tax Corporate Director",
  reportsTo: 'MD-01',
} as const;
