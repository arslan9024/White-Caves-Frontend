/**
 * DianaEmailCampaignCenter.tsx — AI Diana Supervisor (SUP-02-6-01-1) Property Owner Email Campaign UI
 * Reporting Chain: MD Arslan Malik -> AI Zoe (WC-COO-01) -> AI Olivia (DIR-02) -> AI Celine Lifecycle (MGR-02-6) -> AI Rania Campaigns (AMGR-02-6-01) -> AI Diana (SUP-02-6-01-1)
 * Sender: the.arslan.broker@gmail.com
 * Standard: AEGIS Canonical Architecture & Single Purpose File Law (< 350 lines, AEG-042)
 */
import React, { FC, useState, useEffect } from 'react';
import { Send, Eye } from 'lucide-react';
import { DianaCampaignHeader, DianaCampaignFeedbackPanels } from './DianaCampaignFeedbackPanels';

export interface DianaCampaignDispatchSummary {
  sender: string;
  mode: 'LIVE_SMTP' | 'DRY_RUN';
  totalRequested: number;
  sentCount: number;
  failedCount: number;
}

const INPUT_STYLE: React.CSSProperties = {
  background: '#1E293B',
  border: '1px solid rgba(255,255,255,0.12)',
  borderRadius: '8px',
  padding: '9px 12px',
  color: '#FFFFFF',
};

const LABEL_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
  fontSize: '12px',
  color: '#CBD5E1',
};

export const DianaEmailCampaignCenter: FC = () => {
  const [subject, setSubject] = useState('Exclusive Tenant & Buyer Demand for Your Dubai Property');
  const [headline, setHeadline] = useState('Verified Cash Buyers & Executive Tenants Ready');
  const [bodyText, setBodyText] = useState(
    'We currently have pre-qualified tenants and cash investors actively seeking properties in your community.\n\nReply to this email or WhatsApp us to list your unit with White Caves Real Estate LLC.'
  );
  const [recipientsRaw, setRecipientsRaw] = useState('');
  const [dryRun, setDryRun] = useState(true);
  const [loading, setLoading] = useState(false);
  const [previewHtml, setPreviewHtml] = useState<string | null>(null);
  const [mailerStatus, setMailerStatus] = useState<{
    senderEmail: string;
    transportReady: boolean;
  } | null>(null);
  const [summary, setSummary] = useState<DianaCampaignDispatchSummary | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/diana/campaigns/status')
      .then(r => r.json())
      .then(j => {
        if (j?.success && j.data) setMailerStatus(j.data);
      })
      .catch(() => {});
  }, []);

  const handleLoadPreview = async () => {
    setErrorMsg(null);
    try {
      const res = await fetch('/api/diana/campaigns/preview', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ headline, bodyText, ownerName: 'Valued Property Owner' }),
      });
      const json = await res.json();
      if (json?.success && json.html) setPreviewHtml(json.html);
    } catch {
      setErrorMsg('Could not load HTML preview.');
    }
  };

  const parsedEmails = recipientsRaw
    .split(/[\n,;]+/)
    .map(s => s.trim())
    .filter(s => s.includes('@'));

  const handleDispatch = async () => {
    setErrorMsg(null);
    setSummary(null);
    if (parsedEmails.length === 0) {
      setErrorMsg('Please enter at least one valid property owner email address.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/diana/campaigns/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subject,
          headline,
          bodyText,
          dryRun,
          recipients: parsedEmails.map(email => ({ email })),
        }),
      });
      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.error || 'Failed to dispatch campaign');
      }
      setSummary(json.data);
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Network error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      data-testid="diana-email-campaign-center"
      style={{
        backgroundColor: '#0F172A',
        color: '#FFFFFF',
        padding: '24px',
        borderRadius: '16px',
        border: '1px solid rgba(239, 68, 68, 0.3)',
        maxWidth: '920px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
      }}
    >
      <DianaCampaignHeader
        transportReady={Boolean(mailerStatus?.transportReady)}
        recipientCount={parsedEmails.length}
      />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
        <label style={LABEL_STYLE}>
          Email Subject
          <input value={subject} onChange={e => setSubject(e.target.value)} style={INPUT_STYLE} />
        </label>
        <label style={LABEL_STYLE}>
          Luxury Banner Headline
          <input value={headline} onChange={e => setHeadline(e.target.value)} style={INPUT_STYLE} />
        </label>
      </div>

      <label style={LABEL_STYLE}>
        Property Owner Email Addresses (comma or newline separated)
        <textarea
          rows={4}
          placeholder="owner1@example.com, owner2@example.com"
          value={recipientsRaw}
          onChange={e => setRecipientsRaw(e.target.value)}
          style={{
            ...INPUT_STYLE,
            padding: '10px 12px',
            fontFamily: 'monospace',
            fontSize: '12px',
          }}
        />
      </label>

      <label style={LABEL_STYLE}>
        Campaign Message Body
        <textarea
          rows={5}
          value={bodyText}
          onChange={e => setBodyText(e.target.value)}
          style={{ ...INPUT_STYLE, padding: '10px 12px' }}
        />
      </label>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingTop: '8px',
        }}
      >
        <label
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '12px',
            color: '#CBD5E1',
            cursor: 'pointer',
          }}
        >
          <input type="checkbox" checked={dryRun} onChange={e => setDryRun(e.target.checked)} />
          <span>Safe Dry-Run Mode (preview without sending live SMTP)</span>
        </label>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            type="button"
            onClick={handleLoadPreview}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '10px 14px',
              borderRadius: '10px',
              border: '1px solid rgba(255,255,255,0.16)',
              backgroundColor: '#1E293B',
              color: '#FFFFFF',
              fontWeight: 700,
              fontSize: '12px',
              cursor: 'pointer',
            }}
          >
            <Eye size={14} /> Preview HTML
          </button>
          <button
            type="button"
            disabled={loading}
            onClick={handleDispatch}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 18px',
              borderRadius: '10px',
              border: 'none',
              backgroundColor: '#EF4444',
              color: '#FFFFFF',
              fontWeight: 800,
              fontSize: '13px',
              cursor: loading ? 'not-allowed' : 'pointer',
            }}
          >
            {dryRun ? <Eye size={15} /> : <Send size={15} />}
            {loading ? 'Dispatching...' : dryRun ? 'Run Safe Preview' : 'Send Live via Gmail'}
          </button>
        </div>
      </div>

      <DianaCampaignFeedbackPanels
        errorMsg={errorMsg}
        previewHtml={previewHtml}
        summary={summary}
      />
    </div>
  );
};

export default DianaEmailCampaignCenter;
