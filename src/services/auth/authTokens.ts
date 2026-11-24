/**
 * Authentication Storage & Cookie Tokens — AEGIS V5.1 Architecture (AEG-042)
 *
 * Token persistence, restoration, and session cleanup helpers.
 */

import { apiClient } from '../../utils/apiClient';
import { safeStorage } from '../../utils/safeStorage';

export const TOKEN_KEY = 'token'; // Must match authFetch.ts key

/** Persist the JWT and configure apiClient for subsequent requests */
export function persistToken(token: string): void {
  safeStorage.set(TOKEN_KEY, token);
  apiClient.setAuthToken(token);
}

/** Clear token from storage and apiClient */
export function clearToken(): void {
  safeStorage.remove(TOKEN_KEY);
  apiClient.setAuthToken(null);
}

/** Extract cookie value safely in browser context */
export function getCookieValue(name: string): string | null {
  if (typeof document === 'undefined') return null;
  const cookies = document.cookie ? document.cookie.split(';') : [];
  for (const cookie of cookies) {
    const [key, ...valueParts] = cookie.trim().split('=');
    if (key === name) {
      return decodeURIComponent(valueParts.join('='));
    }
  }
  return null;
}

/** Restore token from storage on app init */
export function restoreAuthToken(): string | null {
  const token = safeStorage.get(TOKEN_KEY);
  if (token) {
    apiClient.setAuthToken(token);
  }
  return token;
}
