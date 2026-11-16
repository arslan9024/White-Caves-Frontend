/**
 * Linda WhatsApp Dashboard — Panels Layer (Mary Allen Wilkes Architecture)
 * Subcomponents for Conversations List, Messages Thread, and Opportunity Quick Add Modal
 * Strictly < 350 lines
 */

import React from 'react';
import { MessageCircle, Search, Send, Phone, Video, MapPin, Zap, X } from 'lucide-react';
import type {
  ConversationItem,
  ChatMessageItem,
  PropertyOpportunity,
  FilterStatus,
} from './LindaWhatsAppDashboard.types';

export const ConversationsListPanel: React.FC<{
  searchTerm: string;
  setSearchTerm: (s: string) => void;
  filterStatus: FilterStatus;
  setFilterStatus: (f: FilterStatus) => void;
  filteredConversations: ConversationItem[];
  selectedConversation: ConversationItem | null;
  setSelectedConversation: (c: ConversationItem) => void;
  loading: boolean;
}> = ({
  searchTerm,
  setSearchTerm,
  filterStatus,
  setFilterStatus,
  filteredConversations,
  selectedConversation,
  setSelectedConversation,
  loading,
}) => (
  <div className="linda-conversations-panel">
    <div className="linda-search-box">
      <Search size={18} />
      <input
        type="text"
        placeholder="Search conversations..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        className="linda-search-input"
      />
    </div>

    <div className="linda-filter-tabs">
      <button
        className={`filter-tab ${filterStatus === 'all' ? 'active' : ''}`}
        onClick={() => setFilterStatus('all')}
      >
        All
      </button>
      <button
        className={`filter-tab ${filterStatus === 'opportunity' ? 'active' : ''}`}
        onClick={() => setFilterStatus('opportunity')}
      >
        <Zap size={14} /> Opportunity
      </button>
      <button
        className={`filter-tab ${filterStatus === 'unread' ? 'active' : ''}`}
        onClick={() => setFilterStatus('unread')}
      >
        Unread
      </button>
    </div>

    <div className="linda-conversations-list">
      {loading ? (
        <div className="loading-placeholder">Loading conversations...</div>
      ) : filteredConversations.length === 0 ? (
        <div className="empty-state">No conversations found</div>
      ) : (
        filteredConversations.map(conv => (
          <div
            key={conv.id}
            className={`conversation-item ${selectedConversation?.id === conv.id ? 'active' : ''} ${conv.hasOpportunity ? 'has-opportunity' : ''}`}
            onClick={() => setSelectedConversation(conv)}
          >
            <div className="conversation-avatar">{conv.name.charAt(0).toUpperCase()}</div>
            <div className="conversation-content">
              <div className="conversation-header">
                <h3 className="conversation-name">{conv.name}</h3>
                <span className="conversation-time">{conv.lastMessageTime}</span>
              </div>
              <p className="conversation-preview">{conv.lastMessage}</p>
            </div>
            {conv.unread > 0 && <div className="unread-badge">{conv.unread}</div>}
            {conv.hasOpportunity && (
              <div
                className="opportunity-indicator"
                title={`Confidence: ${conv.opportunityConfidence}%`}
              >
                <Zap size={14} />
                {conv.opportunityConfidence}%
              </div>
            )}
          </div>
        ))
      )}
    </div>
  </div>
);

