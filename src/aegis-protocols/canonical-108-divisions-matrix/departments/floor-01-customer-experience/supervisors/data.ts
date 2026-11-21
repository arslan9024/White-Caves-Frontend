/**
 * floor-01-customer-experience/supervisors/data.ts — Level 4 Supervisor Stop-Boundary Clusters (972 Seats on FL-01)
 */
import type { SupervisorClusterSummary } from '../../../types.ts';

export const FLOOR_01_SUPERVISORS_DATA: readonly SupervisorClusterSummary[] = [
  {
    divisionCode: "DIV-01-1",
    managerSlot: 1,
    supervisorsPerAssistantManager: 9,
    totalSupervisorsInDivision: 108,
    seatPattern: "MD-01.DIR-01.MGR-01.AM-01..12.SUP-01..09",
    manualTeamsMode: 'MANUAL_CRUD',
  },
  {
    divisionCode: "DIV-01-2",
    managerSlot: 2,
    supervisorsPerAssistantManager: 9,
    totalSupervisorsInDivision: 108,
    seatPattern: "MD-01.DIR-01.MGR-02.AM-01..12.SUP-01..09",
    manualTeamsMode: 'MANUAL_CRUD',
  },
  {
    divisionCode: "DIV-01-3",
    managerSlot: 3,
    supervisorsPerAssistantManager: 9,
    totalSupervisorsInDivision: 108,
    seatPattern: "MD-01.DIR-01.MGR-03.AM-01..12.SUP-01..09",
    manualTeamsMode: 'MANUAL_CRUD',
  },
  {
    divisionCode: "DIV-01-4",
    managerSlot: 4,
    supervisorsPerAssistantManager: 9,
    totalSupervisorsInDivision: 108,
    seatPattern: "MD-01.DIR-01.MGR-04.AM-01..12.SUP-01..09",
    manualTeamsMode: 'MANUAL_CRUD',
  },
  {
    divisionCode: "DIV-01-5",
    managerSlot: 5,
    supervisorsPerAssistantManager: 9,
    totalSupervisorsInDivision: 108,
    seatPattern: "MD-01.DIR-01.MGR-05.AM-01..12.SUP-01..09",
    manualTeamsMode: 'MANUAL_CRUD',
  },
  {
    divisionCode: "DIV-01-6",
    managerSlot: 6,
    supervisorsPerAssistantManager: 9,
    totalSupervisorsInDivision: 108,
    seatPattern: "MD-01.DIR-01.MGR-06.AM-01..12.SUP-01..09",
    manualTeamsMode: 'MANUAL_CRUD',
  },
  {
    divisionCode: "DIV-01-7",
    managerSlot: 7,
    supervisorsPerAssistantManager: 9,
    totalSupervisorsInDivision: 108,
    seatPattern: "MD-01.DIR-01.MGR-07.AM-01..12.SUP-01..09",
    manualTeamsMode: 'MANUAL_CRUD',
  },
  {
    divisionCode: "DIV-01-8",
    managerSlot: 8,
    supervisorsPerAssistantManager: 9,
    totalSupervisorsInDivision: 108,
    seatPattern: "MD-01.DIR-01.MGR-08.AM-01..12.SUP-01..09",
    manualTeamsMode: 'MANUAL_CRUD',
  },
  {
    divisionCode: "DIV-01-9",
    managerSlot: 9,
    supervisorsPerAssistantManager: 9,
    totalSupervisorsInDivision: 108,
    seatPattern: "MD-01.DIR-01.MGR-09.AM-01..12.SUP-01..09",
    manualTeamsMode: 'MANUAL_CRUD',
  },
] as const;
