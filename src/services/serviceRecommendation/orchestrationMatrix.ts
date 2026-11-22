export const ASSISTANT_REGISTRY: Record<
  string,
  { name: string; dept: string; specialty: string; strength: string }
> = {
  CLARA: {
    name: 'Clara',
    dept: 'Sales',
    specialty: 'Lead management, CRM',
    strength: 'Client relationship',
  },
  MARY: {
    name: 'Mary',
    dept: 'Inventory',
    specialty: 'Property search',
    strength: 'Property matching',
  },
  THEODORA: {
    name: 'Theodora',
    dept: 'Finance',
    specialty: 'Pricing, payments',
    strength: 'Financial calculations',
  },
  ZOE: { name: 'Zoe', dept: 'Executive', specialty: 'Strategy', strength: 'Decision making' },
  LINDA: {
    name: 'Linda',
    dept: 'Communications',
    specialty: 'WhatsApp, messaging',
    strength: 'Communication',
  },
  SOPHIA: {
    name: 'Sophia',
    dept: 'Pipeline',
    specialty: 'Deal tracking',
    strength: 'Pipeline management',
  },
  NINA: { name: 'Nina', dept: 'Technology', specialty: 'Bot automation', strength: 'Automation' },
  CIPHER: {
    name: 'Cipher',
    dept: 'Analytics',
    specialty: 'Market analysis',
    strength: 'Data analysis',
  },
  SAGE: {
    name: 'Sage',
    dept: 'Analytics',
    specialty: 'Market trends',
    strength: 'Trend detection',
  },
  HUNTER: {
    name: 'Hunter',
    dept: 'Sales',
    specialty: 'Lead prospecting',
    strength: 'Lead generation',
  },
  IVY: {
    name: 'Ivy',
    dept: 'Compliance',
    specialty: 'EJARI registration',
    strength: 'Leasing process',
  },
  MAX: {
    name: 'Max',
    dept: 'Operations',
    specialty: 'Document processing',
    strength: 'Documentation',
  },
  HENRY: {
    name: 'Henry',
    dept: 'Compliance',
    specialty: 'Audit & compliance',
    strength: 'Risk assessment',
  },
  OLIVIA: {
    name: 'Olivia',
    dept: 'Marketing',
    specialty: 'Marketing strategy',
    strength: 'Market opportunities',
  },
};

export const TASK_ROUTER_MATRIX = {
  FIND_PROPERTY: {
    primary: ['MARY', 'CIPHER'],
    secondary: ['SAGE', 'HUNTER'],
    parallel: true,
    expectedDuration: 180,
    confidence: 0.95,
  },
  SCHEDULE_VIEWING: {
    primary: ['LINDA', 'CLARA'],
    secondary: ['NINA', 'SOPHIA'],
    parallel: true,
    expectedDuration: 180,
    confidence: 0.92,
  },
  CALCULATE_FINANCE: {
    primary: ['THEODORA'],
    secondary: ['CIPHER'],
    parallel: false,
    expectedDuration: 300,
    confidence: 0.98,
  },
  PROPERTY_SEARCH: {
    primary: ['MARY'],
    secondary: ['CIPHER', 'SAGE'],
    parallel: true,
    expectedDuration: 120,
    confidence: 0.93,
  },
  LEAD_QUALIFICATION: {
    primary: ['CLARA', 'HUNTER'],
    secondary: ['SOPHIA'],
    parallel: true,
    expectedDuration: 240,
    confidence: 0.89,
  },
  PROCESS_DOCUMENTS: {
    primary: ['MAX'],
    secondary: ['HENRY', 'IVY'],
    parallel: true,
    expectedDuration: 600,
    confidence: 0.91,
  },
  MARKET_ANALYSIS: {
    primary: ['CIPHER', 'SAGE'],
    secondary: ['OLIVIA'],
    parallel: true,
    expectedDuration: 300,
    confidence: 0.87,
  },
  SEND_PROPOSAL: {
    primary: ['LINDA', 'ZOE'],
    secondary: ['CLARA'],
    parallel: false,
    expectedDuration: 120,
    confidence: 0.96,
  },
};

export const SIMULATED_ASSISTANT_OUTPUTS = {
  MARY_PROPERTY_SEARCH: {
    properties: [
      { id: 'P1', name: 'Villa DAMAC Hills 2', price: 50000000, match: 95 },
      { id: 'P2', name: 'Apartment Downtown Dubai', price: 35000000, match: 87 },
    ],
    totalMatches: 2,
  },
  THEODORA_CALCULATE_FINANCE: {
    paymentOptions: [
      { downPayment: '20%', monthlyPayment: 'AED 250K', rate: 4.5, term: 20 },
      { downPayment: '50%', monthlyPayment: 'AED 100K', rate: 4.0, term: 20 },
    ],
    optimalOption: 0,
  },
  LINDA_SCHEDULE_VIEWING: {
    scheduled: true,
    viewingTime: '2026-01-18T14:00:00',
    location: 'DAMAC Hills 2 - Villa',
    agent: 'Ahmed',
    confirmationSent: true,
  },
  CLARA_LEAD_QUALIFICATION: {
    qualified: true,
    qualificationScore: 88,
    nextAction: 'Schedule viewing',
    recommendedAgent: 'Ahmed',
  },
  CIPHER_MARKET_ANALYSIS: {
    marketTrend: 'Bullish - prices up 12% YoY',
    opportunities: [{ recommendation: 'Price increase recommended', impact: 'AED +2.5M' }],
    confidence: 0.92,
  },
};

export const NEXT_STEP_MAP = {
  FIND_PROPERTY: 'SCHEDULE_VIEWING',
  SCHEDULE_VIEWING: 'CALCULATE_FINANCE',
  CALCULATE_FINANCE: 'SEND_PROPOSAL',
  LEAD_QUALIFICATION: 'SCHEDULE_VIEWING',
  MARKET_ANALYSIS: 'SEND_PROPOSAL',
  PROCESS_DOCUMENTS: 'SEND_PROPOSAL',
};
