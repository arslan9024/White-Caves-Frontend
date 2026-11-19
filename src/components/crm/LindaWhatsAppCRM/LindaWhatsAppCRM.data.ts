export interface LindaSessionItem {
  id: string;
  name: string;
  phone: string;
  role: 'MASTER' | 'SECONDARY' | 'AGENT' | 'EMPLOYEE' | 'SERVANT';
  status: 'connected' | 'reconnecting' | 'disconnected';
  linkState: 'LINKED' | 'NOT LINKED';
  connState: 'CONNECTED' | 'RECONNECTING' | 'OFFLINE';
  savedProfile: boolean;
  messagesSent: number;
  messagesReceived: number;
  uptime: string;
  lastActivity: string;
}

export interface LindaCampaignItem {
  id: string;
  name: string;
  cluster: string;
  status: 'active' | 'paused' | 'scheduled' | 'completed';
  sent: number;
  total: number;
  rateLimit: string;
  nextBatch: string;
}

export interface LindaFeatureBadge {
  id: string;
  code: string;
  category: string;
  title: string;
  summary: string;
  uses: number;
}

export interface LindaPlaybookBadge {
  id: string;
  title: string;
  category: string;
  summary: string;
  steps: string[];
  uses: number;
}

export interface LindaOutreachOwnerRow {
  rowNumber: number;
  name: string;
  phone: string;
  project: string;
  unitNumber: string;
  bedrooms: string;
  status: 'Existing Chat' | 'Send Today' | 'Tomorrow' | 'Later' | 'Skipped';
  scheduledDate: string;
  gorahaVerified: boolean;
  archerTier: 'HOT' | 'WARM' | 'COLD';
}

export interface LindaConversationItem {
  id: string;
  contactName: string;
  phone: string;
  cluster: string;
  unit: string;
  intent: string;
  sentiment: 'POSITIVE' | 'NEUTRAL' | 'URGENT';
  confidence: number;
  gorahaSaved: boolean;
  maryMatch: string;
  lastMessage: string;
  timestamp: string;
  accountPhone?: string;
  campaignTag?: string;
  isCampaignLead?: boolean;
  isGroup?: boolean;
  unreadCount?: number;
}

export interface LindaPillarItem {
  id: string;
  name: string;
  upgrades: string;
  status: string;
  highlight: string;
}

export { INITIAL_LINDA_SESSIONS, INITIAL_LINDA_CAMPAIGNS } from './LindaSessionsAndCampaigns.data';

export { INITIAL_LINDA_FEATURES, INITIAL_LINDA_PLAYBOOKS } from './LindaFeaturesAndPlaybooks.data';

export { LINDA_10_PILLARS } from './LindaPillars.data';

export const INITIAL_OUTREACH_OWNERS: LindaOutreachOwnerRow[] = [
  {
    rowNumber: 2,
    name: 'Tariq Al Gergawi',
    phone: '+971504418920',
    project: 'DAMAC Hills 2 - Vardon',
    unitNumber: 'VRD-312',
    bedrooms: '3BR Villa',
    status: 'Existing Chat',
    scheduledDate: 'Active Thread',
    gorahaVerified: true,
    archerTier: 'HOT',
  },
  {
    rowNumber: 3,
    name: 'Nadia Al Rostamani',
    phone: '+971528831044',
    project: 'DAMAC Hills 2 - Vardon',
    unitNumber: 'VRD-108',
    bedrooms: '4BR TH',
    status: 'Send Today',
    scheduledDate: 'Today (Batch #1)',
    gorahaVerified: true,
    archerTier: 'HOT',
  },
  {
    rowNumber: 4,
    name: 'Vikram Mehta',
    phone: '+971559102381',
    project: 'DAMAC Hills 2 - Janusia',
    unitNumber: 'JAN-204',
    bedrooms: '3BR TH',
    status: 'Send Today',
    scheduledDate: 'Today (Batch #2)',
    gorahaVerified: true,
    archerTier: 'HOT',
  },
  {
    rowNumber: 9,
    name: 'Huda Kattan Family Trust',
    phone: '+971543219870',
    project: 'Arabian Ranches 3 - Sun',
    unitNumber: 'SUN-218',
    bedrooms: '4BR Villa',
    status: 'Tomorrow',
    scheduledDate: 'Tomorrow 11:15 GST',
    gorahaVerified: true,
    archerTier: 'HOT',
  },
];

export const INITIAL_LINDA_CONVERSATIONS: LindaConversationItem[] = [
  {
    id: 'conv-1',
    contactName: 'Tariq Al Gergawi',
    phone: '+971 50 441 8920',
    cluster: 'DAMAC Hills 2 — Vardon',
    unit: 'VRD-312 (3BR Villa)',
    intent: 'Owner Willing to Sell / List Exclusively',
    sentiment: 'POSITIVE',
    confidence: 94,
    gorahaSaved: true,
    maryMatch: 'Matched 3 cash buyers in White Caves VIP pool (AED 1.85M)',
    lastMessage: 'Yes, the tenant vacates next month. Send me the Form A listing agreement.',
    timestamp: '2 mins ago',
    accountPhone: '+971505760056',
    campaignTag: 'Vardon Batch #1',
    isCampaignLead: true,
  },
  {
    id: 'conv-2',
    contactName: 'Richard Sterling',
    phone: '+971 50 998 1234',
    cluster: 'Dubai Marina — Marina Gate 2',
    unit: 'MG2-3401 (3BR Full Marina View)',
    intent: 'Viewing Request & Cash Offer Discussion',
    sentiment: 'URGENT',
    confidence: 91,
    gorahaSaved: true,
    maryMatch: 'Mary Inventory #MRN-3401 — Asking AED 6.4M (Vacant on Transfer)',
    lastMessage: 'Can Omar meet my advisor at Marina Gate tomorrow at 4 PM for inspection?',
    timestamp: '8 mins ago',
    accountPhone: '+971505760056',
    campaignTag: 'Penthouse Blast',
    isCampaignLead: true,
  },
  {
    id: 'conv-3',
    contactName: 'Nadia Al Rostamani',
    phone: '+971 52 883 1044',
    cluster: 'DAMAC Hills 2 — Vardon',
    unit: 'VRD-108 (4BR Townhouse)',
    intent: 'Rent Valuation & Ejari Renewal Inquiry',
    sentiment: 'POSITIVE',
    confidence: 87,
    gorahaSaved: true,
    maryMatch: 'Victoria Ejari Desk + Mary Comparative Rental Yield 7.8%',
    lastMessage: 'What is the current RERA rental index increase for 4BR in Vardon?',
    timestamp: '19 mins ago',
    accountPhone: 'goraha',
    campaignTag: 'Vardon Batch #1',
    isCampaignLead: true,
  },
];
