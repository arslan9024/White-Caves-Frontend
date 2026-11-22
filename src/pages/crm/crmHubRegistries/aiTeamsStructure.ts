/**
 * AI Teams & Squads Structure Registry.
 */

import type { AITeamSquad } from '../CRMHubPage.config';

export const AI_TEAMS_STRUCTURE: AITeamSquad[] = [
  {
    id: 'team-executive',
    name: 'Executive & Governance Squad',
    seniorLead: 'Zoe AI',
    icon: '👑',
    color: '#E31E24',
    assistantIds: ['zoe', 'apex'],
  },
  {
    id: 'team-software-tech',
    name: 'Software Engineering & Technology Team',
    seniorLead: 'Aurora AI',
    icon: '🖥️',
    color: '#0EA5E9',
    assistantIds: ['aurora', 'hazel', 'willow'],
  },
  {
    id: 'team-comms',
    name: 'Omnichannel Communications & WhatsApp Team',
    seniorLead: 'Nadia AI',
    icon: '💬',
    color: '#25D366',
    assistantIds: ['nadia', 'nina', 'linda', 'echo', 'mira', 'halo'],
  },
  {
    id: 'team-sales',
    name: 'Sales, Leads & Acquisition Squad',
    seniorLead: 'Sophia AI',
    icon: '📈',
    color: '#8B5CF6',
    assistantIds: ['sophia', 'clara', 'hunter', 'lead-scoring', 'prism'],
  },
  {
    id: 'team-finance',
    name: 'Finance, Treasury & Accounts Squad',
    seniorLead: 'Theodora AI',
    icon: '💳',
    color: '#F59E0B',
    assistantIds: ['theodora', 'kairos', 'maven', 'sage'],
  },
  {
    id: 'team-legal',
    name: 'Legal, Compliance & Document Studio',
    seniorLead: 'Laila AI',
    icon: '⚖️',
    color: '#6366F1',
    assistantIds: ['evangeline', 'laila', 'henry', 'rex', 'quill'],
  },
  {
    id: 'team-inventory',
    name: 'Master Inventory & Asset Management',
    seniorLead: 'Mary AI',
    icon: '🏠',
    color: '#3B82F6',
    assistantIds: ['mary', 'sentinel', 'crest'],
  },
  {
    id: 'team-leasing',
    name: 'Leasing, Tenancy & Handover Squad',
    seniorLead: 'Daisy AI',
    icon: '📋',
    color: '#14B8A6',
    assistantIds: ['daisy', 'vesta', 'juno'],
  },
  {
    id: 'team-marketing',
    name: 'Growth Marketing & Virtual Staging',
    seniorLead: 'Olivia AI',
    icon: '📣',
    color: '#EC4899',
    assistantIds: ['olivia', 'iris'],
  },
  {
    id: 'team-intelligence',
    name: 'Market Intelligence & Big Data Squad',
    seniorLead: 'Cipher AI',
    icon: '📊',
    color: '#0D9488',
    assistantIds: ['atlas', 'cipher', 'oracle', 'flux', 'nova', 'lumen'],
  },
  {
    id: 'team-hr',
    name: 'Human Resources & Talent Squad',
    seniorLead: 'Nancy AI',
    icon: '👥',
    color: '#F97316',
    assistantIds: ['nancy'],
  },
];
