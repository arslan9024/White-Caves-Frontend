export type DeptLevel = 'DEPARTMENT' | 'SUB_DEPARTMENT';
export type EmpType = 'EXECUTIVE' | 'FULL_TIME' | 'INTERN' | 'AI_AGENT';
export type PRole = 'DIRECTOR' | 'MANAGER' | 'SUPERVISOR' | 'EMPLOYEE' | 'INTERN';
export type PStatus = 'ACTIVE' | 'STANDBY' | 'ON_LEAVE' | 'TERMINATED';

export interface SeedDept {
  code: string;
  slug: string;
  title: string;
  order: number;
  color: string;
  subDepts: Array<{ code: string; slug: string; title: string; order: number }>;
}

// prettier-ignore
export const CORE_DEPARTMENTS: SeedDept[] = [
  {
    code: 'DEP-01', slug: 'executive-office', title: 'Executive Office & Corporate Governance',
    order: 1, color: '#1E293B',
    subDepts: [
      { code: 'SUB-01-01', slug: 'strategy-planning', title: 'Strategy & Planning Desk', order: 1 },
      { code: 'SUB-01-02', slug: 'board-affairs', title: 'Board Affairs & Secretariat', order: 2 },
    ],
  },
  {
    code: 'DEP-02', slug: 'luxury-sales', title: 'Luxury Sales & Brokerage',
    order: 2, color: '#8B5CF6',
    subDepts: [
      { code: 'SUB-02-01', slug: 'off-plan-luxury', title: 'Off-Plan Luxury Desk', order: 1 },
      { code: 'SUB-02-02', slug: 'secondary-resales', title: 'Secondary Resales Desk', order: 2 },
      { code: 'SUB-02-03', slug: 'international-desk', title: 'International Client Desk', order: 3 },
    ],
  },
  {
    code: 'DEP-03', slug: 'commercial-investment', title: 'Commercial Real Estate & Investment',
    order: 3, color: '#0891B2',
    subDepts: [
      { code: 'SUB-03-01', slug: 'commercial-leasing', title: 'Commercial Leasing Desk', order: 1 },
      { code: 'SUB-03-02', slug: 'capital-markets', title: 'Capital Markets & Acquisitions', order: 2 },
    ],
  },
  {
    code: 'DEP-04', slug: 'portfolio-leasing', title: 'Portfolio Management & Residential Leasing',
    order: 4, color: '#059669',
    subDepts: [
      { code: 'SUB-04-01', slug: 'ejari-operations', title: 'Ejari & DLD Operations Desk', order: 1 },
      { code: 'SUB-04-02', slug: 'residential-portfolio', title: 'Residential Portfolio Desk', order: 2 },
    ],
  },
  {
    code: 'DEP-05', slug: 'asset-facilities', title: 'Asset Management & Facilities',
    order: 5, color: '#D97706',
    subDepts: [
      { code: 'SUB-05-01', slug: 'facilities-management', title: 'Facilities Management Desk', order: 1 },
      { code: 'SUB-05-02', slug: 'iot-operations', title: 'IoT & Smart Building Operations', order: 2 },
    ],
  },
  {
    code: 'DEP-06', slug: 'finance-treasury', title: 'Revenue, Finance & Treasury',
    order: 6, color: '#DC2626',
    subDepts: [
      { code: 'SUB-06-01', slug: 'accounts-payable', title: 'Accounts Payable & Receivable', order: 1 },
      { code: 'SUB-06-02', slug: 'treasury-vat', title: 'Treasury & VAT Compliance', order: 2 },
    ],
  },
  {
    code: 'DEP-07', slug: 'marketing-leads', title: 'Performance Marketing & Lead Acquisition',
    order: 7, color: '#7C3AED',
    subDepts: [
      { code: 'SUB-07-01', slug: 'digital-marketing', title: 'Digital & Performance Marketing', order: 1 },
      { code: 'SUB-07-02', slug: 'lead-qualification', title: 'Lead Qualification & CRM', order: 2 },
    ],
  },
  {
    code: 'DEP-08', slug: 'communications-cx', title: 'Corporate Communications & Client Experience',
    order: 8, color: '#0369A1',
    subDepts: [
      { code: 'SUB-08-01', slug: 'pr-media', title: 'PR & Media Relations', order: 1 },
      { code: 'SUB-08-02', slug: 'client-concierge', title: 'Client Concierge & VIP Desk', order: 2 },
    ],
  },
  {
    code: 'DEP-09', slug: 'compliance-rera', title: 'Regulatory Affairs & RERA Compliance',
    order: 9, color: '#B45309',
    subDepts: [
      { code: 'SUB-09-01', slug: 'rera-licensing', title: 'RERA Licensing & Renewals', order: 1 },
      { code: 'SUB-09-02', slug: 'aml-kyc', title: 'AML, KYC & Due Diligence', order: 2 },
    ],
  },
  {
    code: 'DEP-10', slug: 'legal-conveyancing', title: 'Conveyancing & Transaction Management',
    order: 10, color: '#6D28D9',
    subDepts: [
      { code: 'SUB-10-01', slug: 'noc-transfers', title: 'NOC & DLD Transfers Desk', order: 1 },
      { code: 'SUB-10-02', slug: 'contract-review', title: 'Contract Review & Disputes', order: 2 },
    ],
  },
  {
    code: 'DEP-11', slug: 'technology', title: 'Technology, CRM & Infrastructure',
    order: 11, color: '#0F172A',
    subDepts: [
      { code: 'SUB-11-01', slug: 'crm-devops', title: 'CRM & DevOps Engineering', order: 1 },
      { code: 'SUB-11-02', slug: 'cybersecurity', title: 'Cybersecurity & Data Protection', order: 2 },
    ],
  },
  {
    code: 'DEP-12', slug: 'data-ai', title: 'Market Intelligence & IoT Data Science',
    order: 12, color: '#0891B2',
    subDepts: [
      { code: 'SUB-12-01', slug: 'market-research', title: 'Market Research & Analytics', order: 1 },
      { code: 'SUB-12-02', slug: 'ai-models', title: 'AI Models & Predictive Systems', order: 2 },
    ],
  },
];

export const GRID_TO_SEEDED_DEPARTMENT_CODE: Record<string, string> = {
  'DEPT-01': 'DEP-01',
  'DEPT-02': 'DEP-02',
  'DEPT-03': 'DEP-03',
  'DEPT-04': 'DEP-04',
  'DEPT-05': 'DEP-05',
  'DEPT-06': 'DEP-06',
  'DEPT-07': 'DEP-07',
  'DEPT-08': 'DEP-08',
  'DEPT-09': 'DEP-09',
  'DEPT-10': 'DEP-10',
  'DEPT-11': 'DEP-11',
  'DEPT-12': 'DEP-12',
};
