import React from 'react';
import type { SavedSearch } from '../../../services/savedSearchesApi';
import { cardStyle, badgeStyle, btnSecondary, btnDanger } from './SavedSearches.styles';
import { formatFilters } from './formatFilters';

export interface SavedSearchCardProps {
  search: SavedSearch;
  matchResult?: { newMatches: number } | null;
  isChecking: boolean;
  onCheck: (id: string) => void;
  onEdit: (search: SavedSearch) => void;
  onDelete: (id: string) => void;
}

export const SavedSearchCard: React.FC<SavedSearchCardProps> = ({
  search,
  matchResult,
  isChecking,
  onCheck,
  onEdit,
  onDelete,
}) => {
  return (
    <div style={cardStyle}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
        }}
      >
        <div>
          <h3 style={{ margin: 0, fontSize: '1.1rem' }}>{search.name}</h3>
          <p
            style={{
              margin: '0.25rem 0 0',
              fontSize: '0.9rem',
              color: 'var(--color-text-secondary, #6b7280)',
            }}
          >
            {formatFilters(search.filters)}
          </p>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem', flexShrink: 0 }}>
          {search.alertEnabled && (
            <span
              style={{
                ...badgeStyle,
                background: '#dbeafe',
                color: '#EF4444',
              }}
            >
              🔔 Alerts ON
            </span>
          )}
          <span
            style={{
              ...badgeStyle,
              background: '#f0fdf4',
              color: '#16a34a',
            }}
          >
            {search.matchCount} matches
          </span>
        </div>
      </div>

      {/* Match check result */}
      {matchResult && matchResult.newMatches > 0 && (
        <div
          style={{
            background: '#f0fdf4',
            border: '1px solid #bbf7d0',
            borderRadius: '8px',
            padding: '0.5rem 0.75rem',
            fontSize: '0.9rem',
            color: '#16a34a',
          }}
        >
          🎉 {matchResult.newMatches} new{' '}
          {matchResult.newMatches === 1 ? 'property' : 'properties'} found!
        </div>
      )}

      {/* Actions */}
      <div
        style={{
          display: 'flex',
          gap: '0.5rem',
          borderTop: '1px solid var(--color-border, #f3f4f6)',
          paddingTop: '0.75rem',
        }}
      >
        <button
          style={btnSecondary}
          onClick={() => onCheck(search.id)}
          disabled={isChecking}
        >
          {isChecking ? '⏳ Checking…' : '🔄 Check Matches'}
        </button>
        <button style={btnSecondary} onClick={() => onEdit(search)}>
          ✏️ Edit
        </button>
        <button style={btnDanger} onClick={() => onDelete(search.id)}>
          🗑️ Delete
        </button>
      </div>
    </div>
  );
};
