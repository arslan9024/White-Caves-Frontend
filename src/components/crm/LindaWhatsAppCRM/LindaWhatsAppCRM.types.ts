export type LindaViewTab =
  'all' | 'terminal' | 'sessions' | 'outreach' | 'conversations' | 'whatsapp_web';

export interface LindaMetricsState {
  uptime: string;
  activeSessions: string;
  rateLimit: string;
  memory: string;
  conversionVelocity: string;
  antiBanSafetyScore: string;
}

export type {
  LindaSessionItem,
  LindaCampaignItem,
  LindaFeatureBadge,
  LindaPlaybookBadge,
  LindaOutreachOwnerRow,
  LindaConversationItem,
  LindaPillarItem,
} from './LindaWhatsAppCRM.data';
import type {
  LindaSessionItem,
  LindaCampaignItem,
  LindaConversationItem,
  LindaFeatureBadge,
  LindaPlaybookBadge,
} from './LindaWhatsAppCRM.data';
import type React from 'react';

export interface UseLindaOperationsCenterReturn {
  isConnected: boolean;
  setIsConnected: React.Dispatch<React.SetStateAction<boolean>>;
  lindaStatus: string;
  setLindaStatus: React.Dispatch<React.SetStateAction<string>>;
  loadingAction: 'start' | 'stop' | 'restart' | null;
  controlError: string;
  setControlError: React.Dispatch<React.SetStateAction<string>>;
  soundEnabled: boolean;
  setSoundEnabled: React.Dispatch<React.SetStateAction<boolean>>;
  currentTimeGST: string;
  heartbeatLatency: number;
  confirmEmergencyStop: boolean;
  setConfirmEmergencyStop: React.Dispatch<React.SetStateAction<boolean>>;
  qrCodeDataUrl: string | null;
  setQrCodeDataUrl: React.Dispatch<React.SetStateAction<string | null>>;
  isQrLoading: boolean;
  toastNotification: string | null;
  setToastNotification: React.Dispatch<React.SetStateAction<string | null>>;
  metrics: LindaMetricsState;
  setMetrics: React.Dispatch<React.SetStateAction<LindaMetricsState>>;
  sessions: LindaSessionItem[];
  setSessions: React.Dispatch<React.SetStateAction<LindaSessionItem[]>>;
  campaigns: LindaCampaignItem[];
  setCampaigns: React.Dispatch<React.SetStateAction<LindaCampaignItem[]>>;
  conversations: LindaConversationItem[];
  setConversations: React.Dispatch<React.SetStateAction<LindaConversationItem[]>>;
  features: LindaFeatureBadge[];
  playbooks: LindaPlaybookBadge[];
  activeModalOutput: { title: string; output: string } | null;
  setActiveModalOutput: React.Dispatch<
    React.SetStateAction<{ title: string; output: string } | null>
  >;
  terminalLines: string[];
  setTerminalLines: React.Dispatch<React.SetStateAction<string[]>>;
  liveLogs: string[];
  appendLog: (msg: string) => void;
  refreshLindaStatus: () => Promise<void>;
  handleToggleLindaRuntime: () => Promise<void>;
  handleExecuteCommand: (cmd: string, label?: string) => Promise<void>;
  handlePingSession: (sessionId: string) => void;
  handlePairDeviceCode: (session: LindaSessionItem) => void;
  handleScanDeviceQr: (session: LindaSessionItem) => Promise<void>;
  handleToggleCampaignStatus: (campaignId: string) => void;
  handleQueueOutreachBatch: (cluster: string) => void;
  handleSendQuickReply: (conv: LindaConversationItem) => void;
}
