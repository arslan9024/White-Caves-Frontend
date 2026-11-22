/**
 * NINA NLP Engine - Intent Scoring & Classification
 */
import { ConversationContext, Intent, IntentScore } from './types';

/**
 * Score match between message and keywords.
 * Uses hit-count scoring: each keyword match adds 0.3 (capped at 1.0).
 */
export function scoreMatch(message: string, keywords: string[]): number {
  const normalized = message.toLowerCase();
  let matches = 0;

  for (const keyword of keywords) {
    if (normalized.includes(keyword.toLowerCase())) {
      matches += 1;
    }
  }

  return Math.min(1, matches * 0.3);
}

/**
 * Generate reasoning explanation for intent detection
 */
export function generateIntentReasoning(
  intent: Intent,
  message: string,
  intentKeywords: Map<Intent, string[]>,
): string {
  const keywords = intentKeywords.get(intent) || [];
  const lowerMessage = message.toLowerCase();
  const found = keywords.filter((k) => lowerMessage.includes(k.toLowerCase()));
  return `Detected from keywords: ${found.slice(0, 3).join(', ')}`;
}

/**
 * Detect primary intent with confidence scoring and recent-intent context boost
 */
export function detectPrimaryIntent(
  message: string,
  context: ConversationContext,
  intentKeywords: Map<Intent, string[]>,
): IntentScore {
  const scores: Map<Intent, number> = new Map();

  for (const [intent, keywords] of intentKeywords) {
    const score = scoreMatch(message, keywords);
    if (score > 0) {
      scores.set(intent, score);
    }
  }

  // Apply context boost for recent intents
  for (const recentIntent of context.recentIntents.slice(0, 3)) {
    const current = scores.get(recentIntent) || 0;
    scores.set(recentIntent, Math.max(current * 1.5, current + 0.2));
  }

  let topIntent = Intent.UNKNOWN;
  let topScore = 0;

  for (const [intent, score] of scores) {
    if (score > topScore) {
      topScore = score;
      topIntent = intent;
    }
  }

  const confidence = Math.min(100, Math.max(0, topScore * 100));

  return {
    intent: topIntent,
    confidence,
    reasoning: generateIntentReasoning(topIntent, message, intentKeywords),
  };
}

/**
 * Detect secondary intents (up to 3)
 */
export function detectSecondaryIntents(
  message: string,
  primaryIntent: Intent,
  intentKeywords: Map<Intent, string[]>,
): IntentScore[] {
  const scores: Array<{ intent: Intent; score: number }> = [];

  for (const [intent, keywords] of intentKeywords) {
    if (intent === primaryIntent) continue;

    const score = scoreMatch(message, keywords);
    if (score > 0.05) {
      scores.push({ intent, score });
    }
  }

  scores.sort((a, b) => b.score - a.score);

  return scores.slice(0, 3).map((item) => ({
    intent: item.intent,
    confidence: Math.min(100, item.score * 100),
    reasoning: `Secondary match for ${item.intent}`,
  }));
}
