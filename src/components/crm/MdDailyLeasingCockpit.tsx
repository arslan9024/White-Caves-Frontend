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
} from 'lucide-react';
import { LindaMdFollowUpQueuePanel } from './LindaWhatsAppCRM/LindaMdFollowUpQueuePanel';

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
  chequeAndRenewalAlerts: Array<{ id: string; entityType: string; scheduledAt: string; payload?: Record<string, any> }>;
}

interface Props {
  apiBaseUrl?: string;
  authToken?: string;
}

export const MdDailyLeasingCockpit: React.FC<Props> = ({ apiBaseUrl = '', authToken }) => {
  const [data, setData] = useState<DailyCockpitData | null>(null);
  const [loading, setLoading] = useState(false);

  const loadSummary = async () => {
    setLoading(true);
    try {
      const headers: Record<string, string> = {};
      if (authToken) headers.Authorization = `Bearer ${authToken}`;
      const res = await fetch(`${apiBaseUrl}/api/leasing-formula/cockpit/daily-summary`, { headers });
      const json = await res.json();
      if (json.success) setData(json.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadSummary();
  }, []);

  const kpis = [
    {
      label: '10-SIM Fleet Online',
      value: data ? `${data.simFleet.connectedCount}/${data.simFleet.poolSize}` : '—',
      sub: data ? `${data.simFleet.connectedHunterCount}/9 Hunters • DNC: ${data.dncSuppressedCount}` : 'Loading...',
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
    <div className="space-y-6 bg-slate-50 p-4 md:p-6">
      <header className="flex flex-wrap items-center justify-between gap-4 rounded-xl bg-slate-900 p-5 text-white shadow">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-red-400">
            <ShieldCheck className="h-4 w-4" /> White Caves Sovereign Leasing Desk
          </div>
          <h1 className="mt-1 text-xl font-bold">MD Daily Residential Leasing Cockpit</h1>
          <p className="text-xs text-slate-300">
            Primary Master Closer: <strong>{data?.primaryMasterPhone || '+971505760056'}</strong> • DAMAC Hills 2 Go-Live Command
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
                <div key={deal.id} className="flex items-center justify-between rounded-lg border border-slate-100 bg-slate-50 p-3">
                  <div>
                    <div className="text-xs font-bold text-slate-900">
                      {deal.project} Unit {deal.unitNumber} • {deal.contractNumber}
                    </div>
                    <div className="text-[11px] text-slate-600">
                      {deal.stage} • AED {Number(deal.annualRentAed || 0).toLocaleString()}/yr
                    </div>
                  </div>
                  <a
                    href={`${apiBaseUrl}/api/leasing-formula/tenancy-deals/${deal.id}/receipt-pdf`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 rounded bg-slate-900 px-2.5 py-1 text-[11px] font-semibold text-white hover:bg-slate-800"
                  >
                    <FileDown className="h-3 w-3" /> Receipt PDF
                  </a>
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <h2 className="mb-3 flex items-center gap-2 text-sm font-bold text-slate-900">
            <BellRing className="h-4 w-4 text-red-500" /> T-7d Cheque Alerts & 90-Day RERA Renewals
          </h2>
          {!data?.chequeAndRenewalAlerts.length ? (
            <p className="text-xs text-slate-500">No pending cheque or RERA renewal alerts scheduled.</p>
          ) : (
            <div className="space-y-2.5">
              {data.chequeAndRenewalAlerts.map(alert => (
                <div key={alert.id} className="rounded-lg border border-slate-100 bg-slate-50 p-3">
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-900">
                    <span>{alert.entityType === 'RERA_90D_RENEWAL_NOTICE' ? '90-Day RERA Notice' : 'T-7d PDC Cheque Alert'}</span>
                    <span className="text-[11px] text-red-600">{new Date(alert.scheduledAt).toLocaleDateString()}</span>
                  </div>
                  <p className="mt-1 text-[11px] text-slate-600">{alert.payload?.message || alert.payload?.unit || 'Scheduled via +971505760056'}</p>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default MdDailyLeasingCockpit;
