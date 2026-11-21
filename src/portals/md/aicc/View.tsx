/**
 * View.tsx — AICC-Sanctum Executive Visual Command Center (MD Only)
 * 8-Tier Authority Chain: Arslan Malik (MD) -> 1 COO Zoe -> 12 Locked Directors -> 108 Managers
 * -> Daisy's 12 Assistant Managers -> 108 Supervisors -> 1 Team Leader -> 10 Leasing Agents
 */

import React, { useState } from 'react';
import { GripVertical, Plus, UserMinus } from 'lucide-react';
import { useAiccSanctumLogic } from './Logic.logic';
import { styles } from './Style.style';
import { DaisyLeasingHierarchyPanel } from './DaisyLeasingHierarchyPanel';

export const AiccSanctumView: React.FC = () => {
  const {
    executiveCoo,
    departments,
    selectedDeptCode,
    setSelectedDeptCode,
    selectedDepartment,
    filteredManagers,
    searchQuery,
    setSearchQuery,
    liveDelegations,
    standbyRoster,
    draggedAgentId,
    setDraggedAgentId,
    governanceNotice,
    swapManagerSlots,
    swapManagersById,
    transferManagerToDepartment,
    createManager,
    demoteToStandby,
  } = useAiccSanctumLogic();

  const [showAdd, setShowAdd] = useState(false);
  const [newName, setNewName] = useState('');
  const [newRole, setNewRole] = useState('');
  const [newCap, setNewCap] = useState('');

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newRole.trim() || !selectedDepartment) return;
    if (createManager(selectedDepartment.deptCode, newName, newRole, newCap)) {
      setNewName('');
      setNewRole('');
      setNewCap('');
      setShowAdd(false);
    }
  };

  const metrics = [
    {
      label: '8-Tier Sovereign Authority',
      val: 'Arslan Malik (MD)',
      sub: 'Sole Human Today • 121 Core AI + 131 Daisy Division',
    },
    {
      label: 'Daisy Leasing Division (DEPT-05)',
      val: '12 AMs • 108 Sups',
      sub: 'Dir Clara (DIR-05) → Mgr Daisy → 1 TL → 10 Agents',
    },
    {
      label: 'Active WhatsApp Fleet',
      val: '10 Numbers',
      sub: '1 Primary Master (+971505760056) + 9 Hunter SIMs',
    },
    {
      label: 'The Record Keeper & Reserve',
      val: `AI Henry • ${standbyRoster.length} Standby`,
      sub: 'MGR-11-1 (Sole Male AI) • 6 DMS Open Human Tiers',
    },
  ];

  return (
    <div className={styles.container} data-testid="aicc-sanctum-command-center">
      <header className={styles.header}>
        <div className={styles.titleGroup}>
          <span className={styles.badge}>AICC-SANCTUM</span>
          <div>
            <h1 className={styles.h1}>White Caves AI Command Center — Sanctum</h1>
            <p className={styles.subtitle}>
              MD Arslan Malik → COO Zoe → 12 Locked Directors → 108 Managers → Daisy 12 Asst Mgrs /
              108 Supervisors / 1 TL / 10 Agents
            </p>
          </div>
        </div>
        <div className={styles.execCard}>
          <div className={`${styles.execAvatar} bg-red-600 text-white font-black text-lg`}>Z</div>
          <div className={styles.execInfo}>
            <span className={styles.execLabel}>REPORTS TO ARSLAN MALIK (MD)</span>
            <span className={styles.execName}>{executiveCoo.name}</span>
            <span className={styles.execSub}>{executiveCoo.roleTitle}</span>
          </div>
          <span className={styles.execPill}>ONLINE • 15M SLA</span>
        </div>
      </header>

      {governanceNotice && (
        <div className="mb-3 px-4 py-2 rounded-lg bg-red-500/15 border border-red-500/40 text-xs text-red-200">
          {governanceNotice}
        </div>
      )}

      <div className={styles.metricsGrid}>
        {metrics.map(m => (
          <div key={m.label} className={styles.metricCard}>
            <span className={styles.metricLabel}>{m.label}</span>
            <span className={styles.metricValue}>{m.val}</span>
            <span className={styles.metricSub}>{m.sub}</span>
          </div>
        ))}
      </div>

      <main className={styles.main}>
        <div className={styles.deptList}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              12 Locked Departments (Drop Target)
            </span>
            <span className="text-xs text-red-400 font-mono">12/12</span>
          </div>
          <div className="flex flex-col gap-1.5 overflow-y-auto max-h-[calc(100vh-280px)] pr-1">
            {departments.map(dept => {
              const isActive = dept.deptCode === selectedDeptCode;
              return (
                <button
                  key={dept.deptCode}
                  type="button"
                  onClick={() => setSelectedDeptCode(dept.deptCode)}
                  onDragOver={e => e.preventDefault()}
                  onDrop={e => {
                    e.preventDefault();
                    const srcId = e.dataTransfer.getData('text/plain') || draggedAgentId;
                    if (srcId) transferManagerToDepartment(srcId, dept.deptCode);
                    setDraggedAgentId(null);
                  }}
                  className={`${styles.deptItem} ${isActive ? styles.deptItemActive : styles.deptItemInactive}`}
                >
                  <div className="flex items-center gap-2.5">
                    <span
                      className="w-2.5 h-2.5 rounded-full shrink-0"
                      style={{ backgroundColor: dept.color }}
                    />
                    <div className="flex flex-col text-left">
                      <span className="text-xs font-bold leading-tight">{dept.name}</span>
                      <span className="text-[10px] text-slate-400">
                        Dir: {dept.director.name} • {dept.managers.length} Mgrs
                      </span>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-slate-500 shrink-0">
                    {dept.deptCode}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className={styles.board}>
          <div className={styles.directorBanner}>
            <div className="flex items-center gap-3">
              <span
                className="w-4 h-4 rounded-md"
                style={{ backgroundColor: selectedDepartment?.color }}
              />
              <div>
                <h2 className="text-base font-bold text-white flex items-center gap-2">
                  <span>{selectedDepartment?.name}</span>
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                    {selectedDepartment?.deptCode}
                  </span>
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Director:{' '}
                  <strong className="text-white">{selectedDepartment?.director.name}</strong> (
                  {selectedDepartment?.director.code}) • Reports to AI Zoe (WC-COO-01) → Arslan
                  Malik (MD)
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Search manager..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-red-500 w-44"
              />
              <button
                type="button"
                onClick={() => setShowAdd(v => !v)}
                className="inline-flex items-center gap-1 bg-red-600 hover:bg-red-500 text-white px-3 py-1.5 rounded-lg text-xs font-bold"
              >
                <Plus size={13} /> Add Manager
              </button>
            </div>
          </div>

          {showAdd && (
            <form
              onSubmit={handleAdd}
              className="mb-3 p-3 rounded-xl bg-slate-900/90 border border-slate-700 flex flex-wrap gap-2 items-center"
            >
              <input
                value={newName}
                onChange={e => setNewName(e.target.value)}
                placeholder="Female Manager Name (e.g. AI Leila)"
                className="bg-slate-950 border border-slate-700 rounded px-2.5 py-1.5 text-xs text-white flex-1 min-w-[150px]"
                required
              />
              <input
                value={newRole}
                onChange={e => setNewRole(e.target.value)}
                placeholder="Role Title"
                className="bg-slate-950 border border-slate-700 rounded px-2.5 py-1.5 text-xs text-white flex-1 min-w-[150px]"
                required
              />
              <input
                value={newCap}
                onChange={e => setNewCap(e.target.value)}
                placeholder="Capabilities (comma-separated)"
                className="bg-slate-950 border border-slate-700 rounded px-2.5 py-1.5 text-xs text-white flex-1 min-w-[150px]"
              />
              <button
                type="submit"
                className="bg-emerald-600 text-white px-3 py-1.5 rounded text-xs font-bold"
              >
                Save
              </button>
            </form>
          )}

          <div className={styles.managersGrid}>
            {filteredManagers.map(mgr => (
              <div
                key={mgr.id}
                draggable
                onDragStart={e => {
                  setDraggedAgentId(mgr.id);
                  e.dataTransfer.setData('text/plain', mgr.id);
                }}
                onDragOver={e => e.preventDefault()}
                onDrop={e => {
                  e.preventDefault();
                  const srcId = e.dataTransfer.getData('text/plain') || draggedAgentId;
                  if (srcId) swapManagersById(srcId, mgr.id);
                  setDraggedAgentId(null);
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
                        onClick={() =>
                          swapManagerSlots(selectedDepartment.deptCode, mgr.slot!, mgr.slot! - 1)
                        }
                        className="px-1.5 py-0.5 text-[10px] bg-slate-800 hover:bg-slate-700 text-slate-300 rounded border border-slate-700"
                        title="Move Up"
                      >
                        ▲
                      </button>
                    )}
                    {mgr.slot && mgr.slot < selectedDepartment.managers.length && (
                      <button
                        type="button"
                        onClick={() =>
                          swapManagerSlots(selectedDepartment.deptCode, mgr.slot!, mgr.slot! + 1)
                        }
                        className="px-1.5 py-0.5 text-[10px] bg-slate-800 hover:bg-slate-700 text-slate-300 rounded border border-slate-700"
                        title="Move Down"
                      >
                        ▼
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => demoteToStandby(mgr.id)}
                      className="px-1.5 py-0.5 text-[10px] bg-slate-800 hover:bg-red-900/60 text-slate-300 rounded border border-slate-700"
                      title="Move to Standby"
                    >
                      <UserMinus size={11} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <DaisyLeasingHierarchyPanel />

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
              {liveDelegations.map(del => (
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
        </div>
      </main>
    </div>
  );
};

export default AiccSanctumView;
