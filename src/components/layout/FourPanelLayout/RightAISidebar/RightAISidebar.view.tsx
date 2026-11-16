/**
 * Right AI Sidebar — View Layer (Mary Allen Wilkes Architecture)
 * Unified orchestrator for Right AI Sidebar Command Center
 * Strictly < 350 lines
 */

import React from 'react';
import { MessageSquare, Zap, Star, ChevronDown } from 'lucide-react';
import { COLOR_TOKENS } from '../../../../styles/design-tokens/colors';
import type { RightAISidebarProps } from './RightAISidebar.types';
import { useRightAISidebarLogic } from './RightAISidebar.logic';
import {
  SidebarHeaderPanel,
  ContextualAssistantsPanel,
  ChatViewPanel,
} from './RightAISidebar.panels';
import '../RightAISidebar.enhanced.css';

export const RightAISidebar: React.FC<RightAISidebarProps> = ({
  activeAssistant: initialActive,
}) => {
  const {
    activeAssistant,
    selectedAssistant,
    chatMessages,
    newMessage,
    setNewMessage,
    searchQuery,
    setSearchQuery,
    showChat,
    setShowChat,
    expandedDepts,
    favorites,
    setShowSearch,
    sortBy,
    setSortBy,
    allAssistants,
    selectedObject,
    contextualAssistants,
    assistantsByDept,
    searchResults,
    toggleFavorite,
    selectAssistant,
    toggleDepartment,
    getDeptColor,
    getAssistantStatus,
    handleSendMessage,
    liveCampaignTelemetry,
    hotLeadEscalations,
  } = useRightAISidebarLogic(initialActive);

  const totalAssistants = allAssistants.length;
  const favoritesCount = favorites.length;

  return (
    <div className="right-sidebar-content enhanced-ai-command-center">
      <SidebarHeaderPanel
        totalAssistants={totalAssistants}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        setShowSearch={setShowSearch}
      />

      {(liveCampaignTelemetry || hotLeadEscalations.length > 0) && (
        <div
          data-testid="sidebar-linda-telemetry"
          style={{
            margin: '0 12px 8px',
            padding: '8px 10px',
            borderRadius: 8,
            background: 'rgba(239, 68, 68, 0.08)',
            border: '1px solid rgba(239, 68, 68, 0.28)',
            fontSize: 11,
            lineHeight: 1.4,
          }}
        >
          {liveCampaignTelemetry && (
            <div style={{ fontWeight: 600 }}>
              📡 Vardon Campaign: {liveCampaignTelemetry.totalDispatched}/
              {liveCampaignTelemetry.dailyTarget} sent ({liveCampaignTelemetry.status})
            </div>
          )}
          {hotLeadEscalations.length > 0 && (
            <div style={{ color: COLOR_TOKENS.primary.red, fontWeight: 700, marginTop: 2 }}>
              🔥 HOT_LEAD [{hotLeadEscalations[0].category}]: {hotLeadEscalations[0].name} (
              {hotLeadEscalations[0].project})
            </div>
          )}
        </div>
      )}

      {selectedObject && contextualAssistants.length > 0 && (
        <ContextualAssistantsPanel
          contextualAssistants={contextualAssistants}
          allAssistants={allAssistants}
          activeAssistant={activeAssistant}
          selectAssistant={selectAssistant}
          setShowChat={setShowChat}
        />
      )}

      <div className="sidebar-tabs-enhanced">
        <button
          className={`tab-enhanced ${showChat ? 'active' : ''}`}
          onClick={() => setShowChat(true)}
          style={{
            color: showChat ? COLOR_TOKENS.primary.red : undefined,
            borderBottomColor: showChat ? COLOR_TOKENS.primary.red : 'transparent',
          }}
        >
          <MessageSquare size={16} />
          <span>Chat</span>
        </button>
        <button
          className={`tab-enhanced ${!showChat ? 'active' : ''}`}
          onClick={() => setShowChat(false)}
          style={{
            color: !showChat ? COLOR_TOKENS.primary.red : undefined,
            borderBottomColor: !showChat ? COLOR_TOKENS.primary.red : 'transparent',
          }}
        >
          <Zap size={16} />
          <span>All ({totalAssistants})</span>
        </button>
        {favoritesCount > 0 && (
          <button
            className={`tab-enhanced ${sortBy === 'favorites' ? 'active' : ''}`}
            onClick={() => setSortBy(sortBy === 'favorites' ? 'department' : 'favorites')}
            style={{
              color: sortBy === 'favorites' ? COLOR_TOKENS.primary.red : undefined,
              borderBottomColor: sortBy === 'favorites' ? COLOR_TOKENS.primary.red : 'transparent',
            }}
          >
            <Star size={16} />
            <span>Favorites ({favoritesCount})</span>
          </button>
        )}
      </div>

      {showChat && selectedAssistant && (
        <ChatViewPanel
          selectedAssistant={selectedAssistant}
          chatMessages={chatMessages}
          newMessage={newMessage}
          setNewMessage={setNewMessage}
          handleSendMessage={handleSendMessage}
        />
      )}

      {!showChat && (
        <div className="assistants-list-view-enhanced">
          {searchQuery && (
            <div className="search-results-section">
              <div className="search-results-header">
                <p className="search-results-title">Search Results ({searchResults.length})</p>
              </div>
              <div className="search-results-list">
                {searchResults.length === 0 ? (
                  <p className="no-results">No assistants match your search</p>
                ) : (
                  searchResults.map(assistant => (
                    <button
                      key={assistant.id}
                      className={`assistant-item-enhanced ${activeAssistant === assistant.id ? 'active' : ''}`}
                      onClick={() => selectAssistant(assistant.id)}
                      style={{
                        borderLeftColor:
                          activeAssistant === assistant.id
                            ? COLOR_TOKENS.primary.red
                            : 'transparent',
                        backgroundColor:
                          activeAssistant === assistant.id
                            ? COLOR_TOKENS.accent.redVeryLight
                            : 'transparent',
                      }}
                    >
                      <span className="assistant-avatar">{assistant.avatar}</span>
                      <div className="assistant-details-enhanced">
                        <p
                          className="assistant-name"
                          style={{
                            color:
                              activeAssistant === assistant.id
                                ? COLOR_TOKENS.primary.red
                                : undefined,
                          }}
                        >
                          {assistant.name}
                        </p>
                        <p className="assistant-title">{assistant.title}</p>
                        <p className="assistant-dept">{assistant.department}</p>
                      </div>
                      <span
                        className="status-dot-enhanced"
                        style={{
                          backgroundColor:
                            getAssistantStatus(assistant.id) === 'online'
                              ? COLOR_TOKENS.status.success
                              : COLOR_TOKENS.secondary.darkGray,
                        }}
                      ></span>
                    </button>
                  ))
                )}
              </div>
            </div>
          )}

          {!searchQuery && (
            <div className="departments-container-enhanced">
              {Object.keys(assistantsByDept).map(dept => {
                const filtered = assistantsByDept[dept] || [];
                const isExpanded = expandedDepts[dept] !== false;

                return (
                  <div key={dept} className="department-group-enhanced">
                    <button
                      className="department-header-enhanced"
                      onClick={() => toggleDepartment(dept)}
                      style={{
                        borderLeftColor: getDeptColor(dept),
                        backgroundColor: isExpanded
                          ? COLOR_TOKENS.accent.redVeryLight
                          : 'transparent',
                      }}
                    >
                      <ChevronDown
                        size={16}
                        style={{
                          transform: isExpanded ? 'rotate(0deg)' : 'rotate(-90deg)',
                          transition: 'transform 200ms cubic-bezier(0.4, 0, 0.2, 1)',
                          color: getDeptColor(dept),
                        }}
                      />
                      <span className="dept-name">
                        {dept.charAt(0).toUpperCase() + dept.slice(1).replace(/([A-Z])/g, ' $1')}
                      </span>
                      <span
                        className="dept-count"
                        style={{ color: getDeptColor(dept), fontWeight: 600 }}
                      >
                        {filtered.length}
                      </span>
                    </button>

                    {isExpanded && (
                      <div className="assistants-in-dept-enhanced">
                        {filtered.map(assistant => (
                          <button
                            key={assistant.id}
                            className={`assistant-item-enhanced ${activeAssistant === assistant.id ? 'active' : ''}`}
                            onClick={() => selectAssistant(assistant.id)}
                            style={{
                              borderLeftColor:
                                activeAssistant === assistant.id
                                  ? COLOR_TOKENS.primary.red
                                  : 'transparent',
                              backgroundColor:
                                activeAssistant === assistant.id
                                  ? COLOR_TOKENS.accent.redVeryLight
                                  : 'transparent',
                            }}
                          >
                            <span className="assistant-avatar">{assistant.avatar}</span>
                            <div className="assistant-details-enhanced">
                              <p
                                className="assistant-name"
                                style={{
                                  color:
                                    activeAssistant === assistant.id
                                      ? COLOR_TOKENS.primary.red
                                      : undefined,
                                }}
                              >
                                {assistant.name}
                              </p>
                              <p className="assistant-title">{assistant.title}</p>
                            </div>
                            <div className="assistant-actions-mini">
                              <button
                                className="favorite-btn"
                                onClick={e => {
                                  e.stopPropagation();
                                  toggleFavorite(assistant.id);
                                }}
                                style={{
                                  color: favorites.includes(assistant.id)
                                    ? COLOR_TOKENS.primary.red
                                    : COLOR_TOKENS.secondary.mediumGray,
                                }}
                              >
                                <Star
                                  size={14}
                                  fill={favorites.includes(assistant.id) ? 'currentColor' : 'none'}
                                />
                              </button>
                              <span
                                className="status-dot-enhanced"
                                style={{
                                  backgroundColor:
                                    getAssistantStatus(assistant.id) === 'online'
                                      ? COLOR_TOKENS.status.success
                                      : COLOR_TOKENS.secondary.darkGray,
                                }}
                              ></span>
                            </div>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default RightAISidebar;

