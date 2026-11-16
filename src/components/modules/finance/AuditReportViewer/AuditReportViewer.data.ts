import { AuditReportData } from './AuditReportViewer.types';

export const DEFAULT_AUDIT_REPORT: AuditReportData = {
  id: 'AUD-2024-001',
  title: 'Annual Audit Report 2024',
  date: '2024-01-15',
  period: 'January 1 - December 31, 2023',
  auditedBy: 'Noor Al-Ahmed',
  status: 'completed',
  summary: {
    complianceScore: 92,
    reviewProgress: 100,
    riskLevel: 'low',
    totalFindings: 3,
    criticalFindings: 0,
    majorFindings: 1,
    minorFindings: 2,
  },
  findings: [
    {
      id: 'F001',
      category: 'Financial Controls',
      severity: 'major',
      title: 'Incomplete Reconciliation Process',
      description: 'Monthly bank reconciliations are not completed timely',
      recommendation: 'Implement automated reconciliation process',
      status: 'open',
    },
    {
      id: 'F002',
      category: 'Governance',
      severity: 'minor',
      title: 'Board Meeting Documentation',
      description: 'Some board meeting minutes lack proper approval signatures',
      recommendation: 'Update documentation procedures',
      status: 'in-progress',
    },
    {
      id: 'F003',
      category: 'Compliance',
      severity: 'minor',
      title: 'Employee Training Records',
      description: 'Compliance training documentation needs centralization',
      recommendation: 'Create centralized training database',
      status: 'resolved',
    },
  ],
  actions: [
    {
      id: 'A001',
      finding: 'F001',
      action: 'Automate bank reconciliation',
      owner: 'Finance Manager',
      dueDate: '2024-03-31',
      progress: 60,
      status: 'in-progress',
    },
    {
      id: 'A002',
      finding: 'F002',
      action: 'Update board meeting procedures',
      owner: 'Compliance Officer',
      dueDate: '2024-02-28',
      progress: 100,
      status: 'completed',
    },
    {
      id: 'A003',
      finding: 'F003',
      action: 'Setup training management system',
      owner: 'HR Manager',
      dueDate: '2024-01-31',
      progress: 100,
      status: 'completed',
    },
  ],
};

export const getSeverityColor = (severity: string): string => {
  switch (severity) {
    case 'critical':
      return 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20';
    case 'major':
      return 'text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-900/20';
    case 'minor':
      return 'text-yellow-600 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-900/20';
    default:
      return 'text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-900/20';
  }
};

export const getSeverityIcon = (severity: string): string => {
  switch (severity) {
    case 'critical':
      return '🔴';
    case 'major':
      return '🟠';
    case 'minor':
      return '🟡';
    default:
      return '⚪';
  }
};

export const getStatusIcon = (status: string): string => {
  switch (status) {
    case 'resolved':
    case 'completed':
      return '✅';
    case 'in-progress':
      return '⏳';
    case 'open':
      return '📋';
    default:
      return '❓';
  }
};

export const getProgressColor = (progress: number): string => {
  if (progress === 100) return 'bg-green-600 dark:bg-green-500';
  if (progress >= 75) return 'bg-blue-600 dark:bg-blue-500';
  if (progress >= 50) return 'bg-yellow-600 dark:bg-yellow-500';
  return 'bg-red-600 dark:bg-red-500';
};

