/**
 * PlanManager — Types Layer (Mary Allen Wilkes Architecture)
 * Strict typing for Zoe strategic and technical plans
 */

export type PlanStatus = 'draft' | 'in_progress' | 'completed' | 'archived';

export interface PlanItem {
  id: string;
  title: string;
  description?: string;
  status: PlanStatus;
  category?: string;
  tags?: string[];
  department?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface PlanStats {
  total: number;
  inProgress: number;
  completed: number;
  drafts: number;
}

export interface StatusMessage {
  type: 'error' | 'success' | 'info';
  text: string;
}

