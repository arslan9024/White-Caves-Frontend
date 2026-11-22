/**
 * Shared TypeScript types for DynamicPricingEngine and ContextPreservationEngine.
 */

export interface PricingFactors {
  propertyRarity: Record<string, number>;
  clientTierDiscount: Record<string, number>;
  transactionComplexity: Record<string, number>;
  seasonalityMultiplier: Record<string, number>;
  volumeBonus: Record<string, number>;
  marketCondition: Record<string, number>;
}

export interface BaseRateConfig {
  baseline: number;
  min: number;
  max: number;
}

export interface ServiceConfig {
  serviceType: string;
}

export interface PricingClientData {
  tier?: string;
  transactionCount?: number;
  totalValue?: number;
}

export interface PricingPropertyData {
  value?: number;
  annualRent?: number;
  monthlyRent?: number;
  rarity?: string;
  type?: string;
}

export interface PricingContextData {
  complexity?: string;
  marketCondition?: string;
}

export interface PricingBreakdownFactor {
  factor: string;
  multiplier: number;
  impact: number;
}

export interface PricingCalculationResult {
  serviceType: string;
  finalRate: number;
  finalAmount: number;
  currency: string;
  baselineRate: number;
  appliedMultiplier: number;
  calculationBasis: string;
  breakdown: {
    factors: PricingBreakdownFactor[];
    totalImpact: string;
  };
  priceAdjustmentReason: string;
  metadata: {
    clientTier: string;
    propertyRarity: string;
    complexity: string;
    season: string;
    marketCondition: string;
    calculatedAt: Date;
  };
}

export interface PricingComparisonResult {
  serviceType: string;
  oldRate: string;
  oldAmount: string;
  newRate: string;
  newAmount: string;
  difference: string;
  percentageChange: string;
  isIncrease: boolean;
  reason: string;
  breakdown: PricingCalculationResult['breakdown'];
}

export interface PricingDateRange {
  start: Date | string | null;
  end: Date | string | null;
}

export interface PricingReport {
  serviceType: string;
  dateRange: PricingDateRange;
  averageRate: number;
  minRate: number;
  maxRate: number;
  standardDeviation: number;
  mostCommonFactors: string[];
  averageAdjustment: string;
}

export type SentimentType = 'POSITIVE' | 'NEGATIVE' | 'NEUTRAL';

export interface ContextClientInput {
  clientId?: string;
  clientName?: string;
  clientTier?: string;
  budget?: number;
  preferredPropertyType?: string[];
  preferredLocations?: string[];
  preferredLanguage?: string;
  preferredChannels?: string[];
}

export interface ClientPreferences {
  propertyType: string[];
  locations: string[];
  language: string;
  communicationChannels: string[];
}

export interface IncomingMessage {
  sender: string;
  senderName?: string;
  type?: string;
  content: string;
  attachments?: unknown[];
}

export interface ConversationMessage {
  timestamp: Date;
  sender: string;
  senderName: string;
  messageType: string;
  type?: string;
  content: string;
  intent: string;
  sentiment: SentimentType;
  attachments: unknown[];
}

export interface PreviousAssistantRecord {
  assistantId: string;
  duration: number;
  timestamp: Date;
}

export interface ConversationMetadata {
  complexity: string;
  priority: string;
  keywords: string[];
  intents: string[];
}

export interface ConversationContext {
  conversationId: string;
  clientId?: string;
  clientName?: string;
  clientTier: string;
  clientBudget?: number;
  clientPreferences: ClientPreferences;
  conversationHistory: ConversationMessage[];
  contextSummary: string;
  currentAssistant: string | null;
  lastAssistantChange?: number;
  previousAssistants: PreviousAssistantRecord[];
  createdAt: Date;
  lastUpdated: Date;
  metadata: ConversationMetadata;
}

export interface HandoffSummary {
  fromAssistant: string | null;
  toAssistant: string;
  reason: string;
  clientCurrentNeed: string;
  lastInteraction: string;
  clientSentiment: SentimentType;
  urgency: string;
  contextPreserved: boolean;
  suggestedGreeting: string;
}

export interface PreparedAssistantContext {
  conversationState: {
    clientName?: string;
    clientTier: string;
    stage: string;
    progress: number;
  };
  clientData: {
    budget?: number;
    preferences: ClientPreferences;
    previousAssistants: string[];
  };
  immediateContext: {
    lastClientMessage?: string;
    conversationTopic: string;
    pendingActions: string[];
    blockers: string[];
  };
  recentHistory: Array<{
    speaker: string;
    message: string;
    intent: string;
  }>;
}
