// FILE: src/components/crm/LindaWhatsAppCRM/lindaTreeNavigation.ts
import type { LindaViewTab } from './LindaWhatsAppCRM.types';

export type LindaTreeNodeId =
  'inbox' | 'hot_leads' | 'campaigns' | 'sessions' | 'terminal' | 'pillars' | 'access_control';

export interface LindaTreeNode {
  id: LindaTreeNodeId;
  label: string;
  group: 'OPERATIONS' | 'AUTOMATION' | 'GOVERNANCE';
  viewTab: LindaViewTab;
  shortcut: string;
  requiresMdApproval?: boolean;
}

export const LINDA_TREE_NODES: LindaTreeNode[] = [
  {
    id: 'inbox',
    label: 'Inbox & Live Chat',
    group: 'OPERATIONS',
    viewTab: 'whatsapp_web',
    shortcut: '1',
  },
  {
    id: 'hot_leads',
    label: 'Hot Leads Queue',
    group: 'OPERATIONS',
    viewTab: 'conversations',
    shortcut: '2',
  },
  {
    id: 'campaigns',
    label: 'Campaigns & Outreach',
    group: 'OPERATIONS',
    viewTab: 'outreach',
    shortcut: '3',
  },
  {
    id: 'sessions',
    label: 'Bot Health & QR',
    group: 'AUTOMATION',
    viewTab: 'sessions',
    shortcut: '4',
  },
  {
    id: 'terminal',
    label: 'Terminal & Playbooks',
    group: 'AUTOMATION',
    viewTab: 'terminal',
    shortcut: '5',
  },
  {
    id: 'pillars',
    label: '10 Pillars & Live Logs',
    group: 'GOVERNANCE',
    viewTab: 'conversations',
    shortcut: '6',
  },
  {
    id: 'access_control',
    label: 'MD Access & Approvals',
    group: 'GOVERNANCE',
    viewTab: 'all',
    shortcut: '7',
    requiresMdApproval: true,
  },
];

export interface LindaBreadcrumbState {
  nodeId: LindaTreeNodeId;
  leafLabel: string | null;
}

export function buildLindaBreadcrumbs(state: LindaBreadcrumbState): string[] {
  const node = LINDA_TREE_NODES.find(n => n.id === state.nodeId) ?? LINDA_TREE_NODES[0];
  const trail = ['Linda', node.group, node.label];
  if (state.leafLabel) {
    trail.push(state.leafLabel);
  }
  return trail;
}

