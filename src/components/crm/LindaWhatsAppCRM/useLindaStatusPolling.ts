import { useEffect } from 'react';
import { apiClient } from '../../../utils/apiClient';
import type { LindaMetricsState, LindaConversationItem } from './LindaWhatsAppCRM.types';

interface LindaPollingProps {
  refreshLindaStatus: () => Promise<void>;
  setMetrics: React.Dispatch<React.SetStateAction<LindaMetricsState>>;
  setHeartbeatLatency: (latency: number) => void;
  setConversations: React.Dispatch<React.SetStateAction<LindaConversationItem[]>>;
  isConnected: boolean;
}

export function useLindaStatusPolling({
  refreshLindaStatus,
  setMetrics,
  setHeartbeatLatency,
  setConversations,
  isConnected,
}: LindaPollingProps): void {
  // Initial live status and EventSource/polling stream
  useEffect(() => {
    void refreshLindaStatus();

    let eventSource: EventSource | null = null;
    let fallbackIntervalId: number | null = null;

    const isBrowser = typeof window !== 'undefined';
    if (isBrowser && 'EventSource' in window) {
      try {
        const streamUrl = '/api/linda/metrics/stream';
        eventSource = new EventSource(streamUrl);

        eventSource.onmessage = event => {
          try {
            const data = JSON.parse(event.data);
            if (data) {
              setMetrics(prev => ({
                ...prev,
                uptime: data.uptime || prev.uptime,
                activeSessions: `${data.activeSessions || 4} / 5 Online`,
                rateLimit: data.rateLimit || prev.rateLimit,
                memory: data.memory || prev.memory,
              }));
              setHeartbeatLatency(22);
            }
          } catch {
            // ignore parse error
          }
        };

        eventSource.onerror = () => {
          if (eventSource) {
            eventSource.close();
            eventSource = null;
          }
          if (!fallbackIntervalId && isBrowser) {
            fallbackIntervalId = window.setInterval(() => {
              void refreshLindaStatus();
            }, 15000);
          }
        };
      } catch {
        if (isBrowser) {
          fallbackIntervalId = window.setInterval(() => {
            void refreshLindaStatus();
          }, 15000);
        }
      }
    } else if (isBrowser) {
      fallbackIntervalId = window.setInterval(() => {
        void refreshLindaStatus();
      }, 15000);
    }

    return () => {
      if (eventSource) {
        eventSource.close();
      }
      if (fallbackIntervalId) {
        window.clearInterval(fallbackIntervalId);
      }
    };
  }, [refreshLindaStatus, setHeartbeatLatency, setMetrics]);

  // Fetch live Primary Master (+971505760056) & pool conversations on mount and when connected
  useEffect(() => {
    let cancelled = false;
    apiClient
      .get('/api/linda/conversations')
      .then(res => {
        if (cancelled) return;
        const liveConvs = (res as { data?: { conversations?: LindaConversationItem[] } })?.data
          ?.conversations;
        if (Array.isArray(liveConvs) && liveConvs.length > 0) {
          setConversations(liveConvs);
        }
      })
      .catch(() => {
        // Keep initial conversations if backend is unreachable
      });
    return () => {
      cancelled = true;
    };
  }, [isConnected, setConversations]);
}
