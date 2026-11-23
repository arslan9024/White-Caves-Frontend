/**
 * Core AI Assistants: Cassie, Atlas, Clara, Mary, Linda (3.6 - 3.10).
 */

import type { AIAssistantOption } from '../CRMHubPage.config';

export const CORE_AI_ASSISTANTS_PART2: AIAssistantOption[] = [
  {
    id: 'lead-scoring',
    num: '3.6',
    name: 'Cassie AI',
    role: 'Predictive Lead Scoring Engine',
    icon: '📊',
    items: [
      {
        id: 'cassie-100pt-scorer',
        label: '3.6.1 100-Point Algorithmic Scorer',
        icon: '📊',
        badge: 'Scoring Model',
      },
      {
        id: 'cassie-weight-tuning',
        label: '3.6.2 Behavioral Weight Tuning',
        icon: '🎛️',
        badge: 'Signal Weights',
      },
      {
        id: 'cassie-conversion-prob',
        label: '3.6.3 Lead Conversion Probability',
        icon: '🎯',
        badge: 'Predictive AI',
      },
      {
        id: 'cassie-cadence-trigger',
        label: '3.6.4 Cold-to-Hot Cadence Trigger',
        icon: '🔥',
        badge: 'Auto-Nurture',
      },
    ],
  },
  {
    id: 'atlas',
    num: '3.7',
    name: 'Atlas AI',
    role: 'Off-Plan Projects & Construction',
    icon: '🏛️',
    items: [
      {
        id: 'atlas-construction-delay',
        label: '3.7.1 Construction Delay Estimator',
        icon: '🏛️',
        badge: 'Milestone Risk',
      },
      {
        id: 'atlas-payment-plans',
        label: '3.7.2 Payment Plan Installment Builder',
        icon: '💳',
        badge: 'Developer Terms',
      },
      {
        id: 'atlas-developer-tracker',
        label: '3.7.3 Developer Project Tracker',
        icon: '🏗️',
        badge: 'Emaar/DAMAC',
      },
      {
        id: 'atlas-roi-simulator',
        label: '3.7.4 Off-Plan Capital Gain Simulator',
        icon: '📈',
        badge: 'Yield Model',
      },
    ],
  },
  {
    id: 'clara',
    num: '3.8',
    name: 'Clara AI',
    role: 'Leads Qualification & Acquisition',
    icon: '🎯',
    items: [
      {
        id: 'clara-lead-ingestion',
        label: '3.8.1 Portal Lead Ingestion Webhook',
        icon: '🎯',
        badge: 'Instant Webhook',
      },
      {
        id: 'clara-data-enricher',
        label: '3.8.2 Phone & Email Data Enricher',
        icon: '🔍',
        badge: 'Verification',
      },
      {
        id: 'clara-dedup-engine',
        label: '3.8.3 Lead Deduplication Engine',
        icon: '🧹',
        badge: 'Zero Duplicates',
      },
      {
        id: 'clara-auto-responder',
        label: '3.8.4 First-Touch Auto-Responder',
        icon: '⚡',
        badge: '< 60 Sec',
      },
    ],
  },
  {
    id: 'mary',
    num: '3.9',
    name: 'Mary AI',
    role: 'Master Property Inventory & Area Matrix',
    icon: '🏠',
    items: [
      {
        id: 'mary-inventory-grid',
        label: '3.9.1 Master 9,378+ Inventory Grid',
        icon: '🏠',
        badge: 'Master Portfolio',
      },
      {
        id: 'mary-availability-toggler',
        label: '3.9.2 Bulk Unit Availability Toggler',
        icon: '🔄',
        badge: 'Live Sync',
      },
      {
        id: 'mary-area-matrix',
        label: '3.9.3 Dubai Area & Community Matrix',
        icon: '🗺️',
        badge: 'Geo Cluster',
      },
      {
        id: 'mary-pricing-optimizer',
        label: '3.9.4 Unit Pricing Floor Optimizer',
        icon: '🏷️',
        badge: 'Floor Control',
      },
    ],
  },
  {
    id: 'linda',
    num: '3.10',
    name: 'Linda AI',
    role: 'Agent-Local WhatsApp Session Desk',
    icon: '📱',
    items: [
      {
        id: 'linda-qr-pairing',
        label: '3.10.1 QR WhatsApp Web Pairing Desk',
        icon: '📱',
        badge: 'Device Session',
      },
      {
        id: 'linda-session-switcher',
        label: '3.10.2 Multi-Session Agent Switcher',
        icon: '🔄',
        badge: 'Agent Desk',
      },
      {
        id: 'linda-media-vault',
        label: '3.10.3 Voice Note & Media Vault',
        icon: '🎙️',
        badge: 'Encrypted',
      },
      {
        id: 'linda-local-cache',
        label: '3.10.4 Local Device Message Cache',
        icon: '💾',
        badge: 'PWA Offline',
      },
    ],
  },
];
