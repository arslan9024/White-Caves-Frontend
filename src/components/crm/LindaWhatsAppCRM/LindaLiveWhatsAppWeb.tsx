// FILE: src/components/crm/LindaWhatsAppCRM/LindaLiveWhatsAppWeb.tsx
/**
 * White Caves Real Estate LLC - Linda WhatsApp Web Dual-Pane Live Client
 * Standard: AEGIS Canonical 12-Way Architecture Standard
 * Single Purpose File Law: < 350 lines (Partitioned)
 */

import React, { useState, useMemo, useEffect, FC } from 'react';
import { useTheme } from '../../../context/ThemeContext';
import socketService from '../../../services/socketService';
import type { LindaConversationItem } from './LindaWhatsAppCRM.data';
import { LindaChatListPane } from './LindaChatListPane';
import { LindaChatThreadPane, type ChatMessage } from './LindaChatThreadPane';
import { LindaQuickReplyBar } from './LindaQuickReplyBar';
import { LindaLeadContextPane } from './LindaLeadContextPane';

export interface LindaLiveWhatsAppWebProps {
  conversations: LindaConversationItem[];
  isLiveConnected?: boolean;
  heartbeatLatency?: number;
  onSendMessage?: (convId: string, text: string) => void;
  onAutoReplyWithAI?: (conv: LindaConversationItem) => void;
}

const ACCOUNT_FILTERS = [
  { id: 'ALL', label: 'All Linked Lines' },
  { id: '+971505760056', label: 'Primary Master +971505760056' },
  { id: 'goraha', label: 'Goraha Secondary Line' },
  { id: 'outreach', label: 'Outreach Campaign Line' },
];

