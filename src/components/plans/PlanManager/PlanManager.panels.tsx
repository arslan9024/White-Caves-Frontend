/**
 * PlanManager — Panels Layer (Mary Allen Wilkes Architecture)
 * Modular presentation panels for list views, filter controls, and stats cards
 */

import React from 'react';
import { Plus, Search, Trash2, Edit2, RefreshCw, Wand2, Merge2 } from 'lucide-react';
import type { PlanItem, PlanStats } from './PlanManager.types';

export const PlanStatsHeader: React.FC<{ stats: PlanStats | null }> = ({ stats }) => {
  if (!stats) return null;
  return (
    <div
      className="plan-stats-header"
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
        gap: '1rem',
        marginBottom: '1.25rem',
      }}
    >
      <div
        style={{
          background: '#FFFFFF',
          padding: '1rem',
          borderRadius: '8px',
          border: '1px solid #E2E8F0',
        }}
      >
        <div style={{ fontSize: '0.75rem', color: '#64748B' }}>TOTAL PLANS</div>
        <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#1E293B', marginTop: 4 }}>
          {stats.total}
        </div>
      </div>
      <div
        style={{
          background: '#FFFFFF',
          padding: '1rem',
          borderRadius: '8px',
          border: '1px solid #E2E8F0',
        }}
      >
        <div style={{ fontSize: '0.75rem', color: '#64748B' }}>IN PROGRESS</div>
        <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#D97706', marginTop: 4 }}>
          {stats.inProgress}
        </div>
      </div>
      <div
        style={{
          background: '#FFFFFF',
          padding: '1rem',
          borderRadius: '8px',
          border: '1px solid #E2E8F0',
        }}
      >
        <div style={{ fontSize: '0.75rem', color: '#64748B' }}>COMPLETED</div>
        <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#16A34A', marginTop: 4 }}>
          {stats.completed}
        </div>
      </div>
      <div
        style={{
          background: '#FFFFFF',
          padding: '1rem',
          borderRadius: '8px',
          border: '1px solid #E2E8F0',
        }}
      >
        <div style={{ fontSize: '0.75rem', color: '#64748B' }}>DRAFTS</div>
        <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#64748B', marginTop: 4 }}>
          {stats.drafts}
        </div>
      </div>
    </div>
  );
};

export const PlanControlsBar: React.FC<{
  searchQuery: string;
  onSearchChange: (q: string) => void;
  filterStatus: string;
  onFilterChange: (s: string) => void;
  onRefresh: () => void;
  onCreateNew: () => void;
  onOpenMerge: () => void;
}> = ({
  searchQuery,
  onSearchChange,
  filterStatus,
  onFilterChange,
  onRefresh,
  onCreateNew,
  onOpenMerge,
}) => (
  <div
    className="plan-controls-bar"
    style={{
      display: 'flex',
      gap: '0.75rem',
      flexWrap: 'wrap',
      marginBottom: '1.25rem',
      alignItems: 'center',
    }}
  >
    <div style={{ flex: 1, position: 'relative', minWidth: '220px' }}>
      <Search size={16} style={{ position: 'absolute', left: 10, top: 10, color: '#94A3B8' }} />
      <input
        type="text"
        placeholder="Search strategic & technical plans..."
        value={searchQuery}
        onChange={e => onSearchChange(e.target.value)}
        style={{
          width: '100%',
          padding: '8px 10px 8px 34px',
          borderRadius: '6px',
          border: '1px solid #CBD5E1',
          fontSize: '0.85rem',
          boxSizing: 'border-box',
        }}
      />
    </div>

    <select
      value={filterStatus}
      onChange={e => onFilterChange(e.target.value)}
      style={{
        padding: '8px 12px',
        borderRadius: '6px',
        border: '1px solid #CBD5E1',
        fontSize: '0.85rem',
      }}
    >
      <option value="all">All Statuses</option>
      <option value="draft">Draft</option>
      <option value="in_progress">In Progress</option>
      <option value="completed">Completed</option>
    </select>

    <button
      onClick={onRefresh}
      style={{
        padding: '8px 12px',
        borderRadius: '6px',
        border: '1px solid #CBD5E1',
        background: '#FFFFFF',
        cursor: 'pointer',
      }}
      title="Refresh"
    >
      <RefreshCw size={16} />
    </button>
    <button
      onClick={onOpenMerge}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 6,
        padding: '8px 14px',
        borderRadius: '6px',
        border: '1px solid #CBD5E1',
        background: '#FFFFFF',
        fontWeight: 700,
        fontSize: '0.82rem',
        cursor: 'pointer',
      }}
    >
      <Merge2 size={16} /> Merge Plans
    </button>
    <button
      onClick={onCreateNew}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 6,
        padding: '8px 16px',
        borderRadius: '6px',
        border: 'none',
        background: '#B03737',
        color: '#FFFFFF',
        fontWeight: 800,
        fontSize: '0.82rem',
        cursor: 'pointer',
      }}
    >
      <Plus size={16} /> New Plan
    </button>
  </div>
);

export const PlanGridList: React.FC<{
  plans: PlanItem[];
  selectedPlans: Set<string>;
  onToggleSelect: (id: string) => void;
  onEdit: (plan: PlanItem) => void;
  onDelete: (id: string) => void;
}> = ({ plans, selectedPlans, onToggleSelect, onEdit, onDelete }) => {
  if (plans.length === 0) {
    return (
      <div
        style={{
          textAlign: 'center',
          padding: '3rem 1rem',
          background: '#FFFFFF',
          borderRadius: '8px',
          border: '1px solid #E2E8F0',
          color: '#64748B',
        }}
      >
        <Wand2 size={32} style={{ color: '#CBD5E1', marginBottom: 8 }} />
        <p style={{ margin: 0, fontSize: '0.9rem' }}>
          No plans match the search or filter criteria.
        </p>
      </div>
    );
  }

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '1rem',
      }}
    >
      {plans.map(p => (
        <div
          key={p.id}
          style={{
            background: '#FFFFFF',
            borderRadius: '8px',
            border: '1px solid #E2E8F0',
            padding: '1rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <div
              style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}
            >
              <h4 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 800, color: '#1E293B' }}>
                {p.title}
              </h4>
              <input
                type="checkbox"
                checked={selectedPlans.has(p.id)}
                onChange={() => onToggleSelect(p.id)}
              />
            </div>
            {p.description && (
              <p style={{ fontSize: '0.8rem', color: '#64748B', marginTop: 6 }}>{p.description}</p>
            )}
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: 12,
              paddingTop: 8,
              borderTop: '1px solid #F1F5F9',
            }}
          >
            <span
              style={{
                fontSize: '0.72rem',
                fontWeight: 800,
                padding: '2px 6px',
                borderRadius: 4,
                background: '#F1F5F9',
                color: '#475569',
              }}
            >
              {p.status}
            </span>
            <div style={{ display: 'flex', gap: 6 }}>
              <button
                onClick={() => onEdit(p)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#475569' }}
              >
                <Edit2 size={14} />
              </button>
              <button
                onClick={() => onDelete(p.id)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#DC2626' }}
              >
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
