import React from 'react';
import { MessageCircle, Star, Zap, Users, Filter, Bot, Archive, Globe } from 'lucide-react';
import { AssistantFeatureItem } from './features.types';

export const LINDA_FEATURES: AssistantFeatureItem[] = [
  {
    name: 'Real-time Chat Interface',
    category: 'Communication',
    status: 'active',
    description:
      'Live chat interface for WhatsApp conversations with read receipts, typing indicators, and message history.',
    sourceFiles: ['LindaWhatsAppCRM.jsx'],
    capabilities: ['Live messaging', 'Read receipts', 'Message history', 'Media support'],
    icon: <MessageCircle size={18} />,
  },
  {
    name: 'Lead Pre-qualification',
    category: 'AI Features',
    status: 'active',
    description:
      'AI-powered lead qualification based on conversation analysis and buying intent signals.',
    sourceFiles: ['LindaWhatsAppCRM.jsx'],
    capabilities: [
      'Intent detection',
      'Priority scoring',
      'Hot/warm/cold tagging',
      'AI recommendations',
    ],
    icon: <Star size={18} />,
  },
  {
    name: 'Quick Reply Templates',
    category: 'Automation',
    status: 'active',
    description: 'Pre-configured response templates for common inquiries with one-click insertion.',
    sourceFiles: ['LindaWhatsAppCRM.jsx'],
    capabilities: ['Template library', 'Quick insert', 'Category organization', 'Custom templates'],
    icon: <Zap size={18} />,
  },
  {
    name: 'Contact Management',
    category: 'CRM',
    status: 'active',
    description: 'Manage customer contacts with tags, priority levels, and conversation history.',
    sourceFiles: ['LindaWhatsAppCRM.jsx'],
    capabilities: ['Contact profiles', 'Tag system', 'Priority levels', 'History tracking'],
    icon: <Users size={18} />,
  },
  {
    name: 'Conversation Filtering',
    category: 'Organization',
    status: 'active',
    description: 'Filter and search conversations by priority, tags, status, and date range.',
    sourceFiles: ['LindaWhatsAppCRM.jsx'],
    capabilities: ['Priority filter', 'Tag filter', 'Search', 'Date range'],
    icon: <Filter size={18} />,
  },
  {
    name: 'AI Insights Panel',
    category: 'AI Features',
    status: 'active',
    description:
      'Real-time AI suggestions and insights during conversations for better engagement.',
    sourceFiles: ['LindaWhatsAppCRM.jsx'],
    capabilities: [
      'Conversation insights',
      'Response suggestions',
      'Sentiment analysis',
      'Action prompts',
    ],
    icon: <Bot size={18} />,
  },
  {
    name: 'Conversation Archive',
    category: 'Organization',
    status: 'active',
    description: 'Archive completed conversations with search and export functionality.',
    sourceFiles: ['LindaWhatsAppCRM.jsx'],
    capabilities: ['Archive system', 'Search archived', 'Export history', 'Restore function'],
    icon: <Archive size={18} />,
  },
  {
    name: 'Multi-channel Support',
    category: 'Communication',
    status: 'planned',
    description: 'Extend support to SMS, email, and social media channels in unified inbox.',
    capabilities: ['SMS integration', 'Email sync', 'Social media', 'Unified inbox'],
    nextMilestone: 'Add SMS channel',
    icon: <Globe size={18} />,
  },
];
