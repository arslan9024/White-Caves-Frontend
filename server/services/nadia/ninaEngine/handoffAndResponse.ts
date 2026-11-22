/**
 * NINA NLP Engine - Agent Handoff Evaluation & Auto-Response Generation
 */
import {
  CONFIDENCE_GATE_THRESHOLD,
  ConversationContext,
  Entity,
  HandoffPayload,
  Intent,
  IntentScore,
  SentimentResult,
} from './types';

/**
 * Should this message be handled by an agent?
 * Escalates on: complaint intents, ASSISTANCE_NEEDED, negative sentiment
 * with many entities, OR primary intent confidence below CONFIDENCE_GATE_THRESHOLD.
 */
export function shouldHandoffToAgent(
  intent: Intent,
  sentiment: SentimentResult,
  entities: Entity[],
  confidence: number = 100,
): boolean {
  if (confidence < CONFIDENCE_GATE_THRESHOLD) return true;
  if (intent.includes('COMPLAINT')) return true;
  if (sentiment.sentiment === 'NEGATIVE' && entities.length > 5) return true;
  if (intent === Intent.ASSISTANCE_NEEDED) return true;

  return false;
}

/**
 * Build structured handoff payload for the receiving agent.
 */
export function buildHandoffPayload(
  primary: IntentScore,
  sentiment: SentimentResult,
  entities: Entity[],
  context: ConversationContext,
): HandoffPayload {
  const reason =
    primary.confidence < CONFIDENCE_GATE_THRESHOLD
      ? 'LOW_CONFIDENCE'
      : primary.intent.includes('COMPLAINT')
        ? 'COMPLAINT'
        : sentiment.sentiment === 'NEGATIVE'
          ? 'NEGATIVE_SENTIMENT'
          : 'ASSISTANCE_NEEDED';

  const suggestedQueue: HandoffPayload['suggestedQueue'] =
    reason === 'COMPLAINT'
      ? 'COMPLAINTS'
      : primary.intent.includes('PURCHASE') || primary.intent.includes('NEGOTIATION')
        ? 'SALES'
        : reason === 'ASSISTANCE_NEEDED' || reason === 'NEGATIVE_SENTIMENT'
          ? 'SUPPORT'
          : 'GENERAL';

  return {
    reason,
    confidence: primary.confidence,
    detectedIntent: primary.intent,
    entities,
    sentiment,
    conversationId: context.conversationId,
    customerName: context.customerName,
    customerPhone: context.customerPhone,
    suggestedQueue,
  };
}

/**
 * Generate suggested auto-response
 */
export function generateResponse(
  intent: Intent,
  context: ConversationContext,
  requiresHandoff: boolean,
): string {
  if (requiresHandoff) {
    return 'Thank you for contacting White Caves Real Estate! Your message has been received and our team will be with you shortly to assist.';
  }

  switch (intent) {
    case Intent.GREETING:
      return `Hello${context.customerName ? ` ${context.customerName}` : ''}! Welcome to White Caves Real Estate. How can I help you today?`;
    case Intent.PROPERTY_INQUIRY:
    case Intent.PROPERTY_INQUIRY_RESIDENTIAL:
    case Intent.PROPERTY_INQUIRY_COMMERCIAL:
      return "Great! I'd be happy to help you find the perfect property. Could you tell me more about your preferences? (Budget, location, type)";
    case Intent.VIEWING_REQUEST:
    case Intent.VIEWING_REQUEST_IMMEDIATE:
      return "Perfect! I'll arrange a viewing for you. Our agents have excellent properties available. Can you share your preferred time?";
    case Intent.PURCHASE_INTEREST:
    case Intent.PURCHASE_INTEREST_READY:
      return "Excellent! We're here to guide you through the purchase process. Let's connect you with our sales team.";
    case Intent.INFORMATION_REQUEST_PRICING:
      return "I'd be happy to share pricing details. Could you specify which property or area interests you?";
    case Intent.FAREWELL:
      return 'Thank you for contacting White Caves! We look forward to helping you. Have a great day!';
    default:
      return 'Thank you for your message. Our team will get back to you shortly with more information.';
  }
}
