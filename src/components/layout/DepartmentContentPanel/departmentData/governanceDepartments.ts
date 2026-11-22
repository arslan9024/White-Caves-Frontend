import {
  Activity,
  BarChart3,
  Briefcase,
  CheckCircle,
  Clock,
  FileText,
  Plus,
  Settings,
  TrendingUp,
} from 'lucide-react';
import type { DepartmentContent } from './types';

export const GOVERNANCE_DEPARTMENTS: Record<string, DepartmentContent> = {
  compliance: {
    name: 'Compliance',
    icon: 'Lock',
    color: '#059669',
    bgGradient: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
    description: 'Regulatory compliance, audits, policies, and documentation',
    metrics: [
      { label: 'Compliance Score', value: '98.5%', change: '+1.2%', trend: 'up' },
      { label: 'Audit Status', value: 'Passed', change: 'All Clear', trend: 'stable' },
      { label: 'Open Issues', value: '3', change: '-5', trend: 'down' },
      { label: 'Policy Updates', value: '12', change: '+3 pending', trend: 'up' },
    ],
    services: {
      Regulations: {
        description: 'Regulatory Requirements & Standards',
        stats: [
          { label: 'Active Regulations', value: '24' },
          { label: 'Compliant', value: '23' },
          { label: 'In Review', value: '1' },
        ],
        actions: [
          { label: 'View Regulations', icon: FileText },
          { label: 'Compliance Checklist', icon: CheckCircle },
          { label: 'Status Report', icon: BarChart3 },
        ],
      },
      Audits: {
        description: 'Audit Tracking & Management',
        stats: [
          { label: 'Annual Audits', value: '4' },
          { label: 'Completed', value: '4' },
          { label: 'Findings Resolved', value: '98%' },
        ],
        actions: [
          { label: 'View Audits', icon: FileText },
          { label: 'Schedule Audit', icon: Clock },
          { label: 'Audit Reports', icon: BarChart3 },
        ],
      },
      Policies: {
        description: 'Company Policies & Procedures',
        stats: [
          { label: 'Total Policies', value: '34' },
          { label: 'Current Version', value: '2.1' },
          { label: 'Under Review', value: '2' },
        ],
        actions: [
          { label: 'View Policies', icon: FileText },
          { label: 'Create Policy', icon: Plus },
          { label: 'Approval Workflow', icon: CheckCircle },
        ],
      },
      Documentation: {
        description: 'Compliance Documentation',
        stats: [
          { label: 'Documents', value: '245' },
          { label: 'Archived', value: '180' },
          { label: 'Active', value: '65' },
        ],
        actions: [
          { label: 'Document Repository', icon: FileText },
          { label: 'Upload Document', icon: Plus },
          { label: 'Search Documents', icon: Activity },
        ],
      },
    },
  },
  technology: {
    name: 'Technology',
    icon: 'Code',
    color: '#06B6D4',
    bgGradient: 'linear-gradient(135deg, #06B6D4 0%, #0891B2 100%)',
    description: 'Systems management, integration, technical support, and development',
    metrics: [
      { label: 'System Uptime', value: '99.8%', change: '+0.1%', trend: 'up' },
      { label: 'API Health', value: 'Excellent', change: 'All Services', trend: 'stable' },
      { label: 'Incident Tickets', value: '8', change: '-12', trend: 'down' },
      { label: 'Deployment Cycles', value: '24/mo', change: '+6', trend: 'up' },
    ],
    services: {
      Systems: {
        description: 'Infrastructure & System Management',
        stats: [
          { label: 'Servers Active', value: '42' },
          { label: 'Database Clusters', value: '8' },
          { label: 'API Gateways', value: '4' },
        ],
        actions: [
          { label: 'System Status', icon: Activity },
          { label: 'Monitoring Dashboard', icon: BarChart3 },
          { label: 'Performance Metrics', icon: TrendingUp },
        ],
      },
      Integration: {
        description: 'System Integration & APIs',
        stats: [
          { label: 'Active Integrations', value: '18' },
          { label: 'API Endpoints', value: '156' },
          { label: 'Integration Health', value: '99.2%' },
        ],
        actions: [
          { label: 'API Documentation', icon: FileText },
          { label: 'Integration Manager', icon: Settings },
          { label: 'Test Integration', icon: CheckCircle },
        ],
      },
      Support: {
        description: 'Technical Support & Ticketing',
        stats: [
          { label: 'Open Tickets', value: '8' },
          { label: 'Avg Resolution Time', value: '2.4 hours' },
          { label: 'Satisfaction Rate', value: '96%' },
        ],
        actions: [
          { label: 'Support Tickets', icon: FileText },
          { label: 'Create Ticket', icon: Plus },
          { label: 'Knowledge Base', icon: Activity },
        ],
      },
      Development: {
        description: 'Development & Feature Releases',
        stats: [
          { label: 'Active Projects', value: '6' },
          { label: 'Completed Sprints', value: '34' },
          { label: 'Feature Pipeline', value: '28 Items' },
        ],
        actions: [
          { label: 'Project Dashboard', icon: Briefcase },
          { label: 'Sprint Board', icon: BarChart3 },
          { label: 'Release Notes', icon: FileText },
        ],
      },
    },
  },
  legal: {
    name: 'Legal',
    icon: 'Scale',
    color: '#7C3AED',
    bgGradient: 'linear-gradient(135deg, #7C3AED 0%, #6D28D9 100%)',
    description: 'Contracts, agreements, legal compliance, and documentation',
    metrics: [
      { label: 'Active Contracts', value: '156', change: '+12', trend: 'up' },
      { label: 'Contract Value', value: 'AED 145M', change: '+22%', trend: 'up' },
      { label: 'Legal Cases', value: '2', change: '-3', trend: 'down' },
      { label: 'Compliance Status', value: '100%', change: 'All Clear', trend: 'stable' },
    ],
    services: {
      Contracts: {
        description: 'Contract Management & Execution',
        stats: [
          { label: 'Active Contracts', value: '156' },
          { label: 'Pending Signature', value: '8' },
          { label: 'Expiring Soon', value: '12' },
        ],
        actions: [
          { label: 'View Contracts', icon: FileText },
          { label: 'New Contract', icon: Plus },
          { label: 'Contract Analysis', icon: BarChart3 },
        ],
      },
      Agreements: {
        description: 'Service Agreements & Terms',
        stats: [
          { label: 'Master Agreements', value: '24' },
          { label: 'Service Agreements', value: '89' },
          { label: 'Updated This Year', value: '18' },
        ],
        actions: [
          { label: 'View Agreements', icon: FileText },
          { label: 'Create Agreement', icon: Plus },
          { label: 'Template Library', icon: Briefcase },
        ],
      },
      Compliance: {
        description: 'Legal Compliance & Regulations',
        stats: [
          { label: 'Regulatory Requirements', value: '28' },
          { label: 'Compliant Items', value: '28' },
          { label: 'Last Audit', value: 'Passed' },
        ],
        actions: [
          { label: 'Compliance Dashboard', icon: BarChart3 },
          { label: 'Audit Trail', icon: Activity },
          { label: 'Regulatory Updates', icon: Plus },
        ],
      },
      Documentation: {
        description: 'Legal Documents & Records',
        stats: [
          { label: 'Legal Documents', value: '432' },
          { label: 'Archived', value: '356' },
          { label: 'Active', value: '76' },
        ],
        actions: [
          { label: 'Document Archive', icon: FileText },
          { label: 'Upload Document', icon: Plus },
          { label: 'Legal Search', icon: Activity },
        ],
      },
    },
  },
};
