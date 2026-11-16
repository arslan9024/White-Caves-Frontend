/**
 * Executive Dashboard — Data Layer (Mary Allen Wilkes Architecture)
 * Static & default KPI records, department metrics, revenue trends, and alert mocks
 * Strictly < 350 lines
 */

import { Building2, Users, DollarSign, TrendingUp } from 'lucide-react';
import type {
  KPIItem,
  TeamMetric,
  DepartmentMetric,
  RevenueMetric,
  LeadQualityMetric,
  DashboardAlert,
  MeetingItem,
  ActivityItem,
} from './ExecutiveDashboard.types';

export const DEFAULT_KPIS: KPIItem[] = [
  {
    label: 'Total Properties',
    value: '9,378+',
    change: '+12.5%',
    trend: 'up',
    color: 'primary',
    icon: Building2,
  },
  {
    label: 'Active Leads',
    value: '2,847',
    change: '+28.3%',
    trend: 'up',
    color: 'success',
    icon: Users,
  },
  {
    label: 'Monthly Revenue',
    value: 'AED 4.2M',
    change: '+18.7%',
    trend: 'up',
    color: 'warning',
    icon: DollarSign,
  },
  {
    label: 'Conversion Rate',
    value: '24.5%',
    change: '+3.2%',
    trend: 'up',
    color: 'info',
    icon: TrendingUp,
  },
];

export const TEAM_METRICS: TeamMetric[] = [
  { name: 'Clara', role: 'Leads Manager', leads: 342, conversion: '28%', status: 'excellent' },
  { name: 'Mary', role: 'Inventory Manager', properties: 1245, active: '98%', status: 'excellent' },
  { name: 'Sophia', role: 'Sales Pipeline', deals: 187, closureRate: '22%', status: 'good' },
  { name: 'Linda', role: 'WhatsApp Manager', conversations: 5234, responseTime: '2m', status: 'excellent' },
  { name: 'Theodora', role: 'Finance Director', revenue: 'AED 4.2M', margin: '18.5%', status: 'good' },
  { name: 'Aurora', role: 'CTO', systems: 'All Green', uptime: '99.97%', status: 'excellent' },
];

export const DEPARTMENT_METRICS: DepartmentMetric[] = [
  { name: 'Sales', kpis: 'Lead Gen', value: 2847, target: 2500, color: '#8B5CF6' },
  { name: 'Operations', kpis: 'Properties', value: 9378, target: 9000, color: '#3B82F6' },
  { name: 'Finance', kpis: 'Revenue', value: 4.2, target: 4.0, color: '#F59E0B' },
  { name: 'Marketing', kpis: 'Impressions', value: 184000, target: 150000, color: '#EC4899' },
  { name: 'Tech', kpis: 'Uptime %', value: 99.97, target: 99.5, color: '#06B6D4' },
];

export const REVENUE_DATA: RevenueMetric[] = [
  { month: 'Jan', revenue: 3.2, target: 3.5, expense: 1.8 },
  { month: 'Feb', revenue: 3.5, target: 3.5, expense: 1.9 },
  { month: 'Mar', revenue: 3.8, target: 3.8, expense: 2.0 },
  { month: 'Apr', revenue: 4.1, target: 4.0, expense: 2.1 },
  { month: 'May', revenue: 4.2, target: 4.2, expense: 2.2 },
];

export const LEADS_QUALITY_DATA: LeadQualityMetric[] = [
  { name: 'Hot', value: 45, color: '#10B981' },
  { name: 'Warm', value: 35, color: '#F59E0B' },
  { name: 'Cold', value: 20, color: '#6B7280' },
];

export const DASHBOARD_ALERTS: DashboardAlert[] = [
  {
    id: 1,
    type: 'critical',
    title: 'Inventory Alert',
    message: 'Low stock of premium villa listings in Damac Hills',
    timestamp: 'Just now',
    action: 'Review',
  },
  {
    id: 2,
    type: 'warning',
    title: 'Performance Alert',
    message: 'Dubizzle integration experiencing delays',
    timestamp: '15 min ago',
    action: 'Investigate',
  },
  {
    id: 3,
    type: 'info',
    title: 'New Opportunity',
    message: 'PropertyFinder integration showing 35% increase in leads',
    timestamp: '1 hour ago',
    action: 'Analyze',
  },
  {
    id: 4,
    type: 'success',
    title: 'Target Achieved',
    message: 'Monthly revenue target exceeded by 5%',
    timestamp: '2 hours ago',
    action: 'View',
  },
];

export const UPCOMING_MEETINGS: MeetingItem[] = [
  {
    id: 1,
    title: 'Weekly Executive Sync',
    attendees: ['Theodora', 'Aurora', 'Olivia'],
    time: '10:00 AM',
    date: 'Today',
    duration: '1 hour',
  },
  {
    id: 2,
    title: 'Board Review - Q1 Results',
    attendees: ['All Executives'],
    time: '2:00 PM',
    date: 'Today',
    duration: '2 hours',
  },
  {
    id: 3,
    title: 'Strategic Planning - H2 2026',
    attendees: ['Executive Team'],
    time: '10:00 AM',
    date: 'Tomorrow',
    duration: '3 hours',
  },
];

export const RECENT_ACTIVITIES: ActivityItem[] = [
  {
    id: 1,
    actor: 'Clara',
    action: 'Closed deal',
    target: 'Villa Unit 2456',
    value: 'AED 2.4M',
    timestamp: '2 min ago',
  },
  {
    id: 2,
    actor: 'Linda',
    action: 'Sent WhatsApp',
    target: 'Leads Follow-up',
    count: '187 messages',
    timestamp: '5 min ago',
  },
  {
    id: 3,
    actor: 'Mary',
    action: 'Updated inventory',
    target: 'New Listings',
    count: '24 properties',
    timestamp: '12 min ago',
  },
  {
    id: 4,
    actor: 'Theodora',
    action: 'Generated report',
    target: 'Monthly P&L',
    value: 'AED 4.2M revenue',
    timestamp: '45 min ago',
  },
];

