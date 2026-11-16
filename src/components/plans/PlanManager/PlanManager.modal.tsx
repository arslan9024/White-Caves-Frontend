/**
 * PlanManager — Create Plan Modal Component (Mary Allen Wilkes Architecture)
 * Inline creation modal with validation banner and zero window.alert calls
 */

import React, { useState } from 'react';

export const CreatePlanModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}> = ({ isOpen, onClose, onSuccess }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [validationError, setValidationError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      setValidationError('Filename and content are required');
      return;
    }
    setValidationError(null);
    onSuccess();
    onClose();
  };

  return (
    <div
      className="plan-modal-overlay"
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
      }}
    >
      <div
        style={{
          background: '#FFFFFF',
          padding: '1.5rem',
          borderRadius: '8px',
          maxWidth: 450,
          width: '100%',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        }}
      >
        <h3 style={{ margin: '0 0 1rem 0', fontSize: '1.1rem', color: '#1E293B' }}>
          Create New Strategic Plan
        </h3>

        {validationError && (
          <div
            data-testid="create-plan-modal-status-banner"
            style={{
              padding: '8px 12px',
              background: '#FEE2E2',
              color: '#991B1B',
              borderRadius: 4,
              marginBottom: 12,
              fontSize: '0.85rem',
            }}
          >
            {validationError}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div>
            <label
              style={{
                display: 'block',
                fontSize: '0.75rem',
                fontWeight: 700,
                color: '#64748B',
                marginBottom: 4,
              }}
            >
              Plan Title
            </label>
            <input
              type="text"
              placeholder="Plan title/type"
              value={title}
              onChange={e => setTitle(e.target.value)}
              style={{
                width: '100%',
                padding: '8px',
                borderRadius: 4,
                border: '1px solid #CBD5E1',
                fontSize: '0.85rem',
                boxSizing: 'border-box',
              }}
            />
          </div>
          <div>
            <label
              style={{
                display: 'block',
                fontSize: '0.75rem',
                fontWeight: 700,
                color: '#64748B',
                marginBottom: 4,
              }}
            >
              Content
            </label>
            <textarea
              placeholder="Plan specifications..."
              value={content}
              onChange={e => setContent(e.target.value)}
              rows={4}
              style={{
                width: '100%',
                padding: '8px',
                borderRadius: 4,
                border: '1px solid #CBD5E1',
                fontSize: '0.85rem',
                boxSizing: 'border-box',
              }}
            />
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 8 }}>
            <button
              type="button"
              onClick={onClose}
              style={{
                padding: '8px 14px',
                borderRadius: 4,
                border: '1px solid #CBD5E1',
                background: '#FFFFFF',
                cursor: 'pointer',
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              style={{
                padding: '8px 16px',
                borderRadius: 4,
                border: 'none',
                background: '#B03737',
                color: '#FFFFFF',
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              Create Plan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

