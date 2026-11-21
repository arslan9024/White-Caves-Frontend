/**
 * floor-06-inventory-portfolio/director/data.ts — Level 1 Department Director Entity Data
 */
import type { DirectorData } from '../../../types.ts';

export const FLOOR_06_DIRECTOR_DATA: DirectorData = {
  seatCode: 'MD-01.DIR-06',
  deptCode: "DEPT-06",
  floor: "FL-06",
  departmentName: "Inventory, Portfolio & Asset Management",
  directorAi: "AI Sentinel",
  humanRole: "Inventory, Portfolio & Asset Management Corporate Director",
  reportsTo: 'MD-01',
} as const;
