/**
 * floor-09-research-analytics/assistant-managers/data.ts — Level 3 Assistant Manager Clusters (108 Seats on FL-09)
 */
import type { AssistantManagerCluster } from '../../../types.ts';

export const FLOOR_09_ASSISTANT_MANAGERS_DATA: readonly AssistantManagerCluster[] = [
  {
    divisionCode: "DIV-09-1",
    managerSlot: 1,
    assistantManagerSlots: 12,
    seatRange: "MD-01.DIR-09.MGR-01.AM-01..AM-12",
    reportsToManagerAi: "AI Elena Science",
  },
  {
    divisionCode: "DIV-09-2",
    managerSlot: 2,
    assistantManagerSlots: 12,
    seatRange: "MD-01.DIR-09.MGR-02.AM-01..AM-12",
    reportsToManagerAi: "AI Predictive ML",
  },
  {
    divisionCode: "DIV-09-3",
    managerSlot: 3,
    assistantManagerSlots: 12,
    seatRange: "MD-01.DIR-09.MGR-03.AM-01..AM-12",
    reportsToManagerAi: "AI Rental Yield Engine",
  },
  {
    divisionCode: "DIV-09-4",
    managerSlot: 4,
    assistantManagerSlots: 12,
    seatRange: "MD-01.DIR-09.MGR-04.AM-01..AM-12",
    reportsToManagerAi: "AI Heatmap Geospatial",
  },
  {
    divisionCode: "DIV-09-5",
    managerSlot: 5,
    assistantManagerSlots: 12,
    seatRange: "MD-01.DIR-09.MGR-05.AM-01..AM-12",
    reportsToManagerAi: "AI Competitor Radar",
  },
  {
    divisionCode: "DIV-09-6",
    managerSlot: 6,
    assistantManagerSlots: 12,
    seatRange: "MD-01.DIR-09.MGR-06.AM-01..AM-12",
    reportsToManagerAi: "AI Demographics Profiler",
  },
  {
    divisionCode: "DIV-09-7",
    managerSlot: 7,
    assistantManagerSlots: 12,
    seatRange: "MD-01.DIR-09.MGR-07.AM-01..AM-12",
    reportsToManagerAi: "AI Macro Pulse GCC",
  },
  {
    divisionCode: "DIV-09-8",
    managerSlot: 8,
    assistantManagerSlots: 12,
    seatRange: "MD-01.DIR-09.MGR-08.AM-01..AM-12",
    reportsToManagerAi: "AI Master Plan Tracker",
  },
  {
    divisionCode: "DIV-09-9",
    managerSlot: 9,
    assistantManagerSlots: 12,
    seatRange: "MD-01.DIR-09.MGR-09.AM-01..AM-12",
    reportsToManagerAi: "AI White Paper Studio",
  },
] as const;
