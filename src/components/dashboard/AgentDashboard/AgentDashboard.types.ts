/**
 * Agent Dashboard — Types Layer (Mary Allen Wilkes Architecture)
 * Single-purpose type definitions strictly < 350 lines
 */

export interface AgentMetrics {
  totalLeads: number;
  hotLeads: number;
  warmLeads: number;
  coldLeads: number;
  conversionRate: string;
  avgResponseTime: string;
  closureRate: string;
  weeklyTarget: number;
  weeklyAchieved: number;
}

export interface LeadStatusItem {
  name: string;
  value: number;
  color: string;
}

export interface FunnelStageItem {
  stage: string;
  count: number;
  percentage: number;
}

export interface DailyActivityItem {
  day: string;
  calls: number;
  messages: number;
  emails: number;
  meetings: number;
}

export interface TopLeadItem {
  id: number;
  name: string;
  property: string;
  budget: string;
  score: number;
  status: string;
  lastContact: string;
}

export interface AgentDashboardProps {
  user?: unknown;
}

