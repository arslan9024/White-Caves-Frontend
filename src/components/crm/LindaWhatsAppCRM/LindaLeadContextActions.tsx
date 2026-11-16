import React, { FC } from 'react';
import type { LindaConversationItem } from './LindaWhatsAppCRM.data';

export interface LindaLeadContextActionsProps {
  conversation: LindaConversationItem;
  ocrProcessing: boolean;
  onHumanTakeover: () => void;
  onQualifyAndMatch: () => void;
  onScheduleViewing: () => void;
  onSendToHenry: (formType: 'FORM_A' | 'FORM_B') => void;
  onDocumentIntake: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDripCampaign: () => void;
}

export const LindaLeadContextActions: FC<LindaLeadContextActionsProps> = ({
  ocrProcessing,
  onHumanTakeover,
  onQualifyAndMatch,
  onScheduleViewing,
  onSendToHenry,
  onDocumentIntake,
  onDripCampaign,
}) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
      <button
        type="button"
        data-testid="linda-takeover-action-btn"
        onClick={onHumanTakeover}
        style={{
          padding: '0.45rem 0.75rem',
          borderRadius: '0.5rem',
          border: '1px solid rgba(239, 68, 68, 0.45)',
          backgroundColor: 'rgba(239, 68, 68, 0.18)',
          color: '#FCA5A5',
          fontSize: '0.78rem',
          fontWeight: 700,
          cursor: 'pointer',
        }}
      >
        👤 1-Click Human Takeover
      </button>
      <button
        type="button"
        data-testid="linda-workflow-qualify"
        onClick={onQualifyAndMatch}
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
        onClick={onScheduleViewing}
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
      <div style={{ display: 'flex', gap: 6 }}>
        <button
          type="button"
          data-testid="linda-send-henry-forma"
          onClick={() => onSendToHenry('FORM_A')}
          style={{
            flex: 1,
            padding: '0.42rem 0.5rem',
            borderRadius: '0.5rem',
            border: '1px solid rgba(217, 119, 6, 0.45)',
            backgroundColor: 'rgba(217, 119, 6, 0.14)',
            color: '#FCD34D',
            fontSize: '0.72rem',
            fontWeight: 700,
            cursor: 'pointer',
          }}
        >
          Henry Form A
        </button>
        <button
          type="button"
          data-testid="linda-send-henry-formb"
          onClick={() => onSendToHenry('FORM_B')}
          style={{
            flex: 1,
            padding: '0.42rem 0.5rem',
            borderRadius: '0.5rem',
            border: '1px solid rgba(217, 119, 6, 0.45)',
            backgroundColor: 'rgba(217, 119, 6, 0.14)',
            color: '#FCD34D',
            fontSize: '0.72rem',
            fontWeight: 700,
            cursor: 'pointer',
          }}
        >
          Henry Form B
        </button>
      </div>
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
          onChange={onDocumentIntake}
          style={{ display: 'none' }}
        />
      </label>
      <button
        type="button"
        data-testid="linda-workflow-drip"
        onClick={onDripCampaign}
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
  );
};

