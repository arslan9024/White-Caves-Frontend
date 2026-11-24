/**
 * Saved Searches Page
 * ───────────────────
 * Full CRUD interface for managing saved property search criteria.
 * Users can create, edit, delete, and check for new matches.
 */

import React, { useEffect, useState, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/store';
import {
  fetchSavedSearches,
  createSavedSearch,
  updateSavedSearch,
  deleteSavedSearch,
  checkSearchMatches,
  selectSavedSearches,
  selectSavedSearchesLoading,
  selectSavedSearchesError,
  selectMatchResults,
  clearError,
} from '../../store/slices/savedSearchesSlice';
import type { SavedSearch, SearchFilters } from '../../services/savedSearchesApi';
import '../RolePages.css';
import {
  btnPrimary,
  btnSecondary,
  SearchForm,
  SavedSearchCard,
  SavedSearchesEmpty,
} from './savedSearches/index';

export * from './savedSearches/index';

// ─── Main Page Component ─────────────────────────────────────────────

export const SavedSearchesPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const searches = useAppSelector(selectSavedSearches);
  const loading = useAppSelector(selectSavedSearchesLoading);
  const error = useAppSelector(selectSavedSearchesError);
  const matchResults = useAppSelector(selectMatchResults);

  const [showForm, setShowForm] = useState(false);
  const [editingSearch, setEditingSearch] = useState<SavedSearch | null>(null);
  const [checkingId, setCheckingId] = useState<string | null>(null);

  useEffect(() => {
    dispatch(fetchSavedSearches());
  }, [dispatch]);

  const handleCreate = useCallback(
    (name: string, filters: SearchFilters, alertEnabled: boolean) => {
      dispatch(createSavedSearch({ name, filters, alertEnabled }));
      setShowForm(false);
    },
    [dispatch]
  );

  const handleUpdate = useCallback(
    (name: string, filters: SearchFilters, alertEnabled: boolean) => {
      if (!editingSearch) return;
      dispatch(
        updateSavedSearch({
          id: editingSearch.id,
          updates: { name, filters, alertEnabled },
        })
      );
      setEditingSearch(null);
    },
    [dispatch, editingSearch]
  );

  const handleDelete = useCallback(
    (id: string) => {
      if (window.confirm('Delete this saved search?')) {
        dispatch(deleteSavedSearch(id));
      }
    },
    [dispatch]
  );

  const handleCheck = useCallback(
    async (id: string) => {
      setCheckingId(id);
      await dispatch(checkSearchMatches(id));
      setCheckingId(null);
    },
    [dispatch]
  );

  return (
    <div className="role-page no-sidebar">
      <div className="role-page-content full-width">
        <div
          className="page-header"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            flexWrap: 'wrap',
            gap: '1rem',
          }}
        >
          <div>
            <h1>🔍 Saved Searches</h1>
            <p>Save your search criteria and get notified when new properties match</p>
          </div>
          <button
            style={btnPrimary}
            onClick={() => setShowForm(true)}
            disabled={searches.length >= 20}
            title={searches.length >= 20 ? 'Maximum 20 saved searches' : undefined}
          >
            + New Search
          </button>
        </div>

        {/* Error */}
        {error && (
          <div
            style={{
              background: '#fef2f2',
              border: '1px solid #fecaca',
              borderRadius: '8px',
              padding: '0.75rem 1rem',
              color: '#EF4444',
              marginBottom: '1rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <span>{error}</span>
            <button
              onClick={() => dispatch(clearError())}
              style={{ ...btnSecondary, padding: '0.25rem 0.75rem' }}
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div
            style={{
              textAlign: 'center',
              padding: '3rem 0',
              color: 'var(--color-text-secondary, #6b7280)',
            }}
          >
            Loading saved searches…
          </div>
        )}

        {/* Empty state */}
        {!loading && searches.length === 0 && (
          <SavedSearchesEmpty onOpenForm={() => setShowForm(true)} />
        )}

        {/* Search list */}
        {!loading && searches.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {searches.map(search => (
              <SavedSearchCard
                key={search.id}
                search={search}
                matchResult={matchResults[search.id]}
                isChecking={checkingId === search.id}
                onCheck={handleCheck}
                onEdit={setEditingSearch}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}

        {/* Counter */}
        {searches.length > 0 && (
          <div
            style={{
              marginTop: '1rem',
              fontSize: '0.85rem',
              color: 'var(--color-text-secondary, #6b7280)',
              textAlign: 'center',
            }}
          >
            {searches.length} of 20 saved searches used
          </div>
        )}

        {/* Create / Edit form modal */}
        {showForm && <SearchForm onSave={handleCreate} onCancel={() => setShowForm(false)} />}
        {editingSearch && (
          <SearchForm
            initial={editingSearch}
            onSave={handleUpdate}
            onCancel={() => setEditingSearch(null)}
          />
        )}
      </div>
    </div>
  );
};

export default SavedSearchesPage;
