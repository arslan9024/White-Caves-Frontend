/**
 * Browser WebAuthn / Passkey availability check (Point 54).
 */
export function isWebAuthnSupported(): boolean {
  return typeof window !== 'undefined' && typeof window.PublicKeyCredential !== 'undefined';
}
