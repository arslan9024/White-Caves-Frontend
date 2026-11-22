import { type ScanReview, canUseScan } from '../henryScanReview';
import type { DldTenancyContractData } from '../HenryTenancyContractTemplateService';
import type { ScannedTenancyContractResult } from './types';

/**
 * Converts Extracted Scanned Contract into DldTenancyContractData for 1-click loading into the Preparation Studio
 */
export function toDldTenancyContractData(
  scanned: ScannedTenancyContractResult,
  previewOnly = false
): DldTenancyContractData {
  if (!previewOnly && !canUseScan(scanned as ScanReview)) {
    throw new Error('Confirm contract review before autofill.');
  }
  return {
    contractId: scanned.contractReference || '',
    contractDate: scanned.contractDate,
    ownerName: scanned.landlord.name,
    lessorName: scanned.landlord.name,
    lessorEmiratesId: scanned.landlord.emiratesId,
    lessorLicenseNo: scanned.landlord.licenseNo || '',
    lessorLicensingAuthority: scanned.landlord.licensingAuthority || '',
    lessorEmail: scanned.landlord.email,
    lessorPhone: scanned.landlord.phone,
    tenantName: scanned.tenant.name,
    tenantEmiratesId: scanned.tenant.emiratesId,
    tenantLicenseNo: scanned.tenant.licenseNo || '',
    tenantLicensingAuthority: scanned.tenant.licensingAuthority || '',
    tenantEmail: scanned.tenant.email,
    tenantPhone: scanned.tenant.phone,
    propertyUsage: scanned.property.usage,
    buildingName: scanned.property.buildingName,
    propertyNo: scanned.property.propertyNumber,
    plotNo: scanned.property.plotNumber,
    propertyType: scanned.property.propertyType,
    propertyAreaSqM: scanned.property.areaSqM ?? 0,
    location: scanned.property.location,
    premisesNoDewa: scanned.property.premisesNoDewa || '',
    makaniNo: scanned.property.makaniNo || '',
    contractPeriodFrom: scanned.financials.periodFrom,
    contractPeriodTo: scanned.financials.periodTo,
    annualRent: scanned.financials.annualRentAed,
    contractValue: scanned.financials.contractValueAed ?? 0,
    securityDepositAmount: scanned.financials.securityDepositAed ?? 0,
    modeOfPayment: scanned.financials.modeOfPayment,
    additionalTerms: scanned.additionalTerms,
    tenantSignature: scanned.signatures.hasTenantSigned ? scanned.tenant.name : undefined,
    tenantSignatureDate: scanned.signatures.tenantSignedDate,
    lessorSignature: scanned.signatures.hasLessorSigned ? scanned.landlord.name : undefined,
    lessorSignatureDate: scanned.signatures.lessorSignedDate,
    status: scanned.isFilled ? 'ready_for_signature' : 'draft',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}

/**
 * Converts Extracted Contract into CRM Landlord Profile object
 */
export function toCrmLandlordProfile(scanned: ScannedTenancyContractResult) {
  if (!canUseScan(scanned as ScanReview)) {
    throw new Error('Confirm contract review before autofill.');
  }
  return {
    fullName: scanned.landlord.name,
    emiratesId: scanned.landlord.emiratesId,
    email: scanned.landlord.email,
    phone: scanned.landlord.phone,
    ownedProperty: `${scanned.property.buildingName} Unit ${scanned.property.propertyNumber} (${scanned.property.location})`,
    currentAnnualRentAed: scanned.financials.annualRentAed,
    leaseExpiryDate: scanned.financials.periodTo,
    source: 'Henry Tenancy OCR Ingestion',
  };
}

/**
 * Converts Extracted Contract into CRM Tenant Profile object
 */
export function toCrmTenantProfile(scanned: ScannedTenancyContractResult) {
  if (!canUseScan(scanned as ScanReview)) {
    throw new Error('Confirm contract review before autofill.');
  }
  return {
    fullName: scanned.tenant.name,
    emiratesId: scanned.tenant.emiratesId,
    email: scanned.tenant.email,
    phone: scanned.tenant.phone,
    leasedUnit: `${scanned.property.buildingName} Unit ${scanned.property.propertyNumber}`,
    annualRentAed: scanned.financials.annualRentAed,
    leaseStartDate: scanned.financials.periodFrom,
    leaseEndDate: scanned.financials.periodTo,
    source: 'Henry Tenancy OCR Ingestion',
  };
}
