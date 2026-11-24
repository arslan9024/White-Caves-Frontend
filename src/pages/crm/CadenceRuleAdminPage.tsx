/**
 * Cadence Rule Admin Page — P0-018
 * CRUD interface for dynamic cadence rules that control channel orchestration.
 */
import React, { FC, useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import { authFetch } from '../../utils/authFetch';
import {
  PageContainer,
  PageHeader,
  PageTitle,
  ActionBar,
  PrimaryButton,
  SecondaryButton,
} from './styles/CrmPageStyles';
import {
  type ChannelStep,
  type CadenceRule,
  EMPTY_RULE,
  CadenceRuleModal,
} from './components/CadenceRuleModal';

const CadenceRuleAdminPage: FC = () => {
  useDocumentTitle('Cadence Rules');

  const [rules, setRules] = useState<CadenceRule[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<CadenceRule | null>(null);
  const [form, setForm] = useState(EMPTY_RULE);
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await authFetch('/api/follow-ups/rules');
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Failed to load rules');
      setRules((json.data || []) as CadenceRule[]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load rules');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const openCreate = useCallback(() => {
    setEditing(null);
    setForm(EMPTY_RULE);
    setModalOpen(true);
  }, []);

  const openEdit = useCallback((rule: CadenceRule) => {
    setEditing(rule);
    setForm({
      name: rule.name,
      description: rule.description,
      isActive: rule.isActive,
      priority: rule.priority,
      leadTiers: [...rule.leadTiers],
      leadSources: [...rule.leadSources],
      channelSequence: [...rule.channelSequence],
    });
    setModalOpen(true);
  }, []);

  const handleDeactivate = useCallback(async (id: string) => {
    try {
      const res = await authFetch(`/api/follow-ups/rules/${id}`, { method: 'DELETE' });
      if (!res.ok) {
        const json = await res.json();
        throw new Error(json.error || 'Failed to deactivate');
      }
      setRules(prev => prev.map(r => (r.id === id ? { ...r, isActive: false } : r)));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to deactivate rule');
    }
  }, []);

  const handleSave = useCallback(async () => {
    if (!form.name.trim()) return;
    setSaving(true);
    setError(null);
    try {
      const url = editing ? `/api/follow-ups/rules/${editing.id}` : '/api/follow-ups/rules';
      const method = editing ? 'PATCH' : 'POST';
      const res = await authFetch(url, { method, body: JSON.stringify(form) });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Failed to save rule');
      setModalOpen(false);
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save rule');
    } finally {
      setSaving(false);
    }
  }, [editing, form, load]);

  const toggleTier = useCallback((tier: string) => {
    setForm(prev => ({
      ...prev,
      leadTiers: prev.leadTiers.includes(tier)
        ? prev.leadTiers.filter(t => t !== tier)
        : [...prev.leadTiers, tier],
    }));
  }, []);

  const toggleSource = useCallback((source: string) => {
    setForm(prev => ({
      ...prev,
      leadSources: prev.leadSources.includes(source)
        ? prev.leadSources.filter(s => s !== source)
        : [...prev.leadSources, source],
    }));
  }, []);

  const addStep = useCallback(() => {
    setForm(prev => ({
      ...prev,
      channelSequence: [...prev.channelSequence, { channel: 'whatsapp', delayMs: 86400000 }],
    }));
  }, []);

  const removeStep = useCallback((index: number) => {
    setForm(prev => ({
      ...prev,
      channelSequence: prev.channelSequence.filter((_, i) => i !== index),
    }));
  }, []);

  const updateStep = useCallback(
    (index: number, field: keyof ChannelStep, value: string | number) => {
      setForm(prev => ({
        ...prev,
        channelSequence: prev.channelSequence.map((step, i) =>
          i === index ? { ...step, [field]: value } : step
        ),
      }));
    },
    []
  );

  return (
    <PageContainer>
      <PageHeader>
        <PageTitle>⚙️ Cadence Rules</PageTitle>
        <Link to="/owner/crm">← Back to CRM</Link>
      </PageHeader>

      {error && (
        <div role="alert" className="cadence-alert">
          {error}
        </div>
      )}

      <ActionBar>
        <PrimaryButton onClick={openCreate} aria-label="Create new cadence rule">
          + New Rule
        </PrimaryButton>
      </ActionBar>

      {loading ? (
        <div role="status" aria-live="polite">
          Loading rules…
        </div>
      ) : rules.length === 0 ? (
        <div>No cadence rules yet. Create one to get started.</div>
      ) : (
        <table aria-label="Cadence rules" className="cadence-table">
          <thead>
            <tr>
              <th className="cadence-th">Name</th>
              <th className="cadence-th">Priority</th>
              <th className="cadence-th">Tiers</th>
              <th className="cadence-th">Steps</th>
              <th className="cadence-th">Status</th>
              <th className="cadence-th">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rules.map(rule => (
              <tr key={rule.id}>
                <td className="cadence-td">
                  <strong>{rule.name}</strong>
                  {rule.description && (
                    <div className="cadence-rule-description">{rule.description}</div>
                  )}
                </td>
                <td className="cadence-td">{rule.priority}</td>
                <td className="cadence-td">{rule.leadTiers.join(', ') || '—'}</td>
                <td className="cadence-td">{rule.channelSequence.length}</td>
                <td className="cadence-td">
                  <span
                    className={
                      rule.isActive
                        ? 'cadence-status cadence-status--active'
                        : 'cadence-status cadence-status--inactive'
                    }
                    aria-label={`Status: ${rule.isActive ? 'active' : 'inactive'}`}
                  >
                    {rule.isActive ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="cadence-td cadence-actions-cell">
                  <SecondaryButton
                    onClick={() => openEdit(rule)}
                    aria-label={`Edit rule ${rule.name}`}
                  >
                    Edit
                  </SecondaryButton>
                  {rule.isActive && (
                    <SecondaryButton
                      onClick={() => void handleDeactivate(rule.id)}
                      aria-label={`Deactivate rule ${rule.name}`}
                    >
                      Deactivate
                    </SecondaryButton>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {modalOpen && (
        <CadenceRuleModal
          editing={editing}
          form={form}
          setForm={setForm}
          saving={saving}
          onClose={() => setModalOpen(false)}
          onSave={() => void handleSave()}
          toggleTier={toggleTier}
          toggleSource={toggleSource}
          addStep={addStep}
          removeStep={removeStep}
          updateStep={updateStep}
        />
      )}
    </PageContainer>
  );
};

export default CadenceRuleAdminPage;
