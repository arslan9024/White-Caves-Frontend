import {
  Activity,
  BarChart3,
  Briefcase,
  Clock,
  Download,
  FileText,
  MessageSquare,
  Plus,
  TrendingUp,
  Users,
} from 'lucide-react';
import type { DepartmentContent } from './types';

export const CORE_DEPARTMENTS: Record<string, DepartmentContent> = {
  operations: {
    name: 'Operations',
    icon: 'Building2',
    color: '#3B82F6',
    bgGradient: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)',
    description: 'Manage inventory, properties, assets, and operational data',
    metrics: [
      { label: 'Total Properties', value: '9,378', change: '+12%', trend: 'up' },
      { label: 'Assets Under Management', value: '12,450', change: '+5%', trend: 'up' },
      { label: 'Operational Health', value: '98%', change: 'Optimal', trend: 'stable' },
      { label: 'Data Accuracy', value: '99.8%', change: '+2%', trend: 'up' },
    ],
    services: {
      'Inventory Management': {
        description: 'Manage All Property Inventory',
        stats: [
          { label: 'Indexed Properties', value: '9,378' },
          { label: 'Active Listings', value: '4,250' },
          { label: 'Pending Review', value: '145' },
        ],
        actions: [
          { label: 'View Inventory', icon: FileText },
          { label: 'Import Data', icon: Download },
          { label: 'Add Property', icon: Plus },
        ],
      },
      Properties: {
        description: 'Property Management & Tracking',
        stats: [
          { label: 'Total Properties', value: '9,378' },
          { label: 'Residential', value: '5,420' },
          { label: 'Commercial', value: '3,958' },
        ],
        actions: [
          { label: 'View Properties', icon: FileText },
          { label: 'Search', icon: Activity },
          { label: 'New Property', icon: Plus },
        ],
      },
      'Asset Tracking': {
        description: 'Track Assets & Equipment',
        stats: [
          { label: 'Total Assets', value: '12,450' },
          { label: 'Deployed', value: '11,200' },
          { label: 'In Maintenance', value: '1,250' },
        ],
        actions: [
          { label: 'Asset Registry', icon: FileText },
          { label: 'Maintenance Log', icon: Clock },
          { label: 'Schedule Maintenance', icon: Plus },
        ],
      },
      'Data Management': {
        description: 'Data Tools & Extraction',
        stats: [
          { label: 'Data Records', value: '145,320' },
          { label: 'Last Updated', value: 'Today' },
          { label: 'Accuracy Rate', value: '99.8%' },
        ],
        actions: [
          { label: 'Data Tools', icon: BarChart3 },
          { label: 'Export Data', icon: Download },
          { label: 'OCR Extraction', icon: FileText },
        ],
      },
    },
  },
  finance: {
    name: 'Finance',
    icon: 'DollarSign',
    color: '#F59E0B',
    bgGradient: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
    description: 'Manage financial operations, invoicing, and accounting',
    metrics: [
      { label: 'Total Revenue', value: 'AED 2.4M', change: '+18%', trend: 'up' },
      { label: 'Outstanding Invoices', value: 'AED 340K', change: '-8%', trend: 'down' },
      { label: 'Payment Rate', value: '94%', change: '+3%', trend: 'up' },
      { label: 'Budget Utilization', value: '76%', change: 'On Track', trend: 'stable' },
    ],
    services: {
      Invoicing: {
        description: 'Invoice Management & Generation',
        stats: [
          { label: 'Total Invoices', value: '1,245' },
          { label: 'Paid', value: '1,170' },
          { label: 'Pending', value: '75' },
        ],
        actions: [
          { label: 'Create Invoice', icon: Plus },
          { label: 'View All', icon: FileText },
          { label: 'Send Reminders', icon: MessageSquare },
        ],
      },
      'Payment Tracking': {
        description: 'Track Payments & Collections',
        stats: [
          { label: 'Received This Month', value: 'AED 340K' },
          { label: 'Pending Payments', value: 'AED 95K' },
          { label: 'Average Collection Days', value: '7 days' },
        ],
        actions: [
          { label: 'Payment Log', icon: FileText },
          { label: 'Send Invoice', icon: MessageSquare },
          { label: 'Record Payment', icon: Plus },
        ],
      },
      'Financial Reports': {
        description: 'Generate & View Financial Reports',
        stats: [
          { label: 'Profit Margin', value: '32%' },
          { label: 'Revenue This Month', value: 'AED 890K' },
          { label: 'Expenses', value: 'AED 605K' },
        ],
        actions: [
          { label: 'View Reports', icon: BarChart3 },
          { label: 'Export P&L', icon: Download },
          { label: 'Schedule Report', icon: Clock },
        ],
      },
      'Budget Analysis': {
        description: 'Budget Planning & Analysis',
        stats: [
          { label: 'Total Budget', value: 'AED 2M' },
          { label: 'Spent', value: 'AED 1.52M' },
          { label: 'Remaining', value: 'AED 480K' },
        ],
        actions: [
          { label: 'View Budget', icon: BarChart3 },
          { label: 'Create Budget', icon: Plus },
          { label: 'Budget vs Actual', icon: TrendingUp },
        ],
      },
    },
  },
  sales: {
    name: 'Sales',
    icon: 'TrendingUp',
    color: '#10B981',
    bgGradient: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
    description: 'Manage leads, negotiations, and deal tracking',
    metrics: [
      { label: 'Active Leads', value: '342', change: '+24%', trend: 'up' },
      { label: 'Conversion Rate', value: '18%', change: '+4%', trend: 'up' },
      { label: 'Deals in Progress', value: '67', change: '+12%', trend: 'up' },
      { label: 'Sales Pipeline', value: 'AED 18.5M', change: '+22%', trend: 'up' },
    ],
    services: {
      'Lead Management': {
        description: 'Track & Manage Leads',
        stats: [
          { label: 'Total Leads', value: '342' },
          { label: 'Qualified', value: '145' },
          { label: 'In Conversation', value: '89' },
        ],
        actions: [
          { label: 'Add Lead', icon: Plus },
          { label: 'View All Leads', icon: Users },
          { label: 'Lead Analytics', icon: BarChart3 },
        ],
      },
      Negotiations: {
        description: 'Manage Deal Negotiations',
        stats: [
          { label: 'Active Negotiations', value: '34' },
          { label: 'At Final Stage', value: '8' },
          { label: 'Avg Negotiation Time', value: '14 days' },
        ],
        actions: [
          { label: 'View Negotiations', icon: Briefcase },
          { label: 'Add Negotiation', icon: Plus },
          { label: 'Task List', icon: FileText },
        ],
      },
      'Deal Tracking': {
        description: 'Track Deals & Closures',
        stats: [
          { label: 'Deals This Month', value: '12' },
          { label: 'Value Closed', value: 'AED 4.2M' },
          { label: 'Pending Closure', value: '8' },
        ],
        actions: [
          { label: 'Deal Pipeline', icon: TrendingUp },
          { label: 'New Deal', icon: Plus },
          { label: 'Win/Loss Analysis', icon: BarChart3 },
        ],
      },
      'Commission Tracking': {
        description: 'Track Commissions & Payouts',
        stats: [
          { label: 'Total Commission', value: 'AED 620K' },
          { label: 'Pending Payout', value: 'AED 145K' },
          { label: 'This Month', value: 'AED 89K' },
        ],
        actions: [
          { label: 'Commission Log', icon: FileText },
          { label: 'Calculate Commission', icon: BarChart3 },
          { label: 'Payout Report', icon: Download },
        ],
      },
    },
  },
};
