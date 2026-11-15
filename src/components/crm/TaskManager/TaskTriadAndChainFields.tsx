import React from 'react';
import type { TaskNode } from './TaskManager.types';

interface TaskTriadAndChainFieldsProps {
  formData: Partial<TaskNode>;
  onChange: (field: keyof TaskNode, value: any) => void;
  onChainChange: (field: string, value: string) => void;
}

export const TaskTriadAndChainFields: React.FC<TaskTriadAndChainFieldsProps> = ({
  formData,
  onChange,
  onChainChange,
}) => {
  return (
    <>
      {/* Execution Triad (Actor, Action, Results) */}
      <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 mt-1 flex flex-col gap-2">
        <span className="text-[10px] font-mono uppercase tracking-wider text-sky-400 font-bold">
          Task Execution Triad (Actor • Action • Results)
        </span>
        <div>
          <label className="block text-[10px] text-slate-400">Designated Actor</label>
          <input
            type="text"
            value={formData.actor || ''}
            onChange={e => onChange('actor', e.target.value)}
            placeholder="e.g. Supervisor Amira (Compliance Officer)"
            className="w-full px-2 py-1.5 bg-slate-900 border border-slate-700/80 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-sky-500"
          />
        </div>
        <div>
          <label className="block text-[10px] text-slate-400">Operational Action</label>
          <input
            type="text"
            value={formData.action || ''}
            onChange={e => onChange('action', e.target.value)}
            placeholder="e.g. Execute statutory verification"
            className="w-full px-2 py-1.5 bg-slate-900 border border-slate-700/80 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-amber-500"
          />
        </div>
        <div>
          <label className="block text-[10px] text-slate-400">
            Expected Result / Artifact
          </label>
          <input
            type="text"
            value={formData.results || ''}
            onChange={e => onChange('results', e.target.value)}
            placeholder="e.g. Verified compliance certificate issued"
            className="w-full px-2 py-1.5 bg-slate-900 border border-slate-700/80 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
          />
        </div>
      </div>

      {/* Reporting Chain Escalation Fields */}
      <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 mt-1 flex flex-col gap-2">
        <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-bold">
          Hierarchy Reporting Chain (L3 → L2 → L1 → L0)
        </span>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block text-[10px] text-slate-400">
              Supervisor (L3 Execution)
            </label>
            <input
              type="text"
              value={formData.reportingChain?.supervisorName || ''}
              onChange={e => onChainChange('supervisorName', e.target.value)}
              className="w-full px-2 py-1.5 bg-slate-900 border border-slate-700/80 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
            />
          </div>
          <div>
            <label className="block text-[10px] text-slate-400">
              Division Manager (L2 Review)
            </label>
            <input
              type="text"
              value={formData.reportingChain?.managerName || ''}
              onChange={e => onChainChange('managerName', e.target.value)}
              className="w-full px-2 py-1.5 bg-slate-900 border border-slate-700/80 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block text-[10px] text-slate-400">
              Pillar Director (L1 Sign-off)
            </label>
            <input
              type="text"
              value={formData.reportingChain?.directorName || ''}
              onChange={e => onChainChange('directorName', e.target.value)}
              className="w-full px-2 py-1.5 bg-slate-900 border border-slate-700/80 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
            />
          </div>
          <div>
            <label className="block text-[10px] text-slate-400">
              Executive Reviewer (L0 Sovereign)
            </label>
            <input
              type="text"
              value={formData.reportingChain?.executiveReviewer || 'Sophia Al-Hashemi (MD)'}
              onChange={e => onChainChange('executiveReviewer', e.target.value)}
              className="w-full px-2 py-1.5 bg-slate-900 border border-slate-700/80 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
            />
          </div>
        </div>
      </div>
    </>
  );
};
