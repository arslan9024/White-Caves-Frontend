/**
 * LindaWarmContactsPanel.tsx
 * White Caves Real Estate LLC — DAMAC Hills 2 Warm Contacts & E2E Dispatch Verifier
 * Architecture: AEGIS V5.1 AEG-042 (< 350 lines).
 *
 * Connects ~100 historical DH2 Landlords & Tenants (from Henry Drive Tenancy Contracts
 * & DH2 Registry) to Linda's categorized campaign sequences (Landlord Retention & Renewal
 * vs Tenant Follow-up) with End-to-End Test Dispatch, Privacy Audit & Live Delivery Logs.
 */

import React, { FC, useEffect, useState, useCallback } from 'react';
import { Users, ShieldCheck, Send, RefreshCw, CheckCircle2, FlaskConical, Ban } from 'lucide-react';
import { apiClient } from '../../../utils/apiClient';
import type { WarmSummary, TestDispatchReport } from './LindaDh2CampaignConfig';

interface Props {
  selectedCluster: string;
  isDryRun: boolean;
}

export const LindaWarmContactsPanel: FC<Props> = ({ selectedCluster, isDryRun }) => {
  const [category, setCategory] = useState<
    'ALL' | 'LANDLORD_RETENTION_RENEWAL' | 'TENANT_FOLLOWUP'
  >('ALL');
  const [summary, setSummary] = useState<WarmSummary | null>(null);
  const [loading, setLoading] = useState(false);
  const [launching, setLaunching] = useState(false);
  const [testing, setTesting] = useState(false);
  const [statusBanner, setStatusBanner] = useState<string | null>(null);
  const [testReport, setTestReport] = useState<TestDispatchReport | null>(null);

  const loadWarmContacts = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ category, limit: '100' });
      if (selectedCluster && selectedCluster !== 'All 38 Clusters') {
        params.set('cluster', selectedCluster);
      }
      const res = (await apiClient.get(`/linda/warm-contacts?${params.toString()}`)) as {
        success?: boolean;
        data?: WarmSummary;
      };
      if (res?.success && res.data) setSummary(res.data);
    } catch {
      setSummary(null);
    } finally {
      setLoading(false);
    }
  }, [category, selectedCluster]);

  useEffect(() => {
    void loadWarmContacts();
  }, [loadWarmContacts]);

  const handleLaunchSequence = async (
    sequenceKey: 'LANDLORD_RETENTION_RENEWAL' | 'TENANT_FOLLOWUP'
  ) => {
    setLaunching(true);
    setStatusBanner(null);
    try {
      const res = (await apiClient.post('/linda/campaigns/warm-sequence-launch', {
        sequenceKey,
        cluster: selectedCluster === 'All 38 Clusters' ? undefined : selectedCluster,
        dryRun: isDryRun,
        limit: 25,
      })) as {
        success?: boolean;
        data?: {
          totalRecipients: number;
          sentCount: number;
          dryRunCount: number;
          dncSuppressedCount: number;
        };
        error?: string;
      };
      if (!res?.success || !res.data) throw new Error(res?.error || 'Sequence launch failed');
      const d = res.data;
      setStatusBanner(
        `${sequenceKey === 'LANDLORD_RETENTION_RENEWAL' ? 'Landlord Retention' : 'Tenant Follow-Up'} ${
          isDryRun ? 'Dry-Run Verified' : 'Dispatched'
        }: ${d.sentCount || d.dryRunCount}/${d.totalRecipients} contacts · ${d.dncSuppressedCount} DNC protected.`
      );
    } catch (err) {
      setStatusBanner(err instanceof Error ? err.message : 'Unable to launch sequence');
    } finally {
      setLaunching(false);
    }
  };

  const handleRunEndToEndTest = async () => {
    setTesting(true);
    setStatusBanner(null);
    try {
      const seq = category === 'TENANT_FOLLOWUP' ? 'TENANT_FOLLOWUP' : 'LANDLORD_RETENTION_RENEWAL';
      const res = (await apiClient.post('/linda/test-dispatch', {
        sequenceKey: seq,
        cluster: selectedCluster === 'All 38 Clusters' ? 'Pacifica' : selectedCluster,
      })) as { success?: boolean; data?: TestDispatchReport; error?: string };
      if (!res?.success || !res.data) throw new Error(res?.error || 'E2E test dispatch failed');
      setTestReport(res.data);
    } catch (err) {
      setStatusBanner(err instanceof Error ? err.message : 'E2E test unavailable');
    } finally {
      setTesting(false);
    }
  };

  const visibleContacts = (summary?.contacts || []).slice(0, 12);

  return (
    <section
      data-testid="linda-warm-contacts-panel"
      className="rounded-xl border border-slate-700/70 bg-slate-900/90 p-4 text-slate-100"
    >
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <div>
          <h3 className="flex items-center gap-2 text-sm font-bold text-white">
            <Users className="h-4 w-4 text-red-400" />
            DH2 Imported Warm Contacts — Henry Drive &amp; Tenancy Contracts
          </h3>
          <p className="text-xs text-slate-400">
            Categorized for Landlord Retention &amp; Renewal ({summary?.landlordRetentionCount ?? 0}
            ) &amp; Tenant Follow-Up ({summary?.tenantFollowUpCount ?? 0}) · whitecaves.ae CTA
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            data-testid="linda-e2e-test-dispatch-btn"
            disabled={testing}
            onClick={() => void handleRunEndToEndTest()}
            className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-500/50 bg-emerald-500/15 px-3 py-1.5 text-xs font-bold text-emerald-300 hover:bg-emerald-500/25"
          >
            <FlaskConical className="h-3.5 w-3.5" />
            {testing ? 'Verifying...' : 'E2E Test Dispatch & Triage'}
          </button>
          <button
            type="button"
            onClick={() => void loadWarmContacts()}
            className="inline-flex items-center gap-1 rounded-lg border border-slate-600 bg-slate-800 px-2.5 py-1.5 text-xs font-semibold text-slate-200 hover:bg-slate-700"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${loading ? 'animate-spin' : ''}`} />
            Sync
          </button>
        </div>
      </div>

      {/* Category Filters + 1-Click Sequence Launchers */}
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap gap-1.5">
          {(
            [
              { id: 'ALL', label: `All (${summary?.total ?? 0})` },
              {
                id: 'LANDLORD_RETENTION_RENEWAL',
                label: `Landlord Retention (${summary?.landlordRetentionCount ?? 0})`,
              },
              {
                id: 'TENANT_FOLLOWUP',
                label: `Tenant Follow-Up (${summary?.tenantFollowUpCount ?? 0})`,
              },
            ] as const
          ).map(tab => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setCategory(tab.id)}
              className={`rounded-md px-2.5 py-1 text-xs font-semibold ${
                category === tab.id
                  ? 'bg-red-500 text-white'
                  : 'border border-slate-700 bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            disabled={launching}
            onClick={() => void handleLaunchSequence('LANDLORD_RETENTION_RENEWAL')}
            className="inline-flex items-center gap-1 rounded-md bg-slate-800 px-2.5 py-1 text-xs font-bold text-amber-300 ring-1 ring-amber-400/40 hover:bg-slate-700"
          >
            <Send className="h-3 w-3" />
            Launch Landlord Retention
          </button>
          <button
            type="button"
            disabled={launching}
            onClick={() => void handleLaunchSequence('TENANT_FOLLOWUP')}
            className="inline-flex items-center gap-1 rounded-md bg-slate-800 px-2.5 py-1 text-xs font-bold text-sky-300 ring-1 ring-sky-400/40 hover:bg-slate-700"
          >
            <Send className="h-3 w-3" />
            Launch Tenant Follow-Up
          </button>
        </div>
      </div>

      {statusBanner && (
        <div className="mb-3 flex items-center gap-2 rounded-lg border border-emerald-500/40 bg-emerald-500/10 px-3 py-2 text-xs text-emerald-300">
          <CheckCircle2 className="h-4 w-4 shrink-0" />
          <span>{statusBanner}</span>
        </div>
      )}

      {testReport && (
        <div
          data-testid="linda-e2e-test-report"
          className="mb-3 rounded-lg border border-sky-500/40 bg-slate-950/90 p-3 text-xs"
        >
          <div className="mb-1 flex flex-wrap items-center justify-between gap-2 font-bold text-sky-300">
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
              E2E Dispatch &amp; Inbound Triage Verified
            </span>
            <span className="text-emerald-400">
              Privacy Audit:{' '}
              {testReport.outboundPayload?.privacyAuditPassed ? 'PASS (Zero Unit Leaks)' : 'CHECK'}{' '}
              · Spam Score: {testReport.outboundPayload?.spamRiskScore ?? 0}/100
            </span>
          </div>
          {testReport.outboundPayload && (
            <p className="my-1 italic text-slate-300">"{testReport.outboundPayload.message}"</p>
          )}
          <div className="text-slate-400">
            Inbound Triage:{' '}
            <strong className="text-white">
              {testReport.inboundTriage?.result?.syncedToMaryVault
                ? 'Synced to Mary Vault + Mission 2 MD Queue (+971505760056)'
                : testReport.inboundTriage?.result?.routed
                  ? 'Routed to Daisy (MGR-05-2) Viewing Slot'
                  : testReport.inboundTriage?.result?.reason || 'Verified'}
            </strong>
          </div>
        </div>
      )}

      {/* Categorized Warm Contact Preview Table */}
      <div className="max-h-52 overflow-y-auto rounded-lg border border-slate-800">
        <table className="w-full border-collapse text-left text-xs">
          <thead className="bg-slate-950 text-slate-400">
            <tr>
              <th className="px-2.5 py-2">Contact</th>
              <th className="px-2.5 py-2">Segment</th>
              <th className="px-2.5 py-2">Cluster</th>
              <th className="px-2.5 py-2">Lease Expiry</th>
              <th className="px-2.5 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {visibleContacts.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-3 py-4 text-center text-slate-500">
                  {loading
                    ? 'Loading DAMAC Hills 2 warm contacts...'
                    : 'Click Sync to load Henry Drive & DH2 warm contacts.'}
                </td>
              </tr>
            ) : (
              visibleContacts.map(c => (
                <tr key={c.id} className="border-t border-slate-800/80">
                  <td className="px-2.5 py-1.5">
                    <div className="font-semibold text-white">{c.name}</div>
                    <div className="font-mono text-[10px] text-slate-400">{c.e164}</div>
                  </td>
                  <td className="px-2.5 py-1.5">
                    <span
                      className={`rounded px-1.5 py-0.5 text-[10px] font-bold ${
                        c.category === 'LANDLORD_RETENTION_RENEWAL'
                          ? 'bg-amber-500/20 text-amber-300'
                          : 'bg-sky-500/20 text-sky-300'
                      }`}
                    >
                      {c.category === 'LANDLORD_RETENTION_RENEWAL'
                        ? 'Landlord Renewal'
                        : 'Tenant Follow-Up'}
                    </span>
                  </td>
                  <td className="px-2.5 py-1.5 text-slate-300">
                    {c.cluster} ({c.bedrooms}BR)
                  </td>
                  <td className="px-2.5 py-1.5 text-slate-300">
                    {c.leaseEndDate || 'Active'}{' '}
                    {c.daysUntilExpiry !== null && (
                      <span className="text-[10px] text-slate-400">({c.daysUntilExpiry}d)</span>
                    )}
                  </td>
                  <td className="px-2.5 py-1.5">
                    {c.dncSuppressed ? (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-red-400">
                        <Ban className="h-3 w-3" /> DNC
                      </span>
                    ) : (
                      <span className="text-[10px] font-semibold text-emerald-400">
                        {c.urgency}
                      </span>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default LindaWarmContactsPanel;
