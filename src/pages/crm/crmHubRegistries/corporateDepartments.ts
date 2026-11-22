/**
 * MD Suite and Official 12 Corporate Departments Registry.
 */

import type { BuildingTier } from '../CRMHubPage.config';

// ─── MD Suite (Tile 1) Data Object ───
export const MD_SUITE_DEPT: BuildingTier = {
  id: 'dept-md',
  scope: [],
  num: 'MD Suite',
  name: 'Office of the Managing Director (MD Suite)',
  locationTag: 'Floor 13: MD Sovereign Suite',
  accessLevel: 'Level 7 (Ultimate Sovereign Access)',
  badgeColor: '#EF4444',
  icon: '👑',
  summary:
    'Reserved exclusively for Arslan Malik. Controls global corporate strategy, high-stakes joint ventures, investment allocations, and unilateral override permissions across all lower operational tiers.',
  items: [
    { id: 'overview', label: '1.1 Executive Overview & Live Audit', icon: '👑' },
    { id: 'command_center', label: '1.1B Executive Command Center (Live BI)', icon: '📊' },
    { id: 'ai-command', label: '1.2 1-12-108 AI Command Center', icon: '🤖' },
    { id: 'off-plan-tracker', label: '1.3 DH2 & Off-Plan Escrow Matrix', icon: '🏰' },
    { id: 'theodora', label: '1.4 Treasury & VAT Accounting', icon: '💰' },
    { id: 'compliance', label: '1.5 goAML & Statutory Shield', icon: '⚖️' },
    { id: 'journeys', label: '1.6 20 Life Cycle Journeys Hub', icon: '🗺️' },
  ],
};

