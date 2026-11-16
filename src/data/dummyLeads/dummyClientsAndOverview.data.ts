// ============== CLIENTS ==============
export const DUMMY_CLIENTS = [
  {
    id: 1,
    name: 'Samir Abdullah Holdings',
    email: 'samir.holding@example.com',
    phone: '+971506123456',
    type: 'Corporate',
    status: 'active',
    total_value: 8500000,
    last_contact: '2026-03-05',
    agent_id: 1,
    agent_name: 'Ahmed Hassan',
    properties_owned: 3,
    deals_count: 5,
    avatar_color: '#FF6B6B'
  },
  {
    id: 2,
    name: 'Zainab Al-Ahmed',
    email: 'zainab.ahmed@example.com',
    phone: '+971507234567',
    type: 'Individual',
    status: 'active',
    total_value: 4200000,
    last_contact: '2026-03-04',
    agent_id: 2,
    agent_name: 'Fatima Al-Mansoori',
    properties_owned: 1,
    deals_count: 2,
    avatar_color: '#4ECDC4'
  },
  {
    id: 3,
    name: 'Hassan Al-Marri Investments',
    email: 'hassan.marri@example.com',
    phone: '+971508345678',
    type: 'Investment Firm',
    status: 'active',
    total_value: 12000000,
    last_contact: '2026-03-06',
    agent_id: 3,
    agent_name: 'Mohammed Al-Mazrouei',
    properties_owned: 8,
    deals_count: 12,
    avatar_color: '#FFD93D'
  },
  {
    id: 4,
    name: 'Maryem Al-Dhaheri',
    email: 'maryem.dhaheri@example.com',
    phone: '+971509456789',
    type: 'Individual',
    status: 'active',
    total_value: 3500000,
    last_contact: '2026-03-07',
    agent_id: 4,
    agent_name: 'Leila Al-Falasiri',
    properties_owned: 2,
    deals_count: 3,
    avatar_color: '#6BCB77'
  },
  {
    id: 5,
    name: 'Al-Qasimi Real Estate Group',
    email: 'alqasimi@example.com',
    phone: '+971501567890',
    type: 'Developer',
    status: 'inactive',
    total_value: 15000000,
    last_contact: '2026-02-20',
    agent_id: 5,
    agent_name: 'Rashid Al-Ketbi',
    properties_owned: 15,
    deals_count: 25,
    avatar_color: '#F38181'
  },
  {
    id: 6,
    name: 'Noor Al-Dhaheri Consulting',
    email: 'noor.consulting@example.com',
    phone: '+971502567890',
    type: 'Corporate',
    status: 'active',
    total_value: 6800000,
    last_contact: '2026-03-03',
    agent_id: 1,
    agent_name: 'Ahmed Hassan',
    properties_owned: 4,
    deals_count: 8,
    avatar_color: '#AA96DA'
  },
  {
    id: 7,
    name: 'Hana Al-Kaabi Family Trust',
    email: 'hana.trust@example.com',
    phone: '+971503567890',
    type: 'Trust/Estate',
    status: 'active',
    total_value: 9200000,
    last_contact: '2026-03-05',
    agent_id: 2,
    agent_name: 'Fatima Al-Mansoori',
    properties_owned: 5,
    deals_count: 6,
    avatar_color: '#FCBAD3'
  },
  {
    id: 8,
    name: 'Samir Al-Jabri Enterprises',
    email: 'samir.ent@example.com',
    phone: '+971504567890',
    type: 'Corporate',
    status: 'active',
    total_value: 7100000,
    last_contact: '2026-03-01',
    agent_id: 3,
    agent_name: 'Mohammed Al-Mazrouei',
    properties_owned: 3,
    deals_count: 4,
    avatar_color: '#A0D995'
  },
  {
    id: 9,
    name: 'Layla Al-Mansouri',
    email: 'layla.mansouri@example.com',
    phone: '+971505567890',
    type: 'Individual',
    status: 'lead',
    total_value: 0,
    last_contact: '2026-03-07',
    agent_id: 4,
    agent_name: 'Leila Al-Falasiri',
    properties_owned: 0,
    deals_count: 0,
    avatar_color: '#FFB6C1'
  },
  {
    id: 10,
    name: 'Premier Investment Group',
    email: 'premier@example.com',
    phone: '+971506567890',
    type: 'Investment Firm',
    status: 'active',
    total_value: 18500000,
    last_contact: '2026-03-06',
    agent_id: 5,
    agent_name: 'Rashid Al-Ketbi',
    properties_owned: 12,
    deals_count: 18,
    avatar_color: '#DDA0DD'
  }
];

// ============== OVERVIEW DASHBOARD DATA ==============
export const DUMMY_OVERVIEW_DATA = {
  metrics: {
    totalLeads: 245,
    hotLeads: 23,
    warmLeads: 67,
    coldLeads: 155,
    agentsOnline: 7,
    agentsTotal: 15,
    conversionsThisMonth: 12,
    revenuethisMonth: 2850000,
    activeClients: 10,
    activeDeals: 45,
    pendingPayments: 3
  },
  topAgents: DUMMY_AGENTS.slice(0, 5),
  hotLeads: DUMMY_HOT_LEADS.slice(0, 5),
  recentActivity: DUMMY_ACTIVITIES,
  performance: {
    thisMonth: {
      deals_closed: 12,
      revenue: 2850000,
      new_clients: 3,
      conversion_rate: 14.2
    },
    lastMonth: {
      deals_closed: 10,
      revenue: 2100000,
      new_clients: 2,
      conversion_rate: 12.1
    }
  }
};

// ============== EXPORT SUMMARY ==============
export const DUMMY_DATA_SUMMARY = {
  agents: DUMMY_AGENTS.length,
  hotLeads: DUMMY_HOT_LEADS.length,
  clients: DUMMY_CLIENTS.length,
  activities: DUMMY_ACTIVITIES.length,
  totalLeads: DUMMY_ALL_LEADS.length
};

