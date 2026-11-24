export interface AutoReplyRule {
  id: string;
  name: string;
  keywords: string[];
  responseTemplate: string;
  intentTag: string;
  leadScoreBoost: number;
  active: boolean;
  dldInventoryLookup: boolean;
  escalationTarget: string;
}

export const INITIAL_RULES: AutoReplyRule[] = [
  {
    id: 'rule-1',
    name: 'DAMAC Hills 2 Villa & Pricing Inquiry',
    keywords: ['villa', 'DAMAC Hills 2', 'price', 'buy', 'cost', 'VARDON', 'PACIFICA'],
    responseTemplate:
      'Greeting {{client_name}}! Nina AI here for White Caves Real Estate. We have {{available_count}} matching villas in DAMAC Hills 2 starting from AED 1.35M. Would you like to schedule a private viewing with Arslan Malik (+971 50 576 0056)?',
    intentTag: 'Property Inquiry',
    leadScoreBoost: 25,
    active: true,
    dldInventoryLookup: true,
    escalationTarget: '+971 50 576 0056',
  },
  {
    id: 'rule-2',
    name: 'Ejari & Lease Contract Support',
    keywords: ['rent', 'Ejari', 'lease', 'contract', 'PDC', 'landlord'],
    responseTemplate:
      'Hello {{client_name}}! White Caves Leasing Services handles complete DLD Ejari registration, PDC collection, and landlord payout accounting. Our standard terms are 4 PDCs.',
    intentTag: 'Ejari Renewal',
    leadScoreBoost: 15,
    active: true,
    dldInventoryLookup: false,
    escalationTarget: 'Leasing Desk',
  },
  {
    id: 'rule-3',
    name: 'DLD Title Deed Verification Request',
    keywords: ['title deed', 'DLD', 'verify', 'owner', 'Form A', 'Form B'],
    responseTemplate:
      'Hello! All property listings at White Caves are 100% verified against official Dubai Land Department Title Deeds via DLD REST Integration.',
    intentTag: 'Title Deed Audit',
    leadScoreBoost: 30,
    active: true,
    dldInventoryLookup: true,
    escalationTarget: 'Legal Desk',
  },
];
