/**
 * Core AI Assistants: Nadia, Nina, Sophia, Zoe, Evangeline (3.1 - 3.5).
 */

import type { AIAssistantOption } from '../CRMHubPage.config';

export const CORE_AI_ASSISTANTS_PART1: AIAssistantOption[] = [
  {
    id: 'nadia',
    num: '3.1',
    name: 'Nadia AI',
    role: 'WhatsApp CRM & Campaigns',
    icon: '💬',
    items: [
      {
        id: 'nadia-broadcast',
        label: '3.1.1 Broadcast Campaign Dispatcher',
        icon: '📢',
        badge: 'Outbound',
      },
      {
        id: 'nadia-templates',
        label: '3.1.2 WhatsApp Template Studio',
        icon: '📝',
        badge: 'Meta Verified',
      },
      {
        id: 'nadia-sla-routing',
        label: '3.1.3 SLA Lead Routing & Escalation',
        icon: '⏱️',
        badge: '15-Min SLA',
      },
      {
        id: 'nadia-telemetry',
        label: '3.1.4 Delivery & Read Telemetry',
        icon: '📊',
        badge: 'Real-Time',
      },
    ],
  },
  {
    id: 'nina',
    num: '3.2',
    name: 'Nina AI',
    role: 'WhatsApp Bot & Automations',
    icon: '🤖',
    items: [
      {
        id: 'nina-flow-designer',
        label: '3.2.1 Conversation Flow Designer',
        icon: '🤖',
        badge: 'NLP State',
      },
      {
        id: 'nina-intent-sim',
        label: '3.2.2 Intent Classifier Simulator',
        icon: '🎯',
        badge: 'AI Intent',
      },
      {
        id: 'nina-lead-qualifier',
        label: '3.2.3 Automated Lead Qualifier',
        icon: '🏷️',
        badge: 'Auto-Tag',
      },
      {
        id: 'nina-agent-handoff',
        label: '3.2.4 Human Agent Handoff Queue',
        icon: '👥',
        badge: 'Live Escalation',
      },
    ],
  },
  {
    id: 'sophia',
    num: '3.3',
    name: 'Sophia AI',
    role: 'Sales CRM & Deals Intelligence',
    icon: '📈',
    items: [
      {
        id: 'sophia-deals-kanban',
        label: '3.3.1 Interactive Deals Kanban',
        icon: '📈',
        badge: 'Pipeline',
      },
      {
        id: 'sophia-commission-calc',
        label: '3.3.2 Commission Split Calculator',
        icon: '💵',
        badge: 'Split Engine',
      },
      {
        id: 'sophia-revenue-velocity',
        label: '3.3.3 Deal Velocity & Forecasting',
        icon: '⚡',
        badge: 'Forecast',
      },
      {
        id: 'sophia-deal-risk',
        label: '3.3.4 Deal Risk & Clawback Shield',
        icon: '🛡️',
        badge: 'Risk Gating',
      },
    ],
  },
  {
    id: 'zoe',
    num: '3.4',
    name: 'Zoe AI',
    role: 'Executive CRM & Operations SLA',
    icon: '👑',
    items: [
      {
        id: 'zoe-vision-deck',
        label: '3.4.1 MD Corporate Vision Deck',
        icon: '👑',
        badge: 'Founder Deck',
      },
      {
        id: 'zoe-sla-matrix',
        label: '3.4.2 12-Department SLA Matrix',
        icon: '🏛️',
        badge: 'Operations',
      },
      {
        id: 'zoe-wip-monitor',
        label: '3.4.3 Cross-Team WIP Monitor',
        icon: '📊',
        badge: 'Workload',
      },
      {
        id: 'zoe-sovereign-override',
        label: '3.4.4 Sovereign Override Desk',
        icon: '⚡',
        badge: 'Level 5 Master',
      },
      {
        id: 'zoe-business-docs',
        label: '3.4.5 Hyper-Linked Business Docs Hub (DET 1388443)',
        icon: '📜',
        badge: 'DET & RERA',
      },
    ],
  },
  {
    id: 'evangeline',
    num: '3.5',
    name: 'Evangeline AI',
    role: 'Legal & Contract Intelligence',
    icon: '⚖️',
    items: [
      {
        id: 'evangeline-contracts',
        label: '3.5.1 Form A/B/F Clause Assembler',
        icon: '⚖️',
        badge: 'DLD Unified',
      },
      {
        id: 'evangeline-poa-validator',
        label: '3.5.2 POA Document Validator',
        icon: '📜',
        badge: 'Notary Validated',
      },
      {
        id: 'evangeline-nda-studio',
        label: '3.5.3 NDA & Confidentiality Studio',
        icon: '🔒',
        badge: 'VIP Legal',
      },
      {
        id: 'evangeline-disputes',
        label: '3.5.4 Legal Dispute & Notice Manager',
        icon: '📑',
        badge: 'Form 12',
      },
    ],
  },
];
