import { safeStorage } from '../utils/safeStorage';

export const CREDENTIAL_STORAGE_KEY = 'webauthn_credentials';
export const SESSION_STORAGE_KEY = 'biometric_session';

/** Locally-stored WebAuthn credential metadata */
export interface StoredCredential {
  id: string;
  rawId: string;
  userId: string;
  createdAt: string;
  lastUsed: string | null;
}

/** Biometric session persisted to storage */
export interface BiometricSession {
  user: { id: string; email?: string; name?: string; [key: string]: unknown };
  token: string;
  savedAt: string;
}

/** Shape of a credential sent to the server after registration */
export interface CredentialForServer {
  id: string;
  rawId: string;
  type: string;
  response: {
    clientDataJSON: string;
    attestationObject?: string;
    authenticatorData?: string;
    signature?: string;
    userHandle?: string | null;
  };
}

export const isWebAuthnSupported = (): boolean => {
  return !!(window.PublicKeyCredential && typeof window.PublicKeyCredential === 'function');
};

export const isPlatformAuthenticatorAvailable = async (): Promise<boolean> => {
  if (!isWebAuthnSupported()) return false;
  try {
    return await window.PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable();
  } catch {
    return false;
  }
};

export const bufferToBase64url = (buffer: ArrayBuffer): string => {
  const bytes = new Uint8Array(buffer);
  let binary = '';
  bytes.forEach(byte => (binary += String.fromCharCode(byte)));
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
};

export const base64urlToBuffer = (base64url: string): ArrayBuffer => {
  const base64 = base64url.replace(/-/g, '+').replace(/_/g, '/');
  const paddedBase64 = base64 + '=='.slice(0, (4 - (base64.length % 4)) % 4);
  const binary = atob(paddedBase64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    // eslint-disable-next-line security/detect-object-injection
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes.buffer;
};

export const getStoredCredentials = (): StoredCredential[] => {
  return safeStorage.getJSON<StoredCredential[]>(CREDENTIAL_STORAGE_KEY, []) ?? [];
};

export const saveCredentialLocally = (credential: CredentialForServer, userId: string): void => {
  const credentials = getStoredCredentials();
  credentials.push({
    id: credential.id,
    rawId: credential.rawId,
    userId,
    createdAt: new Date().toISOString(),
    lastUsed: null,
  });
  safeStorage.setJSON(CREDENTIAL_STORAGE_KEY, credentials);
};

