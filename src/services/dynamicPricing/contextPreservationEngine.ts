/**
 * ContextPreservationEngine
 *
 * Maintains conversation context across AI assistant switches
 * - Prevents "I already told you" repetition
 * - Enables seamless hand-offs
 * - Preserves relationship continuity
 *
 * Expected gain: +20% customer satisfaction, -10% repeat explanations
 */

import {
  detectIntent,
  detectSentiment,
  determineConversationStage,
  extractKeywords,
  extractPendingActions,
  generateContextSummary,
  generateGreeting,
  generateSuggestionsForAssistant,
  getAverageSentiment,
  getContextWarnings,
  getRecentSummary,
  identifyBlockers,
  identifyMainTopic,
  updateContextMetadata,
} from './contextAnalysis';
import { buildHandoffSummary, buildPreparedAssistantContext } from './contextHandoff';
import type {
  ContextClientInput,
  ConversationContext,
  ConversationMessage,
  HandoffSummary,
  IncomingMessage,
  PreparedAssistantContext,
  SentimentType,
} from './types';

export class ContextPreservationEngine {
  conversationContexts: Map<string, ConversationContext>;
  retentionPeriod: number;

  constructor() {
    this.conversationContexts = new Map<string, ConversationContext>(); // conversationId -> context
    this.retentionPeriod = 30 * 24 * 60 * 60 * 1000; // 30 days
  }

  /**
   * Initialize context for a new conversation
   */
  initializeContext(
    conversationId: string,
    clientData: ContextClientInput = {}
  ): ConversationContext {
    const context: ConversationContext = {
      conversationId,
      clientId: clientData.clientId,
      clientName: clientData.clientName,
      clientTier: clientData.clientTier || 'BASIC',
      clientBudget: clientData.budget,
      clientPreferences: {
        propertyType: clientData.preferredPropertyType || [],
        locations: clientData.preferredLocations || [],
        language: clientData.preferredLanguage || 'ENGLISH',
        communicationChannels: clientData.preferredChannels || ['EMAIL', 'WHATSAPP'],
      },
      conversationHistory: [],
      contextSummary: '',
      currentAssistant: null,
      previousAssistants: [],
      createdAt: new Date(),
      lastUpdated: new Date(),
      metadata: {
        complexity: 'SIMPLE',
        priority: 'NORMAL',
        keywords: [],
        intents: [],
      },
    };

    this.conversationContexts.set(conversationId, context);
    return context;
  }

  /**
   * Add message to conversation history
   */
  addMessage(
    conversationId: string,
    message: IncomingMessage
  ): { success: true; messageId: number } | { error: string } {
    const context = this.conversationContexts.get(conversationId);
    if (!context) {
      return { error: 'Context not found' };
    }

    const messageRecord: ConversationMessage = {
      timestamp: new Date(),
      sender: message.sender, // 'ASSISTANT' or 'CLIENT'
      senderName: message.senderName || 'Unknown',
      messageType: message.type || 'TEXT', // TEXT, DOCUMENT, LINK, etc.
      content: message.content,
      intent: this._detectIntent(message.content),
      sentiment: this._detectSentiment(message.content),
      attachments: message.attachments || [],
    };

    context.conversationHistory.push(messageRecord);
    context.lastUpdated = new Date();

    // Update metadata
    this._updateMetadata(context, messageRecord);

    // Generate context summary every 5 messages
    if (context.conversationHistory.length % 5 === 0) {
      context.contextSummary = this._generateContextSummary(context);
    }

    return { success: true, messageId: context.conversationHistory.length };
  }

  /**
   * Switch current assistant and prepare handoff
   */
  switchAssistant(
    conversationId: string,
    newAssistantId: string,
    _reason = ''
  ):
    | {
        success: true;
        handoffData: HandoffSummary;
        contextForNewAssistant: PreparedAssistantContext;
      }
    | { error: string } {
    const context = this.conversationContexts.get(conversationId);
    if (!context) {
      return { error: 'Context not found' };
    }

    // Record previous assistant
    if (context.currentAssistant) {
      context.previousAssistants.push({
        assistantId: context.currentAssistant,
        duration:
          context.lastAssistantChange !== undefined ? Date.now() - context.lastAssistantChange : 0,
        timestamp: new Date(),
      });
    }

    context.currentAssistant = newAssistantId;
    context.lastAssistantChange = Date.now();

    // Generate handoff summary
    const handoffSummary = this._generateHandoffSummary(context, newAssistantId);

    return {
      success: true,
      handoffData: handoffSummary,
      contextForNewAssistant: this._prepareContextForAssistant(context, newAssistantId),
    };
  }

