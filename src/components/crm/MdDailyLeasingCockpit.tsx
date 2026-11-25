/**
 * MdDailyLeasingCockpit.tsx — Managing Director Sovereign Daily Leasing Cockpit
 * Wired to GET /api/leasing-formula/cockpit/daily-summary with inline 12-Stage Deal Cockpit,
 * 1-click sequential Payment Receipt & 5% UAE VAT PDF downloads, and SUP-05-2-01-1 authority badge.
 * Single-purpose module (< 350 lines, AEG-042).
 */

import React, { useEffect, useState } from 'react';
import {
  Radio,
  Building2,
  CalendarClock,
  FileSignature,
  BellRing,
  RefreshCw,
  ExternalLink,
  ShieldCheck,
  FileDown,
  AlertTriangle,
  Layers,
} from 'lucide-react';
import { LindaMdFollowUpQueuePanel } from './LindaWhatsAppCRM/LindaMdFollowUpQueuePanel';
import { TenancyDealCockpit } from './DealManager/TenancyDealCockpit';
import { TRACK_A_SUPERVISOR_CHAIN } from './DealManager/tenancyCockpit/tenancyCockpit.data';

interface DailyCockpitData {
  generatedAt: string;
  primaryMasterPhone: string;
  simFleet: {
    poolSize: number;
    hunterPoolSize: number;
    connectedCount: number;
    connectedHunterCount: number;
  };
  dncSuppressedCount: number;
  mdFollowUpQueueCount: number;
  verifiedActiveListingsCount: number;
  portalFeeds: { bayutPropertyFinderXml: string; csvFeed: string };
  upcomingViewingsCount: number;
  upcomingViewings: Array<{ id: string; scheduledAt: string; status: string; notes?: string }>;
  activeDealsCount: number;
  activeDeals: Array<{
    id: string;
    contractNumber: string;
    status: string;
    annualRentAed: number;
    stage: string;
    project: string;
    unitNumber: string;
  }>;
  chequeAndRenewalAlertsCount: number;
  chequeAndRenewalAlerts: Array<{
    id: string;
    entityType: string;
    scheduledAt: string;
    payload?: Record<string, string>;
  }>;
}

interface Props {
  apiBaseUrl?: string;
  authToken?: string;
}

function parseStageOrder(stage: string): number {
  const match = stage.match(/STAGE_(\d{2})/i);
  return match ? Math.min(12, Math.max(1, Number(match[1]))) : 7;
}

