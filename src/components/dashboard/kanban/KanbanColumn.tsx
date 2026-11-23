/**
 * KanbanColumn.tsx
 *
 * Single column representing a Kanban workflow stage.
 */

import React, { FC } from 'react';
import { KanbanTask, KanbanStageConfig } from './types';
import { kanbanStyles } from './styles';
import { KanbanCard } from './KanbanCard';

export interface KanbanColumnProps {
  stage: KanbanStageConfig;
  tasks: KanbanTask[];
  onMoveTask: (taskId: string, targetStage: KanbanTask['stage']) => void;
}

export const KanbanColumn: FC<KanbanColumnProps> = ({ stage, tasks, onMoveTask }) => {
  return (
    <div style={kanbanStyles.column}>
      {/* Column Header */}
      <div style={kanbanStyles.columnHeader}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span>{stage.icon}</span>
          <strong style={{ fontSize: '0.85rem', color: '#0F172A' }}>{stage.title}</strong>
        </div>
        <span style={kanbanStyles.columnBadge(stage.color)}>{tasks.length}</span>
      </div>

      {/* Task Cards */}
      <div style={kanbanStyles.cardsWrapper}>
        {tasks.map(task => (
          <KanbanCard key={task.id} task={task} stageId={stage.id} onMoveTask={onMoveTask} />
        ))}
      </div>
    </div>
  );
};

export default KanbanColumn;
