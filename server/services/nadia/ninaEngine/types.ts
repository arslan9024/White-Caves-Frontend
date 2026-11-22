/**
 * NINA NLP Engine - Core Types & Constants
 */

/**
 * Confidence gate threshold — if primary intent confidence falls below this
 * value, Nina cannot reliably handle the message and must escalate to a human
 * agent with a structured context handoff payload.
 *
 * The engine awards 30 confidence points per keyword match (scoreMatch).
 * A threshold of 30 means any message with at least one matching keyword
 * is handled by Nina; messages with zero matches (confidence = 0, UNKNOWN
 * intent) are always escalated.
 */
export const CONFIDENCE_GATE_THRESHOLD = 30;

export enum Intent {
  // Property-related intents
  PROPERTY_INQUIRY = 'PROPERTY_INQUIRY',
  PROPERTY_INQUIRY_RESIDENTIAL = 'PROPERTY_INQUIRY_RESIDENTIAL',
  PROPERTY_INQUIRY_COMMERCIAL = 'PROPERTY_INQUIRY_COMMERCIAL',
  PROPERTY_INQUIRY_LAND = 'PROPERTY_INQUIRY_LAND',
  PROPERTY_INQUIRY_INVESTMENT = 'PROPERTY_INQUIRY_INVESTMENT',

  // Viewing-related intents
  VIEWING_REQUEST = 'VIEWING_REQUEST',
  VIEWING_REQUEST_IMMEDIATE = 'VIEWING_REQUEST_IMMEDIATE',
  VIEWING_REQUEST_SCHEDULED = 'VIEWING_REQUEST_SCHEDULED',
  VIEWING_REQUEST_GROUP = 'VIEWING_REQUEST_GROUP',
  VIEWING_REQUEST_VIRTUAL = 'VIEWING_REQUEST_VIRTUAL',

  // Purchase-related intents
  PURCHASE_INTEREST = 'PURCHASE_INTEREST',
  PURCHASE_INTEREST_READY = 'PURCHASE_INTEREST_READY',
  PURCHASE_INTEREST_1_3_MONTHS = 'PURCHASE_INTEREST_1_3_MONTHS',
  PURCHASE_INTEREST_3_12_MONTHS = 'PURCHASE_INTEREST_3_12_MONTHS',
  PURCHASE_INTEREST_FUTURE = 'PURCHASE_INTEREST_FUTURE',

  // Complaint intents
  COMPLAINT = 'COMPLAINT',
  COMPLAINT_AGENT = 'COMPLAINT_AGENT',
  COMPLAINT_PROPERTY = 'COMPLAINT_PROPERTY',
  COMPLAINT_PROCESS = 'COMPLAINT_PROCESS',
  COMPLAINT_SERVICE = 'COMPLAINT_SERVICE',

  // Information-related intents
  INFORMATION_REQUEST = 'INFORMATION_REQUEST',
  INFORMATION_REQUEST_PRICING = 'INFORMATION_REQUEST_PRICING',
  INFORMATION_REQUEST_AVAILABILITY = 'INFORMATION_REQUEST_AVAILABILITY',
  INFORMATION_REQUEST_SPECS = 'INFORMATION_REQUEST_SPECS',
  INFORMATION_REQUEST_LOCATION = 'INFORMATION_REQUEST_LOCATION',

  // Negotiation intents
  NEGOTIATION = 'NEGOTIATION',
  NEGOTIATION_PRICE = 'NEGOTIATION_PRICE',
  NEGOTIATION_TERMS = 'NEGOTIATION_TERMS',
  NEGOTIATION_FINANCING = 'NEGOTIATION_FINANCING',
  NEGOTIATION_TRADEIN = 'NEGOTIATION_TRADEIN',

  // General intents
  GREETING = 'GREETING',
  FAREWELL = 'FAREWELL',
  ASSISTANCE_NEEDED = 'ASSISTANCE_NEEDED',
  UNKNOWN = 'UNKNOWN',
}

export interface IntentScore {
  intent: Intent;
  confidence: number;
  reasoning: string;
}

export interface SentimentResult {
  sentiment: 'POSITIVE' | 'NEGATIVE' | 'NEUTRAL';
  score: number; // -1.0 to 1.0
  keywords: string[];
}

export interface Entity {
  type:
    | 'PROPERTY_TYPE'
    | 'LOCATION'
    | 'PRICE'
    | 'BEDROOMS'
    | 'SIZE'
    | 'NAME'
    | 'PHONE'
    | 'DATE'
    | 'AMENITY';
  value: string;
  confidence: number;
}

/**
 * Structured payload passed to the assigned agent when a conversation is
 * escalated due to low confidence or intent-based rules.
 */
export interface HandoffPayload {
  reason: 'LOW_CONFIDENCE' | 'COMPLAINT' | 'ASSISTANCE_NEEDED' | 'NEGATIVE_SENTIMENT';
  confidence: number;
  detectedIntent: Intent;
  entities: Entity[];
  sentiment: SentimentResult;
  conversationId: string;
  customerName?: string;
  customerPhone?: string;
  suggestedQueue: 'GENERAL' | 'SALES' | 'SUPPORT' | 'COMPLAINTS';
}

export interface IntentResult {
  primary: IntentScore;
  secondary: IntentScore[];
  entities: Entity[];
  sentiment: SentimentResult;
  topics: string[];
  requiresAgentHandoff: boolean;
  handoffPayload?: HandoffPayload;
  suggestedResponse: string;
  timestamp: Date;
}

export interface ConversationContext {
  conversationId: string;
  customerName?: string;
  customerPhone?: string;
  recentIntents: Intent[];
  recentTopics: string[];
  mentionedProperties: string[];
  budget?: number;
  timeline?: string;
  needsAssistance: boolean;
  lastMessageTimestamp: Date;
}

export interface LearningFeedbackEntry {
  actualIntent: Intent;
  predictedIntent: Intent;
  timestamp: Date;
}
