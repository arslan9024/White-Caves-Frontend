/**
 * floor-08-media-communications/assistant-managers/data.ts — Level 3 Assistant Manager Clusters (108 Seats on FL-08)
 */
import type { AssistantManagerCluster } from '../../../types.ts';

export const FLOOR_08_ASSISTANT_MANAGERS_DATA: readonly AssistantManagerCluster[] = [
  {
    divisionCode: "DIV-08-1",
    managerSlot: 1,
    assistantManagerSlots: 12,
    seatRange: "MD-01.DIR-08.MGR-01.AM-01..AM-12",
    reportsToManagerAi: "AI Maya PR",
  },
  {
    divisionCode: "DIV-08-2",
    managerSlot: 2,
    assistantManagerSlots: 12,
    seatRange: "MD-01.DIR-08.MGR-02.AM-01..AM-12",
    reportsToManagerAi: "AI Media Studio",
  },
  {
    divisionCode: "DIV-08-3",
    managerSlot: 3,
    assistantManagerSlots: 12,
    seatRange: "MD-01.DIR-08.MGR-03.AM-01..AM-12",
    reportsToManagerAi: "AI Editorial Publish",
  },
  {
    divisionCode: "DIV-08-4",
    managerSlot: 4,
    assistantManagerSlots: 12,
    seatRange: "MD-01.DIR-08.MGR-04.AM-01..AM-12",
    reportsToManagerAi: "AI Podcaster Core",
  },
  {
    divisionCode: "DIV-08-5",
    managerSlot: 5,
    assistantManagerSlots: 12,
    seatRange: "MD-01.DIR-08.MGR-05.AM-01..AM-12",
    reportsToManagerAi: "AI Influencer Desk",
  },
  {
    divisionCode: "DIV-08-6",
    managerSlot: 6,
    assistantManagerSlots: 12,
    seatRange: "MD-01.DIR-08.MGR-06.AM-01..AM-12",
    reportsToManagerAi: "AI Award Submissions",
  },
  {
    divisionCode: "DIV-08-7",
    managerSlot: 7,
    assistantManagerSlots: 12,
    seatRange: "MD-01.DIR-08.MGR-07.AM-01..AM-12",
    reportsToManagerAi: "AI Corporate Identity",
  },
  {
    divisionCode: "DIV-08-8",
    managerSlot: 8,
    assistantManagerSlots: 12,
    seatRange: "MD-01.DIR-08.MGR-08.AM-01..AM-12",
    reportsToManagerAi: "AI Event Press Office",
  },
  {
    divisionCode: "DIV-08-9",
    managerSlot: 9,
    assistantManagerSlots: 12,
    seatRange: "MD-01.DIR-08.MGR-09.AM-01..AM-12",
    reportsToManagerAi: "AI Digital Broadcasting",
  },
] as const;
