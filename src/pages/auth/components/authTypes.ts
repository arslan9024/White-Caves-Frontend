/**
 * authTypes.ts
 * Shared types and constants for SignInPage modular components
 */

export type AuthMode = 'signin' | 'signup';
export type AuthTab = 'email' | 'phone';
export type SignupStep = 1 | 2 | 3; // 1=credentials, 2=category, 3=role
export type SocialProvider = 'google' | 'facebook' | 'apple';
export type VerificationMethod = 'email-link' | 'sms-otp' | 'whatsapp';
export type PortalGatewayRole = 'managing_director' | 'landlord' | 'tenant';

export interface PortalGatewayOption {
  id: PortalGatewayRole;
  shortLabel: string;
  label: string;
  description: string;
  targetRoute: string;
}

export interface FirebaseUserPayload {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  getIdToken?: (forceRefresh?: boolean) => Promise<string>;
}

export interface SocialRecoveryState {
  visible: boolean;
  provider: SocialProvider | null;
  firebaseUser: FirebaseUserPayload | null;
  reason: string;
  retryCount: number;
  isRetrying: boolean;
  maxRetries: number;
}

export interface CategoryOption {
  id: string;
  label: string;
  description: string;
}

export const MAX_SOCIAL_RETRIES = 3;

export const PORTAL_GATEWAY_OPTIONS: PortalGatewayOption[] = [
  {
    id: 'managing_director',
    shortLabel: 'Managing Dir.',
    label: 'Managing Director Portal',
    description: 'Executive daily leasing cockpit, 10-SIM fleet & 12-stage deals',
    targetRoute: '/dashboard',
  },
  {
    id: 'landlord',
    shortLabel: 'Landlord',
    label: 'Landlord Portal',
    description: 'DAMAC Hills 2 assets, PDC cheques, Ejari copies & MD WhatsApp',
    targetRoute: '/landlord-portal',
  },
  {
    id: 'tenant',
    shortLabel: 'Tenant',
    label: 'Tenant Portal',
    description: 'Active contract, Ejari status, 5% VAT receipts & maintenance',
    targetRoute: '/tenant-portal',
  },
];

export const CATEGORIES: CategoryOption[] = [
  { id: 'client', label: 'Client', description: 'Browse and purchase properties' },
  { id: 'landlord', label: 'Landlord', description: 'Manage DH2 properties, PDCs & contracts' },
  { id: 'tenant', label: 'Tenant', description: 'View Ejari lease, 5% VAT receipts & tickets' },
  { id: 'staff', label: 'Staff Member', description: 'Internal team member' },
];
