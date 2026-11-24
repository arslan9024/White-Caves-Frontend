import React from 'react';
import { btnPrimary } from './SavedSearches.styles';

export interface SavedSearchesEmptyProps {
  onOpenForm: () => void;
}

export const SavedSearchesEmpty: React.FC<SavedSearchesEmptyProps> = ({ onOpenForm }) => {
  return (
    <div
      style={{
        textAlign: 'center',
        padding: '4rem 2rem',
        background: 'var(--color-surface, #f9fafb)',
        borderRadius: '12px',
        border: '2px dashed var(--color-border, #e5e7eb)',
      }}
    >
      <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔍</div>
      <h3 style={{ marginBottom: '0.5rem' }}>No saved searches yet</h3>
      <p
        style={{
          color: 'var(--color-text-secondary, #6b7280)',
          maxWidth: '420px',
          margin: '0 auto 1.5rem',
        }}
      >
        Create a saved search to track properties matching your criteria. You&apos;ll be
        notified when new matches appear.
      </p>
      <button style={btnPrimary} onClick={onOpenForm}>
        Create Your First Search
      </button>
    </div>
  );
};
