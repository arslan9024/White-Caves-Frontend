/**
 * Advisory & Client Services AI Assistants Registry (3.24 Juno through 3.30 Mira).
 */

import type { AIAssistantOption } from '../CRMHubPage.config';

export const ADVISORY_CLIENT_ASSISTANTS: AIAssistantOption[] = [
  {
    id: 'juno',
    num: '3.24',
    name: 'Juno AI',
    role: 'Community Operations & Facilities',
    icon: '🏘️',
    items: [
      {
        id: 'juno-facility-booking',
        label: '3.24.1 Community Facility Booking Desk',
        icon: '🏘️',
        badge: 'Pool / Gym',
      },
      {
        id: 'juno-maintenance-sla',
        label: '3.24.2 Maintenance Ticket SLA Router',
        icon: '🔧',
        badge: 'Fast Dispatch',
      },
      {
        id: 'juno-service-tracker',
        label: '3.24.3 Tenant Service Request Tracker',
        icon: '🛎️',
        badge: 'Tenant Portal',
      },
      {
        id: 'juno-notice-board',
        label: '3.24.4 Community Broadcast Notice Board',
        icon: '📌',
        badge: 'Bulletins',
      },
    ],
  },
  {
    id: 'kairos',
    num: '3.25',
    name: 'Kairos AI',
    role: 'Luxury HNWI Wealth Advisory',
    icon: '💎',
    items: [
      {
        id: 'kairos-golden-visa',
        label: '3.25.1 UAE Golden Visa Eligibility Tool',
        icon: '💎',
        badge: 'AED 2M Gate',
      },
      {
        id: 'kairos-crypto-fx',
        label: '3.25.2 Real Estate Crypto FX Simulator',
        icon: '🪙',
        badge: 'BTC / USDT',
      },
      {
        id: 'kairos-chauffeur-desk',
        label: '3.25.3 Private Jet & Chauffeur Viewing Desk',
        icon: '✈️',
        badge: 'VIP Concierge',
      },
      {
        id: 'kairos-family-office',
        label: '3.25.4 Family Office Asset Allocator',
        icon: '🏛️',
        badge: 'Asset Strategy',
      },
    ],
  },
  {
    id: 'maven',
    num: '3.26',
    name: 'Maven AI',
    role: 'Investment Portfolio & Feasibility',
    icon: '📌',
    items: [
      {
        id: 'maven-dcf-calculator',
        label: '3.26.1 10-Year DCF ROI & IRR Calculator',
        icon: '📌',
        badge: 'DCF Modeling',
      },
      {
        id: 'maven-yield-comparator',
        label: '3.26.2 Short-Term vs Long-Term Yields',
        icon: '⚖️',
        badge: 'Airbnb vs Ejari',
      },
      {
        id: 'maven-portfolio-rebalancer',
        label: '3.26.3 Investment Portfolio Rebalancer',
        icon: '📊',
        badge: 'Diversification',
      },
      {
        id: 'maven-appreciation-projector',
        label: '3.26.4 Capital Appreciation Projector',
        icon: '📈',
        badge: 'Cap Gain',
      },
    ],
  },
  {
    id: 'prism',
    num: '3.27',
    name: 'Prism AI',
    role: 'AI Property Vector Matching Engine',
    icon: '🔭',
    items: [
      {
        id: 'prism-matching-engine',
        label: '3.27.1 Vector Matching Engine',
        icon: '🔭',
        badge: 'AI Match',
      },
      {
        id: 'prism-preference-matrix',
        label: '3.27.2 Client Preference Matrix',
        icon: '🎯',
        badge: 'Learning',
      },
      {
        id: 'prism-recommendations',
        label: '3.27.3 Ranked Inventory Picks',
        icon: '📊',
        badge: 'Top Picks',
      },
    ],
  },
  {
    id: 'sage',
    num: '3.28',
    name: 'Sage AI',
    role: 'Mortgage & Central Bank Financing Advisor',
    icon: '💰',
    items: [
      {
        id: 'sage-affordability',
        label: '3.28.1 Central Bank Affordability Calculator',
        icon: '💰',
        badge: 'CBUAE Bounds',
      },
      {
        id: 'sage-eibor-simulator',
        label: '3.28.2 EIBOR Variable vs Fixed Simulator',
        icon: '📈',
        badge: 'Rate Model',
      },
      {
        id: 'sage-lender-compare',
        label: '3.28.3 Multi-Bank Lender Comparison',
        icon: '🏦',
        badge: 'ADCB/ENBD',
      },
    ],
  },
  {
    id: 'echo',
    num: '3.29',
    name: 'Echo AI',
    role: 'Client Communication History & Unified Timeline',
    icon: '📜',
    items: [
      {
        id: 'echo-client-timeline',
        label: '3.29.1 Unified Client Timeline',
        icon: '📜',
        badge: 'Omnichannel',
      },
      {
        id: 'echo-inactivity-alerts',
        label: '3.29.2 Re-Engagement Inactivity Alerts',
        icon: '⏱️',
        badge: '14-Day Alert',
      },
      {
        id: 'echo-search-index',
        label: '3.29.3 Multi-Channel Search Index',
        icon: '🔍',
        badge: 'Instant Find',
      },
    ],
  },
  {
    id: 'mira',
    num: '3.30',
    name: 'Mira AI',
    role: 'Multilingual Arabic/English Translation Engine',
    icon: '🌍',
    items: [
      {
        id: 'mira-realtime-trans',
        label: '3.30.1 Real-Time Arabic-English Translation',
        icon: '🌍',
        badge: 'AR ↔ EN',
      },
      {
        id: 'mira-contract-rtl',
        label: '3.30.2 Bilingual DLD Contract Formatter',
        icon: '📑',
        badge: 'RTL Official',
      },
      {
        id: 'mira-dialect-lexicon',
        label: '3.30.3 Dubai Real Estate Dialect Lexicon',
        icon: '📖',
        badge: 'Terminology',
      },
    ],
  },
];
