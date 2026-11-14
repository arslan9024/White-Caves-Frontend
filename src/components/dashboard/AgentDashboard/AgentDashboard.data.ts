/**
 * Agent Dashboard — Data Layer (Mary Allen Wilkes Architecture)
 * Metric defaults, conversion funnel stages, and activity aggregates
 */

import type {
  AgentMetrics,
  LeadStatusItem,
  FunnelStageItem,
  DailyActivityItem,
  TopLeadItem,
} from './AgentDashboard.types';

export const AGENT_METRICS: AgentMetrics = {
  totalLeads: 342,
  hotLeads: 87,
  warmLeads: 145,
  coldLeads: 110,
  conversionRate: '28%',
  avgResponseTime: '2.5 min',
  closureRate: '22%',
  weeklyTarget: 85,
  weeklyAchieved: 92,
};

export const LEADS_BY_STATUS: LeadStatusItem[] = [
  { name: 'New', value: 45, color: '#3B82F6' },
  { name: 'Contacted', value: 78, color: '#8B5CF6' },
  { name: 'Qualified', value: 65, color: '#F59E0B' },
  { name: 'Negotiating', value: 89, color: '#10B981' },
  { name: 'Closed', value: 65, color: '#06B6D4' },
];

export const CONVERSION_FUNNEL: FunnelStageItem[] = [
  { stage: 'New Leads', count: 342, percentage: 100 },
  { stage: 'Contacted', count: 287, percentage: 84 },
  { stage: 'Qualified', count: 198, percentage: 58 },
  { stage: 'Interested', count: 142, percentage: 41 },
  { stage: 'Proposal', count: 89, percentage: 26 },
  { stage: 'Closed', count: 65, percentage: 19 },
];

export const DAILY_ACTIVITY: DailyActivityItem[] = [
  { day: 'Mon', calls: 24, messages: 45, emails: 12, meetings: 3 },
  { day: 'Tue', calls: 28, messages: 52, emails: 15, meetings: 4 },
  { day: 'Wed', calls: 31, messages: 58, emails: 18, meetings: 5 },
  { day: 'Thu', calls: 26, messages: 49, emails: 14, meetings: 3 },
  { day: 'Fri', calls: 22, messages: 41, emails: 11, meetings: 2 },
];

export const TOP_LEADS: TopLeadItem[] = [
  {
    id: 1,
    name: 'Ahmed Hassan',
    property: 'Downtown Heights Apt 1204',
    budget: 'AED 3.8M',
    score: 95,
    status: 'hot',
    lastContact: '2 hours ago',
  },
  {
    id: 2,
    name: 'Sarah Jenkins',
    property: 'Palm Jumeirah Garden Home',
    budget: 'AED 18.5M',
    score: 92,
    status: 'hot',
    lastContact: '4 hours ago',
  },
  {
    id: 3,
    name: 'Dmitri Ivanov',
    property: 'Dubai Hills Estate Villa',
    budget: 'AED 8.2M',
    score: 84,
    status: 'warm',
    lastContact: '1 day ago',
  },
];
