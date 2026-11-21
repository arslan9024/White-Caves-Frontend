/**
 * floor-07-partnerships-alliances/director/data.ts — Level 1 Department Director Entity Data
 */
import type { DirectorData } from '../../../types.ts';

export const FLOOR_07_DIRECTOR_DATA: DirectorData = {
  seatCode: 'MD-01.DIR-07',
  deptCode: "DEPT-07",
  floor: "FL-07",
  departmentName: "Partnerships, Alliances & Capital Growth",
  directorAi: "AI Maktoum",
  humanRole: "Partnerships, Alliances & Capital Growth Corporate Director",
  reportsTo: 'MD-01',
} as const;
