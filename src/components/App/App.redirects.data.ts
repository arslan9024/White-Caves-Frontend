export const LEGACY_DASHBOARD_REDIRECT_ROUTES: Array<{ path: string; to: string }> = [
  { path: '/lion/dashboard', to: '/dashboard' },
  { path: '/owner/dashboard', to: '/dashboard' },
  { path: '/md/dashboard', to: '/dashboard' },
  { path: '/md/command-center', to: '/dashboard' },
  { path: '/employee/workspace', to: '/dashboard' },
  { path: '/buyer/dashboard', to: '/buyer-portal' },
  { path: '/buyer/acquisitions', to: '/buyer-portal' },
  { path: '/seller/dashboard', to: '/seller-portal' },
  { path: '/seller/listings', to: '/seller-portal' },
  { path: '/leasing-agent/dashboard', to: '/dashboard' },
  { path: '/secondary-sales-agent/dashboard', to: '/dashboard' },
  { path: '/landlord/dashboard', to: '/landlord-portal' },
  { path: '/landlord/portfolio', to: '/landlord-portal' },
  { path: '/tenant/dashboard', to: '/tenant-portal' },
  { path: '/tenant/lease', to: '/tenant-portal' },
];
export const LEGACY_OWNER_REDIRECT_ROUTES: Array<{ path: string; to: string }> = [
  { path: '/owner/business-model', to: '/dashboard' },
  { path: '/owner/client-services', to: '/dashboard' },
  { path: '/modern-dashboard', to: '/dashboard' },
  { path: '/crm', to: '/dashboard' },
  { path: '/owner/crm', to: '/dashboard' },
];