// ─── Official 12 Corporate Departments Registry ───
export const TWELVE_CORPORATE_DEPARTMENTS: BuildingTier[] = [
  {
    id: 'dept-12',
    num: 'Dept 12',
    name: 'Executive & Operations Control Department',
    locationTag: 'Floor 12: Executive Control',
    accessLevel: 'Level 6 (Strategic Command Access)',
    badgeColor: '#EF4444',
    icon: '🏛️',
    summary:
      'The elite administrative layer connecting directly to the Level 7 MD Suite to translate executive vision into corporate directives and inter-departmental workflow alignment.',
    scope: [
      'Cross-Departmental Performance Management',
      'Corporate Governance & Policy Creation',
      'Inter-Department Workflow Optimization',
      'Executive Board Room Operations',
    ],
    items: [
      { id: 'zoe', label: '12.1 Cross-Department Performance', icon: '⚡' },
      { id: 'governance', label: '12.2 Corporate Governance & Policy', icon: '📜' },
    ],
  },
  {
    id: 'dept-11',
    num: 'Dept 11',
    name: 'Market Intelligence & Data Analytics Department',
    locationTag: 'Floor 11: Analytics Tower',
    accessLevel: 'Level 6 (Strategic Command Access)',
    badgeColor: '#8B5CF6',
    icon: '📈',
    summary:
      'Feeds high-level analytical forecasting directly to Floor 12 and 13 to guide macro investment timing, off-plan capital appreciation modeling, and predictive asset pricing.',
    scope: [
      'Off-Plan Project ROI & Capital Appreciation',
      'Predictive Market Analytics & Pricing Trends',
      'Macroeconomic Asset Forecasting',
    ],
    items: [
      { id: 'atlas', label: '11.1 Off-Plan Project ROI & Appreciation', icon: '🏛️' },
      { id: 'lead-scoring', label: '11.2 Predictive Analytics & Pricing Trends', icon: '📊' },
    ],
  },
  {
    id: 'dept-10',
    num: 'Dept 10',
    name: 'Global Investor Relations Department',
    locationTag: 'Floor 10: Investor Relations',
    accessLevel: 'Level 5 (Vetted Oversight Access)',
    badgeColor: '#3B82F6',
    icon: '🌐',
    summary:
      'Manages international cross-border movements, institutional accounts, overseas wealth portfolios, and remote buyer verification channels.',
    scope: [
      'Overseas Wealth Advisory & Cross-Border Transactions',
      'Remote Buyer Portal Management & Verification',
      'Institutional & Bulk-Unit Investment Portfolios',
    ],
    items: [
      { id: 'investor-advisory', label: '10.1 Overseas Wealth & Cross-Border', icon: '🌍' },
      { id: 'remote-buyer', label: '10.2 Remote Buyer Portal', icon: '💻' },
    ],
  },
  {
    id: 'dept-09',
    num: 'Dept 09',
    name: 'Legal, Title & Regulatory Compliance Department',
    locationTag: 'Floor 09: Legal & Regulatory Chambers',
    accessLevel: 'Level 5 (Vetted Oversight Access)',
    badgeColor: '#10B981',
    icon: '⚖️',
    summary:
      'Ensures strict alignment with Dubai Land Department (DLD), Real Estate Regulatory Agency (RERA), Form A/B/F brokerage laws, and UAE Anti-Money Laundering (AML) directives.',
    scope: [
      'DLD Integration & Ejari Direct Compliance',
      'RERA Brokerage Licensing & Unified Contracts',
      'AML/CFT Audits & Customer Due Diligence (CDD)',
    ],
    items: [
      { id: 'laila', label: '9.1 RERA Brokerage Licensing & AML', icon: '🛡️' },
      { id: 'dld-ejari', label: '9.2 DLD Integration & Unified Contracts', icon: '📜' },
      { id: 'evangeline', label: '9.3 Evangeline Legal Review Desk', icon: '⚖️' },
    ],
  },
  {
    id: 'dept-08',
    num: 'Dept 08',
    name: 'Finance, Escrow & VAT Accounting Department',
    locationTag: 'Floor 08: Finance & Treasury Vault',
    accessLevel: 'Level 5 (Vetted Oversight Access)',
    badgeColor: '#F59E0B',
    icon: '💳',
    summary:
      'Oversees off-plan project escrow disbursements, trust account management, UAE Federal Tax Authority (FTA) 5% VAT filings, and agent commission settlement waterfalls.',
    scope: [
      'Escrow Account Monitoring (Law No. 8)',
      'FTA 5% VAT Tax Invoicing & Compliance',
      'Agent Commission Waterfalls & Approvals',
    ],
    items: [
      { id: 'theodora', label: '8.1 Treasury, Escrow & VAT 5% Desk', icon: '💳' },
      { id: 'agent-commission', label: '8.2 Agent Commission & Payout Desk', icon: '💰' },
    ],
  },
  {
    id: 'dept-07',
    num: 'Dept 07',
    name: 'Property Portfolio, Listings & Asset Management Department',
    locationTag: 'Floor 07: Property Asset Tower',
    accessLevel: 'Level 4 (Operational Access)',
    badgeColor: '#06B6D4',
    icon: '🏡',
    summary:
      'Curates and oversees the entire master inventory across Dubai, managing off-plan developer allocations, secondary resales, and luxury leasing portfolios.',
    scope: [
      'Exclusive Resale & Secondary Listings',
      'Off-Plan Developer Allocations & Launch Desk',
      'Property Management & Asset Maintenance Portfolios',
    ],
    subGroups: [
      {
        name: '🏡 Inventory Control Center',
        items: [
          { id: 'mary', label: '7.1 Mary Master Inventory & Area Matrix', icon: '🏠' },
          { id: 'sentinel', label: '7.2 Sentinel Property Quality & Verification', icon: '🏢' },
        ],
      },
      {
        name: '🗂️ Records & Document Studio',
        items: [
          { id: 'henry', label: '7.3 Henry Document Studio (DLD & Ejari Hub)', icon: '🗂️' },
          { id: 'henry-audit', label: '7.4 Henry Audit Logs & Governance Vault', icon: '📋' },
        ],
      },
    ],
  },
  {
    id: 'dept-06',
    num: 'Dept 06',
    name: 'Sales, Acquisitions & Secondary Brokerage Department',
    locationTag: 'Floor 06: Secondary Trading Floor',
    accessLevel: 'Level 4 (Operational Access)',
    badgeColor: '#EC4899',
    icon: '💼',
    summary:
      'The high-velocity revenue engine handling secondary buyer-seller transactions, price negotiations, Form F sales agreements, and transfer handovers.',
    scope: [
      'Buyer Lead Qualification & Acquisition',
      'High-Stakes Price Negotiation & Offer Matching',
      'Unified Form F Drafting & Escrow Closing',
    ],
    items: [
      { id: 'clara', label: '6.1 Clara Leads Qualification Desk', icon: '🎯' },
      { id: 'sophia', label: '6.2 Sophia Sales CRM & Deals Pipeline', icon: '📈' },
    ],
  },
  {
    id: 'dept-05',
    num: 'Dept 05',
    name: 'Leasing, Tenant Relations & Property Management Department',
    locationTag: 'Floor 05: Leasing Operations Hub',
    accessLevel: 'Level 4 (Operational Access)',
    badgeColor: '#6366F1',
    icon: '📋',
    summary:
      'Manages the end-to-end residential and commercial tenancy lifecycle across Dubai, handling Ejari registration, PDC post-dated cheque vaults, and renewals.',
    scope: [
      'Ejari Registration & Tenancy Agreements',
      'PDC Post-Dated Cheque Vault & Collection',
      'Move-in / Move-out Snagging & Security Deposits',
    ],
    items: [
      { id: 'daisy', label: '5.1 Daisy Tenancy Contracts & PDC Hub', icon: '📋' },
      { id: 'vesta', label: '5.2 Vesta Snagging & Key Handover Desk', icon: '🔑' },
    ],
  },
  {
    id: 'dept-04',
    num: 'Dept 04',
    name: 'Omnichannel Communications & Growth Marketing Department',
    locationTag: 'Floor 04: Media & Campaign Suite',
    accessLevel: 'Level 3 (Marketing Access)',
    badgeColor: '#14B8A6',
    icon: '💬',
    summary:
      'Drives high-converting multi-channel client engagement across WhatsApp Meta Business API, luxury social campaigns, and property portal syndications.',
    scope: [
      'WhatsApp Official Cloud API Messaging',
      'Property Finder / Bayut Portal Syndication',
      'High-Net-Worth Lead Generation Campaigns',
    ],
    items: [
      { id: 'nadia', label: '4.1 Nadia WhatsApp Marketing Desk', icon: '💬' },
      { id: 'nina', label: '4.2 Nina WhatsApp Bot & Automation Core', icon: '🤖' },
      { id: 'olivia', label: '4.3 Olivia Growth Marketing & Portals Hub', icon: '📣' },
      { id: 'linda', label: '4.4 Linda Agent WhatsApp Session Desk', icon: '📱' },
    ],
  },
  {
    id: 'dept-03',
    num: 'Dept 03',
    name: 'Client Experience, Concierge & Property Handover Department',
    locationTag: 'Floor 03: VIP Concierge Lounge',
    accessLevel: 'Level 3 (Client Services Access)',
    badgeColor: '#F97316',
    icon: '🔑',
    summary:
      'Delivers white-glove onboarding for property investors and tenants, coordinating DEWA utility connections, title deed handovers, and community concierge.',
    scope: [
      'VIP Investor Concierge & Chauffeur Services',
      'DEWA / Empower Utility Connection Support',
      'Key Handover Ceremonies & Snagging Audits',
    ],
    items: [
      { id: 'vesta', label: '3.1 Vesta Snagging & Inspection Hub', icon: '🔑' },
      { id: 'juno', label: '3.2 Juno Community & Resident Portal', icon: '🏘️' },
    ],
  },
  {
    id: 'dept-02',
    num: 'Dept 02',
    name: 'Human Capital, Broker Academy & Talent Department',
    locationTag: 'Floor 02: Academy & Talent Hall',
    accessLevel: 'Level 2 (HR & Admin Access)',
    badgeColor: '#84CC16',
    icon: '👥',
    summary:
      'Maintains elite broker performance standards, administering RERA training certifications, broker commission tiering, and agent recruitment.',
    scope: [
      'RERA Broker Exam & Licensing Onboarding',
      'Agent Sales Quota & Commission Tracking',
      'Broker Talent Acquisition & Culture',
    ],
    items: [{ id: 'nancy', label: '2.1 Nancy HR & Broker Talent Matrix', icon: '👥' }],
  },
  {
    id: 'dept-01',
    num: 'Dept 01',
    name: 'Technology, Enterprise Cloud & Security Department',
    locationTag: 'Floor 01: Core Systems & Server Vault',
    accessLevel: 'Level 6 (Systems Admin Access)',
    badgeColor: '#64748B',
    icon: '🖥️',
    summary:
      'Maintains 99.99% uptime for the White Caves ERP core, managing end-to-end encryption, microservices, cloud servers, and data privacy.',
    scope: [
      'Core ERP Architecture & Database Scaling',
      'AI Assistant Model Orchestration & LLM RAG',
      'Role-Based Access Control & Security Auditing',
    ],
    items: [
      { id: 'aurora', label: '1.1 Aurora CTO Systems & Infrastructure', icon: '🖥️' },
      { id: 'hazel', label: '1.2 Hazel Frontend & UX Quality Metrics', icon: '🧩' },
      { id: 'willow', label: '1.3 Willow Backend Microservices Desk', icon: '⚙️' },
    ],
  },
];
