import React, { FC } from 'react';
import { ChevronRight, ChevronDown, Users } from 'lucide-react';
import { generateManagerFractalSubtree } from '../../../portals/md/aicc/formulas/bhaktiFractalLoop.formula';

interface ManagerSummary {
  code: string;
  name: string;
  slot?: number;
}

interface ContextualHierarchyManagerBranchProps {
  deptSlot: number;
  managers: ManagerSummary[];
  expandedMgrCode: string | null;
  expandedAmId: string | null;
  onToggleManager: (mgrCode: string | null) => void;
  onToggleAm: (amId: string | null) => void;
  onNavigateToView?: (route: string) => void;
}

export const ContextualHierarchyManagerBranch: FC<ContextualHierarchyManagerBranchProps> = ({
  deptSlot,
  managers,
  expandedMgrCode,
  expandedAmId,
  onToggleManager,
  onToggleAm,
  onNavigateToView,
}) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
    {managers.map((mgr, mIdx) => {
      const isMgrOpen = expandedMgrCode === mgr.code;
      const amList = isMgrOpen
        ? generateManagerFractalSubtree(
            deptSlot,
            mgr.slot || mIdx + 1,
            mgr.name.replace(/^AI\s+/i, '')
          )
        : [];

      return (
        <div
          key={mgr.code}
          style={{
            backgroundColor: 'rgba(30,41,59,0.45)',
            borderRadius: '6px',
            padding: '5px 6px',
          }}
        >
          <div
            onClick={() => onToggleManager(isMgrOpen ? null : mgr.code)}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              cursor: 'pointer',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px', overflow: 'hidden' }}>
              {isMgrOpen ? (
                <ChevronDown size={12} color="#EF4444" />
              ) : (
                <ChevronRight size={12} color="#94A3B8" />
              )}
              <span
                style={{
                  fontWeight: 700,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {mgr.name}
              </span>
            </div>
            <span style={{ fontSize: '0.62rem', color: '#94A3B8', fontFamily: 'monospace' }}>
              {mgr.code}
            </span>
          </div>

          {isMgrOpen && (
            <div
              style={{
                marginTop: '5px',
                paddingLeft: '12px',
                display: 'flex',
                flexDirection: 'column',
                gap: '3px',
              }}
            >
              {amList.map(am => {
                const isAmOpen = expandedAmId === am.id;
                return (
                  <div key={am.id}>
                    <div
                      onClick={() => onToggleAm(isAmOpen ? null : am.id)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '3px 5px',
                        borderRadius: '4px',
                        backgroundColor: 'rgba(15,23,42,0.55)',
                        cursor: 'pointer',
                        fontSize: '0.68rem',
                      }}
                    >
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        {isAmOpen ? (
                          <ChevronDown size={10} color="#10B981" />
                        ) : (
                          <ChevronRight size={10} color="#64748B" />
                        )}
                        <span>{am.name}</span>
                      </span>
                      <span style={{ fontSize: '0.6rem', color: '#10B981' }}>9 Sups</span>
                    </div>

                    {isAmOpen && (
                      <div
                        style={{
                          paddingLeft: '12px',
                          marginTop: '3px',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '2px',
                        }}
                      >
                        {am.supervisors.map(sup => (
                          <div
                            key={sup.id}
                            onClick={() =>
                              onNavigateToView?.(`/dashboard/tasks/catalog?sup=${sup.id}`)
                            }
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              padding: '2px 5px',
                              borderRadius: '4px',
                              backgroundColor: 'rgba(15,23,42,0.35)',
                              fontSize: '0.64rem',
                              color: '#CBD5E1',
                              cursor: 'pointer',
                            }}
                          >
                            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                              <Users size={9} color="#EF4444" />
                              <span>{sup.name}</span>
                            </span>
                            <span
                              style={{
                                fontSize: '0.58rem',
                                color: '#64748B',
                                fontFamily: 'monospace',
                              }}
                            >
                              {sup.id}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      );
    })}
  </div>
);
