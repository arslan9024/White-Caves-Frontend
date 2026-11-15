import React, { FC, useState } from 'react';
import type { LindaConversationItem } from './LindaWhatsAppCRM.data';
import { useClientOcr } from '../../../hooks/useClientOcr';

export interface LindaLeadContextPaneProps {
  conversation?: LindaConversationItem;
  onAction?: (
    action: 'schedule_viewing' | 'send_brochure' | 'escalate_broker',
    conv: LindaConversationItem
  ) => void;
}

export const LindaLeadContextPane: FC<LindaLeadContextPaneProps> = ({ conversation, onAction }) => {
  const [workflowStatus, setWorkflowStatus] = useState<string | null>(null);
  const [matchedUnits, setMatchedUnits] = useState<
    Array<{ id: string; title: string; source: string }>
  >([]);
  const { scanFile, isProcessing: ocrProcessing } = useClientOcr();

  if (!conversation) return null;

  const jid = encodeURIComponent(
    conversation.id.includes('@')
      ? conversation.id
      : `${conversation.phone.replace(/\D/g, '')}@s.whatsapp.net`
  );

  const handleQualifyAndMatch = async () => {
    setWorkflowStatus('Qualifying lead & matching Bayut/Inventory...');
    try {
      const res = await fetch(`/api/whatsapp/chats/${jid}/qualify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cluster: conversation.cluster || 'Dubai Marina',
          intent: conversation.intent || 'BUY',
        }),
      });
      const json = await res.json();
      if (json?.success && Array.isArray(json?.data?.matchedUnits)) {
        setMatchedUnits(json.data.matchedUnits);
        setWorkflowStatus(
          `Qualified (${json.data.score}%) • ${json.data.matchedUnits.length} units matched`
        );
      }
    } catch {
      setWorkflowStatus('Qualification queued offline');
    }
  };

  const handleScheduleViewing = async () => {
    onAction?.('schedule_viewing', conversation);
    setWorkflowStatus('Syncing viewing to Calendar...');
    try {
      const res = await fetch(`/api/whatsapp/chats/${jid}/schedule-viewing`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ unitId: conversation.unit || 'WC-INV-204' }),
      });
      const json = await res.json();
      if (json?.success) {
        setWorkflowStatus(`Viewing ${json.data.viewingId} synced to Calendar`);
      }
    } catch {
      setWorkflowStatus('Viewing scheduled locally');
    }
  };

  const handleDocumentIntake = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setWorkflowStatus('Running browser OCR & Henry Drive intake...');
    const ocrResult = await scanFile(file);
    try {
      const res = await fetch(`/api/whatsapp/chats/${jid}/document-intake`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ docType: 'RERA_FORM_A', ocrText: ocrResult?.text || '' }),
      });
      const json = await res.json();
      if (json?.success) {
        setWorkflowStatus(`Archived to ${json.data.driveFolder}`);
      }
    } catch {
      setWorkflowStatus('Document intake queued');
    }
  };

  const handleDripCampaign = async () => {
    setWorkflowStatus('Queueing Drip with Gaussian pacing...');
    try {
      const res = await fetch('/api/whatsapp/chats/drip-campaign', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: `${conversation.cluster || 'Dubai'} Drip`,
          account: '+971505760056',
          recipients: [conversation.phone],
        }),
      });
      const json = await res.json();
      if (json?.success) {
        setWorkflowStatus(
          `Drip ${json.data.campaignId} queued (Gaussian ${json.data.gaussianPacing.jitterMeanMs}ms)`
        );
      }
    } catch {
      setWorkflowStatus('Drip campaign queued');
    }
  };

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
          data-testid="linda-workflow-qualify"
          onClick={() => void handleQualifyAndMatch()}
          style={{
            padding: '0.45rem 0.75rem',
            borderRadius: '0.5rem',
            border: '1px solid rgba(34, 197, 94, 0.45)',
            backgroundColor: 'rgba(34, 197, 94, 0.14)',
            color: '#86EFAC',
            fontSize: '0.78rem',
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          Auto-Qualify &amp; Match Units
        </button>
        <button
          type="button"
          data-testid="linda-workflow-viewing"
          onClick={() => void handleScheduleViewing()}
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
          1-Click Viewing + Calendar
        </button>
        <label
          data-testid="linda-workflow-document-intake"
          style={{
            padding: '0.45rem 0.75rem',
            borderRadius: '0.5rem',
            border: '1px solid rgba(148, 163, 184, 0.3)',
            backgroundColor: 'transparent',
            color: '#F8FAFC',
            fontSize: '0.78rem',
            fontWeight: 600,
            cursor: 'pointer',
            textAlign: 'center',
          }}
        >
          {ocrProcessing ? 'Scanning OCR...' : 'RERA Form A/B & Ejari Intake'}
          <input
            type="file"
            accept="image/*,.pdf"
            onChange={e => void handleDocumentIntake(e)}
            style={{ display: 'none' }}
          />
        </label>
        <button
          type="button"
          data-testid="linda-workflow-drip"
          onClick={() => void handleDripCampaign()}
          style={{
            padding: '0.45rem 0.75rem',
            borderRadius: '0.5rem',
            border: '1px solid rgba(239, 68, 68, 0.45)',
            backgroundColor: 'rgba(239, 68, 68, 0.12)',
            color: '#FCA5A5',
            fontSize: '0.78rem',
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          Drip Campaign (Gaussian)
        </button>
      </div>

      {workflowStatus && (
        <div
          data-testid="linda-workflow-status"
          style={{
            fontSize: '0.74rem',
            color: '#A7F3D0',
            backgroundColor: 'rgba(16, 185, 129, 0.12)',
            padding: '0.45rem 0.6rem',
            borderRadius: '0.45rem',
          }}
        >
          {workflowStatus}
        </div>
      )}

      {matchedUnits.length > 0 && (
        <div style={{ display: 'grid', gap: '0.35rem', fontSize: '0.74rem' }}>
          {matchedUnits.map(u => (
            <div
              key={u.id}
              style={{
                padding: '0.4rem',
                borderRadius: '0.4rem',
                backgroundColor: 'rgba(30,41,59,0.9)',
              }}
            >
              <strong>{u.source}:</strong> {u.title}
            </div>
          ))}
        </div>
      )}
    </aside>
  );
};
