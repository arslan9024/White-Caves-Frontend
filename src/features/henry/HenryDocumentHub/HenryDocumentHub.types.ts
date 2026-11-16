/**
 * Henry Document Hub — Types Layer (Mary Allen Wilkes Architecture)
 * Single-purpose type definitions strictly < 350 lines
 */

export interface TemplateField {
  name: string;
  label: string;
  type: 'text' | 'date' | 'number' | 'select' | 'textarea' | 'boolean';
  required: boolean;
  placeholder?: string;
  options?: string[]; // for select
}

export interface DocumentTemplate {
  key: string;
  label: string;
  icon: string;
  description: string;
  fields: TemplateField[];
}

export interface ComplianceResult {
  ruleId: string;
  severity: 'error' | 'warning' | 'info';
  title: string;
  message: string;
  passed: boolean;
  uaeLawReference?: string;
}

export interface ComplianceReport {
  templateKey: string;
  passedCount: number;
  warningCount: number;
  errorCount: number;
  totalRules: number;
  isCompliant: boolean;
  results: ComplianceResult[];
  evaluatedAt: string;
}

export type HenryDepartmentTag =
  'sales' | 'leasing' | 'finance' | 'compliance' | 'legal' | 'operations';

export type HenryRecordStatus = 'draft' | 'pending_signature' | 'signed' | 'archived';

export interface HenryRecord {
  id: string;
  templateKey: string;
  templateLabel: string;
  fileName: string;
  recordPath: string;
  departmentTag?: string;
  ownerUserId?: string;
  ownerUserEmail?: string;
  unit?: string;
  community?: string;
  tenantName?: string;
  isDraft: boolean;
  status?: HenryRecordStatus;
  signedAt?: string;
  archivedAt?: string;
  copyNumber: number;
  createdAt: string;
}

export type HenryHubActivePanel = 'editor' | 'compliance' | 'archive';

export type HenryOcrDocCategory = 'EMIRATES_ID' | 'PASSPORT' | 'TITLE_DEED' | 'EJARI';

export interface HenryDocumentHubProps {
  role?: string;
}

