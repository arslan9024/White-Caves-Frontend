import { Bot, Crown, Shield, GitFork, Sparkles } from 'lucide-react';
import type { AiAgentRecord } from '../../crm/AiAssistantManager/AiAssistantManager.types';

const LEGACY_AEGIS_NAMES = new Set([
  'aegis',
  'ada',
  'nova',
  'orion',
  'gwynne',
  'grace',
  'turing',
  'sterling',
]);

export function isZoesBusinessTeamAgent(agent: AiAgentRecord): boolean {
  const tokens = `${agent.name} ${agent.agentId}`
    .toLowerCase()
    .replace(/[^a-z\s]/g, ' ')
    .split(/\s+/);
  return !tokens.some(t => LEGACY_AEGIS_NAMES.has(t));
}

export const PORTAL_LINKS = [
  {
    route: '/aicc-sanctum',
    label: 'AICC-Sanctum 8-Tier Command (MD)',
    color: '#F43F5E',
    bg: 'rgba(244,63,94,0.14)',
    border: 'rgba(244,63,94,0.35)',
    testId: 'link-aicc-sanctum',
    Icon: Sparkles,
  },
  {
    route: '/dashboard/aiams',
    label: 'AI Assistants CRUD Hub (AIAMS)',
    color: '#F87171',
    bg: 'rgba(239,68,68,0.1)',
    border: 'rgba(239,68,68,0.25)',
    testId: 'link-aiams-crud-hub',
    Icon: Bot,
  },
  {
    route: '/dashboard/aiams/managers',
    label: '12 Dept Directors & 108 Managers',
    color: '#FBBF24',
    bg: 'rgba(245,158,11,0.08)',
    border: 'rgba(245,158,11,0.2)',
    testId: 'link-aiams-managers',
    Icon: Crown,
  },
  {
    route: '/dashboard/aiams/supervisors',
    label: '5 Operational AI Supervisors (1-12-108)',
    color: '#38BDF8',
    bg: 'rgba(56,189,248,0.08)',
    border: 'rgba(56,189,248,0.2)',
    testId: 'link-aiams-supervisors',
    Icon: Shield,
  },
  {
    route: '/dashboard/leasing-cockpit',
    label: 'MD Daily Leasing Cockpit (DH2)',
    color: '#34D399',
    bg: 'rgba(16,185,129,0.08)',
    border: 'rgba(16,185,129,0.2)',
    testId: 'link-md-leasing-cockpit',
    Icon: GitFork,
  },
];

export const OPERATIONAL_SUPERVISOR_SHORTCUTS = [
  { route: '/dashboard/inventory', label: 'Mary', code: 'SUP-06-1-01-1', color: '#38BDF8' },
  { route: '/dashboard/linda', label: 'Linda', code: 'SUP-08-1-01-1', color: '#4ADE80' },
  { route: '/dashboard/diana', label: 'Diana', code: 'SUP-02-6-01-1', color: '#FBBF24' },
  { route: '/dashboard/leasing', label: 'Daisy', code: 'SUP-05-2-01-1', color: '#2DD4BF' },
  { route: '/dashboard/henry', label: 'Henry', code: 'SUP-11-1-01-1', color: '#F87171' },
];
