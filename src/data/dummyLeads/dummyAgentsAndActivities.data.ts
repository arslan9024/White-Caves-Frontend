// ============== AGENTS ==============
export const DUMMY_AGENTS = [
  {
    id: 1,
    name: 'Ahmed Hassan',
    avatar: 'AH',
    email: 'ahmed.hassan@whitecaves.ae',
    phone: '+971501234567',
    department: 'Sales',
    status: 'online',
    sales: 15,
    roi: 98,
    performance: 'Excellent',
    rating: 4.8,
    leads_assigned: 12,
    deals_closed: 5,
    avatar_color: '#FF6B6B'
  },
  {
    id: 2,
    name: 'Fatima Al-Mansoori',
    avatar: 'FM',
    email: 'fatima.mansoori@whitecaves.ae',
    phone: '+971502345678',
    department: 'Sales',
    status: 'online',
    sales: 13,
    roi: 95,
    performance: 'Excellent',
    rating: 4.7,
    leads_assigned: 10,
    deals_closed: 4,
    avatar_color: '#4ECDC4'
  },
  {
    id: 3,
    name: 'Mohammed Al-Mazrouei',
    avatar: 'MM',
    email: 'mohammed.mazrouei@whitecaves.ae',
    phone: '+971503456789',
    department: 'Operations',
    status: 'online',
    sales: 11,
    roi: 92,
    performance: 'Very Good',
    rating: 4.6,
    leads_assigned: 8,
    deals_closed: 3,
    avatar_color: '#FFD93D'
  },
  {
    id: 4,
    name: 'Leila Al-Falasiri',
    avatar: 'LF',
    email: 'leila.falasiri@whitecaves.ae',
    phone: '+971504567890',
    department: 'Sales',
    status: 'away',
    sales: 10,
    roi: 88,
    performance: 'Very Good',
    rating: 4.5,
    leads_assigned: 9,
    deals_closed: 3,
    avatar_color: '#6BCB77'
  },
  {
    id: 5,
    name: 'Rashid Al-Ketbi',
    avatar: 'RK',
    email: 'rashid.ketbi@whitecaves.ae',
    phone: '+971505678901',
    department: 'Marketing',
    status: 'online',
    sales: 9,
    roi: 85,
    performance: 'Good',
    rating: 4.4,
    leads_assigned: 7,
    deals_closed: 2,
    avatar_color: '#F38181'
  },
  {
    id: 6,
    name: 'Noor Al-Dhaheri',
    avatar: 'ND',
    email: 'noor.dhaheri@whitecaves.ae',
    phone: '+971506789012',
    department: 'Sales',
    status: 'offline',
    sales: 8,
    roi: 82,
    performance: 'Good',
    rating: 4.3,
    leads_assigned: 6,
    deals_closed: 2,
    avatar_color: '#AA96DA'
  },
  {
    id: 7,
    name: 'Hana Al-Kaabi',
    avatar: 'HK',
    email: 'hana.kaabi@whitecaves.ae',
    phone: '+971507890123',
    department: 'Operations',
    status: 'online',
    sales: 7,
    roi: 78,
    performance: 'Good',
    rating: 4.2,
    leads_assigned: 5,
    deals_closed: 2,
    avatar_color: '#FCBAD3'
  },
  {
    id: 8,
    name: 'Samir Al-Jabri',
    avatar: 'SJ',
    email: 'samir.jabri@whitecaves.ae',
    phone: '+971508901234',
    department: 'Sales',
    status: 'online',
    sales: 6,
    roi: 75,
    performance: 'Average',
    rating: 4.0,
    leads_assigned: 4,
    deals_closed: 1,
    avatar_color: '#A0D995'
  }
];

// ============== RECENT ACTIVITIES ==============
export const DUMMY_ACTIVITIES = [
  {
    id: 1,
    timestamp: '2026-03-07 10:30',
    action: 'Deal closed',
    description: 'Hassan Al-Marri closed a deal worth AED 3.2M',
    user: 'Mohammed Al-Mazrouei',
    type: 'deal_closed',
    icon: '✅'
  },
  {
    id: 2,
    timestamp: '2026-03-07 09:15',
    action: 'New hot lead created',
    description: 'Faisal Al-Mansoori added to hot leads',
    user: 'Leila Al-Falasiri',
    type: 'lead_created',
    icon: '🔥'
  },
  {
    id: 4,
    timestamp: '2026-03-06 17:20',
    action: 'Lead stage updated',
    description: 'Samir Abdullah moved to negotiation stage',
    user: 'Ahmed Hassan',
    type: 'stage_change',
    icon: '📈'
  },
  {
    id: 5,
    timestamp: '2026-03-06 14:00',
    action: 'New client registered',
    description: 'Premier Investment Group registered as new client',
    user: 'Rashid Al-Ketbi',
    type: 'client_created',
    icon: '👤'
  },
  {
    id: 6,
    timestamp: '2026-03-05 11:30',
    action: 'Deal cancelled',
    description: 'Layla Al-Mansouri requested cancellation',
    user: 'System',
    type: 'deal_cancelled',
    icon: '❌'
  },
  {
    id: 7,
    timestamp: '2026-03-05 09:00',
    action: 'Property listed',
    description: 'New luxury villa added to inventory',
    user: 'Mohammed Al-Mazrouei',
    type: 'property_added',
    icon: '🏠'
  },
  {
    id: 9,
    timestamp: '2026-03-04 13:20',
    action: 'New agent onboarded',
    description: 'Samir Al-Jabri joined the sales team',
    user: 'System',
    type: 'agent_added',
    icon: '👥'
  },
  {
    id: 10,
    timestamp: '2026-03-03 10:00',
    action: 'Performance alert',
    description: 'Ahmed Hassan achieved top performer status',
    user: 'System',
    type: 'alert',
    icon: '⭐'
  }
];

