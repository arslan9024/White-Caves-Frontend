import React, { FC } from 'react';
import { GripVertical, UserMinus } from 'lucide-react';
import { styles } from './Style.style';

export interface SanctumManagerItem {
  id: string;
  code: string;
  name: string;
  roleTitle: string;
  slot?: number;
  status: string;
  capabilities: string[];
  slaResponseMinutes: number;
}

interface SanctumManagerCardProps {
  mgr: SanctumManagerItem;
  deptCode: string;
  totalManagers: number;
  draggedAgentId: string | null;
  onDragStart: (id: string) => void;
  onSwapById: (srcId: string, targetId: string) => void;
  onDragEndReset: () => void;
  onSwapSlots: (deptCode: string, fromSlot: number, toSlot: number) => void;
  onToggleFractal: (mgr: SanctumManagerItem) => void;
  onDemoteToStandby: (id: string) => void;
}

export const SanctumManagerCard: FC<SanctumManagerCardProps> = ({
  mgr,
  deptCode,
  totalManagers,
  draggedAgentId,
  onDragStart,
  onSwapById,
  onDragEndReset,
  onSwapSlots,
  onToggleFractal,
  onDemoteToStandby,
}) => (
  <div
    draggable
    onDragStart={e => {
      onDragStart(mgr.id);
      e.dataTransfer.setData('text/plain', mgr.id);
    }}
    onDragOver={e => e.preventDefault()}
    onDrop={e => {
      e.preventDefault();
      const srcId = e.dataTransfer.getData('text/plain') || draggedAgentId;
      if (srcId) onSwapById(srcId, mgr.id);
      onDragEndReset();
    }}
    className={`${styles.managerCard} cursor-grab active:cursor-grabbing`}
  >
    <div>
      <div className={styles.cardTop}>
        <div className="flex items-center gap-2">
          <GripVertical size={13} className="text-slate-500 shrink-0" />
          <span className={styles.slotBadge}>#{mgr.slot}</span>
          <div>
            <div className={styles.agentName}>{mgr.name}</div>
            <div className={styles.roleTitle}>{mgr.roleTitle}</div>
          </div>
        </div>
        <span className="px-1.5 py-0.5 text-[9px] uppercase font-bold rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
          {mgr.status}
        </span>
      </div>
      <div className={styles.tagList}>
        {mgr.capabilities.slice(0, 3).map(cap => (
          <span key={cap} className={styles.toolTag}>
            {cap}
          </span>
        ))}
      </div>
    </div>
    <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
      <span className={styles.slaPill}>{mgr.slaResponseMinutes}m SLA</span>
      <div className="flex items-center gap-1">
        {mgr.slot && mgr.slot > 1 && (
          <button
            type="button"
            onClick={() => onSwapSlots(deptCode, mgr.slot!, mgr.slot! - 1)}
            className="px-1.5 py-0.5 text-[10px] bg-slate-800 hover:bg-slate-700 text-slate-300 rounded border border-slate-700"
            title="Move Up"
          >
            ▲
          </button>
        )}
        {mgr.slot && mgr.slot < totalManagers && (
          <button
            type="button"
            onClick={() => onSwapSlots(deptCode, mgr.slot!, mgr.slot! + 1)}
            className="px-1.5 py-0.5 text-[10px] bg-slate-800 hover:bg-slate-700 text-slate-300 rounded border border-slate-700"
            title="Move Down"
          >
            ▼
          </button>
        )}
        <button
          type="button"
          onClick={() => onToggleFractal(mgr)}
          className="px-1.5 py-0.5 text-[10px] bg-red-600/20 hover:bg-red-600/40 text-red-300 rounded border border-red-500/40 font-semibold"
          title="Inspect 12 Assistant Managers & 108 Supervisors"
        >
          12/108
        </button>
        <button
          type="button"
          onClick={() => onDemoteToStandby(mgr.id)}
          className="px-1.5 py-0.5 text-[10px] bg-slate-800 hover:bg-red-900/60 text-slate-300 rounded border border-slate-700"
          title="Move to Standby"
        >
          <UserMinus size={11} />
        </button>
      </div>
    </div>
  </div>
);
