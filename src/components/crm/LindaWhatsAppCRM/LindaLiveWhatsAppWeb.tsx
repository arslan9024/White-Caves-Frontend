// FILE: src/components/crm/LindaWhatsAppCRM/LindaLiveWhatsAppWeb.tsx
/**
 * White Caves Real Estate LLC - Linda Live WhatsApp Web Desk
 * Standard: AEGIS Canonical 12-Way Architecture Standard (<350 lines)
 */

import React, { useState, useMemo, useEffect, FC } from 'react';
import { useTheme } from '../../../context/ThemeContext';
import socketService from '../../../services/socketService';
import { apiClient } from '../../../utils/apiClient';
import type { LindaConversationItem } from './LindaWhatsAppCRM.data';
import { LindaChatListPane } from './LindaChatListPane';
import { LindaChatThreadPane, type ChatMessage } from './LindaChatThreadPane';
import { LindaQuickReplyBar } from './LindaQuickReplyBar';
import { LindaLeadContextPane } from './LindaLeadContextPane';
import { LindaLiveTopBar } from './LindaLiveTopBar';
import { LindaLinkAccountModal } from './LindaLinkAccountModal';
import { useLindaAccountAutoload } from './useLindaAccountAutoload';

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
  const [chatTypeFilter, setChatTypeFilter] = useState<'all' | 'campaign' | 'direct' | 'groups'>(
    'all'
  );
  const [unreadOnly, setUnreadOnly] = useState<boolean>(false);
  const [showContextPane, setShowContextPane] = useState<boolean>(true);
  const [searchFilter, setSearchFilter] = useState('');
  const [inputMessage, setInputMessage] = useState('');
  const [chatMessages, setChatMessages] = useState<Record<string, ChatMessage[]>>({});
  const [showLinkModal, setShowLinkModal] = useState<boolean>(false);

  const {
    selectedAccount,
    setSelectedAccount,
    accountOptions,
    accountConversations,
    refreshStatuses,
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

  // History Autoload Engine: queries /api/linda/conversations/:phoneNumber/history?accountPhone=<phone>
  useEffect(() => {
    if (!selectedConv?.phone) return;
    const cleanPhone = selectedConv.phone.replace(/\D/g, '');
    if (!cleanPhone) return;

    let cancelled = false;
    const accParam =
      selectedAccount !== 'ALL'
        ? `?accountPhone=${encodeURIComponent(selectedAccount.replace(/\D/g, '') || selectedAccount)}`
        : '';

    apiClient
      .get(`/linda/conversations/${encodeURIComponent(cleanPhone)}/history${accParam}`)
      .then((res: unknown) => {
        const json = res as {
          success?: boolean;
          data?: { messages?: Array<Record<string, unknown>> };
        };
        if (cancelled || !json?.success || !Array.isArray(json?.data?.messages)) return;
        const mapped: ChatMessage[] = json.data.messages.map(
          (m: {
            id?: string;
            fromMe?: boolean;
            sender?: string;
            body?: string;
            text?: string;
            timestamp?: string;
            status?: 'PENDING' | 'SENT' | 'DELIVERED' | 'READ' | 'sent' | 'delivered' | 'read';
            mediaType?: string | null;
            mediaUrl?: string;
          }) => {
            const rawStatus = (m.status || 'SENT').toLowerCase();
            const status: ChatMessage['status'] =
              rawStatus === 'read' ? 'read' : rawStatus === 'delivered' ? 'delivered' : 'sent';
            const isAgent = m.fromMe === true || m.sender === 'agent' || m.sender === 'bot';
            return {
              id: m.id || `live-${Date.now()}-${Math.random()}`,
              sender: isAgent ? 'agent' : 'client',
              text: m.body || m.text || '',
              timestamp: m.timestamp || 'Now',
              status,
              mediaType: m.mediaType ?? null,
              mediaUrl: m.mediaUrl,
            };
          }
        );
        setChatMessages(prev => ({ ...prev, [selectedConv.id]: mapped }));
      })
      .catch(() => {});

    return () => {
      cancelled = true;
    };
  }, [selectedConv?.id, selectedConv?.phone, selectedAccount]);

  // Real-time socket message handler
  useEffect(() => {
    const unsubMsg = socketService.onLindaMessage?.(payload => {
      const p = payload as unknown as Record<string, unknown>;
      const phoneDigits = String(p.phone || p.from || '').replace(/\D/g, '');
      const convId = String(p.leadId || '') || (phoneDigits ? `LINDA_${phoneDigits}` : '');
      if (!convId) return;
      const isOutbound = p.direction === 'OUTBOUND' || Boolean(p.isFromMe);
      const rawTs = p.timestamp;
      const tsStr =
        typeof rawTs === 'string'
          ? rawTs
          : rawTs instanceof Date
            ? rawTs.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            : new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const incoming: ChatMessage = {
        id: String(p.id || `sock-${Date.now()}`),
        sender: isOutbound ? 'bot' : 'client',
        text: String(p.text || p.message || ''),
        timestamp: tsStr,
        status: isOutbound ? 'sent' : undefined,
      };
      setChatMessages(prev => {
        const existing = prev[convId] || [];
        if (existing.some(m => m.id === incoming.id)) return prev;
        return { ...prev, [convId]: [...existing, incoming] };
      });
    });

    return () => {
      unsubMsg?.();
    };
  }, []);

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

    fetch(`/api/linda/send/${encodeURIComponent(selectedConv.id)}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: textToSend,
        accountPhone: selectedAccount !== 'ALL' ? selectedAccount : undefined,
      }),
    }).catch(() => {});
  };

  const handleAiDraft = (lang: 'EN' | 'AR' = 'EN') => {
    if (!selectedConv) return;
    onAutoReplyWithAI?.(selectedConv);
    const aiDraft =
      lang === 'AR'
        ? `مرحباً بك ${selectedConv.contactName || ''}. وايت كيفز العقارية الفاخرة استلمت استفسارك حول ${selectedConv.unit}. المستندات جاهزة لمراجعتكم.`
        : `Thank you ${selectedConv.contactName}. White Caves Luxury Desk has reviewed your ${selectedConv.unit} inquiry. We have prepared the verified DLD paperwork for your review.`;
    setInputMessage(aiDraft);
  };

  const handleHumanTakeover = () => {
    if (!selectedConv) return;
    const jid = encodeURIComponent(
      selectedConv.id.includes('@')
        ? selectedConv.id
        : `${selectedConv.phone.replace(/\D/g, '')}@s.whatsapp.net`
    );
    fetch(`/api/whatsapp/chats/${jid}/takeover`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ humanAgent: 'Arslan Malik', reason: 'TopBar 1-Click Takeover' }),
    }).catch(() => {});
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

export default LindaLiveWhatsAppWeb;
