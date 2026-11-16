import { useEffect } from 'react';
import { apiClient } from '../../../utils/apiClient';
import type { LindaConversationItem } from './LindaWhatsAppCRM.data';
import type { ChatMessage } from './LindaChatThreadPane';

export function useLindaLiveHistory(
  selectedConv: LindaConversationItem | undefined,
  selectedAccount: string,
  setChatMessages: React.Dispatch<React.SetStateAction<Record<string, ChatMessage[]>>>
) {
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
            status?: string;
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
  }, [selectedConv?.id, selectedConv?.phone, selectedAccount, setChatMessages]);
}
