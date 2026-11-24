import React, { FC } from 'react';
import { PrimaryButton, SecondaryButton } from '../styles/CrmPageStyles';

export interface ChannelStep {
  channel: 'whatsapp' | 'email' | 'call' | 'sms';
  delayMs: number;
  templateName?: string;
  description?: string;
}

export interface CadenceRule {
  id: string;
  name: string;
  description: string | null;
  isActive: boolean;
  priority: number;
  leadTiers: string[];
  leadSources: string[];
  channelSequence: ChannelStep[];
  createdAt: string;
}

export const EMPTY_RULE: Omit<CadenceRule, 'id' | 'createdAt'> = {
  name: '',
  description: null,
  isActive: true,
  priority: 0,
  leadTiers: [],
  leadSources: [],
  channelSequence: [{ channel: 'whatsapp', delayMs: 300000 }],
};

export const TIER_OPTIONS = ['hot', 'warm', 'cold', 'inactive'];
export const SOURCE_OPTIONS = [
  'direct',
  'website',
  'referral',
  'social',
  'portal',
  'cold_call',
  'event',
  'whatsapp',
];
export const CHANNEL_OPTIONS: ChannelStep['channel'][] = ['whatsapp', 'email', 'call', 'sms'];

interface CadenceRuleModalProps {
  editing: CadenceRule | null;
  form: Omit<CadenceRule, 'id' | 'createdAt'>;
  setForm: React.Dispatch<React.SetStateAction<Omit<CadenceRule, 'id' | 'createdAt'>>>;
  saving: boolean;
  onClose: () => void;
  onSave: () => void;
  toggleTier: (tier: string) => void;
  toggleSource: (source: string) => void;
  addStep: () => void;
  removeStep: (index: number) => void;
  updateStep: (index: number, field: keyof ChannelStep, value: string | number) => void;
}

export const CadenceRuleModal: FC<CadenceRuleModalProps> = ({
  editing,
  form,
  setForm,
  saving,
  onClose,
  onSave,
  toggleTier,
  toggleSource,
  addStep,
  removeStep,
  updateStep,
}) => (
  <div
    role="dialog"
    aria-modal="true"
    aria-labelledby="cadence-modal-title"
    className="cadence-modal-overlay"
  >
    <div className="cadence-modal">
      <h2 id="cadence-modal-title" className="cadence-modal-title">
        {editing ? 'Edit Cadence Rule' : 'New Cadence Rule'}
      </h2>

      <div className="cadence-field">
        <label htmlFor="rule-name" className="cadence-label">
          Rule Name *
        </label>
        <input
          id="rule-name"
          type="text"
          placeholder="e.g. Hot Lead 3-day nurture"
          value={form.name}
          onChange={e => setForm(prev => ({ ...prev, name: e.target.value }))}
          className="cadence-input"
        />
      </div>

      <div className="cadence-field">
        <label htmlFor="rule-desc" className="cadence-label">
          Description
        </label>
        <input
          id="rule-desc"
          type="text"
          placeholder="Optional description"
          value={form.description ?? ''}
          onChange={e => setForm(prev => ({ ...prev, description: e.target.value || null }))}
          className="cadence-input"
        />
      </div>

      <div className="cadence-row">
        <div className="cadence-priority-col">
          <label htmlFor="rule-priority" className="cadence-label">
            Priority
          </label>
          <input
            id="rule-priority"
            type="number"
            min={0}
            value={form.priority}
            onChange={e => setForm(prev => ({ ...prev, priority: parseInt(e.target.value) || 0 }))}
            className="cadence-input"
          />
        </div>
        <div className="cadence-active-col">
          <label className="cadence-checkbox-label">
            <input
              type="checkbox"
              checked={form.isActive}
              onChange={e => setForm(prev => ({ ...prev, isActive: e.target.checked }))}
            />
            Active
          </label>
        </div>
      </div>

      <div className="cadence-section">
        <p className="cadence-section-title">Apply to lead tiers:</p>
        <div className="cadence-check-grid">
          {TIER_OPTIONS.map(tier => (
            <label key={tier} className="cadence-check-label">
              <input
                type="checkbox"
                checked={form.leadTiers.includes(tier)}
                onChange={() => toggleTier(tier)}
              />
              {tier}
            </label>
          ))}
        </div>
        <small className="cadence-help">Leave empty to match all tiers.</small>
      </div>

      <div className="cadence-section cadence-section--lg">
        <p className="cadence-section-title">Apply to lead sources:</p>
        <div className="cadence-check-grid">
          {SOURCE_OPTIONS.map(src => (
            <label key={src} className="cadence-check-label">
              <input
                type="checkbox"
                checked={form.leadSources.includes(src)}
                onChange={() => toggleSource(src)}
              />
              {src}
            </label>
          ))}
        </div>
      </div>

      <div className="cadence-section cadence-section--lg">
        <p className="cadence-section-title">Channel Sequence:</p>
        {form.channelSequence.map((step, i) => (
          <div key={i} className="cadence-step-row">
            <span className="cadence-step-index">{i + 1}.</span>
            <label htmlFor={`step-channel-${i}`} className="sr-only">
              Channel for step {i + 1}
            </label>
            <select
              id={`step-channel-${i}`}
              title={`Channel for step ${i + 1}`}
              value={step.channel}
              onChange={e => updateStep(i, 'channel', e.target.value)}
              className="cadence-step-select"
            >
              {CHANNEL_OPTIONS.map(c => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            <label htmlFor={`step-delay-${i}`} className="sr-only">
              Delay hours for step {i + 1}
            </label>
            <input
              id={`step-delay-${i}`}
              type="number"
              min={0}
              placeholder="Delay (hours)"
              title={`Delay in hours for step ${i + 1}`}
              value={Math.round(step.delayMs / 3600000)}
              onChange={e => updateStep(i, 'delayMs', parseFloat(e.target.value) * 3600000 || 0)}
              className="cadence-step-input"
            />
            <span className="cadence-step-unit">hrs</span>
            {form.channelSequence.length > 1 && (
              <button
                type="button"
                onClick={() => removeStep(i)}
                aria-label={`Remove step ${i + 1}`}
                className="cadence-step-remove"
              >
                ✕
              </button>
            )}
          </div>
        ))}
        <SecondaryButton type="button" onClick={addStep} aria-label="Add channel step">
          + Add Step
        </SecondaryButton>
      </div>

      <div className="cadence-footer">
        <SecondaryButton onClick={onClose}>Cancel</SecondaryButton>
        <PrimaryButton
          onClick={onSave}
          disabled={saving || !form.name.trim()}
          aria-label={editing ? 'Save changes to rule' : 'Create cadence rule'}
        >
          {saving ? 'Saving…' : editing ? 'Save Changes' : 'Create Rule'}
        </PrimaryButton>
      </div>
    </div>
  </div>
);
