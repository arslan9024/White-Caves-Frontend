// @ts-nocheck
const CRM_NAV_TREE = [
  {
    id: 'executive',
    label: 'Executive Overview',
    icon: 'Crown',
    expanded: true,
    items: [
      { id: 'md-dashboard', label: 'MD Dashboard', icon: 'LayoutDashboard' },
      { id: 'strategic-kpis', label: 'Strategic KPIs', icon: 'TrendingUp' },
      { id: 'announcements', label: 'Announcements', icon: 'Megaphone' },
      { id: 'company-overview', label: 'Company Overview', icon: 'Building' },
    ]
  },
  {
    id: 'operations',
    label: 'Operations & Organization',
    icon: 'Settings2',
    expanded: false,
    badge: '113',
    items: [
      { id: 'departments', label: 'Departments', icon: 'Building2', badge: '10' },
      { id: 'employees', label: 'Employees', icon: 'Users', badge: '103' },
      { id: 'teams', label: 'Team Structure', icon: 'Network' },
      { id: 'scheduling', label: 'Scheduling', icon: 'Calendar' },
      { id: 'onboarding', label: 'Onboarding', icon: 'UserPlus' },
    ]
  },
  {
    id: 'sales',
    label: 'Sales & Pipeline',
    icon: 'Target',
    expanded: false,
    items: [
      { id: 'leads', label: 'Leads', icon: 'UserSearch' },
      { id: 'deals', label: 'Deals', icon: 'Handshake' },
      { id: 'client-journey', label: 'Client Journey', icon: 'Route' },
      { id: 'contracts', label: 'Contracts', icon: 'FileSignature' },
      { id: 'negotiations', label: 'Negotiations', icon: 'MessageSquare' },
    ]
  },
  {
    id: 'properties',
    label: 'Properties & Inventory',
    icon: 'Home',
    expanded: false,
    items: [
      { id: 'portfolio', label: 'Portfolio', icon: 'Grid3x3' },
      { id: 'listings', label: 'Active Listings', icon: 'ListPlus' },
      { id: 'transactions', label: 'Transactions', icon: 'Receipt', badge: '5.5K' },
      { id: 'add-listing', label: 'Add New Listing', icon: 'PlusCircle' },
      { id: 'developer-pipeline', label: 'Developer Pipeline', icon: 'Workflow' },
      { id: 'media-gallery', label: 'Media Gallery', icon: 'Image' },
      { id: 'virtual-tours', label: 'Virtual Tours', icon: 'Video' },
    ]
  },
  {
    id: 'services',
    label: 'Services & Fulfillment',
    icon: 'Briefcase',
    expanded: false,
    badge: '40',
    items: [
      { id: 'service-catalog', label: 'Service Catalog', icon: 'Book', badge: '40' },
      { id: 'service-tracker', label: 'Service Tracker', icon: 'ClipboardCheck' },
      { id: 'owner-tools', label: 'Owner Tools', icon: 'Wrench' },
      { id: 'vendor-management', label: 'Vendor Management', icon: 'Truck' },
    ]
  },
  {
    id: 'leasing',
    label: 'Leasing & Tenancy',
    icon: 'Key',
    expanded: false,
    items: [
      { id: 'ejari-system', label: 'Ejari System', icon: 'FileCheck' },
      { id: 'tenancy-lifecycle', label: 'Tenancy Lifecycle', icon: 'RefreshCw' },
      { id: 'renewals', label: 'Renewals', icon: 'CalendarClock' },
      { id: 'landlord-portal', label: 'Landlord Portal', icon: 'Building2' },
      { id: 'tenant-management', label: 'Tenant Management', icon: 'Users2' },
    ]
  },
  {
    id: 'marketing',
    label: 'Marketing & Communications',
    icon: 'Megaphone',
    expanded: false,
    items: [
      { id: 'campaigns', label: 'Campaigns', icon: 'Rocket' },
      { id: 'whatsapp-center', label: 'WhatsApp Center', icon: 'MessageCircle' },
      { id: 'content-calendar', label: 'Content Calendar', icon: 'CalendarDays' },
      { id: 'website-assets', label: 'Website Assets', icon: 'Globe' },
      { id: 'email-templates', label: 'Email Templates', icon: 'Mail' },
    ]
  },
  {
    id: 'finance',
    label: 'Finance & Payments',
    icon: 'Wallet',
    expanded: false,
    items: [
      { id: 'payments', label: 'Payments', icon: 'CreditCard' },
      { id: 'invoices', label: 'Invoices', icon: 'Receipt' },
      { id: 'commissions', label: 'Commissions', icon: 'Percent' },
      { id: 'reports', label: 'Financial Reports', icon: 'PieChart' },
    ]
  },
  {
    id: 'compliance',
    label: 'Compliance & Legal',
    icon: 'Shield',
    expanded: false,
    items: [
      { id: 'rera-audits', label: 'RERA Audits', icon: 'CheckCircle' },
      { id: 'document-vault', label: 'Document Vault', icon: 'Lock' },
      { id: 'kyc-aml', label: 'KYC/AML', icon: 'UserCheck' },
      { id: 'audit-log', label: 'Audit Log', icon: 'History' },
    ]
  },
  {
    id: 'analytics',
    label: 'Analytics & Intelligence',
    icon: 'BarChart3',
    expanded: false,
    items: [
      { id: 'market-dashboard', label: 'Market Dashboard', icon: 'TrendingUp' },
      { id: 'performance-reports', label: 'Performance Reports', icon: 'FileBarChart' },
      { id: 'forecasting', label: 'Forecasting', icon: 'LineChart' },
      { id: 'agent-performance', label: 'Agent Performance', icon: 'Award' },
    ]
  },
  {
    id: 'admin',
    label: 'Administration',
    icon: 'Settings',
    expanded: false,
    items: [
      { id: 'settings', label: 'Settings', icon: 'Settings' },
      { id: 'integrations', label: 'Integrations', icon: 'Plug' },
      { id: 'knowledge-base', label: 'Knowledge Base', icon: 'BookOpen' },
      { id: 'system-health', label: 'System Health', icon: 'Activity' },
    ]
  },
];

