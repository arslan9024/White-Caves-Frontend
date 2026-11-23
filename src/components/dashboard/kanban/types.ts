/**
 * types.ts
 *
 * Domain types for Department Task Kanban Board.
 */

export interface KanbanTask {
  id: string;
  title: string;
  department: string;
  assignee: string;
  priority: 'CRITICAL' | 'HIGH' | 'MEDIUM';
  stage: 'backlog' | 'in_progress' | 'review' | 'approved';
  slaMinutes: number;
}

export interface KanbanStageConfig {
  id: KanbanTask['stage'];
  title: string;
  color: string;
  icon: string;
}
