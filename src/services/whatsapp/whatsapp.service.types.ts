export interface LinkDeviceRequest {
  accountId: string;
  phoneNumber: string;
}

export interface LinkDeviceResponse {
  success: boolean;
  data: {
    sessionId: string;
    accountId: string;
    phoneNumber: string;
    qrCode: string;
    expiresIn: number;
    status: string;
  };
}

export interface ConfirmLinkRequest {
  sessionId: string;
  authToken: string;
  phoneNumber: string;
}

export interface ConfirmLinkResponse {
  success: boolean;
  data: {
    accountId: string;
    phoneNumber: string;
    status: string;
    message: string;
  };
}

export interface Account {
  accountId: string;
  phoneNumber: string;
  status: 'linking' | 'authenticated' | 'connected' | 'disconnected';
  messageCount: number;
}

export interface Message {
  messageId: string;
  from: string;
  to: string;
  body: string;
  timestamp: Date;
  type: 'text' | 'image' | 'video' | 'document' | 'audio';
  direction: 'incoming' | 'outgoing';
  status: 'sent' | 'delivered' | 'read';
}

export interface Conversation {
  conversationId: string;
  recipientPhone: string;
  recipientName?: string;
  isGroup: boolean;
  messageCount: number;
  unreadCount: number;
  lastMessage?: string;
  lastMessageTime?: Date;
  metadata: {
    isArchived?: boolean;
    isPinned?: boolean;
    isMuted?: boolean;
  };
}

export interface Counter {
  total: number;
  incoming: number;
  outgoing: number;
  segments?: Record<string, number>;
}

export interface Metrics {
  today: {
    total: number;
    incoming: number;
    outgoing: number;
  };
  week: {
    total: number;
    average: number;
  };
  month: {
    total: number;
    average: number;
  };
  growth: {
    daily: number;
  };
  topSegment: {
    segment: string;
    count: number;
  };
  responseRate: number;
}

export type GenericApiData = Record<string, unknown>;

