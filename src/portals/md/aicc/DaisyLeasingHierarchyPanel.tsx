/**
 * DaisyLeasingHierarchyPanel.tsx — Full 8-Tier Leasing Authority Chain, DMS & TMS
 * Displayed inside AICC-Sanctum (/aicc-sanctum) under Zoe -> Clara (DIR-05) -> Daisy (MGR-05-2)
 * Strictly < 200 lines per Turing File Ceiling Law.
 */

import React, { useState } from 'react';
import { GitBranch, Briefcase, CheckSquare, Phone, Users } from 'lucide-react';
import {
  DAISY_12_ASSISTANT_MANAGERS,
  DAISY_TEAM_LEADER,
  DAISY_10_LEASING_AGENTS,
  DMS_OPEN_HUMAN_LEASING_POSITIONS,
  TMS_LEASING_TASK_GROUPS,
} from './daisyDivision.data';

export const DaisyLeasingHierarchyPanel: React.FC = () => {
  const [selectedAmId, setSelectedAmId] = useState<string>(DAISY_12_ASSISTANT_MANAGERS[0].id);
  const [activeTab, setActiveTab] = useState<'HIERARCHY' | 'DMS_POSITIONS' | 'TMS_TASKS'>(
    'HIERARCHY'
  );

  const activeAm =
    DAISY_12_ASSISTANT_MANAGERS.find(am => am.id === selectedAmId) ||
    DAISY_12_ASSISTANT_MANAGERS[0];

  return (
    <section
      className="mt-4 p-4 rounded-xl border border-emerald-500/30 bg-slate-900/80"
      data-testid="daisy-8tier-leasing-panel"
    >
      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 text-[10px] font-mono font-bold uppercase rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
              8-TIER LEASING AUTHORITY CHAIN • DEPT-05
            </span>
            <span className="text-[11px] font-mono text-slate-400">
              MD (Arslan Malik) → Zoe → Clara (DIR-05) → Daisy (MGR-05-2)
            </span>
          </div>
          <h3 className="text-sm font-bold text-white mt-1">
            AI Daisy Leasing Division: 12 Assistant Managers • 108 Supervisors (12×9) • 1 Team
            Leader • 10 Leasing Agents (10 WhatsApp SIMs)
          </h3>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setActiveTab('HIERARCHY')}
            className={`px-2.5 py-1 rounded text-xs font-bold flex items-center gap-1 ${
              activeTab === 'HIERARCHY'
                ? 'bg-emerald-600 text-white'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <GitBranch size={12} /> 12 Asst Mgrs &amp; 108 Sups
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('DMS_POSITIONS')}
            className={`px-2.5 py-1 rounded text-xs font-bold flex items-center gap-1 ${
              activeTab === 'DMS_POSITIONS'
                ? 'bg-amber-600 text-white'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <Briefcase size={12} /> DMS Open Human Roles ({DMS_OPEN_HUMAN_LEASING_POSITIONS.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('TMS_TASKS')}
            className={`px-2.5 py-1 rounded text-xs font-bold flex items-center gap-1 ${
              activeTab === 'TMS_TASKS'
                ? 'bg-red-600 text-white'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <CheckSquare size={12} /> TMS Leasing Tasks ({TMS_LEASING_TASK_GROUPS.length})
          </button>
        </div>
      </div>

      {activeTab === 'HIERARCHY' && (
        <div className="mt-3 grid grid-cols-1 lg:grid-cols-3 gap-3">
          {/* Column 1: 12 Assistant Managers under Daisy */}
          <div className="p-3 rounded-lg bg-slate-950/70 border border-slate-800">
            <div className="text-xs font-bold text-emerald-400 uppercase mb-2">
              L4 • 12 Assistant Managers (Report to AI Daisy MGR-05-2)
            </div>
            <div className="flex flex-col gap-1.5 max-h-64 overflow-y-auto pr-1">
              {DAISY_12_ASSISTANT_MANAGERS.map(am => (
                <button
                  key={am.id}
                  type="button"
                  onClick={() => setSelectedAmId(am.id)}
                  className={`text-left p-2 rounded border text-xs transition ${
                    am.id === activeAm.id
                      ? 'bg-emerald-950/70 border-emerald-500 text-white'
                      : 'bg-slate-900/70 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between font-bold">
                    <span>
                      #{am.slot} {am.name}
                    </span>
                    <span className="text-[10px] font-mono text-emerald-400">{am.id}</span>
                  </div>
                  <div className="text-[10px] text-slate-400 mt-0.5">
                    Clusters: {am.clusterFocus} • 9 Supervisors
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Column 2: 9 Supervisors for Selected Assistant Manager (108 Total) */}
          <div className="p-3 rounded-lg bg-slate-950/70 border border-slate-800">
            <div className="text-xs font-bold text-sky-400 uppercase mb-2">
              L3 • 9 Supervisors under {activeAm.name} (108 Total)
            </div>
            <div className="grid grid-cols-1 gap-1.5 max-h-64 overflow-y-auto pr-1">
              {activeAm.supervisors.map(sup => (
                <div
                  key={sup.id}
                  className="p-2 rounded bg-slate-900/80 border border-slate-800 flex items-center justify-between text-xs"
                >
                  <div>
                    <div className="font-bold text-white">{sup.name}</div>
                    <div className="text-[10px] text-slate-400">{sup.zone}</div>
                  </div>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-sky-500/10 text-sky-300 border border-sky-500/20">
                    {sup.id}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Column 3: 1 Team Leader + 10 Leasing Agents (10 WhatsApp SIMs) */}
          <div className="p-3 rounded-lg bg-slate-950/70 border border-slate-800">
            <div className="text-xs font-bold text-amber-400 uppercase mb-2 flex items-center gap-1.5">
              <Users size={13} /> L3 Team Leader → L2 10 Leasing Agents (10 SIMs)
            </div>
            <div className="p-2 mb-2 rounded bg-amber-500/10 border border-amber-500/30 text-xs">
              <div className="font-bold text-amber-300">
                {DAISY_TEAM_LEADER.name} ({DAISY_TEAM_LEADER.id})
              </div>
              <div className="text-[10px] text-slate-300">
                Reports to: {DAISY_TEAM_LEADER.reportsToId}
              </div>
            </div>
            <div className="flex flex-col gap-1.5 max-h-48 overflow-y-auto pr-1">
              {DAISY_10_LEASING_AGENTS.map(agt => (
                <div
                  key={agt.id}
                  className="p-1.5 rounded bg-slate-900/80 border border-slate-800 flex items-center justify-between text-[11px]"
                >
                  <div>
                    <div className="font-semibold text-white">{agt.name}</div>
                    <div className="text-[10px] text-slate-400 flex items-center gap-1">
                      <Phone size={10} /> {agt.sim}
                    </div>
                  </div>
                  <span
                    className={`text-[9px] font-mono px-1.5 py-0.5 rounded ${
                      agt.tier === 'PRIMARY_MASTER_CLOSER'
                        ? 'bg-red-500/20 text-red-300 border border-red-500/40'
                        : 'bg-emerald-500/10 text-emerald-300'
                    }`}
                  >
                    {agt.tier === 'PRIMARY_MASTER_CLOSER' ? 'MASTER CLOSER' : 'HUNTER SIM'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'DMS_POSITIONS' && (
        <div className="mt-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2.5">
          {DMS_OPEN_HUMAN_LEASING_POSITIONS.map(pos => (
            <div
              key={pos.positionCode}
              draggable
              className="p-3 rounded-lg bg-slate-950/80 border border-amber-500/30 cursor-grab active:cursor-grabbing"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-amber-300 font-bold">
                  {pos.positionCode}
                </span>
                <span className="px-1.5 py-0.5 text-[10px] font-bold rounded bg-amber-500/20 text-amber-300">
                  {pos.openCount} OPEN HUMAN {pos.openCount === 1 ? 'SLOT' : 'SLOTS'}
                </span>
              </div>
              <div className="text-xs font-bold text-white mt-1">{pos.jobTitle}</div>
              <div className="text-[11px] text-slate-400 mt-1">
                Dept: <strong className="text-emerald-300">{pos.departmentCode}</strong> • Reports
                to: {pos.reportsToTitle}
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'TMS_TASKS' && (
        <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-2.5">
          {TMS_LEASING_TASK_GROUPS.map(group => (
            <div
              key={group.collectionCode}
              className="p-3 rounded-lg bg-slate-950/80 border border-slate-800"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold text-red-400">
                  {group.collectionCode}
                </span>
                <span className="text-[10px] font-mono text-emerald-300">
                  {group.aiccActorCode}
                </span>
              </div>
              <div className="text-xs font-bold text-white mt-1">{group.title}</div>
              <div className="text-[11px] text-amber-300 mt-0.5">Actor: {group.aiccActorName}</div>
              <div className="text-[10px] text-slate-400 mt-0.5">Chain: {group.reportingChain}</div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default DaisyLeasingHierarchyPanel;
