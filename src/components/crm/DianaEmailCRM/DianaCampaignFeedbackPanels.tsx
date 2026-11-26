import React, { FC } from 'react';
import { Mail, Sparkles, AlertTriangle, CheckCircle2 } from 'lucide-react';
import type { DianaCampaignDispatchSummary } from './DianaEmailCampaignCenter';

interface DianaCampaignHeaderProps {
  transportReady: boolean;
  recipientCount: number;
}

export const DianaCampaignHeader: FC<DianaCampaignHeaderProps> = ({
  transportReady,
  recipientCount,
}) => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderBottom: '1px solid rgba(255,255,255,0.1)',
      paddingBottom: '14px',
    }}
  >
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      <div
        style={{
          width: '40px',
          height: '40px',
          borderRadius: '10px',
          backgroundColor: 'rgba(239,68,68,0.15)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Mail size={20} color="#EF4444" />
      </div>
      <div>
        <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 800 }}>
          AI Diana Supervisor — Property Owner Email Campaigns
        </h2>
        <div style={{ fontSize: '12px', color: '#94A3B8' }}>
          SUP-02-6-01-1 · AMGR-02-6-01 AI Rania → MGR-02-6 AI Celine → DIR-02 AI Olivia · Sender:{' '}
          <strong style={{ color: '#FFFFFF' }}>the.arslan.broker@gmail.com</strong>
        </div>
      </div>
    </div>
    <span
      style={{
        fontSize: '11px',
        fontWeight: 700,
        padding: '4px 10px',
        borderRadius: '9999px',
        backgroundColor: transportReady ? 'rgba(16,185,129,0.14)' : 'rgba(245,158,11,0.14)',
        color: transportReady ? '#34D399' : '#FBBF24',
      }}
    >
      <Sparkles size={11} style={{ display: 'inline', marginRight: '4px' }} />
      {transportReady ? 'SMTP LIVE' : 'DRY-RUN'} · {recipientCount} Recipients
    </span>
  </div>
);

interface DianaCampaignFeedbackPanelsProps {
  errorMsg: string | null;
  previewHtml: string | null;
  summary: DianaCampaignDispatchSummary | null;
}

export const DianaCampaignFeedbackPanels: FC<DianaCampaignFeedbackPanelsProps> = ({
  errorMsg,
  previewHtml,
  summary,
}) => (
  <>
    {errorMsg && (
      <div
        style={{
          padding: '10px 14px',
          borderRadius: '8px',
          backgroundColor: 'rgba(239,68,68,0.15)',
          border: '1px solid rgba(239,68,68,0.4)',
          color: '#FCA5A5',
          fontSize: '12px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        <AlertTriangle size={14} /> {errorMsg}
      </div>
    )}

    {previewHtml && (
      <div
        style={{
          borderRadius: '12px',
          border: '1px solid rgba(255,255,255,0.12)',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            padding: '8px 12px',
            background: '#1E293B',
            fontSize: '11px',
            fontWeight: 700,
            color: '#94A3B8',
          }}
        >
          LIVE LUXURY EMAIL PREVIEW
        </div>
        <div dangerouslySetInnerHTML={{ __html: previewHtml }} />
      </div>
    )}

    {summary && (
      <div
        style={{
          padding: '12px 14px',
          borderRadius: '8px',
          backgroundColor: 'rgba(16,185,129,0.14)',
          border: '1px solid rgba(16,185,129,0.35)',
          color: '#6EE7B7',
          fontSize: '12px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        <CheckCircle2 size={15} />
        <span>
          Mode: <strong>{summary.mode}</strong> · Sender: <strong>{summary.sender}</strong> ·
          Sent/Previewed:{' '}
          <strong>
            {summary.sentCount}/{summary.totalRequested}
          </strong>{' '}
          (Failed: {summary.failedCount})
        </span>
      </div>
    )}
  </>
);
