/**
 * TenancyDealCockpit.tsx — Unified 12-Stage Tenancy Deal Cockpit & Google Drive Integration
 * Strictly enforces: Cheques & Fees FIRST -> Tenant Signs FIRST -> Payment Clearance -> Landlord Countersigns -> Ejari + DEWA
 * Owned by: SUP-05-2-01-1 (AI Noor — Leasing Portals & Deal Cockpit Supervisor, TURING-SUPERVISOR-CHAIN-019)
 * Single-purpose module (< 350 lines, AEG-042).
 */

import React, { FC, useState } from 'react';
import {
  CheckCircle2,
  Lock,
  Download,
  ExternalLink,
  ChevronRight,
  Building2,
  FileText,
  Sparkles,
  FolderOpen,
  ShieldCheck,
} from 'lucide-react';
import {
  LEASING_STAGES,
  TRACK_A_SUPERVISOR_CHAIN,
  createInitialGatesForStage,
  validateStageTransition,
  type TenancyComplianceGates,
  type TenancyContractMode,
} from './tenancyCockpit/tenancyCockpit.data';
import { TenancyDriveFoldersBar } from './tenancyCockpit/TenancyDriveFoldersBar';
import { TenancyGateControls } from './tenancyCockpit/TenancyGateControls';

export { LEASING_STAGES };

export interface TenancyDealCockpitProps {
  dealId?: string;
  contractMode?: TenancyContractMode;
  area?: string;
  project?: string;
  unitNumber?: string;
  landlordName?: string;
  landlordPhone?: string;
  tenantName?: string;
  tenantPhone?: string;
  annualRentAed?: number;
  chequesCount?: number;
  currentStageOrder?: number;
  driveFolderUrl?: string;
  onAdvanceStage?: (targetStage: number) => void;
}

