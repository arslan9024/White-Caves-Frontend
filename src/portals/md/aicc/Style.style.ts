/**
 * Style.style.ts — Styles for AICC-Sanctum Visual Command Center
 * Palette: White Caves Red (#EF4444), Deep Slate (#0F172A / #1E293B), Pure White (#FFFFFF)
 */

export const styles = {
  container: 'min-h-screen bg-[#0F172A] text-slate-100 flex flex-col font-sans',
  header:
    'border-b border-slate-800 bg-[#1E293B]/80 backdrop-blur px-6 py-4 flex items-center justify-between sticky top-0 z-30',
  titleGroup: 'flex items-center gap-3',
  badge:
    'px-2.5 py-1 text-xs font-bold uppercase tracking-wider bg-red-500/20 text-red-400 border border-red-500/30 rounded-md',
  h1: 'text-xl font-bold tracking-tight text-white flex items-center gap-2',
  subtitle: 'text-xs text-slate-400',

  // Executive COO Card
  execCard:
    'flex items-center gap-4 bg-slate-900/80 border border-slate-700/60 rounded-xl px-4 py-2.5 shadow-lg shadow-black/20',
  execAvatar:
    'w-10 h-10 rounded-lg flex items-center justify-center font-bold text-white shadow-inner',
  execInfo: 'flex flex-col',
  execLabel: 'text-[10px] font-semibold text-red-400 uppercase tracking-wider',
  execName: 'text-sm font-bold text-white',
  execSub: 'text-xs text-slate-400',
  execPill:
    'px-2 py-0.5 text-[10px] font-semibold uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded',

  // Metrics Bar
  metricsGrid: 'grid grid-cols-2 md:grid-cols-4 gap-4 px-6 py-4',
  metricCard: 'bg-[#1E293B]/50 border border-slate-800 rounded-xl p-4 flex flex-col',
  metricLabel: 'text-xs text-slate-400 uppercase tracking-wider font-semibold',
  metricValue: 'text-2xl font-black text-white mt-1',
  metricSub: 'text-[11px] text-slate-500 mt-0.5',

  // Main Content
  main: 'flex-1 px-6 py-4 flex flex-col lg:flex-row gap-6',
  deptList: 'lg:w-80 flex flex-col gap-2 shrink-0',
  deptItem:
    'p-3 rounded-xl border text-left transition-all duration-200 cursor-pointer flex items-center justify-between',
  deptItemActive: 'bg-red-500/10 border-red-500 text-white shadow-lg shadow-red-500/5',
  deptItemInactive:
    'bg-slate-900/40 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200',

  // Agent Board
  board: 'flex-1 flex flex-col gap-4',
  boardHeader: 'flex items-center justify-between pb-3 border-b border-slate-800',
  directorBanner:
    'p-4 rounded-xl border border-slate-800 bg-[#1E293B]/40 flex items-center justify-between',

  // Managers Grid
  managersGrid: 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4',
  managerCard:
    'p-4 rounded-xl border border-slate-800 bg-[#1E293B]/30 hover:border-slate-700 transition flex flex-col justify-between gap-3 relative group',
  cardTop: 'flex items-start justify-between gap-2',
  slotBadge:
    'w-6 h-6 rounded-full bg-slate-800 text-slate-400 text-xs font-bold flex items-center justify-center shrink-0',
  agentName: 'font-bold text-white text-sm group-hover:text-red-400 transition',
  roleTitle: 'text-xs text-slate-400 line-clamp-2 mt-0.5',
  tagList: 'flex flex-wrap gap-1 mt-2',
  toolTag:
    'px-1.5 py-0.5 text-[10px] bg-slate-800 text-slate-300 rounded border border-slate-700/50',
  slaPill: 'text-[10px] text-amber-400 flex items-center gap-1 mt-1 font-mono',

  // Action Buttons
  btnPrimary:
    'px-3 py-1.5 text-xs font-semibold bg-red-600 hover:bg-red-500 text-white rounded-lg transition shadow-md shadow-red-600/20',
  btnSecondary:
    'px-3 py-1.5 text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition border border-slate-700',
};
