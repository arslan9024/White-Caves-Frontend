export interface ContractParty {
  name: string;
  emiratesIdOrPassport: string;
  phone: string;
  email: string;
  trn?: string;
}

export interface PdcScheduleItem {
  chequeNumber: string;
  dueDate: string;
  amountAed: number;
  bankName: string;
  status: 'pending' | 'deposited' | 'cleared' | 'bounced';
}

export interface TenancyContractPayload {
  contractNumber: string;
  propertyTitle: string;
  unitNumber: string;
  community: string;
  annualRentAed: number;
  securityDepositAed: number;
  leaseStartDate: string;
  leaseEndDate: string;
  landlord: ContractParty;
  tenant: ContractParty;
  broker: {
    name: string;
    brnNumber: string;
    agencyOrn: string;
    detLicense: string;
  };
  pdcSchedule: PdcScheduleItem[];
  specialClauses?: string[];
  esignToken?: string;
  esignStatus?: 'draft' | 'link_generated' | 'signed';
}

export interface GovernmentEjariRecord {
  ejariNumber: string; // e.g. "0120250814005322"
  contractReference: string;
  issueDate: string;
  expiryDate: string;
  registeredRentAed: number;
  propertyAddress: string;
  landlordName: string;
  tenantName: string;
  brokerName: string;
  brokerBrn: string;
  dldBarcodeHash: string;
  archivedAt: string;
}

export interface ViewingFormPayload {
  formId: string;
  clientName: string;
  clientPhone: string;
  clientPassportOrEid: string;
  propertyTitle: string;
  propertyAddress: string;
  viewingDate: string;
  viewingTime: string;
  agentName: string;
  agentBrn: string;
  feedbackNotes?: string;
}

export interface TaxReceiptPayload {
  receiptNumber: string;
  receiptType:
    | 'tenant_service_charges'
    | 'landlord_service_charges'
    | 'landlord_property_management'
    | 'agency_commission'
    | 'security_deposit'
    | 'maintenance_payout';
  billedPartyType?: 'tenant' | 'landlord' | 'buyer' | 'seller';
  propertyAddress?: string;
  unitNumber?: string;
  serviceDescription?: string;
  amountAed: number;
  vatRatePercent: number;
  vatAmountAed: number;
  totalWithVatAed: number;
  paidBy: string;
  paidTo: string;
  clientTrnOrEid?: string;
  whiteCavesTrn: string;
  paymentMethod: 'cheque' | 'bank_transfer' | 'credit_card' | 'uaedds';
  paymentReference: string;
  date: string;
}

export interface PdfAnnotation {
  id: string;
  pageNumber: number;
  type: 'text' | 'highlight' | 'redaction' | 'stamp';
  content: string;
  x: number;
  y: number;
  width?: number;
  height?: number;
  color?: string;
}
