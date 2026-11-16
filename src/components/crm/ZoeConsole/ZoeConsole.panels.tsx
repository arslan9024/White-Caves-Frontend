/**
 * Zoe Console — Panels Layer (Mary Allen Wilkes Architecture)
 * Subcomponents for Message Bubble formatting, Header, History Sidebar, and Quick Actions
 * Strictly < 350 lines
 */

import React from 'react';
import {
  Bot,
  User,
  Sparkles,
  Clock,
  History,
  Trash2,
  Volume2,
  VolumeX,
  Loader2,
  Send,
} from 'lucide-react';
import type { ConsoleMessage, HistoryItem, QuickActionItem } from './ZoeConsole.types';
import { QUICK_ACTIONS } from './ZoeConsole.types';

export const MessageBubble: React.FC<{ message: ConsoleMessage; isUser: boolean }> = ({
  message,
  isUser,
}) => {
  const formatResponse = (text: string) => {
    return text.split('\n').map((line, i) => {
      if (line.startsWith('**') && line.endsWith('**')) {
        return (
          <h4 key={i} className="response-heading">
            {line.replace(/\*\*/g, '')}
          </h4>
        );
      }
      if (line.startsWith('• **')) {
        const parts = line.replace('• **', '').split('**');
        return (
          <div key={i} className="response-item">
            <span className="item-bullet">•</span>
            <strong>{parts[0]}</strong>
            {parts[1]}
          </div>
        );
      }
      if (line.startsWith('• ')) {
        return (
          <div key={i} className="response-item">
            <span className="item-bullet">•</span>
            {line.replace('• ', '')}
          </div>
        );
      }
      if (line.match(/^\d+\.\s\*\*/)) {
        const match = line.match(/^(\d+)\.\s\*\*([^*]+)\*\*\s*-?\s*(.*)/);
        if (match) {
          return (
            <div key={i} className="response-step">
              <span className="step-number">{match[1]}</span>
              <div className="step-content">
                <strong>{match[2]}</strong>
                {match[3] && <span className="step-desc"> - {match[3]}</span>}
              </div>
            </div>
          );
        }
      }
      if (line.includes('**')) {
        const parts = line.split(/\*\*([^*]+)\*\*/g);
        return (
          <p key={i} className="response-paragraph">
            {parts.map((part, j) => (j % 2 === 1 ? <strong key={j}>{part}</strong> : part))}
          </p>
        );
      }
      if (line.trim()) {
        return (
          <p key={i} className="response-paragraph">
            {line}
          </p>
        );
      }
      return null;
    });
  };

  return (
    <div className={`message-bubble ${isUser ? 'user' : 'assistant'}`}>
      <div className="message-avatar">{isUser ? <User size={18} /> : <Bot size={18} />}</div>
      <div className="message-content">
        {isUser ? (
          <p>{message.text}</p>
        ) : (
          <div className="formatted-response">{formatResponse(message.text)}</div>
        )}
        <div className="message-meta">
          <Clock size={12} />
          <span>
            {new Date(message.timestamp).toLocaleTimeString('en-AE', {
              hour: '2-digit',
              minute: '2-digit',
              hour12: true,
            })}
          </span>
          {!isUser && message.confidence !== undefined && (
            <span className="confidence-badge">
              <Sparkles size={12} />
              {Math.round(message.confidence * 100)}%
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export const ConsoleHeaderPanel: React.FC<{
  voiceSpeechEnabled: boolean;
  setVoiceSpeechEnabled: React.Dispatch<React.SetStateAction<boolean>>;
  showHistory: boolean;
  toggleHistory: () => void;
  clearConversation: () => void;
}> = ({
  voiceSpeechEnabled,
  setVoiceSpeechEnabled,
  showHistory,
  toggleHistory,
  clearConversation,
}) => (
  <div className="console-header">
    <div className="console-title">
      <div className="zoe-avatar">
        <Bot size={24} />
      </div>
      <div className="title-text">
        <h3>Zoe AI Console</h3>
        <span className="status-indicator">
          <span className="status-dot"></span>
          Online
        </span>
      </div>
    </div>
    <div className="console-actions">
      <button
        className={`action-btn ${voiceSpeechEnabled ? 'active' : ''}`}
        onClick={() => setVoiceSpeechEnabled(prev => !prev)}
        title={voiceSpeechEnabled ? 'Mute Zoe Voice' : 'Unmute Zoe Voice'}
        data-testid="toggle-voice-btn"
      >
        {voiceSpeechEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
      </button>
      <button
        className={`action-btn ${showHistory ? 'active' : ''}`}
        onClick={toggleHistory}
        title="View History"
      >
        <History size={18} />
      </button>
      <button className="action-btn" onClick={clearConversation} title="Clear Conversation">
        <Trash2 size={18} />
      </button>
    </div>
  </div>
);

export const HistorySidebarPanel: React.FC<{
  conversationHistory: HistoryItem[];
  onSelectQuery: (q: string) => void;
  onClose: () => void;
}> = ({ conversationHistory, onSelectQuery, onClose }) => (
  <div className="history-sidebar">
    <div className="history-header">
      <h4>
        <History size={16} /> Recent Queries
      </h4>
      <button onClick={onClose}>×</button>
    </div>
    <div className="history-list">
      {conversationHistory.length === 0 ? (
        <p className="no-history">No previous queries</p>
      ) : (
        conversationHistory.map((item, index) => (
          <div key={index} className="history-item" onClick={() => onSelectQuery(item.query)}>
            <span className="history-query">{item.query}</span>
            <span className="history-intent">{item.intent}</span>
          </div>
        ))
      )}
    </div>
  </div>
);

export const QuickActionsBar: React.FC<{
  onSelectQuery: (q: string) => void;
  isLoading: boolean;
}> = ({ onSelectQuery, isLoading }) => (
  <div className="quick-actions">
    {QUICK_ACTIONS.map(action => (
      <button
        key={action.id}
        className="quick-action-btn"
        onClick={() => onSelectQuery(action.query)}
        disabled={isLoading}
      >
        <action.icon size={14} />
        {action.label}
      </button>
    ))}
  </div>
);

