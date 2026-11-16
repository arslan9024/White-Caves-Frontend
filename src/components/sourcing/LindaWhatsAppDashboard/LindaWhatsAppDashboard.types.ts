/**
 * Linda WhatsApp Dashboard — Types Layer (Mary Allen Wilkes Architecture)
 * Strict TypeScript types for Conversation, Opportunity, and Chat Models
 * Strictly < 350 lines
 */

export interface PropertyOpportunity {
  type: string;
  location: string;
  bedrooms: number;
  price: number;
  currency: string;
  frequency: string;
  availability: string;
  furnishing: string;
  features: string[];
  confidence: number;
}

export interface ConversationItem {
  id: string;
  name: string;
  phone: string;
  lastMessage: string;
  lastMessageTime: string;
  unread: number;
  hasOpportunity: boolean;
  opportunityConfidence: number;
}

export interface ChatMessageItem {
  id: string;
  sender: string;
  isMe: boolean;
  content: string;
  timestamp: string;
  hasOpportunity: boolean;
  opportunity?: PropertyOpportunity;
}

export type FilterStatus = 'all' | 'opportunity' | 'unread';

