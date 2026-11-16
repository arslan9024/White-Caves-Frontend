import type { InternationalPassportExtractedData } from './henryPassport.types';

export const ARSLAN_MALIK_SAMPLE_PASSPORT: InternationalPassportExtractedData = {
  demoOnly: true,
  reviewConfirmed: false,
  passportNumber: 'DR0760143',
  passportType: 'P',
  issuingCountry: 'Islamic Republic of Pakistan',
  issuingCountryCode: 'PAK',
  bookletNumber: 'R7587163',
  trackingNumber: '99992498902',
  issuingAuthority: 'PAKISTAN',

  surname: 'MALIK',
  givenNames: 'ARSLAN',
  fullName: 'Arslan Malik',
  fatherName: 'Bashir Ahmad',
  nationalIdentityNumber: '32303-4339014-9',
  dateOfBirth: '10/02/1993',
  gender: 'M',
  placeOfBirth: 'MUZAFFARGARH, PAK',
  nationality: 'PAKISTANI',
  nationalityCode: 'PAK',

  dateOfIssue: '22/02/2024',
  dateOfExpiry: '21/02/2034',
  isExpired: false,
  validityYears: 10,

  mrz: {
    line1: 'P<PAKMALIK<<ARSLAN<<<<<<<<<<<<<<<<<<<<<<<<<<',
    line2: 'DR07601431PAK9302109M34022143230343390149<20',
  },

  confidenceScore: 0.999,
  scannedAt: new Date().toISOString(),
};


