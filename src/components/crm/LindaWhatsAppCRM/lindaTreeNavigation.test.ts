// FILE: src/components/crm/LindaWhatsAppCRM/lindaTreeNavigation.test.ts
import { describe, it, expect } from 'vitest';
import { buildLindaBreadcrumbs, LINDA_TREE_NODES } from './lindaTreeNavigation';

describe('lindaTreeNavigation', () => {
  it('builds root-to-leaf breadcrumb trail', () => {
    expect(buildLindaBreadcrumbs({ nodeId: 'inbox', leafLabel: null })).toEqual([
      'Linda',
      'OPERATIONS',
      'Inbox & Live Chat',
    ]);
    expect(buildLindaBreadcrumbs({ nodeId: 'hot_leads', leafLabel: 'VIP +971501234567' })).toEqual([
      'Linda',
      'OPERATIONS',
      'Hot Leads Queue',
      'VIP +971501234567',
    ]);
  });

  it('marks MD Access & Approvals as requiring MD approval', () => {
    const govNode = LINDA_TREE_NODES.find(n => n.id === 'access_control');
    expect(govNode?.requiresMdApproval).toBe(true);
  });
});

