/**
 * Firebase Auth Sync Service & Retry Handlers — AEGIS V5.1 Architecture (AEG-042)
 *
 * Bridges Firebase social/phone auth with backend JWT session issuance,
 * handling transient errors, backoff retries, and token extraction.
 */

import { apiClient } from '../../utils/apiClient';
import { auth as firebaseAuth } from '../../config/firebase';
import { HttpError } from '../../utils/HttpError';
import { persistToken } from './authTokens';
import type { FirebaseSyncResponse } from './authTypes';

export function resolveFirebaseSyncErrorMessage(error: unknown): string {
  if (error instanceof HttpError) {
    const data = error.data;

    if (typeof data === 'object' && data !== null) {
      const asRecord = data as Record<string, unknown>;
      const payloadMessage =
        (typeof asRecord.message === 'string' && asRecord.message.trim()) ||
        (typeof asRecord.error === 'string' && asRecord.error.trim()) ||
        (typeof asRecord.details === 'string' && asRecord.details.trim()) ||
        '';

      if (payloadMessage) {
        if (/too many login attempts from this ip/i.test(payloadMessage)) {
          return 'Backend session activation is temporarily rate-limited. Please retry Google sign-in in a few seconds.';
        }
        if (/too many firebase session sync attempts/i.test(payloadMessage)) {
          return 'Backend session activation is temporarily rate-limited. Please retry Google sign-in in a few seconds.';
        }
        return payloadMessage;
      }
    }

    if (error.message?.trim()) {
      return error.message.trim();
    }

    if (error.status === 401) {
      return 'Firebase token verification failed. Please sign in with Google again.';
    }

    if (error.status === 503) {
      return 'Authentication service is temporarily unavailable on the server. Please try again shortly.';
    }

    if (error.status === 429) {
      return 'Backend session activation is temporarily rate-limited. Please retry Google sign-in in a few seconds.';
    }
  }

  if (error instanceof Error && error.message.trim()) {
    return error.message.trim();
  }

  if (
    typeof error === 'object' &&
    error !== null &&
    'message' in error &&
    typeof (error as { message?: unknown }).message === 'string' &&
    (error as { message: string }).message.trim()
  ) {
    return (error as { message: string }).message.trim();
  }

  return 'Unable to complete authentication sync';
}

export function isTransientFirebaseSyncError(error: unknown): boolean {
  if (error instanceof HttpError) {
    if (error.status === 429 || error.status === 503 || error.status === 504) {
      return true;
    }

    const data = error.data;
    if (typeof data === 'object' && data !== null) {
      const payload = data as Record<string, unknown>;
      const payloadMessage =
        (typeof payload.message === 'string' && payload.message) ||
        (typeof payload.error === 'string' && payload.error) ||
        '';

      if (/temporarily|timeout|rate[- ]?limit|too many|try again/i.test(payloadMessage)) {
        return true;
      }
    }

    if (/temporarily|timeout|rate[- ]?limit|too many|try again/i.test(error.message || '')) {
      return true;
    }
  }

  if (error instanceof Error) {
    return /network|timeout|fetch failed|econnreset|temporarily/i.test(error.message || '');
  }

  return false;
}

const wait = (ms: number): Promise<void> =>
  new Promise(resolve => {
    setTimeout(resolve, ms);
  });

export interface SyncFirebaseUserInput {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  getIdToken?: (forceRefresh?: boolean) => Promise<string>;
}

/**
 * Sync a Firebase-authenticated user with the backend.
 * If the user doesn't exist, creates them; if they do, issues a JWT.
 * This bridges Firebase social/phone auth with backend JWT auth.
 */
export async function syncFirebaseUser(
  firebaseUser: SyncFirebaseUserInput
): Promise<FirebaseSyncResponse> {
  let response: FirebaseSyncResponse | null = null;
  const maxAttempts = 3;

  const resolveFirebaseToken = async (forceRefresh: boolean): Promise<string> => {
    let resolvedToken: string | null = null;

    if (typeof firebaseUser.getIdToken === 'function') {
      resolvedToken = await firebaseUser.getIdToken(forceRefresh);
    }

    if (!resolvedToken && firebaseAuth?.currentUser?.uid === firebaseUser.uid) {
      resolvedToken = await firebaseAuth.currentUser.getIdToken(forceRefresh);
    }

    if (!resolvedToken) {
      throw new Error(
        'Firebase authentication token is missing. Please retry Google sign-in to establish a secure backend session.'
      );
    }

    return resolvedToken;
  };

  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    const forceRefresh = attempt > 1;

    try {
      const firebaseToken = await resolveFirebaseToken(forceRefresh);
      console.log('Calling /auth/firebase-sync with payload:', {
        firebaseUid: firebaseUser.uid,
        email: firebaseUser.email,
        name: firebaseUser.displayName,
        photoUrl: firebaseUser.photoURL,
      });
      response = (await apiClient.post('/auth/firebase-sync', {
        firebaseUid: firebaseUser.uid,
        email: firebaseUser.email,
        name: firebaseUser.displayName,
        photoUrl: firebaseUser.photoURL,
        firebaseToken,
      })) as FirebaseSyncResponse;
      console.log('Firebase sync response:', response);
      break;
    } catch (error: unknown) {
      console.error('Error in syncFirebaseUser attempt', attempt, error);
      const canRetry = attempt < maxAttempts && isTransientFirebaseSyncError(error);
      if (canRetry) {
        await wait(400 * attempt);
        continue;
      }

      throw new Error(resolveFirebaseSyncErrorMessage(error));
    }
  }

  if (!response) {
    throw new Error('Unable to complete authentication sync');
  }

  if (!response.success) {
    throw new Error('Backend session setup was rejected. Please try Google sign-in again.');
  }

  if (!response.data?.token) {
    throw new Error('Firebase sync succeeded but no authentication token was returned');
  }

  persistToken(response.data.token);

  return response;
}
