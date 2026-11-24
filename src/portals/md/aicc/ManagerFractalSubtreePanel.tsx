/**
 * ManagerFractalSubtreePanel.tsx — Universal Bhakti 12-AM -> 108-Supervisor Explorer
 * White Caves Real Estate LLC — Works for ALL 108 Existing Division Managers in AICC-Sanctum
 * Standard: AEGIS Canonical Single Purpose File Law (< 350 lines, AEG-042)
 */

import React, { FC, useMemo, useState } from 'react';
import { ChevronDown, ChevronRight, Users, Layers } from 'lucide-react';
import {
  generateManagerFractalSubtree,
  BHAKTI_FRACTAL_CONSTANTS,
} from './formulas/bhaktiFractalLoop.formula';

export interface ManagerFractalSubtreePanelProps {
  deptSlot: number; // 1..12
  managerSlot: number; // 1..9
  managerCode: string; // MGR-DD-M
  managerName: string;
  roleTitle: string;
  onSelectSupervisor?: (supId: string, supName: string) => void;
}

export const ManagerFractalSubtreePanel: FC<ManagerFractalSubtreePanelProps> = ({
  deptSlot,
  managerSlot,
  managerCode,
  managerName,
  roleTitle,
  onSelectSupervisor,
}) => {
  const [expandedAmId, setExpandedAmId] = useState<string | null>(null);

  const assistantManagers = useMemo(
    () => generateManagerFractalSubtree(deptSlot, managerSlot, managerName.replace(/^AI\s+/i, '')),
    [deptSlot, managerSlot, managerName]
  );

  return (
    <div
      data-testid={`fractal-subtree-${managerCode}`}
      style={{
        marginTop: '12px',
        padding: '14px',
        borderRadius: '12px',
        backgroundColor: '#0F172A',
        border: '1px solid rgba(239, 68, 68, 0.25)',
        color: '#FFFFFF',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '10px',
          paddingBottom: '8px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        }}
      >
        <div>
          <div style={{ fontSize: '13px', fontWeight: 800, color: '#FFFFFF' }}>
            {managerName} <span style={{ color: '#EF4444' }}>({managerCode})</span>
          </div>
          <div style={{ fontSize: '11px', color: '#94A3B8' }}>{roleTitle}</div>
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '11px',
            fontWeight: 700,
            padding: '4px 10px',
            borderRadius: '9999px',
            backgroundColor: 'rgba(239, 68, 68, 0.14)',
            color: '#EF4444',
          }}
        >
          <Layers size={12} />
          <span>
            {BHAKTI_FRACTAL_CONSTANTS.ASSISTANT_MANAGERS_PER_MANAGER} AMs •{' '}
            {BHAKTI_FRACTAL_CONSTANTS.SUPERVISORS_PER_MANAGER} Supervisors
          </span>
        </div>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
          gap: '8px',
        }}
      >
        {assistantManagers.map(am => {
          const isOpen = expandedAmId === am.id;
          return (
            <div
              key={am.id}
              style={{
                backgroundColor: '#1E293B',
                border: isOpen
                  ? '1px solid rgba(239, 68, 68, 0.5)'
                  : '1px solid rgba(255, 255, 255, 0.06)',
                borderRadius: '8px',
                padding: '8px 10px',
              }}
            >
              <button
                type="button"
                onClick={() => setExpandedAmId(isOpen ? null : am.id)}
                data-testid={`am-toggle-${am.id}`}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  background: 'transparent',
                  border: 'none',
                  color: '#FFFFFF',
                  cursor: 'pointer',
                  padding: 0,
                  textAlign: 'left',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  {isOpen ? (
                    <ChevronDown size={13} color="#EF4444" />
                  ) : (
                    <ChevronRight size={13} color="#94A3B8" />
                  )}
                  <div>
                    <div style={{ fontSize: '12px', fontWeight: 700 }}>{am.name}</div>
                    <div style={{ fontSize: '10px', color: '#94A3B8', fontFamily: 'monospace' }}>
                      {am.id}
                    </div>
                  </div>
                </div>
                <span
                  style={{
                    fontSize: '10px',
                    fontWeight: 700,
                    color: '#10B981',
                    backgroundColor: 'rgba(16, 185, 129, 0.12)',
                    padding: '2px 6px',
                    borderRadius: '4px',
                  }}
                >
                  9 Sups
                </span>
              </button>

              {isOpen && (
                <div
                  style={{
                    marginTop: '8px',
                    paddingTop: '6px',
                    borderTop: '1px solid rgba(255, 255, 255, 0.06)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '4px',
                  }}
                >
                  {am.supervisors.map(sup => (
                    <div
                      key={sup.id}
                      onClick={() => onSelectSupervisor?.(sup.id, sup.name)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '4px 6px',
                        borderRadius: '4px',
                        backgroundColor: 'rgba(15, 23, 42, 0.6)',
                        fontSize: '11px',
                        cursor: 'pointer',
                      }}
                    >
                      <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                        <Users size={10} color="#EF4444" />
                        <span>{sup.name}</span>
                      </span>
                      <span style={{ fontSize: '9px', color: '#64748B', fontFamily: 'monospace' }}>
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
    </div>
  );
};

export default ManagerFractalSubtreePanel;
