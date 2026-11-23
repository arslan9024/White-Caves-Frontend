/**
 * Core AI Assistants: Olivia, Nancy, Daisy, Theodora, Laila (3.11 - 3.15).
 */

import type { AIAssistantOption } from '../CRMHubPage.config';

export const CORE_AI_ASSISTANTS_PART3: AIAssistantOption[] = [
  {
    id: 'olivia',
    num: '3.11',
    name: 'Olivia AI',
    role: 'Growth Marketing & Portals Syndication',
    icon: '📣',
    items: [
      {
        id: 'olivia-syndication-hub',
        label: '3.11.1 Multi-Portal Syndication Hub',
        icon: '📣',
        badge: 'Bayut / PF',
      },
      {
        id: 'olivia-cpl-reallocator',
        label: '3.11.2 CPL Ad Budget Reallocator',
        icon: '💸',
        badge: 'Meta / Google',
      },
      {
        id: 'olivia-seo-copy-studio',
        label: '3.11.3 AI SEO Listing Copy Studio',
        icon: '✍️',
        badge: 'Luxury Copy',
      },
      {
        id: 'olivia-attribution-analytics',
        label: '3.11.4 Attribution ROI Analytics',
        icon: '📊',
        badge: 'Channel ROAS',
      },
    ],
  },
  {
    id: 'nancy',
    num: '3.12',
    name: 'Nancy AI',
    role: 'HR & Agent Talent Leaderboards',
    icon: '👥',
    items: [
      {
        id: 'nancy-sales-podium',
        label: '3.12.1 Real-Time Broker Sales Podium',
        icon: '🏆',
        badge: 'Leaderboard',
      },
      {
        id: 'nancy-rera-card-guard',
        label: '3.12.2 RERA Broker Card Expiry Guard',
        icon: '🪪',
        badge: 'Compliance',
      },
      {
        id: 'nancy-recruitment-deck',
        label: '3.12.3 Agent Talent Recruitment Deck',
        icon: '👥',
        badge: 'Hiring Pipeline',
      },
      {
        id: 'nancy-kpi-gauges',
        label: '3.12.4 Target KPI vs Actual Gauge',
        icon: '🎯',
        badge: 'Target Bounds',
      },
    ],
  },
  {
    id: 'daisy',
    num: '3.13',
    name: 'Daisy AI',
    role: 'Leasing Contracts & PDC Renewals',
    icon: '📋',
    items: [
      {
        id: 'daisy-lease-renewals',
        label: '3.13.1 90/60/30-Day Lease Renewals',
        icon: '📋',
        badge: 'Ejari Renewal',
      },
      {
        id: 'daisy-pdc-vault',
        label: '3.13.2 PDC Cheque Vault & Micr Scanner',
        icon: '🏦',
        badge: 'PDC Tracking',
      },
      {
        id: 'daisy-ejari-expiry',
        label: '3.13.3 Ejari Expiry & Handover Tracker',
        icon: '📅',
        badge: '365 Days',
      },
      {
        id: 'daisy-moveout-settlement',
        label: '3.13.4 Tenant Move-Out Settlement',
        icon: '🔑',
        badge: 'Deposit Settle',
      },
    ],
  },
  {
    id: 'theodora',
    num: '3.14',
    name: 'Theodora AI',
    role: 'Finance & VAT 5% Escrow Accounting',
    icon: '💳',
    items: [
      {
        id: 'theodora-invoices',
        label: '3.14.1 Tax Invoices & Pro Forma',
        icon: '📄',
        badge: 'Receivable',
      },
      {
        id: 'theodora-payments',
        label: '3.14.2 Payments & Escrow Releases',
        icon: '💳',
        badge: 'Income',
      },
      {
        id: 'theodora-commissions',
        label: '3.14.3 Commission Statements',
        icon: '💵',
        badge: 'Brokers',
      },
      {
        id: 'theodora-receivables',
        label: '3.14.4 Accounts Receivable & Aging',
        icon: '⏳',
        badge: 'AR Aging',
      },
      {
        id: 'theodora-expenses',
        label: '3.14.5 42 Master Expense Register',
        icon: '💰',
        badge: 'Payables',
      },
      {
        id: 'theodora-directors-loan',
        label: '3.14.6 Wio vs. Director Loan Advances',
        icon: '🏦',
        badge: "Owner's Equity",
      },
      {
        id: 'theodora-receipts',
        label: '3.14.7 Digital Receipts & OCR Vault',
        icon: '🧾',
        badge: 'Audit Safe',
      },
      {
        id: 'theodora-vat-return',
        label: '3.14.8 UAE FTA Form 201 (5% VAT)',
        icon: '🏛️',
        badge: 'FTA 201',
      },
      {
        id: 'theodora-corporate-tax',
        label: '3.14.9 UAE Corporate Tax (9%)',
        icon: '⚖️',
        badge: 'CT Relief',
      },
      {
        id: 'theodora-pnl',
        label: '3.14.10 Profit & Loss Statement (P&L)',
        icon: '📊',
        badge: 'P&L',
      },
      {
        id: 'theodora-balance-sheet',
        label: '3.14.11 Balance Sheet & Ledger',
        icon: '📑',
        badge: 'GL',
      },
      {
        id: 'theodora-cashflow',
        label: '3.14.12 Cash Flow & Bank Recon',
        icon: '🌊',
        badge: 'Wio Bank',
      },
      {
        id: 'theodora-audit-report',
        label: '3.14.13 Regulatory Audit Pack',
        icon: '🛡️',
        badge: 'Audit Report',
      },
      {
        id: 'theodora-reports-all',
        label: '3.14.14 All Reports Hub (67 Reports)',
        icon: '📑',
        badge: 'Zoho Standard',
      },
    ],
  },
  {
    id: 'laila',
    num: '3.15',
    name: 'Laila AI',
    role: 'RERA Compliance & AML Audit',
    icon: '🛡️',
    items: [
      {
        id: 'laila-pep-screening',
        label: '3.15.1 PEP & Sanctions Screening Filter',
        icon: '🛡️',
        badge: 'Watchlist',
      },
      {
        id: 'laila-trakheesi-verifier',
        label: '3.15.2 Trakheesi Permit QR Verifier',
        icon: '📜',
        badge: 'RERA Legal',
      },
      {
        id: 'laila-aml-risk-scorecard',
        label: '3.15.3 Statutory AML Risk Scorecard',
        icon: '⚖️',
        badge: 'goAML Ready',
      },
      {
        id: 'laila-broker-audit-file',
        label: '3.15.4 Broker Regulatory Audit File',
        icon: '📁',
        badge: 'Official Report',
      },
    ],
  },
];
