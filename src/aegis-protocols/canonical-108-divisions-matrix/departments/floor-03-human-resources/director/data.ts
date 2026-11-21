/**
 * floor-03-human-resources/director/data.ts — Level 1 Department Director Entity Data
 */
import type { DirectorData } from '../../../types.ts';

export const FLOOR_03_DIRECTOR_DATA: DirectorData = {
  seatCode: 'MD-01.DIR-03',
  deptCode: "DEPT-03",
  floor: "FL-03",
  departmentName: "Human Resources, Performance & Recruiting",
  directorAi: "AI Selena",
  humanRole: "Human Resources, Performance & Recruiting Corporate Director",
  reportsTo: 'MD-01',
} as const;
