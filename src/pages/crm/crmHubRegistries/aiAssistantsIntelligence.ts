/**
 * Intelligence, Governance & Autonomy AI Assistants Registry (3.31 Rex through 3.44 Althea).
 */

import type { AIAssistantOption } from '../CRMHubPage.config';

export const INTELLIGENCE_AI_ASSISTANTS: AIAssistantOption[] = [
  {
    id: 'rex',
    num: '3.31',
    name: 'Rex AI',
    role: 'Regulatory Document Fraud & Blockchain Verifier',
    icon: '📋',
    items: [
      {
        id: 'rex-title-verify',
        label: '3.31.1 DLD Blockchain Title Deed Verifier',
        icon: '📋',
        badge: 'Blockchain',
      },
      {
        id: 'rex-noc-guard',
        label: '3.31.2 Developer NOC Authenticity Guard',
        icon: '🛡️',
        badge: 'Anti-Fraud',
      },
      {
        id: 'rex-ica-matcher',
        label: '3.31.3 ICA Emirates ID Matcher',
        icon: '🪪',
        badge: 'ICA Registry',
      },
    ],
  },
  {
    id: 'iris',
    num: '3.32',
    name: 'Iris AI',
    role: 'Virtual Staging & 3D Panoramic Visualization',
    icon: '🎨',
    items: [
      {
        id: 'iris-virtual-staging',
        label: '3.32.1 Generative AI Virtual Staging',
        icon: '🎨',
        badge: 'Photorealistic',
      },
      {
        id: 'iris-3d-floorplan',
        label: '3.32.2 2D to 3D Floorplan Extruder',
        icon: '📐',
        badge: '3D Render',
      },
      {
        id: 'iris-ar-tour',
        label: '3.32.3 Mobile AR Tour Generator',
        icon: '📱',
        badge: 'Appless AR',
      },
    ],
  },
  {
    id: 'apex',
    num: '3.33',
    name: 'Apex AI',
    role: 'Agent Performance Coach & Strategy',
    icon: '🏆',
    items: [
      {
        id: 'apex-agent-review',
        label: '3.33.1 Weekly Agent Performance Review',
        icon: '🏆',
        badge: 'Scorecard',
      },
      {
        id: 'apex-coaching-builder',
        label: '3.33.2 Actionable Coaching Plan Builder',
        icon: '🎯',
        badge: 'Development',
      },
      {
        id: 'apex-incentive-tier',
        label: '3.33.3 Incentive Tier Accelerator',
        icon: '💵',
        badge: 'Target Bounds',
      },
    ],
  },
  {
    id: 'halo',
    num: '3.34',
    name: 'Halo AI',
    role: 'Client Satisfaction & NPS Feedback Tracker',
    icon: '⭐',
    items: [
      {
        id: 'halo-nps-trigger',
        label: '3.34.1 Post-Handover NPS Survey Trigger',
        icon: '⭐',
        badge: 'NPS Engine',
      },
      {
        id: 'halo-sentiment-monitor',
        label: '3.34.2 Client Sentiment Risk Monitor',
        icon: '📊',
        badge: 'CSAT Trends',
      },
      {
        id: 'halo-review-escalation',
        label: '3.34.3 Service Review Escalation Flow',
        icon: '🚨',
        badge: 'Management SLA',
      },
    ],
  },
  {
    id: 'oracle',
    num: '3.35',
    name: 'Oracle AI',
    role: 'Market Intelligence Analyst & Broadcast Reports',
    icon: '🔮',
    items: [
      {
        id: 'oracle-executive-report',
        label: '3.35.1 Weekly Executive Narrative Report',
        icon: '🔮',
        badge: 'Briefing',
      },
      {
        id: 'oracle-volume-spikes',
        label: '3.35.2 DLD Volume Spike Detector',
        icon: '📈',
        badge: 'Spike Alert',
      },
      {
        id: 'oracle-social-bulletins',
        label: '3.35.3 Social Media Market Bulletins',
        icon: '📣',
        badge: 'Public Feed',
      },
    ],
  },
  {
    id: 'flux',
    num: '3.36',
    name: 'Flux AI',
    role: 'Real-Time DLD & Portals Live Data Feed',
    icon: '⚡',
    items: [
      {
        id: 'flux-dld-stream',
        label: '3.36.1 Real-Time DLD Open API Ingestion',
        icon: '⚡',
        badge: 'Live API',
      },
      {
        id: 'flux-portal-scrapers',
        label: '3.36.2 Portal Webhook Price Scraper',
        icon: '🌐',
        badge: 'Bayut / PF',
      },
      {
        id: 'flux-feed-health',
        label: '3.36.3 Feed Latency & Health Inspector',
        icon: '📡',
        badge: 'Telemetry',
      },
    ],
  },
  {
    id: 'nova',
    num: '3.37',
    name: 'Nova AI',
    role: 'New Development & Off-Plan Launch Radar',
    icon: '🏗️',
    items: [
      {
        id: 'nova-launch-radar',
        label: '3.37.1 Developer Launch Intelligence Radar',
        icon: '🏗️',
        badge: 'Launches',
      },
      {
        id: 'nova-payment-alerts',
        label: '3.37.2 Payment Plan Milestone Alerts',
        icon: '💳',
        badge: 'Payment Terms',
      },
      {
        id: 'nova-inventory-ingest',
        label: '3.37.3 Pre-Launch Inventory Ingestion',
        icon: '📥',
        badge: 'Pre-Launch',
      },
    ],
  },
  {
    id: 'quill',
    num: '3.38',
    name: 'Quill AI',
    role: 'Document Generation Engine & Bilingual Forms',
    icon: '✍️',
    items: [
      {
        id: 'quill-spa-generator',
        label: '3.38.1 Automated Bilingual SPA Generator',
        icon: '✍️',
        badge: 'Bilingual',
      },
      {
        id: 'quill-tenancy-builder',
        label: '3.38.2 DLD Unified Tenancy Form Builder',
        icon: '📄',
        badge: 'DLD Form',
      },
      {
        id: 'quill-bulk-documents',
        label: '3.38.3 Bulk Transaction Document Pack',
        icon: '📁',
        badge: 'Portfolio Pack',
      },
    ],
  },
export * from './aiAssistantsIntelligenceExtended';
