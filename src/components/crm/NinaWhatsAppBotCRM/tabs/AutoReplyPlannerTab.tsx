/**
 * AutoReplyPlannerTab.tsx — Nina AI Smart Auto-Reply & Keyword Intent Planner
 * Decomposed under AEGIS V5.1 AEG-042 (< 350 lines).
 */

import React, { useState } from 'react';
import { Plus, Zap } from 'lucide-react';
import { type AutoReplyRule, INITIAL_RULES } from './autoReplyPlanner.data';
import { AutoReplyRuleCard } from './autoReply/AutoReplyRuleCard';
import { AddAutoReplyRuleModal, type NewAutoReplyDraft } from './autoReply/AddAutoReplyRuleModal';

export const AutoReplyPlannerTab: React.FC = () => {
  const [rules, setRules] = useState<AutoReplyRule[]>(INITIAL_RULES);
  const [showAddModal, setShowAddModal] = useState(false);

  const [newRule, setNewRule] = useState<NewAutoReplyDraft>({
    name: 'New AI Trigger Rule',
    keywordsText: 'offplan, luxury, investment',
    responseTemplate:
      'Thank you for contacting White Caves Real Estate! Our investment team is matching your query.',
    intentTag: 'General Inquiry',
    leadScoreBoost: 10,
    dldInventoryLookup: true,
    escalationTarget: '+971 50 576 0056',
  });

  const toggleRuleActive = (ruleId: string) => {
    setRules(prev => prev.map(r => (r.id === ruleId ? { ...r, active: !r.active } : r)));
  };

  const handleAddRule = (e: React.FormEvent) => {
    e.preventDefault();
    const createdRule: AutoReplyRule = {
      id: `rule-${Date.now()}`,
      name: newRule.name,
      keywords: newRule.keywordsText.split(',').map(k => k.trim()),
      responseTemplate: newRule.responseTemplate,
      intentTag: newRule.intentTag,
      leadScoreBoost: newRule.leadScoreBoost,
      active: true,
      dldInventoryLookup: newRule.dldInventoryLookup,
      escalationTarget: newRule.escalationTarget,
    };

    setRules(prev => [createdRule, ...prev]);
    setShowAddModal(false);
  };

  return (
    <div
      className="autoreply-planner-tab"
      style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
    >
      <div
        style={{
          background: 'linear-gradient(135deg, #1E293B 0%, #0F172A 100%)',
          color: '#FFFFFF',
          borderRadius: '16px',
          padding: '1.5rem',
          boxShadow: '0 8px 24px rgba(15, 23, 42, 0.15)',
          border: '1px solid rgba(6, 182, 212, 0.3)',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '0.85rem',
            flexWrap: 'wrap',
            gap: '0.75rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Zap size={28} color="#EF4444" />
            <div>
              <span
                style={{
                  fontSize: '0.75rem',
                  fontWeight: 800,
                  color: 'var(--color-06b6d4, #06B6D4)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                }}
              >
                Nina AI Smart Auto-Reply &amp; Keyword Intent Engine
              </span>
              <h3
                style={{
                  margin: '2px 0 0',
                  fontSize: '1.35rem',
                  fontWeight: 800,
                  color: 'var(--white, #FFFFFF)',
                }}
              >
                Automated Auto-Reply Rule Planner (+971 50 576 0056)
              </h3>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setShowAddModal(true)}
            style={{
              background: '#06B6D4',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '8px',
              padding: '9px 18px',
              fontSize: '0.85rem',
              fontWeight: 800,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: '0 4px 12px rgba(6, 182, 212, 0.3)',
            }}
          >
            <Plus size={16} /> Add Auto-Reply Rule
          </button>
        </div>

        <p
          style={{
            margin: 0,
            fontSize: '0.88rem',
            color: 'var(--text-secondary, #CBD5E1)',
            lineHeight: 1.5,
          }}
        >
          Configure live trigger rules for Nina AI. When an incoming WhatsApp message arrives on{' '}
          <strong>+971 50 576 0056</strong>, Nina parses keyword intents, pulls matching properties
          from our <strong>9,210 DAMAC Hills 2 Database</strong>, updates lead scores, and responds
          automatically!
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {rules.map(rule => (
          <AutoReplyRuleCard key={rule.id} rule={rule} onToggleActive={toggleRuleActive} />
        ))}
      </div>

      {showAddModal && (
        <AddAutoReplyRuleModal
          draft={newRule}
          onChangeDraft={setNewRule}
          onSubmit={handleAddRule}
          onClose={() => setShowAddModal(false)}
        />
      )}
    </div>
  );
};