export const TenancyDealCockpit: FC<TenancyDealCockpitProps> = ({
  dealId = 'WC-DH2-2026-L082',
  contractMode = 'NEW_TENANCY',
  area = 'DAMAC Hills 2',
  project = 'Camellia',
  unitNumber = 'TH-C-104',
  landlordName = 'Mohammed Al Mansoori',
  tenantName = 'Sarah Jenkins',
  annualRentAed = 95000,
  chequesCount = 4,
  currentStageOrder = 8,
  driveFolderUrl = 'https://drive.google.com/drive/folders/DAMAC_Hills_2_Camellia_TH_C_104',
  onAdvanceStage,
}) => {
  const [downloadingType, setDownloadingType] = useState<'receipt' | 'vat' | null>(null);
  const [activeStage, setActiveStage] = useState(currentStageOrder);
  const [gates, setGates] = useState<TenancyComplianceGates>(() =>
    createInitialGatesForStage(currentStageOrder)
  );
  const [gateError, setGateError] = useState<string | null>(null);
  const [gateSuccess, setGateSuccess] = useState<string | null>(null);

  const agencyCommissionAed = Math.round(annualRentAed * 0.05);
  const agencyVatAed = Math.round(agencyCommissionAed * 0.05);

  const handleDownloadPdf = (type: 'receipt' | 'vat') => {
    setDownloadingType(type);
    const query = type === 'vat' ? '?type=vat' : '';
    window.open(`/api/leasing-formula/tenancy-deals/${dealId}/receipt-pdf${query}`, '_blank');
    setTimeout(() => setDownloadingType(null), 500);
  };

  const handleToggleGate = (key: keyof TenancyComplianceGates) => {
    setGates(prev => ({ ...prev, [key]: !prev[key] }));
    setGateError(null);
  };

  const attemptStageTransition = (targetStage: number) => {
    const check = validateStageTransition(activeStage, targetStage, gates, contractMode);
    if (!check.allowed) {
      setGateSuccess(null);
      setGateError(check.reason ?? 'Sequential stage gate blocked.');
      return;
    }
    setGateError(null);
    setActiveStage(targetStage);
    setGateSuccess(`Stage ${targetStage} of 12 verified under White Caves Sequential Protocol.`);
    onAdvanceStage?.(targetStage);
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto font-sans" data-testid="tenancy-deal-cockpit">
      {/* ── Top Header & Deal Card ─────────────────────────────────────── */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900/95 to-slate-800 border border-slate-800 shadow-2xl flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold font-mono tracking-wider bg-red-500/20 text-red-400 border border-red-500/30">
              {contractMode === 'NEW_TENANCY' ? 'NEW TENANCY' : 'RENEWAL CONTRACT'}
            </span>
            <span className="text-xs font-mono text-slate-400">DEAL ID: {dealId}</span>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-slate-800 text-slate-300 border border-slate-700">
              <ShieldCheck size={11} className="text-red-400" />
              {TRACK_A_SUPERVISOR_CHAIN.supervisorId}
            </span>
          </div>
          <h1 className="text-2xl font-black text-white flex items-center gap-2">
            <Building2 className="text-red-500" size={24} />
            {area} — {project} [{unitNumber}]
          </h1>
          <p className="text-xs text-slate-400 flex flex-wrap items-center gap-4">
            <span>
              Landlord: <strong className="text-slate-200">{landlordName}</strong>
            </span>
            <span>
              Tenant: <strong className="text-slate-200">{tenantName}</strong>
            </span>
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={() => handleDownloadPdf('receipt')}
            disabled={downloadingType !== null}
            data-testid="download-sequential-receipt-btn"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 text-xs font-bold transition-all cursor-pointer shadow-md disabled:opacity-50"
          >
            <Download size={14} className="text-red-400" />
            {downloadingType === 'receipt' ? 'Generating...' : 'Sequential Receipt & 5% VAT'}
          </button>
          <button
            type="button"
            onClick={() => handleDownloadPdf('vat')}
            disabled={downloadingType !== null}
            data-testid="download-vat-invoice-btn"
            className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-bold transition-all cursor-pointer disabled:opacity-50"
          >
            <FileText size={14} className="text-emerald-400" />
            5% VAT Invoice PDF
          </button>
          <a
            href={driveFolderUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold transition-all cursor-pointer shadow-lg shadow-red-950/40"
          >
            <FolderOpen size={14} />
            DAMAC Hills 2 Drive Folder
            <ExternalLink size={12} className="opacity-70" />
          </a>
        </div>
      </div>

      {/* ── Key Deal Financials ────────────────────────────────────────── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
          <div className="text-[11px] font-mono uppercase text-slate-400">Agreed Annual Rent</div>
          <div className="text-xl font-black text-white mt-1">
            AED {annualRentAed.toLocaleString()}
          </div>
          <div className="text-[10px] text-emerald-400 mt-0.5">Fixed Negotiated Rate</div>
        </div>
        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
          <div className="text-[11px] font-mono uppercase text-slate-400">Payment Structure</div>
          <div className="text-xl font-black text-amber-400 mt-1">{chequesCount} Cheques</div>
          <div className="text-[10px] text-slate-400 mt-0.5">PDC Cheques Tracked</div>
        </div>
        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
          <div className="text-[11px] font-mono uppercase text-slate-400">Agency Commission</div>
          <div className="text-xl font-black text-emerald-400 mt-1">
            AED {agencyCommissionAed.toLocaleString()}
          </div>
          <div className="text-[10px] text-slate-400 mt-0.5">
            +5% UAE Statutory VAT (AED {agencyVatAed.toLocaleString()})
          </div>
        </div>
        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
          <div className="text-[11px] font-mono uppercase text-slate-400">Security Deposit</div>
          <div className="text-xl font-black text-sky-400 mt-1">
            AED {agencyCommissionAed.toLocaleString()}
          </div>
          <div className="text-[10px] text-sky-400 mt-0.5">Escrow Refundable</div>
        </div>
      </div>

      {/* ── Google Drive 4-Folder Vault Bar ────────────────────────────── */}
      <TenancyDriveFoldersBar
        area={area}
        cluster={project}
        unitNumber={unitNumber}
        contractMode={contractMode}
        driveFolderUrl={driveFolderUrl}
      />

      {/* ── Enforced Sequential Statutory Gates ────────────────────────── */}
      <TenancyGateControls
        activeStage={activeStage}
        contractMode={contractMode}
        gates={gates}
        gateError={gateError}
        gateSuccess={gateSuccess}
        onToggleGate={handleToggleGate}
        onAdvanceNextStage={() => attemptStageTransition(Math.min(12, activeStage + 1))}
      />

      {/* ── 12-Stage Visual Sequential Lifecycle ───────────────────────── */}
      <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <h2 className="text-base font-black text-white flex items-center gap-2">
              <Sparkles className="text-red-500" size={16} />
              12-Stage Enforced Tenancy Lifecycle
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Strict order enforced: Cheques &amp; Fees Collected FIRST → Tenant Signs FIRST →
              Payment Clearance → Landlord Countersigns → Ejari + DEWA.
            </p>
          </div>
          <span className="text-xs font-mono text-emerald-400 font-bold bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
            Active: Stage {activeStage} of 12
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3 pt-2">
          {LEASING_STAGES.map(stage => {
            const isCompleted = stage.order < activeStage;
            const isCurrent = stage.order === activeStage;

            return (
              <button
                key={stage.key}
                type="button"
                data-testid={`tenancy-stage-card-${stage.order}`}
                onClick={() => attemptStageTransition(stage.order)}
                className={`p-3.5 rounded-xl border transition-all text-left flex flex-col justify-between cursor-pointer ${
                  isCurrent
                    ? 'bg-red-500/10 border-red-500 shadow-md shadow-red-950/20 ring-1 ring-red-500/30'
                    : isCompleted
                      ? 'bg-slate-900/90 border-emerald-500/40 text-slate-300 hover:border-emerald-500/60'
                      : 'bg-slate-950/40 border-slate-800/80 text-slate-500 opacity-75 hover:opacity-100'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-mono font-bold uppercase text-slate-400">
                      Step {stage.order}
                    </span>
                    {isCompleted ? (
                      <CheckCircle2 size={14} className="text-emerald-400" />
                    ) : isCurrent ? (
                      <span className="h-2 w-2 rounded-full bg-red-400 animate-ping" />
                    ) : (
                      <Lock size={12} className="text-slate-600" />
                    )}
                  </div>
                  <div className="text-xs font-bold text-white leading-snug">{stage.title}</div>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-800/60 flex items-center justify-between">
                  <span className="text-[9px] font-mono text-slate-400 font-semibold truncate">
                    {stage.tag}
                  </span>
                  {isCurrent && (
                    <span className="text-[10px] text-red-400 font-bold flex items-center gap-1">
                      Action <ChevronRight size={10} />
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TenancyDealCockpit;
