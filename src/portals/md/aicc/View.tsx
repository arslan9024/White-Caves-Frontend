/**
 * View.tsx — AICC-Sanctum Executive Visual Command Center
 *
 * Dedicated Managing Director Interface for White Caves Real Estate LLC
 * 1 COO Zoe -> 12 Directors -> 108 Managers (1-12-108 Hierarchy)
 */

import React from 'react';
import { useAiccSanctumLogic } from './Logic.logic';
import { styles } from './Style.style';

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
    swapManagerSlots,
  } = useAiccSanctumLogic();

  return (
    <div className={styles.container} data-testid="aicc-sanctum-command-center">
      {/* ── HEADER ──────────────────────────────────────────────────────── */}
      <header className={styles.header}>
        <div className={styles.titleGroup}>
          <span className={styles.badge}>AICC-SANCTUM</span>
          <div>
            <h1 className={styles.h1}>
              <span>White Caves AI Command Center — Sanctum</span>
            </h1>
            <p className={styles.subtitle}>
              Sovereign Operations • 1 COO (Zoe) • 12 Directors • 108 Managers • 15m SLA
            </p>
          </div>
        </div>

        {/* ── EXECUTIVE COO CARD ────────────────────────────────────────── */}
        <div className={styles.execCard}>
          <div className={`${styles.execAvatar} bg-red-600 text-white font-black text-lg`}>Z</div>
          <div className={styles.execInfo}>
            <span className={styles.execLabel}>AI EXECUTIVE PARTNER</span>
            <span className={styles.execName}>{executiveCoo.name}</span>
            <span className={styles.execSub}>{executiveCoo.roleTitle}</span>
          </div>
          <span className={styles.execPill}>ONLINE • 15M SLA ACTIVE</span>
        </div>
      </header>

      {/* ── METRICS STRIP ───────────────────────────────────────────────── */}
      <div className={styles.metricsGrid}>
        <div className={styles.metricCard}>
          <span className={styles.metricLabel}>Total Command Network</span>
          <span className={styles.metricValue}>121 Agents</span>
          <span className={styles.metricSub}>1 COO • 12 Directors • 108 Managers</span>
        </div>
        <div className={styles.metricCard}>
          <span className={styles.metricLabel}>Active WhatsApp Channel</span>
          <span className={styles.metricValue}>5 Numbers</span>
          <span className={styles.metricSub}>AI Linda • DAMAC Hills 2 Inbound</span>
        </div>
        <div className={styles.metricCard}>
          <span className={styles.metricLabel}>The Record Keeper</span>
          <span className={styles.metricValue}>AI Henry</span>
          <span className={styles.metricSub}>Document Vault • Sole Male AI Officer</span>
        </div>
        <div className={styles.metricCard}>
          <span className={styles.metricLabel}>Standby Reserve Pool</span>
          <span className={styles.metricValue}>{standbyRoster.length} Agents</span>
          <span className={styles.metricSub}>Zero-Data-Loss Architecture</span>
        </div>
      </div>

      {/* ── MAIN WORKSPACE ──────────────────────────────────────────────── */}
      <main className={styles.main}>
        {/* ── LEFT: 12 DEPARTMENTS COLUMN ───────────────────────────────── */}
        <div className={styles.deptList}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              12 Corporate Departments
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
                        Dir: {dept.director.name} • 9 Managers
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

        {/* ── RIGHT: SELECTED DEPARTMENT & 9 SPECIALIZED MANAGERS ───────── */}
        <div className={styles.board}>
          {/* Department Banner */}
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
                  Commanding Director:{' '}
                  <strong className="text-white">{selectedDepartment?.director.name}</strong> (
                  {selectedDepartment?.director.roleTitle})
                </p>
              </div>
            </div>

            {/* Search Input */}
            <input
              type="text"
              placeholder="Search manager by role or tool..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-red-500 w-64"
            />
          </div>

          {/* 9 Managers Grid */}
          <div className={styles.managersGrid}>
            {filteredManagers.map(mgr => (
              <div key={mgr.id} className={styles.managerCard}>
                <div>
                  <div className={styles.cardTop}>
                    <div className="flex items-center gap-2">
                      <span className={styles.slotBadge}>#{mgr.slot}</span>
                      <div>
                        <div className={styles.agentName}>
                          {mgr.name} {mgr.gender === 'Male' ? '🛡️' : '✨'}
                        </div>
                        <div className={styles.roleTitle}>{mgr.roleTitle}</div>
                      </div>
                    </div>
                    <span className="px-1.5 py-0.5 text-[9px] uppercase font-bold tracking-wider rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
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
                  <span className={styles.slaPill}>⏱️ {mgr.slaResponseMinutes}m SLA</span>
                  <div className="flex items-center gap-1.5">
                    {mgr.slot && mgr.slot > 1 && (
                      <button
                        type="button"
                        onClick={() =>
                          swapManagerSlots(selectedDepartment.deptCode, mgr.slot!, mgr.slot! - 1)
                        }
                        className="px-1.5 py-0.5 text-[10px] bg-slate-800 hover:bg-slate-700 text-slate-300 rounded border border-slate-700"
                        title="Swap Up"
                      >
                        ▲
                      </button>
                    )}
                    {mgr.slot && mgr.slot < 9 && (
                      <button
                        type="button"
                        onClick={() =>
                          swapManagerSlots(selectedDepartment.deptCode, mgr.slot!, mgr.slot! + 1)
                        }
                        className="px-1.5 py-0.5 text-[10px] bg-slate-800 hover:bg-slate-700 text-slate-300 rounded border border-slate-700"
                        title="Swap Down"
                      >
                        ▼
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Live Delegation Feed */}
          <div className="mt-4 p-4 rounded-xl border border-slate-800 bg-[#1E293B]/40">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800 mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Live Sanctum Delegation Chain
              </span>
              <span className="text-[10px] text-slate-400">Socket.io Telemetry Active</span>
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
                    <span className="text-slate-500">Chain: {del.chain.join(' ➔ ')}</span>
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
