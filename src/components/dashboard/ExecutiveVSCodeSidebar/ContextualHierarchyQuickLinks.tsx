import React, { FC } from 'react';
import { CheckSquare, Briefcase, Home } from 'lucide-react';

interface ContextualHierarchyQuickLinksProps {
  activeDeptCode: string;
  onNavigateToView?: (route: string) => void;
}

export const ContextualHierarchyQuickLinks: FC<ContextualHierarchyQuickLinksProps> = ({
  activeDeptCode,
  onNavigateToView,
}) => (
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
      onClick={() => onNavigateToView?.(`/dashboard/REproperties/inventory?dept=${activeDeptCode}`)}
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
);
