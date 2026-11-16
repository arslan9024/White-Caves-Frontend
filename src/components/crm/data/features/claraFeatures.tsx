import React from 'react';
import {
  TrendingUp,
  Users,
  Star,
  Clock,
  Calendar,
  Phone,
  Globe,
  Briefcase,
  Eye,
  AlertCircle,
} from 'lucide-react';
import { AssistantFeatureItem } from './features.types';

export const CLARA_FEATURES: AssistantFeatureItem[] = [
  {
    name: 'Lead Pipeline Management',
    category: 'Lead Management',
    status: 'active',
    description:
      'Visual pipeline for tracking leads through stages: initial, qualified, viewing, offer, closed.',
    sourceFiles: ['ClaraLeadsCRM.jsx'],
    capabilities: ['Stage tracking', 'Drag-drop', 'Stage automation', 'Conversion tracking'],
    icon: <TrendingUp size={18} />,
  },
  {
    name: 'Lead CRUD Operations',
    category: 'Lead Management',
    status: 'active',
    description: 'Full create, read, update, delete operations for leads with comprehensive forms.',
    sourceFiles: ['ClaraLeadsCRM.jsx'],
    capabilities: ['Add leads', 'Edit info', 'Delete leads', 'Bulk actions'],
    icon: <Users size={18} />,
  },
  {
    name: 'AI Lead Scoring',
    category: 'AI Features',
    status: 'active',
    description:
      'Automated lead scoring based on engagement, budget, timeline, and behavior patterns.',
    sourceFiles: ['ClaraLeadsCRM.jsx'],
    capabilities: ['Auto-scoring', 'Score breakdown', 'Priority ranking', 'Score history'],
    icon: <Star size={18} />,
  },
  {
    name: 'Activity Timeline',
    category: 'Communication',
    status: 'active',
    description:
      'Chronological activity log for all lead interactions including calls, emails, and meetings.',
    sourceFiles: ['ClaraLeadsCRM.jsx'],
    capabilities: ['Activity log', 'Type filtering', 'Notes', 'Timeline view'],
    icon: <Clock size={18} />,
  },
  {
    name: 'Follow-up Management',
    category: 'Task Management',
    status: 'active',
    description: 'Schedule and track follow-ups with reminders and calendar integration.',
    sourceFiles: ['ClaraLeadsCRM.jsx'],
    capabilities: ['Schedule follow-ups', 'Reminders', 'Overdue alerts', 'Calendar sync'],
    icon: <Calendar size={18} />,
  },
  {
    name: 'Contact Management',
    category: 'Lead Management',
    status: 'active',
    description:
      'Multi-channel contact options with call logging, email tracking, and WhatsApp integration.',
    sourceFiles: ['ClaraLeadsCRM.jsx'],
    capabilities: ['Call logging', 'Email tracking', 'WhatsApp link', 'Contact history'],
    icon: <Phone size={18} />,
  },
  {
    name: 'Source Tracking',
    category: 'Analytics',
    status: 'active',
    description:
      'Track lead sources (website, referral, portal, social) with conversion analytics.',
    sourceFiles: ['ClaraLeadsCRM.jsx'],
    capabilities: ['Source tagging', 'Conversion rates', 'ROI tracking', 'Source comparison'],
    icon: <Globe size={18} />,
  },
  {
    name: 'Agent Assignment',
    category: 'Team Management',
    status: 'active',
    description: 'Assign leads to agents with round-robin, load balancing, or manual assignment.',
    sourceFiles: ['ClaraLeadsCRM.jsx'],
    capabilities: ['Manual assign', 'Round-robin', 'Load balance', 'Reassignment'],
    icon: <Briefcase size={18} />,
  },
  {
    name: 'Lead Detail Modal',
    category: 'Display',
    status: 'active',
    description: 'Comprehensive lead detail view with all info, activities, and quick actions.',
    sourceFiles: ['ClaraLeadsCRM.jsx', 'FullScreenDetailModal.jsx'],
    capabilities: ['Full profile', 'Activity history', 'Quick actions', 'Notes section'],
    icon: <Eye size={18} />,
  },
  {
    name: 'SLA Monitoring',
    category: 'Compliance',
    status: 'planned',
    description: 'Track response time SLAs with alerts for overdue follow-ups.',
    capabilities: ['Response SLAs', 'Overdue alerts', 'Performance reports', 'Escalation'],
    nextMilestone: 'Define SLA rules',
    icon: <AlertCircle size={18} />,
  },
];

