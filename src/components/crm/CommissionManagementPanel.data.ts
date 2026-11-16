export const RED = '#EF4444';
export const WHITE = '#FFFFFF';
export const SLATE = '#1E293B';
export const BORDER = 'rgba(239, 68, 68, 0.2)';
export const CARD_BG = '#F8FAFC';
export const TEXT_MUTED = '#64748B';
export const GREEN = '#10B981';
export const ORANGE = '#F59E0B';
export const BLUE = '#3B82F6';
export const PURPLE = '#8B5CF6';

export interface CommissionRecord {
  id: string;
  dealReference: string;
  agentName: string;
  agentRole: string;
  propertyTitle: string;
  transactionType: 'Sale' | 'Lease' | 'Off-Plan';
  transactionValueAED: number;
  commissionRatePct: number;
  grossCommissionAED: number;
  agentSplitPct: number;
  agentEarningsAED: number;
  companyRetentionAED: number;
  vatAED: number;
  totalPayableAED: number;
  status: 'Pending' | 'Approved' | 'Paid' | 'Disputed';
  closedDate: string;
  paymentDate: string | null;
}

export function buildRecord(
  id: string,
  dealRef: string,
  agent: string,
  role: string,
  propTitle: string,
  txType: CommissionRecord['transactionType'],
  txValue: number,
  commissionRate: number,
  agentSplit: number,
  status: CommissionRecord['status'],
  closedDate: string,
  paymentDate: string | null
): CommissionRecord {
  const grossCommission = Math.round(txValue * (commissionRate / 100));
  const agentEarnings = Math.round(grossCommission * (agentSplit / 100));
  const companyRetention = grossCommission - agentEarnings;
  const vat = Math.round(grossCommission * 0.05);
  return {
    id,
    dealReference: dealRef,
    agentName: agent,
    agentRole: role,
    propertyTitle: propTitle,
    transactionType: txType,
    transactionValueAED: txValue,
    commissionRatePct: commissionRate,
    grossCommissionAED: grossCommission,
    agentSplitPct: agentSplit,
    agentEarningsAED: agentEarnings,
    companyRetentionAED: companyRetention,
    vatAED: vat,
    totalPayableAED: agentEarnings + vat,
    status,
    closedDate,
    paymentDate,
  };
}

export const COMMISSION_LEDGER: CommissionRecord[] = [
  buildRecord(
    'COM-001',
    'DEAL-2026-Q2-001',
    'Nadia Yusuf',
    'Senior Broker',
    'Luxury Property 14 — Palm Jumeirah',
    'Sale',
    5200000,
    2,
    70,
    'Paid',
    '2026-05-15',
    '2026-06-01'
  ),
  buildRecord(
    'COM-002',
    'DEAL-2026-Q2-002',
    'Sophia Lin',
    'Senior Broker',
    'Luxury Property 33 — Dubai Marina',
    'Lease',
    220000,
    5,
    65,
    'Paid',
    '2026-06-01',
    '2026-06-15'
  ),
  buildRecord(
    'COM-003',
    'DEAL-2026-Q2-003',
    'Clara Osei',
    'Associate Broker',
    'Luxury Property 7 — DAMAC Hills 2',
    'Sale',
    3800000,
    2,
    60,
    'Paid',
    '2026-06-10',
    '2026-07-01'
  ),
  buildRecord(
    'COM-004',
    'DEAL-2026-Q2-004',
    'Nadia Yusuf',
    'Senior Broker',
    'Luxury Property 55 — Business Bay',
    'Off-Plan',
    2100000,
    4,
    70,
    'Approved',
    '2026-07-01',
    null
  ),
  buildRecord(
    'COM-005',
    'DEAL-2026-Q2-005',
    'Mark Johnson',
    'Associate Broker',
    'Luxury Property 22 — Downtown Dubai',
    'Lease',
    185000,
    5,
    60,
    'Pending',
    '2026-07-12',
    null
  ),
  buildRecord(
    'COM-006',
    'DEAL-2026-Q2-006',
    'Sophia Lin',
    'Senior Broker',
    'Luxury Property 78 — Palm Jumeirah',
    'Sale',
    9100000,
    2,
    65,
    'Disputed',
    '2026-07-15',
    null
  ),
  buildRecord(
    'COM-007',
    'DEAL-2026-Q2-007',
    'Clara Osei',
    'Associate Broker',
    'Luxury Property 41 — DAMAC Hills 2',
    'Off-Plan',
    1750000,
    3.5,
    60,
    'Pending',
    '2026-07-20',
    null
  ),
  buildRecord(
    'COM-008',
    'DEAL-2026-Q2-008',
    'Laila Hassan',
    'Junior Broker',
    'Luxury Property 19 — Business Bay',
    'Lease',
    150000,
    5,
    50,
    'Approved',
    '2026-07-22',
    null
  ),
  buildRecord(
    'COM-009',
    'DEAL-2026-Q2-009',
    'Nadia Yusuf',
    'Senior Broker',
    'Luxury Property 62 — Downtown Dubai',
    'Sale',
    4500000,
    2,
    70,
    'Pending',
    '2026-07-25',
    null
  ),
  buildRecord(
    'COM-010',
    'DEAL-2026-Q2-010',
    'Mark Johnson',
    'Associate Broker',
    'Luxury Property 5 — Dubai Marina',
    'Lease',
    195000,
    5,
    60,
    'Pending',
    '2026-07-27',
    null
  ),
];

export const statusConfig = {
  Pending: { bg: '#FFFBEB', color: ORANGE, icon: '⏳' },
  Approved: { bg: '#EFF6FF', color: BLUE, icon: '✔️' },
  Paid: { bg: '#DEF7EC', color: GREEN, icon: '💰' },
  Disputed: { bg: '#FEF2F2', color: RED, icon: '⚠️' },
};

export const txTypeColor: Record<string, string> = {
  Sale: BLUE,
  Lease: GREEN,
  'Off-Plan': PURPLE,
};

