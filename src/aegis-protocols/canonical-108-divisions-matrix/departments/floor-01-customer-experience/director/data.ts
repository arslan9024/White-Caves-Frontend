/**
 * floor-01-customer-experience/director/data.ts — Level 1 Department Director Entity Data
 */
import type { DirectorData } from '../../../types.ts';

export const FLOOR_01_DIRECTOR_DATA: DirectorData = {
  seatCode: 'MD-01.DIR-01',
  deptCode: "DEPT-01",
  floor: "FL-01",
  departmentName: "Customer Experience, Concierge & Hospitality",
  directorAi: "AI Corinne",
  humanRole: "Customer Experience, Concierge & Hospitality Corporate Director",
  reportsTo: 'MD-01',
} as const;
