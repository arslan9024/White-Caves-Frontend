/**
 * AddAutoReplyRuleModal.tsx — Modal for adding a new Nina AI Auto-Reply trigger rule
 * Single-purpose module (< 350 lines, AEG-042).
 */

import React, { type FC } from 'react';

export interface NewAutoReplyDraft {
  name: string;
  keywordsText: string;
  responseTemplate: string;
  intentTag: string;
  leadScoreBoost: number;
  dldInventoryLookup: boolean;
  escalationTarget: string;
}

interface AddAutoReplyRuleModalProps {
  draft: NewAutoReplyDraft;
  onChangeDraft: (next: NewAutoReplyDraft) => void;
  onSubmit: (e: React.FormEvent) => void;
  onClose: () => void;
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '6px',
  borderRadius: '6px',
  border: '1px solid var(--text-secondary, #CBD5E1)',
};

export const AddAutoReplyRuleModal: FC<AddAutoReplyRuleModalProps> = ({
  draft,
  onChangeDraft,
  onSubmit,
  onClose,
}) => (
  <div
    style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(0,0,0,0.5)',
      zIndex: 1000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <div
      style={{
        background: 'var(--white, #FFFFFF)',
        borderRadius: '16px',
        padding: '1.5rem',
        width: '90%',
        maxWidth: '500px',
      }}
    >
      <h3
        style={{
          margin: '0 0 1rem 0',
          fontSize: '1.15rem',
          fontWeight: 800,
          color: 'var(--color-06b6d4, #06B6D4)',
        }}
      >
        + Create Nina AI Auto-Reply Rule
      </h3>
      <form
        onSubmit={onSubmit}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '0.75rem',
          fontSize: '0.85rem',
        }}
      >
        <label>
          Rule Name:
          <input
            type="text"
            value={draft.name}
            onChange={e => onChangeDraft({ ...draft, name: e.target.value })}
            required
            style={inputStyle}
          />
        </label>
        <label>
          Keywords (comma separated):
          <input
            type="text"
            value={draft.keywordsText}
            onChange={e => onChangeDraft({ ...draft, keywordsText: e.target.value })}
            required
            style={inputStyle}
          />
        </label>
        <label>
          Response Template:
          <textarea
            value={draft.responseTemplate}
            onChange={e => onChangeDraft({ ...draft, responseTemplate: e.target.value })}
            rows={3}
            required
            style={inputStyle}
          />
        </label>
        <div
          style={{
            display: 'flex',
            gap: '0.5rem',
            justifyContent: 'flex-end',
            marginTop: '0.5rem',
          }}
        >
          <button
            type="button"
            onClick={onClose}
            style={{
              padding: '8px 14px',
              borderRadius: '8px',
              border: '1px solid var(--text-secondary, #CBD5E1)',
              background: 'var(--white, #FFFFFF)',
              cursor: 'pointer',
            }}
          >
            Cancel
          </button>
          <button
            type="submit"
            style={{
              padding: '8px 16px',
              borderRadius: '8px',
              border: 'none',
              background: 'var(--color-06b6d4, #06B6D4)',
              color: 'var(--white, #FFFFFF)',
              fontWeight: 800,
              cursor: 'pointer',
            }}
          >
            Save Rule
          </button>
        </div>
      </form>
    </div>
  </div>
);

export default AddAutoReplyRuleModal;
