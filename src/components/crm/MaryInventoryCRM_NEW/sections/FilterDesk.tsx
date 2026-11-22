import React from 'react';
import {
  WORKSPACE_AREAS,
  type AnalyticsKPIs,
  type ClusterEntry,
  type WorkspaceArea,
} from './types';

interface FilterDeskProps {
  activeWorkspace: WorkspaceArea;
  selectedAreaId: string;
  areaDropdownOpen: boolean;
  onToggleAreaDropdown: () => void;
  onSelectArea: (areaId: string) => void;
  searchTerm: string;
  onSearchTermChange: (value: string) => void;
  filterMultiOwnerOnly: boolean;
  onToggleMultiOwner: () => void;
  filterMultiPhoneOnly: boolean;
  onToggleMultiPhone: () => void;
  analyticsKPIs: AnalyticsKPIs;
  clusterList: ClusterEntry[];
  selectedClusterTag: string;
  onSelectClusterTag: (clusterName: string) => void;
}

export const FilterDesk: React.FC<FilterDeskProps> = ({
  activeWorkspace,
  selectedAreaId,
  areaDropdownOpen,
  onToggleAreaDropdown,
  onSelectArea,
  searchTerm,
  onSearchTermChange,
  filterMultiOwnerOnly,
  onToggleMultiOwner,
  filterMultiPhoneOnly,
  onToggleMultiPhone,
  analyticsKPIs,
  clusterList,
  selectedClusterTag,
  onSelectClusterTag,
}) => (
  <div
    style={{
      background: '#F8FAFC',
      border: '1px solid rgba(239, 68, 68, 0.25)',
      borderRadius: '16px',
      padding: '1.25rem',
      marginBottom: '1.5rem',
      boxShadow: '0 4px 12px rgba(0,0,0,0.02)',
    }}
  >
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1.2fr 2fr',
        gap: '1rem',
        marginBottom: '1rem',
      }}
    >
      <div style={{ position: 'relative' }}>
        <button
          onClick={onToggleAreaDropdown}
          style={{
            width: '100%',
            padding: '11px 14px',
            borderRadius: '10px',
            border: '2px solid #EF4444',
            background: '#FFFFFF',
            fontSize: '0.88rem',
            fontWeight: 800,
            color: '#1E293B',
            textAlign: 'left',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            cursor: 'pointer',
          }}
        >
          <span>{activeWorkspace.name}</span>
          <span style={{ fontSize: '0.75rem', color: 'var(--accent-red, #EF4444)' }}>
            {areaDropdownOpen ? '▲' : '▼ Select Area'}
          </span>
        </button>

        {areaDropdownOpen && (
          <div
            style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              right: 0,
              marginTop: '4px',
              background: '#FFFFFF',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              borderRadius: '10px',
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
              zIndex: 100,
              padding: '8px',
              maxHeight: '260px',
              overflowY: 'auto',
            }}
          >
            {WORKSPACE_AREAS.map(area => (
              <div
                key={area.id}
                onClick={() => onSelectArea(area.id)}
                style={{
                  padding: '8px 10px',
                  borderRadius: '6px',
                  fontSize: '0.82rem',
                  fontWeight: selectedAreaId === area.id ? 800 : 600,
                  background: selectedAreaId === area.id ? 'rgba(239, 68, 68, 0.1)' : 'transparent',
                  color: selectedAreaId === area.id ? '#EF4444' : '#334155',
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
              >
                <span>{area.name}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <input
        type="text"
        placeholder="🔍 Search P-Number, Plot No, Cluster, Landlord Name, Phone, or Title Deed Ref..."
        value={searchTerm}
        onChange={e => onSearchTermChange(e.target.value)}
        style={{
          width: '100%',
          padding: '11px 14px',
          borderRadius: '10px',
          border: '1px solid #CBD5E1',
          fontSize: '0.86rem',
          fontWeight: 600,
          outline: 'none',
          boxShadow: '0 2px 6px rgba(0,0,0,0.02)',
        }}
      />
    </div>

    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '0.75rem',
        alignItems: 'center',
        marginBottom: '1rem',
      }}
    >
      <span style={{ fontSize: '0.78rem', fontWeight: 800, color: 'var(--color-475569, #475569)' }}>
        Data Quality Filters:
      </span>
      <button
        onClick={onToggleMultiOwner}
        style={{
          background: filterMultiOwnerOnly ? '#EC4899' : '#FFFFFF',
          color: filterMultiOwnerOnly ? '#FFFFFF' : '#475569',
          border: '1px solid #CBD5E1',
          borderRadius: '8px',
          padding: '5px 12px',
          fontSize: '0.78rem',
          fontWeight: 800,
          cursor: 'pointer',
        }}
      >
        {filterMultiOwnerOnly
          ? '✓ Multi-Owner Active'
          : `Multi-Owner Properties (${analyticsKPIs.multiOwnersCount})`}
      </button>

      <button
        onClick={onToggleMultiPhone}
        style={{
          background: filterMultiPhoneOnly ? '#10B981' : '#FFFFFF',
          color: filterMultiPhoneOnly ? '#FFFFFF' : '#475569',
          border: '1px solid #CBD5E1',
          borderRadius: '8px',
          padding: '5px 12px',
          fontSize: '0.78rem',
          fontWeight: 800,
          cursor: 'pointer',
        }}
      >
        {filterMultiPhoneOnly
          ? '✓ Multi-Phone Active'
          : `Multi-Phone Owners (${analyticsKPIs.multiPhoneCount})`}
      </button>
    </div>

    <div>
      <span
        style={{
          fontSize: '0.78rem',
          fontWeight: 800,
          color: 'var(--color-475569, #475569)',
          display: 'block',
          marginBottom: '6px',
        }}
      >
        DAMAC Hills 2 Cluster Directory ({clusterList.length - 1} Clusters):
      </span>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '5px',
          maxHeight: '110px',
          overflowY: 'auto',
        }}
      >
        {clusterList.map(c => {
          const isSelected = selectedClusterTag === c.name;
          return (
            <button
              key={c.name}
              onClick={() => onSelectClusterTag(c.name)}
              style={{
                background: isSelected ? '#EF4444' : '#FFFFFF',
                color: isSelected ? '#FFFFFF' : '#334155',
                border: isSelected ? '1px solid #EF4444' : '1px solid #CBD5E1',
                borderRadius: '6px',
                padding: '3px 8px',
                fontSize: '0.73rem',
                fontWeight: 800,
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
            >
              {c.name} ({c.count})
            </button>
          );
        })}
      </div>
    </div>
  </div>
);
