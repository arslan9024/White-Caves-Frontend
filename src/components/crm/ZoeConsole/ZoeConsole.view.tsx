/**
 * Zoe Console — View Layer (Mary Allen Wilkes Architecture)
 * Unified orchestrator for Zoe AI console chat interface, speech, and message list
 * Strictly < 350 lines
 */

import React from 'react';
import { Bot, Send, Loader2 } from 'lucide-react';
import type { ZoeConsoleProps } from './ZoeConsole.types';
import { useZoeConsoleLogic } from './ZoeConsole.logic';
import {
  MessageBubble,
  ConsoleHeaderPanel,
  HistorySidebarPanel,
  QuickActionsBar,
} from './ZoeConsole.panels';
import '../ZoeConsole.css';

export const ZoeConsole: React.FC<ZoeConsoleProps> = () => {
  const {
    messages,
    inputValue,
    setInputValue,
    isLoading,
    showHistory,
    setShowHistory,
    conversationHistory,
    voiceSpeechEnabled,
    setVoiceSpeechEnabled,
    messagesEndRef,
    inputRef,
    sendMessage,
    toggleHistory,
    clearConversation,
    liveCampaignTelemetry,
    hotLeadEscalations,
  } = useZoeConsoleLogic();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    void sendMessage(inputValue);
  };

  const handleSelectQuery = (query: string) => {
    void sendMessage(query);
    setShowHistory(false);
  };

  return (
    <div className="zoe-console">
      <ConsoleHeaderPanel
        voiceSpeechEnabled={voiceSpeechEnabled}
        setVoiceSpeechEnabled={setVoiceSpeechEnabled}
        showHistory={showHistory}
        toggleHistory={toggleHistory}
        clearConversation={clearConversation}
      />

      <div className="console-body">
        {showHistory && (
          <HistorySidebarPanel
            conversationHistory={conversationHistory}
            onSelectQuery={handleSelectQuery}
            onClose={() => setShowHistory(false)}
          />
        )}

        <div className="chat-area">
          <QuickActionsBar onSelectQuery={handleSelectQuery} isLoading={isLoading} />

          {(liveCampaignTelemetry || hotLeadEscalations.length > 0) && (
            <div
              data-testid="zoe-live-telemetry-banner"
              style={{
                margin: '8px 16px 0',
                padding: '10px 14px',
                borderRadius: 8,
                background: 'rgba(239, 68, 68, 0.08)',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                display: 'flex',
                flexWrap: 'wrap',
                gap: 12,
                alignItems: 'center',
                justifyContent: 'space-between',
                fontSize: 12,
              }}
            >
              {liveCampaignTelemetry && (
                <div>
                  <strong>📡 {liveCampaignTelemetry.campaignName}:</strong>{' '}
                  {liveCampaignTelemetry.totalDispatched}/{liveCampaignTelemetry.dailyTarget} sent ·{' '}
                  {liveCampaignTelemetry.skipped} skipped ({liveCampaignTelemetry.status})
                </div>
              )}
              {hotLeadEscalations.length > 0 && (
                <div style={{ color: '#EF4444', fontWeight: 700 }}>
                  🔥 {hotLeadEscalations.length} HOT_LEAD Escalation(s) — Latest:{' '}
                  {hotLeadEscalations[0].name} ({hotLeadEscalations[0].project})
                </div>
              )}
            </div>
          )}

          <div className="messages-container">
            {messages.map(message => (
              <MessageBubble key={message.id} message={message} isUser={message.isUser} />
            ))}
            {isLoading && (
              <div className="message-bubble assistant loading">
                <div className="message-avatar">
                  <Bot size={18} />
                </div>
                <div className="message-content">
                  <div className="typing-indicator">
                    <Loader2 size={16} className="spinning" />
                    <span>Zoe is thinking...</span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form className="input-area" onSubmit={handleSubmit}>
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
              placeholder="Ask Zoe anything about the company..."
              disabled={isLoading}
            />
            <button type="submit" className="send-btn" disabled={!inputValue.trim() || isLoading}>
              {isLoading ? <Loader2 size={18} className="spinning" /> : <Send size={18} />}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ZoeConsole;
