/**
 * Zoe Console — Logic Layer (Mary Allen Wilkes Architecture)
 * State hook managing query submission, auth token retrieval, history, speech synthesis, and voice recognition
 * Strictly < 350 lines
 */

import { useState, useEffect, useRef, useCallback } from 'react';
import { getAuth } from 'firebase/auth';
import socketService, {
  type LindaCampaignTelemetryPayload,
  type LindaHotLeadEscalationPayload,
} from '../../../services/socketService';
import type { ConsoleMessage, HistoryItem } from './ZoeConsole.types';

export const getAuthToken = async (): Promise<string | null> => {
  try {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
      return await user.getIdToken();
    }
  } catch {
    // Non-critical fallback
  }
  return null;
};

export function useZoeConsoleLogic() {
  const [messages, setMessages] = useState<ConsoleMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [showHistory, setShowHistory] = useState(false);
  const [conversationHistory, setConversationHistory] = useState<HistoryItem[]>([]);
  const [isListening, setIsListening] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);
  const [voiceSpeechEnabled, setVoiceSpeechEnabled] = useState(true);
  const [liveCampaignTelemetry, setLiveCampaignTelemetry] =
    useState<LindaCampaignTelemetryPayload | null>(null);
  const [hotLeadEscalations, setHotLeadEscalations] = useState<LindaHotLeadEscalationPayload[]>([]);
  const recognitionRef = useRef<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const session = localStorage.getItem('zoe_session_id') || crypto.randomUUID();
    localStorage.setItem('zoe_session_id', session);
    setSessionId(session);

    setMessages([
      {
        id: 'welcome',
        text: "Hello! I'm **Zoe**, your Executive AI Assistant. I can help you with:\n\n• **Department Info** - Find who handles what\n• **Services** - Learn about our offerings\n• **Processes** - Understand our workflows\n• **Contacts** - Get the right person's details\n• **Daily Briefing** - Get today's summary\n• **Metrics** - View current statistics\n\nHow can I assist you today?",
        isUser: false,
        timestamp: new Date(),
        confidence: 1,
      },
    ]);
  }, []);

  // Subscribe to real-time Vardon campaign progress and HOT_LEAD escalations from Linda
  useEffect(() => {
    const offCampaign = socketService.onLindaCampaignTelemetry(payload => {
      setLiveCampaignTelemetry(payload);
      setMessages(prev => [
        ...prev,
        {
          id: `campaign-${Date.now()}`,
          text: `**📡 Live Vardon Campaign Progress (${payload.campaignName})**\n\n• **Status**: ${payload.status}\n• **Dispatched**: ${payload.totalDispatched} / ${payload.dailyTarget} daily target\n• **Skipped**: ${payload.skipped}`,
          isUser: false,
          timestamp: new Date(payload.timestamp || Date.now()),
          intent: 'campaign_telemetry',
          confidence: 1,
        },
      ]);
    });

    const offHotLead = socketService.onLindaHotLead(payload => {
      setHotLeadEscalations(prev => [payload, ...prev].slice(0, 10));
      setMessages(prev => [
        ...prev,
        {
          id: `hotlead-${payload.id || Date.now()}`,
          text: `**🔥 HOT_LEAD Escalation [${payload.category}] — ${payload.project}**\n\n• **Owner**: ${payload.name} (${payload.phone})${payload.unit ? ` · Unit ${payload.unit}` : ''}\n• **Inbound**: "${payload.inquiry}"\n• **Action**: Immediate 15m P0 SLA contact required.`,
          isUser: false,
          timestamp: new Date(payload.timestamp || Date.now()),
          intent: 'hot_lead_escalation',
          confidence: payload.confidence ?? 0.95,
        },
      ]);
    });

    return () => {
      offCampaign();
      offHotLead();
    };
  }, []);

  const speakText = (text: string) => {
    if (!voiceSpeechEnabled || typeof window === 'undefined' || !window.speechSynthesis) return;
    try {
      window.speechSynthesis.cancel();
      const plainText = text.replace(/[*_#•]/g, '').trim();
      const utterance = new SpeechSynthesisUtterance(plainText);
      utterance.rate = 1.05;
      utterance.pitch = 1.0;
      utterance.lang = 'en-US';
      window.speechSynthesis.speak(utterance);
    } catch {
      // Non-critical fallback
    }
  };

  const sendMessage = useCallback(
    async (text: string) => {
      if (!text.trim() || isLoading) return;

      const userMessage: ConsoleMessage = {
        id: `user-${Date.now()}`,
        text: text.trim(),
        isUser: true,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, userMessage]);
      setInputValue('');
      setIsLoading(true);

      try {
        const token = await getAuthToken();
        if (!token) {
          setMessages(prev => [
            ...prev,
            {
              id: `auth-${Date.now()}`,
              text: "**Executive Access Required**\n\nPlease sign in with an authorized executive account to use Zoe's knowledge base. This feature is restricted to company executives for security purposes.",
              isUser: false,
              timestamp: new Date(),
              confidence: 0,
            },
          ]);
          setIsLoading(false);
          return;
        }

        const headers = {
          'Content-Type': 'application/json',
          'x-user-id': 'executive-user',
          Authorization: `Bearer ${token}`,
        };

        const response = await fetch('/api/zoe/query', {
          method: 'POST',
          headers,
          body: JSON.stringify({
            query: text.trim(),
            sessionId,
          }),
        });

        const data = await response.json();

        if (response.status === 401 || response.status === 403) {
          setMessages(prev => [
            ...prev,
            {
              id: `auth-error-${Date.now()}`,
              text:
                data.message ||
                '**Access Denied**\n\nYour account is not authorized for executive access. Please contact the administrator.',
              isUser: false,
              timestamp: new Date(),
              confidence: 0,
            },
          ]);
          return;
        }

        if (data.success) {
          const assistantMessage: ConsoleMessage = {
            id: `assistant-${Date.now()}`,
            text: data.response,
            isUser: false,
            timestamp: new Date(),
            intent: data.intent,
            confidence: data.metadata?.confidence,
          };
          setMessages(prev => [...prev, assistantMessage]);
          speakText(data.response);
        } else {
          throw new Error(data.message || 'Failed to get response');
        }
      } catch {
        setMessages(prev => [
          ...prev,
          {
            id: `error-${Date.now()}`,
            text: "I'm having trouble connecting right now. Please try again in a moment.",
            isUser: false,
            timestamp: new Date(),
            confidence: 0,
          },
        ]);
      } finally {
        setIsLoading(false);
        inputRef.current?.focus();
      }
    },
    [isLoading, sessionId, voiceSpeechEnabled]
  );

  // Speech Recognition Hook initialization
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition =
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        setSpeechSupported(true);
        const recog = new SpeechRecognition();
        recog.continuous = false;
        recog.interimResults = false;
        recog.lang = 'en-AE';

        recog.onresult = (e: any) => {
          const transcript = e.results[0]?.[0]?.transcript || '';
          if (transcript) {
            setInputValue(transcript);
            void sendMessage(transcript);
          }
          setIsListening(false);
        };

        recog.onerror = () => {
          setIsListening(false);
        };

        recog.onend = () => {
          setIsListening(false);
        };

        recognitionRef.current = recog;
      }
    }
  }, [sendMessage]);

  const toggleListening = () => {
    if (!recognitionRef.current) return;
    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      try {
        recognitionRef.current.start();
        setIsListening(true);
      } catch {
        setIsListening(false);
      }
    }
  };

  const loadHistory = async () => {
    try {
      const token = await getAuthToken();
      if (!token) return;
      const headers = { Authorization: `Bearer ${token}` };
      const response = await fetch(`/api/zoe/history?sessionId=${sessionId}&limit=20`, { headers });
      if (response.status === 401 || response.status === 403) return;
      const data = await response.json();
      if (data.success) {
        setConversationHistory(data.history);
      }
    } catch {
      // Non-critical fallback
    }
  };

  const clearConversation = () => {
    setMessages([
      {
        id: 'welcome-new',
        text: 'Conversation cleared. How can I help you?',
        isUser: false,
        timestamp: new Date(),
        confidence: 1,
      },
    ]);
  };

  const toggleHistory = () => {
    if (!showHistory) {
      void loadHistory();
    }
    setShowHistory(!showHistory);
  };

  return {
    messages,
    inputValue,
    setInputValue,
    isLoading,
    sessionId,
    showHistory,
    setShowHistory,
    conversationHistory,
    isListening,
    speechSupported,
    voiceSpeechEnabled,
    setVoiceSpeechEnabled,
    messagesEndRef,
    inputRef,
    sendMessage,
    toggleListening,
    toggleHistory,
    clearConversation,
    liveCampaignTelemetry,
    hotLeadEscalations,
  };
}

