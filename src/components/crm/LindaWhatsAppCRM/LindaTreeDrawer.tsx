// FILE: src/components/crm/LindaWhatsAppCRM/LindaTreeDrawer.tsx
import React, { memo } from 'react';
import { LINDA_TREE_NODES, type LindaTreeNodeId } from './lindaTreeNavigation';

interface LindaTreeDrawerProps {
  isDark: boolean;
  activeNodeId: LindaTreeNodeId;
  hotLeadCount: number;
  mdApproved: boolean;
  onSelectNode: (nodeId: LindaTreeNodeId) => void;
}

const GROUPS: Array<'OPERATIONS' | 'AUTOMATION' | 'GOVERNANCE'> = [
  'OPERATIONS',
  'AUTOMATION',
  'GOVERNANCE',
];

export const LindaTreeDrawer = memo(
  ({ isDark, activeNodeId, hotLeadCount, mdApproved, onSelectNode }: LindaTreeDrawerProps) => {
    const border = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(15,23,42,0.12)';
    const bg = isDark ? 'rgba(15,23,42,0.75)' : '#f8fafc';
    const textMuted = isDark ? '#94a3b8' : '#64748b';

    return (
      <aside
        aria-label="Linda Navigation Tree"
        data-testid="linda-tree-drawer"
        style={{
          width: 224,
          flexShrink: 0,
          borderInlineEnd: `1px solid ${border}`,
          background: bg,
          borderRadius: 10,
          padding: 10,
          display: 'grid',
          gap: 12,
          alignContent: 'start',
        }}
      >
        {GROUPS.map(group => (
          <div key={group} style={{ display: 'grid', gap: 4 }}>
            <div
              style={{
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: '0.08em',
                color: textMuted,
                paddingInline: 8,
              }}
            >
              {group}
            </div>
            {LINDA_TREE_NODES.filter(n => n.group === group).map(node => {
              const isActive = activeNodeId === node.id;
              return (
                <button
                  key={node.id}
                  type="button"
                  data-testid={`linda-tree-node-${node.id}`}
                  onClick={() => onSelectNode(node.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 6,
                    width: '100%',
                    textAlign: 'start',
                    padding: '7px 8px',
                    borderRadius: 6,
                    border: isActive ? '1px solid #EF4444' : '1px solid transparent',
                    background: isActive ? 'rgba(239,68,68,0.12)' : 'transparent',
                    color: isActive ? '#EF4444' : isDark ? '#e2e8f0' : '#0f172a',
                    fontSize: 12,
                    fontWeight: isActive ? 700 : 500,
                    cursor: 'pointer',
                  }}
                >
                  <span
                    style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
                  >
                    {node.label}
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 4, flexShrink: 0 }}>
                    {node.id === 'hot_leads' && hotLeadCount > 0 && (
                      <span
                        style={{
                          background: '#EF4444',
                          color: '#ffffff',
                          borderRadius: 999,
                          padding: '1px 6px',
                          fontSize: 10,
                          fontWeight: 700,
                        }}
                      >
                        {hotLeadCount}
                      </span>
                    )}
                    {node.requiresMdApproval && (
                      <span
                        style={{
                          fontSize: 9,
                          padding: '1px 4px',
                          borderRadius: 4,
                          background: mdApproved
                            ? 'rgba(16,185,129,0.15)'
                            : 'rgba(245,158,11,0.15)',
                          color: mdApproved ? '#10b981' : '#f59e0b',
                        }}
                      >
                        {mdApproved ? 'MD' : 'LOCK'}
                      </span>
                    )}
                    <kbd style={{ fontSize: 10, opacity: 0.6 }}>{node.shortcut}</kbd>
                  </span>
                </button>
              );
            })}
          </div>
        ))}
      </aside>
    );
  }
);

LindaTreeDrawer.displayName = 'LindaTreeDrawer';
