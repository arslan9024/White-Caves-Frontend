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
        asyncJob?: boolean;
        data?: {
          jobId?: string;
          status?: string;
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

      if (json.asyncJob && json.data?.jobId) {
        setLaunchSuccess(
          `Live Fleet Job Queued (${json.data.jobId}) for ${json.data.totalRecipients ?? 'eligible'} recipients — running safely in background with 35–65s Gaussian anti-ban pacing.`
        );
      } else {
        const count =
          json.data?.sentCount ||
          json.data?.dryRunCount ||
          json.data?.validLandlords ||
          json.data?.totalRecipients ||
          'Eligible';
        setLaunchSuccess(
          `${isDryRun ? 'Dry-Run Verified' : 'Dispatched'}! ${count} recipients audited under Public Listing Privacy Rule & Gaussian anti-ban pacing.`
        );
      }
    } catch (err: unknown) {
      setLaunchError(err instanceof Error ? err.message : 'Campaign launch failed');
    } finally {
      setLaunching(false);
    }
  };

  return (
    <div
      data-testid="linda-campaign-ops-center"
      className="flex flex-col gap-5 rounded-2xl border border-white/10 bg-[#0B1120] p-5 text-white"
    >
      {/* ── 1. 10-SIM FLEET STATUS & ANTI-BAN BANNER ── */}
      <LindaDh2FleetBanner />

      {/* ── 2. CAMPAIGN BUILDER: 38 CLUSTERS & TEMPLATES ── */}
      <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-5 rounded-xl border border-white/5 bg-white/[0.02] p-4">
        <div>
          <label className="mb-2 block text-xs font-extrabold text-slate-300">
            Select DAMAC Hills 2 Cluster (38 Total):
          </label>
          <select
            value={selectedCluster}
            onChange={e => setSelectedCluster(e.target.value)}
            className="w-full rounded-lg border border-white/15 bg-[#0F172A] px-3 py-2.5 text-sm font-semibold text-white outline-none"
          >
            {DH2_38_CLUSTERS.map(c => (
              <option key={c} value={c}>
                {c === 'All 38 Clusters'
                  ? '🌐 All 38 DH2 Clusters (Full Ingestion)'
                  : `🏡 ${c} Cluster`}
              </option>
            ))}
          </select>

          <div className="mt-2.5 flex items-center gap-1.5 text-xs text-slate-500">
            <FileSpreadsheet size={14} className="text-emerald-400" />
            <span>Synced with Google Drive Akoya Sheet &amp; Henry Tenancy Contracts</span>
          </div>
        </div>

        <div>
          <label className="mb-2 block text-xs font-extrabold text-slate-300">
            Outreach Message Template:
          </label>
          <select
            value={selectedTemplateId}
            onChange={e => setSelectedTemplateId(e.target.value)}
            className="w-full rounded-lg border border-white/15 bg-[#0F172A] px-3 py-2.5 text-sm font-semibold text-white outline-none"
          >
            {CAMPAIGN_TEMPLATES.map(t => (
              <option key={t.id} value={t.id}>
                {t.label}
              </option>
            ))}
          </select>

          <div className="mt-3 flex items-center gap-2.5">
            <label className="flex cursor-pointer items-center gap-1.5 text-xs text-slate-200">
              <input
                type="checkbox"
                checked={isDryRun}
                onChange={e => setIsDryRun(e.target.checked)}
                className="accent-red-500"
              />
              <span>Dry Run Simulation (No real WhatsApp SMS sent)</span>
            </label>
          </div>
        </div>
      </div>

      {/* ── 3. LIVE VARIABLE SPINTAX PREVIEW ── */}
      <div className="rounded-xl border border-white/10 bg-black/35 px-4 py-3.5">
        <div className="mb-1.5 flex flex-wrap items-center justify-between gap-1.5">
          <span className="text-xs font-extrabold tracking-wide text-sky-400">
            ⚡ LIVE WHATSAPP MESSAGE PREVIEW
          </span>
          <span className="inline-flex items-center gap-1 text-xs text-emerald-400">
            <ShieldCheck size={13} />
            Target: {previewCluster} Villa · Privacy-Safe (No Unit #) · whitecaves.ae
          </span>
        </div>
        <p className="m-0 text-xs italic leading-relaxed text-slate-200">"{previewText}"</p>

        <div className="mt-3 flex justify-end">
          <button
            type="button"
            disabled={launching}
            onClick={handleLaunchCampaign}
            className={`inline-flex items-center gap-2 rounded-lg border-0 px-5 py-2.5 text-sm font-extrabold text-white shadow-lg ${
              isDryRun
                ? 'bg-gradient-to-br from-blue-500 to-blue-700'
                : 'bg-gradient-to-br from-red-500 to-red-700'
            } ${launching ? 'cursor-not-allowed opacity-70' : 'cursor-pointer'}`}
          >
            <Send size={15} />
            <span>
              {launching ? 'Deploying...' : isDryRun ? 'Test Run Dispatch' : 'Live Fleet Launch'}
            </span>
          </button>
        </div>

        {launchSuccess && (
          <div className="mt-2.5 rounded-md border border-emerald-500 bg-emerald-500/15 px-3 py-2 text-xs text-emerald-400">
            {launchSuccess}
          </div>
        )}
        {launchError && (
          <div className="mt-2.5 rounded-md border border-red-500 bg-red-500/15 px-3 py-2 text-xs text-red-400">
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
