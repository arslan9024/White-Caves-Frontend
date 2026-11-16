/**
 * Right AI Sidebar — Panels Layer (Mary Allen Wilkes Architecture)
 * Subcomponents for Sidebar Header, Contextual Section, Chat Panel, and Departments List
 * Strictly < 350 lines
 */

import React from 'react';
import {
  MessageSquare,
  Send,
  Zap,
  Phone,
  FileText,
  Settings,
  Star,
  Search,
  X,
  ChevronDown,
  Sparkles,
  Clock,
} from 'lucide-react';
import { DEPARTMENTS } from '../../../../config/assistantRegistry';
import { COLOR_TOKENS } from '../../../../styles/design-tokens/colors';
import type { ChatMessage, AssistantInfo } from './RightAISidebar.types';

export const SidebarHeaderPanel: React.FC<{
  totalAssistants: number;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  setShowSearch: (show: boolean) => void;
}> = ({ totalAssistants, searchQuery, setSearchQuery, setShowSearch }) => (
  <div className="sidebar-header-enhanced">
    <div className="header-top">
      <h2 className="header-title" style={{ color: COLOR_TOKENS.primary.red }}>
        <Sparkles size={18} style={{ marginRight: '8px' }} />
        AI Command Center
      </h2>
      <span className="assistant-count-badge">{totalAssistants}</span>
    </div>
    <p className="header-subtitle">
      All specialized assistants across {Object.keys(DEPARTMENTS).length} departments
    </p>

    <div className="smart-search-wrapper">
      <Search size={16} className="search-icon" />
      <input
        type="text"
        placeholder="Search by name, role, or capability..."
        value={searchQuery}
        onChange={e => setSearchQuery(e.target.value)}
        onFocus={() => setShowSearch(true)}
        onBlur={() => setTimeout(() => setShowSearch(false), 200)}
        className="smart-search-input"
        style={{
          borderColor: searchQuery ? COLOR_TOKENS.primary.red : undefined,
          boxShadow: searchQuery ? `0 0 0 2px ${COLOR_TOKENS.accent.redVeryLight}` : undefined,
        }}
      />
      {searchQuery && (
        <button
          className="clear-search-btn"
          onClick={() => setSearchQuery('')}
          style={{ color: COLOR_TOKENS.primary.red }}
        >
          <X size={16} />
        </button>
      )}
    </div>
  </div>
);

export const ContextualAssistantsPanel: React.FC<{
  contextualAssistants: string[];
  allAssistants: AssistantInfo[];
  activeAssistant: string;
  selectAssistant: (id: string) => void;
  setShowChat: (show: boolean) => void;
}> = ({ contextualAssistants, allAssistants, activeAssistant, selectAssistant, setShowChat }) => (
  <div
    className="contextual-section-enhanced"
    style={{ borderLeftColor: COLOR_TOKENS.primary.red }}
  >
    <div className="contextual-header">
      <Sparkles size={14} style={{ color: COLOR_TOKENS.primary.red }} />
      <p className="contextual-label">Recommended for this object:</p>
    </div>
    <div className="contextual-assistants-enhanced">
      {contextualAssistants.slice(0, 3).map(assistantId => {
        const assistant = allAssistants.find(a => a.id === assistantId);
        return assistant ? (
          <button
            key={assistantId}
            className="contextual-btn-enhanced"
            onClick={() => {
              selectAssistant(assistantId);
              setShowChat(true);
            }}
            title={assistant.name}
            style={{
              borderColor: COLOR_TOKENS.primary.red,
              backgroundColor:
                activeAssistant === assistantId ? COLOR_TOKENS.accent.redVeryLight : 'transparent',
            }}
          >
            <span className="contextual-avatar">{assistant.avatar}</span>
            <div className="contextual-info">
              <span className="contextual-name">{assistant.name}</span>
              <span className="contextual-role">{assistant.title}</span>
            </div>
          </button>
        ) : null;
      })}
    </div>
  </div>
);

export const ChatViewPanel: React.FC<{
  selectedAssistant: AssistantInfo;
  chatMessages: ChatMessage[];
  newMessage: string;
  setNewMessage: (msg: string) => void;
  handleSendMessage: (e: React.FormEvent) => void;
}> = ({ selectedAssistant, chatMessages, newMessage, setNewMessage, handleSendMessage }) => (
  <div className="chat-view-enhanced">
    <div className="assistant-card-header" style={{ borderTopColor: COLOR_TOKENS.primary.red }}>
      <div className="assistant-avatar-large">{selectedAssistant.avatar}</div>
      <div className="assistant-header-info">
        <h3 style={{ color: COLOR_TOKENS.primary.red }}>{selectedAssistant.name}</h3>
        <p className="assistant-role">{selectedAssistant.title}</p>
        <div className="assistant-status-row">
          <span
            className="status-indicator online"
            style={{ backgroundColor: COLOR_TOKENS.status.success }}
          ></span>
          <span className="status-text">Online</span>
          <span className="response-time">
            <Clock size={12} /> ~30s response
          </span>
        </div>
      </div>
    </div>

    <div className="assistant-meta">
      <div
        className="dept-badge"
        style={{
          backgroundColor: COLOR_TOKENS.accent.redVeryLight,
          color: COLOR_TOKENS.primary.red,
          borderColor: COLOR_TOKENS.primary.red,
        }}
      >
        {selectedAssistant.department}
      </div>
      <div className="quick-actions-enhanced">
        <button
          className="action-btn-enhanced"
          title="Quick Call"
          style={{ color: COLOR_TOKENS.primary.red }}
        >
          <Phone size={16} />
        </button>
        <button
          className="action-btn-enhanced"
          title="View Documents"
          style={{ color: COLOR_TOKENS.primary.red }}
        >
          <FileText size={16} />
        </button>
        <button
          className="action-btn-enhanced"
          title="Settings"
          style={{ color: COLOR_TOKENS.primary.red }}
        >
          <Settings size={16} />
        </button>
      </div>
    </div>

    <div className="chat-messages-enhanced">
      {chatMessages.length === 0 ? (
        <div className="empty-chat-enhanced">
          <div className="empty-icon">{selectedAssistant.avatar}</div>
          <p className="empty-title">Start a conversation with {selectedAssistant.name}</p>
          <p className="empty-subtitle">
            {selectedAssistant.description ||
              `Ask anything related to ${selectedAssistant.title.toLowerCase()}`}
          </p>
        </div>
      ) : (
        chatMessages.map(msg => (
          <div key={msg.id} className={`message-enhanced ${msg.role}`}>
            <div className="message-bubble">
              <p>{msg.content}</p>
              <span className="message-time">{msg.timestamp}</span>
            </div>
          </div>
        ))
      )}
    </div>

    <form className="chat-input-form-enhanced" onSubmit={handleSendMessage}>
      <input
        type="text"
        className="chat-input-enhanced"
        placeholder={`Ask ${selectedAssistant.name}...`}
        value={newMessage}
        onChange={e => setNewMessage(e.target.value)}
        style={{
          borderColor: newMessage ? COLOR_TOKENS.primary.red : undefined,
        }}
      />
      <button
        type="submit"
        className="send-btn-enhanced"
        disabled={!newMessage.trim()}
        style={{
          backgroundColor: newMessage.trim()
            ? COLOR_TOKENS.primary.red
            : COLOR_TOKENS.secondary.mediumGray,
          color: COLOR_TOKENS.secondary.white,
        }}
      >
        <Send size={16} />
      </button>
    </form>
  </div>
);

