export const LIFECYCLE_RECOMMENDATIONS: Record<string, { services: Array<Record<string, any>> }> = {
  PROSPECT: {
    services: [
      {
        serviceId: 'PROPERTY_SEARCH',
        name: 'Guided Property Search',
        description: 'AI-powered search matching your budget, preferences, and goals',
        priority: 'HIGH',
        recommendationReason: 'First-time buyer - need guidance to find right property',
        expectedValue: 0,
        upsellChain: 1,
      },
      {
        serviceId: 'CONSULTATION_BUYER',
        name: 'Buyer Consultation',
        description:
          '1-hour consultation on Dubai real estate market, neighborhoods, investment strategy',
        priority: 'MEDIUM',
        recommendationReason: 'New to Dubai market',
        expectedValue: 2000,
        upsellChain: 2,
      },
    ],
  },
  FIRST_TIME_BUYER: {
    services: [
      {
        serviceId: 'DOCUMENTATION',
        name: 'Documentation & Compliance',
        description: 'Complete property paperwork, RERA registration, DLD transfer',
        priority: 'CRITICAL',
        recommendationReason: 'Legally required after purchase',
        expectedValue: 3000,
        upsellChain: 1,
      },
      {
        serviceId: 'PROPERTY_MANAGEMENT',
        name: 'Property Management Service',
        description: 'Tenant screening, rent collection, maintenance - earn 8% monthly',
        priority: 'HIGH',
        recommendationReason: 'Just purchased property - prevent tenant problems',
        expectedValue: 80000,
        expectedRecurring: true,
        recurringValue: 80000,
        conversionProbability: 0.35,
        upsellChain: 2,
      },
      {
        serviceId: 'EJARI_REGISTRATION',
        name: 'Ejari Registration',
        description: 'Mandatory rental contract registration with DEWA',
        priority: 'CRITICAL',
        recommendationReason: 'Required for rental properties',
        expectedValue: 1500,
        upsellChain: 1,
      },
    ],
  },
  PROPERTY_OWNER: {
    services: [
      {
        serviceId: 'PROPERTY_MANAGEMENT_PREMIUM',
        name: 'Premium Property Management',
        description:
          'Full service management including tenant disputes, maintenance coordination, tax optimization',
        priority: 'HIGH',
        recommendationReason: 'Protect investment with professional management',
        expectedValue: 120000,
        expectedRecurring: true,
        recurringValue: 120000,
        conversionProbability: 0.4,
        upsellChain: 2,
      },
      {
        serviceId: 'PROPERTY_VALUATION',
        name: 'Annual Property Valuation',
        description: 'Professional valuation for tax, insurance, refinancing purposes',
        priority: 'MEDIUM',
        recommendationReason: 'Track property appreciation, tax planning',
        expectedValue: 2500,
        upsellChain: 2,
      },
      {
        serviceId: 'RENT_OPTIMIZATION',
        name: 'Rental Optimization Service',
        description: 'Market analysis to maximize rent - typically increase 10-15% annually',
        priority: 'HIGH',
        recommendationReason: 'Increase revenue from existing property',
        expectedValue: 1000,
        expectedRecurring: true,
        recurringValue: 0,
        conversionProbability: 0.5,
        upsellChain: 1,
      },
    ],
  },
  MULTI_PROPERTY_OWNER: {
    services: [
      {
        serviceId: 'PORTFOLIO_MANAGEMENT',
        name: 'Portfolio Management Service',
        description:
          'Centralized management of multiple properties, tax optimization, strategic planning',
        priority: 'CRITICAL',
        recommendationReason: 'Simplified management of multiple investments',
        expectedValue: 300000,
        expectedRecurring: true,
        recurringValue: 300000,
        conversionProbability: 0.6,
        upsellChain: 2,
      },
      {
        serviceId: 'INVESTMENT_ADVISORY',
        name: 'Investment Advisory Service',
        description:
          'Strategic advice on next acquisitions, sell/hold decisions, portfolio diversification',
        priority: 'HIGH',
        recommendationReason: 'Scale portfolio to next level',
        expectedValue: 50000,
        expectedRecurring: true,
        recurringValue: 15000,
        conversionProbability: 0.55,
        upsellChain: 1,
      },
      {
        serviceId: 'TAX_OPTIMIZATION',
        name: 'Tax Optimization for Investors',
        description: 'Minimize tax liability across multiple properties through legal structures',
        priority: 'MEDIUM',
        recommendationReason: 'Optimize returns from portfolio',
        expectedValue: 10000,
        expectedRecurring: true,
        recurringValue: 5000,
        conversionProbability: 0.4,
        upsellChain: 1,
      },
    ],
  },
  INSTITUTIONAL_INVESTOR: {
    services: [
      {
        serviceId: 'CORPORATE_PORTFOLIO_MANAGEMENT',
        name: 'Corporate Portfolio Management',
        description:
          'Enterprise-level management with dedicated team, monthly reporting, strategic planning',
        priority: 'CRITICAL',
        recommendationReason: 'Enterprise-grade service for major investor',
        expectedValue: 1000000,
        expectedRecurring: true,
        recurringValue: 1000000,
        conversionProbability: 0.85,
        upsellChain: 2,
      },
      {
        serviceId: 'DEVELOPMENT_PARTNERSHIP',
        name: 'Development Partnership & Joint Ventures',
        description: 'Co-develop properties together, revenue sharing arrangements',
        priority: 'HIGH',
        recommendationReason: 'Leverage combined resources for larger projects',
        expectedValue: 5000000,
        expectedRecurring: false,
        conversionProbability: 0.3,
        upsellChain: 1,
      },
      {
        serviceId: 'CONCIERGE_SERVICES',
        name: 'Concierge & Lifestyle Services',
        description: 'Personal assistant for all real estate and lifestyle needs',
        priority: 'MEDIUM',
        recommendationReason: 'White-glove service for UHNWI client',
        expectedValue: 500000,
        expectedRecurring: true,
        recurringValue: 500000,
        conversionProbability: 0.7,
        upsellChain: 2,
      },
    ],
  },
};

