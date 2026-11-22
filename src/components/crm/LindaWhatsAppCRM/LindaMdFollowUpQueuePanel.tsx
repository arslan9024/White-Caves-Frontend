import React, { useEffect, useState } from 'react';
import { PhoneCall, CheckCircle2, FileText, KeyRound, Calendar, RefreshCw, ShieldAlert } from 'lucide-react';

export interface MdFollowUpQueueItem {
  id: string;
  status: string;
  priority: 'HIGH' | 'MEDIUM' | 'NORMAL';
  primaryMasterPhone: string;
  hunterSimPhone: string;
  landlordPhone: string;
  landlordName: string;
  cluster: string;
  unitNumber: string;
  bedrooms: number;
  lastMessage: string;
  facts?: {
    askingRentAed?: number | null;
    chequesCount?: number | null;
    vacantDate?: string | null;
    furnishing?: string | null;
    keyStatus?: string | null;
    hasTitleDeedMedia?: boolean;
    hasVoiceNote?: boolean;
  };
}

interface Props {
  apiBaseUrl?: string;
  authToken?: string;
}

export const LindaMdFollowUpQueuePanel: React.FC<Props> = ({ apiBaseUrl = '', authToken }) => {
  const [items, setItems] = useState<MdFollowUpQueueItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchQueue = async () => {
    setLoading(true);
    setError(null);
    try {
      const headers: Record<string, string> = {};
      if (authToken) headers.Authorization = `Bearer ${authToken}`;
      const res = await fetch(`${apiBaseUrl}/api/linda/md-followup-queue?status=pending`, { headers });
      const json = await res.json();
      if (!res.ok || !json.success) throw new Error(json.error || 'Failed to load MD queue');
      setItems(json.data?.items || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to fetch Mission 2 MD queue');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void fetchQueue();
  }, []);

  const markCompleted = async (id: string) => {
    try {
      const headers: Record<string, string> = { 'Content-Type': 'application/json' };
      if (authToken) headers.Authorization = `Bearer ${authToken}`;
      await fetch(`${apiBaseUrl}/api/linda/md-followup-queue/${id}`, {
        method: 'PATCH',
        headers,
        body: JSON.stringify({ status: 'processed', mdNotes: 'Followed up via Primary Master +971505760056' }),
      });
      setItems(prev => prev.filter(item => item.id !== id));
    } catch {
      setError('Failed to update follow-up status');
    }
  };

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="mb-3 flex items-center justify-between">
        <div>
          <h3 className="text-base font-bold text-slate-900">
            Mission 2 — Primary Master (+971505760056) Follow-Up Queue
          </h3>
          <p className="text-xs text-slate-500">
            Confirmed available DH2 landlords handed off from the 9 Hunter SIMs for MD price negotiation
          </p>
        </div>
        <button
          type="button"
          onClick={() => void fetchQueue()}
          className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100"
        >
          <RefreshCw className={`h-3.5 w-3.5 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>

      {error && (
        <div className="mb-3 flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700">
          <ShieldAlert className="h-4 w-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {items.length === 0 ? (
        <div className="rounded-lg border border-dashed border-slate-200 p-6 text-center text-xs text-slate-500">
          No pending landlord handoffs in the Primary Master queue.
        </div>
      ) : (
        <div className="space-y-3">
          {items.map(item => (
            <div key={item.id} className="rounded-lg border border-slate-200 bg-slate-50/70 p-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span
                    className={`rounded px-2 py-0.5 text-[10px] font-bold uppercase ${
                      item.priority === 'HIGH' ? 'bg-red-500 text-white' : 'bg-slate-900 text-white'
                    }`}
                  >
                    {item.priority}
                  </span>
                  <span className="text-sm font-semibold text-slate-900">
                    {item.cluster} — Unit {item.unitNumber} ({item.bedrooms}BR)
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <a
                    href={`tel:${item.landlordPhone}`}
                    className="inline-flex items-center gap-1 rounded-md bg-slate-900 px-2.5 py-1 text-xs font-medium text-white hover:bg-slate-800"
                  >
                    <PhoneCall className="h-3.5 w-3.5" />
                    Call {item.landlordPhone}
                  </a>
                  <button
                    type="button"
                    onClick={() => void markCompleted(item.id)}
                    className="inline-flex items-center gap-1 rounded-md bg-red-500 px-2.5 py-1 text-xs font-medium text-white hover:bg-red-600"
                  >
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    Done
                  </button>
                </div>
              </div>

              <div className="mt-2 flex flex-wrap gap-2 text-xs text-slate-600">
                <span>Owner: <strong>{item.landlordName}</strong></span>
                {item.facts?.askingRentAed && (
                  <span className="rounded bg-white px-2 py-0.5 font-semibold text-slate-900">
                    AED {item.facts.askingRentAed.toLocaleString()}/yr
                  </span>
                )}
                {item.facts?.chequesCount && (
                  <span className="rounded bg-white px-2 py-0.5">{item.facts.chequesCount} Cheques</span>
                )}
                {item.facts?.vacantDate && (
                  <span className="inline-flex items-center gap-1 rounded bg-white px-2 py-0.5">
                    <Calendar className="h-3 w-3 text-red-500" /> {item.facts.vacantDate}
                  </span>
                )}
                {item.facts?.keyStatus && (
                  <span className="inline-flex items-center gap-1 rounded bg-white px-2 py-0.5">
                    <KeyRound className="h-3 w-3 text-slate-700" /> {item.facts.keyStatus}
                  </span>
                )}
                {item.facts?.hasTitleDeedMedia && (
                  <span className="inline-flex items-center gap-1 rounded bg-red-50 px-2 py-0.5 font-medium text-red-700">
                    <FileText className="h-3 w-3" /> Title Deed Shared
                  </span>
                )}
              </div>

              <p className="mt-2 text-xs italic text-slate-600">"{item.lastMessage}"</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default LindaMdFollowUpQueuePanel;
