/**
 * Right AI Sidebar — Types Layer (Mary Allen Wilkes Architecture)
 * Strict TypeScript types for Assistant Hub and Chat models
 * Strictly < 350 lines
 */

export interface ChatMessage {
  id: number | string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
}

export interface AssistantInfo {
  id: string;
  name: string;
  title: string;
  department: string;
  avatar?: string;
  description?: string;
}

export interface RightAISidebarProps {
  activeAssistant?: string;
}

