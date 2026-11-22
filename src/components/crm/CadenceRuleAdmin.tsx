/**
 * CadenceRuleAdmin — Admin UI for managing dynamic cadence rules
 *
 * Allows managers/admins/owners to:
 *   - View all cadence rules with status, priority, and tier coverage
 *   - Create new rules with channel sequence steps
 *   - Toggle rules active/inactive
 *   - Edit existing rules
 *
 * Routes consumed:
 *   GET    /api/follow-ups/rules
 *   POST   /api/follow-ups/rules
 *   PATCH  /api/follow-ups/rules/:id
 */

import React, { useState, useEffect, useCallback } from 'react';
import { authFetch } from '../../utils/authFetch';
import type { CadenceRule, FormMode, RuleFormState } from './cadenceRuleAdmin/types';
import { DEFAULT_FORM, formToPayload, ruleToForm } from './cadenceRuleAdmin/helpers';
import { RuleForm } from './cadenceRuleAdmin/RuleForm';
import { RulesTable } from './cadenceRuleAdmin/RulesTable';

export default function CadenceRuleAdmin(): React.ReactElement {
  const [rules, setRules] = useState<CadenceRule[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  const [formMode, setFormMode] = useState<FormMode>('idle');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<RuleFormState>(DEFAULT_FORM);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const [togglingId, setTogglingId] = useState<string | null>(null);

  // ── Load rules ───────────────────────────────────────────────────────
  const loadRules = useCallback(async () => {
    setLoading(true);
    setLoadError(null);
    try {
      const res = await authFetch('/api/follow-ups/rules');
      if (!res.ok) {
        const json = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(json.error ?? 'Failed to load cadence rules');
      }
      const json = (await res.json()) as { data: CadenceRule[] };
      setRules(json.data ?? []);
    } catch (err) {
      setLoadError(err instanceof Error ? err.message : 'Failed to load cadence rules');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadRules();
  }, [loadRules]);

  // ── Toggle active/inactive ────────────────────────────────────────────
  const handleToggle = useCallback(async (id: string, active: boolean) => {
    setTogglingId(id);
    try {
      const res = await authFetch(`/api/follow-ups/rules/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: active }),
      });
      if (!res.ok) {
        const json = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(json.error ?? 'Failed to update rule');
      }
      const json = (await res.json()) as { data: CadenceRule };
      setRules(prev => prev.map(r => (r.id === id ? json.data : r)));
    } catch (err) {
      setLoadError(err instanceof Error ? err.message : 'Failed to update rule');
    } finally {
      setTogglingId(null);
    }
  }, []);

  // ── Open create form ──────────────────────────────────────────────────
  const handleOpenCreate = () => {
    setForm(DEFAULT_FORM);
    setSubmitError(null);
    setEditingId(null);
    setFormMode('creating');
  };

  // ── Open edit form ────────────────────────────────────────────────────
  const handleOpenEdit = (rule: CadenceRule) => {
    setForm(ruleToForm(rule));
    setSubmitError(null);
    setEditingId(rule.id);
    setFormMode('editing');
  };

  // ── Handle form field change ──────────────────────────────────────────
  const handleFormChange = (key: keyof RuleFormState, value: string | boolean) => {
    setForm(prev => ({ ...prev, [key]: value }));
  };

  // ── Submit create/edit ────────────────────────────────────────────────
  const handleSubmit = useCallback(async () => {
    setSubmitting(true);
    setSubmitError(null);
    try {
      let payload: Record<string, unknown>;
      try {
        payload = formToPayload(form);
      } catch {
        setSubmitError('channelSequence must be valid JSON');
        setSubmitting(false);
        return;
      }

      const isEdit = formMode === 'editing' && editingId;
      const url = isEdit ? `/api/follow-ups/rules/${editingId}` : '/api/follow-ups/rules';
      const method = isEdit ? 'PATCH' : 'POST';

      const res = await authFetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const json = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(json.error ?? 'Failed to save rule');
      }

      const json = (await res.json()) as { data: CadenceRule };
      if (isEdit) {
        setRules(prev => prev.map(r => (r.id === editingId ? json.data : r)));
      } else {
        setRules(prev => [json.data, ...prev]);
      }
      setFormMode('idle');
      setEditingId(null);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Failed to save rule');
    } finally {
      setSubmitting(false);
    }
  }, [editingId, form, formMode]);

  const handleCancel = () => {
    setFormMode('idle');
    setEditingId(null);
    setSubmitError(null);
  };

  // ── Render ────────────────────────────────────────────────────────────
  return (
    <div
      style={{
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: 12,
        padding: 24,
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 20,
        }}
      >
        <div>
          <h2
            style={{
              color: 'var(--color-f5f5f0, #f5f5f0)',
              fontSize: 18,
              fontWeight: 700,
              margin: 0,
            }}
          >
            Cadence Rule Admin
          </h2>
          <p style={{ color: 'var(--text-secondary, #9ca3af)', fontSize: 13, margin: '4px 0 0' }}>
            Manage dynamic follow-up cadence rules. Active rules are evaluated each scheduler cycle.
          </p>
        </div>
        {formMode === 'idle' && (
          <button
            onClick={handleOpenCreate}
            aria-label="Create new cadence rule"
            style={{
              background: '#c9a84c',
              color: '#0a0a0a',
              border: 'none',
              borderRadius: 8,
              padding: '8px 18px',
              fontWeight: 700,
              cursor: 'pointer',
              fontSize: 13,
            }}
          >
            + New Rule
          </button>
        )}
      </div>

      {/* ── Form panel ── */}
      {(formMode === 'creating' || formMode === 'editing') && (
        <div
          style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(201,168,76,0.3)',
            borderRadius: 10,
            padding: 20,
            marginBottom: 24,
          }}
          aria-label={
            formMode === 'creating' ? 'Create cadence rule form' : 'Edit cadence rule form'
          }
        >
          <h3
            style={{
              color: 'var(--color-c9a84c, #c9a84c)',
              fontSize: 15,
              fontWeight: 700,
              marginTop: 0,
              marginBottom: 16,
            }}
          >
            {formMode === 'creating' ? 'New Cadence Rule' : `Editing: ${form.name}`}
          </h3>
          <RuleForm
            form={form}
            onChange={handleFormChange}
            onSubmit={() => void handleSubmit()}
            onCancel={handleCancel}
            submitLabel={formMode === 'creating' ? 'Create Rule' : 'Save Changes'}
            submitError={submitError}
            submitting={submitting}
          />
        </div>
      )}

      {/* ── Loading ── */}
      {loading && (
        <div
          style={{ textAlign: 'center', color: 'var(--text-secondary, #9ca3af)', padding: 40 }}
          aria-label="Loading cadence rules"
        >
          Loading cadence rules…
        </div>
      )}

      {/* ── Load error ── */}
      {!loading && loadError && (
        <div
          style={{
            color: 'var(--color-f87171, #f87171)',
            background: 'rgba(239,68,68,0.1)',
            borderRadius: 8,
            padding: 14,
          }}
          role="alert"
        >
          {loadError}
        </div>
      )}

      {/* ── Empty state ── */}
      {!loading && !loadError && rules.length === 0 && (
        <div style={{ textAlign: 'center', color: 'var(--text-secondary, #6b7280)', padding: 48 }}>
          <div style={{ fontSize: 32, marginBottom: 8 }}>📋</div>
          <div>No cadence rules yet. Create your first rule to get started.</div>
        </div>
      )}

      {/* ── Rules table ── */}
      {!loading && !loadError && rules.length > 0 && (
        <RulesTable
          rules={rules}
          togglingId={togglingId}
          onToggle={(id, active) => void handleToggle(id, active)}
          onEdit={handleOpenEdit}
        />
      )}
    </div>
  );
}
