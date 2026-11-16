// AEGIS V5.0 — SubdomainIngressResolver Tests
// Compliant with TURING-LAW-000, AEG-042 (<350 lines)

import { describe, it, expect } from 'vitest';
import { resolveSubdomainIngress } from './subdomainIngressResolver';

describe('resolveSubdomainIngress', () => {
  it('resolves tenant subdomain to tenant-portal', () => {
    const res = resolveSubdomainIngress('tenant.whitecaves.com');
    expect(res.subdomain).toBe('tenant');
    expect(res.targetPath).toBe('/tenant-portal');
    expect(res.expectedRole).toBe('tenant');
  });

  it('resolves landlord subdomain to landlord-portal', () => {
    const res = resolveSubdomainIngress('landlord.whitecaves.com');
    expect(res.subdomain).toBe('landlord');
    expect(res.targetPath).toBe('/landlord-portal');
    expect(res.expectedRole).toBe('landlord');
  });

  it('resolves md subdomain to /app for Managing Director', () => {
    const res = resolveSubdomainIngress('md.whitecaves.com');
    expect(res.subdomain).toBe('md');
    expect(res.targetPath).toBe('/app');
    expect(res.expectedRole).toBe('md');
  });

  it('resolves auth subdomain to /signin', () => {
    const res = resolveSubdomainIngress('auth.whitecaves.com');
    expect(res.subdomain).toBe('auth');
    expect(res.targetPath).toBe('/signin');
    expect(res.requiresAuth).toBe(false);
  });

  it('resolves app.whitecaves.com to app role gateway', () => {
    const res = resolveSubdomainIngress('app.whitecaves.com');
    expect(res.subdomain).toBe('app');
    expect(res.requiresAuth).toBe(true);
  });

  it('defaults gracefully for apex domain or localhost', () => {
    const res = resolveSubdomainIngress('localhost');
    expect(res.subdomain).toBe('default');
    expect(res.targetPath).toBe(null);
  });
});
