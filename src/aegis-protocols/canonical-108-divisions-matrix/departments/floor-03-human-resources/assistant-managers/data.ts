/**
 * floor-03-human-resources/assistant-managers/data.ts — Level 3 Assistant Manager Clusters (108 Seats on FL-03)
 */
import type { AssistantManagerCluster } from '../../../types.ts';

export const FLOOR_03_ASSISTANT_MANAGERS_DATA: readonly AssistantManagerCluster[] = [
  {
    divisionCode: "DIV-03-1",
    managerSlot: 1,
    assistantManagerSlots: 12,
    seatRange: "MD-01.DIR-03.MGR-01.AM-01..AM-12",
    reportsToManagerAi: "AI Selena Talent",
  },
  {
    divisionCode: "DIV-03-2",
    managerSlot: 2,
    assistantManagerSlots: 12,
    seatRange: "MD-01.DIR-03.MGR-02.AM-01..AM-12",
    reportsToManagerAi: "AI Broker Licensing",
  },
  {
    divisionCode: "DIV-03-3",
    managerSlot: 3,
    assistantManagerSlots: 12,
    seatRange: "MD-01.DIR-03.MGR-03.AM-01..AM-12",
    reportsToManagerAi: "AI Performance KPI",
  },
  {
    divisionCode: "DIV-03-4",
    managerSlot: 4,
    assistantManagerSlots: 12,
    seatRange: "MD-01.DIR-03.MGR-04.AM-01..AM-12",
    reportsToManagerAi: "AI Visa Relocation",
  },
  {
    divisionCode: "DIV-03-5",
    managerSlot: 5,
    assistantManagerSlots: 12,
    seatRange: "MD-01.DIR-03.MGR-05.AM-01..AM-12",
    reportsToManagerAi: "AI MoHRE Payroll",
  },
  {
    divisionCode: "DIV-03-6",
    managerSlot: 6,
    assistantManagerSlots: 12,
    seatRange: "MD-01.DIR-03.MGR-06.AM-01..AM-12",
    reportsToManagerAi: "AI Broker Academy",
  },
  {
    divisionCode: "DIV-03-7",
    managerSlot: 7,
    assistantManagerSlots: 12,
    seatRange: "MD-01.DIR-03.MGR-07.AM-01..AM-12",
    reportsToManagerAi: "AI Attendance Leaves",
  },
  {
    divisionCode: "DIV-03-8",
    managerSlot: 8,
    assistantManagerSlots: 12,
    seatRange: "MD-01.DIR-03.MGR-08.AM-01..AM-12",
    reportsToManagerAi: "AI Emiratisation Desk",
  },
  {
    divisionCode: "DIV-03-9",
    managerSlot: 9,
    assistantManagerSlots: 12,
    seatRange: "MD-01.DIR-03.MGR-09.AM-01..AM-12",
    reportsToManagerAi: "AI Culture Ethics",
  },
] as const;
