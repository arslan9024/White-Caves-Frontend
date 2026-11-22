/**
 * Pure NLP, metadata, summary, and handoff analysis helpers for ContextPreservationEngine.
 */

import type { ConversationContext, ConversationMessage, SentimentType } from './types';

const INTENT_KEYWORDS: Record<string, string[]> = {
  SEARCH: ['find', 'search', 'looking for', 'show me'],
  SCHEDULE: ['schedule', 'meeting', 'viewing', 'appointment', 'when', 'time'],
  PRICING: ['price', 'cost', 'fee', 'commission', 'calculate', 'how much'],
  DOCUMENTATION: ['document', 'contract', 'sign', 'agreement', 'paper'],
  NEGOTIATION: ['negotiate', 'offer', 'bid', 'reduce', 'discount'],
  COMPLAINT: ['problem', 'issue', 'wrong', 'not happy', 'complaint'],
  QUESTION: ['why', 'how', 'what', 'when', 'where', 'who'],
  APPROVAL: ['yes', 'approved', 'agree', 'proceed', 'okay', 'ok'],
};

const POSITIVE_WORDS = [
  'great',
  'perfect',
  'excellent',
  'happy',
  'satisfied',
  'amazing',
  'wonderful',
];

const NEGATIVE_WORDS = ['bad', 'poor', 'angry', 'unhappy', 'problem', 'issue', 'complaint'];

const PROPERTY_TYPES = ['villa', 'apartment', 'townhouse', 'penthouse', 'studio'];
const LOCATIONS = ['damac', 'marina', 'downtown', 'jumeirah', 'deira', 'dubai hills'];

export function detectIntent(content: string): string {
  const lowerContent = content.toLowerCase();

  for (const [intent, keywords] of Object.entries(INTENT_KEYWORDS)) {
    if (keywords.some(kw => lowerContent.includes(kw))) {
      return intent;
    }
  }

  return 'GENERAL';
}

export function detectSentiment(content: string): SentimentType {
  const lowerContent = content.toLowerCase();
  const positiveCount = POSITIVE_WORDS.filter(w => lowerContent.includes(w)).length;
  const negativeCount = NEGATIVE_WORDS.filter(w => lowerContent.includes(w)).length;

  if (positiveCount > negativeCount) return 'POSITIVE';
  if (negativeCount > positiveCount) return 'NEGATIVE';
  return 'NEUTRAL';
}

export function extractKeywords(content: string): string[] {
  const keywords: string[] = [];
  const lowerContent = content.toLowerCase();

  PROPERTY_TYPES.forEach(type => {
    if (lowerContent.includes(type)) keywords.push(type.toUpperCase());
  });
  LOCATIONS.forEach(loc => {
    if (lowerContent.includes(loc)) keywords.push(loc.toUpperCase());
  });

  return keywords;
}

export function updateContextMetadata(
  context: ConversationContext,
  message: ConversationMessage
): void {
  if (message.intent) {
    if (!context.metadata.intents.includes(message.intent)) {
      context.metadata.intents.push(message.intent);
    }
  }

  const keywords = extractKeywords(message.content);
  keywords.forEach(kw => {
    if (!context.metadata.keywords.includes(kw)) {
      context.metadata.keywords.push(kw);
    }
  });

  if (context.conversationHistory.length > 10) {
    context.metadata.complexity = 'COMPLEX';
  }

  if (message.sentiment === 'NEGATIVE') {
    context.metadata.priority = 'HIGH';
  }
}

export function generateContextSummary(context: ConversationContext): string {
  const messages = context.conversationHistory.slice(-20);

  let summary = `Client: ${context.clientName} (${context.clientTier} tier)\n`;
  summary += `Budget: ${context.clientBudget ? 'AED ' + context.clientBudget : 'Not specified'}\n`;
  summary += `Preferences: ${context.clientPreferences.propertyType.join(', ') || 'Not specified'}\n`;
  summary += `Locations: ${context.clientPreferences.locations.join(', ') || 'Not specified'}\n`;
  summary += `Key Points:\n`;

  const keyMessages = messages.filter(m => m.type === 'TEXT' && m.content.length > 50);
  keyMessages.slice(-3).forEach(msg => {
    const brief = msg.content.substring(0, 100) + (msg.content.length > 100 ? '...' : '');
    summary += `  - ${msg.senderName}: ${brief}\n`;
  });

  return summary;
}

export function getRecentSummary(context: ConversationContext, messageCount: number): string {
  return context.conversationHistory
    .slice(-messageCount)
    .map(m => `${m.senderName}: ${m.content}`)
    .join('\n');
}

