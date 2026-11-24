/**
 * LindaDh2CampaignOperationsCenter.tsx
 * White Caves Real Estate LLC — Mission 1 & 2 Operations Center
 * Architecture: AEGIS Canonical Architecture & Single Purpose File Law (< 350 lines).
 *
 * Capabilities:
 * 1. 38 DAMAC Hills 2 Cluster Selector with 1-click Akoya sheet & Henry Drive warm contact sync.
 * 2. 10-SIM Live Status Bar: 1 Primary Master Closer (+971505760056) + 9 Hunter SIMs.
 * 3. Privacy-Safe Template Selector (zero private unit/villa/plot numbers, whitecaves.ae CTA).
 * 4. DH2 Warm Contacts & E2E Test Dispatch Verifier + Mission 2 Primary Master Queue.
 */

import React, { FC, useState } from 'react';
import { Send, FileSpreadsheet, ShieldCheck } from 'lucide-react';
import { apiClient } from '../../../utils/apiClient';
import { LindaMdFollowUpQueuePanel } from './LindaMdFollowUpQueuePanel';
import { LindaWarmContactsPanel } from './LindaWarmContactsPanel';

import { DH2_38_CLUSTERS, CAMPAIGN_TEMPLATES, LindaDh2FleetBanner } from './LindaDh2CampaignConfig';
export { DH2_38_CLUSTERS, CAMPAIGN_TEMPLATES };

interface Props {
  apiBaseUrl?: string;
  authToken?: string;
}

