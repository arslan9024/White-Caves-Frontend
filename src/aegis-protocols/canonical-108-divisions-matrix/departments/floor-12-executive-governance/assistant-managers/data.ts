/**
 * floor-12-executive-governance/assistant-managers/data.ts — Level 3 Assistant Manager Clusters (108 Seats on FL-12)
 */
import type { AssistantManagerCluster } from '../../../types.ts';

export const FLOOR_12_ASSISTANT_MANAGERS_DATA: readonly AssistantManagerCluster[] = [
  {
    divisionCode: "DIV-12-1",
    managerSlot: 1,
    assistantManagerSlots: 12,
    seatRange: "MD-01.DIR-12.MGR-01.AM-01..AM-12",
    reportsToManagerAi: "AI Zayed Secretariat",
  },
  {
    divisionCode: "DIV-12-2",
    managerSlot: 2,
    assistantManagerSlots: 12,
    seatRange: "MD-01.DIR-12.MGR-02.AM-01..AM-12",
    reportsToManagerAi: "AI Strategic Roadmap",
  },
  {
    divisionCode: "DIV-12-3",
    managerSlot: 3,
    assistantManagerSlots: 12,
    seatRange: "MD-01.DIR-12.MGR-03.AM-01..AM-12",
    reportsToManagerAi: "AI Risk Management",
  },
  {
    divisionCode: "DIV-12-4",
    managerSlot: 4,
    assistantManagerSlots: 12,
    seatRange: "MD-01.DIR-12.MGR-04.AM-01..AM-12",
    reportsToManagerAi: "AI Zoe Liaison Desk",
  },
  {
    divisionCode: "DIV-12-5",
    managerSlot: 5,
    assistantManagerSlots: 12,
    seatRange: "MD-01.DIR-12.MGR-05.AM-01..AM-12",
    reportsToManagerAi: "AI Merit XP Master",
  },
  {
    divisionCode: "DIV-12-6",
    managerSlot: 6,
    assistantManagerSlots: 12,
    seatRange: "MD-01.DIR-12.MGR-06.AM-01..AM-12",
    reportsToManagerAi: "AI Compliance Oversight",
  },
  {
    divisionCode: "DIV-12-7",
    managerSlot: 7,
    assistantManagerSlots: 12,
    seatRange: "MD-01.DIR-12.MGR-07.AM-01..AM-12",
    reportsToManagerAi: "AI Capital Allocation",
  },
  {
    divisionCode: "DIV-12-8",
    managerSlot: 8,
    assistantManagerSlots: 12,
    seatRange: "MD-01.DIR-12.MGR-08.AM-01..AM-12",
    reportsToManagerAi: "AI Corporate Restructure",
  },
  {
    divisionCode: "DIV-12-9",
    managerSlot: 9,
    assistantManagerSlots: 12,
    seatRange: "MD-01.DIR-12.MGR-09.AM-01..AM-12",
    reportsToManagerAi: "AI Sovereign SignOff",
  },
] as const;
