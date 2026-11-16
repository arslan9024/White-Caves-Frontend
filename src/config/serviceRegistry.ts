/**
 * Centralized Service & Routing Registry for White Caves Ecosystem
 *
 * Handles routing across:
 * - white-caves-web (Dev: localhost:3000 -> Prod: https://whitecaves.com)
 * - white-caves-frontend (Dev: localhost:3001 -> Prod: https://app.whitecaves.com)
 * - white-caves-server (Dev: localhost:5000 -> Prod: https://api.whitecaves.com)
 * - whatsapp-bot-linda (Dev: localhost:5001 -> Prod: https://bot.whitecaves.com)
 * - aegis (Dev: localhost:3333 -> Prod: https://aegis.whitecaves.com)
 *
 * Supports Cloudflare Tunnels and explicit environment overrides.
 */

export type Environment = 'development' | 'production' | 'staging';

export type ServiceName =
  | 'web' // white-caves-web (Landing / Public site)
  | 'frontend' // white-caves-frontend (CRM / Admin Dashboard)
  | 'server' // white-caves-server (Backend API)
  | 'whatsappBot' // whatsapp-bot-linda (WhatsApp Bot service)
  | 'aegis'; // aegis (Security & Monitoring)

export interface ServiceDefinition {
  dev: string;
  prod: string;
  tunnel?: string;
}

export const SERVICE_REGISTRY: Record<ServiceName, ServiceDefinition> = {
  web: {
    dev: 'http://localhost:3000',
    prod: 'https://whitecaves.com',
  },
  frontend: {
    dev: 'http://localhost:3001',
    prod: 'https://app.whitecaves.com',
  },
  server: {
    dev: 'http://localhost:5000',
    prod: 'https://api.whitecaves.com',
  },
  whatsappBot: {
    dev: 'http://localhost:5001',
    prod: 'https://bot.whitecaves.com',
  },
  aegis: {
    dev: 'http://localhost:3333',
    prod: 'https://aegis.whitecaves.com',
  },
};

/**
 * Safe accessor for environment variables supporting Vite import.meta and process.env
 */
export const getEnvVar = (key: string): string | undefined => {
  if (typeof import.meta !== 'undefined' && import.meta.env) {
    const viteVal = (import.meta.env as Record<string, string | boolean | undefined>)[key];
    if (typeof viteVal === 'string' && viteVal.length > 0) return viteVal;
  }
  const proc = (globalThis as { process?: { env?: Record<string, string | undefined> } }).process;
  return proc?.env?.[key];
};

/**
 * Determines current runtime environment based on flags, window hostname, or build mode
 */
export function getRuntimeEnvironment(): Environment {
  const forcedEnv = getEnvVar('VITE_APP_ENV') || getEnvVar('NODE_ENV');
  if (forcedEnv === 'production') return 'production';
  if (forcedEnv === 'staging') return 'staging';

  // Client-side detection via browser hostname
  if (typeof window !== 'undefined' && window.location) {
    const { hostname } = window.location;
    if (hostname.endsWith('whitecaves.com')) return 'production';
    if (hostname.includes('trycloudflare.com')) return 'staging';
    if (hostname === 'localhost' || hostname === '127.0.0.1') return 'development';
  }

  const mode = import.meta?.env?.MODE;
  if (mode === 'production') return 'production';
  if (mode === 'staging') return 'staging';

  return 'development';
}

/**
 * Check if currently operating in development environment
 */
export function isDevEnvironment(): boolean {
  return getRuntimeEnvironment() === 'development';
}

/**
 * Check if currently operating in production environment
 */
export function isProdEnvironment(): boolean {
  return getRuntimeEnvironment() === 'production';
}

/**
 * Helper to join base URL and path safely without double slashes
 */
function joinPath(base: string, path?: string): string {
  if (!path) return base;
  const cleanBase = base.endsWith('/') ? base.slice(0, -1) : base;
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${cleanBase}${cleanPath}`;
}

export interface GetServiceUrlOptions {
  env?: Environment;
  path?: string;
  useProxy?: boolean; // When true on frontend, allows routing through relative /api proxy
}

/**
 * Resolves the absolute URL for any service based on the active or specified environment.
 * Allows overriding via env variables e.g. VITE_SERVER_URL, VITE_WHATSAPPBOT_URL, VITE_AEGIS_URL
 */
export function getServiceUrl(service: ServiceName, options?: GetServiceUrlOptions): string {
  // Check for explicit environment override variable first (useful for Cloudflare tunnels)
  const envKey = `VITE_${service.toUpperCase()}_URL`;
  const customOverride = getEnvVar(envKey);
  if (customOverride) {
    return joinPath(customOverride, options?.path);
  }

  // If useProxy is requested for the server in development, return relative /api
  if (service === 'server' && options?.useProxy) {
    const relativeProxy = getEnvVar('VITE_API_URL');
    if (relativeProxy && relativeProxy.startsWith('/')) {
      return joinPath(relativeProxy, options?.path);
    }
  }

  const targetEnv = options?.env ?? getRuntimeEnvironment();
  const config = SERVICE_REGISTRY[service];
  const baseUrl = targetEnv === 'production' ? config.prod : config.dev;

  return joinPath(baseUrl, options?.path);
}

/**
 * Convenience getters for all registered services
 */
export const services = {
  web: (path?: string, env?: Environment) => getServiceUrl('web', { path, env }),
  frontend: (path?: string, env?: Environment) => getServiceUrl('frontend', { path, env }),
  server: (path?: string, env?: Environment) => getServiceUrl('server', { path, env }),
  whatsappBot: (path?: string, env?: Environment) => getServiceUrl('whatsappBot', { path, env }),
  aegis: (path?: string, env?: Environment) => getServiceUrl('aegis', { path, env }),
};
