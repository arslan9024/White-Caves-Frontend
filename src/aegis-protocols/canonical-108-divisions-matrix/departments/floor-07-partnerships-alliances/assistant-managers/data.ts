/**
 * floor-07-partnerships-alliances/assistant-managers/data.ts — Level 3 Assistant Manager Clusters (108 Seats on FL-07)
 */
import type { AssistantManagerCluster } from '../../../types.ts';

export const FLOOR_07_ASSISTANT_MANAGERS_DATA: readonly AssistantManagerCluster[] = [
  {
    divisionCode: "DIV-07-1",
    managerSlot: 1,
    assistantManagerSlots: 12,
    seatRange: "MD-01.DIR-07.MGR-01.AM-01..AM-12",
    reportsToManagerAi: "AI Maktoum Alliances",
  },
  {
    divisionCode: "DIV-07-2",
    managerSlot: 2,
    assistantManagerSlots: 12,
    seatRange: "MD-01.DIR-07.MGR-02.AM-01..AM-12",
    reportsToManagerAi: "AI Family Office",
  },
  {
    divisionCode: "DIV-07-3",
    managerSlot: 3,
    assistantManagerSlots: 12,
    seatRange: "MD-01.DIR-07.MGR-03.AM-01..AM-12",
    reportsToManagerAi: "AI Bank Mortgages",
  },
  {
    divisionCode: "DIV-07-4",
    managerSlot: 4,
    assistantManagerSlots: 12,
    seatRange: "MD-01.DIR-07.MGR-04.AM-01..AM-12",
    reportsToManagerAi: "AI Global Corridors",
  },
  {
    divisionCode: "DIV-07-5",
    managerSlot: 5,
    assistantManagerSlots: 12,
    seatRange: "MD-01.DIR-07.MGR-05.AM-01..AM-12",
    reportsToManagerAi: "AI Luxury Brands",
  },
  {
    divisionCode: "DIV-07-6",
    managerSlot: 6,
    assistantManagerSlots: 12,
    seatRange: "MD-01.DIR-07.MGR-06.AM-01..AM-12",
    reportsToManagerAi: "AI Relocation Partners",
  },
  {
    divisionCode: "DIV-07-7",
    managerSlot: 7,
    assistantManagerSlots: 12,
    seatRange: "MD-01.DIR-07.MGR-07.AM-01..AM-12",
    reportsToManagerAi: "AI Golden Visa Network",
  },
  {
    divisionCode: "DIV-07-8",
    managerSlot: 8,
    assistantManagerSlots: 12,
    seatRange: "MD-01.DIR-07.MGR-08.AM-01..AM-12",
    reportsToManagerAi: "AI Venture Expansion",
  },
  {
    divisionCode: "DIV-07-9",
    managerSlot: 9,
    assistantManagerSlots: 12,
    seatRange: "MD-01.DIR-07.MGR-09.AM-01..AM-12",
    reportsToManagerAi: "AI Sponsorship Alliance",
  },
] as const;
