// FILE: src/context/UserRoleContext.data.ts
/**
 * White Caves Real Estate LLC - Sovereign Role Profiles, Permissions & Defaults
 * Standard: Dual-Track 6x6 RBAC (6 Levels Internal Staff + 6 Categories External Clients)
 * Single Purpose File Law: < 350 lines
 */

import { safeStorage } from '../utils/safeStorage';
import type { UserRole, AccessLevel, UserProfile } from './UserRoleContext.types';

export * from './UserRoleConstants.data';
export * from './UserRoleProfiles.data';

import {
  ROLE_DEFAULT_LEVELS,
  ROLE_DEFAULT_DEPARTMENTS,
  ROLE_DEFAULT_PERMISSIONS,
} from './UserRoleConstants.data';

export const SOVEREIGN_FOUNDER_EMAILS: string[] = [
  'arslanmalikgoraha@gmail.com',
  'the.white.caves@gmail.com',
  'arslan@whitecaves.com',
];

export const ALL_SOVEREIGN_ROLES: UserRole[] = [
  // Track A: Internal Staff
  'managing_director',
  'director',
  'manager',
  'supervisor',
  'team_leader',
  'employee',

  // Track B: External Clients & Partners
  'landlord',
  'tenant',
  'buyer',
  'seller',
  'external_agent',
  'external_company',

  // Legacy mappings for backward compatibility
  'admin',
  'agent',
  'intern',
  'offplan_buyer',
  'developer',
  'conveyancer',
  'contractor',
  'guest',
];

export function normalizeSovereignRole(rawRole?: string | null, isFounder = false): UserRole {
  if (isFounder) return 'managing_director';
  const r = String(rawRole || '').toLowerCase().trim();
  if (r === 'owner') return 'managing_director';
  if (r === 'lead' || r === 'squad_leader') return 'team_leader';
  if (r === 'staff') return 'employee';
  return (r in ROLE_DEFAULT_LEVELS) ? (r as UserRole) : 'guest';
}

export function buildSovereignProfile(data: Partial<UserProfile> & { email: string }): UserProfile {
  const isFounderUser =
    data.id === 'user-001' ||
    SOVEREIGN_FOUNDER_EMAILS.some(e => e.toLowerCase() === (data.email || '').toLowerCase());
  const effectiveRole: UserRole = normalizeSovereignRole(data.role, isFounderUser);
  const isMdRole = isFounderUser || effectiveRole === 'managing_director' || effectiveRole === 'admin';
  const effectiveLevel: AccessLevel = isMdRole
    ? 6
    : (data.accessLevel as AccessLevel) || ROLE_DEFAULT_LEVELS[effectiveRole] || 1;
  const isConfirmed = isMdRole ? true : (data.isRoleConfirmed ?? effectiveRole !== 'guest');

  return {
    id: isFounderUser
      ? data.id && data.id !== 'guest_user'
        ? data.id
        : 'user-001'
      : data.id || `user_${Date.now()}`,
    name: data.name || (isFounderUser ? 'Arslan Malik Bashir Ahmad' : 'White Caves User'),
    email: data.email,
    photoURL:
      data.photoURL ||
      `https://ui-avatars.com/api/?name=${encodeURIComponent(
        data.name || 'User'
      )}&background=EF4444&color=fff`,
    phone: data.phone || '+971505110636',
    role: effectiveRole,
    accessLevel: effectiveLevel,
    assignedDepartment: data.assignedDepartment || ROLE_DEFAULT_DEPARTMENTS[effectiveRole],
    isManagingDirector: isMdRole,
    isFounder: isFounderUser,
    isRoleConfirmed: isConfirmed,
    permissions: isMdRole
      ? ['*']
      : data.permissions || ROLE_DEFAULT_PERMISSIONS[effectiveRole] || ['can_view_properties'],
  };
}

export function syncUserToSafeStorage(user: UserProfile | null): void {
  if (typeof window === 'undefined') return;
  if (user) {
    safeStorage.setJSON('whitecaves_user', user);
    safeStorage.setJSON('userRole', {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      accessLevel: user.accessLevel,
      assignedDepartment: user.assignedDepartment,
      isManagingDirector: user.isManagingDirector,
      isFounder: user.isFounder,
      isRoleConfirmed: user.isRoleConfirmed,
      permissions: user.permissions,
    });
  } else {
    safeStorage.remove('whitecaves_user');
    safeStorage.remove('userRole');
  }
}

