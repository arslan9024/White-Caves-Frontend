/**
 * Tenancy Contract Form — Types Layer (Mary Allen Wilkes Architecture)
 * Strict TypeScript types for Tenancy Contract forms and agreement models
 * Strictly < 350 lines
 */

export interface PropertyInfoData {
  description: string;
  address: string;
  city: string;
  emirate: string;
  plotNumber: string;
  buildingNumber: string;
  floorNumber: string;
  unitNumber: string;
  unitArea: string;
  propertyType: string;
  furnished: string;
}

export interface LandlordInfoData {
  name: string;
  nationalId: string;
  passportNumber: string;
  nationality: string;
  emiratesId: string;
  email: string;
  phone: string;
  mobileNumber: string;
  address: string;
  bankName: string;
  bankAccountNumber: string;
  iban: string;
}

export interface TenantInfoData {
  name: string;
  nationalId: string;
  passportNumber: string;
  nationality: string;
  emiratesId: string;
  email: string;
  phone: string;
  mobileNumber: string;
  address: string;
  occupation: string;
  employer: string;
  visaNumber: string;
  visaExpiryDate: string;
}

export interface ContactDetailsData {
  landlordContactPerson: string;
  landlordContactPhone: string;
  landlordContactEmail: string;
  tenantContactPerson: string;
  tenantContactPhone: string;
  tenantContactEmail: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
}

export interface TenancyTermsData {
  leaseStartDate: string;
  leaseEndDate: string;
  leasePeriodMonths: string;
  renewalOption: string;
  renewalTermMonths: string;
  rentAmount: string;
  rentCurrency: string;
  securityDeposit: string;
  maintenanceFees: string;
  maintenanceIncludedIn: string;
  utilities: {
    water: boolean;
    electricity: boolean;
    gas: boolean;
    internet: boolean;
    chiller: boolean;
  };
  paymentMethod: string;
  paymentDay: number;
  maintenanceResponsibility: string;
  breakTerms: string;
  allowedActivities: string;
  restrictions: string;
  damageResponsibility: string;
}

export interface TenancyFormData {
  propertyInfo: PropertyInfoData;
  landlordInfo: LandlordInfoData;
  tenantInfo: TenantInfoData;
  contactDetails: ContactDetailsData;
  tenancyTerms: TenancyTermsData;
}

export interface TenancyAgreementSummary {
  id: string;
  landlordName: string;
  tenantName: string;
  status: string;
}

export interface StatusBannerMessage {
  type: 'error' | 'success';
  text: string;
}

export interface TenancyContractFormProps {
  onSuccess?: (result: { contractId: string; agreement: unknown }) => void;
  initialContractId?: string;
}

