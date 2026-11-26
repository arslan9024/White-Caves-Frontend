/**
 * tenancyCockpit.data.ts — Canonical 12-Stage Tenancy Lifecycle & Google Drive Path Builder
 * Strictly enforces:
 *   Cheques & Fees FIRST -> Tenant Signs FIRST -> Payment Clearance -> Landlord Countersigns -> Ejari + DEWA
 * Owned by: SUP-05-2-01-1 (AI Daisy Supervisor — Residential Leasing, Portals & 12-Stage Deal Cockpit)
 * Single-purpose module (< 350 lines, AEG-042).
 */

export type TenancyContractMode = 'NEW_TENANCY' | 'RENEWAL_TENANCY';

export interface LeasingStageDef {
  order: number;
  key: string;
  apiStage: string;
  title: string;
  tag: string;
  driveFolder: CanonicalDriveSubfolder;
  mandatoryGateHint?: string;
}

export type CanonicalDriveSubfolder =
  'House Pictures' | 'Landlord Docs' | 'Tenant Docs' | 'Tenancy Contract';

export const CANONICAL_DRIVE_SUBFOLDERS: readonly CanonicalDriveSubfolder[] = [
  'House Pictures',
  'Landlord Docs',
  'Tenant Docs',
  'Tenancy Contract',
] as const;

export const TRACK_A_SUPERVISOR_CHAIN = {
  supervisorId: 'SUP-05-2-01-1',
  squadCode: 'SQD-05-2-01-1',
  supervisorName: 'AI Daisy Supervisor (Leasing Portals & Deal Cockpit)',
  chainText:
    'MD-01 → AI Zoe (COO) → DIR-05 AI Clara → MGR-05-2 AI Layla → AMGR-05-2-01 AI Amina → SUP-05-2-01-1 AI Daisy',
} as const;

export const LEASING_STAGES: LeasingStageDef[] = [
  {
    order: 1,
    key: 'STAGE_01',
    apiStage: 'STAGE_01_LANDLORD_OUTREACH',
    title: 'Landlord Availability Outreach',
    tag: 'Hunter SIM Fleet',
    driveFolder: 'Landlord Docs',
  },
  {
    order: 2,
    key: 'STAGE_02',
    apiStage: 'STAGE_02_INVENTORY_VERIFIED',
    title: 'Inventory Logged & Drive Created',
    tag: 'Mary Vault',
    driveFolder: 'House Pictures',
  },
  {
    order: 3,
    key: 'STAGE_03',
    apiStage: 'STAGE_03_MD_PRICE_NEGOTIATION',
    title: 'MD Price Negotiation Call',
    tag: 'Primary Master',
    driveFolder: 'Landlord Docs',
  },
  {
    order: 4,
    key: 'STAGE_04',
    apiStage: 'STAGE_04_INVENTORY_LIVE_PUBLISHED',
    title: 'Live Listing Published',
    tag: 'SEO Portals',
    driveFolder: 'House Pictures',
  },
  {
    order: 5,
    key: 'STAGE_05',
    apiStage: 'STAGE_05_TENANT_VIEWING_SCHEDULED',
    title: 'Tenant Viewing Completed',
    tag: 'MD Calendar',
    driveFolder: 'Tenant Docs',
  },
  {
    order: 6,
    key: 'STAGE_06',
    apiStage: 'STAGE_06_OFFER_SUBMITTED_AND_APPROVED',
    title: 'Offer Approved by Landlord',
    tag: 'Written Mutual Consent',
    driveFolder: 'Tenancy Contract',
  },
  {
    order: 7,
    key: 'STAGE_07',
    apiStage: 'STAGE_07_CHEQUES_AND_FEES_COLLECTED',
    title: 'Cheques & Agency Fees Collected',
    tag: 'MANDATORY FIRST',
    driveFolder: 'Tenancy Contract',
    mandatoryGateHint:
      'Rent cheques, security deposit & 5% agency fee (+ 5% UAE VAT) collected FIRST.',
  },
  {
    order: 8,
    key: 'STAGE_08',
    apiStage: 'STAGE_08_TENANT_SIGNED_FIRST',
    title: 'Tenant Signs Contract First',
    tag: 'MANDATORY FIRST',
    driveFolder: 'Tenancy Contract',
    mandatoryGateHint: 'Tenant must sign tenancy contract BEFORE Landlord countersigns.',
  },
  {
    order: 9,
    key: 'STAGE_09',
    apiStage: 'STAGE_09_PAYMENT_CLEARANCE_VERIFIED',
    title: 'Payment Clearance Verified',
    tag: 'Bank Escrow Gate',
    driveFolder: 'Tenancy Contract',
    mandatoryGateHint:
      'Deposit, initial rent & agency fee cleared in bank before Landlord release.',
  },
  {
    order: 10,
    key: 'STAGE_10',
    apiStage: 'STAGE_10_LANDLORD_SIGNED_COUNTERSIGNED',
    title: 'Landlord Countersigns Contract',
    tag: 'Final Execution',
    driveFolder: 'Tenancy Contract',
    mandatoryGateHint: 'Landlord countersigns strictly AFTER payment clearance verification.',
  },
  {
    order: 11,
    key: 'STAGE_11',
    apiStage: 'STAGE_11_EJARI_AND_DEWA_REGISTERED',
    title: 'Ejari & DEWA Registration',
    tag: 'Statutory Shield',
    driveFolder: 'Tenancy Contract',
    mandatoryGateHint:
      'Upload Ejari PDF + DEWA Security Deposit Receipt (New) or Latest Bill (Renewal).',
  },
  {
    order: 12,
    key: 'STAGE_12',
    apiStage: 'STAGE_12_ACTIVE_AND_RENEWAL_SCHEDULED',
    title: 'Active Tenancy & 90d Renewal',
    tag: 'VIP Care Cycle',
    driveFolder: 'Tenancy Contract',
  },
];

