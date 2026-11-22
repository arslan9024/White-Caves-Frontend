import type { ScannedTenancyContractResult } from './types';

export const SANIT_SINGH_CAMELIA_608_SAMPLE: ScannedTenancyContractResult = {
  demoOnly: true,
  reviewConfirmed: false,
  isFilled: true,
  fillScorePercent: 92,
  totalFieldsCount: 20,
  filledFieldsCount: 18,
  missingFields: ['DEWA Premise Number', 'Makani Number'],
  classification: 'fully_executed',
  contractDate: '10-07-2026',

  landlord: {
    name: 'SANIT SINGH NAGPAL',
    emiratesId: '784-1999-5371408-8',
    email: 'nagpalsanit@gmail.com',
    phone: '0504458097',
    licenseNo: '',
    licensingAuthority: '',
  },

  tenant: {
    name: 'KESHIVANI MAYADEVAN',
    emiratesId: '784-1984-7391875-7',
    email: 'shivanimayadevan9@gmail.com',
    phone: '050 7915250',
    licenseNo: '',
    licensingAuthority: '',
  },

  property: {
    usage: 'residential',
    buildingName: 'CAMELIA',
    propertyNumber: '608',
    plotNumber: '176',
    propertyType: 'LAND',
    areaSqM: 112.24,
    areaSqFt: 1208.14,
    location: 'DAMAC HILLS 2',
    makaniNo: '',
    premisesNoDewa: '',
  },

  financials: {
    periodFrom: '13-07-2026',
    periodTo: '12-07-2027',
    annualRentAed: 112000,
    contractValueAed: 112000,
    securityDepositAed: 5600,
    modeOfPayment: '3 CHEQUES',
  },

  additionalTerms: [
    '1. Addendum is part of contract.',
    '2. Contract valid 1 year; renewal needs landlord approval.',
    '3. Deposit non-refundable if house not clean, undamaged, with service proof.',
    '4. Landlord arranges pre-move-in cleaning, painting, AC service.',
    '5. Key handover after EJARI, DEWA receipt, DAMAC permit.',
  ],

  signatures: {
    hasTenantSigned: true,
    tenantSignedDate: '10-07-2026',
    hasLessorSigned: true,
    lessorSignedDate: '10-07-2026',
  },

  confidenceScore: 0.998,
  scannedAt: new Date().toISOString(),
};

export const SVETLANA_JANUSIA_XH2858B_SAMPLE: ScannedTenancyContractResult = {
  demoOnly: true,
  reviewConfirmed: false,
  isFilled: true,
  fillScorePercent: 95,
  totalFieldsCount: 20,
  filledFieldsCount: 19,
  missingFields: ['Lessor Emirates ID (Overseas Landlord)'],
  classification: 'fully_executed',
  contractDate: '13-01-2026',

  landlord: {
    name: 'SVETLANA LEVITSKAYA',
    emiratesId: '',
    email: 'svetlanaln@hotmail.com',
    phone: '974 5550 1054',
    licenseNo: '',
    licensingAuthority: '',
  },

  tenant: {
    name: 'WILLIAM MICHAEL ABERNETHY',
    emiratesId: '784197927183794',
    email: 'wmabernethy@gmail.com',
    phone: '0585969529',
    licenseNo: '',
    licensingAuthority: '',
  },

  property: {
    usage: 'residential',
    buildingName: 'Janusia',
    propertyNumber: 'XH2858B',
    plotNumber: '6340',
    propertyType: '3 BHK + Maid Room',
    areaSqM: 198.98,
    areaSqFt: 2141.8,
    location: 'Damac Hills 2',
    makaniNo: '257',
    premisesNoDewa: '918014964',
  },

  financials: {
    periodFrom: '27-01-2026',
    periodTo: '26-01-2027',
    annualRentAed: 120000,
    contractValueAed: 120000,
    securityDepositAed: 6000,
    modeOfPayment: '4 CHEQUES',
  },

  additionalTerms: [
    '1. The addendum attached to this is an integral part of the tenancy contract.',
    '2. This is renewal contract valid for 1 year only. Renewal of the contract is subject to the approval of the landlord.',
    "3. The security deposit is paid from previous contract and not refundable if the house isn't returned clean, undamaged, and with proof of required services.",
    '4. The landlord will confirm and arrange the maintenance, including cleaning, painting, and AC service, for the tenant before MOVE-IN.',
    '5. The key handover will be processed after the submission of EJARI, DEWA receipt, and MOVE-IN permit by DAMAC.',
  ],

  signatures: {
    hasTenantSigned: true,
    tenantSignedDate: '13-01-2026',
    hasLessorSigned: true,
    lessorSignedDate: '26-01-2026',
  },

  confidenceScore: 0.999,
  scannedAt: new Date().toISOString(),
};

export const BLANK_DLD_TEMPLATE_SAMPLE: ScannedTenancyContractResult = {
  demoOnly: true,
  reviewConfirmed: false,
  isFilled: false,
  fillScorePercent: 0,
  totalFieldsCount: 20,
  filledFieldsCount: 0,
  missingFields: [
    'Landlord Name',
    'Landlord Emirates ID',
    'Tenant Name',
    'Tenant Emirates ID',
    'Building Name',
    'Property Number',
    'Plot Number',
    'Area SqM',
    'Location',
    'Contract Period From',
    'Contract Period To',
    'Annual Rent',
    'Contract Value',
    'Security Deposit',
    'Mode of Payment',
    'Tenant Signature',
    'Lessor Signature',
    'DEWA Premise Number',
    'Makani Number',
  ],
  classification: 'blank_template',
  contractDate: '',

  landlord: {
    name: '',
    emiratesId: '',
    email: '',
    phone: '',
  },

  tenant: {
    name: '',
    emiratesId: '',
    email: '',
    phone: '',
  },

  property: {
    usage: 'residential',
    buildingName: '',
    propertyNumber: '',
    plotNumber: '',
    propertyType: '',
    areaSqM: 0,
    areaSqFt: 0,
    location: '',
  },

  financials: {
    periodFrom: '',
    periodTo: '',
    annualRentAed: 0,
    contractValueAed: 0,
    securityDepositAed: 0,
    modeOfPayment: '',
  },

  additionalTerms: [],

  signatures: {
    hasTenantSigned: false,
    hasLessorSigned: false,
  },

  confidenceScore: 1.0,
  scannedAt: new Date().toISOString(),
};
