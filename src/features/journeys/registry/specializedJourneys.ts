/**
 * Specialized Real Estate Journeys
 * Journeys: Secondary Sales Deal, Mortgage Pre-Approval, Golden Visa,
 * Off-Plan Project Reservation, Snagging Inspection, VAT Quarterly Filing,
 * Tenant Move-Out Settlement, AML & PEP Sanctions Screening,
 * Lead Acquisition & AI Qualification, Community Facilities Maintenance.
 */

import { JourneyDefinition } from '../../../types/journey';

export const SPECIALIZED_JOURNEYS: Record<string, JourneyDefinition> = {
  // 11. Secondary Sales Deal
  'secondary-sales-deal': {
    id: 'secondary-sales-deal',
    title: 'Secondary Sales Deal & Form F',
    category: 'sales',
    family: 'Sales Journeys',
    icon: '🤝',
    description:
      'Structure secondary resale transaction: Form A (Seller) + Form B (Buyer) matching, Unified Form F generation, escrow security deposit, and DLD Trustee registration.',
    estimatedMinutes: 5,
    steps: [
      { id: 'parties', title: 'Buyer & Seller Verification', type: 'entity-selection' },
      { id: 'property', title: 'Title Deed & NOC Validation', type: 'entity-review' },
      { id: 'financials', title: 'Sale Price & Escrow Terms', type: 'form' },
      { id: 'form-f', title: 'Form F Clause Assembler', type: 'smart-review' },
      { id: 'trustee', title: 'DLD Trustee Submission', type: 'processing' },
      { id: 'result', title: 'Sale Closed & Registered', type: 'result' },
    ],
  },

  // 12. Mortgage Pre-Approval
  'mortgage-preapproval': {
    id: 'mortgage-preapproval',
    title: 'Mortgage Pre-Approval & Affordability',
    category: 'finance',
    family: 'Finance Journeys',
    icon: '💰',
    description:
      'Assess buyer financing eligibility against UAE Central Bank Debt-Burden Ratio (DBR) 50% limit, compare ADCB/ENBD lender rates, and issue pre-approval dossier.',
    estimatedMinutes: 4,
    steps: [
      { id: 'buyer-profile', title: 'Income & DBR Evaluation', type: 'form' },
      { id: 'bank-compare', title: 'Lender Product Comparison', type: 'checklist' },
      { id: 'docs-upload', title: 'Salary & Bank Statements', type: 'checklist' },
      { id: 'review', title: 'Affordability Certificate', type: 'smart-review' },
      { id: 'result', title: 'Pre-Approval Issued', type: 'result' },
    ],
  },

  // 13. Golden Visa Application
  'golden-visa-application': {
    id: 'golden-visa-application',
    title: 'UAE 10-Year Golden Visa Verification',
    category: 'wealth',
    family: 'VIP Wealth Journeys',
    icon: '👑',
    description:
      'Verify AED 2,000,000+ unencumbered real estate equity, cross-reference DLD title deeds, and assemble official dossier for GDRFA / ICP nomination.',
    estimatedMinutes: 5,
    steps: [
      { id: 'investor-kyc', title: 'Investor Passport & KYC', type: 'entity-review' },
      { id: 'equity-check', title: 'AED 2M Equity Valuation', type: 'form' },
      { id: 'title-deed', title: 'DLD Title Deed Validation', type: 'checklist' },
      { id: 'dossier', title: 'Assemble GDRFA Nomination Pack', type: 'smart-review' },
      { id: 'result', title: 'Golden Visa Ready', type: 'result' },
    ],
  },

  // 14. Off-Plan Project Reservation
  'offplan-reservation': {
    id: 'offplan-reservation',
    title: 'Off-Plan Project Allocation & Oqood',
    category: 'projects',
    family: 'Project Journeys',
    icon: '🏗️',
    description:
      'Reserve off-plan inventory directly from master developers (Emaar/DAMAC/Nakheel), configure installment milestone plans, and register initial Oqood title.',
    estimatedMinutes: 4,
    steps: [
      { id: 'project-unit', title: 'Select Developer & Unit', type: 'entity-selection' },
      { id: 'payment-plan', title: 'Installment Milestone Plan', type: 'form' },
      { id: 'eoi-deposit', title: 'EOI Token Deposit Receipt', type: 'form' },
      { id: 'spa-review', title: 'Developer SPA & Oqood Terms', type: 'smart-review' },
      { id: 'result', title: 'Unit Reserved & Oqood Active', type: 'result' },
    ],
  },

  // 15. Property Snagging Inspection
  'property-snagging-inspection': {
    id: 'property-snagging-inspection',
    title: 'Digital Snagging Defect Inspection',
    category: 'property-management',
    family: 'Property Management Journeys',
    icon: '🔍',
    description:
      'Perform systematic room-by-room physical snagging audit, classify architectural/MEP defects with photo OCR, and dispatch formal Defect Liability Period (DLP) claim.',
    estimatedMinutes: 6,
    steps: [
      { id: 'unit-schedule', title: 'Inspection Appointment', type: 'entity-selection' },
      { id: 'defect-logging', title: 'Architectural & MEP Punch-List', type: 'form' },
      { id: 'photo-evidence', title: 'Upload Defect Photos', type: 'checklist' },
      { id: 'dlp-report', title: 'Compile Contractor DLP Claim', type: 'smart-review' },
      { id: 'result', title: 'Snagging Report Dispatched', type: 'result' },
    ],
  },

  // 16. VAT Quarterly Filing
  'vat-quarterly-filing': {
    id: 'vat-quarterly-filing',
    title: 'UAE FTA Form 201 VAT Return Filing',
    category: 'finance',
    family: 'Finance Journeys',
    icon: '💳',
    description:
      'Audit 5% standard rated real estate supplies, exempt transactions, calculate input tax credits across 42 expense categories, and generate EmaraTax XML.',
    estimatedMinutes: 4,
    steps: [
      { id: 'tax-period', title: 'Select Tax Period & TRN', type: 'form' },
      { id: 'output-tax', title: 'Box 1: Standard Rated Supplies', type: 'form' },
      { id: 'input-tax', title: 'Box 9: Recoverable Input Tax', type: 'form' },
      { id: 'fta-return', title: 'Review Box 12 Net VAT Due', type: 'smart-review' },
      { id: 'result', title: 'FTA Form 201 Ready to File', type: 'result' },
    ],
  },

  // 17. Tenant Move-Out Settlement
  'tenant-moveout-settlement': {
    id: 'tenant-moveout-settlement',
    title: 'Tenant Move-Out & Deposit Settlement',
    category: 'leasing',
    family: 'Leasing Journeys',
    icon: '🚪',
    description:
      'Audit final condition against check-in report, calculate legitimate maintenance deductions, clear final DEWA/Empower bills, and refund security deposit.',
    estimatedMinutes: 4,
    steps: [
      { id: 'tenancy-select', title: 'Select Expiring Tenancy', type: 'entity-selection' },
      { id: 'moveout-audit', title: 'Exit Snagging & Meter Readings', type: 'checklist' },
      { id: 'deductions', title: 'Maintenance & Utility Deductions', type: 'form' },
      { id: 'settlement', title: 'Generate Deposit Refund Statement', type: 'smart-review' },
      { id: 'result', title: 'Deposit Settled & Ejari Closed', type: 'result' },
    ],
  },

  // 18. AML & PEP Sanctions Screening
  'aml-pep-sanctions-screening': {
    id: 'aml-pep-sanctions-screening',
    title: 'goAML PEP & Sanctions Compliance Audit',
    category: 'compliance',
    family: 'Compliance Journeys',
    icon: '🛡️',
    description:
      'Execute mandatory UAE Financial Intelligence Unit (FIU) screening against UN, UAE Local Terrorist, and global PEP lists with statutory Risk Scorecard.',
    estimatedMinutes: 3,
    steps: [
      { id: 'party-identity', title: 'Client & Beneficial Owner Data', type: 'entity-selection' },
      { id: 'sanctions-scan', title: 'Automated Database Scan', type: 'processing' },
      { id: 'cdd-audit', title: 'Enhanced Due Diligence (EDD)', type: 'checklist' },
      { id: 'risk-score', title: 'Statutory AML Risk Rating', type: 'smart-review' },
      { id: 'result', title: 'AML Clearance Certificate', type: 'result' },
    ],
  },

  // 19. Lead Acquisition & AI Qualification
  'lead-acquisition-qualification': {
    id: 'lead-acquisition-qualification',
    title: 'Lead Ingestion & 100-Point AI Scoring',
    category: 'marketing',
    family: 'Marketing Journeys',
    icon: '🎯',
    description:
      'Capture inbound leads across WhatsApp, Bayut, and Property Finder, run deduplication & enrichment, and execute 100-point conversion velocity scoring.',
    estimatedMinutes: 3,
    steps: [
      { id: 'lead-capture', title: 'Lead Ingestion & Contact Details', type: 'form' },
      { id: 'enrichment', title: 'Budget & Community Preferences', type: 'form' },
      { id: 'ai-scoring', title: '100-Point Conversion Model', type: 'processing' },
      { id: 'assignment', title: 'Assign to Sales Podium Agent', type: 'smart-review' },
      { id: 'result', title: 'Lead Qualified & Dispatched', type: 'result' },
    ],
  },

  // 20. Community Facilities Maintenance Ticket
  'community-service-ticket': {
    id: 'community-service-ticket',
    title: 'Community Facilities & Maintenance Ticket',
    category: 'community',
    family: 'Community Journeys',
    icon: '🔧',
    description:
      'Log resident service request, categorize urgency level, automatically dispatch approved vendor contractor with 2-hour SLA, and capture completion sign-off.',
    estimatedMinutes: 3,
    steps: [
      { id: 'ticket-details', title: 'Resident & Issue Description', type: 'form' },
      { id: 'sla-triage', title: 'Triage Priority & Category', type: 'form' },
      { id: 'vendor-dispatch', title: 'Assign Certified Contractor', type: 'entity-selection' },
      { id: 'completion-signoff', title: 'Review Work & Cost Approval', type: 'smart-review' },
      { id: 'result', title: 'Ticket Resolved & Closed', type: 'result' },
    ],
  },
};
