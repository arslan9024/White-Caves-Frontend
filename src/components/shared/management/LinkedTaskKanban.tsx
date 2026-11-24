/**
 * LinkedTaskKanban.tsx — Reusable Department/Supervisor Linked Task Kanban Board
 * Shared across DMS, TMS, and ERMS viewports (AEG-042 < 350 lines).
 */
import React, { FC } from 'react';
import { Clock, Award } from 'lucide-react';
import type { SupervisorTaskAssignment } from '../../../portals/md/aicc/supervisorTaskRegistry.data';

export interface LinkedTaskKanbanProps {
  title?: string;
  tasks: SupervisorTaskAssignment[];
  onSelectTask?: (task: SupervisorTaskAssignment) => void;
}

export const LinkedTaskKanban: FC<LinkedTaskKanbanProps> = React.memo(
  ({ title = 'Linked Statutory & Operational Tasks', tasks, onSelectTask }) => (
    <div
      data-testid="shared-linked-task-kanban"
      style={{
        backgroundColor: '#0F172A',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        borderRadius: '14px',
        padding: '14px',
        color: '#FFFFFF',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '12px',
          paddingBottom: '8px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        }}
      >
        <span style={{ fontSize: '13px', fontWeight: 800 }}>{title}</span>
        <span style={{ fontSize: '11px', color: '#10B981', fontWeight: 700 }}>
          {tasks.length} Active
        </span>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
          gap: '10px',
        }}
      >
        {tasks.map(task => (
          <div
            key={task.taskCode}
            onClick={() => onSelectTask?.(task)}
            style={{
              backgroundColor: '#1E293B',
              border: '1px solid rgba(255, 255, 255, 0.06)',
              borderRadius: '10px',
              padding: '12px',
              cursor: onSelectTask ? 'pointer' : 'default',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span
                style={{
                  fontFamily: 'monospace',
                  fontSize: '11px',
                  color: '#EF4444',
                  fontWeight: 700,
                }}
              >
                {task.taskCode}
              </span>
              <span style={{ fontSize: '10px', color: '#94A3B8', fontFamily: 'monospace' }}>
                {task.supervisorId}
              </span>
            </div>
            <div style={{ fontSize: '12px', fontWeight: 700, lineHeight: 1.35 }}>{task.title}</div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: '4px',
                fontSize: '11px',
                color: '#94A3B8',
              }}
            >
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                <Clock size={11} /> {task.slaLabel}
              </span>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  color: '#F59E0B',
                  fontWeight: 700,
                }}
              >
                <Award size={11} /> +{task.xpReward} XP
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
);

LinkedTaskKanban.displayName = 'LinkedTaskKanban';
export default LinkedTaskKanban;
