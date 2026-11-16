export type ContractBuilderStep = 'select' | 'fill' | 'review';

export interface ContractTemplate {
  _id: string;
  name: string;
  description: string;
  category: string;
}

export interface ContractFormData {
  propertyAddress?: string;
  propertyArea?: string | number;
  propertyType?: string;
  tenantName?: string;
  tenantEmail?: string;
  tenantPhone?: string;
  tenantEmiratesId?: string;
  landlordName?: string;
  landlordEmail?: string;
  landlordPhone?: string;
  rentAmount?: string | number;
  durationMonths?: string | number;
  startDate?: string;
  securityDeposit?: string | number;
  [key: string]: any;
}

export interface ContractBuilderProps {
  onContractCreated?: (contract: any) => void;
  propertyData?: any;
  partyData?: any;
}

