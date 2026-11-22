import React, { useState } from 'react';
import type { RuleFormState } from './types';

export interface RuleFormProps {
  form: RuleFormState;
  onChange: (key: keyof RuleFormState, value: string | boolean) => void;
  onSubmit: () => void;
  onCancel: () => void;
  submitLabel: string;
  submitError: string | null;
  submitting: boolean;
}

const labelStyle: React.CSSProperties = {
  fontSize: 12,
  color: 'var(--text-secondary, #9ca3af)',
  display: 'block',
  marginBottom: 4,
};

const inputStyle: React.CSSProperties = {
  width: '100%',
  background: 'rgba(255,255,255,0.06)',
  border: '1px solid rgba(255,255,255,0.12)',
  borderRadius: 6,
  color: '#f5f5f0',
  padding: '6px 10px',
  fontSize: 13,
  boxSizing: 'border-box',
};

export function RuleForm({
  form,
  onChange,
  onSubmit,
  onCancel,
  submitLabel,
  submitError,
  submitting,
}: RuleFormProps): React.ReactElement {
  const [seqError, setSeqError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      JSON.parse(form.channelSequence);
      setSeqError(null);
    } catch {
      setSeqError('channelSequence must be valid JSON');
      return;
    }
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div>
        <label style={labelStyle}>Name *</label>
        <input
          required
          value={form.name}
          onChange={e => onChange('name', e.target.value)}
          placeholder="e.g. Hot Lead Rapid Sequence"
          style={inputStyle}
          aria-label="Rule name"
        />
      </div>

      <div>
        <label style={labelStyle}>Description</label>
        <input
          value={form.description}
          onChange={e => onChange('description', e.target.value)}
          placeholder="Optional description"
          style={inputStyle}
          aria-label="Description"
        />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <div>
          <label style={labelStyle}>Priority (higher = runs first)</label>
          <input
            type="number"
            min={0}
            value={form.priority}
            onChange={e => onChange('priority', e.target.value)}
            style={inputStyle}
            aria-label="Priority"
          />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, paddingTop: 20 }}>
          <input
            id="isActive"
            type="checkbox"
            checked={form.isActive}
            onChange={e => onChange('isActive', e.target.checked)}
            aria-label="Active"
          />
          <label htmlFor="isActive" style={{ fontSize: 13, color: 'var(--color-f5f5f0, #f5f5f0)' }}>
            Active
          </label>
        </div>
      </div>

      <div>
        <label style={labelStyle}>Lead Tiers (comma-separated: hot, warm, cold, inactive)</label>
        <input
          value={form.leadTiers}
          onChange={e => onChange('leadTiers', e.target.value)}
          placeholder="hot, warm  (leave empty to match all tiers)"
          style={inputStyle}
          aria-label="Lead tiers"
        />
      </div>

      <div>
        <label style={labelStyle}>Channel Sequence (JSON array of steps)</label>
        <textarea
          value={form.channelSequence}
          onChange={e => onChange('channelSequence', e.target.value)}
          rows={6}
          style={{ ...inputStyle, fontFamily: 'monospace', resize: 'vertical' }}
          aria-label="Channel sequence JSON"
        />
        {seqError && (
          <div style={{ color: 'var(--color-f87171, #f87171)', fontSize: 12, marginTop: 4 }}>
            {seqError}
          </div>
        )}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <div>
          <label style={labelStyle}>Daily cap per lead</label>
          <input
            type="number"
            min={1}
            value={form.dailyCapPerLead}
            onChange={e => onChange('dailyCapPerLead', e.target.value)}
            style={inputStyle}
            aria-label="Daily cap per lead"
          />
        </div>
        <div>
          <label style={labelStyle}>Cooldown hours</label>
          <input
            type="number"
            min={0}
            value={form.cooldownHours}
            onChange={e => onChange('cooldownHours', e.target.value)}
            style={inputStyle}
            aria-label="Cooldown hours"
          />
        </div>
      </div>

      {submitError && (
        <div
          style={{
            color: 'var(--color-f87171, #f87171)',
            fontSize: 13,
            padding: '6px 10px',
            background: 'rgba(239,68,68,0.1)',
            borderRadius: 6,
          }}
        >
          {submitError}
        </div>
      )}

      <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
        <button
          type="button"
          onClick={onCancel}
          style={{
            background: 'rgba(255,255,255,0.06)',
            color: '#f5f5f0',
            border: '1px solid rgba(255,255,255,0.12)',
            borderRadius: 6,
            padding: '7px 16px',
            cursor: 'pointer',
          }}
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={submitting}
          style={{
            background: '#c9a84c',
            color: '#0a0a0a',
            border: 'none',
            borderRadius: 6,
            padding: '7px 16px',
            fontWeight: 700,
            cursor: submitting ? 'not-allowed' : 'pointer',
          }}
        >
          {submitting ? 'Saving…' : submitLabel}
        </button>
      </div>
    </form>
  );
}