  /**
   * Get context for current assistant
   */
  getContextForAssistant(conversationId: string, assistantId: string) {
    const context = this.conversationContexts.get(conversationId);
    if (!context) {
      return { error: 'Context not found' };
    }

    return {
      clientId: context.clientId,
      clientName: context.clientName,
      clientTier: context.clientTier,
      clientPreferences: context.clientPreferences,
      recentConversationSummary: this._getRecentSummary(context, 5), // Last 5 messages
      fullContextSummary: context.contextSummary,
      conversationHistory: context.conversationHistory.slice(-10), // Last 10 messages
      intents: [...new Set(context.metadata.intents)],
      keywords: [...new Set(context.metadata.keywords)],
      complexity: context.metadata.complexity,
      priority: context.metadata.priority,
      suggestions: this._generateSuggestionsForAssistant(context, assistantId),
      warnings: this._getContextWarnings(context),
    };
  }

  _generateContextSummary(context: ConversationContext): string {
    return generateContextSummary(context);
  }

  _generateHandoffSummary(context: ConversationContext, newAssistantId: string): HandoffSummary {
    return buildHandoffSummary(context, newAssistantId);
  }

  _prepareContextForAssistant(
    context: ConversationContext,
    assistantId: string
  ): PreparedAssistantContext {
    return buildPreparedAssistantContext(context, assistantId);
  }

  _detectIntent(content: string): string {
    return detectIntent(content);
  }

  _detectSentiment(content: string): SentimentType {
    return detectSentiment(content);
  }

  _extractKeywords(content: string): string[] {
    return extractKeywords(content);
  }

  _updateMetadata(context: ConversationContext, message: ConversationMessage): void {
    updateContextMetadata(context, message);
  }

  _getRecentSummary(context: ConversationContext, messageCount: number): string {
    return getRecentSummary(context, messageCount);
  }

  _generateSuggestionsForAssistant(context: ConversationContext, assistantId: string): string[] {
    return generateSuggestionsForAssistant(context, assistantId);
  }

  _getContextWarnings(context: ConversationContext): string[] {
    return getContextWarnings(context);
  }

  _determineConversationStage(context: ConversationContext): string {
    return determineConversationStage(context);
  }

  _identifyMainTopic(context: ConversationContext): string {
    return identifyMainTopic(context);
  }

  _extractPendingActions(context: ConversationContext): string[] {
    return extractPendingActions(context);
  }

  _identifyBlockers(context: ConversationContext): string[] {
    return identifyBlockers(context);
  }

  _getAverageSentiment(messages: ConversationMessage[]): SentimentType {
    return getAverageSentiment(messages);
  }

  _generateGreeting(context: ConversationContext, newAssistantId: string): string {
    return generateGreeting(context, newAssistantId);
  }

  /**
   * Clean up old contexts
   */
  cleanupOldContexts(): { deletedCount: number; remaining: number } {
    const now = Date.now();
    let deletedCount = 0;

    for (const [conversationId, context] of this.conversationContexts.entries()) {
      const age = now - context.createdAt.getTime();
      if (age > this.retentionPeriod) {
        this.conversationContexts.delete(conversationId);
        deletedCount++;
      }
    }

    return { deletedCount, remaining: this.conversationContexts.size };
  }

  /**
   * Get context statistics
   */
  getStatistics(): {
    activeContexts: number;
    totalMessages: number;
    averageMessagesPerContext: number;
    retentionPeriodDays: number;
  } {
    let totalMessages = 0;
    const totalContexts = this.conversationContexts.size;
    let avgMessagesPerContext = 0;

    for (const context of this.conversationContexts.values()) {
      totalMessages += context.conversationHistory.length;
    }

    if (totalContexts > 0) {
      avgMessagesPerContext = Math.round(totalMessages / totalContexts);
    }

    return {
      activeContexts: totalContexts,
      totalMessages,
      averageMessagesPerContext: avgMessagesPerContext,
      retentionPeriodDays: this.retentionPeriod / (24 * 60 * 60 * 1000),
    };
  }
}
