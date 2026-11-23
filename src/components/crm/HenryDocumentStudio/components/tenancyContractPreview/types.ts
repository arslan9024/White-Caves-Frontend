export interface ScannedLandlord {
  name?: string;
  emiratesId?: string;
  phone?: string;
  email?: string;
}

export interface ScannedTenant {
  name?: string;
  emiratesId?: string;
  phone?: string;
  email?: string;
}

export interface ScannedProperty {
  buildingName?: string;
  propertyNumber?: string;
  plotNumber?: string;
  propertyType?: string;
  usage?: string;
  areaSqM?: number | string;
  areaSqFt?: number | string;
  location?: string;
}

export interface ScannedFinancials {
  periodFrom?: string;
  periodTo?: string;
  annualRentAed: number;
  securityDepositAed?: number;
  modeOfPayment?: string;
}

export interface ScannedContractData {
  isFilled: boolean;
  fillScorePercent: number;
  filledFieldsCount: number;
  totalFieldsCount: number;
  missingFields: string[];
  contractDate?: string;
  landlord: ScannedLandlord;
  tenant: ScannedTenant;
  property: ScannedProperty;
  financials: ScannedFinancials;
  additionalTerms: string[];
}

export type ContractScanTemplateType = 'sample' | 'sample_sanit' | 'sample_svetlana' | 'blank';

export interface HenryTenancyContractPreviewProps {
  scannedContractData: ScannedContractData | any;
  isScanning: boolean;
  handleScanTenancyContract: (template?: ContractScanTemplateType) => void | Promise<void>;
  handleLoadContractIntoPreparationStudio: () => void;
  handleCreateCrmLandlordFromContract: () => void;
  handleCreateCrmTenantFromContract: () => void;
  handleCopyContractJsonVariables: () => void;
}
