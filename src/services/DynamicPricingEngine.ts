/**
 * DynamicPricingEngine.ts
 *
 * Thin barrel preserving all original exports (`DynamicPricingEngine`,
 * `ContextPreservationEngine`) after atomic AEG-042 decomposition into
 * `src/services/dynamicPricing/`.
 */

export { DynamicPricingEngine } from './dynamicPricing/pricingEngine';
export { ContextPreservationEngine } from './dynamicPricing/contextPreservationEngine';
export type {
  BaseRateConfig,
  ClientPreferences,
  ContextClientInput,
  ConversationContext,
  ConversationMessage,
  ConversationMetadata,
  HandoffSummary,
  IncomingMessage,
  PreparedAssistantContext,
  PreviousAssistantRecord,
  PricingBreakdownFactor,
  PricingCalculationResult,
  PricingClientData,
  PricingComparisonResult,
  PricingContextData,
  PricingDateRange,
  PricingFactors,
  PricingPropertyData,
  PricingReport,
  SentimentType,
  ServiceConfig,
} from './dynamicPricing/types';
