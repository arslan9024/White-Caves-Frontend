/**
 * NINA NLP Engine - Pre-built Keyword Lexicons & Domain Dictionaries
 */
import { Intent } from './types';

export const PROPERTY_TYPES: readonly string[] = [
  'villa',
  'apartment',
  'townhouse',
  'flat',
  'studio',
  'penthouse',
  'plot',
  'land',
];

export const DUBAI_LOCATIONS: readonly string[] = [
  'dubai marina',
  'downtown',
  'jbr',
  'deira',
  'bur dubai',
  'mall of emirates',
  'emirates living',
  'jumeirah',
  'palm jumeirah',
  'creek harbor',
  'creek rise',
  'dfc',
  'business bay',
  'new dubai',
  'difc',
  'marina',
  'damac hills 2',
  'akoya oxygen',
];

export const AMENITIES: readonly string[] = [
  'pool',
  'gym',
  'parking',
  'garden',
  'balcony',
  'terrace',
  'maid room',
  'laundry',
];

export const POSITIVE_SENTIMENT_KEYWORDS: readonly string[] = [
  'great',
  'love',
  'excellent',
  'perfect',
  'amazing',
  'beautiful',
  'best',
  'wonderful',
];

export const NEGATIVE_SENTIMENT_KEYWORDS: readonly string[] = [
  'bad',
  'terrible',
  'horrible',
  'awful',
  'useless',
  'disappointed',
  'angry',
  'frustrated',
];

/**
 * Initialize intent->keywords mapping (pre-built patterns)
 */
export function createIntentKeywords(): Map<Intent, string[]> {
  return new Map([
    // Property inquiry
    [
      Intent.PROPERTY_INQUIRY,
      ['show', 'property', 'properties', 'looking for', 'interested in', 'search'],
    ],
    [
      Intent.PROPERTY_INQUIRY_RESIDENTIAL,
      ['apartment', 'villa', 'townhouse', 'flat', 'residential'],
    ],
    [Intent.PROPERTY_INQUIRY_COMMERCIAL, ['office', 'shop', 'commercial', 'retail', 'space']],
    [Intent.PROPERTY_INQUIRY_LAND, ['plot', 'land', 'terrain', 'development']],
    [Intent.PROPERTY_INQUIRY_INVESTMENT, ['investment', 'roi', 'yield', 'rental', 'income']],

    // Viewing
    [
      Intent.VIEWING_REQUEST,
      ['view', 'viewing', 'tour', 'see', 'visit', 'schedule', 'appointment'],
    ],
    [
      Intent.VIEWING_REQUEST_IMMEDIATE,
      ['today', 'now', 'asap', 'urgent', 'immediately', 'tomorrow'],
    ],
    [Intent.VIEWING_REQUEST_SCHEDULED, ['next week', 'next month', 'later', 'schedule', 'plan']],
    [Intent.VIEWING_REQUEST_GROUP, ['group', 'friends', 'family', 'team', 'together']],
    [Intent.VIEWING_REQUEST_VIRTUAL, ['virtual', 'video', 'online', 'video call', '360']],

    // Purchase
    [Intent.PURCHASE_INTEREST, ['buy', 'purchase', 'acquire', 'own', 'invest']],
    [
      Intent.PURCHASE_INTEREST_READY,
      ['ready to buy', 'ready', 'serious', 'cash ready', 'approved'],
    ],
    [
      Intent.PURCHASE_INTEREST_1_3_MONTHS,
      ['1 month', '2 months', '3 months', 'soon', 'next quarter'],
    ],
    [Intent.PURCHASE_INTEREST_3_12_MONTHS, ['6 months', '9 months', 'year', 'next year']],
    [Intent.PURCHASE_INTEREST_FUTURE, ['future', 'later', 'maybe', 'consider', 'thinking']],

    // Complaint
    [Intent.COMPLAINT, ['complaint', 'issue', 'problem', 'unhappy', 'disappointed', 'wrong']],
    [Intent.COMPLAINT_AGENT, ['agent', 'staff', 'service', 'rude', 'unprofessional']],
    [Intent.COMPLAINT_PROPERTY, ['property', 'damage', 'issue', 'problem', 'defect']],
    [Intent.COMPLAINT_PROCESS, ['process', 'paperwork', 'documentation', 'delay', 'slow']],

    // Information
    [Intent.INFORMATION_REQUEST, ['what', 'how', 'tell me', 'explain', 'information']],
    [Intent.INFORMATION_REQUEST_PRICING, ['price', 'cost', 'afford', 'payment', 'aed']],
    [Intent.INFORMATION_REQUEST_AVAILABILITY, ['available', 'stock', 'inventory', 'units']],
    [
      Intent.INFORMATION_REQUEST_LOCATION,
      ['where', 'location', 'area', 'district', 'neighborhood'],
    ],

    // Negotiation
    [Intent.NEGOTIATION, ['negotiate', 'offer', 'discount', 'reduce', 'lower']],
    [Intent.NEGOTIATION_PRICE, ['price', 'discount', 'reduce', 'lower', 'cheaper']],
    [Intent.NEGOTIATION_TERMS, ['terms', 'payment', 'installment', 'options']],
    [Intent.NEGOTIATION_FINANCING, ['mortgage', 'finance', 'loan', 'bank', 'funding']],

    // General
    [Intent.GREETING, ['hello', 'hi', 'hey', 'good', 'morning', 'afternoon', 'evening']],
    [Intent.FAREWELL, ['bye', 'goodbye', 'thanks', 'thank you', 'see you', 'later']],
    [Intent.ASSISTANCE_NEEDED, ['help', 'assist', 'support', 'need', 'please', 'can you']],
  ]);
}

/**
 * Initialize weighted sentiment keywords
 */
export function createSentimentKeywords(): Map<string, number> {
  return new Map([
    // Positive
    ['excellent', 1.0],
    ['amazing', 0.9],
    ['great', 0.8],
    ['good', 0.6],
    ['love', 1.0],
    ['beautiful', 0.8],
    ['perfect', 0.9],
    ['wonderful', 0.8],
    ['fantastic', 0.9],

    // Negative
    ['bad', -0.8],
    ['terrible', -1.0],
    ['horrible', -0.95],
    ['awful', -0.9],
    ['disappointed', -0.8],
    ['angry', -0.85],
    ['frustrated', -0.75],
    ['useless', -0.9],
    ['hate', -1.0],
  ]);
}
