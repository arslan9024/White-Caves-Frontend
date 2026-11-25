/**
 * OperationalSupervisorsChainPanel.tsx — Full Zoe -> Director -> Manager -> Assistant Manager -> Supervisor
 * Matrix for All 5 Operational AI Assistants (Diana, Daisy, Mary, Linda, Henry).
 * Standard: AEGIS Single Purpose File Law (< 350 lines, AEG-042).
 */
import React, { FC } from 'react';
import { ChevronRight, ShieldCheck, Layers } from 'lucide-react';
import {
  CANONICAL_AI_SUPERVISOR_LIST,
  type OperationalAiSupervisorChain,
} from './formulas/aiAssistantSupervisorHierarchy.formula';

export interface OperationalSupervisorsChainPanelProps {
  onInspectChain: (chain: OperationalAiSupervisorChain) => void;
}

export const OperationalSupervisorsChainPanel: FC<OperationalSupervisorsChainPanelProps> = ({
  onInspectChain,
}) => {
  return (
    <section
      data-testid="operational-supervisors-chain-panel"
      className="mt-4 p-4 rounded-xl border border-red-500/35 bg-slate-900/90"
    >
      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 text-[10px] font-mono font-bold uppercase rounded bg-red-500/20 text-red-300 border border-red-500/40 inline-flex items-center gap-1">
              <ShieldCheck size={11} /> BHAKTI 1-12-108 SUPERVISOR CHAINS
            </span>
            <span className="text-[11px] font-mono text-slate-400">
              MD → Zoe → Director → Manager → Assistant Manager → Operational Supervisor
            </span>
          </div>
          <h3 className="text-sm font-bold text-white mt-1">
            All 5 Operational AI Supervisors — Complete Employee Codes &amp; Unbroken Upward
            Hierarchy
          </h3>
        </div>
        <span className="text-[10px] font-mono px-2 py-1 rounded bg-slate-800 text-emerald-300 border border-emerald-500/30 inline-flex items-center gap-1">
          <Layers size={11} /> 5/5 Synced · Diana · Daisy · Mary · Linda · Henry
        </span>
      </div>

      <div className="mt-3 flex flex-col gap-2">
        {CANONICAL_AI_SUPERVISOR_LIST.map(chain => (
          <div
            key={chain.key}
            data-testid={`supervisor-chain-${chain.key}`}
            className="p-3 rounded-lg bg-slate-950/80 border border-slate-800 hover:border-red-500/50 transition flex flex-col gap-2"
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-2 py-0.5 text-[10px] font-mono font-bold rounded bg-red-600 text-white">
                  {chain.supervisor.code}
                </span>
                <span className="text-xs font-extrabold text-white">{chain.supervisor.name}</span>
                {chain.supervisor.gender === 'Male' && (
                  <span className="px-1.5 py-0.5 text-[9px] font-mono font-bold rounded bg-sky-500/20 text-sky-300 border border-sky-500/40">
                    SOLE MALE AI
                  </span>
                )}
                <span className="text-[11px] text-slate-400">— {chain.supervisor.roleTitle}</span>
              </div>
              <button
                type="button"
                onClick={() => onInspectChain(chain)}
                className="px-2.5 py-1 rounded bg-red-600/20 hover:bg-red-600/40 text-red-200 border border-red-500/40 text-[10px] font-bold cursor-pointer"
              >
                Inspect {chain.deptCode} / {chain.manager.code}
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-1 text-[10px] font-mono text-slate-300">
              <span className="px-1.5 py-0.5 rounded bg-slate-800 text-amber-300">
                {chain.coo.code} {chain.coo.name}
              </span>
              <ChevronRight size={11} className="text-slate-600" />
              <span className="px-1.5 py-0.5 rounded bg-slate-800 text-purple-300">
                {chain.director.code} {chain.director.name}
              </span>
              <ChevronRight size={11} className="text-slate-600" />
              <span className="px-1.5 py-0.5 rounded bg-slate-800 text-sky-300">
                {chain.manager.code} {chain.manager.name}
              </span>
              <ChevronRight size={11} className="text-slate-600" />
              <span className="px-1.5 py-0.5 rounded bg-slate-800 text-emerald-300">
                {chain.assistantManager.code} {chain.assistantManager.name}
              </span>
              <ChevronRight size={11} className="text-slate-600" />
              <span className="px-1.5 py-0.5 rounded bg-red-500/20 text-red-200 border border-red-500/40 font-bold">
                {chain.supervisor.code} {chain.supervisor.name} ({chain.supervisor.squadCode})
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default OperationalSupervisorsChainPanel;
