import { Conversation, Message, QueuedConversation, UpdateConversationPayload, ListConversationsQuery } from '../types/nadia';


export const CONVERSATION_STATUS_MAP: Record<string, Conversation['status']> = {
  active: 'ACTIVE',
  assigned_to_agent: 'PENDING',
  in_bot_flow: 'ACTIVE',
  closed: 'CLOSED',
};

export const INTENT_MAP: Record<string, Message['intent']> = {
  property_search: 'PROPERTY_INQUIRY',
  schedule_tour: 'VIEWING_REQUEST',
  make_offer: 'PURCHASE_INTEREST',
  complaint: 'COMPLAINT',
  general_inquiry: 'UNKNOWN',
  financing: 'UNKNOWN',
  legal_enquiry: 'UNKNOWN',
  information_request: 'UNKNOWN',
};

export const normalizeConversationStatus = (status: unknown): Conversation['status'] => {
  if (typeof status !== 'string') {
    return 'ACTIVE';
  }

  return CONVERSATION_STATUS_MAP[status] ?? 'ACTIVE';
};

export const denormalizeConversationStatus = (
  status: UpdateConversationPayload['status']
): string | undefined => {
  switch (status) {
    case 'ACTIVE':
      return 'active';
    case 'PENDING':
      return 'assigned_to_agent';
    case 'CLOSED':
      return 'closed';
    case 'SPAM':
      return undefined;
    default:
      return undefined;
  }
};

export const denormalizeListStatus = (status: ListConversationsQuery['status']): string | undefined => {
  switch (status) {
    case 'ACTIVE':
      return 'active';
    case 'PENDING':
      return 'assigned_to_agent';
    case 'CLOSED':
      return 'closed';
    case 'SPAM':
      return undefined;
    default:
      return undefined;
  }
};

export const normalizePriority = (leadScore: number): Conversation['priority'] => {
  if (leadScore >= 75) return 'HIGH';
  if (leadScore >= 50) return 'NORMAL';
  return 'LOW';
};

export const normalizeSender = (direction: unknown): Message['sender'] => {
  return direction === 'outbound' ? 'AGENT' : 'CUSTOMER';
};

export const normalizeIntent = (intent: unknown): Message['intent'] | undefined => {
  if (typeof intent !== 'string') {
    return undefined;
  }

  return INTENT_MAP[intent] ?? undefined;
};

export const normalizeConversation = (raw: Record<string, unknown>): Conversation => {
  const messages = Array.isArray(raw?.messages) ? raw.messages : [];
  const latestMessage = messages[0] ?? null;
  const leadScore = Number(raw?.leadScore ?? 0);

  return {
    id: String(raw?.id ?? ''),
    customerPhone: String(raw?.customerPhone ?? ''),
    customerName: raw?.customerName ? String(raw.customerName) : undefined,
    status: normalizeConversationStatus(raw?.status),
    priority: normalizePriority(leadScore),
    leadScore,
    assignedAgent: raw?.agentPhone ? String(raw.agentPhone) : undefined,
    createdAt: (raw?.createdAt ? (raw.createdAt as string | Date) : new Date().toISOString()),
    updatedAt: (raw?.updatedAt ? (raw.updatedAt as string | Date) : (raw?.createdAt ? (raw.createdAt as string | Date) : new Date().toISOString())),
    closedAt: raw?.closedAt ? (raw.closedAt as string | Date) : undefined,
    lastMessage: latestMessage?.body ? String(latestMessage.body) : undefined,
    unreadCount: Number(raw?.unreadCount ?? 0),
    messageCount: messages.length || Number(raw?.messageCount ?? 0),
  };
};

export const normalizeMessage = (raw: Record<string, unknown>): Message => ({
  id: String(raw?.id ?? ''),
  conversationId: String(raw?.conversationId ?? ''),
  sender: normalizeSender(raw?.direction),
  content: String(raw?.body ?? raw?.content ?? ''),
  sentiment: (raw?.sentiment as any) ?? undefined,
  intent: normalizeIntent(raw?.intent),
  entities: (raw?.entities as any) ?? undefined,
  leadScore: raw?.leadScore !== undefined ? Number(raw.leadScore) : undefined,
  timestamp: (raw?.timestamp ? (raw.timestamp as string | Date) : (raw?.createdAt ? (raw.createdAt as string | Date) : new Date().toISOString())),
  createdAt: raw?.createdAt ? (raw.createdAt as string | Date) : undefined,
});

export const normalizeQueuedConversation = (raw: Record<string, unknown>, sortOrder = 0): QueuedConversation => {
  const conv = (raw?.conversation as Record<string, unknown>) || {};
  return {
    queueId: String(raw?.queueId ?? raw?.id ?? ''),
    conversationId: String(raw?.conversationId ?? conv?.id ?? ''),
    customerPhone: String(raw?.customerPhone ?? conv?.customerPhone ?? ''),
    customerName: (raw?.customerName ?? conv?.customerName) ? String(raw?.customerName ?? conv?.customerName) : undefined,
    priority:
      Number(raw?.priority ?? 0) <= 3 ? 'URGENT' : Number(raw?.priority ?? 0) <= 6 ? 'NORMAL' : 'LOW',
    leadScore: Number(raw?.leadScore ?? conv?.leadScore ?? 0),
    createdAt: (raw?.queuedAt ? (raw.queuedAt as string | Date) : (raw?.createdAt ? (raw.createdAt as string | Date) : new Date().toISOString())),
    waitTimeMinutes: Number(raw?.waitTimeMinutes ?? 0),
    sortOrder,
    status: normalizeConversationStatus(raw?.status ?? conv?.status),
  };
};

/**
 * Generic fetch wrapper with error handling
