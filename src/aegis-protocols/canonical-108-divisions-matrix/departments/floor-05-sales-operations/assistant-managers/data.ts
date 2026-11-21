/**
 * floor-05-sales-operations/assistant-managers/data.ts — Level 3 Assistant Manager Clusters (108 Seats on FL-05)
 */
import type { AssistantManagerCluster } from '../../../types.ts';

export const FLOOR_05_ASSISTANT_MANAGERS_DATA: readonly AssistantManagerCluster[] = [
  {
    divisionCode: "DIV-05-1",
    managerSlot: 1,
    assistantManagerSlots: 12,
    seatRange: "MD-01.DIR-05.MGR-01.AM-01..AM-12",
    reportsToManagerAi: "AI OffPlan Allocation",
  },
  {
    divisionCode: "DIV-05-2",
    managerSlot: 2,
    assistantManagerSlots: 12,
    seatRange: "MD-01.DIR-05.MGR-02.AM-01..AM-12",
    reportsToManagerAi: "AI Clara Secondary",
  },
  {
    divisionCode: "DIV-05-3",
    managerSlot: 3,
    assistantManagerSlots: 12,
    seatRange: "MD-01.DIR-05.MGR-03.AM-01..AM-12",
    reportsToManagerAi: "AI Commercial Broker",
  },
  {
    divisionCode: "DIV-05-4",
    managerSlot: 4,
    assistantManagerSlots: 12,
    seatRange: "MD-01.DIR-05.MGR-04.AM-01..AM-12",
    reportsToManagerAi: "AI Buyer Matcher",
  },
  {
    divisionCode: "DIV-05-5",
    managerSlot: 5,
    assistantManagerSlots: 12,
    seatRange: "MD-01.DIR-05.MGR-05.AM-01..AM-12",
    reportsToManagerAi: "AI Viewing Scheduler",
  },
  {
    divisionCode: "DIV-05-6",
    managerSlot: 6,
    assistantManagerSlots: 12,
    seatRange: "MD-01.DIR-05.MGR-06.AM-01..AM-12",
    reportsToManagerAi: "AI Deal Closer",
  },
  {
    divisionCode: "DIV-05-7",
    managerSlot: 7,
    assistantManagerSlots: 12,
    seatRange: "MD-01.DIR-05.MGR-07.AM-01..AM-12",
    reportsToManagerAi: "AI Pipeline Velocity",
  },
  {
    divisionCode: "DIV-05-8",
    managerSlot: 8,
    assistantManagerSlots: 12,
    seatRange: "MD-01.DIR-05.MGR-08.AM-01..AM-12",
    reportsToManagerAi: "AI Commission Splitter",
  },
  {
    divisionCode: "DIV-05-9",
    managerSlot: 9,
    assistantManagerSlots: 12,
    seatRange: "MD-01.DIR-05.MGR-09.AM-01..AM-12",
    reportsToManagerAi: "AI Lead Distributor",
  },
] as const;
