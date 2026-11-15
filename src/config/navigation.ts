import {
  RoleCategory,
  UserRole,
  NavItem,
  QuickAction,
  RoleNavLink,
  RoleNavConfig,
  DASHBOARD_TABS,
  SIDEBAR_CONFIG,
  PUBLIC_NAV,
  ROLE_NAV,
  QUICK_ACTIONS,
  BREADCRUMB_LABELS,
} from './navigation.data';

export type { RoleCategory, UserRole, NavItem, QuickAction, RoleNavLink, RoleNavConfig };
export { DASHBOARD_TABS, SIDEBAR_CONFIG, PUBLIC_NAV, ROLE_NAV, QUICK_ACTIONS, BREADCRUMB_LABELS };

// ---------------------------------------------------------------------------
// Helper Functions
// ---------------------------------------------------------------------------

export function getRoleCategory(role: string): RoleCategory {
  const clientRoles: readonly string[] = ['buyer', 'seller', 'landlord', 'tenant'];
  const staffRoles: readonly string[] = ['leasing-agent', 'secondary-sales-agent', 'team-leader'];
  const adminRoles: readonly string[] = ['owner', 'admin'];

  if (clientRoles.includes(role)) return 'client';
  if (staffRoles.includes(role)) return 'staff';
  if (adminRoles.includes(role)) return 'admin';
  return 'visitor';
}

function getCanonicalDashboardPath(role: string): string {
  if (role === 'landlord') return '/landlord-portal';
  if (role === 'tenant') return '/tenant-portal';
  return '/crm';
}

function normalizeDashboardHash(path: string, role: string): string {
  const hashIndex = path.indexOf('#');
  if (hashIndex === -1) return path;

  const hashValue = path.slice(hashIndex + 1).trim();
  const canonicalDashboard = getCanonicalDashboardPath(role);

  if (!hashValue) return canonicalDashboard;
  if (canonicalDashboard === '/crm')
    return `${canonicalDashboard}?tab=${encodeURIComponent(hashValue)}`;
  return canonicalDashboard;
}

function normalizeRolePath(path: string, role: string): string {
  if (!path) return path;

  if (path === 'dashboard') return getCanonicalDashboardPath(role);
  if (path.startsWith('dashboard#')) return normalizeDashboardHash(path, role);

  const legacyDashboardPrefixes = [
    '/buyer/dashboard',
    '/seller/dashboard',
    '/landlord/dashboard',
    '/tenant/dashboard',
    '/leasing-agent/dashboard',
    '/secondary-sales-agent/dashboard',
    '/team-leader/dashboard',
    '/owner/dashboard',
    '/md/dashboard',
    '/company/dashboard',
    '/management/dashboard',
    '/admin/dashboard',
    '/branch/dashboard',
    '/sales/dashboard',
    '/leasing/dashboard',
    '/agent/dashboard',
  ];

  const hasLegacyPrefix = legacyDashboardPrefixes.some(prefix => path.startsWith(prefix));
  if (!hasLegacyPrefix) return path;

  if (!path.includes('#')) {
    return getCanonicalDashboardPath(role);
  }

  return normalizeDashboardHash(path, role);
}

export function getNavForRole(role: string): RoleNavConfig | null {
  const roleNav = ROLE_NAV[role];
  if (!roleNav) return null;

  return {
    ...roleNav,
    dashboard: normalizeRolePath(roleNav.dashboard, role),
    links: roleNav.links.map(link => ({
      ...link,
      path: normalizeRolePath(link.path, role),
    })),
    ...(roleNav.browseAs
      ? {
          browseAs: {
            clients: roleNav.browseAs.clients.map(link => ({
              ...link,
              path: normalizeRolePath(link.path, role),
            })),
            employees: roleNav.browseAs.employees.map(link => ({
              ...link,
              path: normalizeRolePath(link.path, role),
            })),
          },
        }
      : {}),
  };
}

export function getQuickActionsForRole(role: string): readonly QuickAction[] {
  const category = getRoleCategory(role);
  const quickActions = QUICK_ACTIONS[category] || QUICK_ACTIONS.visitor;

  return quickActions.map(action => ({
    ...action,
    path: normalizeRolePath(action.path, role),
  }));
}
