/**
 * KYC & AML Dashboard — Data & Constants Layer (Mary Allen Wilkes Architecture)
 * Color mappings, tab registries, formatting helpers, and mock seeds
 */

import {
  Clock,
  Shield,
  AlertTriangle,
  UserCheck,
  Globe,
  History,
  Building2,
  FileText,
} from 'lucide-react';
import type {
  KycTabDef,
  KycStats,
  KycProfileItem,
  KycAlertItem,
  KycAuditLogItem,
} from './KYCAMLDashboard.types';

export const TABS: KycTabDef[] = [
  { id: 'queue', label: 'Verification Queue', icon: Clock },
  { id: 'profiles', label: 'Risk Profiles', icon: Shield },
  { id: 'alerts', label: 'AML Alerts', icon: AlertTriangle },
  { id: 'pep', label: 'PEP Screening', icon: UserCheck },
  { id: 'sanctions', label: 'Sanctions Check', icon: Globe },
  { id: 'audit', label: 'Audit Trail', icon: History },
  { id: 'noc', label: 'Developer NOC', icon: Building2 },
  { id: 'reports', label: 'Reports', icon: FileText },
];

export const RISK_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  LOW: { bg: '#DCFCE7', text: '#166534', border: '#22C55E' },
  MEDIUM: { bg: '#FEF3C7', text: '#92400E', border: '#F59E0B' },
  HIGH: { bg: '#FEE2E2', text: '#991B1B', border: '#EF4444' },
  PROHIBITED: { bg: '#F3E8FF', text: '#6B21A8', border: '#A855F7' },
};

export const STATUS_COLORS: Record<string, { bg: string; text: string }> = {
  pending: { bg: '#FEF3C7', text: '#92400E' },
  documents_required: { bg: '#DBEAFE', text: '#1E40AF' },
  under_review: { bg: '#E0E7FF', text: '#3730A3' },
  edd_required: { bg: '#FEE2E2', text: '#991B1B' },
  approved: { bg: '#DCFCE7', text: '#166534' },
  rejected: { bg: '#FEE2E2', text: '#991B1B' },
  suspended: { bg: '#F3F4F6', text: '#374151' },
  expired: { bg: '#FEF3C7', text: '#92400E' },
};

export const ALERT_SEVERITY_COLORS: Record<string, { bg: string; text: string }> = {
  LOW: { bg: '#DCFCE7', text: '#166534' },
  MEDIUM: { bg: '#FEF3C7', text: '#92400E' },
  HIGH: { bg: '#FEE2E2', text: '#991B1B' },
  CRITICAL: { bg: '#7C3AED', text: '#FFFFFF' },
};

export const formatDate = (date?: string): string => {
  if (!date) return '-';
  return new Date(date).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
};

export const formatDateTime = (date?: string): string => {
  if (!date) return '-';
  return new Date(date).toLocaleString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const DEFAULT_KYC_STATS: KycStats = {
  totalPending: 8,
  highRiskCount: 3,
  openAlerts: 4,
  pepCount: 2,
};

export const MOCK_PENDING_PROFILES: KycProfileItem[] = [
  {
    id: 'KYC-2026-001',
    fullName: 'Alexander Volkov',
    entityType: 'individual',
    status: 'under_review',
    riskRating: 'HIGH',
    riskScore: 78,
    pepStatus: false,
    sanctionsMatch: false,
    adverseMediaMatch: true,
    jurisdiction: 'United Kingdom',
    createdAt: '2026-08-20T10:30:00Z',
    idDocumentNumber: 'P9842109',
  },
  {
    id: 'KYC-2026-002',
    fullName: 'Fatima Al Mansoori',
    entityType: 'individual',
    status: 'approved',
    riskRating: 'LOW',
    riskScore: 12,
    pepStatus: false,
    sanctionsMatch: false,
    adverseMediaMatch: false,
    jurisdiction: 'United Arab Emirates',
    createdAt: '2026-08-21T09:15:00Z',
    idDocumentNumber: '784-1988-1234567-1',
  },
];

export const MOCK_ALERTS: KycAlertItem[] = [
  {
    id: 'ALT-881',
    ruleCode: 'AML-CASH-THRESH',
    severity: 'HIGH',
    description: 'Cash transaction exceeding AED 55,000 threshold flagged by goAML module',
    entityName: 'Vance Properties Corp',
    createdAt: '2026-08-21T11:45:00Z',
    status: 'OPEN',
  },
  {
    id: 'ALT-882',
    ruleCode: 'PEP-ASSOCIATION',
    severity: 'CRITICAL',
    description: 'Secondary beneficiary matches Tier-2 Politically Exposed Person',
    entityName: 'Caspian Horizon LLC',
    createdAt: '2026-08-21T14:20:00Z',
    status: 'INVESTIGATING',
  },
];

export const MOCK_AUDIT_LOGS: KycAuditLogItem[] = [
  {
    id: 'LOG-9901',
    action: 'SANCTIONS_SCREENING_PASS',
    actor: 'Evangeline Sentinel System',
    timestamp: '2026-08-21T14:25:00Z',
    details: 'Zero matches on UN/OFAC/UAE local terrorist lists for Fatima Al Mansoori',
  },
];

