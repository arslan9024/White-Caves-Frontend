import React, { type FC } from 'react';
import type { JourneyResultOutcome } from '../../../../types/journey';
import { PROCESSING_TASKS } from './journeyDocumentHelpers';

interface ProcessingStepProps {
  processingStage: number;
}

export const ProcessingStep: FC<ProcessingStepProps> = ({ processingStage }) => {
  const progressPct = Math.round((processingStage / PROCESSING_TASKS.length) * 100);

  return (
    <div className="py-8 px-4 max-w-xl mx-auto space-y-6 text-slate-100">
      <div className="text-center space-y-2">
        <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-3xl mx-auto shadow-xl animate-pulse">
          ⚙️
        </div>
        <h3 className="text-lg font-bold text-white tracking-wide">Preparing Tenancy Contract</h3>
        <p className="text-xs text-slate-400">
          Applying official White Caves Real Estate clauses and RERA formatting...
        </p>
      </div>

      <div className="space-y-1.5">
        <div className="flex justify-between text-xs font-semibold text-slate-300">
          <span>Processing Pipeline</span>
          <span className="text-amber-400">{progressPct}%</span>
        </div>
        <div className="bg-slate-800 h-2.5 rounded-full overflow-hidden border border-slate-700">
          <div
            className="bg-gradient-to-r from-amber-500 via-emerald-400 to-teal-400 h-full transition-all duration-300 rounded-full"
            style={{ width: `${progressPct}%` }}
          />
        </div>
      </div>

      <div className="space-y-2 bg-slate-900/80 p-4 rounded-xl border border-slate-700/60 text-xs">
        {PROCESSING_TASKS.map((task, idx) => {
          const isDone = idx < processingStage;
          const isCurrent = idx === processingStage;
          return (
            <div
              key={idx}
              className={`flex items-center space-x-2.5 transition-all ${
                isDone
                  ? 'text-emerald-300'
                  : isCurrent
                    ? 'text-amber-300 font-semibold'
                    : 'text-slate-500 opacity-40'
              }`}
            >
              <span>{isDone ? '✓' : isCurrent ? '⏳' : '○'}</span>
              <span>{task}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

interface ResultOutcomeStepProps {
  data: Record<string, any>;
  result?: JourneyResultOutcome;
  onLaunchNextJourney: (journeyId: string) => void;
}

export const ResultOutcomeStep: FC<ResultOutcomeStepProps> = ({
  data,
  result,
  onLaunchNextJourney,
}) => {
  const outcome = result || {
    referenceNumber: 'WC-2026-000184',
    title: 'Tenancy Contract Ready',
    subtitle: `${data.propertyName || 'Sycamore 131'} — ${data.community || 'DAMAC Hills 2'}`,
    summaryItems: [
      {
        label: 'Property',
        value: `${data.propertyName || 'Sycamore 131'} (${data.community || 'DAMAC Hills 2'})`,
        verified: true,
      },
      {
        label: 'Annual Rent',
        value: `AED ${Number(data.annualRent || 95000).toLocaleString()}`,
        verified: true,
      },
      { label: 'Payment Terms', value: `${data.chequesCount || 2} Cheques`, verified: true },
      { label: 'Landlord', value: data.landlordName || 'Arslan Malik', verified: true },
      { label: 'Tenant', value: data.tenantName || 'Sarah Jenkins', verified: true },
    ],
    badges: ['RERA Compliant', 'E-Sign Ready', 'Ejari Payload Prepared'],
    nextActions: [],
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="bg-gradient-to-br from-slate-900 via-emerald-950/40 to-slate-900 p-6 rounded-2xl border border-emerald-500/40 shadow-2xl relative overflow-hidden">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex items-start space-x-4">
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-3xl shadow-inner">
              🎉
            </div>
            <div>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold uppercase tracking-wider">
                Mission Complete
              </span>
              <h3 className="text-xl font-bold text-white mt-1">{outcome.title}</h3>
              <p className="text-xs text-slate-300">{outcome.subtitle}</p>
            </div>
          </div>

          <div className="bg-slate-900/90 px-4 py-2.5 rounded-xl border border-slate-700 text-right">
            <div className="text-[11px] text-slate-400 uppercase font-semibold">
              Contract Number
            </div>
            <div className="text-base font-mono font-bold text-amber-400">
              {outcome.referenceNumber}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6 pt-4 border-t border-slate-700/60 text-xs">
          {outcome.summaryItems.map((item, idx) => (
            <div key={idx} className="bg-slate-900/70 p-3 rounded-lg border border-slate-700/50">
              <div className="text-slate-400 text-[11px]">{item.label}</div>
              <div className="font-semibold text-slate-100 mt-0.5 flex items-center space-x-1">
                <span>{item.value}</span>
                {item.verified && <span className="text-emerald-400">✓</span>}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider">
          Next Actions — Chained Journeys
        </h4>
        <p className="text-xs text-slate-400">
          Don&apos;t stop here. Move directly to the next stage in the tenancy lifecycle:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <button
            onClick={() => onLaunchNextJourney('download-pdf')}
            className="p-4 rounded-xl bg-slate-900/90 border border-slate-700 hover:border-amber-500/50 transition-all text-left flex items-center space-x-3.5 shadow-sm group"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-xl group-hover:scale-105 transition-transform">
              📥
            </div>
            <div>
              <div className="text-xs font-bold text-white group-hover:text-amber-300">
                Download Tenancy Contract PDF
              </div>
              <div className="text-[11px] text-slate-400">
                Official RERA Unified Tenancy Agreement
              </div>
            </div>
          </button>

          <button
            onClick={() => onLaunchNextJourney('contract-signing')}
            className="p-4 rounded-xl bg-slate-900/90 border border-slate-700 hover:border-amber-500/50 transition-all text-left flex items-center space-x-3.5 shadow-sm group"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-xl group-hover:scale-105 transition-transform">
              ✍️
            </div>
            <div>
              <div className="text-xs font-bold text-white group-hover:text-amber-300">
                Launch Digital Signing Journey
              </div>
              <div className="text-[11px] text-slate-400">
                Dispatch to Arslan Malik &amp; Sarah Jenkins
              </div>
            </div>
          </button>

          <button
            onClick={() => onLaunchNextJourney('payment-collection')}
            className="p-4 rounded-xl bg-slate-900/90 border border-slate-700 hover:border-amber-500/50 transition-all text-left flex items-center space-x-3.5 shadow-sm group"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-xl group-hover:scale-105 transition-transform">
              💰
            </div>
            <div>
              <div className="text-xs font-bold text-white group-hover:text-amber-300">
                Start Payment &amp; Cheque Collection
              </div>
              <div className="text-[11px] text-slate-400">
                Record PDCs (2 Cheques) &amp; 5% Security Deposit
              </div>
            </div>
          </button>

          <button
            onClick={() => onLaunchNextJourney('create-ejari')}
            className="p-4 rounded-xl bg-slate-900/90 border border-slate-700 hover:border-amber-500/50 transition-all text-left flex items-center space-x-3.5 shadow-sm group"
          >
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-xl group-hover:scale-105 transition-transform">
              🏛️
            </div>
            <div>
              <div className="text-xs font-bold text-white group-hover:text-amber-300">
                Register with Ejari DLD
              </div>
              <div className="text-[11px] text-slate-400">
                Submit verified payload directly to Dubai Land Dept
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};
