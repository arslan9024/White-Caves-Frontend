/**
 * NINA NLP Engine - Advanced Intent & Context Processing
 * Core AI logic for understanding customer messages
 * Supports: Intent detection, entity extraction, sentiment analysis, confidence scoring
 * Training: Hybrid (pre-built patterns + gradual learning from corrections)
 */
import {
  analyzeSentiment,
  extractEntities,
  extractTopics,
  normalizeMessage,
} from './ninaEngine/extractors';
import {
  buildHandoffPayload,
  generateResponse,
  shouldHandoffToAgent,
} from './ninaEngine/handoffAndResponse';
import { detectPrimaryIntent, detectSecondaryIntents } from './ninaEngine/intentScoring';
import { createIntentKeywords, createSentimentKeywords } from './ninaEngine/keywords';
import {
  CONFIDENCE_GATE_THRESHOLD,
  ConversationContext,
  Entity,
  HandoffPayload,
  Intent,
  IntentResult,
  IntentScore,
  LearningFeedbackEntry,
  SentimentResult,
} from './ninaEngine/types';

export { CONFIDENCE_GATE_THRESHOLD, Intent };
export type {
  ConversationContext,
  Entity,
  HandoffPayload,
  IntentResult,
  IntentScore,
  SentimentResult,
};

/**
 * NINA Engine - Core NLP Processing
 */
export class NinaEngine {
  private intentKeywords: Map<Intent, string[]>;
  private sentimentKeywords: Map<string, number>;
  private learningData: Map<string, LearningFeedbackEntry>;

  constructor() {
    this.intentKeywords = createIntentKeywords();
    this.sentimentKeywords = createSentimentKeywords();
    this.learningData = new Map();
  }

  /**
   * Main entry point: Process message with context
   */
  public processMessage(message: string, context: ConversationContext): IntentResult {
    const normalized = normalizeMessage(message);
    const sentiment = analyzeSentiment(normalized);
    const primaryIntent = detectPrimaryIntent(normalized, context, this.intentKeywords);
    const secondaryIntents = detectSecondaryIntents(
      normalized,
      primaryIntent.intent,
      this.intentKeywords,
    );
    const entities = extractEntities(normalized);
    const topics = extractTopics(normalized, entities);

    const requiresHandoff = shouldHandoffToAgent(
      primaryIntent.intent,
      sentiment,
      entities,
      primaryIntent.confidence,
    );

    const handoffPayload: HandoffPayload | undefined = requiresHandoff
      ? buildHandoffPayload(primaryIntent, sentiment, entities, context)
      : undefined;

    const suggestedResponse = generateResponse(primaryIntent.intent, context, requiresHandoff);

    return {
      primary: primaryIntent,
      secondary: secondaryIntents,
      entities,
      sentiment,
      topics,
      requiresAgentHandoff: requiresHandoff,
      handoffPayload,
      suggestedResponse,
      timestamp: new Date(),
    };
  }

  /**
   * Record user correction for learning
   */
  public recordFeedback(messageId: string, actualIntent: Intent, predictedIntent: Intent): void {
    if (actualIntent !== predictedIntent) {
      this.learningData.set(messageId, {
        actualIntent,
        predictedIntent,
        timestamp: new Date(),
      });
    }
  }

  /**
   * Expose sentiment keyword weights for inspection/calibration
   */
  public getSentimentKeywords(): Map<string, number> {
    return this.sentimentKeywords;
  }
}

// Export singleton instance
export const ninaEngine = new NinaEngine();
