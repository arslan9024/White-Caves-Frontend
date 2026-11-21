/**
 * floor-02-marketing-branding/assistant-managers/data.ts — Level 3 Assistant Manager Clusters (108 Seats on FL-02)
 */
import type { AssistantManagerCluster } from '../../../types.ts';

export const FLOOR_02_ASSISTANT_MANAGERS_DATA: readonly AssistantManagerCluster[] = [
  {
    divisionCode: "DIV-02-1",
    managerSlot: 1,
    assistantManagerSlots: 12,
    seatRange: "MD-01.DIR-02.MGR-01.AM-01..AM-12",
    reportsToManagerAi: "AI Olivia Performance",
  },
  {
    divisionCode: "DIV-02-2",
    managerSlot: 2,
    assistantManagerSlots: 12,
    seatRange: "MD-01.DIR-02.MGR-02.AM-01..AM-12",
    reportsToManagerAi: "AI Portal Syndicator",
  },
  {
    divisionCode: "DIV-02-3",
    managerSlot: 3,
    assistantManagerSlots: 12,
    seatRange: "MD-01.DIR-02.MGR-03.AM-01..AM-12",
    reportsToManagerAi: "AI SEO Dominance",
  },
  {
    divisionCode: "DIV-02-4",
    managerSlot: 4,
    assistantManagerSlots: 12,
    seatRange: "MD-01.DIR-02.MGR-04.AM-01..AM-12",
    reportsToManagerAi: "AI Brand Guardian",
  },
  {
    divisionCode: "DIV-02-5",
    managerSlot: 5,
    assistantManagerSlots: 12,
    seatRange: "MD-01.DIR-02.MGR-05.AM-01..AM-12",
    reportsToManagerAi: "AI Social Pulse",
  },
  {
    divisionCode: "DIV-02-6",
    managerSlot: 6,
    assistantManagerSlots: 12,
    seatRange: "MD-01.DIR-02.MGR-06.AM-01..AM-12",
    reportsToManagerAi: "AI Creative Studio",
  },
  {
    divisionCode: "DIV-02-7",
    managerSlot: 7,
    assistantManagerSlots: 12,
    seatRange: "MD-01.DIR-02.MGR-07.AM-01..AM-12",
    reportsToManagerAi: "AI Email Nurture",
  },
  {
    divisionCode: "DIV-02-8",
    managerSlot: 8,
    assistantManagerSlots: 12,
    seatRange: "MD-01.DIR-02.MGR-08.AM-01..AM-12",
    reportsToManagerAi: "AI Event Promoter",
  },
  {
    divisionCode: "DIV-02-9",
    managerSlot: 9,
    assistantManagerSlots: 12,
    seatRange: "MD-01.DIR-02.MGR-09.AM-01..AM-12",
    reportsToManagerAi: "AI Performance Audit",
  },
] as const;
