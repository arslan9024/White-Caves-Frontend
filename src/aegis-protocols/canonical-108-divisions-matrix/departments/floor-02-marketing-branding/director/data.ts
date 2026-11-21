/**
 * floor-02-marketing-branding/director/data.ts — Level 1 Department Director Entity Data
 */
import type { DirectorData } from '../../../types.ts';

export const FLOOR_02_DIRECTOR_DATA: DirectorData = {
  seatCode: 'MD-01.DIR-02',
  deptCode: "DEPT-02",
  floor: "FL-02",
  departmentName: "Marketing, Branding & Digital Acquisition",
  directorAi: "AI Olivia",
  humanRole: "Marketing, Branding & Digital Acquisition Corporate Director",
  reportsTo: 'MD-01',
} as const;
