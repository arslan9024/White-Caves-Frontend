export interface Step {
  id: number;
  phase: number;
  text: string;
}

export interface Phase {
  id: number;
  title: string;
  emoji: string;
}

export interface PhaseStats {
  total: number;
  completed: number;
  percent: number;
}

export type ProgressMap = Record<number, boolean>;
