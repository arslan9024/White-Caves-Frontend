/**
 * Operations & Systems Engineering AI Assistants (3.16 Aurora through 3.23 Vesta).
 */

import type { AIAssistantOption } from '../CRMHubPage.config';

export const OPERATIONS_SYSTEMS_ASSISTANTS: AIAssistantOption[] = [
  {
    id: 'aurora',
    num: '3.16',
    name: 'Aurora AI',
    role: 'CTO Systems & API Infrastructure',
    icon: '🖥️',
    items: [
      {
        id: 'aurora-microservices',
        label: '3.16.1 Microservice Health & Uptime',
        icon: '🖥️',
        badge: '99.99%',
      },
      {
        id: 'aurora-api-telemetry',
        label: '3.16.2 API Latency & Rate Limits',
        icon: '⚡',
        badge: '< 100ms',
      },
      {
        id: 'aurora-db-tracer',
        label: '3.16.3 Database Query & Replica Tracer',
        icon: '🗄️',
        badge: 'Mongo Replica',
      },
      {
        id: 'aurora-cloud-cache',
        label: '3.16.4 Cloud Cache & Memory Profiler',
        icon: '☁️',
        badge: 'Redis Cache',
      },
      {
        id: 'aurora-software-docs',
        label: '3.16.5 Hyper-Linked Software Architecture Hub (SRS/SDD)',
        icon: '📐',
        badge: 'SRS & SDD',
      },
    ],
  },
  {
    id: 'hazel',
    num: '3.17',
    name: 'Hazel AI',
    role: 'Frontend & UX Quality Metrics',
    icon: '🧩',
    items: [
      {
        id: 'hazel-token-guard',
        label: '3.17.1 Red/White/Slate Token Guard',
        icon: '🎨',
        badge: 'Brand Guard',
      },
      {
        id: 'hazel-ux-inspector',
        label: '3.17.2 100-Point UI/UX Audit Inspector',
        icon: '🧩',
        badge: '100-Pt Audit',
      },
      {
        id: 'hazel-breakpoint-analyzer',
        label: '3.17.3 Responsive Breakpoint Analyzer',
        icon: '📱',
        badge: 'Mobile Ready',
      },
      {
        id: 'hazel-animation-monitor',
        label: '3.17.4 Micro-Animation Easings Monitor',
        icon: '💫',
        badge: '60fps UI',
      },
    ],
  },
  {
    id: 'willow',
    num: '3.18',
    name: 'Willow AI',
    role: 'Backend & Server Microservices',
    icon: '⚙️',
    items: [
      {
        id: 'willow-route-discovery',
        label: '3.18.1 REST/GraphQL Route Discovery',
        icon: '⚙️',
        badge: '220+ Routes',
      },
      {
        id: 'willow-auth-inspector',
        label: '3.18.2 JWT Auth & Session Inspector',
        icon: '🔑',
        badge: 'Token Guard',
      },
      {
        id: 'willow-firewall-guard',
        label: '3.18.3 Rate Limiter & DDoS Firewall',
        icon: '🛡️',
        badge: 'IP Throttling',
      },
      {
        id: 'willow-queue-desk',
        label: '3.18.4 Background Worker Queue Desk',
        icon: '⏱️',
        badge: 'Job Workers',
      },
    ],
  },
  {
    id: 'henry',
    num: '3.19',
    name: 'Henry AI',
    role: 'Records, Title Deeds & Audit Logs',
    icon: '🗂️',
    items: [
      {
        id: 'henry-tenancy-journey',
        label: '3.19.1 Prepare Tenancy Contract',
        icon: '📄',
        badge: 'DLD Official',
      },
      { id: 'henry-scan-eid', label: '3.19.2 Scan Emirates ID', icon: '🪪', badge: 'OCR Engine' },
      {
        id: 'henry-scan-title-deed',
        label: '3.19.3 Scan Title Deed',
        icon: '📜',
        badge: 'DLD Oqood',
      },
      { id: 'henry-scan-passport', label: '3.19.4 Scan Passport', icon: '🛂', badge: 'ICAO MRZ' },
      {
        id: 'henry-scan-contract',
        label: '3.19.5 Scan Tenancy Contract',
        icon: '📑',
        badge: 'DLD Ejari',
      },
    ],
  },
  {
    id: 'sentinel',
    num: '3.20',
    name: 'Sentinel AI',
    role: 'Property State Machine & Quality',
    icon: '🏢',
    items: [
      {
        id: 'sentinel-lifecycle-machine',
        label: '3.20.1 Property Lifecycle State Machine',
        icon: '🏢',
        badge: 'State Engine',
      },
      {
        id: 'sentinel-verification-gate',
        label: '3.20.2 Listing Verification Quality Gate',
        icon: '✅',
        badge: 'Quality Gate',
      },
      {
        id: 'sentinel-decommission-flow',
        label: '3.20.3 Asset Decommissioning Flow',
        icon: '🔒',
        badge: 'Archive',
      },
      {
        id: 'sentinel-telemetry-hub',
        label: '3.20.4 IoT Telemetry Ingestion Hub',
        icon: '📡',
        badge: 'Live Sensors',
      },
    ],
  },
  {
    id: 'hunter',
    num: '3.21',
    name: 'Hunter AI',
    role: 'Outbound Prospecting & Lead Matcher',
    icon: '🎯',
    items: [
      {
        id: 'hunter-offmarket-matcher',
        label: '3.21.1 Off-Market Luxury Matcher',
        icon: '🎯',
        badge: 'VIP Match',
      },
      {
        id: 'hunter-hnw-profiler',
        label: '3.21.2 High-Net-Worth Lead Profiler',
        icon: '💎',
        badge: 'Investor DNA',
      },
      {
        id: 'hunter-geofenced-outreach',
        label: '3.21.3 Geo-Fenced Area Outreach',
        icon: '🗺️',
        badge: 'Prime Dubai',
      },
      {
        id: 'hunter-pitch-dispatcher',
        label: '3.21.4 Direct WhatsApp Pitch Dispatcher',
        icon: '💬',
        badge: 'Instant Pitch',
      },
    ],
  },
  {
    id: 'cipher',
    num: '3.22',
    name: 'Cipher AI',
    role: 'Market Pricing & CMA Valuations',
    icon: '📊',
    items: [
      {
        id: 'cipher-dld-regressor',
        label: '3.22.1 DLD Transaction Cluster Regressor',
        icon: '📊',
        badge: 'DLD Data',
      },
      {
        id: 'cipher-trend-sparklines',
        label: '3.22.2 Community SqFt Trend Sparklines',
        icon: '📈',
        badge: 'Market Trend',
      },
      {
        id: 'cipher-cma-builder',
        label: '3.22.3 Automated CMA Report Builder',
        icon: '📑',
        badge: 'AI Valuation',
      },
      {
        id: 'cipher-price-forecaster',
        label: '3.22.4 Price Projection Forecaster',
        icon: '🔮',
        badge: '12-Mo Proj',
      },
    ],
  },
  {
    id: 'vesta',
    num: '3.23',
    name: 'Vesta AI',
    role: 'Snagging, Move-In & Handover',
    icon: '🔑',
    items: [
      {
        id: 'vesta-snagging-inspector',
        label: '3.23.1 Digital Snagging Photo Inspector',
        icon: '🔑',
        badge: 'Snagging',
      },
      {
        id: 'vesta-handover-checklist',
        label: '3.23.2 Move-In Handover Checklist',
        icon: '📋',
        badge: 'Handover Ready',
      },
      {
        id: 'vesta-key-certificate',
        label: '3.23.3 Key Handover Certificate',
        icon: '📄',
        badge: 'DLD Form B',
      },
      {
        id: 'vesta-contractor-dispatch',
        label: '3.23.4 Contractor Rectification Dispatcher',
        icon: '🛠️',
        badge: 'Fix SLA',
      },
    ],
  },
];
