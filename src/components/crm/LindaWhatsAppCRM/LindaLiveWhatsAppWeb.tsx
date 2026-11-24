// FILE: src/components/crm/LindaWhatsAppCRM/LindaLiveWhatsAppWeb.tsx
/**
 * White Caves Real Estate LLC - Linda Live WhatsApp Web Desk
 * Standard: AEGIS Canonical 12-Way Architecture Standard (<250 lines)
 */

import React, { useState, useMemo, FC } from 'react';
import { useTheme } from '../../../context/ThemeContext';
import { apiClient } from '../../../utils/apiClient';
import type { LindaConversationItem } from './LindaWhatsAppCRM.data';
import { LindaChatListPane } from './LindaChatListPane';
import { LindaChatThreadPane, type ChatMessage } from './LindaChatThreadPane';
import { LindaQuickReplyBar } from './LindaQuickReplyBar';
import { LindaLeadContextPane } from './LindaLeadContextPane';
import { LindaLiveTopBar } from './LindaLiveTopBar';
import { LindaLinkAccountModal } from './LindaLinkAccountModal';
import { useLindaAccountAutoload } from './useLindaAccountAutoload';
import { useLindaLiveHistory } from './useLindaLiveHistory';
import { useLindaLiveSocket } from './useLindaLiveSocket';

export interface LindaLiveWhatsAppWebProps {
  conversations: LindaConversationItem[];
  isLiveConnected?: boolean;
  heartbeatLatency?: number;
  onSendMessage?: (convId: string, text: string) => void;
  onAutoReplyWithAI?: (conv: LindaConversationItem) => void;
}

