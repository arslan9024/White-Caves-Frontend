/**
 * View.tsx — AICC-Sanctum Executive Visual Command Center (MD Only)
 * 8-Tier Authority Chain: Arslan Malik (MD) -> 1 COO Zoe -> 12 Locked Directors -> 108 Managers
 * -> 1,296 Assistant Managers -> 11,664 Supervisors (Diana, Daisy, Mary, Linda, Henry)
 */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus } from 'lucide-react';
import { useAiccSanctumLogic } from './Logic.logic';
import { styles } from './Style.style';
import { DaisyLeasingHierarchyPanel } from './DaisyLeasingHierarchyPanel';
import { ManagerFractalSubtreePanel } from './ManagerFractalSubtreePanel';
import { OperationalSupervisorsChainPanel } from './OperationalSupervisorsChainPanel';
import { SanctumDelegationPanel } from './SanctumDelegationPanel';
import { SanctumManagerCard } from './SanctumManagerCard';

export const AiccSanctumView: React.FC = () => {
  const navigate = useNavigate();
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
          <button
            type="button"
            data-testid="sanctum-back-to-md-cockpit"
            onClick={() => navigate('/dashboard')}
            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-bold text-slate-200 cursor-pointer shrink-0"
          >
            <ArrowLeft size={13} className="text-red-400" /> MD Cockpit
          </button>
          <span className={styles.badge}>AICC-SANCTUM</span>
          <div>
            <h1 className={styles.h1}>White Caves AI Command Center — Sanctum</h1>
            <p className={styles.subtitle}>
              MD Arslan Malik → COO Zoe → 12 Locked Directors → 108 Managers → 1,296 Asst Mgrs →
              11,664 Supervisors (Diana · Daisy · Mary · Linda · Henry)
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
              <SanctumManagerCard
                key={mgr.id}
                mgr={mgr}
                deptCode={selectedDepartment.deptCode}
                totalManagers={selectedDepartment.managers.length}
                draggedAgentId={draggedAgentId}
                onDragStart={setDraggedAgentId}
                onSwapById={swapManagersById}
                onDragEndReset={() => setDraggedAgentId(null)}
                onSwapSlots={swapManagerSlots}
                onToggleFractal={m => {
                  const deptSlot = Number(selectedDepartment.deptCode.replace('DEPT-', '')) || 1;
                  setSelectedFractalMgr(
                    selectedFractalMgr?.code === m.code
                      ? null
                      : {
                          deptSlot,
                          managerSlot: m.slot || 1,
                          code: m.code,
                          name: m.name,
                          roleTitle: m.roleTitle,
                        }
                  );
                }}
                onDemoteToStandby={demoteToStandby}
              />
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
            onOpenWorkspace={route => navigate(route)}
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
