/**
 * SanctumDelegationPanel.tsx — Extracted Live Sanctum Delegation Chain Panel
 * Keeps View.tsx strictly under 350 lines per AEGIS Single Purpose File Law (AEG-042).
 */

import React, { FC } from 'react';

export interface DelegationItem {
  id: string;
  taskId: string;
  targetAgent: string;
  chain: string[];
  status: string;
}

export const SanctumDelegationPanel: FC<{ delegations: DelegationItem[] }> = ({ delegations }) => (
  <div className="mt-4 p-4 rounded-xl border border-slate-800 bg-[#1E293B]/40">
    <div className="flex items-center justify-between pb-2 border-b border-slate-800 mb-3">
      <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
        Live Sanctum Delegation Chain
      </span>
      <span className="text-[10px] text-slate-400">
        Drag any card onto another card or left department to swap
      </span>
    </div>
    <div className="flex flex-col gap-2">
      {delegations.map(del => (
        <div
          key={del.id}
          className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800 flex items-center justify-between text-xs"
        >
          <div className="flex items-center gap-3">
            <span className="font-mono text-red-400 font-bold">{del.taskId}</span>
            <span className="text-slate-300">
              Target: <strong className="text-white">{del.targetAgent}</strong>
            </span>
            <span className="text-slate-500">Chain: {del.chain.join(' → ')}</span>
          </div>
          <span className="text-emerald-400 font-semibold">{del.status}</span>
        </div>
      ))}
    </div>
  </div>
);

export default SanctumDelegationPanel;
