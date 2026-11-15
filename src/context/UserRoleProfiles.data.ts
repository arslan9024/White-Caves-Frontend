// FILE: src/context/UserRoleProfiles.data.ts
/**
 * White Caves Real Estate LLC - Demo Role Profiles & Default Guest User
 */

import type { UserRole, UserProfile } from './UserRoleContext.types';
import {
  ROLE_DEFAULT_LEVELS,
  ROLE_DEFAULT_DEPARTMENTS,
  ROLE_DEFAULT_PERMISSIONS,
} from './UserRoleConstants.data';

export function createDemoRoleProfile(
  role: UserRole,
  id: string,
  name: string,
  email: string,
  phone: string,
  isFounder: boolean
): UserProfile {
  const isMd = isFounder || role === 'managing_director' || role === 'admin';
  return {
    id,
    name,
    email,
    phone,
    role,
    accessLevel: isMd ? 6 : ROLE_DEFAULT_LEVELS[role] || 1,
    assignedDepartment: ROLE_DEFAULT_DEPARTMENTS[role] || 'Corporate Executive Governance',
    isManagingDirector: isMd,
    isFounder,
    isRoleConfirmed: role !== 'guest',
    permissions: isMd ? ['*'] : ROLE_DEFAULT_PERMISSIONS[role] || ['can_view_properties'],
  };
}

export const DEFAULT_GUEST_USER: UserProfile = {
  id: 'guest_user',
  name: 'Executive Guest',
  email: 'guest@whitecaves.ae',
  phone: '+971500000000',
  role: 'guest',
  accessLevel: 1,
  assignedDepartment: 'VIP Client Hospitality',
  isManagingDirector: false,
  isFounder: false,
  isRoleConfirmed: false,
  permissions: ['can_view_properties', 'can_use_calculators'],
};

export const DEMO_ROLE_PROFILES: Record<UserRole, UserProfile> = {
  managing_director: createDemoRoleProfile('managing_director', 'EMP-001', 'Arslan Malik', 'arslanmalikgoraha@gmail.com', '+971505760056', true),
  director: createDemoRoleProfile('director', 'EMP-002', 'Layla Al-Maktoum', 'layla.dir@whitecaves.ae', '+971501112233', false),
  manager: createDemoRoleProfile('manager', 'EMP-003', 'Rashid Al-Nuaimi', 'rashid.mgr@whitecaves.ae', '+971502223344', false),
  supervisor: createDemoRoleProfile('supervisor', 'EMP-004', 'Mariam Al-Hashemi', 'mariam.sup@whitecaves.ae', '+971503334455', false),
  team_leader: createDemoRoleProfile('team_leader', 'EMP-005', 'Tariq Mansoor', 'tariq.lead@whitecaves.ae', '+971504445566', false),
  employee: createDemoRoleProfile('employee', 'EMP-006', 'Kareem Zaid', 'kareem.emp@whitecaves.ae', '+971505556677', false),

  landlord: createDemoRoleProfile('landlord', 'CLI-LL-001', 'Sheikh Mansoor Al-Nahyan', 'mansoor@alnahyan-holdings.ae', '+971507778899', false),
  tenant: createDemoRoleProfile('tenant', 'CLI-TN-001', 'Alexander Wright', 'alex.wright@techventures.ae', '+971508889900', false),
  buyer: createDemoRoleProfile('buyer', 'CLI-BY-001', 'Vikramaditya Singhania', 'vikram@singhaniacapital.ae', '+971509990011', false),
  seller: createDemoRoleProfile('seller', 'CLI-SL-001', 'Elena Rostova', 'elena.rostova@monacotrust.ch', '+971501234567', false),
  external_agent: createDemoRoleProfile('external_agent', 'PART-AG-001', 'David Gold (BetterHomes RERA #4912)', 'david.gold@partneragency.ae', '+971509876543', false),
  external_company: createDemoRoleProfile('external_company', 'PART-CO-001', 'Emaar Properties PJSC (Institutional)', 'institutional.relations@emaar.ae', '+971506543210', false),

  // Legacy mappings
  admin: createDemoRoleProfile('admin', 'SYS-001', 'System Administrator', 'admin@whitecaves.ae', '+971500000001', true),
  agent: createDemoRoleProfile('agent', 'EMP-006', 'Kareem Zaid', 'kareem.emp@whitecaves.ae', '+971505556677', false),
  intern: createDemoRoleProfile('intern', 'INT-001', 'Zayd Al-Nuaimi', 'zayd.intern@whitecaves.ae', '+971501231234', false),
  offplan_buyer: createDemoRoleProfile('offplan_buyer', 'CLI-BY-001', 'Vikramaditya Singhania', 'vikram@singhaniacapital.ae', '+971509990011', false),
  developer: createDemoRoleProfile('developer', 'PART-CO-001', 'Emaar Properties PJSC', 'institutional.relations@emaar.ae', '+971506543210', false),
  conveyancer: createDemoRoleProfile('conveyancer', 'PART-CV-001', 'Al Tamimi & Company', 'conveyancing@tamimi.ae', '+971501119999', false),
  contractor: createDemoRoleProfile('contractor', 'VND-001', 'Emirates Facilities Management', 'dispatch@efm-uae.ae', '+971504448888', false),
  guest: DEFAULT_GUEST_USER,
};
