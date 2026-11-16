import { RoleTabMapping } from './roleTabMapping.types';

export const rolesBatch2: Partial<RoleTabMapping> = {
  mortgage_consultant: {
    label: 'Mortgage Consultant',
    tabs: [
      { id: 'overview', label: 'Dashboard', icon: '📊' },
      { id: 'leads', label: 'Clients', icon: '📱' },
      { id: 'analytics', label: 'Rates & Data', icon: '📈' },
    ],
    description: 'Mortgage advisory & financing',
  },
  valuation_expert: {
    label: 'Real Estate Valuer',
    tabs: [
      { id: 'overview', label: 'Dashboard', icon: '📊' },
      { id: 'properties', label: 'Properties', icon: '🏙️' },
      { id: 'analytics', label: 'Valuation Data', icon: '📈' },
    ],
    description: 'Property valuations & appraisals',
  },
  trustee_officer: {
    label: 'Trustee Officer',
    tabs: [
      { id: 'overview', label: 'Dashboard', icon: '📊' },
      { id: 'contracts', label: 'Transfers', icon: '📋' },
    ],
    description: 'Official transfers & verifications',
  },

  // ─── Support Roles ────────────────────────────────────────────────────
  legal_officer: {
    label: 'Legal Officer',
    tabs: [
      { id: 'overview', label: 'Dashboard', icon: '📊' },
      { id: 'contracts', label: 'Contracts & Legal', icon: '📋' },
    ],
    description: 'Contracts, compliance & legal matters',
  },
  finance_officer: {
    label: 'Finance Officer',
    tabs: [
      { id: 'overview', label: 'Dashboard', icon: '📊' },
      { id: 'analytics', label: 'Financial Reports', icon: '📈' },
      { id: 'contracts', label: 'Invoices', icon: '📋' },
    ],
    description: 'Payments, invoices & financial reports',
  },
  document_controller: {
    label: 'Document Controller',
    tabs: [
      { id: 'overview', label: 'Dashboard', icon: '📊' },
      { id: 'contracts', label: 'Documents', icon: '📋' },
    ],
    description: 'Document management & verification',
  },

  // ─── Client Roles ─────────────────────────────────────────────────────
  developer: {
    label: 'Real Estate Developer',
    tabs: [
      { id: 'overview', label: 'Dashboard', icon: '📊' },
      { id: 'properties', label: 'Projects', icon: '🏙️' },
      { id: 'analytics', label: 'Analytics', icon: '📈' },
    ],
    description: 'Off-plan project management',
  },
  investor: {
    label: 'Investor',
    tabs: [
      { id: 'overview', label: 'Dashboard', icon: '📊' },
      { id: 'properties', label: 'Portfolio', icon: '🏙️' },
      { id: 'analytics', label: 'ROI & Analytics', icon: '📈' },
    ],
    description: 'Investment analytics & opportunities',
  },
  buyer: {
    label: 'Buyer',
    tabs: [
      { id: 'overview', label: 'Dashboard', icon: '📊' },
      { id: 'saved-properties', label: 'Saved Properties', icon: 'heart' },
      { id: 'offers', label: 'Offers', icon: 'chat' },
      { id: 'mortgage', label: 'Mortgage', icon: 'bank' },
      { id: 'timeline', label: 'Timeline', icon: 'calendar' },
    ],
    description: 'Property search & purchase tools',
  },
  seller: {
    label: 'Seller',
    tabs: [
      { id: 'overview', label: 'Dashboard', icon: '📊' },
      { id: 'listings', label: 'Listings', icon: '🏙️' },
      { id: 'pricing', label: 'Pricing Tools', icon: 'credit' },
      { id: 'offers', label: 'Offers', icon: 'chat' },
      { id: 'analytics', label: 'Analytics', icon: '📈' },
    ],
    description: 'Property selling tools',
  },
  landlord: {
    label: 'Landlord',
    tabs: [
      { id: 'overview', label: 'Dashboard', icon: '📊' },
      { id: 'properties', label: 'Properties', icon: '🏙️' },
      { id: 'tenants', label: 'Tenants', icon: 'user' },
      { id: 'maintenance', label: 'Maintenance', icon: 'wrench' },
      { id: 'rent-tracking', label: 'Rent Tracking', icon: 'credit' },
    ],
    description: 'Property rental management',
  },
  'leasing-agent': {
    label: 'Leasing Agent',
    tabs: [
      { id: 'overview', label: 'Dashboard', icon: '📊' },
      { id: 'available-units', label: 'Available Units', icon: '🏙️' },
      { id: 'applications', label: 'Applications', icon: 'clipboard' },
      { id: 'screenings', label: 'Screenings', icon: 'search' },
      { id: 'contracts', label: 'Contracts', icon: '📋' },
      { id: 'leaderboard', label: 'Leaderboard', icon: '🏆' },
    ],
    description: 'Rental property management',
  },
  'secondary-sales-agent': {
    label: 'Sales Agent',
    tabs: [
      { id: 'overview', label: 'Dashboard', icon: '📊' },
      { id: 'pipeline', label: 'Sales Pipeline', icon: '📈' },
      { id: 'leads', label: 'Leads', icon: '📱' },
      { id: 'activity', label: 'Activity', icon: '📊' },
      { id: 'leaderboard', label: 'Leaderboard', icon: '🏆' },
    ],
    description: 'Sales property management',
  },
  tenant: {
    label: 'Tenant',
    tabs: [
      { id: 'overview', label: 'Dashboard', icon: '📊' },
      { id: 'lease-info', label: 'Lease Info', icon: '📋' },
      { id: 'maintenance', label: 'Maintenance', icon: 'wrench' },
      { id: 'documents', label: 'Documents', icon: 'folder' },
    ],
    description: 'Tenant portal access',
  },
};