export const LindaDh2CampaignOperationsCenter: FC<Props> = ({ apiBaseUrl = '', authToken }) => {
  const [selectedCluster, setSelectedCluster] = useState<string>('All 38 Clusters');
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>('tpl-1');
  const [isDryRun, setIsDryRun] = useState<boolean>(true);
  const [launching, setLaunching] = useState<boolean>(false);
  const [launchSuccess, setLaunchSuccess] = useState<string | null>(null);
  const [launchError, setLaunchError] = useState<string | null>(null);

  const selectedTemplateObj =
    CAMPAIGN_TEMPLATES.find(t => t.id === selectedTemplateId) || CAMPAIGN_TEMPLATES[0];
  const activeTemplate = selectedTemplateObj.text;

  const previewCluster = selectedCluster === 'All 38 Clusters' ? 'Vardon' : selectedCluster;
  const previewText = activeTemplate
    .replace(/\{\{ownerName\}\}/g, 'Mohammed Al Mansoori')
    .replace(/\{\{cluster\}\}/g, previewCluster)
    .replace(/\{\{bedrooms\}\}/g, '3');

  const handleLaunchCampaign = async () => {
    setLaunching(true);
    setLaunchSuccess(null);
    setLaunchError(null);
    try {
      const payload = {
        source: 'akoya_sheet',
        sequenceKey: selectedTemplateObj.sequenceKey,
        cluster: selectedCluster === 'All 38 Clusters' ? undefined : selectedCluster,
        templates: [activeTemplate],
        customTemplate: activeTemplate,
        dryRun: isDryRun,
        limit: 100,
      };

      const endpoint =
        selectedTemplateObj.sequenceKey === 'DH2_LANDLORD_DISCOVERY'
          ? '/linda/campaigns/dh2-landlord-launch'
          : '/linda/campaigns/warm-sequence-launch';

      let json: {
        success?: boolean;
        data?: {
          validLandlords?: number;
          totalRecipients?: number;
          dryRunCount?: number;
          sentCount?: number;
        };
        error?: string;
      };
      if (apiBaseUrl || authToken) {
        const headers: Record<string, string> = { 'Content-Type': 'application/json' };
        if (authToken) headers.Authorization = `Bearer ${authToken}`;
        const res = await fetch(`${apiBaseUrl}/api${endpoint}`, {
          method: 'POST',
          headers,
          body: JSON.stringify(payload),
        });
        json = await res.json();
        if (!res.ok || !json.success)
          throw new Error(json.error || 'Failed to dispatch DH2 campaign');
      } else {
        json = (await apiClient.post(endpoint, payload)) as typeof json;
        if (!json?.success) throw new Error(json?.error || 'Failed to dispatch DH2 campaign');
      }

      const count =
        json.data?.sentCount ||
        json.data?.dryRunCount ||
        json.data?.validLandlords ||
        json.data?.totalRecipients ||
        'Eligible';
      setLaunchSuccess(
        `${isDryRun ? 'Dry-Run Verified' : 'Dispatched'}! ${count} recipients audited under Public Listing Privacy Rule & Gaussian anti-ban pacing.`
      );
    } catch (err: unknown) {
      setLaunchError(err instanceof Error ? err.message : 'Campaign launch failed');
    } finally {
      setLaunching(false);
    }
  };

  return (
    <div
      data-testid="linda-campaign-ops-center"
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1.25rem',
        padding: '1.25rem',
        background: '#0B1120',
        borderRadius: '16px',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        color: '#FFFFFF',
      }}
    >
      {/* ── 1. 10-SIM FLEET STATUS & ANTI-BAN BANNER ── */}
      <LindaDh2FleetBanner />

      {/* ── 2. CAMPAIGN BUILDER: 38 CLUSTERS & TEMPLATES ── */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.25rem',
          padding: '16px',
          background: 'rgba(255, 255, 255, 0.02)',
          borderRadius: '12px',
          border: '1px solid rgba(255, 255, 255, 0.06)',
        }}
      >
        <div>
          <label
            style={{
              display: 'block',
              fontSize: '0.8rem',
              fontWeight: 800,
              color: '#CBD5E1',
              marginBottom: '8px',
            }}
          >
            Select DAMAC Hills 2 Cluster (38 Total):
          </label>
          <select
            value={selectedCluster}
            onChange={e => setSelectedCluster(e.target.value)}
            style={{
              width: '100%',
              padding: '10px 12px',
              borderRadius: '8px',
              background: '#0F172A',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              color: '#FFFFFF',
              fontSize: '0.85rem',
              fontWeight: 600,
              outline: 'none',
            }}
          >
            {DH2_38_CLUSTERS.map(c => (
              <option key={c} value={c}>
                {c === 'All 38 Clusters'
                  ? '🌐 All 38 DH2 Clusters (Full Ingestion)'
                  : `🏡 ${c} Cluster`}
              </option>
            ))}
          </select>

          <div
            style={{
              marginTop: '10px',
              fontSize: '0.74rem',
              color: '#64748B',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <FileSpreadsheet size={14} className="text-emerald-400" />
            <span>Synced with Google Drive Akoya Sheet &amp; Henry Tenancy Contracts</span>
          </div>
        </div>

        <div>
          <label
            style={{
              display: 'block',
              fontSize: '0.8rem',
              fontWeight: 800,
              color: '#CBD5E1',
              marginBottom: '8px',
            }}
          >
            Outreach Message Template:
          </label>
          <select
            value={selectedTemplateId}
            onChange={e => setSelectedTemplateId(e.target.value)}
            style={{
              width: '100%',
              padding: '10px 12px',
              borderRadius: '8px',
              background: '#0F172A',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              color: '#FFFFFF',
              fontSize: '0.85rem',
              fontWeight: 600,
              outline: 'none',
            }}
          >
            {CAMPAIGN_TEMPLATES.map(t => (
              <option key={t.id} value={t.id}>
                {t.label}
              </option>
            ))}
          </select>

          <div style={{ marginTop: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <label
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '0.78rem',
                color: '#E2E8F0',
                cursor: 'pointer',
              }}
            >
              <input
                type="checkbox"
                checked={isDryRun}
                onChange={e => setIsDryRun(e.target.checked)}
                style={{ accentColor: '#EF4444' }}
              />
              <span>Dry Run Simulation (No real WhatsApp SMS sent)</span>
            </label>
          </div>
        </div>
      </div>

      {/* ── 3. LIVE VARIABLE SPINTAX PREVIEW ── */}
      <div
        style={{
          padding: '14px 16px',
          background: 'rgba(0, 0, 0, 0.35)',
          borderRadius: '10px',
          border: '1px solid rgba(255, 255, 255, 0.08)',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '6px',
            flexWrap: 'wrap',
            gap: 6,
          }}
        >
          <span
            style={{
              fontSize: '0.75rem',
              fontWeight: 800,
              color: '#38BDF8',
              letterSpacing: '0.04em',
            }}
          >
            ⚡ LIVE WHATSAPP MESSAGE PREVIEW
          </span>
          <span
            style={{
              fontSize: '0.72rem',
              color: '#10B981',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 4,
            }}
          >
            <ShieldCheck size={13} />
            Target: {previewCluster} Villa · Privacy-Safe (No Unit #) · whitecaves.ae
          </span>
        </div>
        <p
          style={{
            margin: 0,
            fontSize: '0.82rem',
            color: '#E2E8F0',
            lineHeight: 1.5,
            fontStyle: 'italic',
          }}
        >
          "{previewText}"
        </p>

        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '12px' }}>
          <button
            type="button"
            disabled={launching}
            onClick={handleLaunchCampaign}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 22px',
              borderRadius: '8px',
              background: isDryRun
                ? 'linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)'
                : 'linear-gradient(135deg, #EF4444 0%, #B91C1C 100%)',
              color: '#FFFFFF',
              fontSize: '0.85rem',
              fontWeight: 800,
              border: 'none',
              cursor: launching ? 'not-allowed' : 'pointer',
              boxShadow: '0 4px 14px rgba(0, 0, 0, 0.3)',
            }}
          >
            <Send size={15} />
            <span>
              {launching ? 'Deploying...' : isDryRun ? 'Test Run Dispatch' : 'Live Fleet Launch'}
            </span>
          </button>
        </div>

        {launchSuccess && (
          <div
            style={{
              marginTop: '10px',
              padding: '8px 12px',
              background: 'rgba(16, 185, 129, 0.15)',
              border: '1px solid #10B981',
              borderRadius: '6px',
              color: '#10B981',
              fontSize: '0.78rem',
            }}
          >
            {launchSuccess}
          </div>
        )}
        {launchError && (
          <div
            style={{
              marginTop: '10px',
              padding: '8px 12px',
              background: 'rgba(239, 68, 68, 0.15)',
              border: '1px solid #EF4444',
              borderRadius: '6px',
              color: '#EF4444',
              fontSize: '0.78rem',
            }}
          >
            {launchError}
          </div>
        )}
      </div>

      {/* ── 3B. DH2 WARM CONTACTS (HENRY DRIVE TENANCY CONTRACTS) & E2E TEST DISPATCH ── */}
      <LindaWarmContactsPanel selectedCluster={selectedCluster} isDryRun={isDryRun} />

      {/* ── 4. MISSION 2 PRIMARY MASTER CLOSER QUEUE ── */}
      <LindaMdFollowUpQueuePanel apiBaseUrl={apiBaseUrl} authToken={authToken} />
    </div>
  );
};

export default LindaDh2CampaignOperationsCenter;