export interface TenancyComplianceGates {
  chequesCollected: boolean;
  feesCollected: boolean;
  tenantSigned: boolean;
  paymentCleared: boolean;
  landlordSigned: boolean;
  ejariUploaded: boolean;
  dewaProofUploaded: boolean;
}

export function createInitialGatesForStage(stageOrder: number): TenancyComplianceGates {
  return {
    chequesCollected: stageOrder >= 7,
    feesCollected: stageOrder >= 7,
    tenantSigned: stageOrder >= 8,
    paymentCleared: stageOrder >= 9,
    landlordSigned: stageOrder >= 10,
    ejariUploaded: stageOrder >= 11,
    dewaProofUploaded: stageOrder >= 11,
  };
}

export function buildDrivePropertyPath(
  area: string,
  cluster: string,
  unitNumber: string,
  subfolder?: CanonicalDriveSubfolder
): string {
  const normalizedArea = area.trim() || 'Damac Hills 2';
  const base = `Inventory Areas / ${normalizedArea} / ${cluster} / ${unitNumber}`;
  return subfolder ? `${base} / ${subfolder}` : base;
}

export function buildDriveFolderSearchUrl(
  baseDriveUrl: string,
  cluster: string,
  unitNumber: string,
  subfolder: CanonicalDriveSubfolder
): string {
  if (baseDriveUrl.includes('drive.google.com/drive/folders/')) {
    return `${baseDriveUrl}?q=${encodeURIComponent(`${cluster} ${unitNumber} ${subfolder}`)}`;
  }
  return `https://drive.google.com/drive/search?q=${encodeURIComponent(`Damac Hills 2 ${cluster} ${unitNumber} ${subfolder}`)}`;
}

export function validateStageTransition(
  currentStageOrder: number,
  targetStageOrder: number,
  gates: TenancyComplianceGates,
  contractMode: TenancyContractMode
): { allowed: boolean; reason?: string } {
  if (targetStageOrder <= currentStageOrder) {
    return { allowed: true };
  }
  if (targetStageOrder > currentStageOrder + 1) {
    return {
      allowed: false,
      reason: `Sequential Lock: Advance step-by-step from Stage ${currentStageOrder} to Stage ${currentStageOrder + 1} before unlocking Stage ${targetStageOrder}.`,
    };
  }
  if (targetStageOrder === 7 && (!gates.chequesCollected || !gates.feesCollected)) {
    return {
      allowed: false,
      reason:
        'Mandatory Gate (Stage 7): Confirm BOTH Cheques Collected AND Agency Fees (+5% VAT) Collected FIRST.',
    };
  }
  if (targetStageOrder === 8) {
    if (!gates.chequesCollected || !gates.feesCollected) {
      return {
        allowed: false,
        reason: 'Mandatory Gate (Stage 8): Cheques & Fees MUST be collected BEFORE Tenant signs.',
      };
    }
    if (!gates.tenantSigned) {
      return {
        allowed: false,
        reason: 'Mandatory Gate (Stage 8): Confirm Tenant Signed Contract FIRST.',
      };
    }
  }
  if (targetStageOrder === 9) {
    if (!gates.tenantSigned) {
      return {
        allowed: false,
        reason: 'Mandatory Gate (Stage 9): Tenant must sign FIRST before Payment Clearance.',
      };
    }
    if (!gates.paymentCleared) {
      return {
        allowed: false,
        reason: 'Mandatory Gate (Stage 9): Confirm Bank Payment Clearance Verified.',
      };
    }
  }
  if (targetStageOrder === 10) {
    if (!gates.paymentCleared) {
      return {
        allowed: false,
        reason:
          'Mandatory Gate (Stage 10): Payment Clearance MUST be verified BEFORE Landlord countersigns.',
      };
    }
    if (!gates.landlordSigned) {
      return {
        allowed: false,
        reason: 'Mandatory Gate (Stage 10): Confirm Landlord Countersigned Contract.',
      };
    }
  }
  if (targetStageOrder === 11) {
    const dewaLabel =
      contractMode === 'RENEWAL_TENANCY'
        ? 'Latest Paid DEWA Bill'
        : 'DEWA Security Deposit Receipt';
    if (!gates.ejariUploaded || !gates.dewaProofUploaded) {
      return {
        allowed: false,
        reason: `Mandatory Gate (Stage 11): Upload Ejari Certificate PDF and ${dewaLabel}.`,
      };
    }
  }
  return { allowed: true };
}
