import React, { FC } from 'react';
import type { LindaConversationItem } from './LindaWhatsAppCRM.data';

export interface LindaLeadContextActionsProps {
  conversation: LindaConversationItem;
  ocrProcessing: boolean;
  onHumanTakeover: () => void;
  onQualifyAndMatch: () => void;
  onScheduleViewing: () => void;
  onSendToHenry: (formType: 'FORM_A' | 'FORM_B') => void;
  onBridgeToMary?: () => void;
  onBridgeToDaisy?: () => void;
  onDocumentIntake: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDripCampaign: () => void;
  onDldValuationPitch?: () => void;
}

export const LindaLeadContextActions: FC<LindaLeadContextActionsProps> = ({
  ocrProcessing,
  onHumanTakeover,
  onQualifyAndMatch,
  onScheduleViewing,
  onSendToHenry,
  onBridgeToMary,
  onBridgeToDaisy,
  onDocumentIntake,
  onDripCampaign,
  onDldValuationPitch,
}) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
      {/* Sanctum Multi-Agent Delegation Bridges */}
      <div
        style={{
          padding: '0.45rem',
          borderRadius: '0.5rem',
          backgroundColor: 'rgba(30, 41, 59, 0.7)',
          border: '1px solid rgba(148, 163, 184, 0.15)',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.35rem',
        }}
      >
        <span
          style={{
            fontSize: '0.65rem',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            fontWeight: 800,
            color: '#38BDF8',
          }}
        >
          ⚡ AICC Sanctum Bridges
        </span>
        <div style={{ display: 'flex', gap: 6 }}>
          <button
            type="button"
            data-testid="linda-bridge-mary"
            onClick={onBridgeToMary}
            style={{
              flex: 1,
              padding: '0.45rem 0.5rem',
              borderRadius: '0.375rem',
              border: '1px solid rgba(16, 185, 129, 0.4)',
              backgroundColor: 'rgba(16, 185, 129, 0.15)',
              color: '#6EE7B7',
              fontSize: '0.72rem',
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            📦 Bridge Mary (Inv)
          </button>
          <button
            type="button"
            data-testid="linda-bridge-daisy"
            onClick={onBridgeToDaisy}
            style={{
              flex: 1,
              padding: '0.45rem 0.5rem',
              borderRadius: '0.375rem',
              border: '1px solid rgba(236, 72, 153, 0.4)',
              backgroundColor: 'rgba(236, 72, 153, 0.15)',
              color: '#F472B6',
              fontSize: '0.72rem',
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            🏠 Bridge Daisy (Lease)
          </button>
        </div>
        <div style={{ display: 'flex', gap: 6 }}>
          <button
            type="button"
            data-testid="linda-send-henry-forma"
            onClick={() => onSendToHenry('FORM_A')}
            style={{
              flex: 1,
              padding: '0.38rem 0.45rem',
              borderRadius: '0.375rem',
              border: '1px solid rgba(217, 119, 6, 0.45)',
              backgroundColor: 'rgba(217, 119, 6, 0.14)',
              color: '#FCD34D',
              fontSize: '0.68rem',
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            📜 Henry Form A
          </button>
          <button
            type="button"
            data-testid="linda-send-henry-formb"
            onClick={() => onSendToHenry('FORM_B')}
            style={{
              flex: 1,
              padding: '0.38rem 0.45rem',
              borderRadius: '0.375rem',
              border: '1px solid rgba(217, 119, 6, 0.45)',
              backgroundColor: 'rgba(217, 119, 6, 0.14)',
              color: '#FCD34D',
              fontSize: '0.68rem',
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            📜 Henry Form B
          </button>
        </div>
      </div>

      {/* Human Takeover & Direct WhatsApp Actions */}
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
          padding: '0.45rem 0.75rem',
          borderRadius: '0.5rem',
          border: 'none',
          backgroundColor: '#EF4444',
          color: '#FFFFFF',
          fontSize: '0.78rem',
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
        {ocrProcessing ? 'Scanning OCR...' : '📄 Scan Title Deed / Ejari'}
        <input
          type="file"
          accept="image/*,.pdf"
          onChange={onDocumentIntake}
          style={{ display: 'none' }}
        />
      </label>

      <button
        type="button"
        data-testid="linda-workflow-rental-valuation"
        onClick={() => {
          onDldValuationPitch?.();
        }}
        style={{
          padding: '0.45rem 0.75rem',
          borderRadius: '0.5rem',
          border: '1px solid rgba(56, 189, 248, 0.45)',
          backgroundColor: 'rgba(56, 189, 248, 0.14)',
          color: '#38BDF8',
          fontSize: '0.78rem',
          fontWeight: 700,
          cursor: 'pointer',
        }}
      >
        🏢 DLD Rental Valuation Pitch
      </button>

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
