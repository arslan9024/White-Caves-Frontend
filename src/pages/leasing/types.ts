export type LeasingStage =
  | 'LANDLORD_OUTREACH'
  | 'INTAKE_DOCS'
  | 'MARKETING_LISTINGS'
  | 'LEADS_VIEWINGS'
  | 'OFFER_NEGOTIATION'
  | 'CONTRACT_MAKER'
  | 'SIGNATURES'
  | 'CHEQUES_INVOICE'
  | 'EJARI_REGISTRATION'
  | 'KEY_HANDOVER';

export type SignatureStatus = 'PENDING' | 'TENANT_SIGNED' | 'LANDLORD_SIGNED' | 'FULLY_SIGNED';

export type LeasingHubTab =
  | 'pipeline'
  | 'linda'
  | 'contract_maker'
  | 'signature_portal'
  | 'invoicing';

export interface SoloLeasingDeal {
  id: string;
  propertyTitle: string;
  unitNumber: string;
  landlordName: string;
  landlordPhone: string;
  tenantName?: string;
  tenantPhone?: string;
  annualRent: number;
  chequeCount: 1 | 2 | 4 | 6 | 12;
  securityDeposit: number;
  stage: LeasingStage;
  signatureStatus: SignatureStatus;
  uaePassVerified: boolean;
  ejariNumber?: string;
  dewaPremiseNumber?: string;
  commissionAed: number;
  vatAed: number;
  totalInvoiceAed: number;
}
