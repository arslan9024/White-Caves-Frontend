import {
  Activity,
  BarChart3,
  Briefcase,
  Download,
  FileText,
  MessageSquare,
  Plus,
  TrendingUp,
  Users,
} from 'lucide-react';
import type { DepartmentContent } from './types';

export const GROWTH_DEPARTMENTS: Record<string, DepartmentContent> = {
  marketing: {
    name: 'Marketing',
    icon: 'Megaphone',
    color: '#EC4899',
    bgGradient: 'linear-gradient(135deg, #EC4899 0%, #DB2777 100%)',
    description: 'Manage campaigns, content, and marketing analytics',
    metrics: [
      { label: 'Active Campaigns', value: '12', change: '+3', trend: 'up' },
      { label: 'Email Subscribers', value: '45.2K', change: '+8%', trend: 'up' },
      { label: 'Social Followers', value: '87.3K', change: '+15%', trend: 'up' },
      { label: 'Lead Generation', value: '342/mo', change: '+24%', trend: 'up' },
    ],
    services: {
      Campaigns: {
        description: 'Create & Manage Campaigns',
        stats: [
          { label: 'Active Campaigns', value: '12' },
          { label: 'Completed', value: '56' },
          { label: 'Avg ROI', value: '4.2x' },
        ],
        actions: [
          { label: 'Create Campaign', icon: Plus },
          { label: 'View Campaigns', icon: BarChart3 },
          { label: 'Campaign Analytics', icon: TrendingUp },
        ],
      },
      Content: {
        description: 'Content Management',
        stats: [
          { label: 'Published Posts', value: '234' },
          { label: 'Total Views', value: '125.4K' },
          { label: 'Avg Engagement', value: '8.3%' },
        ],
        actions: [
          { label: 'Create Content', icon: Plus },
          { label: 'Content Library', icon: FileText },
          { label: 'Performance', icon: BarChart3 },
        ],
      },
      Analytics: {
        description: 'Marketing Analytics & Reporting',
        stats: [
          { label: 'Website Visits', value: '23.4K' },
          { label: 'Conversion Rate', value: '3.2%' },
          { label: 'Customer Acquisition Cost', value: 'AED 245' },
        ],
        actions: [
          { label: 'View Analytics', icon: BarChart3 },
          { label: 'Custom Report', icon: Download },
          { label: 'Trends Analysis', icon: TrendingUp },
        ],
      },
      'Lead Generation': {
        description: 'Lead Generation Tools',
        stats: [
          { label: 'Leads This Month', value: '342' },
          { label: 'Lead Quality Score', value: '7.8/10' },
          { label: 'Conversion Rate', value: '18%' },
        ],
        actions: [
          { label: 'Lead Dashboard', icon: Users },
          { label: 'Create Form', icon: Plus },
          { label: 'Lead Scoring', icon: TrendingUp },
        ],
      },
    },
  },
  communications: {
    name: 'Communications',
    icon: 'MessageSquare',
    color: '#8B5CF6',
    bgGradient: 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)',
    description: 'Manage messages, emails, and notifications',
    metrics: [
      { label: 'Messages Today', value: '847', change: '+34%', trend: 'up' },
      { label: 'Email Sent', value: '2,340', change: '+12%', trend: 'up' },
      { label: 'Response Time', value: '2.3h', change: '-40%', trend: 'down' },
      { label: 'Customer Sat.', value: '9.2/10', change: '+0.8', trend: 'up' },
    ],
    services: {
      Messages: {
        description: 'Internal & External Messages',
        stats: [
          { label: 'Unread', value: '34' },
          { label: 'Today', value: '847' },
          { label: 'Response Rate', value: '96%' },
        ],
        actions: [
          { label: 'View Messages', icon: MessageSquare },
          { label: 'New Message', icon: Plus },
          { label: 'Message Templates', icon: FileText },
        ],
      },
      Emails: {
        description: 'Email Management',
        stats: [
          { label: 'Sent Today', value: '245' },
          { label: 'Open Rate', value: '42%' },
          { label: 'Click Rate', value: '8.3%' },
        ],
        actions: [
          { label: 'View Emails', icon: FileText },
          { label: 'Send Email', icon: Plus },
          { label: 'Email Analytics', icon: BarChart3 },
        ],
      },
      Templates: {
        description: 'Message & Email Templates',
        stats: [
          { label: 'Email Templates', value: '32' },
          { label: 'Message Templates', value: '18' },
          { label: 'Most Used', value: 'Welcome Series' },
        ],
        actions: [
          { label: 'View Templates', icon: FileText },
          { label: 'Create Template', icon: Plus },
          { label: 'Template Analytics', icon: BarChart3 },
        ],
      },
      Notifications: {
        description: 'Notification Management',
        stats: [
          { label: 'Sent Today', value: '1,203' },
          { label: 'Delivery Rate', value: '99.3%' },
          { label: 'Open Rate', value: '76%' },
        ],
        actions: [
          { label: 'Send Notification', icon: Plus },
          { label: 'Notification Log', icon: FileText },
          { label: 'Notification Analytics', icon: BarChart3 },
        ],
      },
    },
  },
  executive: {
    name: 'Executive',
    icon: 'Globe',
    color: '#E31E24',
    bgGradient: 'linear-gradient(135deg, #E31E24 0%, #991B1B 100%)',
    description: 'Strategic oversight, KPIs, executive reports, and board insights',
    metrics: [
      { label: 'Revenue YTD', value: 'AED 24.8M', change: '+32%', trend: 'up' },
      { label: 'Growth Rate', value: '18.5%', change: '+4.2%', trend: 'up' },
      { label: 'Market Share', value: '12.3%', change: '+2.1%', trend: 'up' },
      { label: 'Profitability', value: '28%', change: '+5%', trend: 'up' },
    ],
    services: {
      'Strategic Overview': {
        description: 'Company Vision & Strategy',
        stats: [
          { label: 'Fiscal Year Goals', value: '8/10' },
          { label: 'Strategic Initiatives', value: '12 Active' },
          { label: 'Executive KPIs', value: '42 Tracked' },
        ],
        actions: [
          { label: 'Strategic Dashboard', icon: BarChart3 },
          { label: 'Board Summary', icon: FileText },
          { label: 'Strategic Plan', icon: Briefcase },
        ],
      },
      KPIs: {
        description: 'Key Performance Indicators',
        stats: [
          { label: 'Total KPIs', value: '42' },
          { label: 'On Target', value: '38' },
          { label: 'At Risk', value: '4' },
        ],
        actions: [
          { label: 'View KPIs', icon: BarChart3 },
          { label: 'KPI Trends', icon: TrendingUp },
          { label: 'Create KPI', icon: Plus },
        ],
      },
      Reports: {
        description: 'Executive Reports & Dashboards',
        stats: [
          { label: 'Monthly Reports', value: '24' },
          { label: 'Board Reports', value: '8' },
          { label: 'Quarterly Reviews', value: '6' },
        ],
        actions: [
          { label: 'View Reports', icon: BarChart3 },
          { label: 'Generate Report', icon: Plus },
          { label: 'Export Reports', icon: Download },
        ],
      },
      Insights: {
        description: 'Business Intelligence & Insights',
        stats: [
          { label: 'Insights Generated', value: '156' },
          { label: 'Actionable Items', value: '42' },
          { label: 'Implemented', value: '35' },
        ],
        actions: [
          { label: 'View Insights', icon: Activity },
          { label: 'AI Analysis', icon: TrendingUp },
          { label: 'Trend Reports', icon: BarChart3 },
        ],
      },
    },
  },
};
