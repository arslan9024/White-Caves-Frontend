import type { CommissionRecord } from '../CommissionManagementPanel.data';

export type CommissionTab = 'ledger' | 'summary';

export interface ToastItem {
  id: number;
  message: string;
  color: string;
}

export interface AgentSummaryRow {
  agent: string;
  role: string;
  deals: number;
  totalGross: number;
  totalEarnings: number;
  paid: number;
  pending: number;
  avgSplit: number;
}

export interface BreakdownRow {
  label: string;
  value: string;
  bold: boolean;
  color?: string;
}

export interface KpiTotals {
  totalGross: number;
  totalPaid: number;
  totalPending: number;
  totalVAT: number;
}

export function computeKpiTotals(records: CommissionRecord[]): KpiTotals {
  return {
    totalGross: records.reduce((a, r) => a + r.grossCommissionAED, 0),
    totalPaid: records.filter(r => r.status === 'Paid').reduce((a, r) => a + r.agentEarningsAED, 0),
    totalPending: records
      .filter(r => r.status !== 'Paid')
      .reduce((a, r) => a + r.agentEarningsAED, 0),
    totalVAT: records.reduce((a, r) => a + r.vatAED, 0),
  };
}

export function computeAgentSummary(
  records: CommissionRecord[],
  agents: string[]
): AgentSummaryRow[] {
  return agents.map(agent => {
    const agentRecords = records.filter(r => r.agentName === agent);
    return {
      agent,
      role: agentRecords[0]?.agentRole || '',
      deals: agentRecords.length,
      totalGross: agentRecords.reduce((a, r) => a + r.grossCommissionAED, 0),
      totalEarnings: agentRecords.reduce((a, r) => a + r.agentEarningsAED, 0),
      paid: agentRecords
        .filter(r => r.status === 'Paid')
        .reduce((a, r) => a + r.agentEarningsAED, 0),
      pending: agentRecords
        .filter(r => r.status !== 'Paid')
        .reduce((a, r) => a + r.agentEarningsAED, 0),
      avgSplit: Math.round(
        agentRecords.reduce((a, r) => a + r.agentSplitPct, 0) / agentRecords.length
      ),
    };
  });
}
