/**
 * Linda WhatsApp Dashboard — View Layer (Mary Allen Wilkes Architecture)
 * Root orchestrator component coordinating header, conversations list, message thread, and modal
 * Strictly < 350 lines
 */

import React from 'react';
import { Flame, MessageCircle, Radio, X } from 'lucide-react';
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
    hotLeadAlert,
    dismissHotLeadAlert,
    campaignMetrics,
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
        {campaignMetrics && (
          <div className="linda-campaign-metrics" data-testid="linda-campaign-metrics">
            <Radio size={16} />
            <span>
              <strong>{campaignMetrics.campaignName}</strong> ({campaignMetrics.status}) — Dispatched:{' '}
              {campaignMetrics.totalDispatched}/{campaignMetrics.dailyTarget} | Skipped:{' '}
              {campaignMetrics.skipped}
            </span>
          </div>
        )}
      </div>

      {hotLeadAlert && (
        <div className="linda-hot-lead-toast" role="alert" data-testid="linda-hot-lead-toast">
          <Flame size={18} />
          <div>
            <strong>HOT LEAD: {hotLeadAlert.name}</strong> ({hotLeadAlert.phone}) —{' '}
            {hotLeadAlert.project}
            {hotLeadAlert.unit ? ` • ${hotLeadAlert.unit}` : ''} ({hotLeadAlert.confidence}%
            confidence): {hotLeadAlert.inquiry}
          </div>
          <button
            type="button"
            aria-label="Dismiss hot lead alert"
            onClick={dismissHotLeadAlert}
          >
            <X size={16} />
          </button>
        </div>
      )}

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

