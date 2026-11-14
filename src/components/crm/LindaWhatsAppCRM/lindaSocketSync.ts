// FILE: src/components/crm/LindaWhatsAppCRM/lindaSocketSync.ts
import { useEffect } from 'react';
import socketService from '../../../services/socketService';
import type { LindaConversationItem, LindaCampaignItem } from './LindaWhatsAppCRM.types';

interface LindaSocketSyncOptions {
  setConversations: React.Dispatch<React.SetStateAction<LindaConversationItem[]>>;
  setCampaigns: React.Dispatch<React.SetStateAction<LindaCampaignItem[]>>;
  setToastNotification: React.Dispatch<React.SetStateAction<string | null>>;
}

export function useLindaSocketSync({
  setConversations,
  setCampaigns,
  setToastNotification,
}: LindaSocketSyncOptions): void {
  useEffect(() => {
    const offMessage = socketService?.onLindaMessage?.((payload) => {
      const phone = payload?.from || payload?.phone || 'Unknown';
      const body = payload?.body || payload?.message || 'New WhatsApp message';
      setConversations((prev) =>
        prev.map((c) => (c.phone === phone ? { ...c, lastMessage: body, timestamp: 'Just now' } : c))
      );
      setToastNotification(`New WhatsApp message from ${phone}`);
    });

    const offHotLead = socketService?.onLindaHotLead?.((payload) => {
      const leadName = payload?.clientName || payload?.phone || 'VIP Lead';
      setToastNotification(`HOT LEAD escalated: ${leadName}`);
    });

    const offCampaign = socketService?.onLindaCampaignTelemetry?.((payload) => {
      if (!payload?.campaignId) return;
      setCampaigns((prev) =>
        prev.map((camp) =>
          camp.id === payload.campaignId
            ? { ...camp, sentCount: payload.sentCount ?? camp.sentCount }
            : camp
        )
      );
    });

    return () => {
      offMessage?.();
      offHotLead?.();
      offCampaign?.();
    };
  }, [setConversations, setCampaigns, setToastNotification]);
}