export const MessagesThreadPanel: React.FC<{
  selectedConversation: ConversationItem | null;
  loading: boolean;
  messages: ChatMessageItem[];
  messageInput: string;
  setMessageInput: (val: string) => void;
  handleSendMessage: () => void;
  handleQuickAddOpportunity: (opp: PropertyOpportunity) => void;
}> = ({
  selectedConversation,
  loading,
  messages,
  messageInput,
  setMessageInput,
  handleSendMessage,
  handleQuickAddOpportunity,
}) => (
  <div className="linda-messages-panel">
    {selectedConversation ? (
      <>
        <div className="message-header">
          <div className="message-contact-info">
            <div className="contact-avatar">
              {selectedConversation.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <h2>{selectedConversation.name}</h2>
              <p className="contact-phone">{selectedConversation.phone}</p>
            </div>
          </div>
          <div className="message-actions">
            <button className="action-btn" title="Call">
              <Phone size={18} />
            </button>
            <button className="action-btn" title="Video call">
              <Video size={18} />
            </button>
            <button className="action-btn" title="Location">
              <MapPin size={18} />
            </button>
          </div>
        </div>

        <div className="messages-thread">
          {loading ? (
            <div className="loading-messages">Loading messages...</div>
          ) : (
            messages.map(msg => (
              <div key={msg.id} className={`message ${msg.isMe ? 'outgoing' : 'incoming'}`}>
                <div className="message-bubble">
                  <p>{msg.content}</p>
                  <span className="message-time">{msg.timestamp}</span>
                </div>

                {msg.hasOpportunity && msg.opportunity && (
                  <div className="opportunity-card">
                    <div className="opportunity-header">
                      <h4>Property Opportunity Detected</h4>
                      <div
                        className="confidence-badge"
                        style={{
                          backgroundColor:
                            msg.opportunity.confidence >= 80
                              ? '#10B981'
                              : msg.opportunity.confidence >= 60
                                ? '#F59E0B'
                                : '#EF4444',
                        }}
                      >
                        {msg.opportunity.confidence}% Confidence
                      </div>
                    </div>

                    <div className="opportunity-details">
                      <div className="detail-row">
                        <span className="label">Type:</span>
                        <span className="value">{msg.opportunity.type}</span>
                      </div>
                      <div className="detail-row">
                        <span className="label">Location:</span>
                        <span className="value">{msg.opportunity.location}</span>
                      </div>
                      <div className="detail-row">
                        <span className="label">Bedrooms:</span>
                        <span className="value">{msg.opportunity.bedrooms}</span>
                      </div>
                      <div className="detail-row">
                        <span className="label">Price:</span>
                        <span className="value">
                          AED {msg.opportunity.price.toLocaleString()} {msg.opportunity.frequency}
                        </span>
                      </div>
                      <div className="detail-row">
                        <span className="label">Status:</span>
                        <span className="value">
                          {msg.opportunity.availability.replace(/_/g, ' ')}
                        </span>
                      </div>
                      <div className="detail-row">
                        <span className="label">Furnishing:</span>
                        <span className="value">{msg.opportunity.furnishing}</span>
                      </div>
                      <div className="detail-row">
                        <span className="label">Features:</span>
                        <div className="features-list">
                          {msg.opportunity.features.map((f, i) => (
                            <span key={i} className="feature-tag">
                              {f}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <button
                      className="quick-add-btn"
                      onClick={() => handleQuickAddOpportunity(msg.opportunity!)}
                    >
                      <Zap size={16} /> Quick Add to Mary
                    </button>
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        <div className="message-input-area">
          <input
            type="text"
            placeholder="Type a message..."
            value={messageInput}
            onChange={e => setMessageInput(e.target.value)}
            onKeyPress={e => e.key === 'Enter' && handleSendMessage()}
            className="message-input"
          />
          <button className="send-btn" onClick={handleSendMessage}>
            <Send size={18} />
          </button>
        </div>
      </>
    ) : (
      <div className="empty-message-panel">
        <MessageCircle size={48} />
        <h3>Select a conversation to view messages</h3>
        <p>Choose a conversation from the list to view messages and opportunities</p>
      </div>
    )}
  </div>
);

export const QuickAddOpportunityModal: React.FC<{
  opportunity: PropertyOpportunity;
  onClose: () => void;
  onConfirm: () => void;
}> = ({ opportunity, onClose, onConfirm }) => (
  <div className="modal-overlay" onClick={onClose}>
    <div className="modal-content" onClick={e => e.stopPropagation()}>
      <div className="modal-header">
        <h3>Quick Add Property to Mary</h3>
        <button className="close-btn" onClick={onClose}>
          <X size={20} />
        </button>
      </div>

      <div className="modal-body">
        <div className="extraction-preview">
          <h4>Extracted Information</h4>
          <div className="preview-grid">
            <div className="preview-field">
              <label>Property Type</label>
              <p>{opportunity.type}</p>
            </div>
            <div className="preview-field">
              <label>Location</label>
              <p>{opportunity.location}</p>
            </div>
            <div className="preview-field">
              <label>Bedrooms</label>
              <p>{opportunity.bedrooms}</p>
            </div>
            <div className="preview-field">
              <label>Price (Monthly)</label>
              <p>AED {opportunity.price.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="form-section">
          <h4>Additional Details</h4>
          <div className="form-group">
            <label>Furnished Status</label>
            <select defaultValue={opportunity.furnishing} className="form-input">
              <option>furnished</option>
              <option>semi_furnished</option>
              <option>unfurnished</option>
            </select>
          </div>
          <div className="form-group">
            <label>Owner Relationship Type</label>
            <select className="form-input">
              <option>direct_owner</option>
              <option>property_manager</option>
              <option>broker</option>
            </select>
          </div>
          <div className="form-group">
            <label>Publish immediately</label>
            <input type="checkbox" defaultChecked className="form-checkbox" />
          </div>
        </div>
      </div>

      <div className="modal-footer">
        <button className="btn-cancel" onClick={onClose}>
          Cancel
        </button>
        <button className="btn-confirm" onClick={onConfirm}>
          Add to Mary Inventory
        </button>
      </div>
    </div>
  </div>
);

