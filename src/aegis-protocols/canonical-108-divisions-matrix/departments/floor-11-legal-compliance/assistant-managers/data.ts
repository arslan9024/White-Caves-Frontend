/**
 * floor-11-legal-compliance/assistant-managers/data.ts — Level 3 Assistant Manager Clusters (108 Seats on FL-11)
 */
import type { AssistantManagerCluster } from '../../../types.ts';

export const FLOOR_11_ASSISTANT_MANAGERS_DATA: readonly AssistantManagerCluster[] = [
  {
    divisionCode: "DIV-11-1",
    managerSlot: 1,
    assistantManagerSlots: 12,
    seatRange: "MD-01.DIR-11.MGR-01.AM-01..AM-12",
    reportsToManagerAi: "AI Sofia Regulatory",
  },
  {
    divisionCode: "DIV-11-2",
    managerSlot: 2,
    assistantManagerSlots: 12,
    seatRange: "MD-01.DIR-11.MGR-02.AM-01..AM-12",
    reportsToManagerAi: "AI goAML Screening",
  },
  {
    divisionCode: "DIV-11-3",
    managerSlot: 3,
    assistantManagerSlots: 12,
    seatRange: "MD-01.DIR-11.MGR-03.AM-01..AM-12",
    reportsToManagerAi: "AI Trakheesi Engine",
  },
  {
    divisionCode: "DIV-11-4",
    managerSlot: 4,
    assistantManagerSlots: 12,
    seatRange: "MD-01.DIR-11.MGR-04.AM-01..AM-12",
    reportsToManagerAi: "AI Form A Contract",
  },
  {
    divisionCode: "DIV-11-5",
    managerSlot: 5,
    assistantManagerSlots: 12,
    seatRange: "MD-01.DIR-11.MGR-05.AM-01..AM-12",
    reportsToManagerAi: "AI Form B Contract",
  },
  {
    divisionCode: "DIV-11-6",
    managerSlot: 6,
    assistantManagerSlots: 12,
    seatRange: "MD-01.DIR-11.MGR-06.AM-01..AM-12",
    reportsToManagerAi: "AI Form F Contract",
  },
  {
    divisionCode: "DIV-11-7",
    managerSlot: 7,
    assistantManagerSlots: 12,
    seatRange: "MD-01.DIR-11.MGR-07.AM-01..AM-12",
    reportsToManagerAi: "AI POA Verification",
  },
  {
    divisionCode: "DIV-11-8",
    managerSlot: 8,
    assistantManagerSlots: 12,
    seatRange: "MD-01.DIR-11.MGR-08.AM-01..AM-12",
    reportsToManagerAi: "AI Data Privacy Law",
  },
  {
    divisionCode: "DIV-11-9",
    managerSlot: 9,
    assistantManagerSlots: 12,
    seatRange: "MD-01.DIR-11.MGR-09.AM-01..AM-12",
    reportsToManagerAi: "AI Legal Arbitration",
  },
] as const;
