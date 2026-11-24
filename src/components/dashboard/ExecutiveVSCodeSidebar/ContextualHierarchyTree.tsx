/**
 * ContextualHierarchyTree.tsx
 * White Caves Real Estate LLC — 3-Tier Intelligent Hierarchy Tree (DMS ↔ TMS ↔ ERMS Unified)
 * Enforces the 12 Locked Canonical Department Names via BHAKTI_LOCKED_DEPARTMENTS_12.
 * Standard: AEGIS Canonical Architecture & Single Purpose File Law (< 350 lines, AEG-042).
 */

import React, { FC, useState, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import {
  Building2,
  Network,
  CheckSquare,
  Coins,
  ShieldCheck,
  ChevronRight,
  ChevronDown,
  Users,
  Briefcase,
  Home,
} from 'lucide-react';
import {
  BHAKTI_LOCKED_DEPARTMENTS_12,
  generateManagerFractalSubtree,
} from '../../../portals/md/aicc/formulas/bhaktiFractalLoop.formula';
import { SANCTUM_DEPARTMENTS_DATA } from '../../../portals/md/aicc/sanctum-data';
import { setSelectedDepartment } from '../../../redux/slices/relationalSidebarSlice';

export type ManagementSystemCode = 'DMS' | 'ERMS' | 'TMS' | 'FMS' | 'RMS';

export interface ContextualHierarchyTreeProps {
  selectedDeptCode?: string;
  onSelectDepartment?: (deptCode: string) => void;
  onNavigateToView?: (route: string) => void;
}

const SYSTEMS: Array<{ code: ManagementSystemCode; icon: React.ReactNode; color: string }> = [
  { code: 'DMS', icon: <Building2 size={12} color="#EF4444" />, color: '#EF4444' },
  { code: 'ERMS', icon: <Network size={12} color="#3B82F6" />, color: '#3B82F6' },
  { code: 'TMS', icon: <CheckSquare size={12} color="#10B981" />, color: '#10B981' },
  { code: 'FMS', icon: <Coins size={12} color="#F59E0B" />, color: '#F59E0B' },
  { code: 'RMS', icon: <ShieldCheck size={12} color="#8B5CF6" />, color: '#8B5CF6' },
];

export const ContextualHierarchyTree: FC<ContextualHierarchyTreeProps> = ({
  selectedDeptCode = 'DEPT-05',
  onSelectDepartment,
  onNavigateToView,
}) => {
  const dispatch = useDispatch();
  const [activeSystem, setActiveSystem] = useState<ManagementSystemCode>('DMS');
  const [activeDeptCode, setActiveDeptCode] = useState<string>(selectedDeptCode);
  const [expandedMgrCode, setExpandedMgrCode] = useState<string | null>(null);
  const [expandedAmId, setExpandedAmId] = useState<string | null>(null);

  const lockedDept = useMemo(
    () =>
      BHAKTI_LOCKED_DEPARTMENTS_12.find(d => d.deptCode === activeDeptCode) ||
      BHAKTI_LOCKED_DEPARTMENTS_12[0],
    [activeDeptCode]
  );

  const sanctumDept = useMemo(
    () =>
      SANCTUM_DEPARTMENTS_DATA.find(d => d.deptCode === activeDeptCode) ||
      SANCTUM_DEPARTMENTS_DATA[0],
    [activeDeptCode]
  );

  const handleDeptChange = (deptCode: string) => {
    setActiveDeptCode(deptCode);
    setExpandedMgrCode(null);
    setExpandedAmId(null);
    dispatch(setSelectedDepartment(deptCode));
    onSelectDepartment?.(deptCode);
  };

  return (
    <div
      data-testid="contextual-hierarchy-tree"
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        padding: '6px 4px',
        color: '#FFFFFF',
        fontSize: '0.73rem',
      }}
    >
      {/* Tier 1: Management System Switcher */}
      <div
        style={{
          display: 'flex',
          gap: '4px',
          overflowX: 'auto',
          paddingBottom: '6px',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
        }}
      >
        {SYSTEMS.map(sys => {
          const active = activeSystem === sys.code;
          return (
            <button
              key={sys.code}
              type="button"
              onClick={() => setActiveSystem(sys.code)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                padding: '4px 7px',
                borderRadius: '6px',
                border: active ? `1px solid ${sys.color}` : '1px solid rgba(255,255,255,0.06)',
                backgroundColor: active ? 'rgba(239,68,68,0.12)' : 'rgba(15,23,42,0.6)',
                color: active ? '#FFFFFF' : '#94A3B8',
                cursor: 'pointer',
                fontWeight: active ? 700 : 500,
                fontSize: '0.67rem',
              }}
            >
              {sys.icon}
              <span>{sys.code}</span>
            </button>
          );
        })}
      </div>

      {/* Tier 2: Locked 12-Department Selector */}
      <select
        value={activeDeptCode}
        onChange={e => handleDeptChange(e.target.value)}
        data-testid="locked-dept-selector"
        style={{
          background: '#0F172A',
          border: '1px solid rgba(239,68,68,0.35)',
          borderRadius: '6px',
          color: '#FFFFFF',
          padding: '6px 8px',
          fontSize: '0.71rem',
          fontWeight: 600,
          outline: 'none',
          cursor: 'pointer',
        }}
      >
        {BHAKTI_LOCKED_DEPARTMENTS_12.map(d => (
          <option key={d.deptCode} value={d.deptCode}>
            {d.deptCode}: {d.name}
          </option>
        ))}
      </select>

      {/* Level 1 Director Leaf */}
      {sanctumDept && (
        <div
          onClick={() => onNavigateToView?.(`/dashboard/departments/${lockedDept.deptCode}`)}
          style={{
            padding: '7px 8px',
            borderRadius: '8px',
            backgroundColor: 'rgba(239,68,68,0.1)',
            border: '1px solid rgba(239,68,68,0.28)',
            cursor: 'pointer',
          }}
        >
          <div style={{ fontWeight: 800, color: '#FFFFFF' }}>
            {sanctumDept.director.name}{' '}
            <span style={{ color: '#EF4444' }}>({sanctumDept.director.code})</span>
          </div>
          <div style={{ fontSize: '0.65rem', color: '#CBD5E1' }}>
            {sanctumDept.director.roleTitle}
          </div>
        </div>
      )}

      {/* Level 2 -> Level 3 -> Level 4 Tree (9 Managers -> 12 AMs -> 9 Supervisors) */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        {sanctumDept?.managers.map((mgr, mIdx) => {
          const isMgrOpen = expandedMgrCode === mgr.code;
          const amList = isMgrOpen
            ? generateManagerFractalSubtree(
                lockedDept.slot,
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
                onClick={() => setExpandedMgrCode(isMgrOpen ? null : mgr.code)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                }}
              >
                <div
                  style={{ display: 'flex', alignItems: 'center', gap: '5px', overflow: 'hidden' }}
                >
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
                          onClick={() => setExpandedAmId(isAmOpen ? null : am.id)}
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

      {/* Quick Cross-System Links for Selected Department */}
      <div style={{ display: 'flex', gap: '4px', marginTop: '4px' }}>
        <button
          type="button"
          onClick={() => onNavigateToView?.(`/dashboard/tasks/catalog?dept=${activeDeptCode}`)}
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '4px',
            padding: '5px',
            borderRadius: '6px',
            backgroundColor: 'rgba(16,185,129,0.12)',
            border: '1px solid rgba(16,185,129,0.25)',
            color: '#34D399',
            cursor: 'pointer',
            fontSize: '0.66rem',
            fontWeight: 700,
          }}
        >
          <CheckSquare size={11} /> TMS Tasks
        </button>
        <button
          type="button"
          onClick={() => onNavigateToView?.(`/dashboard/deals/pipeline?dept=${activeDeptCode}`)}
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '4px',
            padding: '5px',
            borderRadius: '6px',
            backgroundColor: 'rgba(59,130,246,0.12)',
            border: '1px solid rgba(59,130,246,0.25)',
            color: '#60A5FA',
            cursor: 'pointer',
            fontSize: '0.66rem',
            fontWeight: 700,
          }}
        >
          <Briefcase size={11} /> Deals
        </button>
        <button
          type="button"
          onClick={() =>
            onNavigateToView?.(`/dashboard/REproperties/inventory?dept=${activeDeptCode}`)
          }
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '4px',
            padding: '5px',
            borderRadius: '6px',
            backgroundColor: 'rgba(245,158,11,0.12)',
            border: '1px solid rgba(245,158,11,0.25)',
            color: '#FBBF24',
            cursor: 'pointer',
            fontSize: '0.66rem',
            fontWeight: 700,
          }}
        >
          <Home size={11} /> Assets
        </button>
      </div>
    </div>
  );
};

export default ContextualHierarchyTree;