export const MdDailyLeasingCockpit: React.FC<Props> = ({ apiBaseUrl = '', authToken }) => {
  const [data, setData] = useState<DailyCockpitData | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [inspectedDealId, setInspectedDealId] = useState<string | null>(null);

  const loadSummary = async () => {
    setLoading(true);
    setErrorMsg(null);
    try {
      const headers: Record<string, string> = {};
      if (authToken) headers.Authorization = `Bearer ${authToken}`;
      const res = await fetch(`${apiBaseUrl}/api/leasing-formula/cockpit/daily-summary`, {
        headers,
      });
      const json = (await res.json()) as { success?: boolean; data?: DailyCockpitData };
      if (json.success && json.data) {
        setData(json.data);
      } else {
        setErrorMsg('Live daily leasing summary returned an empty response.');
      }
    } catch {
      setErrorMsg(
        'Unable to reach /api/leasing-formula/cockpit/daily-summary. Retry when server is online.'
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadSummary();
  }, []);

  const inspectedDeal = data?.activeDeals.find(d => d.id === inspectedDealId) ?? null;

  const kpis = [
    {
      label: '10-SIM Fleet Online',
      value: data ? `${data.simFleet.connectedCount}/${data.simFleet.poolSize}` : '—',
      sub: data
        ? `${data.simFleet.connectedHunterCount}/9 Hunters • DNC: ${data.dncSuppressedCount}`
        : 'Loading...',
      icon: Radio,
    },
    {
      label: 'Verified Active Listings',
      value: data ? String(data.verifiedActiveListingsCount) : '—',
      sub: 'Live on White-Caves-Web & XML Feed',
      icon: Building2,
    },
    {
      label: 'Upcoming Viewings',
      value: data ? String(data.upcomingViewingsCount) : '—',
      sub: 'MD Calendar + T-2h WhatsApp Reminders',
      icon: CalendarClock,
    },
    {
      label: 'Active 12-Stage Deals',
      value: data ? String(data.activeDealsCount) : '—',
      sub: data ? `${data.chequeAndRenewalAlertsCount} Cheque/RERA Alerts` : 'Loading...',
      icon: FileSignature,
    },
  ];

  return (
    <div className="space-y-6 bg-slate-50 p-4 md:p-6" data-testid="md-daily-leasing-cockpit">
      <header className="flex flex-wrap items-center justify-between gap-4 rounded-xl bg-slate-900 p-5 text-white shadow">
        <div>
          <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-wider text-red-400">
            <ShieldCheck className="h-4 w-4" /> White Caves Sovereign Leasing Desk
            <span className="rounded bg-slate-800 px-2 py-0.5 font-mono text-[10px] text-slate-300">
              {TRACK_A_SUPERVISOR_CHAIN.supervisorId}
            </span>
          </div>
          <h1 className="mt-1 text-xl font-bold">MD Daily Residential Leasing Cockpit</h1>
          <p className="text-xs text-slate-300">
            Primary Master Closer: <strong>{data?.primaryMasterPhone || '+971505760056'}</strong> •
            DAMAC Hills 2 Go-Live Command
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <a
            href={`${apiBaseUrl}${data?.portalFeeds.bayutPropertyFinderXml || '/api/leasing-formula/feeds/bayut-pf.xml'}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-xs font-semibold text-white hover:bg-slate-700"
          >
            <ExternalLink className="h-3.5 w-3.5 text-red-400" /> Bayut / PF XML Feed
          </a>
          <button
            type="button"
            onClick={() => void loadSummary()}
            className="inline-flex items-center gap-1.5 rounded-lg bg-red-500 px-3.5 py-2 text-xs font-semibold text-white hover:bg-red-600"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${loading ? 'animate-spin' : ''}`} /> Refresh Cockpit
          </button>
        </div>
      </header>

      {errorMsg && (
        <div
          role="alert"
          className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-xs font-semibold text-red-700"
        >
          <AlertTriangle className="h-4 w-4 shrink-0 text-red-500" />
          <span>{errorMsg}</span>
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {kpis.map(k => (
          <div key={k.label} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500">{k.label}</span>
              <k.icon className="h-4 w-4 text-red-500" />
            </div>
            <div className="mt-2 text-2xl font-bold text-slate-900">{k.value}</div>
            <div className="mt-1 text-xs text-slate-500">{k.sub}</div>
          </div>
        ))}
      </div>

      <LindaMdFollowUpQueuePanel apiBaseUrl={apiBaseUrl} authToken={authToken} />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <h2 className="mb-3 flex items-center gap-2 text-sm font-bold text-slate-900">
            <FileSignature className="h-4 w-4 text-red-500" /> Active 12-Stage Tenancy Deals
          </h2>
          {!data?.activeDeals.length ? (
            <p className="text-xs text-slate-500">No active persisted tenancy deals yet.</p>
          ) : (
            <div className="space-y-2.5">
              {data.activeDeals.map(deal => (
                <div
                  key={deal.id}
                  className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-slate-100 bg-slate-50 p-3"
                >
                  <div>
                    <div className="text-xs font-bold text-slate-900">
                      {deal.project} Unit {deal.unitNumber} • {deal.contractNumber}
                    </div>
                    <div className="text-[11px] text-slate-600">
                      {deal.stage} • AED {Number(deal.annualRentAed || 0).toLocaleString()}/yr
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() =>
                        setInspectedDealId(prev => (prev === deal.id ? null : deal.id))
                      }
                      className="inline-flex items-center gap-1 rounded bg-red-500 px-2.5 py-1 text-[11px] font-semibold text-white hover:bg-red-600"
                    >
                      <Layers className="h-3 w-3" />
                      {inspectedDealId === deal.id ? 'Hide Cockpit' : '12-Stage'}
                    </button>
                    <a
                      href={`${apiBaseUrl}/api/leasing-formula/tenancy-deals/${deal.id}/receipt-pdf`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 rounded bg-slate-900 px-2.5 py-1 text-[11px] font-semibold text-white hover:bg-slate-800"
                    >
                      <FileDown className="h-3 w-3" /> Receipt
                    </a>
                    <a
                      href={`${apiBaseUrl}/api/leasing-formula/tenancy-deals/${deal.id}/receipt-pdf?type=vat`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 rounded border border-slate-300 bg-white px-2 py-1 text-[11px] font-semibold text-slate-800 hover:bg-slate-100"
                    >
                      5% VAT
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <h2 className="mb-3 flex items-center gap-2 text-sm font-bold text-slate-900">
            <BellRing className="h-4 w-4 text-red-500" /> T-7d Cheque Alerts &amp; 90-Day RERA
            Renewals
          </h2>
          {!data?.chequeAndRenewalAlerts.length ? (
            <p className="text-xs text-slate-500">
              No pending cheque or RERA renewal alerts scheduled.
            </p>
          ) : (
            <div className="space-y-2.5">
              {data.chequeAndRenewalAlerts.map(alert => (
                <div key={alert.id} className="rounded-lg border border-slate-100 bg-slate-50 p-3">
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-900">
                    <span>
                      {alert.entityType === 'RERA_90D_RENEWAL_NOTICE'
                        ? '90-Day RERA Notice'
                        : 'T-7d PDC Cheque Alert'}
                    </span>
                    <span className="text-[11px] text-red-600">
                      {new Date(alert.scheduledAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="mt-1 text-[11px] text-slate-600">
                    {alert.payload?.message || alert.payload?.unit || 'Scheduled via +971505760056'}
                  </p>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>

      {inspectedDeal && (
        <div className="rounded-2xl bg-slate-950 p-2 shadow-xl">
          <TenancyDealCockpit
            dealId={inspectedDeal.id}
            project={inspectedDeal.project}
            unitNumber={inspectedDeal.unitNumber}
            annualRentAed={inspectedDeal.annualRentAed}
            currentStageOrder={parseStageOrder(inspectedDeal.stage)}
          />
        </div>
      )}
    </div>
  );
};

export default MdDailyLeasingCockpit;
