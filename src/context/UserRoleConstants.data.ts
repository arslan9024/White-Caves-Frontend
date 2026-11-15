// FILE: src/context/UserRoleConstants.data.ts
import type { UserRole, AccessLevel, RoleTier } from './UserRoleContext.types';

export const ROLE_DEFAULT_LEVELS: Record<UserRole, AccessLevel> = {
  // Track A: Internal Staff (6 Levels)
  managing_director: 6,
  director: 5,
  manager: 4,
  supervisor: 3,
  team_leader: 2,
  employee: 1,

  // Track B: External Clients & Partners
  landlord: 2,
  external_company: 2,
  external_agent: 2,
  seller: 2,
  buyer: 1,
  tenant: 1,

  // Legacy mappings
  admin: 6,
  agent: 1,
  intern: 1,
  developer: 2,
  conveyancer: 2,
  contractor: 2,
  offplan_buyer: 1,
  guest: 1,
};

export const ROLE_TIERS: Record<UserRole, RoleTier> = {
  // Track A: Internal Staff
  managing_director: 'Tier 1: Internal Corporate Staff',
  director: 'Tier 1: Internal Corporate Staff',
  manager: 'Tier 1: Internal Corporate Staff',
  supervisor: 'Tier 1: Internal Corporate Staff',
  team_leader: 'Tier 1: Internal Corporate Staff',
  employee: 'Tier 1: Internal Corporate Staff',

  // Track B: External Clients & Partners
  landlord: 'Tier 2: External Client Portals',
  tenant: 'Tier 2: External Client Portals',
  buyer: 'Tier 2: External Client Portals',
  seller: 'Tier 2: External Client Portals',
  external_agent: 'Tier 3: Strategic Partners & Unconfirmed',
  external_company: 'Tier 3: Strategic Partners & Unconfirmed',

  // Legacy mappings
  admin: 'Tier 1: Internal Corporate Staff',
  agent: 'Tier 1: Internal Corporate Staff',
  intern: 'Tier 1: Internal Corporate Staff',
  developer: 'Tier 3: Strategic Partners & Unconfirmed',
  conveyancer: 'Tier 3: Strategic Partners & Unconfirmed',
  contractor: 'Tier 3: Strategic Partners & Unconfirmed',
  offplan_buyer: 'Tier 2: External Client Portals',
  guest: 'Tier 3: Strategic Partners & Unconfirmed',
};

export const ROLE_LABELS: Record<UserRole, string> = {
  // Track A: Internal Staff
  managing_director: 'Managing Director (Level 6 Sovereign)',
  director: 'Department Director (Level 5)',
  manager: 'Division Manager (Level 4)',
  supervisor: 'Task Supervisor (Level 3)',
  team_leader: 'Squad Team Leader (Level 2)',
  employee: 'Corporate Employee / Broker (Level 1)',

  // Track B: External Clients & Partners
  landlord: 'Landlord (Property Owner)',
  tenant: 'Tenant (Lease Signatory)',
  buyer: 'Buyer (Luxury Investor)',
  seller: 'Seller (Property Mandate)',
  external_agent: 'External Broker / Partner Agency',
  external_company: 'Master Developer / Institutional Partner',

  // Legacy mappings
  admin: 'System Administrator (Level 6)',
  agent: 'Real Estate Broker (Level 1)',
  intern: 'Sales Trainee / Intern (Level 1)',
  offplan_buyer: 'Off-Plan Global Investor (Tier 2)',
  developer: 'Master Developer Representative (Tier 3)',
  conveyancer: 'DLD Conveyancing Specialist (Tier 3)',
  contractor: 'Maintenance & Snagging Vendor (Tier 3)',
  guest: 'Unverified Guest Visitor (Tier 3)',
};

