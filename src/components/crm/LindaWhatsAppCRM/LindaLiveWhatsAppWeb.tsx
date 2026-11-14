// FILE: src/components/crm/LindaWhatsAppCRM/LindaLiveWhatsAppWeb.tsx
/**
 * White Caves Real Estate LLC - Linda WhatsApp Web Dual-Pane Live Client
 * Standard: AEGIS Canonical 12-Way Architecture Standard
 * Single Purpose File Law: < 350 lines (Partitioned)
 */

import React, { useState, useMemo, useEffect, FC } from 'react';
import { useTheme } from '../../../context/ThemeContext';
import type { LindaConversationItem } from './LindaWhatsAppCRM.data';
import { LindaChatListPane } from './LindaChatListPane';
import { LindaChatThreadPane, type ChatMessage } from './LindaChatThreadPane';

export interface LindaLiveWhatsAppWebProps {
  conversations: LindaConversationItem[];
  isLiveConnected?: boolean;
  onSendMessage?: (convId: string, text: string) => void;
  onAutoReplyWithAI?: (conv: LindaConversationItem) => void;
}

const ACCOUNT_FILTERS = [
  { id: 'ALL', label: 'All Linked Lines' },
  { id: '+971505760056', label: 'Primary Master +971505760056' },
];

export const LindaLiveWhatsAppWeb: FC<LindaLiveWhatsAppWebProps> = ({
  conversations,
  isLiveConnected = false,
  onSendMessage,
  onAutoReplyWithAI,
}) => {
  const { isDark } = useTheme();
  const [selectedConvId, setSelectedConvId] = useState<string>(conversations[0]?.id || 'conv-1');
  const [selectedAccount, setSelectedAccount] = useState<string>('ALL');
  const [searchFilter, setSearchFilter] = useState('');
  const [inputMessage, setInputMessage] = useState('');
  const [chatMessages, setChatMessages] = useState<Record<string, ChatMessage[]>>({});

  const selectedConv = useMemo(
    () => conversations.find(c => c.id === selectedConvId) || conversations[0],
    [conversations, selectedConvId]
  );

  // Fetch live thread history when a conversation is selected
  useEffect(() => {
    if (!selectedConv?.phone) return;
    const cleanPhone = selectedConv.phone.replace(/\D/g, '');
    if (!cleanPhone) return;

    let cancelled = false;
    fetch(`/api/linda/conversations/${encodeURIComponent(cleanPhone)}/history?limit=50`)
      .then(res => (res.ok ? res.json() : null))
      .then(json => {
        if (cancelled || !json?.success || !Array.isArray(json?.data?.messages)) return;
        if (json.data.messages.length > 0) {
          setChatMessages(prev => ({
            ...prev,
            [selectedConv.id]: json.data.messages,
          }));
        }
      })
      .catch(() => {
        // Keep current thread messages if offline
      });

    return () => {
      cancelled = true;
    };
  }, [selectedConv?.id, selectedConv?.phone]);

  const accountOptions = useMemo(() => {
    const dynamic = Array.from(
      new Set(
        conversations
          .map(c => (c as LindaConversationItem & { accountPhone?: string }).accountPhone)
          .filter((p): p is string => Boolean(p) && p !== '+971505760056')
      )
    ).map(p => ({ id: p, label: p }));
    return [...ACCOUNT_FILTERS, ...dynamic];
  }, [conversations]);

  const filteredConversations = useMemo(() => {
    return conversations.filter(c => {
      const acct = (c as LindaConversationItem & { accountPhone?: string }).accountPhone;
      if (selectedAccount !== 'ALL' && acct && acct !== selectedAccount) return false;
      if (!searchFilter.trim()) return true;
      const q = searchFilter.toLowerCase();
      return (
        c.contactName.toLowerCase().includes(q) ||
        c.phone.toLowerCase().includes(q) ||
        c.cluster.toLowerCase().includes(q) ||
        c.unit.toLowerCase().includes(q)
      );
    });
  }, [conversations, searchFilter, selectedAccount]);

  const activeMessages = chatMessages[selectedConv?.id || ''] || [
    {
      id: 'default-1',
      sender: 'client',
      text: selectedConv?.lastMessage || 'Hello White Caves team',
      timestamp: selectedConv?.timestamp || 'Just now',
    },
  ];

  const handleSend = () => {
    if (!inputMessage.trim() || !selectedConv) return;
    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'agent',
      text: inputMessage.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'sent',
    };

    setChatMessages(prev => ({
      ...prev,
      [selectedConv.id]: [...(prev[selectedConv.id] || []), newMsg],
    }));

    const textToSend = inputMessage.trim();
    onSendMessage?.(selectedConv.id, textToSend);
    setInputMessage('');

    // Dispatch real WhatsApp message via backend bridge
    fetch(`/api/linda/send/${encodeURIComponent(selectedConv.id)}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: textToSend,
        accountPhone: selectedAccount !== 'ALL' ? selectedAccount : undefined,
      }),
    }).catch(() => {
      // Optimistic message already rendered; offline fallback handled silently
    });
  };

  const handleAiDraft = () => {
    if (!selectedConv) return;
    const aiDraft = `Thank you ${selectedConv.contactName}. White Caves Luxury Desk has reviewed your ${selectedConv.unit} inquiry. We have prepared the verified DLD paperwork for your review.`;
    setInputMessage(aiDraft);
    onAutoReplyWithAI?.(selectedConv);
  };

  return (
    <div
      data-testid="linda-live-whatsapp-web"
      style={{
        display: 'grid',
        gridTemplateColumns: '360px 1fr',
        height: '620px',
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
      />

      <LindaChatThreadPane
        isDark={isDark}
        selectedConv={selectedConv}
        activeMessages={activeMessages}
        inputMessage={inputMessage}
        onInputChange={setInputMessage}
        onSend={handleSend}
        onAiDraft={handleAiDraft}
      />
    </div>
  );
};

export default LindaLiveWhatsAppWeb;
