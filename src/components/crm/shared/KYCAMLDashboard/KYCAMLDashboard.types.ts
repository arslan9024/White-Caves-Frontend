/**
 * KYC & AML Dashboard — Types Layer (Mary Allen Wilkes Architecture)
 * Strict typing for risk levels, verification statuses, alerts, and audit logs
 */

import type { LucideIcon } from 'lucide-react';

export type KycRiskLevel = 'LOW' | 'MEDIUM' | 'HIGH' | 'PROHIBITED';

export type KycStatus =
  | 'pending'
  | 'documents_required'
  | 'under_review'
  | 'edd_required'
  | 'approved'
  | 'rejected'
  | 'suspended'
  | 'expired';

export type AlertSeverity = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

export interface KycTabDef {
  id: string;
  label: string;
  icon: LucideIcon;
}

export interface KycProfileItem {
  id: string;
  fullName: string;
  entityType?: 'individual' | 'corporate';
  status: KycStatus;
  riskRating: KycRiskLevel;
  riskScore: number;
  pepStatus: boolean;
  sanctionsMatch: boolean;
  adverseMediaMatch: boolean;
  jurisdiction: string;
  createdAt: string;
  verifiedAt?: string;
  idDocumentNumber?: string;
}

export interface KycAlertItem {
  id: string;
  ruleCode: string;
  severity: AlertSeverity;
  description: string;
  entityName: string;
  createdAt: string;
  status: 'OPEN' | 'INVESTIGATING' | 'RESOLVED' | 'FALSE_POSITIVE';
}

export interface KycAuditLogItem {
  id: string;
  action: string;
  actor: string;
  timestamp: string;
  details: string;
}

export interface KycStats {
  totalPending: number;
  highRiskCount: number;
  openAlerts: number;
  pepCount: number;
}

export interface KYCAMLDashboardProps {
  assistant?: string;
  accessLevel?: string;
  showTabs?: string[];
}

