/**
 * floor-01-customer-experience/assistant-managers/data.ts — Level 3 Assistant Manager Clusters (108 Seats on FL-01)
 */
import type { AssistantManagerCluster } from '../../../types.ts';

export const FLOOR_01_ASSISTANT_MANAGERS_DATA: readonly AssistantManagerCluster[] = [
  {
    divisionCode: "DIV-01-1",
    managerSlot: 1,
    assistantManagerSlots: 12,
    seatRange: "MD-01.DIR-01.MGR-01.AM-01..AM-12",
    reportsToManagerAi: "AI Corinne Frontline",
  },
  {
    divisionCode: "DIV-01-2",
    managerSlot: 2,
    assistantManagerSlots: 12,
    seatRange: "MD-01.DIR-01.MGR-02.AM-01..AM-12",
    reportsToManagerAi: "AI Chauffeur Logistics",
  },
  {
    divisionCode: "DIV-01-3",
    managerSlot: 3,
    assistantManagerSlots: 12,
    seatRange: "MD-01.DIR-01.MGR-03.AM-01..AM-12",
    reportsToManagerAi: "AI Multilingual Desk",
  },
  {
    divisionCode: "DIV-01-4",
    managerSlot: 4,
    assistantManagerSlots: 12,
    seatRange: "MD-01.DIR-01.MGR-04.AM-01..AM-12",
    reportsToManagerAi: "AI ClientCare Lead",
  },
  {
    divisionCode: "DIV-01-5",
    managerSlot: 5,
    assistantManagerSlots: 12,
    seatRange: "MD-01.DIR-01.MGR-05.AM-01..AM-12",
    reportsToManagerAi: "AI Feedback Sentinel",
  },
  {
    divisionCode: "DIV-01-6",
    managerSlot: 6,
    assistantManagerSlots: 12,
    seatRange: "MD-01.DIR-01.MGR-06.AM-01..AM-12",
    reportsToManagerAi: "AI Retention Care",
  },
  {
    divisionCode: "DIV-01-7",
    managerSlot: 7,
    assistantManagerSlots: 12,
    seatRange: "MD-01.DIR-01.MGR-07.AM-01..AM-12",
    reportsToManagerAi: "AI Event Hostess",
  },
  {
    divisionCode: "DIV-01-8",
    managerSlot: 8,
    assistantManagerSlots: 12,
    seatRange: "MD-01.DIR-01.MGR-08.AM-01..AM-12",
    reportsToManagerAi: "AI Emergency Relief",
  },
  {
    divisionCode: "DIV-01-9",
    managerSlot: 9,
    assistantManagerSlots: 12,
    seatRange: "MD-01.DIR-01.MGR-09.AM-01..AM-12",
    reportsToManagerAi: "AI Sovereign Advisory",
  },
] as const;
