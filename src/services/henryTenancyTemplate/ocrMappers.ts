/**
 * Multi-source OCR field mappers for populating DLD Tenancy Contract drafts
 * from Title Deeds, Emirates IDs, and International Passports.
 */

import { canUseScan } from '../henryScanReview';
import type { DldTitleDeedExtractedData } from '../HenryTitleDeedScannerService';
import type { EmiratesIdExtractedData } from '../HenryEmiratesIdScannerService';
import type { InternationalPassportExtractedData } from '../HenryPassportScannerService';
import type { DldTenancyContractData } from './types';

export function populateContractFromTitleDeed(
  current: DldTenancyContractData,
  deed: DldTitleDeedExtractedData
): DldTenancyContractData {
  if (!canUseScan(deed)) return current;
  return {
    ...current,
    ownerName: deed.ownerNameEn || current.ownerName,
    lessorName: deed.ownerNameEn || current.lessorName,
    buildingName: deed.buildingNameEn || current.buildingName,
    propertyNo: deed.propertyNumber || current.propertyNo,
    plotNo: deed.plotNumber || current.plotNo,
    propertyType: deed.propertyTypeEn || current.propertyType,
    propertyAreaSqM: deed.totalAreaSqM || current.propertyAreaSqM,
    location: deed.communityEn ? `${deed.communityEn}, Dubai` : current.location,
    makaniNo: deed.municipalityNumber || current.makaniNo,
    updatedAt: new Date().toISOString(),
  };
}

export function populateContractFromEmiratesId(
  current: DldTenancyContractData,
  eid: EmiratesIdExtractedData,
  role: 'tenant' | 'landlord' = 'tenant'
): DldTenancyContractData {
  if (!canUseScan(eid)) return current;
  if (role === 'tenant') {
    return {
      ...current,
      tenantName: eid.fullNameEn || current.tenantName,
      tenantEmiratesId: eid.idNumber || current.tenantEmiratesId,
      updatedAt: new Date().toISOString(),
    };
  }
  return {
    ...current,
    ownerName: eid.fullNameEn || current.ownerName,
    lessorName: eid.fullNameEn || current.lessorName,
    lessorEmiratesId: eid.idNumber || current.lessorEmiratesId,
    updatedAt: new Date().toISOString(),
  };
}

export function populateContractFromPassport(
  current: DldTenancyContractData,
  passport: InternationalPassportExtractedData,
  role: 'tenant' | 'landlord' = 'tenant'
): DldTenancyContractData {
  if (!canUseScan(passport)) return current;
  if (role === 'tenant') {
    return {
      ...current,
      tenantName: passport.fullName || current.tenantName,
      tenantEmiratesId: `Passport: ${passport.passportNumber} (${passport.issuingCountryCode})`,
      updatedAt: new Date().toISOString(),
    };
  }
  return {
    ...current,
    ownerName: passport.fullName || current.ownerName,
    lessorName: passport.fullName || current.lessorName,
    lessorEmiratesId: `Passport: ${passport.passportNumber} (${passport.issuingCountryCode})`,
    updatedAt: new Date().toISOString(),
  };
}
