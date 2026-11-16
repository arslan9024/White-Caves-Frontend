export interface RexDocument {
  id: number;
  client: string;
  type: string;
  issuer: string;
  expiry: string | null;
  status: 'verified' | 'expiring' | 'flagged' | 'pending';
  risk: 'low' | 'medium' | 'high';
}

export interface RexComplianceCheck {
  rule: string;
  pass: number;
  fail: number;
}

export const REX_DOCUMENTS: RexDocument[] = [
  {
    id: 1,
    client: 'Ahmad Al Rashidi',
    type: 'Passport',
    issuer: 'UAE',
    expiry: '2028-03-15',
    status: 'verified',
    risk: 'low',
  },
  {
    id: 2,
    client: 'Ahmad Al Rashidi',
    type: 'Emirates ID',
    issuer: 'ICA',
    expiry: '2026-09-01',
    status: 'verified',
    risk: 'low',
  },
  {
    id: 3,
    client: 'Priya Nair',
    type: 'Passport',
    issuer: 'India',
    expiry: '2024-12-31',
    status: 'expiring',
    risk: 'medium',
  },
  {
    id: 4,
    client: 'James Whitmore',
    type: 'Visa',
    issuer: 'GDRFA',
    expiry: '2027-06-01',
    status: 'verified',
    risk: 'low',
  },
  {
    id: 5,
    client: 'Fatima Al Suwaidi',
    type: 'Title Deed',
    issuer: 'DLD',
    expiry: null,
    status: 'verified',
    risk: 'low',
  },
  {
    id: 6,
    client: 'Chen Wei',
    type: 'Bank Statement',
    issuer: 'ICBC',
    expiry: null,
    status: 'flagged',
    risk: 'high',
  },
];

export const REX_CHECKS: RexComplianceCheck[] = [
  { rule: 'Passport validity (≥6 months)', pass: 4, fail: 1 },
  { rule: 'Source of funds declaration', pass: 5, fail: 1 },
  { rule: 'PEP screening', pass: 6, fail: 0 },
  { rule: 'Sanctions list cross-check', pass: 6, fail: 0 },
  { rule: 'RERA registration (agents)', pass: 3, fail: 0 },
];

export const REX_STATUS_COLORS: Record<string, string> = {
  verified: '#22C55E',
  expiring: '#F59E0B',
  flagged: '#E31E24',
  pending: '#6B7280',
};

export const REX_RISK_COLORS: Record<string, string> = {
  low: '#22C55E',
  medium: '#F59E0B',
  high: '#E31E24',
};

