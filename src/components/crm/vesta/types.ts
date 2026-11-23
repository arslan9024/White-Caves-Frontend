export type VestaTab = 'snagging' | 'checklist' | 'certificate' | 'contractor';

export type SnagPriority = 'LOW' | 'MEDIUM' | 'HIGH';
export type SnagStatus = 'PENDING_FIX' | 'IN_PROGRESS' | 'RECTIFIED';

export interface SnagItem {
  id: string;
  room: string;
  item: string;
  priority: SnagPriority | string;
  contractor: string;
  status: SnagStatus | string;
}

export interface HandoverChecklistState {
  dewaTransferred: boolean;
  empowerChilledWaterRegistered: boolean;
  accessCardsHandedOver: boolean;
  parkingRemoteVerified: boolean;
  snaggingReportSigned: boolean;
  ejariCertificateDelivered: boolean;
}

export interface VestaHandoverCRMProps {
  moduleId?: string;
  role?: string;
  user?: Record<string, unknown>;
}