export function generateSuggestionsForAssistant(
  context: ConversationContext,
  _assistantId?: string
): string[] {
  const suggestions: string[] = [];

  if (context.metadata.intents.includes('SEARCH')) {
    suggestions.push('Client is looking for properties - offer specific recommendations');
  }
  if (context.metadata.intents.includes('PRICING')) {
    suggestions.push('Client asking about pricing - have pricing models ready');
  }
  if (context.metadata.intents.includes('COMPLAINT')) {
    suggestions.push('Client has concern - address immediately with empathy');
  }
  if (context.conversationHistory.length > 20) {
    suggestions.push('Long conversation - client is engaged, move toward closing');
  }

  return suggestions;
}

export function getContextWarnings(context: ConversationContext): string[] {
  const warnings: string[] = [];

  const negativeSentiments = context.conversationHistory
    .filter(m => m.sender === 'CLIENT')
    .filter(m => m.sentiment === 'NEGATIVE');

  if (negativeSentiments.length > 0) {
    warnings.push(
      `Client has expressed ${negativeSentiments.length} negative sentiment(s) - handle carefully`
    );
  }

  const recentMessages = context.conversationHistory.slice(-5);
  if (
    recentMessages.some(
      m => m.content.toLowerCase().includes("can't") || m.content.toLowerCase().includes('problem')
    )
  ) {
    warnings.push('Potential blocker identified - resolve before proceeding');
  }

  return warnings;
}

export function determineConversationStage(context: ConversationContext): string {
  const intents = context.metadata.intents;

  if (intents.includes('SEARCH')) return 'DISCOVERY';
  if (intents.includes('SCHEDULE')) return 'ENGAGEMENT';
  if (intents.includes('PRICING') || intents.includes('NEGOTIATION')) return 'CONSIDERATION';
  if (intents.includes('DOCUMENTATION') || intents.includes('APPROVAL')) return 'DECISION';

  return 'INITIAL';
}

export function identifyMainTopic(context: ConversationContext): string {
  const intents = context.metadata.intents;
  const keywords = context.metadata.keywords;

  if (intents.includes('SEARCH')) {
    return `Property search: ${keywords.join(', ')}`;
  }
  if (intents.includes('PRICING')) {
    return 'Pricing and financial discussion';
  }
  if (intents.includes('SCHEDULE')) {
    return 'Viewing or meeting scheduling';
  }

  return 'General inquiry';
}

export function extractPendingActions(context: ConversationContext): string[] {
  const actions: string[] = [];
  const lastMessages = context.conversationHistory.slice(-5);

  lastMessages.forEach(msg => {
    if (msg.intent === 'SCHEDULE') {
      actions.push('Schedule viewing');
    }
    if (msg.intent === 'PRICING') {
      actions.push('Provide pricing quote');
    }
    if (msg.intent === 'DOCUMENTATION') {
      actions.push('Send documents');
    }
  });

  return actions;
}

export function identifyBlockers(context: ConversationContext): string[] {
  const blockers: string[] = [];
  const allMessages = context.conversationHistory.map(m => m.content.toLowerCase()).join(' ');

  if (allMessages.includes('not available') || allMessages.includes("can't")) {
    blockers.push('Availability or capability constraint');
  }
  if (allMessages.includes('budget')) {
    blockers.push('Budget limitation');
  }
  if (allMessages.includes('timeline') || allMessages.includes('deadline')) {
    blockers.push('Time constraint');
  }

  return blockers;
}

export function getAverageSentiment(messages: ConversationMessage[]): SentimentType {
  const sentiments = messages.filter(m => m.sender === 'CLIENT').map(m => m.sentiment);
  const positiveCount = sentiments.filter(s => s === 'POSITIVE').length;
  const negativeCount = sentiments.filter(s => s === 'NEGATIVE').length;

  if (positiveCount > negativeCount) return 'POSITIVE';
  if (negativeCount > positiveCount) return 'NEGATIVE';
  return 'NEUTRAL';
}

export function generateGreeting(context: ConversationContext, newAssistantId: string): string {
  const clientName = context.clientName;
  const previousAssistant = context.currentAssistant;

  const greetings: Record<string, string> = {
    MARY: `Hi ${clientName}! I'm Mary from our Inventory team. ${previousAssistant} mentioned you're looking for properties - I have some great options to show you!`,
    THEODORA: `Hi ${clientName}! I'm Theodora from Finance. Let me work up the best payment options for you based on what we discussed.`,
    LINDA: `Hi ${clientName}! I'm Linda. Let's get that viewing scheduled for you right away!`,
    CLARA: `Hi ${clientName}! I'm Clara from our Sales team. I have all the details from our conversation - let's move forward!`,
    SOPHIA: `Hi ${clientName}! I'm Sophia, managing your deal timeline. Let's make sure everything stays on track!`,
  };

  return greetings[newAssistantId] || `Hi ${clientName}! Connecting you with our specialist...`;
}
