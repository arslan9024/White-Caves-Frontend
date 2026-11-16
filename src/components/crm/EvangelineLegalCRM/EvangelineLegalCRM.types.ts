/**
 * Evangeline Legal CRM — Types Layer (Mary Allen Wilkes Architecture)
 * Strict typing for DLD contracts, POA validation, VIP NDAs, and eviction tracking
 */

export type EvangelineTab = 'contracts' | 'poa' | 'nda' | 'disputes' | 'kyc';

export type DldFormType = 'Form A' | 'Form B' | 'Form F';

export interface EvangelineLegalCRMProps {
  moduleId?: string;
  role?: string;
  user?: unknown;
}

export interface PoaValidationResult {
  status: 'VALID_APPROVED' | 'REJECTED_RISK';
  validity: string;
  authorityCheck: string;
  notaryRegistry: string;
  riskScore: 'LOW_RISK' | 'HIGH_RISK_BLOCK';
}

export interface EvictionDispute {
  id: string;
  tenant: string;
  unit: string;
  reason: string;
  notaryDate: string;
  daysRemaining: number;
  status: string;
}

