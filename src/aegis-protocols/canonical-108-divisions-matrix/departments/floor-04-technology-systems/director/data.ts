/**
 * floor-04-technology-systems/director/data.ts — Level 1 Department Director Entity Data
 */
import type { DirectorData } from '../../../types.ts';

export const FLOOR_04_DIRECTOR_DATA: DirectorData = {
  seatCode: 'MD-01.DIR-04',
  deptCode: "DEPT-04",
  floor: "FL-04",
  departmentName: "Technology, Systems & Digital Infrastructure",
  directorAi: "AI Aurora",
  humanRole: "Technology, Systems & Digital Infrastructure Corporate Director",
  reportsTo: 'MD-01',
} as const;
