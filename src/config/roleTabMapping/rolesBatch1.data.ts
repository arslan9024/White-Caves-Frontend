import { RoleTabMapping } from './roleTabMapping.types';

export const rolesBatch1: Partial<RoleTabMapping> = {
  lion: {
    label: 'Super User (Owner)',
    tabs: [
      { id: 'overview', label: 'Overview', icon: '📊' },
      { id: 'properties', label: 'Properties', icon: '🏙️' },
      { id: 'agents', label: 'Agents', icon: '👥' },
      { id: 'leads', label: 'Leads', icon: '📱' },
      { id: 'contracts', label: 'Contracts', icon: '📋' },
      { id: 'analytics', label: 'Analytics', icon: '📈' },
      { id: 'admin', label: 'Admin', icon: '🛡️' },
      { id: 'users', label: 'Users', icon: '🫂' },
      { id: 'ai-hub', label: 'AI Hub', icon: '✨' },
      { id: 'ai-command', label: 'AI Command', icon: '⚡' },
      { id: 'leaderboard', label: 'Leaderboard', icon: '🏆' },
      { id: 'settings', label: 'Settings', icon: '⚙️' },
    ],
    description: 'Full platform access',
  },
  owner: {
    label: 'Owner',
    tabs: [
      { id: 'overview', label: 'Overview', icon: '📊' },
      { id: 'properties', label: 'Properties', icon: '🏙️' },
      { id: 'agents', label: 'Agents', icon: '👥' },
      { id: 'leads', label: 'Leads', icon: '📱' },
      { id: 'contracts', label: 'Contracts', icon: '📋' },
      { id: 'analytics', label: 'Analytics', icon: '📈' },
      { id: 'users', label: 'Users', icon: '🫂' },
      { id: 'ai-hub', label: 'AI Hub', icon: '✨' },
      { id: 'leaderboard', label: 'Leaderboard', icon: '🏆' },
      { id: 'settings', label: 'Settings', icon: '⚙️' },
    ],
    description: 'Full platform access',
  },

  // ─── Executive & Admin Roles ──────────────────────────────────────────
  managing_director: {
    label: 'Managing Director',
    tabs: [
      { id: 'overview', label: 'Overview', icon: '📊' },
      { id: 'properties', label: 'Properties', icon: '🏙️', badge: 6 },
      { id: 'agents', label: 'Agents', icon: '👥', badge: 5 },
      { id: 'leads', label: 'Leads', icon: '📱', badge: 6 },
      { id: 'contracts', label: 'Contracts', icon: '📋', badge: 8 },
      { id: 'analytics', label: 'Analytics', icon: '📈' },
      { id: 'commissions', label: 'Commissions', icon: '💎', badge: 3 },
      { id: 'users', label: 'Users', icon: '🫂' },
      { id: 'ai-hub', label: 'AI Hub', icon: '✨' },
      { id: 'ai-command', label: 'AI Command', icon: '🤖' },
      { id: 'leaderboard', label: 'Leaderboard', icon: '🏆' },
      { id: 'settings', label: 'Settings', icon: '⚙️' },
    ],
    description: 'Full executive access with AI modules',
  },
  real_estate_company: {
    label: 'Company Admin',
    tabs: [
      { id: 'overview', label: 'Overview', icon: '📊' },
      { id: 'properties', label: 'Properties', icon: '🏙️' },
      { id: 'agents', label: 'Agents', icon: '👥' },
      { id: 'leads', label: 'Leads', icon: '📱' },
      { id: 'analytics', label: 'Analytics', icon: '📈' },
      { id: 'settings', label: 'Settings', icon: '⚙️' },
    ],
    description: 'Company-wide oversight',
  },
  property_mgmt_company: {
    label: 'Property Management Co.',
    tabs: [
      { id: 'overview', label: 'Overview', icon: '📊' },
      { id: 'properties', label: 'Properties', icon: '🏙️' },
      { id: 'contracts', label: 'Contracts', icon: '📋' },
      { id: 'analytics', label: 'Analytics', icon: '📈' },
      { id: 'settings', label: 'Settings', icon: '⚙️' },
    ],
    description: 'Property portfolio management',
  },
  super_admin: {
    label: 'Super Admin',
    tabs: [
      { id: 'overview', label: 'Overview', icon: '📊' },
      { id: 'admin', label: 'Admin', icon: '🛡️' },
      { id: 'users', label: 'Users', icon: '🫂' },
      { id: 'settings', label: 'Settings', icon: '⚙️' },
    ],
    description: 'System administration',
  },

  // ─── Management Roles ─────────────────────────────────────────────────
  branch_manager: {
    label: 'Branch Manager',
    tabs: [
      { id: 'overview', label: 'Overview', icon: '📊' },
      { id: 'agents', label: 'Agents', icon: '👥' },
      { id: 'properties', label: 'Properties', icon: '🏙️' },
      { id: 'leads', label: 'Leads', icon: '📱' },
      { id: 'analytics', label: 'Analytics', icon: '📈' },
    ],
    description: 'Branch operations & team management',
  },
  sales_manager: {
    label: 'Sales Manager',
    tabs: [
      { id: 'overview', label: 'Overview', icon: '📊' },
      { id: 'agents', label: 'Sales Team', icon: '👥' },
      { id: 'leads', label: 'Leads', icon: '📱' },
      { id: 'properties', label: 'Properties', icon: '🏙️' },
      { id: 'analytics', label: 'Analytics', icon: '📈' },
      { id: 'leaderboard', label: 'Leaderboard', icon: '🏆' },
    ],
    description: 'Sales team & target management',
  },
  leasing_manager: {
    label: 'Leasing Manager',
    tabs: [
      { id: 'overview', label: 'Overview', icon: '📊' },
      { id: 'properties', label: 'Rental Units', icon: '🏙️' },
      { id: 'contracts', label: 'Tenancy Contracts', icon: '📋' },
      { id: 'leads', label: 'Inquiries', icon: '📱' },
      { id: 'analytics', label: 'Analytics', icon: '📈' },
      { id: 'leaderboard', label: 'Leaderboard', icon: '🏆' },
    ],
    description: 'Rental portfolio & tenancy management',
  },
  marketing_manager: {
    label: 'Marketing Manager',
    tabs: [
      { id: 'overview', label: 'Overview', icon: '📊' },
      { id: 'properties', label: 'Listings', icon: '🏙️' },
      { id: 'analytics', label: 'Campaign Analytics', icon: '📈' },
    ],
    description: 'Marketing campaigns & listing visibility',
  },

  // ─── Agent Roles ──────────────────────────────────────────────────────
  sales_agent: {
    label: 'Sales Agent',
    tabs: [
      { id: 'overview', label: 'Dashboard', icon: '📊' },
      { id: 'leads', label: 'My Leads', icon: '📱' },
      { id: 'properties', label: 'Properties', icon: '🏙️' },
      { id: 'contracts', label: 'Contracts', icon: '📋' },
      { id: 'leaderboard', label: 'Leaderboard', icon: '🏆' },
    ],
    description: 'Sales pipeline & client management',
  },
  leasing_agent: {
    label: 'Leasing Agent',
    tabs: [
      { id: 'overview', label: 'Dashboard', icon: '📊' },
      { id: 'properties', label: 'Available Units', icon: '🏙️' },
      { id: 'leads', label: 'Inquiries', icon: '📱' },
      { id: 'contracts', label: 'Contracts', icon: '📋' },
    ],
    description: 'Rental listings & tenant placement',
  },
  property_manager: {
    label: 'Property Manager',
    tabs: [
      { id: 'overview', label: 'Dashboard', icon: '📊' },
      { id: 'properties', label: 'Properties', icon: '🏙️' },
      { id: 'contracts', label: 'Contracts', icon: '📋' },
    ],
    description: 'Day-to-day property operations',
  },
  affiliated_agent: {
    label: 'Affiliated Agent',
    tabs: [
      { id: 'overview', label: 'Dashboard', icon: '📊' },
      { id: 'leads', label: 'My Leads', icon: '📱' },
      { id: 'properties', label: 'Properties', icon: '🏙️' },
    ],
    description: 'Independent agent portal',
  },

  // ─── Specialist Roles ─────────────────────────────────────────────────
  property_consultant: {
    label: 'Real Estate Consultant',
    tabs: [
      { id: 'overview', label: 'Dashboard', icon: '📊' },
      { id: 'properties', label: 'Properties', icon: '🏙️' },
      { id: 'analytics', label: 'Market Data', icon: '📈' },
    ],
    description: 'Market advisory & investment consulting',
  },
};

