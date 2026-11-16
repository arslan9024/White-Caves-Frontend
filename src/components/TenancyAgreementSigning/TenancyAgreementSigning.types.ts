export interface AgreementParty {
  _id?: string;
  name?: string;
  email?: string;
}

export interface AgreementSignature {
  signed: boolean;
  signedAt?: string | Date;
  status?: 'SIGNED' | 'REJECTED' | 'PENDING' | string;
  rejectionReason?: string;
}

export interface AgreementDetails {
  propertyAddress: string;
  monthlyRent: number;
  securityDeposit: number;
  leaseStartDate: string;
  leaseEndDate: string;
}

export interface TenancyAgreement {
  _id: string;
  status: 'REJECTED' | 'FULLY_SIGNED' | 'PARTIALLY_SIGNED' | 'PENDING' | string;
  landlordId: AgreementParty | string;
  tenantId: AgreementParty | string;
  landlordEmail: string;
  tenantEmail: string;
  agreementDetails: AgreementDetails;
  signatures: {
    landlord: AgreementSignature;
    tenant: AgreementSignature;
  };
}

export type UserTenancyRole = 'landlord' | 'tenant' | null;

