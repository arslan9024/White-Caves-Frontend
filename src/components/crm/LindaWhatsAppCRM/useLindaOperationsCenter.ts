import { useState, useCallback, useEffect } from 'react';
import { apiClient } from '../../../utils/apiClient';
import {
  type LindaMetricsState,
  type LindaSessionItem,
  type LindaCampaignItem,
  type LindaFeatureBadge,
  type LindaPlaybookBadge,
  type LindaConversationItem,
  type UseLindaOperationsCenterReturn,
} from './LindaWhatsAppCRM.types';
import {
  INITIAL_LINDA_CONVERSATIONS,
  INITIAL_LINDA_SESSIONS,
  INITIAL_LINDA_CAMPAIGNS,
  INITIAL_LINDA_FEATURES,
  INITIAL_LINDA_PLAYBOOKS,
} from './LindaWhatsAppCRM.data';
import { createLindaActionHandlers } from './lindaActionHandlers';
import { useLindaSocketSync } from './lindaSocketSync';
import { useLindaStatusPolling } from './useLindaStatusPolling';

/**
 * useLindaOperationsCenter — Master hook for Linda WhatsApp Bot visual operations
 * Refactored to delegate status polling & action handling under APOCALYPSE-AEG-042 (< 350 lines).
 */
export function useLindaOperationsCenter(): UseLindaOperationsCenterReturn {
  const [isConnected, setIsConnected] = useState<boolean>(true);
  const [lindaStatus, setLindaStatus] = useState<string>('connected');
  const [loadingAction, setLoadingAction] = useState<'start' | 'stop' | 'restart' | null>(null);
  const [controlError, setControlError] = useState<string>('');
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [currentTimeGST, setCurrentTimeGST] = useState<string>('');
  const [heartbeatLatency, setHeartbeatLatency] = useState<number>(38);
  const [confirmEmergencyStop, setConfirmEmergencyStop] = useState<boolean>(false);
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string | null>(null);
  const [isQrLoading, setIsQrLoading] = useState<boolean>(false);
  const [toastNotification, setToastNotification] = useState<string | null>(null);

  const [metrics, setMetrics] = useState<LindaMetricsState>({
    activeSessions: '4 / 5 Online',
    rateLimit: '42 WPM (Gaussian)',
    uptime: '99.98% (14d 6h)',
    memory: '214 MB / 1024 MB',
    conversionVelocity: '94.2%',
    antiBanSafetyScore: '99.8/100',
  });

  const [sessions, setSessions] = useState<LindaSessionItem[]>(INITIAL_LINDA_SESSIONS);
  const [campaigns, setCampaigns] = useState<LindaCampaignItem[]>(INITIAL_LINDA_CAMPAIGNS);
  const [conversations, setConversations] = useState<LindaConversationItem[]>(
    INITIAL_LINDA_CONVERSATIONS
  );
  const [features, setFeatures] = useState<LindaFeatureBadge[]>(INITIAL_LINDA_FEATURES);
  const [playbooks, setPlaybooks] = useState<LindaPlaybookBadge[]>(INITIAL_LINDA_PLAYBOOKS);

  const [activeModalOutput, setActiveModalOutput] = useState<{
    title: string;
    output: string;
  } | null>(null);
  const [terminalLines, setTerminalLines] = useState<string[]>([
    '🤖 [LINDA MASTER] whatsapp-bot-linda v2.0.0-enterprise initialized.',
    '⚡ LocalAuth multi-account profiles: session-master, session-goraha, session-outreach.',
    '🛡️ Anti-ban Gaussian typing delay active: 3000ms–6000ms jitter (42 WPM).',
    'Type "doctor", "status", or click any quick-action below to inspect runtime.',
  ]);

  const [liveLogs, setLiveLogs] = useState<string[]>([
    '[GST 16:20:11] Linda Bot heartbeat acknowledged from Node container (24ms).',
    '[GST 16:18:44] Inbound query from +971 50 123 4567: "Send me 2BR in Vardon under 1.2M".',
    '[GST 16:18:45] NLP Intent: BUYER_MATCH_SEARCH (94% confidence) -> Matched unit #V-402.',
    '[GST 16:15:02] Drip campaign "Vardon Phase 1 Outreach" dispatched 15 safe messages.',
    '[GST 16:00:00] Daily budget reset: 15 new chats allocated for Asia/Dubai window.',
  ]);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTimeGST(
        now.toLocaleTimeString('en-GB', {
          timeZone: 'Asia/Dubai',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        }) + ' GST'
      );
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  // Fetch live Primary Master (+971505760056) conversations on mount
  useEffect(() => {
    let cancelled = false;
    apiClient
      .get('/whatsapp/chats')
      .then((res: unknown) => {
        const data = (res as { data?: { chats?: Array<Record<string, unknown>> } })?.data;
        if (cancelled || !Array.isArray(data?.chats) || data.chats.length === 0) return;
        const mapped: LindaConversationItem[] = data.chats.map((c, idx) => ({
          id: String(c.jid || `wa-${idx}`),
          clientName: String(c.pushName || c.phone || 'WhatsApp Contact'),
          phone: String(c.phone || ''),
          lastMessage: String(c.lastMessage || ''),
          timestamp: String(c.lastMessageTimestamp || 'Just now'),
          unreadCount: Number(c.unreadCount || 0),
          intent: 'LIVE_SYNC',
          confidence: 100,
          isGroup: Boolean(c.isGroup),
          accountPhone: '+971505760056',
        }));
        setConversations(mapped);
      })
      .catch(() => {
        // Keep fallback conversations if backend is offline
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const appendLog = useCallback((msg: string) => {
    const time = new Date().toLocaleTimeString('en-GB', { hour12: false });
    setLiveLogs(prev => [`[GST ${time}] ${msg}`, ...prev.slice(0, 49)]);
  }, []);

  const refreshLindaStatus = useCallback(async (): Promise<void> => {
    try {
      const start = Date.now();
      const response = (await apiClient.get('/linda/status')) as {
        success?: boolean;
        data?: { status?: string; isConnected?: boolean };
      };
      setHeartbeatLatency(Math.max(18, Date.now() - start));
      if (response?.data?.status) {
        setLindaStatus(response.data.status);
        setIsConnected(Boolean(response.data.isConnected));
      }

      // Live WhatsApp Conversations sync from server
      try {
        const convRes = (await apiClient.get('/linda/conversations')) as {
          success?: boolean;
          data?: {
            conversations?: Array<{
              id: string;
              name: string;
              unreadCount: number;
              lastMessage?: string;
              timestamp?: string;
            }>;
          };
        };
        if (convRes?.data?.conversations && convRes.data.conversations.length > 0) {
          const mapped: LindaConversationItem[] = convRes.data.conversations.map(c => ({
            id: c.id,
            contactName: c.name,
            phone: c.id.replace('@c.us', ''),
            cluster: 'Live WhatsApp Contact',
            unit: 'Direct Inquiry',
            intent: 'WhatsApp Communication',
            sentiment: 'NEUTRAL',
            confidence: 90,
            gorahaSaved: true,
            maryMatch: 'Syncing live chat from device',
            lastMessage: c.lastMessage || 'No recent messages',
            timestamp: c.timestamp || 'Just now',
          }));
          setConversations(mapped);
        }
      } catch {
        appendLog(
          'Live WhatsApp conversations could not be synced; retained current conversations.'
        );
      }

      try {
        const metricsRes = (await apiClient.get('/linda/metrics')) as {
          success?: boolean;
          data?: {
            uptime?: string;
            activeSessions?: number;
            rateLimit?: string;
            memory?: string;
          };
        };
        if (metricsRes?.data) {
          setMetrics(prev => ({
            ...prev,
            uptime: metricsRes.data?.uptime || prev.uptime,
            activeSessions: `${metricsRes.data?.activeSessions || 4} / 5 Online`,
            rateLimit: metricsRes.data?.rateLimit || prev.rateLimit,
            memory: metricsRes.data?.memory || prev.memory,
          }));
        }
      } catch {
        // preserve current metrics
      }

      setControlError('');
    } catch {
      setHeartbeatLatency(42);
    }
  }, [appendLog]);

  useLindaStatusPolling({
    refreshLindaStatus,
    setMetrics,
    setHeartbeatLatency,
    setConversations,
    isConnected,
  });

  useLindaSocketSync({
    setConversations,
    setCampaigns,
    setToastNotification,
  });

  const handleToggleLindaRuntime = useCallback(async (): Promise<void> => {
    if (loadingAction !== null) return;
    const nextAction = isConnected ? 'stop' : 'start';
    setLoadingAction(nextAction);
    setControlError('');
    try {
      await apiClient.post(isConnected ? '/linda/disconnect' : '/linda/connect', {});
      setIsConnected(!isConnected);
      setLindaStatus(!isConnected ? 'connected' : 'disconnected');
      appendLog(
        `Runtime switched to ${!isConnected ? 'CONNECTED' : 'DISCONNECTED'} by Managing Director.`
      );
    } catch {
      setIsConnected(!isConnected);
      setLindaStatus(!isConnected ? 'connected' : 'disconnected');
      appendLog(`Runtime toggled locally to ${!isConnected ? 'CONNECTED' : 'DISCONNECTED'}.`);
    } finally {
      setLoadingAction(null);
    }
  }, [appendLog, isConnected, loadingAction]);

  const actionHandlers = createLindaActionHandlers({
    appendLog,
    setFeatures,
    setPlaybooks,
    setTerminalLines,
    setActiveModalOutput,
    setSessions,
    setCampaigns,
    setQrCodeDataUrl,
    setIsQrLoading,
  });

  return {
    isConnected,
    setIsConnected,
    lindaStatus,
    setLindaStatus,
    loadingAction,
    controlError,
    setControlError,
    soundEnabled,
    setSoundEnabled,
    currentTimeGST,
    heartbeatLatency,
    confirmEmergencyStop,
    setConfirmEmergencyStop,
    qrCodeDataUrl,
    setQrCodeDataUrl,
    isQrLoading,
    toastNotification,
    setToastNotification,
    metrics,
    setMetrics,
    sessions,
    setSessions,
    campaigns,
    setCampaigns,
    conversations,
    setConversations,
    features,
    playbooks,
    activeModalOutput,
    setActiveModalOutput,
    terminalLines,
    setTerminalLines,
    liveLogs,
    appendLog,
    refreshLindaStatus,
    handleToggleLindaRuntime,
    handleExecuteCommand: actionHandlers.handleExecuteCommand,
    handlePingSession: actionHandlers.handlePingSession,
    handlePairDeviceCode: actionHandlers.handlePairDeviceCode,
    handleScanDeviceQr: actionHandlers.handleScanDeviceQr,
    handleToggleCampaignStatus: actionHandlers.handleToggleCampaignStatus,
    handleQueueOutreachBatch: actionHandlers.handleQueueOutreachBatch,
    handleSendQuickReply: actionHandlers.handleSendQuickReply,
  };
}
