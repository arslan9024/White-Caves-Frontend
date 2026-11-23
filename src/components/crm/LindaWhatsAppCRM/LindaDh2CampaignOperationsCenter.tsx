/**
 * LindaDh2CampaignOperationsCenter.tsx
 * White Caves Real Estate LLC — Mission 1 & 2 Operations Center
 * Architecture: AEGIS Canonical Architecture & Single Purpose File Law (< 350 lines).
 *
 * Capabilities:
 * 1. 38 DAMAC Hills 2 Cluster Selector with 1-click Akoya sheet ingestion.
 * 2. 10-SIM Live Status Bar:
 *    - 1 Primary Master Closer (+971505760056) hard-protected badge.
 *    - 9 Hunter SIMs with 18/hr cap, Gaussian jitter, and Friday prayer indicators.
 * 3. Real-time Template Selector with dynamic variable previews ({{ownerName}}, {{cluster}}, {{unitRef}}).
 * 4. Mission 2 Follow-Up Queue directly integrated for MD Arslan Malik.
 */

import React, { FC, useState } from 'react';
import {
  Send,
  Radio,
  Clock,
  Sparkles,
  PhoneCall,
  CheckCircle,
  FileSpreadsheet,
  AlertTriangle,
} from 'lucide-react';
import { LindaMdFollowUpQueuePanel } from './LindaMdFollowUpQueuePanel';

export const DH2_38_CLUSTERS = [
  'All 38 Clusters',
  'Pacifica',
  'Camelia',
  'Albizia',
  'Basswood',
  'Clivia',
  'Amargo',
  'Zinnia',
  'Mimosa',
  'Vardon',
  'Juniper',
  'Sycamore',
  'Coursetia',
  'Centauri',
  'Sanctuary',
  'Mulberry',
  'Acuna',
  'Aknan',
  'Aster',
  'Avencia',
  'Centaury',
  'Dahlia',
  'Elo',
  'Fiora',
  'Flamingo',
  'Hawthorn',
  'Janusia',
  'Just Cavalli',
  'Navitas',
  'Odora',
  'Paloverde',
  'Park Greens',
  'Primrose',
  'Trixis',
  'Verona',
  'Virdis',
  'Violet',
  'Water Town',
  'Victoria',
];

export const CAMPAIGN_TEMPLATES = [
  {
    id: 'tpl-1',
    label: 'Standard In-Market Outreach',
    text: 'Hello {{ownerName}}, this is Linda from White Caves Real Estate LLC (DAMAC Hills 2 Leasing Desk). We have pre-qualified tenants looking for {{bedrooms}}BR units in {{cluster}}, DAMAC Hills 2. Is your unit {{unitRef}} available for rent soon?',
  },
  {
    id: 'tpl-2',
    label: 'High Demand Direct Inquiry',
    text: 'Hi {{ownerName}}, White Caves Real Estate LLC here. Demand for {{cluster}} in DAMAC Hills 2 is very strong this week — are you considering leasing unit {{unitRef}}? We handle verified viewings and Ejari directly.',
  },
  {
    id: 'tpl-3',
    label: 'Zero Commission Corporate Placement',
    text: 'Greetings {{ownerName}}! Linda from White Caves Real Estate (DAMAC Hills 2 Specialists). We currently have active corporate tenants searching in {{cluster}}. Would you like us to list {{unitRef}} on whitecaves.com at zero landlord commission?',
  },
];

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

  const activeTemplate =
    CAMPAIGN_TEMPLATES.find(t => t.id === selectedTemplateId)?.text || CAMPAIGN_TEMPLATES[0].text;

  const previewCluster = selectedCluster === 'All 38 Clusters' ? 'Vardon' : selectedCluster;
  const previewText = activeTemplate
    .replace('{{ownerName}}', 'Mohammed Al Mansoori')
    .replace('{{cluster}}', previewCluster)
    .replace('{{unitRef}}', `${previewCluster} Villa 412`)
    .replace('{{bedrooms}}', '3');

  const handleLaunchCampaign = async () => {
    setLaunching(true);
    setLaunchSuccess(null);
    setLaunchError(null);
    try {
      const headers: Record<string, string> = { 'Content-Type': 'application/json' };
      if (authToken) headers.Authorization = `Bearer ${authToken}`;

      const res = await fetch(`${apiBaseUrl}/api/linda/campaigns/dh2-landlord-launch`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          source: 'akoya_sheet',
          cluster: selectedCluster === 'All 38 Clusters' ? undefined : selectedCluster,
          templates: [activeTemplate],
          dryRun: isDryRun,
          limit: 100,
        }),
      });

      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.error || 'Failed to dispatch DH2 campaign');
      }

      setLaunchSuccess(
        `Dispatched! ${json.data?.validLandlords || 'Eligible'} recipients queued across 9 Hunter SIMs with Gaussian anti-ban jitter.`
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
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px',
          padding: '14px 18px',
          background:
            'linear-gradient(135deg, rgba(15, 23, 42, 0.9) 0%, rgba(30, 41, 59, 0.9) 100%)',
          borderRadius: '12px',
          border: '1px solid rgba(239, 68, 68, 0.3)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '4px 10px',
              borderRadius: '6px',
              background: '#EF4444',
              color: '#FFFFFF',
              fontSize: '0.75rem',
              fontWeight: 900,
              letterSpacing: '0.04em',
            }}
          >
            <Radio size={14} />
            <span>PRIMARY MASTER CLOSER: +971 50 576 0056</span>
          </div>

          <span style={{ fontSize: '0.78rem', color: '#10B981', fontWeight: 700 }}>
            ● 9 Hunter SIMs Rotated (18/hr Cap · 35–65s Jitter)
          </span>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '0.75rem',
            color: '#94A3B8',
          }}
        >
          <Clock size={14} className="text-amber-400" />
          <span>
            Friday Prayer Guard: <strong>12:00 – 14:30 GST</strong>
          </span>
        </div>
      </div>

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
        {/* Cluster Picker */}
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
            <span>Synced with Google Drive Akoya Oxygen Sheet</span>
          </div>
        </div>

        {/* Template Picker */}
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

          {/* Mode Switch: Dry-run vs Live */}
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
          <span style={{ fontSize: '0.72rem', color: '#64748B' }}>
            Target: {previewCluster} Villa
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

        {/* Dispatch Button */}
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
              transition: 'all 0.2s ease',
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

      {/* ── 4. MISSION 2 PRIMARY MASTER CLOSER QUEUE ── */}
      <LindaMdFollowUpQueuePanel apiBaseUrl={apiBaseUrl} authToken={authToken} />
    </div>
  );
};

export default LindaDh2CampaignOperationsCenter;
