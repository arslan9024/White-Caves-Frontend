/**
 * floor-06-inventory-portfolio/assistant-managers/data.ts — Level 3 Assistant Manager Clusters (108 Seats on FL-06)
 */
import type { AssistantManagerCluster } from '../../../types.ts';

export const FLOOR_06_ASSISTANT_MANAGERS_DATA: readonly AssistantManagerCluster[] = [
  {
    divisionCode: "DIV-06-1",
    managerSlot: 1,
    assistantManagerSlots: 12,
    seatRange: "MD-01.DIR-06.MGR-01.AM-01..AM-12",
    reportsToManagerAi: "AI Sentinel Master",
  },
  {
    divisionCode: "DIV-06-2",
    managerSlot: 2,
    assistantManagerSlots: 12,
    seatRange: "MD-01.DIR-06.MGR-02.AM-01..AM-12",
    reportsToManagerAi: "AI Landlord Liaison",
  },
  {
    divisionCode: "DIV-06-3",
    managerSlot: 3,
    assistantManagerSlots: 12,
    seatRange: "MD-01.DIR-06.MGR-03.AM-01..AM-12",
    reportsToManagerAi: "AI Tenancy Custody",
  },
  {
    divisionCode: "DIV-06-4",
    managerSlot: 4,
    assistantManagerSlots: 12,
    seatRange: "MD-01.DIR-06.MGR-04.AM-01..AM-12",
    reportsToManagerAi: "AI Cluster Valuation",
  },
  {
    divisionCode: "DIV-06-5",
    managerSlot: 5,
    assistantManagerSlots: 12,
    seatRange: "MD-01.DIR-06.MGR-05.AM-01..AM-12",
    reportsToManagerAi: "AI Asset Inspection",
  },
  {
    divisionCode: "DIV-06-6",
    managerSlot: 6,
    assistantManagerSlots: 12,
    seatRange: "MD-01.DIR-06.MGR-06.AM-01..AM-12",
    reportsToManagerAi: "AI OffPlan Tracker",
  },
  {
    divisionCode: "DIV-06-7",
    managerSlot: 7,
    assistantManagerSlots: 12,
    seatRange: "MD-01.DIR-06.MGR-07.AM-01..AM-12",
    reportsToManagerAi: "AI Key Management",
  },
  {
    divisionCode: "DIV-06-8",
    managerSlot: 8,
    assistantManagerSlots: 12,
    seatRange: "MD-01.DIR-06.MGR-08.AM-01..AM-12",
    reportsToManagerAi: "AI Bulk Investor Packs",
  },
  {
    divisionCode: "DIV-06-9",
    managerSlot: 9,
    assistantManagerSlots: 12,
    seatRange: "MD-01.DIR-06.MGR-09.AM-01..AM-12",
    reportsToManagerAi: "AI Inventory Archive",
  },
] as const;
