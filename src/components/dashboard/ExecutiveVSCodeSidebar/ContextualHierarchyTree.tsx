/**
 * ContextualHierarchyTree.tsx
 * White Caves Real Estate LLC — 3-Tier Intelligent Hierarchy Tree (DMS ↔ TMS ↔ ERMS Unified)
 * Enforces the 12 Locked Canonical Department Names via BHAKTI_LOCKED_DEPARTMENTS_12.
 * Standard: AEGIS Canonical Architecture & Single Purpose File Law (< 350 lines, AEG-042).
 */

import React, { FC, useState, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { Building2, Network, CheckSquare, Coins, ShieldCheck } from 'lucide-react';
import { BHAKTI_LOCKED_DEPARTMENTS_12 } from '../../../portals/md/aicc/formulas/bhaktiFractalLoop.formula';
import { SANCTUM_DEPARTMENTS_DATA } from '../../../portals/md/aicc/sanctum-data';
import { setSelectedDepartment } from '../../../redux/slices/relationalSidebarSlice';
import { ContextualHierarchyManagerBranch } from './ContextualHierarchyManagerBranch';
import { ContextualHierarchyQuickLinks } from './ContextualHierarchyQuickLinks';

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
      <ContextualHierarchyManagerBranch
        deptSlot={lockedDept.slot}
        managers={sanctumDept?.managers ?? []}
        expandedMgrCode={expandedMgrCode}
        expandedAmId={expandedAmId}
        onToggleManager={setExpandedMgrCode}
        onToggleAm={setExpandedAmId}
        onNavigateToView={onNavigateToView}
      />

      {/* Quick Cross-System Links for Selected Department */}
      <ContextualHierarchyQuickLinks
        activeDeptCode={activeDeptCode}
        onNavigateToView={onNavigateToView}
      />
    </div>
  );
};

export default ContextualHierarchyTree;
