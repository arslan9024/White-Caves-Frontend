import {
  Activity,
  BarChart3,
  CheckCircle,
  Clock,
  Download,
  FileText,
  MessageSquare,
  Plus,
  TrendingUp,
} from 'lucide-react';
import type { DepartmentContent } from './types';

export const LEASING_DEPARTMENT: DepartmentContent = {
  name: 'Leasing',
  icon: 'KeySquare',
  color: '#E31E24',
  bgGradient: 'linear-gradient(135deg, #E31E24 0%, #B91C1C 100%)',
  description: 'End-to-end lease lifecycle: leads, viewings, offers, contracts, PDC, and P&L',
  metrics: [
    { label: 'Active Leases', value: '—', change: 'Live', trend: 'stable' },
    { label: 'Monthly Recurring Revenue', value: 'AED —', change: 'MRR', trend: 'stable' },
    { label: 'Pending Offers', value: '—', change: 'Awaiting decision', trend: 'stable' },
    { label: 'Leases Expiring (90d)', value: '—', change: 'Renewal pipeline', trend: 'stable' },
  ],
  services: {
    'Leasing Pipeline': {
      description: '10-Stage Leasing Kanban — Lead Acquisition → P&L',
      stats: [
        { label: 'Leads in Pipeline', value: '—' },
        { label: 'Active Stage', value: 'Stage 1–10' },
        { label: 'Conversions', value: '—' },
      ],
      actions: [
        { label: 'View Pipeline', icon: Activity },
        { label: 'New Lead', icon: Plus },
        { label: 'Pipeline Report', icon: BarChart3 },
      ],
    },
    'Active Leases': {
      description: 'All active tenancy agreements with Ejari status',
      stats: [
        { label: 'Active Leases', value: '—' },
        { label: 'Ejari Registered', value: '—' },
        { label: 'Expiring in 30 days', value: '—' },
      ],
      actions: [
        { label: 'View Leases', icon: FileText },
        { label: 'New Lease', icon: Plus },
        { label: 'Expiry Report', icon: Clock },
      ],
    },
    'Viewing Calendar': {
      description: 'Schedule and track property viewings for leasing prospects',
      stats: [
        { label: 'Scheduled Viewings', value: '—' },
        { label: 'Completed This Month', value: '—' },
        { label: 'No-Shows', value: '—' },
      ],
      actions: [
        { label: 'Book Viewing', icon: Plus },
        { label: 'View Calendar', icon: Clock },
        { label: 'Viewing Report', icon: BarChart3 },
      ],
    },
    'Offer Management': {
      description: 'Lease offers — pending, countered, accepted, rejected',
      stats: [
        { label: 'Pending Offers', value: '—' },
        { label: 'Accepted', value: '—' },
        { label: 'Countered', value: '—' },
      ],
      actions: [
        { label: 'Create Offer', icon: Plus },
        { label: 'View All Offers', icon: FileText },
        { label: 'Offer Analytics', icon: TrendingUp },
      ],
    },
    'Contract Center': {
      description: 'RERA-compliant tenancy contracts, addenda, and Ejari registration',
      stats: [
        { label: 'Contracts Generated', value: '—' },
        { label: 'Ejari Registered', value: '—' },
        { label: 'Addenda', value: '—' },
      ],
      actions: [
        { label: 'Generate Contract', icon: FileText },
        { label: 'Upload Signed PDF', icon: Download },
        { label: 'Register Ejari', icon: CheckCircle },
      ],
    },
    'PDC Tracker': {
      description: 'Post-dated cheque schedule — standard Dubai payment method',
      stats: [
        { label: 'PDC Cheques Total', value: '—' },
        { label: 'Cleared', value: '—' },
        { label: 'Bounced', value: '—' },
      ],
      actions: [
        { label: 'Add PDC Entry', icon: Plus },
        { label: 'View PDC Schedule', icon: FileText },
        { label: 'Send Reminder', icon: MessageSquare },
      ],
    },
    'Leasing P&L Report': {
      description: 'Revenue, commissions, expenses, and net profit per lease',
      stats: [
        { label: 'MRR (AED)', value: '—' },
        { label: 'Commission Earned', value: '—' },
        { label: 'Net Profit', value: '—' },
      ],
      actions: [
        { label: 'View P&L Dashboard', icon: BarChart3 },
        { label: 'Export to PDF', icon: Download },
        { label: 'Export to Excel', icon: Download },
      ],
    },
  },
};
