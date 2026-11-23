import React from 'react';
import {
  Smartphone,
  Terminal,
  Code,
  TrendingUp,
  MessageSquare,
  Star,
  Calendar,
  Bot,
  Database,
  Phone,
  Wifi,
  MessageCircle,
  Send,
  Globe,
  FileText,
} from 'lucide-react';
import { NinaFeatureItem } from './types';

export const NINA_CORE_FEATURES: NinaFeatureItem[] = [
  {
    name: 'Multi-Bot Session Manager',
    category: 'Bot Management',
    status: 'active',
    description:
      'Manage multiple WhatsApp bot sessions (Lion0, Lion1, Lion2) with real-time status monitoring, QR code scanning for new connections, and session persistence.',
    sourceFiles: ['NinaWhatsAppBotCRM.jsx', 'SessionManager.js'],
    capabilities: [
      'Connect/disconnect bots',
      'QR code generation',
      'Session persistence',
      'Multi-device support',
    ],
    icon: <Smartphone size={18} />,
  },
  {
    name: 'Web Terminal Interface',
    category: 'Development Tools',
    status: 'active',
    description:
      'Built-in terminal for executing commands, viewing real-time logs, and debugging bot behavior with color-coded output.',
    sourceFiles: ['NinaWhatsAppBotCRM.jsx'],
    capabilities: ['Command execution', 'Real-time logs', 'Log export', 'Color-coded output'],
    icon: <Terminal size={18} />,
  },
  {
    name: 'Code Module Explorer',
    category: 'Development Tools',
    status: 'active',
    description:
      'File explorer and code viewer for WhatsApp bot modules including client creation, message handlers, and configuration files.',
    sourceFiles: [
      'CreatingNewWhatsAppClient.js',
      'WhatsAppClientFunctions.js',
      'MessageHandler.js',
    ],
    capabilities: [
      'File browser',
      'Syntax highlighting',
      'Copy/download code',
      'Line count display',
    ],
    icon: <Code size={18} />,
  },
  {
    name: 'Bot Analytics Dashboard',
    category: 'Analytics',
    status: 'active',
    description:
      'Comprehensive analytics showing message volume, lead generation, response rates, and performance comparison across all bots.',
    sourceFiles: ['NinaWhatsAppBotCRM.jsx'],
    capabilities: ['Message metrics', 'Lead tracking', 'Response time analysis', 'Bot comparison'],
    icon: <TrendingUp size={18} />,
  },
  {
    name: 'Auto-Reply Engine',
    category: 'Automation',
    status: 'active',
    description:
      'Automated response system with AI-powered intent detection and customizable reply templates.',
    sourceFiles: ['AutoReply.js', 'MessageHandler.js'],
    capabilities: [
      'Intent detection',
      'Template responses',
      'Keyword triggers',
      'Business hours handling',
    ],
    icon: <MessageSquare size={18} />,
  },
  {
    name: 'Lead Scoring Module',
    category: 'AI/ML',
    status: 'active',
    description:
      'AI-powered lead scoring based on conversation analysis, engagement patterns, and buying signals.',
    sourceFiles: ['AIServices.js', 'LeadScoring.js'],
    capabilities: [
      'Engagement scoring',
      'Intent analysis',
      'Priority classification',
      'Score thresholds',
    ],
    icon: <Star size={18} />,
  },
  {
    name: 'Appointment Booking Integration',
    category: 'Integrations',
    status: 'active',
    description:
      'Automated appointment scheduling through WhatsApp with calendar sync and confirmation messages.',
    sourceFiles: ['AppointmentBooking.js'],
    capabilities: [
      'Calendar integration',
      'Auto-confirmation',
      'Reminder messages',
      'Rescheduling',
    ],
    icon: <Calendar size={18} />,
  },
  {
    name: 'WhatsApp Client Factory',
    category: 'Core System',
    status: 'active',
    description:
      'Core module for creating and initializing new WhatsApp Web.js clients with authentication handling.',
    sourceFiles: ['CreatingNewWhatsAppClient.js'],
    capabilities: ['Client initialization', 'Auth handling', 'Error recovery', 'Session caching'],
    icon: <Bot size={18} />,
  },
  {
    name: 'Message Queue System',
    category: 'Core System',
    status: 'active',
    description:
      'Queue-based message processing for handling high volumes and preventing rate limiting.',
    sourceFiles: ['MessageHandler.js', 'BroadcastManager.js'],
    capabilities: ['Queue processing', 'Rate limiting', 'Retry logic', 'Priority queues'],
    icon: <Database size={18} />,
  },
  {
    name: 'Multi-Number Support',
    category: 'Bot Management',
    status: 'active',
    description:
      'Support for managing multiple phone numbers with team member assignment and routing rules.',
    sourceFiles: ['ArslanNumbers.js', 'NawalNumbers.js', 'BotConfig.js'],
    capabilities: ['Number management', 'Agent assignment', 'Load balancing', 'Fallback routing'],
    icon: <Phone size={18} />,
  },
  {
    name: 'Real-time Connection Monitor',
    category: 'Monitoring',
    status: 'active',
    description:
      'Live monitoring of bot connection status with automatic reconnection and alert notifications.',
    sourceFiles: ['SessionManager.js'],
    capabilities: ['Status monitoring', 'Auto-reconnect', 'Alert system', 'Uptime tracking'],
    icon: <Wifi size={18} />,
  },
  {
    name: 'FAQ Bot Module',
    category: 'Automation',
    status: 'active',
    description:
      'Pre-configured FAQ responses for common real estate inquiries with multi-language support.',
    sourceFiles: ['AutoReply.js'],
    capabilities: ['FAQ matching', 'Multi-language', 'Fuzzy search', 'Category routing'],
    icon: <MessageCircle size={18} />,
  },
  {
    name: 'Broadcast Messaging',
    category: 'Communication',
    status: 'active',
    description:
      'Bulk message broadcasting to contact lists with scheduling and personalization tokens.',
    sourceFiles: ['BroadcastManager.js', 'CampaignService.js'],
    capabilities: ['Bulk sending', 'Scheduling', 'Personalization', 'Delivery tracking'],
    icon: <Send size={18} />,
  },
  {
    name: 'Webhook Integration',
    category: 'Integrations',
    status: 'beta',
    description:
      'Webhook endpoints for external system integration and real-time event notifications.',
    sourceFiles: ['WhatsAppClientFunctions.js'],
    capabilities: ['Event webhooks', 'API endpoints', 'Authentication', 'Retry handling'],
    nextMilestone: 'Add Zapier integration',
    icon: <Globe size={18} />,
  },
  {
    name: 'Media Handler',
    category: 'Core System',
    status: 'active',
    description:
      'Process and send images, documents, and voice messages with automatic optimization.',
    sourceFiles: ['MessageHandler.js'],
    capabilities: ['Image processing', 'Document sharing', 'Voice messages', 'File compression'],
    icon: <FileText size={18} />,
  },
];
