import React from 'react';
import {
  Lock,
  Eye,
  Key,
  Fingerprint,
  Map,
  Clock,
  Timer,
  Bot,
  UserX,
  Shuffle,
  Database,
  Phone,
  TrendingUp,
  FileText,
} from 'lucide-react';
import { NinaFeatureItem } from './types';

export const NINA_SECURITY_CAMPAIGN_FEATURES: NinaFeatureItem[] = [
  {
    name: 'AES-256 Encrypted Storage',
    category: 'Security',
    status: 'active',
    description:
      'Military-grade AES-256-GCM encryption for WhatsApp session data and sensitive information.',
    sourceFiles: ['SecurityServices.js'],
    capabilities: [
      'AES-256 encryption',
      'IV generation',
      'Auth tag verification',
      'Secure key management',
    ],
    icon: <Lock size={18} />,
  },
  {
    name: 'Access Audit Logger',
    category: 'Security',
    status: 'active',
    description:
      'Comprehensive audit logging for all Nina actions including user access, API calls, and campaign executions.',
    sourceFiles: ['SecurityServices.js'],
    capabilities: [
      'Action logging',
      'User tracking',
      'IP logging',
      'Suspicious activity detection',
    ],
    icon: <Eye size={18} />,
  },
  {
    name: 'Role-Based Access Control',
    category: 'Security',
    status: 'active',
    description:
      'Granular permission system with admin, manager, agent, and viewer roles for controlled access.',
    sourceFiles: ['SecurityServices.js'],
    capabilities: [
      'Role assignment',
      'Permission checking',
      'User management',
      'Access restrictions',
    ],
    icon: <Key size={18} />,
  },
  {
    name: 'Session Management',
    category: 'Security',
    status: 'active',
    description:
      'Secure session handling with automatic expiration, activity tracking, and session cleanup.',
    sourceFiles: ['SecurityServices.js'],
    capabilities: [
      'Session creation',
      'Expiry handling',
      'Activity tracking',
      'Cleanup automation',
    ],
    icon: <Fingerprint size={18} />,
  },
  {
    name: 'ISO Country Mapper',
    category: 'Scheduling',
    status: 'active',
    description:
      'Complete ISO 3166-1 country code mapping with nationality detection, timezone, and business hours.',
    sourceFiles: ['SchedulingServices.js'],
    capabilities: ['Country detection', 'Nationality mapping', 'Timezone lookup', 'Business hours'],
    icon: <Map size={18} />,
  },
  {
    name: 'Local Time Scheduler',
    category: 'Scheduling',
    status: 'active',
    description:
      'Timezone-aware message scheduling that respects local business hours and weekends per country.',
    sourceFiles: ['SchedulingServices.js'],
    capabilities: [
      'Local time calculation',
      'Weekend detection',
      'Lunch break avoidance',
      'DST handling',
    ],
    icon: <Clock size={18} />,
  },
  {
    name: 'Strict Schedule Manager',
    category: 'Scheduling',
    status: 'active',
    description:
      'Enforces strict sending windows with off-hours blocking, hourly limits, and time-based rate controls.',
    sourceFiles: ['SchedulingServices.js'],
    capabilities: ['Off-hour blocking', 'Hourly limits', 'Daily quotas', 'Time-based throttling'],
    icon: <Timer size={18} />,
  },
  {
    name: 'Behavioral Simulator',
    category: 'Anti-Detection',
    status: 'active',
    description: 'Simulates human-like typing delays and response patterns to avoid bot detection.',
    sourceFiles: ['SchedulingServices.js'],
    capabilities: ['Typing simulation', 'Random delays', 'Activity patterns', 'Natural pacing'],
    icon: <Bot size={18} />,
  },
  {
    name: 'Opt-Out Detector',
    category: 'Compliance',
    status: 'active',
    description:
      'Scans chat history for opt-out keywords in English and Arabic to respect user preferences.',
    sourceFiles: ['SchedulingServices.js'],
    capabilities: ['Keyword detection', 'Arabic support', 'Auto-blocking', 'Compliance logging'],
    icon: <UserX size={18} />,
  },
  {
    name: 'Weighted Random Selection',
    category: 'Campaign Intelligence',
    status: 'active',
    description:
      'Intelligent contact selection with 30-day restriction and weighted prioritization for older contacts.',
    sourceFiles: ['CampaignService.js'],
    capabilities: [
      '30-day restriction',
      'Weight-based selection',
      'Pattern avoidance',
      'Fair distribution',
    ],
    icon: <Shuffle size={18} />,
  },
  {
    name: 'Google Sheets Integration',
    category: 'Integrations',
    status: 'active',
    description:
      'Direct integration with Google Sheets for contact management and campaign result logging.',
    sourceFiles: ['GoogleSheetsService.js'],
    capabilities: ['Sheet reading', 'Data writing', 'Auto-sync', 'Project mapping'],
    icon: <Database size={18} />,
  },
  {
    name: 'Phone Number Validator',
    category: 'Core System',
    status: 'active',
    description:
      'UAE-focused phone validation with network detection (Etisalat, Du) and international support.',
    sourceFiles: ['PhoneNumberService.js'],
    capabilities: [
      'UAE validation',
      'Network detection',
      'Format normalization',
      'Duplicate removal',
    ],
    icon: <Phone size={18} />,
  },
  {
    name: 'Campaign Manager',
    category: 'Campaign Intelligence',
    status: 'active',
    description:
      'Full campaign lifecycle management with project selection, blocklist handling, and progress tracking.',
    sourceFiles: ['CampaignService.js', 'BroadcastManager.js'],
    capabilities: [
      'Campaign creation',
      'Progress tracking',
      'Blocklist integration',
      'Stats aggregation',
    ],
    icon: <TrendingUp size={18} />,
  },
  {
    name: 'Message Templates',
    category: 'Communication',
    status: 'active',
    description:
      'Professional bilingual message templates with personalization tokens and category organization.',
    sourceFiles: ['MessageTemplates.js'],
    capabilities: ['Template library', 'Arabic/English', 'Personalization', 'Category filtering'],
    icon: <FileText size={18} />,
  },
];
