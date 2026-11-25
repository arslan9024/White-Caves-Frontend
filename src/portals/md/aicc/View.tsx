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
import { ManagerFractalSubtreePanel } from './ManagerFractalSubtreePanel';
import { OperationalSupervisorsChainPanel } from './OperationalSupervisorsChainPanel';
import { SanctumDelegationPanel } from './SanctumDelegationPanel';
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
  const [selectedFractalMgr, setSelectedFractalMgr] = useState<{
    deptSlot: number;
    managerSlot: number;
    code: string;
    name: string;
    roleTitle: string;
  } | null>(null);
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
      label: 'Bhakti 1-12-108 Authority',
      val: 'Arslan Malik (MD)',
      sub: '13,081 Fixed Seats • 5 Operational AI Supervisors',
    },
    {
      label: 'Operational AI Supervisors',
      val: 'Diana · Daisy · Mary · Linda · Henry',
      sub: 'Each seated at SUP-DD-M-01-1 with full AM → Mgr → Dir chain',
    },
    {
      label: 'Active WhatsApp Fleet',
      val: '10 Numbers',
      sub: 'AI Linda (SUP-08-1-01-1) • +971505760056 + 9 Hunters',
    },
    {
      label: 'Record Keeper & Reserve',
      val: `AI Henry • ${standbyRoster.length} Standby`,
      sub: 'SUP-11-1-01-1 (Sole Male AI) • 6 DMS Open Human Tiers',
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
                      onClick={() => {
                        const deptSlot =
                          Number(selectedDepartment.deptCode.replace('DEPT-', '')) || 1;
                        setSelectedFractalMgr(
                          selectedFractalMgr?.code === mgr.code
                            ? null
                            : {
                                deptSlot,
                                managerSlot: mgr.slot || 1,
                                code: mgr.code,
                                name: mgr.name,
                                roleTitle: mgr.roleTitle,
                              }
                        );
                      }}
                      className="px-1.5 py-0.5 text-[10px] bg-red-600/20 hover:bg-red-600/40 text-red-300 rounded border border-red-500/40 font-semibold"
                      title="Inspect 12 Assistant Managers & 108 Supervisors"
                    >
                      12/108
                    </button>
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
          {selectedFractalMgr && (
            <ManagerFractalSubtreePanel
              deptSlot={selectedFractalMgr.deptSlot}
              managerSlot={selectedFractalMgr.managerSlot}
              managerCode={selectedFractalMgr.code}
              managerName={selectedFractalMgr.name}
              roleTitle={selectedFractalMgr.roleTitle}
            />
          )}
          <OperationalSupervisorsChainPanel
            onInspectChain={chain => {
              setSelectedDeptCode(chain.deptCode);
              setSelectedFractalMgr({
                deptSlot: chain.deptSlot,
                managerSlot: chain.managerSlot,
                code: chain.manager.code,
                name: chain.manager.name,
                roleTitle: chain.manager.roleTitle,
              });
            }}
          />
          <DaisyLeasingHierarchyPanel />
          <SanctumDelegationPanel delegations={liveDelegations} />
        </div>
      </main>
    </div>
  );
};
export default AiccSanctumView;
