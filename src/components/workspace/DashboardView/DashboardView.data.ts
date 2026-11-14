import { WorkspaceLead, WorkspaceLeaderboardEntry, RunwayData } from './DashboardView.types';

export const MOCK_LEADS: WorkspaceLead[] = [
  {
    id: 'L001',
    name: 'Mohammed Al-Habtoor',
    source: 'Bayut.com',
    sla_mins: 3,
    stage: 'Contacted',
    phone: '+971-50-XXX-1234',
  },
  {
    id: 'L002',
    name: 'Sarah Chen',
    source: 'Website',
    sla_mins: 8,
    stage: 'Qualified',
    phone: '+971-55-XXX-5678',
  },
  {
    id: 'L003',
    name: 'James Whitmore',
    source: 'Referral',
    sla_mins: 14,
    stage: 'New',
    phone: '+44-7XX-XXX-9012',
  },
  {
    id: 'L004',
    name: 'Priya Nair',
    source: 'Property Finder',
    sla_mins: 1,
    stage: 'Viewing Set',
    phone: '+971-52-XXX-3456',
  },
  {
    id: 'L005',
    name: 'Dmitry Volkov',
    source: 'Instagram',
    sla_mins: 22,
    stage: 'Follow-up',
    phone: '+7-9XX-XXX-7890',
  },
];

export const MOCK_LEADERBOARD_SALES: WorkspaceLeaderboardEntry[] = [
  { rank: 1, name: 'Arslan Malik', dept: 'Admin', initials: 'AM', points: 4820, change: 'up' },
  { rank: 2, name: 'Yusuf Al-Fahim', dept: 'Sales', initials: 'YA', points: 4215, change: 'up' },
  { rank: 3, name: 'Nadia Hassan', dept: 'Sales', initials: 'NH', points: 3890, change: 'down' },
  { rank: 4, name: 'Fatima Al-Rashid', dept: 'Sales', initials: 'FR', points: 3120, change: 'up' },
  { rank: 5, name: 'Omar Khalid', dept: 'Sales', initials: 'OK', points: 2870, change: 'down' },
];

export const MOCK_LEADERBOARD_LEASING: WorkspaceLeaderboardEntry[] = [
  { rank: 1, name: 'Layla Saeed', dept: 'Leasing', initials: 'LS', points: 3950, change: 'up' },
  {
    rank: 2,
    name: 'Ahmed Bin Rashid',
    dept: 'Leasing',
    initials: 'AB',
    points: 3610,
    change: 'down',
  },
  { rank: 3, name: 'Reem Al-Maktoum', dept: 'Leasing', initials: 'RM', points: 3200, change: 'up' },
  { rank: 4, name: 'Daniel Torres', dept: 'Leasing', initials: 'DT', points: 2980, change: 'up' },
  { rank: 5, name: 'Hana Yamamoto', dept: 'Leasing', initials: 'HY', points: 2540, change: 'down' },
];

export function getTierInfo(tier?: string) {
  switch (tier) {
    case 'Platinum':
      return { className: 'ws-badge-platinum', label: '💎 Platinum' };
    case 'Gold':
      return { className: 'ws-badge-gold', label: '🥇 Gold' };
    case 'Silver':
      return { className: 'ws-badge-silver', label: '🥈 Silver' };
    default:
      return { className: 'ws-badge-executive', label: '🟢 Executive' };
  }
}

export function getSLAInfo(mins: number) {
  if (mins <= 5) return { className: 'ws-sla-critical', label: `${mins}m ⚠️` };
  if (mins <= 12) return { className: 'ws-sla-warning', label: `${mins}m` };
  return { className: 'ws-sla-ok', label: `${mins}m ✓` };
}

export function calculateRunway(onboardingDate?: string): RunwayData | null {
  if (!onboardingDate) return null;
  const start = new Date(onboardingDate);
  const now = new Date();
  const elapsed = Math.floor((now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
  const total = 180;
  const remaining = Math.max(0, total - elapsed);
  const percentage = ((total - remaining) / total) * 100;

  let urgency = 'ws-safe';
  if (remaining <= 30) urgency = 'ws-urgent';
  else if (remaining <= 60) urgency = 'ws-warning';

  let barColor = 'var(--ws-emerald)';
  if (remaining <= 30) barColor = 'var(--ws-danger)';
  else if (remaining <= 60) barColor = 'var(--ws-warning)';

  return {
    remaining,
    total,
    elapsed,
    percentage,
    urgency,
    barColor,
    startDate: onboardingDate,
  };
}
