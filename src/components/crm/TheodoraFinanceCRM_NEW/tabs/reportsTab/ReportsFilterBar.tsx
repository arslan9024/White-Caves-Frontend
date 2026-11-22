import React from 'react';
import {
  THEODORA_67_REPORTS,
  THEODORA_REPORT_CATEGORIES,
} from '../../../../../data/theodoraReportsRegistry';

interface ReportsFilterBarProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  showFavoritesOnly: boolean;
  onToggleFavoritesOnly: () => void;
  favoritesCount: number;
  selectedCategory: string;
  onSelectCategory: (categoryId: string) => void;
  onExportSummary: () => void;
}

export const ReportsFilterBar: React.FC<ReportsFilterBarProps> = ({
  searchQuery,
  onSearchChange,
  showFavoritesOnly,
  onToggleFavoritesOnly,
  favoritesCount,
  selectedCategory,
  onSelectCategory,
  onExportSummary,
}) => {
  return (
    <div
      style={{
        background: '#FFFFFF',
        border: '1px solid #E2E8F0',
        borderRadius: '14px',
        padding: '1rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.85rem',
        boxShadow: '0 1px 4px rgba(0,0,0,0.03)',
      }}
    >
      <div
        style={{
          display: 'flex',
          gap: '0.75rem',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Search Input */}
        <div style={{ position: 'relative', flex: '1', minWidth: '260px' }}>
          <span
            style={{
              position: 'absolute',
              left: '12px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'var(--text-secondary, #94A3B8)',
              fontSize: '0.9rem',
            }}
          >
            🔍
          </span>
          <input
            type="text"
            placeholder="Search by Report Name, ID (e.g. 3.14.R01), Category or Tag..."
            value={searchQuery}
            onChange={e => onSearchChange(e.target.value)}
            style={{
              width: '100%',
              padding: '9px 12px 9px 36px',
              borderRadius: '8px',
              border: '1px solid var(--border-color, #CBD5E1)',
              fontSize: '0.85rem',
              color: 'var(--text-primary, #1E293B)',
              outline: 'none',
              backgroundColor: 'var(--color-f8fafc, #F8FAFC)',
            }}
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              style={{
                position: 'absolute',
                right: '10px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'none',
                border: 'none',
                color: '#94A3B8',
                cursor: 'pointer',
                fontSize: '0.8rem',
              }}
            >
              ✕
            </button>
          )}
        </div>

        {/* Quick Filter Toggles */}
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <button
            onClick={onToggleFavoritesOnly}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 14px',
              borderRadius: '8px',
              border: showFavoritesOnly ? '1px solid #F59E0B' : '1px solid #E2E8F0',
              backgroundColor: showFavoritesOnly ? '#FEF3C7' : '#FFFFFF',
              color: showFavoritesOnly ? '#B45309' : '#475569',
              fontSize: '0.82rem',
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            <span>{showFavoritesOnly ? '★' : '☆'}</span>
            <span>Favorites Only ({favoritesCount})</span>
          </button>

          <button
            onClick={onExportSummary}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 14px',
              borderRadius: '8px',
              border: '1px solid #CBD5E1',
              backgroundColor: '#F1F5F9',
              color: '#334155',
              fontSize: '0.82rem',
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            <span>📥</span>
            <span>Export Summary</span>
          </button>
        </div>
      </div>

      {/* Category Pills Bar */}
      <div style={{ display: 'flex', gap: '6px', overflowX: 'auto', paddingBottom: '4px' }}>
        <button
          onClick={() => onSelectCategory('all')}
          style={{
            padding: '6px 12px',
            borderRadius: '999px',
            border: selectedCategory === 'all' ? '1.5px solid #2563EB' : '1px solid #E2E8F0',
            backgroundColor: selectedCategory === 'all' ? '#EFF6FF' : '#FFFFFF',
            color: selectedCategory === 'all' ? '#1D4ED8' : '#64748B',
            fontSize: '0.78rem',
            fontWeight: 700,
            cursor: 'pointer',
            whiteSpace: 'nowrap',
          }}
        >
          🌟 All Categories (67)
        </button>
        {THEODORA_REPORT_CATEGORIES.map(cat => {
          const count = THEODORA_67_REPORTS.filter(r => r.categoryKey === cat.id).length;
          const isSelected = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              style={{
                padding: '6px 12px',
                borderRadius: '999px',
                border: isSelected ? `1.5px solid ${cat.badgeColor}` : '1px solid #E2E8F0',
                backgroundColor: isSelected ? `${cat.badgeColor}15` : '#FFFFFF',
                color: isSelected ? cat.badgeColor : '#64748B',
                fontSize: '0.78rem',
                fontWeight: isSelected ? 800 : 600,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
              }}
            >
              <span>{cat.icon}</span>
              <span>{cat.name}</span>
              <span
                style={{
                  fontSize: '0.7rem',
                  opacity: 0.8,
                  background: 'rgba(0,0,0,0.06)',
                  padding: '1px 5px',
                  borderRadius: '4px',
                }}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