export const LindaLiveWhatsAppWeb: FC<LindaLiveWhatsAppWebProps> = ({
  conversations,
  isLiveConnected = false,
  heartbeatLatency = 28,
  onSendMessage,
  onAutoReplyWithAI,
}) => {
  const { isDark } = useTheme();
  const [selectedConvId, setSelectedConvId] = useState<string>(conversations[0]?.id || 'conv-1');
  const [selectedAccount, setSelectedAccount] = useState<string>('ALL');
  const [chatTypeFilter, setChatTypeFilter] = useState<'all' | 'direct' | 'groups'>('all');
  const [unreadOnly, setUnreadOnly] = useState<boolean>(false);
  const [showContextPane, setShowContextPane] = useState<boolean>(true);
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
    const jid = selectedConv.id.includes('@') ? selectedConv.id : `${cleanPhone}@s.whatsapp.net`;
    fetch(`/api/whatsapp/chats/${encodeURIComponent(jid)}/messages`)
      .then(res => (res.ok ? res.json() : null))
      .then(json => {
        if (cancelled || !json?.success || !Array.isArray(json?.data?.messages)) return;
        if (json.data.messages.length > 0) {
          const mapped: ChatMessage[] = json.data.messages.map((m: Record<string, unknown>) => ({
            id: String(m.id || `msg-${Date.now()}`),
            sender: m.fromMe ? 'bot' : 'client',
            text: String(m.body || ''),
            timestamp: String(m.timestamp || 'Just now'),
            status: m.fromMe
              ? (String(m.status || 'sent').toLowerCase() as ChatMessage['status'])
              : undefined,
          }));
          setChatMessages(prev => ({
            ...prev,
            [selectedConv.id]: mapped,
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

  // Real-time Socket.IO streaming for inbound/outbound messages & read receipts
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
        id: String(p.messageId || p.id || `sock-${Date.now()}`),
        sender: isOutbound ? 'bot' : 'client',
        text: String(p.body || ''),
        timestamp: tsStr,
        status: isOutbound ? 'sent' : undefined,
      };
      setChatMessages(prev => {
        const existing = prev[convId] || [];
        if (existing.some(m => m.id === incoming.id)) return prev;
        return { ...prev, [convId]: [...existing, incoming] };
      });
    });

    const rawSocket = (
      socketService as unknown as {
        socket?: {
          on: (ev: string, cb: (p: Record<string, unknown>) => void) => void;
          off: (ev: string, cb: (p: Record<string, unknown>) => void) => void;
        };
      }
    ).socket;
    const handleReceipt = (payload: Record<string, unknown>) => {
      const msgId = String(payload.messageId || '');
      const rawStatus = String(payload.status || '').toLowerCase();
      const status: ChatMessage['status'] =
        rawStatus === 'read' ? 'read' : rawStatus === 'delivered' ? 'delivered' : 'sent';
      if (!msgId) return;
      setChatMessages(prev => {
        const next: Record<string, ChatMessage[]> = {};
        for (const [cid, msgs] of Object.entries(prev)) {
          next[cid] = msgs.map(m => (m.id === msgId ? { ...m, status } : m));
        }
        return next;
      });
    };

    rawSocket?.on('linda:receipt', handleReceipt);
    rawSocket?.on('messages.update', handleReceipt);

    return () => {
      unsubMsg?.();
      rawSocket?.off('linda:receipt', handleReceipt);
      rawSocket?.off('messages.update', handleReceipt);
    };
  }, []);

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
      const ext = c as LindaConversationItem & { accountPhone?: string; isGroup?: boolean };
      if (selectedAccount !== 'ALL' && ext.accountPhone && ext.accountPhone !== selectedAccount)
        return false;
      if (chatTypeFilter === 'groups' && !ext.isGroup) return false;
      if (chatTypeFilter === 'direct' && ext.isGroup) return false;
      if (!searchFilter.trim()) return true;
      const q = searchFilter.toLowerCase();
      return (
        c.contactName.toLowerCase().includes(q) ||
        c.phone.toLowerCase().includes(q) ||
        c.cluster.toLowerCase().includes(q) ||
        c.unit.toLowerCase().includes(q)
      );
    });
  }, [conversations, searchFilter, selectedAccount, chatTypeFilter]);

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

  const unreadTotal = useMemo(
    () => conversations.reduce((sum, c) => sum + (c.unreadCount || 0), 0),
    [conversations]
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <div
        data-testid="linda-master-status-bar"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '6px 14px',
          borderRadius: 10,
          background: isDark ? 'rgba(15, 23, 42, 0.9)' : '#F8FAFC',
          border: isDark ? '1px solid rgba(37, 211, 102, 0.25)' : '1px solid #CBD5E1',
          fontSize: 12,
          color: isDark ? '#E2E8F0' : '#0F172A',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              backgroundColor: isLiveConnected ? '#22C55E' : '#EF4444',
              display: 'inline-block',
            }}
          />
          <strong>Primary Master +971505760056</strong>
          <span style={{ color: isLiveConnected ? '#22C55E' : '#EF4444', fontWeight: 600 }}>
            {isLiveConnected ? 'Connected' : 'Reconnecting...'}
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span>Latency: {heartbeatLatency}ms</span>
          <button
            type="button"
            data-testid="linda-unread-filter-btn"
            onClick={() => setUnreadOnly(prev => !prev)}
            style={{
              padding: '2px 8px',
              borderRadius: 6,
              border: '1px solid rgba(148, 163, 184, 0.35)',
              background: unreadOnly ? '#EF4444' : 'transparent',
              color: unreadOnly ? '#FFFFFF' : 'inherit',
              fontSize: 11,
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Unread ({unreadTotal})
          </button>
          <button
            type="button"
            data-testid="linda-context-pane-toggle"
            onClick={() => setShowContextPane(prev => !prev)}
            style={{
              padding: '2px 8px',
              borderRadius: 6,
              border: '1px solid rgba(148, 163, 184, 0.35)',
              background: showContextPane ? 'rgba(37, 211, 102, 0.15)' : 'transparent',
              color: 'inherit',
              fontSize: 11,
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            {showContextPane ? 'Hide Context' : 'Show Context'}
          </button>
        </div>
      </div>

      {!isLiveConnected && (
        <div
          data-testid="linda-reconnect-banner"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '6px 14px',
            borderRadius: 8,
            background: 'rgba(239, 68, 68, 0.12)',
            border: '1px solid rgba(239, 68, 68, 0.35)',
            color: isDark ? '#FCA5A5' : '#991B1B',
            fontSize: 12,
          }}
        >
          <span>
            Primary Master (+971505760056) socket disconnected. Showing cached conversations.
          </span>
          <button
            type="button"
            onClick={() => window.location.reload()}
            style={{
              padding: '2px 10px',
              borderRadius: 6,
              border: 'none',
              background: '#EF4444',
              color: '#FFFFFF',
              fontSize: 11,
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            Reconnect
          </button>
        </div>
      )}

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
          />
        </div>

        {showContextPane && <LindaLeadContextPane conversation={selectedConv} />}
      </div>
    </div>
  );
};

export default LindaLiveWhatsAppWeb;
