/**
 * floor-10-accounting-finance/assistant-managers/data.ts — Level 3 Assistant Manager Clusters (108 Seats on FL-10)
 */
import type { AssistantManagerCluster } from '../../../types.ts';

export const FLOOR_10_ASSISTANT_MANAGERS_DATA: readonly AssistantManagerCluster[] = [
  {
    divisionCode: "DIV-10-1",
    managerSlot: 1,
    assistantManagerSlots: 12,
    seatRange: "MD-01.DIR-10.MGR-01.AM-01..AM-12",
    reportsToManagerAi: "AI Theodora Controller",
  },
  {
    divisionCode: "DIV-10-2",
    managerSlot: 2,
    assistantManagerSlots: 12,
    seatRange: "MD-01.DIR-10.MGR-02.AM-01..AM-12",
    reportsToManagerAi: "AI UAE Tax Engine",
  },
  {
    divisionCode: "DIV-10-3",
    managerSlot: 3,
    assistantManagerSlots: 12,
    seatRange: "MD-01.DIR-10.MGR-03.AM-01..AM-12",
    reportsToManagerAi: "AI UAE VAT Compliance",
  },
  {
    divisionCode: "DIV-10-4",
    managerSlot: 4,
    assistantManagerSlots: 12,
    seatRange: "MD-01.DIR-10.MGR-04.AM-01..AM-12",
    reportsToManagerAi: "AI Escrow Account Sync",
  },
  {
    divisionCode: "DIV-10-5",
    managerSlot: 5,
    assistantManagerSlots: 12,
    seatRange: "MD-01.DIR-10.MGR-05.AM-01..AM-12",
    reportsToManagerAi: "AI Broker Payroll Comm",
  },
  {
    divisionCode: "DIV-10-6",
    managerSlot: 6,
    assistantManagerSlots: 12,
    seatRange: "MD-01.DIR-10.MGR-06.AM-01..AM-12",
    reportsToManagerAi: "AI Accounts Payable",
  },
  {
    divisionCode: "DIV-10-7",
    managerSlot: 7,
    assistantManagerSlots: 12,
    seatRange: "MD-01.DIR-10.MGR-07.AM-01..AM-12",
    reportsToManagerAi: "AI Treasury Forex",
  },
  {
    divisionCode: "DIV-10-8",
    managerSlot: 8,
    assistantManagerSlots: 12,
    seatRange: "MD-01.DIR-10.MGR-08.AM-01..AM-12",
    reportsToManagerAi: "AI Zoho Books Sync",
  },
  {
    divisionCode: "DIV-10-9",
    managerSlot: 9,
    assistantManagerSlots: 12,
    seatRange: "MD-01.DIR-10.MGR-09.AM-01..AM-12",
    reportsToManagerAi: "AI Financial Auditor",
  },
] as const;
