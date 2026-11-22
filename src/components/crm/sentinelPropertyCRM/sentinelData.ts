import type { SentinelProperty, SentinelChecklist } from './types';

export const INITIAL_PROPERTIES: SentinelProperty[] = [
  {
    id: 'PROP-9021',
    title: 'Palm Jumeirah Signature Villa',
    currentStage: 'LISTED',
    reraVerified: true,
    priceAed: '45,000,000',
  },
  {
    id: 'PROP-9022',
    title: 'Downtown Burj Crown 3BR',
    currentStage: 'UNDER_OFFER',
    reraVerified: true,
    priceAed: '4,200,000',
  },
  {
    id: 'PROP-9023',
    title: 'Dubai Hills Golf Suite',
    currentStage: 'DRAFT_REVIEW',
    reraVerified: false,
    priceAed: '2,850,000',
  },
  {
    id: 'PROP-9024',
    title: 'Creek Horizon 2BR',
    currentStage: 'COMPLETED_SOLD',
    reraVerified: true,
    priceAed: '1,950,000',
  },
];

export const INITIAL_CHECKLIST: SentinelChecklist = {
  titleDeedVerified: true,
  formASigned: true,
  trakheesiPermitActive: true,
  hdPhotosApproved: true,
  floorplanUploaded: false,
  passportKycComplete: true,
};

export const STAGE_ORDER: SentinelProperty['currentStage'][] = [
  'DRAFT_REVIEW',
  'LISTED',
  'UNDER_OFFER',
  'COMPLETED_SOLD',
  'ARCHIVED',
];
