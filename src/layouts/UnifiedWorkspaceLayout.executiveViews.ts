/**
 * UnifiedWorkspaceLayout.executiveViews.ts — MD Hub & Progress Views
 */

import type { WorkspaceViewItem } from './UnifiedWorkspaceLayout.types';

export const EXECUTIVE_WORKSPACE_VIEWS: WorkspaceViewItem[] = [
  // ─── MD HUB (Level 5 Sovereign) ──────────────────────────────────────────
  {
    id: 'VIEW-MD-01',
    code: 'MD-BRIEF',
    title: 'Executive Morning Briefing (08:00 AM)',
    category: 'md_hub',
    path: '/crm',
    minLevel: 5,
    badge: 'Daily',
    departmentFloor: 'Floor 13 — Executive Suite',
    assistantCode: '3.4 Zoe AI & 3.43 Ada',
    description: 'Real-time sovereign dashboard aggregating 12-department KPIs, cash balances, escrow releases, and active RERA license monitors.',
    kpis: [
      { label: 'Active Pipeline', value: 'AED 184.2M', trend: '+14.2%' },
      { label: 'Escrow Reserves', value: 'AED 42.8M', trend: '100% Locked' },
      { label: 'Compliance Score', value: '99.8%', trend: 'RERA Green' },
    ],
    subItems: [
      { id: 'sub-md-1', label: 'Daily Deal Intake & Approvals', code: 'MD-01.1' },
      { id: 'sub-md-2', label: 'Escrow Account Payout Requests', code: 'MD-01.2' },
      { id: 'sub-md-3', label: 'Government Expiry Alert Desk', code: 'MD-01.3' },
    ],
  },
  {
    id: 'VIEW-MD-02',
    code: 'MD-DH2',
    title: 'DAMAC Hills 2 Cluster Matrix (9,378 Units)',
    category: 'md_hub',
    path: '/crm',
    minLevel: 5,
    badge: '9,378',
    departmentFloor: 'Floor 04 — Asset Operations',
    assistantCode: '3.19 Henry AI',
    description: 'High-density spatial monitoring grid for all 32 residential clusters in DAMAC Hills 2 (Akoya Oxygen).',
    kpis: [
      { label: 'Cluster Units', value: '9,378', trend: 'Active' },
      { label: 'Occupancy Rate', value: '94.6%', trend: '+3.1%' },
      { label: 'Open Work Orders', value: '14', trend: 'SLA < 24h' },
    ],
    subItems: [
      { id: 'sub-dh2-1', label: 'Cluster Rental Index Analysis', code: 'DH2-01.1' },
      { id: 'sub-dh2-2', label: 'Ejari Renewal Automated Queue', code: 'DH2-01.2' },
      { id: 'sub-dh2-3', label: 'Facilities Maintenance Tracker', code: 'DH2-01.3' },
    ],
  },
  {
    id: 'VIEW-MD-03',
    code: 'MD-CRED',
    title: 'DET & RERA License Expiry Monitor',
    category: 'md_hub',
    path: '/profile',
    minLevel: 5,
    badge: 'Audit',
    departmentFloor: 'Floor 09 — Legal & Compliance',
    assistantCode: '3.15 Laila Compliance',
    description: 'Automated legal governance tracking Commercial License 1388443, Broker ORN 44483, and Ejari 0120250814005322.',
    kpis: [
      { label: 'DET Commercial Lic.', value: '1388443', trend: 'Valid' },
      { label: 'RERA Brokerage ORN', value: '44483', trend: 'Active' },
      { label: 'Office Ejari ID', value: 'D-72 El Shaye', trend: 'Verified' },
    ],
    subItems: [
      { id: 'sub-cred-1', label: 'DET Commercial Registry Audit', code: 'CRED-01.1' },
      { id: 'sub-cred-2', label: 'Broker ORN & Agent Cards', code: 'CRED-01.2' },
      { id: 'sub-cred-3', label: 'Ejari Lease Compliance Verification', code: 'CRED-01.3' },
    ],
  },
  {
    id: 'VIEW-MD-04',
    code: 'MD-COMM',
    title: 'Commission & Revenue Ledger (AED)',
    category: 'md_hub',
    path: '/crm',
    minLevel: 5,
    badge: 'Finance',
    departmentFloor: 'Floor 08 — Finance & CFO Treasury',
    assistantCode: '3.14 Theodora CFO',
    description: 'Real-time corporate revenue tracking, 5% UAE VAT FTA filings, director withdrawals, and agent commission disbursements.',
    kpis: [
      { label: 'YTD Gross Revenue', value: 'AED 12.84M', trend: '+28.4%' },
      { label: 'VAT 5% Payable', value: 'AED 642.0K', trend: 'Q3 Ready' },
      { label: 'Corporate Tax Reserve', value: '9.0%', trend: 'Compliant' },
    ],
    subItems: [
      { id: 'sub-comm-1', label: 'VAT 5% FTA Filing Sheet', code: 'COMM-01.1' },
      { id: 'sub-comm-2', label: 'Agent Split Payout Engine', code: 'COMM-01.2' },
      { id: 'sub-comm-3', label: '37+ Expense Sub-Items Ledger', code: 'COMM-01.3' },
    ],
  },

  // ─── PROJECT PROGRESS & TELEMETRY ──────────────────────────────────────────
  {
    id: 'VIEW-PROG-01',
    code: 'PROG-01',
    title: 'Executive Project Progress & Autopilot Telemetry',
    category: 'progress',
    path: '/crm',
    badge: '100% Green',
    departmentFloor: 'Floor 13 — Architecture Deck',
    assistantCode: '3.4 Zoe AI & 3.44 AEGIS',
    description: 'Interactive real-time execution dashboard tracking Waves 1–68, test suites, scanner issues (0), and Turn 89 achievements.',
    kpis: [
      { label: 'Wave Completion', value: '68 / 68', trend: '100%' },
      { label: 'Unit Tests Passing', value: '81 / 81', trend: '100% Green' },
      { label: 'Scanner Issues', value: '0', trend: 'Clean Gate' },
    ],
    subItems: [
      { id: 'sub-prog-1', label: 'Executive KPI Radar', code: 'PROG-01.1' },
      { id: 'sub-prog-2', label: '12-Department Floor Operating Matrix', code: 'PROG-01.2' },
      { id: 'sub-prog-3', label: 'Turn-by-Turn Autopilot Milestones', code: 'PROG-01.3' },
    ],
  },
];

