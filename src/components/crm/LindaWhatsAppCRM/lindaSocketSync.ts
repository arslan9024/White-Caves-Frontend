// FILE: src/components/crm/LindaWhatsAppCRM/lindaSocketSync.ts
import { useEffect } from 'react';
import socketService from '../../../services/socketService';
import type { LindaConversationItem, LindaCampaignItem } from './LindaWhatsAppCRM.types';

interface LindaSocketSyncOptions {
  setConversations: React.Dispatch<React.SetStateAction<LindaConversationItem[]>>;
  setCampaigns: React.Dispatch<React.SetStateAction<LindaCampaignItem[]>>;
  setToastNotification: React.Dispatch<React.SetStateAction<string | null>>;
  setIsConnected?: React.Dispatch<React.SetStateAction<boolean>>;
  setLindaStatus?: React.Dispatch<React.SetStateAction<string>>;
}

export function useLindaSocketSync({
  setConversations,
  setCampaigns,
  setToastNotification,
  setIsConnected,
  setLindaStatus,
}: LindaSocketSyncOptions): void {
  useEffect(() => {
    const offConn = (socketService as any)?.onLindaConnectionState?.(
      (payload: { isConnected: boolean; status: string; account: string }) => {
        if (typeof setIsConnected === 'function') {
          setIsConnected(payload.isConnected);
        }
        if (typeof setLindaStatus === 'function') {
          setLindaStatus(payload.status);
        }
        if (payload.isConnected) {
          setToastNotification(`Primary WhatsApp line (${payload.account}) connected`);
        }
      }
    );

    const offMessage = socketService?.onLindaMessage?.((payload: any) => {
      const phone = payload?.from || payload?.phone || 'Unknown';
      const body = payload?.body || payload?.message || 'New WhatsApp message';
      setConversations(prev =>
        prev.map(c => (c.phone === phone ? { ...c, lastMessage: body, timestamp: 'Just now' } : c))
      );
      setToastNotification(`New WhatsApp message from ${phone}`);
    });

    const offHotLead = socketService?.onLindaHotLead?.((payload: any) => {
      const leadName = payload?.clientName || payload?.name || payload?.phone || 'VIP Lead';
      setToastNotification(`HOT LEAD escalated: ${leadName}`);
    });

    const offCampaign = socketService?.onLindaCampaignTelemetry?.((payload: any) => {
      const cId = payload?.campaignId || payload?.id;
      if (!cId) return;
      setCampaigns(prev =>
        prev.map(camp =>
          camp.id === cId ? { ...camp, sent: payload.sent ?? payload.sentCount ?? camp.sent } : camp
        )
      );
    });

    return () => {
      offConn?.();
      offMessage?.();
      offHotLead?.();
      offCampaign?.();
    };
  }, [setConversations, setCampaigns, setToastNotification, setIsConnected, setLindaStatus]);
}
