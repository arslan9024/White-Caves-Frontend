/**
 * Authentication Service Types — AEGIS V5.1 Architecture (AEG-042)
 *
 * Domain types for auth users, session responses, and challenge contracts.
 */

export interface AuthUser {
  id: string;
  email: string;
  name: string | null;
  role: string;
  status?: string;
  isRoleConfirmed?: boolean;
  department?: string | null;
  photoUrl?: string | null;
  phone?: string | null;
  profileCompleted?: boolean;
  profileCompletion?: {
    roleCategory: 'general' | 'client' | 'agent' | 'leadership';
    requiredFields: Array<'name' | 'phone' | 'department'>;
    optionalFields: Array<'name' | 'phone' | 'department'>;
    missingFields: Array<'name' | 'phone' | 'phone' | 'department'>;
  };
}

/** Shape of `data` when login succeeds normally */
export interface LoginSuccessData {
  token: string;
  user: AuthUser;
}

/** Shape of `data` when the account has 2FA enabled — a challenge token is issued instead */
export interface TwoFactorChallengeData {
  twoFactorToken: string;
}

export interface LoginResponse {
  success: boolean;
  data: LoginSuccessData | TwoFactorChallengeData;
  requiresTwoFactor?: boolean;
}

/**
 * Dedicated response type for Firebase-sync and social-auth endpoints.
 * These flows never trigger a 2FA challenge, so the data always contains
 * a full session token and user object.
 */
export interface FirebaseSyncResponse {
  success: boolean;
  data: LoginSuccessData;
}

export interface RegisterResponse {
  success: boolean;
  data: {
    token: string;
    pendingApproval?: boolean;
    requestedRole?: string | null;
    user: AuthUser;
  };
}

export interface ProfileResponse {
  success: boolean;
  data: AuthUser;
}

export interface ForgotPasswordRequestResponse {
  success: boolean;
  data: {
    requested: boolean;
    expiresInMinutes: number;
    message: string;
  };
}

export interface ForgotPasswordVerifyResponse {
  success: boolean;
  data: {
    verified: boolean;
    resetSessionToken: string;
  };
}

export interface ForgotPasswordResetResponse {
  success: boolean;
  data: {
    reset: boolean;
    message: string;
  };
}
