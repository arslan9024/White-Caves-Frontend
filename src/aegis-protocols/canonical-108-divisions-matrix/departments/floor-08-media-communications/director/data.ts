/**
 * floor-08-media-communications/director/data.ts — Level 1 Department Director Entity Data
 */
import type { DirectorData } from '../../../types.ts';

export const FLOOR_08_DIRECTOR_DATA: DirectorData = {
  seatCode: 'MD-01.DIR-08',
  deptCode: "DEPT-08",
  floor: "FL-08",
  departmentName: "Media, Public Relations & Communications",
  directorAi: "AI Maya",
  humanRole: "Media, Public Relations & Communications Corporate Director",
  reportsTo: 'MD-01',
} as const;
