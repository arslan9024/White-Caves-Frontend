/**
 * Authentication Session & Lifecycle Operations — AEGIS V5.1 Architecture (AEG-042)
 *
 * Core authentication routines: login, 2FA verification, registration,
 * profile fetching, password reset workflows, and logout session teardown.
 */

import { apiClient } from '../../utils/apiClient';
import { safeStorage } from '../../utils/safeStorage';
import { authFetch } from '../../utils/authFetch';
import { persistToken, clearToken, getCookieValue } from './authTokens';
import type {
  AuthUser,
  LoginResponse,
  LoginSuccessData,
  RegisterResponse,
  ProfileResponse,
  ForgotPasswordRequestResponse,
  ForgotPasswordVerifyResponse,
  ForgotPasswordResetResponse,
} from './authTypes';

/**
 * Login with email and password via the backend.
 * Returns user data and stores the JWT.
 */
export async function loginWithEmail(email: string, password: string): Promise<LoginResponse> {
  const response = (await apiClient.post('/auth/login', { email, password })) as LoginResponse;

  // When 2FA is required the backend returns a challenge token, not a session token.
  // Do not try to persist a JWT in that case — the caller must complete 2FA first.
  if (response.success && !response.requiresTwoFactor) {
    const successData = response.data as LoginSuccessData;
    if (!successData?.token) {
      throw new Error('Login succeeded but no authentication token was returned');
    }
    persistToken(successData.token);
  }

  return response;
}

/**
 * Fetch the current user's profile using the stored JWT.
 */
export async function fetchProfile(): Promise<ProfileResponse> {
  return (await apiClient.get('/auth/profile')) as ProfileResponse;
}

/**
 * Complete a 2FA-gated login by verifying the TOTP code (or backup recovery code).
 * Persists the returned JWT and fetches the current user profile.
 */
export async function verifyTwoFactor(email: string, code: string): Promise<AuthUser> {
  const response = (await apiClient.post('/auth/verify-2fa', { email, code })) as {
    success: boolean;
    data: { token: string; verified: boolean };
  };

  if (!response.success || !response.data?.token) {
    throw new Error('Two-factor verification failed');
  }

  persistToken(response.data.token);

  const profile = await fetchProfile();
  return profile.data;
}

/**
 * Request a password reset challenge for the given email.
 */
export async function requestPasswordReset(email: string): Promise<ForgotPasswordRequestResponse> {
  return (await apiClient.post('/auth/forgot-password/request', {
    email,
  })) as ForgotPasswordRequestResponse;
}

/**
 * Verify the reset token sent for the user.
 */
export async function verifyPasswordResetToken(
  email: string,
  token: string
): Promise<ForgotPasswordVerifyResponse> {
  return (await apiClient.post('/auth/forgot-password/verify', {
    email,
    token,
  })) as ForgotPasswordVerifyResponse;
}

/**
 * Complete password reset after token verification.
 */
export async function resetPasswordWithToken(
  resetSessionToken: string,
  newPassword: string
): Promise<ForgotPasswordResetResponse> {
  return (await apiClient.post('/auth/forgot-password/reset', {
    resetSessionToken,
    newPassword,
  })) as ForgotPasswordResetResponse;
}

/**
 * Register a new user via the backend.
 * Returns user data and stores the JWT.
 */
export async function registerWithEmail(
  email: string,
  password: string,
  name?: string,
  phone?: string,
  department?: string,
  category?: string,
  role?: string
): Promise<RegisterResponse> {
  const response = (await apiClient.post('/auth/register', {
    email,
    password,
    name,
    phone,
    department,
    category,
    role,
  })) as RegisterResponse;

  if (response.success) {
    if (!response.data?.token) {
      throw new Error('Registration succeeded but no authentication token was returned');
    }
    persistToken(response.data.token);
  }

  return response;
}

/**
 * Change the current user's password.
 */
export async function changePassword(
  currentPassword: string,
  newPassword: string
): Promise<{ success: boolean }> {
  return (await apiClient.put('/auth/password', {
    currentPassword,
    newPassword,
  })) as { success: boolean };
}

/**
 * Complete registration for a social-auth user who has just selected their role.
 * The user was already created by syncFirebaseUser; this call updates their role/category
 * using the JWT that syncFirebaseUser stored.
 */
export async function completeSocialRegistration(
  category: string,
  role: string
): Promise<RegisterResponse> {
  const response = (await apiClient.post('/auth/complete-social-registration', {
    category,
    role,
  })) as RegisterResponse;

  if (response.success) {
    if (!response.data?.token) {
      throw new Error('Backend returned success but missing authentication token');
    }
    persistToken(response.data.token);
  }

  return response;
}

/**
 * Logout — clears JWT and user state.
 */
export async function logout(): Promise<void> {
  const csrfToken = getCookieValue('csrf_token');
  try {
    await authFetch('/api/auth/logout', {
      method: 'POST',
      headers: csrfToken ? { 'x-csrf-token': csrfToken } : undefined,
      body: JSON.stringify({}),
    });
  } catch {
    // Best effort only — local client cleanup still proceeds.
  }
  clearToken();
  safeStorage.remove('userRole');
}
