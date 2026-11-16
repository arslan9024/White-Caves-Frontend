// @ts-nocheck
export const DEPARTMENTS_CONFIG = {
  communications: {
    id: 'communications',
    name: 'Communications',
    description: 'Customer messaging, WhatsApp operations, and chatbot management',
    director: 'dir-1',
    assistants: ['linda', 'nina'],
    color: '#25D366',
    icon: 'MessageSquare',
    kpis: {
      activeConversations: 156,
      responseTime: '2.3 min',
      satisfactionScore: 94,
      leadsGenerated: 47
    }
  },
  operations: {
    id: 'operations',
    name: 'Operations',
    description: 'Inventory management, maintenance, and facility coordination',
    director: 'dir-2',
    assistants: ['mary', 'sentinel', 'vesta', 'juno'],
    color: '#3B82F6',
    icon: 'Building2',
    kpis: {
      propertiesManaged: 9378,
      maintenanceRequests: 23,
      occupancyRate: 87,
      handoversThisMonth: 12
    }
  },
  sales: {
    id: 'sales',
    name: 'Sales',
    description: 'Property sales, lead management, and deal pipeline',
    director: 'dir-3',
    assistants: ['sophia', 'clara', 'hunter', 'kairos'],
    color: '#8B5CF6',
    icon: 'TrendingUp',
    kpis: {
      activeDeals: 30,
      pipelineValue: 79800000,
      conversionRate: 68,
      monthlyTarget: 70
    }
  },
  finance: {
    id: 'finance',
    name: 'Finance',
    description: 'Payment processing, invoicing, and investment advisory',
    director: 'dir-4',
    assistants: ['theodora', 'maven'],
    color: '#F59E0B',
    icon: 'Wallet',
    kpis: {
      monthlyRevenue: 35000000,
      pendingInvoices: 12,
      collectionsRate: 94,
      portfolioValue: 425000000
    }
  },
  marketing: {
    id: 'marketing',
    name: 'Marketing',
    description: 'Property marketing, campaigns, and portal publishing',
    director: 'dir-5',
    assistants: ['olivia'],
    color: '#EC4899',
    icon: 'Megaphone',
    kpis: {
      activeCampaigns: 8,
      featuredListings: 10,
      portalViews: 125000,
      socialEngagement: 45
    }
  },
  executive: {
    id: 'executive',
    name: 'Executive',
    description: 'Strategic leadership and company-wide decision making',
    director: null,
    assistants: ['zoe'],
    color: '#10B981',
    icon: 'Briefcase',
    kpis: {
      pendingSuggestions: 8,
      meetingsToday: 8,
      tasksUrgent: 4,
      aiAssistantsOnline: 24
    }
  },
  compliance: {
    id: 'compliance',
    name: 'Compliance',
    description: 'KYC verification, AML monitoring, and RERA compliance',
    director: 'dir-6',
    assistants: ['laila'],
    color: '#6366F1',
    icon: 'Shield',
    kpis: {
      kycProfiles: 89,
      pendingReviews: 12,
      amlAlerts: 3,
      complianceScore: 98
    }
  },
  technology: {
    id: 'technology',
    name: 'Technology',
    description: 'Platform development, AI systems, and infrastructure',
    director: 'dir-7',
    assistants: ['aurora', 'hazel', 'willow', 'henry'],
    color: '#0EA5E9',
    icon: 'Server',
    kpis: {
      systemUptime: 99.97,
      deploymentsThisWeek: 5,
      apiRequests: 125000,
      errorRate: 0.02
    }
  },
  intelligence: {
    id: 'intelligence',
    name: 'Intelligence',
    description: 'Market research, analytics, and off-plan tracking',
    director: 'dir-8',
    assistants: ['cipher', 'atlas'],
    color: '#0D9488',
    icon: 'Brain',
    kpis: {
      marketReports: 15,
      offPlanProjects: 42,
      priceAlerts: 7,
      forecastAccuracy: 87
    }
  },
  legal: {
    id: 'legal',
    name: 'Legal',
    description: 'Contract management, legal reviews, and dispute resolution',
    director: 'dir-9',
    assistants: ['evangeline'],
    color: '#EF4444',
    icon: 'Scale',
    kpis: {
      activeContracts: 156,
      pendingReviews: 8,
      disputesOpen: 2,
      avgReviewTime: '2.5 days'
    }
  }
};

