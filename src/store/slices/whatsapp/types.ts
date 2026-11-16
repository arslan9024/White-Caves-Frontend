export interface WhatsAppSession {
  sessionId: string;
  ownerEmail: string;
  phoneNumber?: string;
  businessName?: string;
  connectionStatus: 'disconnected' | 'connecting' | 'qr_pending' | 'authenticated' | 'error';
  connectedAt?: Date;
  messageCount: number;
  autoReplyEnabled: boolean;
  chatbotEnabled: boolean;
}

export interface WhatsAppMessage {
  id: string;
  phoneNumber: string;
  body: string;
  type: 'text' | 'media';
  direction: 'sent' | 'received';
  timestamp: Date;
  status: 'pending' | 'sent' | 'delivered' | 'read' | 'failed';
  retryCount?: number;
  priority?: 'high' | 'normal' | 'low';
}

export interface WhatsAppQueue {
  size: number;
  maxSize: number;
  processing: number;
  messages: WhatsAppMessage[];
}

export interface WhatsAppHealth {
  activeSessions: number;
  authenticatedSessions: number;
  uptime: number;
  status: 'operational' | 'degraded' | 'offline';
}

export interface WhatsAppState {
  session: WhatsAppSession | null;
  messages: WhatsAppMessage[];
  queue: WhatsAppQueue;
  health: WhatsAppHealth;
  loading: {
    connecting: boolean;
    disconnecting: boolean;
    sending: boolean;
    fetchingHistory: boolean;
  };
  error: string | null;
  success: string | null;
  qrCode: string | null;
  showModal: boolean;
  modalType: 'qr' | 'messages' | 'queue' | 'settings' | null;
}

// ================================
// Initial State
// ================================

