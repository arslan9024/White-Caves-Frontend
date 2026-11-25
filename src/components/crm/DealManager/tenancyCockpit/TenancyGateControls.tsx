/**
 * TenancyGateControls.tsx — Enforced Sequential Statutory Gate Controls (Stages 7-11)
 * Enforces: Cheques & Fees FIRST -> Tenant Signs FIRST -> Payment Clearance -> Landlord Countersigns -> Ejari + DEWA
 * Single-purpose module (< 350 lines, AEG-042).
 */

import React, { FC } from 'react';
import { ShieldCheck, AlertTriangle, ArrowRight, CheckCircle2 } from 'lucide-react';
import type { TenancyComplianceGates, TenancyContractMode } from './tenancyCockpit.data';

interface TenancyGateControlsProps {
  activeStage: number;
  contractMode: TenancyContractMode;
  gates: TenancyComplianceGates;
  gateError: string | null;
  gateSuccess: string | null;
  onToggleGate: (key: keyof TenancyComplianceGates) => void;
  onAdvanceNextStage: () => void;
}

export const TenancyGateControls: FC<TenancyGateControlsProps> = ({
  activeStage,
  contractMode,
  gates,
  gateError,
  gateSuccess,
  onToggleGate,
  onAdvanceNextStage,
}) => {
  const dewaLabel =
    contractMode === 'RENEWAL_TENANCY'
      ? 'Latest Paid DEWA Bill PDF'
      : 'DEWA Security Deposit Receipt';

  const gateItems: Array<{
    key: keyof TenancyComplianceGates;
    stageNum: number;
    label: string;
  }> = [
    {
      key: 'chequesCollected',
      stageNum: 7,
      label: '1. Rent & Deposit PDC Cheques Collected FIRST',
    },
    { key: 'feesCollected', stageNum: 7, label: '2. Agency Fee + 5% UAE VAT Collected FIRST' },
    { key: 'tenantSigned', stageNum: 8, label: '3. Tenant Signed Tenancy Contract FIRST' },
    { key: 'paymentCleared', stageNum: 9, label: '4. Bank Payment Clearance Verified' },
    { key: 'landlordSigned', stageNum: 10, label: '5. Landlord Countersigned AFTER Clearance' },
    { key: 'ejariUploaded', stageNum: 11, label: '6. Ejari Certificate PDF Uploaded' },
    { key: 'dewaProofUploaded', stageNum: 11, label: `7. ${dewaLabel} Uploaded` },
  ];

  return (
    <div
      data-testid="tenancy-gate-controls"
      className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4"
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="text-sm font-black text-white flex items-center gap-2">
            <ShieldCheck size={16} className="text-red-500" />
            Mandatory Sequential Closing Gates (Stages 7–11)
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Cheques &amp; Fees FIRST → Tenant Signs FIRST → Payment Clearance → Landlord
            Countersigns → Ejari + DEWA
          </p>
        </div>

        {activeStage < 12 && (
          <button
            type="button"
            onClick={onAdvanceNextStage}
            data-testid="advance-next-stage-btn"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-red-500 hover:bg-red-600 text-white text-xs font-bold transition cursor-pointer shadow-lg shadow-red-950/40"
          >
            Advance to Stage {activeStage + 1}
            <ArrowRight size={13} />
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
        {gateItems.map(item => {
          const checked = gates[item.key];
          return (
            <label
              key={item.key}
              className={`flex items-start gap-2 p-2.5 rounded-xl border text-xs cursor-pointer transition ${
                checked
                  ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-200'
                  : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
              }`}
            >
              <input
                type="checkbox"
                checked={checked}
                onChange={() => onToggleGate(item.key)}
                data-testid={`gate-toggle-${item.key}`}
                className="mt-0.5 accent-red-500"
              />
              <span>
                <span className="font-mono text-[10px] text-slate-400 block">
                  Stage {item.stageNum}
                </span>
                <span className="font-semibold leading-snug">{item.label}</span>
              </span>
            </label>
          );
        })}
      </div>

      {gateError && (
        <div
          role="alert"
          data-testid="tenancy-gate-error"
          className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-red-500/15 border border-red-500/40 text-red-300 text-xs font-semibold"
        >
          <AlertTriangle size={14} className="shrink-0 text-red-400" />
          <span>{gateError}</span>
        </div>
      )}

      {gateSuccess && (
        <div
          role="status"
          data-testid="tenancy-gate-success"
          className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 text-xs font-semibold"
        >
          <CheckCircle2 size={14} className="shrink-0 text-emerald-400" />
          <span>{gateSuccess}</span>
        </div>
      )}
    </div>
  );
};

export default TenancyGateControls;
