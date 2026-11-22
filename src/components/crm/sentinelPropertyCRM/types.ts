export interface SentinelProperty {
  id: string;
  title: string;
  currentStage: 'DRAFT_REVIEW' | 'LISTED' | 'UNDER_OFFER' | 'COMPLETED_SOLD' | 'ARCHIVED';
  reraVerified: boolean;
  priceAed: string;
}

export interface SentinelChecklist {
  titleDeedVerified: boolean;
  formASigned: boolean;
  trakheesiPermitActive: boolean;
  hdPhotosApproved: boolean;
  floorplanUploaded: boolean;
  passportKycComplete: boolean;
}

export type SentinelTabKey = 'lifecycle' | 'verification' | 'decommission' | 'telemetry';

export interface SentinelPropertyCRMProps {
  moduleId?: string;
  role?: string;
  user?: unknown;
}
