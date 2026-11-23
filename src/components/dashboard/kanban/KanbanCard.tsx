/**
 * KanbanCard.tsx
 *
 * Single task card rendering in the Kanban column with quick stage transitions.
 */

import React, { FC } from 'react';
import { motion } from 'framer-motion';
import { KanbanTask } from './types';
import { kanbanStyles } from './styles';

export interface KanbanCardProps {
  task: KanbanTask;
  stageId: KanbanTask['stage'];
  onMoveTask: (taskId: string, targetStage: KanbanTask['stage']) => void;
}

export const KanbanCard: FC<KanbanCardProps> = ({ task, stageId, onMoveTask }) => {
  const isCritical = task.priority === 'CRITICAL';

  const handlePrevStage = () => {
    const prev =
      stageId === 'approved' ? 'review' : stageId === 'review' ? 'in_progress' : 'backlog';
    onMoveTask(task.id, prev);
  };

  const handleNextStage = () => {
    const next =
      stageId === 'backlog' ? 'in_progress' : stageId === 'in_progress' ? 'review' : 'approved';
    onMoveTask(task.id, next);
  };

  return (
    <motion.div layout style={kanbanStyles.card}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: '4px',
        }}
      >
        <span style={{ fontSize: '0.68rem', fontWeight: 800, color: '#64748B' }}>{task.id}</span>
        <span style={kanbanStyles.priorityBadge(isCritical)}>{task.priority}</span>
      </div>

      <div
        style={{
          fontSize: '0.8rem',
          fontWeight: 800,
          color: '#0F172A',
          marginBottom: '6px',
          lineHeight: '1.3',
        }}
      >
        {task.title}
      </div>

      <div
        style={{
          fontSize: '0.72rem',
          color: '#64748B',
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '8px',
        }}
      >
        <span>👤 {task.assignee}</span>
        <span style={{ color: '#059669', fontWeight: 700 }}>⏱️ {task.slaMinutes}m left</span>
      </div>

      <div
        style={{ display: 'flex', gap: '4px', borderTop: '1px solid #F1F5F9', paddingTop: '6px' }}
      >
        {stageId !== 'backlog' && (
          <button
            onClick={handlePrevStage}
            style={{
              flex: 1,
              background: '#F1F5F9',
              border: 'none',
              borderRadius: '4px',
              fontSize: '0.65rem',
              fontWeight: 700,
              padding: '3px',
              cursor: 'pointer',
            }}
          >
            ◀ Back
          </button>
        )}
        {stageId !== 'approved' && (
          <button
            onClick={handleNextStage}
            style={{
              flex: 1,
              background: '#0F172A',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '4px',
              fontSize: '0.65rem',
              fontWeight: 700,
              padding: '3px',
              cursor: 'pointer',
            }}
          >
            {stageId === 'review' ? '👑 Approve' : 'Advance ▶'}
          </button>
        )}
      </div>
    </motion.div>
  );
};

export default KanbanCard;
