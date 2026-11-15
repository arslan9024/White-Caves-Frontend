import React, { FC } from 'react';
import type { LindaConversationItem } from './LindaWhatsAppCRM.data';

export interface LindaLeadContextPaneProps {
  conversation?: LindaConversationItem;
  onAction?: (
    action: 'schedule_viewing' | 'send_brochure' | 'escalate_broker',
    conv: LindaConversationItem
  ) => void;
}

export const LindaLeadContextPane: FC<LindaLeadContextPaneProps> = ({ conversation, onAction }) => {
  if (!conversation) return null;

  return (
    <aside
      data-testid="linda-lead-context-pane"
      style={{
        width: '260px',
        minWidth: '240px',
        borderInlineStart: '1px solid rgba(148, 163, 184, 0.2)',
        backgroundColor: 'rgba(15, 23, 42, 0.85)',
        color: '#F8FAFC',
        padding: '1rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.85rem',
      }}
    >
      <div>
        <div
          style={{
            fontSize: '0.7rem',
            fontWeight: 700,
            color: '#EF4444',
            textTransform: 'uppercase',
          }}
        >
          Lead &amp; Unit Context
        </div>
        <div style={{ fontSize: '1rem', fontWeight: 700, marginTop: '0.2rem' }}>
          {conversation.contactName || conversation.phone}
        </div>
        <div style={{ fontSize: '0.78rem', color: '#94A3B8' }}>{conversation.phone}</div>
      </div>

      <div
        style={{
          padding: '0.7rem',
          borderRadius: '0.6rem',
          backgroundColor: 'rgba(30, 41, 59, 0.8)',
          border: '1px solid rgba(148, 163, 184, 0.18)',
          fontSize: '0.8rem',
        }}
      >
        <div>
          <strong>Cluster:</strong> {conversation.cluster || 'Dubai'}
        </div>
        <div>
          <strong>Unit:</strong> {conversation.unit || 'TBD'}
        </div>
        <div>
          <strong>Intent:</strong> {conversation.intent || 'INQUIRY'}
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
        <button
          type="button"
          onClick={() => onAction?.('schedule_viewing', conversation)}
          style={{
            padding: '0.5rem 0.75rem',
            borderRadius: '0.5rem',
            border: 'none',
            backgroundColor: '#EF4444',
            color: '#FFFFFF',
            fontSize: '0.8rem',
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          Schedule Viewing
        </button>
        <button
          type="button"
          onClick={() => onAction?.('send_brochure', conversation)}
          style={{
            padding: '0.5rem 0.75rem',
            borderRadius: '0.5rem',
            border: '1px solid rgba(148, 163, 184, 0.3)',
            backgroundColor: 'transparent',
            color: '#F8FAFC',
            fontSize: '0.8rem',
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          Send Brochure
        </button>
        <button
          type="button"
          onClick={() => onAction?.('escalate_broker', conversation)}
          style={{
            padding: '0.5rem 0.75rem',
            borderRadius: '0.5rem',
            border: '1px solid rgba(239, 68, 68, 0.45)',
            backgroundColor: 'rgba(239, 68, 68, 0.12)',
            color: '#FCA5A5',
            fontSize: '0.8rem',
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          Escalate to Broker
        </button>
      </div>
    </aside>
  );
};
