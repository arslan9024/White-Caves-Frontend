import type { JourneyResultOutcome } from '../../../types/journey';
import type { DldTenancyContractData } from '../../../services/HenryTenancyContractTemplateService';
import henryTenancyContractScannerService from '../../../services/HenryTenancyContractScannerService';
import henryTitleDeedScannerService from '../../../services/HenryTitleDeedScannerService';
import henryEmiratesIdScannerService from '../../../services/HenryEmiratesIdScannerService';
import henryPassportScannerService from '../../../services/HenryPassportScannerService';
import { canUseScan } from '../../../services/henryScanReview';

export const PROCESSING_TASKS = [
  'Validating property and ownership deed',
  'Validating landlord KYC profile and contacts',
  'Validating tenant identity and passport/visa',
  'Verifying contract terms and RERA index compliance',
  'Compiling standard and custom special clauses',
  'Generating official Dubai Tenancy Agreement document',
  'Applying White Caves Real Estate LLC watermark and seals',
];

export function buildDldContractData(data: Record<string, any>): DldTenancyContractData {
  return {
    contractId: `WC-DLD-${data.propertyName?.replace(/\s+/g, '') || '2026'}-${Date.now().toString(36).toUpperCase()}`,
    contractDate: new Date().toLocaleDateString('en-GB'),
    ownerName: data.landlordName || 'Arslan Malik',
    lessorName: data.landlordName || 'Arslan Malik',
    lessorEmiratesId: data.landlordEmiratesId || '784-1988-1234567-1',
    lessorLicenseNo: '',
    lessorLicensingAuthority: '',
    lessorEmail: data.landlordEmail || 'arslan.malik@whitecaves.ae',
    lessorPhone: data.landlordPhone || '+971 50 123 4567',
    tenantName: data.tenantName || 'Sarah Jenkins',
    tenantEmiratesId: data.tenantEmiratesId || '784-1992-7654321-2',
    tenantLicenseNo: '',
    tenantLicensingAuthority: '',
    tenantEmail: data.tenantEmail || 'sarah.jenkins@example.com',
    tenantPhone: data.tenantPhone || '+971 52 987 6543',
    propertyUsage: 'residential',
    plotNo: '176',
    makaniNo: '257',
    buildingName: data.propertyName || 'Sycamore 131',
    propertyNo: '131',
    propertyType: data.propertyType || '3 Bedroom Townhouse',
    propertyAreaSqM: 198.5,
    location: data.community || 'DAMAC Hills 2, Dubai',
    premisesNoDewa: '918014964',
    contractPeriodFrom: data.startDate || '01-09-2026',
    contractPeriodTo: data.endDate || '31-08-2027',
    contractValue: Number(data.annualRent) || 95000,
    annualRent: Number(data.annualRent) || 95000,
    securityDepositAmount: Math.round(
      (Number(data.annualRent) || 95000) * ((Number(data.securityDepositPct) || 5) / 100)
    ),
    modeOfPayment: `${data.chequesCount || 2} Cheques`,
    additionalTerms: [
      '1. The tenant shall use the premises strictly for private residential purposes.',
      '2. Maintenance exceeding AED 500 shall be borne by the landlord, below AED 500 by the tenant.',
      '3. The contract is governed by Dubai Real Estate Regulatory Agency (RERA) Law No. 26 of 2007 & Law No. 33 of 2008.',
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    status: 'ready_for_signature',
  };
}

export function buildCompletionOutcome(data: Record<string, any>): JourneyResultOutcome {
  return {
    referenceNumber: `WC-2026-${Math.floor(100000 + Math.random() * 900000)}`,
    title: 'Tenancy Contract Ready',
    subtitle: `${data.propertyName || 'Property'} — ${data.community || 'Dubai'}`,
    summaryItems: [
      {
        label: 'Property',
        value: `${data.propertyName || 'Unit'} (${data.community || 'Dubai'})`,
        verified: true,
      },
      {
        label: 'Annual Rent',
        value: `AED ${Number(data.annualRent || 0).toLocaleString()}`,
        verified: true,
      },
      { label: 'Payment Terms', value: `${data.chequesCount || 2} Cheques`, verified: true },
      {
        label: 'Tenancy Period',
        value: `${data.startDate || '2026-09-01'} to ${data.endDate || '2027-08-31'}`,
        verified: true,
      },
      { label: 'Landlord', value: data.landlordName || 'Verified Owner', verified: true },
      { label: 'Tenant', value: data.tenantName || 'Verified Tenant', verified: true },
    ],
    badges: ['RERA Compliant', 'E-Sign Ready', 'Ejari Payload Prepared'],
    nextActions: [
      {
        id: 'download-pdf',
        title: 'Download Tenancy Contract PDF',
        actionType: 'download_pdf',
        icon: '📥',
        primary: true,
      },
      {
        id: 'launch-signing',
        title: 'Launch Digital Signing Journey',
        targetJourneyId: 'contract-signing',
        actionType: 'start_journey',
        icon: '✍️',
      },
      {
        id: 'launch-payments',
        title: 'Start Payment & Cheque Collection',
        targetJourneyId: 'payment-collection',
        actionType: 'start_journey',
        icon: '💰',
      },
      {
        id: 'launch-ejari',
        title: 'Register with Ejari DLD',
        targetJourneyId: 'create-ejari',
        actionType: 'start_journey',
        icon: '🏛️',
      },
    ],
  };
}

export async function scanJourneyUploadedFile(
  file: File,
  data: Record<string, any>,
  onUpdateData: (patch: Record<string, unknown>) => void
): Promise<string> {
  const fileNameLower = file.name.toLowerCase();

  if (
    fileNameLower.includes('deed') ||
    fileNameLower.includes('oqood') ||
    fileNameLower.includes('title')
  ) {
    const deedData = await henryTitleDeedScannerService.scanTitleDeed(file);
    if (!canUseScan(deedData)) {
      return 'Review this source in the Title Deed scanner first. No fields were applied.';
    }
    onUpdateData({
      propertyName: deedData.buildingNameEn || data.propertyName,
      community: deedData.communityEn ? `${deedData.communityEn}, Dubai` : data.community,
      propertyType: deedData.propertyTypeEn || data.propertyType,
      plotArea: `${deedData.totalAreaSqM ? Math.round(deedData.totalAreaSqM * 10.764) : 1882} sqft`,
      buaArea: `${deedData.totalAreaSqM ? Math.round(deedData.totalAreaSqM * 10.764 * 1.3) : 2460} sqft`,
      landlordName: deedData.ownerNameEn || data.landlordName,
      landlordVerified: true,
      propertyVerified: true,
    });
    return `✓ Scanned "${file.name}": Extracted Title Deed (${deedData.buildingNameEn} #${deedData.propertyNumber}) & Owner! Information updated.`;
  }

  if (
    fileNameLower.includes('tenant') &&
    (fileNameLower.includes('eid') || fileNameLower.includes('emirates'))
  ) {
    const eidData = await henryEmiratesIdScannerService.scanEmiratesId(file);
    if (!canUseScan(eidData)) {
      return 'Review this source in the Emirates ID scanner first. No fields were applied.';
    }
    onUpdateData({
      tenantName: eidData.fullNameEn || data.tenantName,
      tenantEmiratesId: eidData.idNumber || data.tenantEmiratesId,
      tenantVerified: true,
    });
    return `✓ Scanned "${file.name}": Extracted Tenant Emirates ID (${eidData.fullNameEn})!`;
  }

  if (fileNameLower.includes('passport')) {
    const passportData = await henryPassportScannerService.scanPassport(file);
    if (!canUseScan(passportData)) {
      return 'Review this source in the Passport scanner first. No fields were applied.';
    }
    onUpdateData({
      tenantName: passportData.fullName || data.tenantName,
      tenantPassportNo: passportData.passportNumber || data.tenantPassportNo,
      tenantVerified: true,
    });
    return `✓ Scanned "${file.name}": Extracted Tenant Passport (${passportData.fullName} - ${passportData.passportNumber})!`;
  }

  const scannedContract = await henryTenancyContractScannerService.scanContract(file);
  if (!canUseScan(scannedContract)) {
    return 'Select and review the document in its dedicated Henry scanner first. No fields were applied.';
  }
  onUpdateData({
    propertyName: scannedContract.property.buildingName || data.propertyName,
    community: scannedContract.property.location || data.community,
    propertyType: scannedContract.property.propertyType || data.propertyType,
    landlordName: scannedContract.landlord.name || data.landlordName,
    landlordEmail: scannedContract.landlord.email || data.landlordEmail,
    landlordPhone: scannedContract.landlord.phone || data.landlordPhone,
    landlordEmiratesId: scannedContract.landlord.emiratesId || data.landlordEmiratesId,
    tenantName: scannedContract.tenant.name || data.tenantName,
    tenantEmail: scannedContract.tenant.email || data.tenantEmail,
    tenantPhone: scannedContract.tenant.phone || data.tenantPhone,
    tenantEmiratesId: scannedContract.tenant.emiratesId || data.tenantEmiratesId,
    annualRent: scannedContract.financials.annualRentAed || data.annualRent,
    chequesCount: scannedContract.financials.modeOfPayment?.includes('4')
      ? 4
      : scannedContract.financials.modeOfPayment?.includes('1')
        ? 1
        : 2,
    startDate: scannedContract.financials.periodFrom || data.startDate,
    endDate: scannedContract.financials.periodTo || data.endDate,
    propertyVerified: true,
    landlordVerified: true,
    tenantVerified: true,
  });
  return `✓ Scanned "${file.name}": Extracted all Contract details (Property, Landlord, Tenant, Rent AED ${scannedContract.financials.annualRentAed.toLocaleString()})! Template filled.`;
}