export const LindaLiveWhatsAppWeb: FC<LindaLiveWhatsAppWebProps> = ({
  conversations,
  isLiveConnected = false,
  heartbeatLatency = 28,
  onSendMessage,
  onAutoReplyWithAI,
}) => {
  const { isDark } = useTheme();
  const [selectedConvId, setSelectedConvId] = useState<string>(conversations[0]?.id || 'conv-1');
  const [chatTypeFilter, setChatTypeFilter] = useState<
    'all' | 'landlords' | 'campaign' | 'direct' | 'groups'
  >('all');
  const [unreadOnly, setUnreadOnly] = useState<boolean>(false);
  const [showContextPane, setShowContextPane] = useState<boolean>(true);
  const [searchFilter, setSearchFilter] = useState('');
  const [inputMessage, setInputMessage] = useState('');
  const [chatMessages, setChatMessages] = useState<Record<string, ChatMessage[]>>({});
  const [showLinkModal, setShowLinkModal] = useState<boolean>(false);
  const [isAiComposing, setIsAiComposing] = useState<boolean>(false);

  const {
    selectedAccount,
    setSelectedAccount,
    accountOptions,
    accountConversations,
    refreshStatuses,
    isLoadingAccount,
  } = useLindaAccountAutoload(conversations, selectedConvId, setSelectedConvId);

  const activePoolConversations = useMemo(() => {
    if (selectedAccount !== 'ALL' && accountConversations[selectedAccount]) {
      return accountConversations[selectedAccount];
    }
    return conversations;
  }, [conversations, selectedAccount, accountConversations]);

  const selectedConv = useMemo(
    () =>
      activePoolConversations.find(c => c.id === selectedConvId) ||
      activePoolConversations[0] ||
      conversations[0],
    [activePoolConversations, selectedConvId, conversations]
  );

  // Modularized hooks
  useLindaLiveHistory(selectedConv, selectedAccount, setChatMessages);
  useLindaLiveSocket(setChatMessages);

  const filteredConversations = useMemo(() => {
    return activePoolConversations.filter(c => {
      if (searchFilter) {
        const q = searchFilter.toLowerCase();
        const matches =
          c.contactName?.toLowerCase().includes(q) ||
          c.phone?.toLowerCase().includes(q) ||
          c.lastMessage?.toLowerCase().includes(q) ||
          c.unit?.toLowerCase().includes(q);
        if (!matches) return false;
      }
      if (selectedAccount !== 'ALL') {
        const cAcc = (c as LindaConversationItem & { accountPhone?: string }).accountPhone;
        if (cAcc && cAcc !== selectedAccount && !selectedAccount.includes(cAcc)) return false;
      }
      if (chatTypeFilter === 'landlords') {
        const isLandlord =
          c.intent === 'LANDLORD_ACQUISITION' ||
          c.intent === 'EJARI_RENEWAL' ||
          c.intent === 'PROPERTY_MGMT' ||
          c.intent === 'RENT' ||
          c.contactName?.toLowerCase().includes('owner') ||
          c.contactName?.toLowerCase().includes('landlord');
        if (!isLandlord) return false;
      }
      if (chatTypeFilter === 'campaign' && !c.isCampaignLead) return false;
      if (chatTypeFilter === 'direct' && c.isGroup) return false;
      if (chatTypeFilter === 'groups' && !c.isGroup) return false;
      if (unreadOnly && (!c.unreadCount || c.unreadCount <= 0)) return false;
      return true;
    });
  }, [activePoolConversations, searchFilter, selectedAccount, chatTypeFilter, unreadOnly]);

  const activeMessages = useMemo(() => {
    if (selectedConv && chatMessages[selectedConv.id]) {
      return chatMessages[selectedConv.id];
    }
    return [
      {
        id: 'seed-1',
        sender: 'client' as const,
        text: `Hi Linda, inquiry regarding ${selectedConv?.unit || 'WC-LUX-402'}. Is this available?`,
        timestamp: '10:41 AM',
      },
      {
        id: 'seed-2',
        sender: 'bot' as const,
        text: `Hello ${selectedConv?.contactName || 'Valued Client'}! Yes, ${selectedConv?.unit || 'Unit 402'} is available. DLD documents ready.`,
        timestamp: '10:42 AM',
        status: 'read' as const,
      },
    ];
  }, [selectedConv, chatMessages]);

  const handleSend = () => {
    if (!inputMessage.trim() || !selectedConv) return;
    const textToSend = inputMessage.trim();
    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'agent',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'sent',
    };

    setChatMessages(prev => ({
      ...prev,
      [selectedConv.id]: [...(prev[selectedConv.id] || activeMessages), newMsg],
    }));
    setInputMessage('');
    onSendMessage?.(selectedConv.id, textToSend);

    if (textToSend.startsWith('/')) {
      apiClient
        .post('/leasing/linda/slash', {
          command: textToSend,
          conversationId: selectedConv.id,
        })
        .then((res: unknown) => {
          const json = res as { data?: { replyText?: string } };
          if (json?.data?.replyText) {
            const botMsg: ChatMessage = {
              id: `slash-${Date.now()}`,
              sender: 'bot',
              text: json.data.replyText,
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              status: 'read',
            };
            setChatMessages(prev => ({
              ...prev,
              [selectedConv.id]: [...(prev[selectedConv.id] || []), botMsg],
            }));
          }
        })
        .catch(() => {});
      return;
    }

    apiClient
      .post(`/linda/send/${encodeURIComponent(selectedConv.id)}`, {
        phoneNumber: selectedConv.phone || selectedConv.id,
        message: textToSend,
        accountPhone: selectedAccount !== 'ALL' ? selectedAccount : undefined,
      })
      .catch(() => {});
  };

  const handleAiDraft = (lang: 'EN' | 'AR' = 'EN') => {
    if (!selectedConv) return;
    setIsAiComposing(true);
    onAutoReplyWithAI?.(selectedConv);
    const aiDraft =
      lang === 'AR'
        ? `مرحباً بك ${selectedConv.contactName || ''}. وايت كيفز العقارية الفاخرة استلمت استفسارك حول ${selectedConv.cluster || 'داماك هيلز 2'}. تفضل بزيارة https://whitecaves.ae لحجز موعد معاينة مع أرسلان مالك.`
        : `Thank you ${selectedConv.contactName}. White Caves Luxury Desk has reviewed your ${selectedConv.cluster || 'DAMAC Hills 2'} inquiry. Visit https://whitecaves.ae to book a private viewing with Arslan Malik.`;

    setInputMessage(aiDraft);
    setTimeout(() => {
      setIsAiComposing(false);
    }, 450);
  };

  const handleHumanTakeover = () => {
    if (!selectedConv) return;
    apiClient
      .post('/leasing/linda/takeover', { conversationId: selectedConv.id, active: true })
      .then((res: unknown) => {
        const json = res as { data?: { expiresAt?: string } };
        const noticeMsg: ChatMessage = {
          id: `takeover-${Date.now()}`,
          sender: 'agent',
          text: `🛡️ 30-Minute Human Takeover Active until ${new Date(
            json?.data?.expiresAt || Date.now() + 1800000
          ).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })}. Linda automated bot replies are paused on this thread.`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          status: 'read',
        };
        setChatMessages(prev => ({
          ...prev,
          [selectedConv.id]: [...(prev[selectedConv.id] || activeMessages), noticeMsg],
        }));
      })
      .catch(() => {});
  };

  const handleLinkSuccess = (newPhone: string) => {
    setSelectedAccount(newPhone);
    void refreshStatuses();
  };

  const unreadTotal = useMemo(
    () => activePoolConversations.reduce((sum, c) => sum + (c.unreadCount || 0), 0),
    [activePoolConversations]
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <LindaLiveTopBar
        isDark={isDark}
        isLiveConnected={isLiveConnected}
        heartbeatLatency={heartbeatLatency}
        unreadOnly={unreadOnly}
        unreadTotal={unreadTotal}
        showContextPane={showContextPane}
        onToggleUnread={() => setUnreadOnly(prev => !prev)}
        onToggleContextPane={() => setShowContextPane(prev => !prev)}
        selectedAccount={selectedAccount}
      />

      <div
        data-testid="linda-live-whatsapp-web"
        style={{
          display: 'grid',
          gridTemplateColumns: showContextPane ? '340px 1fr 260px' : '340px 1fr',
          height: 'calc(100vh - 180px)',
          minHeight: 560,
          borderRadius: 14,
          overflow: 'hidden',
          border: isDark ? '1px solid rgba(37, 211, 102, 0.35)' : '1px solid #CBD5E1',
          background: isDark ? '#0B141A' : '#FFFFFF',
          boxShadow: isDark ? '0 8px 30px rgba(0,0,0,0.45)' : '0 4px 20px rgba(0,0,0,0.06)',
        }}
      >
        <LindaChatListPane
          isDark={isDark}
          conversations={filteredConversations}
          selectedConvId={selectedConvId}
          searchFilter={searchFilter}
          onSearchChange={setSearchFilter}
          onSelectConversation={setSelectedConvId}
          accountOptions={accountOptions}
          selectedAccount={selectedAccount}
          onSelectAccount={setSelectedAccount}
          chatTypeFilter={chatTypeFilter}
          onSelectChatType={setChatTypeFilter}
          onOpenLinkModal={() => setShowLinkModal(true)}
          isLoading={isLoadingAccount}
        />

        <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0, height: '100%' }}>
          <LindaQuickReplyBar onSelectTemplate={setInputMessage} />
          <LindaChatThreadPane
            isDark={isDark}
            selectedConv={selectedConv}
            activeMessages={activeMessages}
            inputMessage={inputMessage}
            onInputChange={setInputMessage}
            onSend={handleSend}
            onAiDraft={handleAiDraft}
            onHumanTakeover={handleHumanTakeover}
            isAiComposing={isAiComposing}
          />
        </div>

        {showContextPane && <LindaLeadContextPane conversation={selectedConv} />}
      </div>

      <LindaLinkAccountModal
        isOpen={showLinkModal}
        onClose={() => setShowLinkModal(false)}
        onSuccess={handleLinkSuccess}
      />
    </div>
  );
};
