/**
 * Linda WhatsApp Dashboard — View Layer (Mary Allen Wilkes Architecture)
 * Root orchestrator component coordinating header, conversations list, message thread, and modal
 * Strictly < 350 lines
 */

import React from 'react';
import { MessageCircle } from 'lucide-react';
import { useLindaWhatsAppDashboardLogic } from './LindaWhatsAppDashboard.logic';
import {
  ConversationsListPanel,
  MessagesThreadPanel,
  QuickAddOpportunityModal,
} from './LindaWhatsAppDashboard.panels';
import '../LindaWhatsAppDashboard.css';

export const LindaWhatsAppDashboard: React.FC = () => {
  const {
    selectedConversation,
    setSelectedConversation,
    messages,
    searchTerm,
    setSearchTerm,
    messageInput,
    setMessageInput,
    filterStatus,
    setFilterStatus,
    showOpportunity,
    setShowOpportunity,
    selectedOpportunity,
    loading,
    filteredConversations,
    handleSendMessage,
    handleQuickAddOpportunity,
    handleConfirmAddToMary,
  } = useLindaWhatsAppDashboardLogic();

  return (
    <div className="linda-dashboard">
      <div className="linda-header">
        <div className="linda-header-content">
          <div className="linda-title">
            <MessageCircle size={24} />
            <h1>Linda WhatsApp Web</h1>
          </div>
          <p className="linda-subtitle">WhatsApp conversation analysis & property sourcing</p>
        </div>
      </div>

      <div className="linda-container">
        <ConversationsListPanel
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filterStatus={filterStatus}
          setFilterStatus={setFilterStatus}
          filteredConversations={filteredConversations}
          selectedConversation={selectedConversation}
          setSelectedConversation={setSelectedConversation}
          loading={loading}
        />

        <MessagesThreadPanel
          selectedConversation={selectedConversation}
          loading={loading}
          messages={messages}
          messageInput={messageInput}
          setMessageInput={setMessageInput}
          handleSendMessage={handleSendMessage}
          handleQuickAddOpportunity={handleQuickAddOpportunity}
        />
      </div>

      {showOpportunity && selectedOpportunity && (
        <QuickAddOpportunityModal
          opportunity={selectedOpportunity}
          onClose={() => setShowOpportunity(false)}
          onConfirm={handleConfirmAddToMary}
        />
      )}
    </div>
  );
};

export default LindaWhatsAppDashboard;