const CRM_OBJECT_CATEGORIES = {
  dashboard: { id: 'dashboard', label: 'Dashboard', type: 'view' },
  departments: { id: 'departments', label: 'Departments', type: 'object', count: 10 },
  employees: { id: 'employees', label: 'Employees', type: 'object', count: 103 },
  services: { id: 'services', label: 'Services', type: 'object', count: 40 },
  assistants: { id: 'assistants', label: 'AI Assistants', type: 'object', count: 38 },
  properties: { id: 'properties', label: 'Properties', type: 'object' },
  leads: { id: 'leads', label: 'Leads', type: 'object' },
  analytics: { id: 'analytics', label: 'Analytics', type: 'view' },
  compliance: { id: 'compliance', label: 'Compliance', type: 'view' },
  settings: { id: 'settings', label: 'Settings', type: 'view' },
};

const AI_ASSISTANTS_REGISTRY = [
  { id: 'zoe', name: 'Zoe', role: 'Executive AI', dept: 'executive', color: '#10B981', status: 'online' },
  { id: 'mary', name: 'Mary', role: 'Inventory Manager', dept: 'operations', color: '#3B82F6', status: 'online' },
  { id: 'clara', name: 'Clara', role: 'Lead Manager', dept: 'sales', color: '#8B5CF6', status: 'online' },
  { id: 'linda', name: 'Linda', role: 'WhatsApp Manager', dept: 'communications', color: '#25D366', status: 'online' },
  { id: 'aurora', name: 'Aurora', role: 'CTO Intelligence', dept: 'technology', color: '#0EA5E9', status: 'online', isTeamLead: true, teamName: 'SDLC Documentation Team' },
  { id: 'theodora', name: 'Theodora', role: 'CFO Intelligence', dept: 'finance', color: '#F59E0B', status: 'online' },
  { id: 'sophia', name: 'Sophia', role: 'Contract Manager', dept: 'legal', color: '#EF4444', status: 'online' },
  { id: 'henry', name: 'Henry', role: 'Compliance Officer', dept: 'compliance', color: '#6366F1', status: 'online' },
  { id: 'daisy', name: 'Daisy', role: 'Property Coordinator', dept: 'operations', color: '#EC4899', status: 'online' },
  { id: 'oliver', name: 'Oliver', role: 'Negotiation AI', dept: 'sales', color: '#14B8A6', status: 'online' },
  { id: 'sage', name: 'Sage', role: 'Market Intelligence', dept: 'intelligence', color: '#84CC16', status: 'online' },
  { id: 'nina', name: 'Nina', role: 'WhatsApp Bot', dept: 'communications', color: '#25D366', status: 'online' },
  { id: 'nancy', name: 'Nancy', role: 'HR Manager', dept: 'hr', color: '#A855F7', status: 'online' },
  { id: 'laila', name: 'Laila', role: 'Arabic Communications', dept: 'communications', color: '#F97316', status: 'online' },
  { id: 'olivia', name: 'Olivia', role: 'Marketing Automation', dept: 'marketing', color: '#06B6D4', status: 'online' },
  { id: 'evangeline', name: 'Evangeline', role: 'Legal AI', dept: 'legal', color: '#EF4444', status: 'online' },
  { id: 'hazel', name: 'Hazel', role: 'Frontend Support', dept: 'technology', color: '#8B5CF6', status: 'online' },
  { id: 'willow', name: 'Willow', role: 'Backend Support', dept: 'technology', color: '#3B82F6', status: 'online' },
  { id: 'sentinel', name: 'Sentinel', role: 'Property Analytics', dept: 'operations', color: '#059669', status: 'online' },
  { id: 'hunter', name: 'Hunter', role: 'Lead Prospecting', dept: 'sales', color: '#EF4444', status: 'online' },
  { id: 'cipher', name: 'Cipher', role: 'Market Analysis', dept: 'intelligence', color: '#4F46E5', status: 'online' },
  { id: 'atlas', name: 'Atlas', role: 'Project Management', dept: 'operations', color: '#0891B2', status: 'online' },
  { id: 'vesta', name: 'Vesta', role: 'Handover Coordinator', dept: 'operations', color: '#D946EF', status: 'online' },
  { id: 'juno', name: 'Juno', role: 'Community Manager', dept: 'communications', color: '#F59E0B', status: 'online' },
  { id: 'kairos', name: 'Kairos', role: 'Luxury Specialist', dept: 'sales', color: '#D4AF37', status: 'online' },
  { id: 'maven', name: 'Maven', role: 'Investment Advisor', dept: 'finance', color: '#10B981', status: 'online' },
  { id: 'chloe', name: 'Chloe', role: 'Client Relations', dept: 'sales', color: '#EC4899', status: 'online' },
  { id: 'iris', name: 'Iris', role: 'Document Processing', dept: 'legal', color: '#8B5CF6', status: 'online' },
  { id: 'phoenix', name: 'Phoenix', role: 'Crisis Management', dept: 'executive', color: '#EF4444', status: 'online' },
  { id: 'echo', name: 'Echo', role: 'Voice Assistant', dept: 'communications', color: '#06B6D4', status: 'online' },
  { id: 'nexus', name: 'Nexus', role: 'Integration Hub', dept: 'technology', color: '#4F46E5', status: 'online' },
  { id: 'aria', name: 'Aria', role: 'Scheduling Assistant', dept: 'operations', color: '#F97316', status: 'online' },
  { id: 'stella', name: 'Stella', role: 'Backend Engineer', dept: 'technology', color: '#6366F1', status: 'online', reportsTo: 'aurora', specialty: 'API & Server Architecture' },
  { id: 'nova', name: 'Nova', role: 'Backend Engineer', dept: 'technology', color: '#8B5CF6', status: 'online', reportsTo: 'aurora', specialty: 'Data Processing & Integration' },
  { id: 'ember', name: 'Ember', role: 'Frontend Engineer', dept: 'technology', color: '#F97316', status: 'online', reportsTo: 'aurora', specialty: 'UI Documentation & Standards' },
  { id: 'marina', name: 'Marina', role: 'DevOps Engineer', dept: 'technology', color: '#0891B2', status: 'online', reportsTo: 'aurora', specialty: 'Deployment & Operations' },
  { id: 'coral', name: 'Coral', role: 'Database Specialist', dept: 'technology', color: '#EC4899', status: 'online', reportsTo: 'aurora', specialty: 'Schema & Data Management' },
  { id: 'celeste', name: 'Celeste', role: 'AI/ML Engineer', dept: 'technology', color: '#10B981', status: 'online', reportsTo: 'aurora', specialty: 'ML Pipeline Documentation' },
];

export { CRM_NAV_TREE, CRM_OBJECT_CATEGORIES, AI_ASSISTANTS_REGISTRY };

