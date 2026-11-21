export type PortalId = 'md' | 'employee' | 'landlord' | 'tenant' | 'buyer' | 'seller';

export type UserRole =
  | 'MANAGING_DIRECTOR'
  | 'SUPER_ADMIN'
  | 'BROKER'
  | 'MANAGER'
  | 'SUPERVISOR'
  | 'STAFF'
  | 'LANDLORD'
  | 'TENANT'
  | 'BUYER'
  | 'SELLER';

export interface PortalConfig {
  id: PortalId;
  subdomain: string;
  label: string;
  shortLabel: string;
  description: string;
  defaultRoute: string;
  allowedRoles: UserRole[];
  accentColor: string;
}

export const GATEWAY_SUBDOMAIN = 'app.whitecaves.com';
export const PORTAL_STORAGE_KEY = 'wc_active_portal';
export const PREFERRED_PORTAL_STORAGE_KEY = 'wc_preferred_portal';

export const PORTAL_REGISTRY: Record<PortalId, PortalConfig> = {
  md: {
    id: 'md',
    subdomain: 'md.whitecaves.com',
    label: 'Managing Director Command Center',
    shortLabel: 'MD Command',
    description:
      '1-12-108 Bhakti Floor Hierarchy, Revenue Analytics, AEgis Controls & Final Approvals',
    defaultRoute: '/md/command-center',
    allowedRoles: ['MANAGING_DIRECTOR', 'SUPER_ADMIN'],
    accentColor: '#EF4444',
  },
  employee: {
    id: 'employee',
    subdomain: 'employee.whitecaves.com',
    label: 'Employee & Broker Workspace',
    shortLabel: 'Employee',
    description: 'My Listings, Available Inventory, Personal KPIs, Lead Pipeline & OCR Queue',
    defaultRoute: '/employee/workspace',
    allowedRoles: ['BROKER', 'MANAGER', 'SUPERVISOR', 'STAFF', 'MANAGING_DIRECTOR', 'SUPER_ADMIN'],
    accentColor: '#EF4444',
  },
  landlord: {
    id: 'landlord',
    subdomain: 'landlord.whitecaves.com',
    label: 'Landlord Portfolio Portal',
    shortLabel: 'Landlord',
    description: 'Rented Property ROI, Active Leases, Cheque Schedule, Renewals & Henry Vault',
    defaultRoute: '/landlord/portfolio',
    allowedRoles: ['LANDLORD'],
    accentColor: '#0F172A',
  },
  tenant: {
    id: 'tenant',
    subdomain: 'tenant.whitecaves.com',
    label: 'Tenant Lease Portal',
    shortLabel: 'Tenant',
    description: 'Active Lease Summary, Upcoming Rent Cheques, Ejari Downloads & Maintenance',
    defaultRoute: '/tenant/lease',
    allowedRoles: ['TENANT'],
    accentColor: '#1E293B',
  },
  buyer: {
    id: 'buyer',
    subdomain: 'buyer.whitecaves.com',
    label: 'Buyer Acquisitions Portal',
    shortLabel: 'Buyer',
    description: 'Shortlisted Properties, Viewing History, RERA Form B & DLD Transfer Tracker',
    defaultRoute: '/buyer/acquisitions',
    allowedRoles: ['BUYER'],
    accentColor: '#EF4444',
  },
  seller: {
    id: 'seller',
    subdomain: 'seller.whitecaves.com',
    label: 'Seller Listings Portal',
    shortLabel: 'Seller',
    description: 'Listing Status, Viewing Feedback, RERA Form A & Offer Negotiation Tracker',
    defaultRoute: '/seller/listings',
    allowedRoles: ['SELLER'],
    accentColor: '#0F172A',
  },
};

export const PORTAL_LIST: PortalConfig[] = Object.values(PORTAL_REGISTRY);

export function isValidPortalId(value: string | null | undefined): value is PortalId {
  return Boolean(value && value in PORTAL_REGISTRY);
}

/**
 * Resolves the active portal from hostname in production, or `?portal=<role>` /
 * `localStorage` override on localhost / preview environments.
 */
export function resolveActivePortal(): PortalId | 'gateway' {
  if (typeof window === 'undefined') return 'gateway';

  const hostname = window.location.hostname.toLowerCase();
  const matched = PORTAL_LIST.find(
    p => hostname === p.subdomain || hostname.startsWith(`${p.id}.`)
  );
  if (matched) return matched.id;

  if (hostname === GATEWAY_SUBDOMAIN) return 'gateway';

  // Localhost / Vercel preview override
  const params = new URLSearchParams(window.location.search);
  const queryPortal = params.get('portal');
  if (isValidPortalId(queryPortal)) {
    try {
      window.localStorage.setItem(PORTAL_STORAGE_KEY, queryPortal);
    } catch {
      // ignore storage errors
    }
    return queryPortal;
  }

  try {
    const stored = window.localStorage.getItem(PORTAL_STORAGE_KEY);
    if (isValidPortalId(stored)) return stored;
  } catch {
    // ignore storage errors
  }

  return 'gateway';
}

export function getAuthorizedPortals(roles: UserRole[] = []): PortalConfig[] {
  if (!roles.length) return [];
  return PORTAL_LIST.filter(portal => portal.allowedRoles.some(r => roles.includes(r)));
}

export function isRoleAuthorizedForPortal(roles: UserRole[] = [], portalId: PortalId): boolean {
  const config = PORTAL_REGISTRY[portalId];
  return config.allowedRoles.some(r => roles.includes(r));
}

export function getPortalUrl(portalId: PortalId): string {
  const config = PORTAL_REGISTRY[portalId];
  if (typeof window === 'undefined') return `https://${config.subdomain}${config.defaultRoute}`;

  const hostname = window.location.hostname.toLowerCase();
  const isLocal =
    hostname === 'localhost' ||
    hostname === '127.0.0.1' ||
    hostname.endsWith('.localhost');
  if (isLocal) {
    if (hostname.endsWith('.localhost')) {
      return `${window.location.protocol}//${portalId}.localhost:${window.location.port || '5173'}${config.defaultRoute}`;
    }
    return `${window.location.origin}${config.defaultRoute}?portal=${portalId}`;
  }
  return `https://${config.subdomain}${config.defaultRoute}`;
}

