/**
 * DianaEmailCampaignCenter.tsx — AI Diana (MGR-02-6) Property Owner Email Campaign UI
 * Sender: the.arslan.broker@gmail.com
 * Standard: AEGIS Canonical Architecture & Single Purpose File Law (< 350 lines, AEG-042)
 */
import React, { FC, useState } from 'react';
import { Mail, Send, Eye, CheckCircle2, AlertTriangle, Sparkles } from 'lucide-react';

export interface DianaCampaignDispatchSummary {
  sender: string;
  mode: 'LIVE_SMTP' | 'DRY_RUN';
  totalRequested: number;
  sentCount: number;
  failedCount: number;
}

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

  React.useEffect(() => {
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
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '14px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: 'rgba(239,68,68,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Mail size={20} color="#EF4444" />
          </div>
          <div>
            <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 800 }}>AI Diana — Property Owner Email Campaigns</h2>
            <div style={{ fontSize: '12px', color: '#94A3B8' }}>
              MGR-02-6 · DEPT-02 Marketing · Sender: <strong style={{ color: '#FFFFFF' }}>the.arslan.broker@gmail.com</strong>
            </div>
          </div>
        </div>
        <span
          style={{
            fontSize: '11px',
            fontWeight: 700,
            padding: '4px 10px',
            borderRadius: '9999px',
            backgroundColor: mailerStatus?.transportReady
              ? 'rgba(16,185,129,0.14)'
              : 'rgba(245,158,11,0.14)',
            color: mailerStatus?.transportReady ? '#34D399' : '#FBBF24',
          }}
        >
          <Sparkles size={11} style={{ display: 'inline', marginRight: '4px' }} />
          {mailerStatus?.transportReady ? 'SMTP LIVE' : 'DRY-RUN'} · {parsedEmails.length} Recipients
        </span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
        <label style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '12px', color: '#CBD5E1' }}>
          Email Subject
          <input
            value={subject}
            onChange={e => setSubject(e.target.value)}
            style={{ background: '#1E293B', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '8px', padding: '9px 12px', color: '#FFFFFF' }}
          />
        </label>
        <label style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '12px', color: '#CBD5E1' }}>
          Luxury Banner Headline
          <input
            value={headline}
            onChange={e => setHeadline(e.target.value)}
            style={{ background: '#1E293B', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '8px', padding: '9px 12px', color: '#FFFFFF' }}
          />
        </label>
      </div>

      <label style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '12px', color: '#CBD5E1' }}>
        Property Owner Email Addresses (comma or newline separated)
        <textarea
          rows={4}
          placeholder="owner1@example.com, owner2@example.com"
          value={recipientsRaw}
          onChange={e => setRecipientsRaw(e.target.value)}
          style={{ background: '#1E293B', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '8px', padding: '10px 12px', color: '#FFFFFF', fontFamily: 'monospace', fontSize: '12px' }}
        />
      </label>

      <label style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '12px', color: '#CBD5E1' }}>
        Campaign Message Body
        <textarea
          rows={5}
          value={bodyText}
          onChange={e => setBodyText(e.target.value)}
          style={{ background: '#1E293B', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '8px', padding: '10px 12px', color: '#FFFFFF' }}
        />
      </label>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '8px' }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: '#CBD5E1', cursor: 'pointer' }}>
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

      {errorMsg && (
        <div style={{ padding: '10px 14px', borderRadius: '8px', backgroundColor: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.4)', color: '#FCA5A5', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <AlertTriangle size={14} /> {errorMsg}
        </div>
      )}

      {previewHtml && (
        <div style={{ borderRadius: '12px', border: '1px solid rgba(255,255,255,0.12)', overflow: 'hidden' }}>
          <div style={{ padding: '8px 12px', background: '#1E293B', fontSize: '11px', fontWeight: 700, color: '#94A3B8' }}>
            LIVE LUXURY EMAIL PREVIEW
          </div>
          <div dangerouslySetInnerHTML={{ __html: previewHtml }} />
        </div>
      )}

      {summary && (
        <div style={{ padding: '12px 14px', borderRadius: '8px', backgroundColor: 'rgba(16,185,129,0.14)', border: '1px solid rgba(16,185,129,0.35)', color: '#6EE7B7', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <CheckCircle2 size={15} />
          <span>
            Mode: <strong>{summary.mode}</strong> · Sender: <strong>{summary.sender}</strong> · Sent/Previewed:{' '}
            <strong>{summary.sentCount}/{summary.totalRequested}</strong> (Failed: {summary.failedCount})
          </span>
        </div>
      )}
    </div>
  );
};

export default DianaEmailCampaignCenter;