export const TRIGGER_RECOMMENDATIONS = {
  PROPERTY_SOLD: [
    {
      serviceId: 'TAX_OPTIMIZATION',
      name: 'Capital Gains Tax Planning',
      description: 'Minimize tax on sale proceeds',
      priority: 'HIGH',
      recommendationWindow: '7 days',
    },
    {
      serviceId: 'INVESTMENT_OPPORTUNITY',
      name: '1031 Exchange Alternative',
      description: 'Reinvest proceeds in new property to defer taxes',
      priority: 'MEDIUM',
      recommendationWindow: '30 days',
    },
  ],
  FIRST_TENANT_ISSUE: [
    {
      serviceId: 'PROPERTY_MANAGEMENT',
      name: 'Full Property Management',
      description: 'Avoid future issues with professional management',
      priority: 'HIGH',
      recommendationWindow: 'Immediate',
    },
    {
      serviceId: 'TENANT_SCREENING_SERVICE',
      name: 'Enhanced Tenant Screening',
      description: 'Background check, salary verification, guarantor requirement',
      priority: 'MEDIUM',
      recommendationWindow: '3 days',
    },
  ],
  MAINTENANCE_ISSUE: [
    {
      serviceId: 'PROPERTY_MAINTENANCE_PLAN',
      name: 'Annual Maintenance Plan',
      description: 'Preventive maintenance to avoid future emergencies',
      priority: 'HIGH',
      recommendationWindow: '3 days',
    },
  ],
  MARKET_OPPORTUNITY: [
    {
      serviceId: 'SALE_CONSULTATION',
      name: 'Strategic Sale Consultation',
      description: 'Time to sell your property at peak price',
      priority: 'MEDIUM',
      recommendationWindow: '14 days',
    },
  ],
  LOW_RENTAL_YIELD: [
    {
      serviceId: 'RENT_OPTIMIZATION',
      name: 'Rental Optimization',
      description: 'Increase rent by 10-15% through market analysis',
      priority: 'HIGH',
      recommendationWindow: '7 days',
    },
  ],
};

export const SEASONAL_RECOMMENDATIONS = {
  Q1: {
    recommendations: ['TAX_OPTIMIZATION', 'INVESTMENT_ADVISORY', 'PORTFOLIO_REVIEW'],
    focus: 'Tax planning and year-ahead strategy',
  },
  Q2: {
    recommendations: ['SALE_CONSULTATION', 'MARKET_ANALYSIS', 'REFINANCING'],
    focus: 'Market-based strategies',
  },
  Q3: {
    recommendations: ['PROPERTY_SEARCH', 'INVESTMENT_ADVISORY', 'FINANCING_ASSISTANCE'],
    focus: 'Acquisition strategies',
  },
  Q4: {
    recommendations: ['TAX_OPTIMIZATION', 'PORTFOLIO_REVIEW', 'YEAR_END_ANALYSIS'],
    focus: 'Tax and portfolio optimization',
  },
};
