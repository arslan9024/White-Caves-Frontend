import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import {
  SERVICE_REGISTRY,
  getServiceUrl,
  getRuntimeEnvironment,
  services,
} from './serviceRegistry';

describe('serviceRegistry', () => {
  const originalEnv = { ...process.env };

  beforeEach(() => {
    vi.resetModules();
  });

  afterEach(() => {
    process.env = { ...originalEnv };
  });

  it('resolves correct dev URLs by default in non-production mode', () => {
    expect(getServiceUrl('web', { env: 'development' })).toBe('http://localhost:3000');
    expect(getServiceUrl('frontend', { env: 'development' })).toBe('http://localhost:3001');
    expect(getServiceUrl('server', { env: 'development' })).toBe('http://localhost:5000');
    expect(getServiceUrl('whatsappBot', { env: 'development' })).toBe('http://localhost:5001');
    expect(getServiceUrl('aegis', { env: 'development' })).toBe('http://localhost:3333');
  });

  it('resolves correct production URLs', () => {
    expect(getServiceUrl('web', { env: 'production' })).toBe('https://whitecaves.com');
    expect(getServiceUrl('frontend', { env: 'production' })).toBe('https://app.whitecaves.com');
    expect(getServiceUrl('server', { env: 'production' })).toBe('https://api.whitecaves.com');
    expect(getServiceUrl('whatsappBot', { env: 'production' })).toBe('https://bot.whitecaves.com');
    expect(getServiceUrl('aegis', { env: 'production' })).toBe('https://aegis.whitecaves.com');
  });

  it('appends paths properly without duplicate slashes', () => {
    expect(services.server('/api/health', 'development')).toBe('http://localhost:5000/api/health');
    expect(services.server('api/health', 'development')).toBe('http://localhost:5000/api/health');
    expect(services.server('/api/health', 'production')).toBe(
      'https://api.whitecaves.com/api/health'
    );
  });

  it('respects custom override environment variables (useful for Cloudflare tunnels)', () => {
    process.env.VITE_SERVER_URL = 'https://tunnel-123.trycloudflare.com';
    expect(getServiceUrl('server')).toBe('https://tunnel-123.trycloudflare.com');
    expect(getServiceUrl('server', { path: '/v1/users' })).toBe(
      'https://tunnel-123.trycloudflare.com/v1/users'
    );
    delete process.env.VITE_SERVER_URL;
  });
});