export const ROLE_BADGE_COLORS: Record<UserRole, string> = {
  // Track A: Internal Staff
  managing_director: 'bg-red-500/20 text-red-400 border-red-500/40 shadow-red-950/40',
  director: 'bg-purple-500/20 text-purple-400 border-purple-500/40',
  manager: 'bg-indigo-500/20 text-indigo-400 border-indigo-500/40',
  supervisor: 'bg-blue-500/20 text-blue-400 border-blue-500/40',
  team_leader: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/40',
  employee: 'bg-slate-500/20 text-slate-300 border-slate-500/40',

  // Track B: External Clients & Partners
  landlord: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40',
  tenant: 'bg-teal-500/20 text-teal-400 border-teal-500/40',
  buyer: 'bg-amber-500/20 text-amber-400 border-amber-500/40',
  seller: 'bg-orange-500/20 text-orange-400 border-orange-500/40',
  external_agent: 'bg-sky-500/20 text-sky-400 border-sky-500/40',
  external_company: 'bg-violet-500/20 text-violet-400 border-violet-500/40',

  // Legacy mappings
  admin: 'bg-red-500/20 text-red-400 border-red-500/40',
  agent: 'bg-blue-500/20 text-blue-400 border-blue-500/40',
  intern: 'bg-slate-500/20 text-slate-400 border-slate-500/40',
  offplan_buyer: 'bg-amber-500/20 text-amber-400 border-amber-500/40',
  developer: 'bg-violet-500/20 text-violet-400 border-violet-500/40',
  conveyancer: 'bg-purple-500/20 text-purple-400 border-purple-500/40',
  contractor: 'bg-zinc-500/20 text-zinc-400 border-zinc-500/40',
  guest: 'bg-slate-600/20 text-slate-400 border-slate-600/40',
};

export const ROLE_DEFAULT_DEPARTMENTS: Record<UserRole, string> = {
  managing_director: 'Corporate Executive Governance',
  director: 'Executive Operations & Planning',
  manager: 'Core Sales & Leasing Division',
  supervisor: 'Operations Supervision & QA',
  team_leader: 'Lead Generation & Sales Pod',
  employee: 'Frontline Brokerage & Client Services',

  landlord: 'Asset Management & Yields',
  tenant: 'Residential Leasing & Tenancy',
  buyer: 'VIP Investment Acquisition',
  seller: 'Prime Property Mandates',
  external_agent: 'Broker Alliance & Co-Broking',
  external_company: 'Developer Escrow & Projects',

  admin: 'Corporate Executive Governance',
  agent: 'Frontline Brokerage & Client Services',
  intern: 'Broker Training Academy',
  offplan_buyer: 'Strategic Off-Plan Allocations',
  developer: 'Strategic Off-Plan Allocations',
  conveyancer: 'Legal Statutory Compliance',
  contractor: 'Master Inventory Portfolio',
  guest: 'VIP Client Hospitality',
};

export const ROLE_DEFAULT_PERMISSIONS: Record<UserRole, string[]> = {
  managing_director: ['*'],
  admin: ['*'],
  director: [
    'can_approve_deals',
    'can_view_department_ledger',
    'can_manage_team',
    'can_create_contracts',
    'can_override_sla',
    'can_manage_budgets',
  ],
  manager: [
    'can_approve_deals',
    'can_view_department_ledger',
    'can_manage_team',
    'can_create_contracts',
    'can_override_sla',
  ],
  supervisor: [
    'can_assign_leads',
    'can_override_sla',
    'can_approve_intern_deals',
    'can_create_contracts',
  ],
  team_leader: [
    'can_read_assigned_leads',
    'can_create_contracts',
    'can_view_properties',
    'can_assign_leads',
  ],
  employee: [
    'can_read_assigned_leads',
    'can_create_contracts',
    'can_view_properties',
    'can_use_calculators',
  ],

  landlord: ['can_view_my_yields', 'can_view_my_statements', 'can_approve_maintenance_quotes'],
  tenant: ['can_view_my_ejari', 'can_create_maintenance_ticket', 'can_view_properties'],
  buyer: ['can_view_properties', 'can_schedule_viewings', 'can_sign_form_b', 'can_use_calculators'],
  seller: ['can_view_marketing_metrics', 'can_sign_form_a', 'can_view_offers'],
  external_agent: ['can_view_co_broker_listings', 'can_submit_offers', 'can_sign_form_i'],
  external_company: ['can_manage_bulk_allocations', 'can_issue_developer_noc', 'can_view_escrow_records'],

  agent: ['can_read_assigned_leads', 'can_create_contracts', 'can_view_properties', 'can_use_calculators'],
  intern: ['can_read_assigned_leads', 'can_view_properties', 'can_use_calculators'],
  offplan_buyer: ['can_track_construction', 'can_view_payment_schedule', 'can_view_properties'],
  developer: ['can_manage_inventory', 'can_issue_developer_noc', 'can_view_rebate_claims'],
  conveyancer: ['can_upload_title_deeds', 'can_verify_trustee_cheques', 'can_execute_transfers'],
  contractor: ['can_claim_service_tickets', 'can_upload_repair_photos', 'can_submit_invoices'],
  guest: ['can_view_properties', 'can_use_calculators'],
};
