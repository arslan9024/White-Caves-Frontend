import type { ScanReview } from '../henryScanReview';

export interface ScannedTenancyParty {
  name: string;
  emiratesId: string;
  email: string;
  phone: string;
  licenseNo?: string;
  licensingAuthority?: string;
}

export interface ScannedTenancyProperty {
  usage: 'residential' | 'commercial' | 'industrial' | '';
  buildingName: string;
  propertyNumber: string;
  plotNumber: string;
  propertyType: string;
  areaSqM?: number;
  areaSqFt?: number;
  location: string;
  makaniNo?: string;
  premisesNoDewa?: string;
}

export interface ScannedTenancyFinancials {
  periodFrom: string;
  periodTo: string;
  annualRentAed: number;
  contractValueAed?: number;
  securityDepositAed?: number;
  modeOfPayment: string;
}

export interface ScannedTenancySignatures {
  hasTenantSigned: boolean;
  tenantSignedDate?: string;
  hasLessorSigned: boolean;
  lessorSignedDate?: string;
}

export type DldScannedContractResult = ScannedTenancyContractResult;

export interface ScannedTenancyContractResult extends ScanReview {
  contractReference?: string;
  // Classification & Fill State
  isFilled: boolean;
  fillScorePercent: number;
  totalFieldsCount: number;
  filledFieldsCount: number;
  missingFields: string[];
  classification: 'blank_template' | 'partially_filled' | 'fully_executed';

  // Metadata
  contractDate: string;

  // Grouped Fields
  landlord: ScannedTenancyParty;
  tenant: ScannedTenancyParty;
  property: ScannedTenancyProperty;
  financials: ScannedTenancyFinancials;
  additionalTerms: string[];
  signatures: ScannedTenancySignatures;

  // Extraction Telemetry
  confidenceScore: number;
  scannedAt: string;
  documentFormat?: string;
}
