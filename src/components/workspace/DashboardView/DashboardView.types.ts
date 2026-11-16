export interface WorkspaceLead {
  id: string;
  name: string;
  source: string;
  sla_mins: number;
  stage: string;
  phone: string;
}

export interface WorkspaceLeaderboardEntry {
  rank: number;
  name: string;
  dept: string;
  initials: string;
  points: number;
  change: 'up' | 'down';
}

export interface RunwayData {
  remaining: number;
  total: number;
  elapsed: number;
  percentage: number;
  urgency: string;
  barColor: string;
  startDate: string;
}

export type LeaderboardTab = 'sales' | 'leasing';

