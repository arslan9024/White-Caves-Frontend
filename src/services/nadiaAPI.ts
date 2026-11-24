/**
 * NADIA WhatsApp CRM - API Service Layer
 * Handles all HTTP requests to backend NADIA endpoints.
 * Uses authFetch for automatic JWT injection + session handling.
 */

import {
  Conversation,
  Message,
  QueuedConversation,
  QueueStats,
  CreateConversationPayload,
  SendMessagePayload,
  UpdateConversationPayload,
  AssignAgentPayload,
  ListConversationsQuery,
  ApiResponse,
} from '../types/nadia';
import { Config } from '../config/constants';
import { authFetch } from '../utils/authFetch';
import { createLogger } from '../utils/logger';

const log = createLogger('nadiaAPI');
const NADIA_API = `${Config.API_URL}/api/nadia`;
import {
  normalizeConversationStatus,
  denormalizeConversationStatus,
  denormalizeListStatus,
  normalizeConversation,
  normalizeMessage,
  normalizeQueuedConversation,
} from './nadiaMappers';
 */
async function fetchApi<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const url = `${NADIA_API}${endpoint}`;

  try {
    const response = await authFetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers as Record<string, string>),
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(e => {
        log.debug('Non-JSON error response:', e);
        return {};
      });
      throw new Error(errorData.error || `API Error: ${response.status} ${response.statusText}`);
    }

    const data: ApiResponse<T> = await response.json();

    if (!data.success) {
      throw new Error(data.error || 'API returned success: false');
    }

    return data.data;
  } catch (error) {
    log.error(`API Error [${endpoint}]:`, error);
    throw error;
  }
}

/**
 * CONVERSATIONS API
 */
const conversationsAPI = {
  /**
   * Create a new conversation
   */
  create: async (payload: CreateConversationPayload): Promise<Conversation> => {
    const data = await fetchApi<any>('/conversations', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
    return normalizeConversation(data);
  },

  /**
   * Fetch all conversations with optional filters
   */
  list: async (query?: ListConversationsQuery): Promise<Conversation[]> => {
    const params = new URLSearchParams();
    if (query?.status) {
      const backendStatus = denormalizeListStatus(query.status);
      if (backendStatus) params.append('status', backendStatus);
    }
    if (query?.skip !== undefined) params.append('offset', query.skip.toString());
    if (query?.limit !== undefined) params.append('limit', query.limit.toString());
    if (query?.sortBy) params.append('sortBy', query.sortBy);
    if (query?.sortDirection) params.append('sortOrder', query.sortDirection);

    const endpoint = params.toString() ? `/conversations?${params}` : '/conversations';
    const data = await fetchApi<any[]>(endpoint);
    return data.map(normalizeConversation);
  },

  /**
   * Get single conversation by ID
   */
  getById: async (id: string): Promise<Conversation> => {
    const data = await fetchApi<any>(`/conversations/${id}`);
    return normalizeConversation(data);
  },

  /**
   * Update conversation (status, priority, agent assignment)
   */
  update: async (id: string, payload: UpdateConversationPayload): Promise<Conversation> => {
    const requestPayload = {
      ...(payload.status ? { status: denormalizeConversationStatus(payload.status) } : {}),
      ...(payload.assignedAgent ? { agentPhone: payload.assignedAgent } : {}),
    };

    const data = await fetchApi<any>(`/conversations/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(requestPayload),
    });
    return normalizeConversation(data);
  },

  /**
   * Close a conversation
   */
  close: async (id: string, reason?: string): Promise<Conversation> => {
    const data = await fetchApi<any>(`/conversations/${id}/close`, {
      method: 'PATCH',
      body: JSON.stringify({ reason }),
    });

    return normalizeConversation(data);
  },
};

/**
 * MESSAGES API
 */
const messagesAPI = {
  /**
   * Send a message in a conversation
   */
  send: async (conversationId: string, payload: SendMessagePayload): Promise<Message> => {
    const endpoint =
      payload.sender === 'AGENT'
        ? `/conversations/${conversationId}/reply`
        : `/conversations/${conversationId}/messages`;

    const body =
      payload.sender === 'AGENT'
        ? { content: payload.content }
        : { content: payload.content, senderType: 'customer' };

    const data = await fetchApi<any>(endpoint, {
      method: 'POST',
      body: JSON.stringify(body),
    });

    return normalizeMessage(data);
  },

  /**
   * Get all messages for a conversation
   */
  listByConversation: async (
    conversationId: string,
    skip: number = 0,
    limit: number = 50
  ): Promise<Message[]> => {
    const params = new URLSearchParams({
      offset: skip.toString(),
      limit: limit.toString(),
    });
    return fetchApi<any[]>(`/conversations/${conversationId}/messages?${params}`).then(messages =>
      messages.map(normalizeMessage)
    );
  },

  /**
   * Get single message by ID
   */
  getById: async (conversationId: string, messageId: string): Promise<Message> => {
    const data = await fetchApi<any>(`/conversations/${conversationId}/messages/${messageId}`);
    return normalizeMessage(data);
  },
};

/**
 * QUEUE API
 */
const queueAPI = {
  /**
   * Get current queue of waiting conversations
   */
  list: async (): Promise<QueuedConversation[]> => {
    const data = await fetchApi<any[]>('/queue');
    return data.map((item, index) => normalizeQueuedConversation(item, index));
  },

  /**
   * Assign queued conversation to agent
   */
  assignAgent: async (queueId: string, agentPhone: string): Promise<QueuedConversation> => {
    const data = await fetchApi<any>(`/queue/${queueId}/assign`, {
      method: 'PATCH',
      body: JSON.stringify({ agentPhone }),
    });

    return normalizeQueuedConversation(data);
  },

  /**
   * Get queue statistics
   */
  getStats: async (): Promise<QueueStats> => {
    return fetchApi<QueueStats>('/queue-stats');
  },
};

/**
 * HEALTH API
 */
const healthAPI = {
  /**
   * Check if NADIA service is running
   */
  check: async (): Promise<{ status: string; timestamp: string }> => {
    return fetchApi<{ status: string; timestamp: string }>('/health');
  },
};

/**
 * Batch operations
 */
const batchAPI = {
  /**
   * Load all initial data for dashboard
   */
  loadDashboard: async (): Promise<{
    conversations: Conversation[];
    queue: QueuedConversation[];
    stats: QueueStats;
  }> => {
    try {
      const [conversations, queue, stats] = await Promise.all([
        conversationsAPI.list({ limit: 100, sortBy: 'leadScore', sortDirection: 'desc' }),
        queueAPI.list(),
        queueAPI.getStats(),
      ]);

      return { conversations, queue, stats };
    } catch (error) {
      log.error('Error loading dashboard data:', error);
      throw error;
    }
  },

  /**
   * Load conversation with all its messages
   */
  loadConversationThread: async (
    conversationId: string
  ): Promise<{
    conversation: Conversation;
    messages: Message[];
  }> => {
    try {
      const [conversation, messages] = await Promise.all([
        conversationsAPI.getById(conversationId),
        messagesAPI.listByConversation(conversationId, 0, 100),
      ]);

      return { conversation, messages };
    } catch (error) {
      log.error(`Error loading conversation ${conversationId}:`, error);
      throw error;
    }
  },
};

/**
 * Export all API groups for easy access
 */
export const nadiaAPI = {
  conversations: conversationsAPI,
  messages: messagesAPI,
  queue: queueAPI,
  health: healthAPI,
  batch: batchAPI,
};

export default nadiaAPI;

