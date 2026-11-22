/**
 * Core data model for the Dubai Land Department (DLD) Unified Tenancy Contract.
 */

export interface DldTenancyContractData {
  contractId: string;
  contractDate: string;

  // ── Owner / Lessor Information (معلومات المالك / المؤجر) ──
  ownerName: string;
  lessorName: string;
  lessorEmiratesId: string;
  lessorLicenseNo: string;
  lessorLicensingAuthority: string;
  lessorEmail: string;
  lessorPhone: string;

  // ── Tenant Information (معلومات المستأجر) ──
  tenantName: string;
  tenantEmiratesId: string;
  tenantLicenseNo: string;
  tenantLicensingAuthority: string;
  tenantEmail: string;
  tenantPhone: string;

  // ── Property Information (معلومات العقار) ──
  propertyUsage: 'residential' | 'commercial' | 'industrial' | '';
  plotNo: string;
  makaniNo: string;
  buildingName: string;
  propertyNo: string;
  propertyType: string;
  propertyAreaSqM: number;
  location: string;
  premisesNoDewa: string;

  // ── Contract Information (معلومات العقد) ──
  contractPeriodFrom: string;
  contractPeriodTo: string;
  contractValue: number;
  annualRent: number;
  securityDepositAmount: number;
  modeOfPayment: string;

  // ── Signatures (التوقيعات) ──
  tenantSignature?: string;
  tenantSignatureDate?: string;
  lessorSignature?: string;
  lessorSignatureDate?: string;

  // ── Additional Terms (شروط إضافية) ──
  additionalTerms: string[];

  // ── Metadata ──
  createdAt: string;
  updatedAt: string;
  status: 'draft' | 'ready_for_signature' | 'signed' | 'registered_ejari';
  esignToken?: string;
}
