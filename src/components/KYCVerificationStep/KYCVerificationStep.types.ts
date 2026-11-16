/**
 * KYC Verification Step — Types Layer (Mary Allen Wilkes Architecture)
 * Single-purpose type definitions strictly < 350 lines
 */

import type { LucideIcon } from 'lucide-react';
import { CreditCard, User, FileCheck, Building } from 'lucide-react';

export interface DocumentTypeInfo {
  label: string;
  description: string;
  required: boolean;
  icon: LucideIcon;
}

export const DOCUMENT_TYPES: Record<string, DocumentTypeInfo> = {
  emirates_id: {
    label: 'Emirates ID',
    description: 'Front and back of valid Emirates ID card',
    required: true,
    icon: CreditCard,
  },
  passport: {
    label: 'Passport',
    description: 'Bio-data page of valid passport',
    required: true,
    icon: User,
  },
  visa: {
    label: 'UAE Visa',
    description: 'Valid UAE residence visa (if applicable)',
    required: false,
    icon: FileCheck,
  },
  proof_of_address: {
    label: 'Proof of Address',
    description: 'Utility bill or bank statement (within 3 months)',
    required: false,
    icon: Building,
  },
};

export const ROLES_REQUIRING_KYC = ['buyer', 'seller', 'landlord', 'tenant', 'investor', 'agent'];

export interface KycFormData {
  nationality: string;
  emiratesId: string;
  dateOfBirth: string;
  sourceOfFunds: string;
  occupation: string;
  employerName: string;
  annualIncome: string;
}

export type KycStep = 'intro' | 'personal' | 'documents' | 'success';

export interface KYCUser {
  id?: string;
  name?: string;
  email?: string;
}

export interface KYCVerificationStepProps {
  user?: KYCUser;
  token?: string;
  role?: string;
  onComplete?: (result: { kycSubmitted: boolean }) => void;
  onSkip?: () => void;
}

