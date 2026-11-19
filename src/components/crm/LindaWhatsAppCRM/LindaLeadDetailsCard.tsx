// FILE: src/components/crm/LindaWhatsAppCRM/LindaLeadDetailsCard.tsx
/**
 * White Caves Real Estate LLC - Linda Lead Details Card
 * Standard: AEGIS Canonical 12-Way Architecture Standard (<350 lines)
 */

import React, { FC } from 'react';
import type { LindaConversationItem } from './LindaWhatsAppCRM.data';

export interface LindaLeadDetailsCardProps {
  conversation: LindaConversationItem;
  copiedPhone: boolean;
  onCopyPhone: () => void;
  currentStage: string;
  onSelectStage: (stage: string) => void;
  currentIntent: string;
  onSelectIntent: (intent: string) => void;
}

export const DEAL_STAGES = [
  { id: 'inquiry', label: 'Inquiry / Discovery' },
  { id: 'qualified', label: 'Landlord Qualified' },
  { id: 'valuation', label: 'Rental Valuation Sent' },
  { id: 'viewing', label: 'Tenant Viewing Arranged' },
  { id: 'ejari', label: 'Ejari / Contract Handover' },
];

export const INTENT_OPTIONS = [
  { id: 'LANDLORD_ACQUISITION', label: '🏢 Landlord Acquisition (Vacant Unit)' },
  { id: 'EJARI_RENEWAL', label: '📄 Ejari Renewal & Rental Review' },
  { id: 'PROPERTY_MGMT', label: '🔑 Full Property Management' },
  { id: 'RENT', label: '🏡 Tenant Search / Placement' },
  { id: 'BUY', label: '💰 Buyer Inquiry' },
  { id: 'SELL', label: '🏷️ Seller / Listing Exclusive' },
];

export const LindaLeadDetailsCard: FC<LindaLeadDetailsCardProps> = ({
  conversation,
  copiedPhone,
  onCopyPhone,
  currentStage,
  onSelectStage,
  currentIntent,
  onSelectIntent,
}) => {
  return (
    <>
      <div
        style={{
          padding: '0.75rem',
          borderRadius: '0.6rem',
          backgroundColor: 'rgba(30, 41, 59, 0.8)',
          border: '1px solid rgba(148, 163, 184, 0.18)',
        }}
      >
        <div style={{ fontWeight: 700, fontSize: '0.95rem', color: '#F1F5F9' }}>
          {conversation.contactName}
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            fontSize: '0.78rem',
            color: '#94A3B8',
            marginTop: 4,
          }}
        >
          <span>{conversation.phone}</span>
          <button
            type="button"
            data-testid="linda-copy-phone-btn"
            onClick={onCopyPhone}
            style={{
              padding: '1px 6px',
              borderRadius: 4,
              border: '1px solid rgba(148, 163, 184, 0.3)',
              background: 'transparent',
              color: copiedPhone ? '#4ADE80' : '#CBD5E1',
              fontSize: '0.68rem',
              cursor: 'pointer',
            }}
          >
            {copiedPhone ? 'Copied' : 'Copy'}
          </button>
        </div>

        <div style={{ marginTop: '0.75rem' }}>
          <label
            htmlFor="linda-deal-stage-select"
            style={{
              display: 'block',
              fontSize: '0.68rem',
              fontWeight: 600,
              color: '#94A3B8',
              marginBottom: 4,
            }}
          >
            Deal Pipeline Stage
          </label>
          <select
            id="linda-deal-stage-select"
            data-testid="linda-deal-stage-select"
            value={currentStage}
            onChange={e => onSelectStage(e.target.value)}
            style={{
              width: '100%',
              background: '#020617',
              border: '1px solid rgba(239, 68, 68, 0.4)',
              borderRadius: 6,
              color: '#F8FAFC',
              padding: '5px 8px',
              fontSize: '0.75rem',
              fontWeight: 600,
              cursor: 'pointer',
              outline: 'none',
            }}
          >
            {DEAL_STAGES.map(s => (
              <option key={s.id} value={s.id}>
                {s.label}
              </option>
            ))}
          </select>
        </div>

        <div
          data-testid="linda-deal-stage-stepper"
          style={{
            display: 'flex',
            gap: 4,
            marginTop: '0.5rem',
            fontSize: '0.65rem',
            color: '#94A3B8',
          }}
        >
          {DEAL_STAGES.map(stage => {
            const isCurrent = currentStage === stage.id;
            return (
              <span
                key={stage.id}
                style={{
                  flex: 1,
                  textAlign: 'center',
                  padding: '3px 0',
                  borderRadius: 4,
                  backgroundColor: isCurrent ? 'rgba(239, 68, 68, 0.35)' : 'rgba(30, 41, 59, 0.8)',
                  color: isCurrent ? '#FCA5A5' : '#94A3B8',
                  fontWeight: isCurrent ? 700 : 500,
                }}
              >
                {stage.label}
              </span>
            );
          })}
        </div>
      </div>

      <div
        style={{
          padding: '0.75rem',
          borderRadius: '0.6rem',
          backgroundColor: 'rgba(30, 41, 59, 0.8)',
          border: '1px solid rgba(148, 163, 184, 0.18)',
          fontSize: '0.8rem',
          display: 'flex',
          flexDirection: 'column',
          gap: 6,
        }}
      >
        <div>
          <strong>Cluster:</strong> {conversation.cluster || 'Dubai'}
        </div>
        <div>
          <strong>Unit:</strong> {conversation.unit || 'TBD'}
        </div>

        <div style={{ marginTop: 4 }}>
          <label
            htmlFor="linda-intent-select"
            style={{
              display: 'block',
              fontSize: '0.68rem',
              fontWeight: 600,
              color: '#94A3B8',
              marginBottom: 4,
            }}
          >
            Client Intent & Objective
          </label>
          <select
            id="linda-intent-select"
            data-testid="linda-intent-select"
            value={currentIntent}
            onChange={e => onSelectIntent(e.target.value)}
            style={{
              width: '100%',
              background: '#020617',
              border: '1px solid rgba(56, 189, 248, 0.4)',
              borderRadius: 6,
              color: '#38BDF8',
              padding: '5px 8px',
              fontSize: '0.75rem',
              fontWeight: 600,
              cursor: 'pointer',
              outline: 'none',
            }}
          >
            {INTENT_OPTIONS.map(i => (
              <option key={i.id} value={i.id}>
                {i.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </>
  );
};
