import { RoleKey, RoleTab, RoleInfo } from './roleTabMapping.types';
import { ROLE_TAB_MAPPING } from './roleTabMapping.data';

/** Get tabs for a specific role */
export const getTabsForRole = (role: string): RoleTab[] => {
  return ROLE_TAB_MAPPING[role as RoleKey]?.tabs || [];
};

/** Get role info including label and description */
export const getRoleInfo = (role: string): RoleInfo => {
  const roleData = ROLE_TAB_MAPPING[role as RoleKey];
  return {
    label: roleData?.label || role.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
    description: roleData?.description || 'Dashboard access',
    isSuperUser: role === 'lion' || role === 'owner',
  };
};

/** Check if role can access specific feature */
export const canAccessFeature = (role: string, featureId: string): boolean => {
  const tabs = getTabsForRole(role);
  return tabs.some(tab => tab.id === featureId);
};

/** Type guard to check if a string is a valid role key */
export const isValidRole = (role: string): role is RoleKey => {
  return role in ROLE_TAB_MAPPING;
};

/** Check if a role has super user / admin privileges */
export const isSuperUserRole = (role?: string): boolean => {
  return role === 'lion' || role === 'owner' || role === 'super_admin';
};

/** Check if role is the platform creator/founder */
export const isCreatorRole = (role?: string): boolean => {
  return role === 'super_admin' || role === 'lion' || role === 'managing_director' || role === 'md';
};

/** Check if a role has admin-level access (includes backend admin roles) */
export const isAdminRole = (role?: string): boolean => {
  return role === 'admin' || role === 'super_user' || isSuperUserRole(role);
};

/** Get all available role keys */
export const getAllRoles = (): RoleKey[] => {
  return Object.keys(ROLE_TAB_MAPPING) as RoleKey[];
};

