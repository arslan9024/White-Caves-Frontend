/**
 * Handoff summary and assistant context preparation helpers for ContextPreservationEngine.
 */

import {
  determineConversationStage,
  extractPendingActions,
  generateGreeting,
  getAverageSentiment,
  identifyBlockers,
  identifyMainTopic,
} from './contextAnalysis';
import type { ConversationContext, HandoffSummary, PreparedAssistantContext } from './types';

export function buildHandoffSummary(
  context: ConversationContext,
  newAssistantId: string
): HandoffSummary {
  const lastMessage = context.conversationHistory[context.conversationHistory.length - 1];
  const clientMessages = context.conversationHistory.filter(m => m.sender === 'CLIENT');
  const latestClientMessage = clientMessages[clientMessages.length - 1];

  return {
    fromAssistant: context.currentAssistant,
    toAssistant: newAssistantId,
    reason: 'Specialist needed for next phase',
    clientCurrentNeed: latestClientMessage?.intent || 'Unknown',
    lastInteraction: lastMessage?.content || 'No recent message',
    clientSentiment: getAverageSentiment(context.conversationHistory),
    urgency: context.metadata.priority,
    contextPreserved: true,
    suggestedGreeting: generateGreeting(context, newAssistantId),
  };
}

export function buildPreparedAssistantContext(
  context: ConversationContext,
  _assistantId?: string
): PreparedAssistantContext {
  const recentMessages = context.conversationHistory.slice(-10);

  return {
    conversationState: {
      clientName: context.clientName,
      clientTier: context.clientTier,
      stage: determineConversationStage(context),
      progress: context.conversationHistory.length,
    },
    clientData: {
      budget: context.clientBudget,
      preferences: context.clientPreferences,
      previousAssistants: context.previousAssistants.map(a => a.assistantId),
    },
    immediateContext: {
      lastClientMessage: context.conversationHistory.filter(m => m.sender === 'CLIENT').pop()
        ?.content,
      conversationTopic: identifyMainTopic(context),
      pendingActions: extractPendingActions(context),
      blockers: identifyBlockers(context),
    },
    recentHistory: recentMessages.map(m => ({
      speaker: m.senderName,
      message: m.content,
      intent: m.intent,
    })),
  };
}
