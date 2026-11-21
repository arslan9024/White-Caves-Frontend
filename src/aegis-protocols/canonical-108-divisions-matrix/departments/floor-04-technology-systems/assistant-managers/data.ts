/**
 * floor-04-technology-systems/assistant-managers/data.ts — Level 3 Assistant Manager Clusters (108 Seats on FL-04)
 */
import type { AssistantManagerCluster } from '../../../types.ts';

export const FLOOR_04_ASSISTANT_MANAGERS_DATA: readonly AssistantManagerCluster[] = [
  {
    divisionCode: "DIV-04-1",
    managerSlot: 1,
    assistantManagerSlots: 12,
    seatRange: "MD-01.DIR-04.MGR-01.AM-01..AM-12",
    reportsToManagerAi: "AI Aurora Frontend",
  },
  {
    divisionCode: "DIV-04-2",
    managerSlot: 2,
    assistantManagerSlots: 12,
    seatRange: "MD-01.DIR-04.MGR-02.AM-01..AM-12",
    reportsToManagerAi: "AI Backend Gate",
  },
  {
    divisionCode: "DIV-04-3",
    managerSlot: 3,
    assistantManagerSlots: 12,
    seatRange: "MD-01.DIR-04.MGR-03.AM-01..AM-12",
    reportsToManagerAi: "AI Database Prisma",
  },
  {
    divisionCode: "DIV-04-4",
    managerSlot: 4,
    assistantManagerSlots: 12,
    seatRange: "MD-01.DIR-04.MGR-04.AM-01..AM-12",
    reportsToManagerAi: "AI DevOps Cloud",
  },
  {
    divisionCode: "DIV-04-5",
    managerSlot: 5,
    assistantManagerSlots: 12,
    seatRange: "MD-01.DIR-04.MGR-05.AM-01..AM-12",
    reportsToManagerAi: "AI Agent Mesh Engine",
  },
  {
    divisionCode: "DIV-04-6",
    managerSlot: 6,
    assistantManagerSlots: 12,
    seatRange: "MD-01.DIR-04.MGR-06.AM-01..AM-12",
    reportsToManagerAi: "AI Security Sentinel",
  },
  {
    divisionCode: "DIV-04-7",
    managerSlot: 7,
    assistantManagerSlots: 12,
    seatRange: "MD-01.DIR-04.MGR-07.AM-01..AM-12",
    reportsToManagerAi: "AI Mobile Bridge",
  },
  {
    divisionCode: "DIV-04-8",
    managerSlot: 8,
    assistantManagerSlots: 12,
    seatRange: "MD-01.DIR-04.MGR-08.AM-01..AM-12",
    reportsToManagerAi: "AI Vision OCR Core",
  },
  {
    divisionCode: "DIV-04-9",
    managerSlot: 9,
    assistantManagerSlots: 12,
    seatRange: "MD-01.DIR-04.MGR-09.AM-01..AM-12",
    reportsToManagerAi: "AI System Backup",
  },
] as const;
