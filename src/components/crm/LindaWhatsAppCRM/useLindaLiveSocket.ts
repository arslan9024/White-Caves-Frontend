import { useEffect } from 'react';
import socketService from '../../../services/socketService';
import type { ChatMessage } from './LindaChatThreadPane';

export function useLindaLiveSocket(
  setChatMessages: React.Dispatch<React.SetStateAction<Record<string, ChatMessage[]>>>
) {
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
  }, [setChatMessages]);
}
