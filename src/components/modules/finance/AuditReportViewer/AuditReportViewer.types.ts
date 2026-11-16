export type FindingSeverity = 'critical' | 'major' | 'minor' | 'all';
export type FindingStatus = 'open' | 'in-progress' | 'resolved';
export type ActionStatus = 'open' | 'in-progress' | 'completed';

export interface AuditFinding {
  id: string;
  category: string;
  severity: 'critical' | 'major' | 'minor';
  title: string;
  description: string;
  recommendation: string;
  status: FindingStatus;
}

export interface AuditAction {
  id: string;
  finding: string;
  action: string;
  owner: string;
  dueDate: string;
  progress: number;
  status: ActionStatus;
}

export interface AuditSummary {
  complianceScore: number;
  reviewProgress: number;
  riskLevel: 'low' | 'medium' | 'high' | string;
  totalFindings: number;
  criticalFindings: number;
  majorFindings: number;
  minorFindings: number;
}

export interface AuditReportData {
  id: string;
  title: string;
  date: string;
  period: string;
  auditedBy: string;
  status: string;
  summary: AuditSummary;
  findings: AuditFinding[];
  actions: AuditAction[];
}

export interface AuditReportViewerProps {
  report?: AuditReportData;
  onDownload?: () => void;
  onExport?: () => void;
}

