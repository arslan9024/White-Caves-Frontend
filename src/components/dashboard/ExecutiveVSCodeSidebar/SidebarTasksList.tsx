/**
 * SidebarTasksList.tsx
 * White Caves Real Estate LLC - Tasks Left Sidebar Drawer
 * Standard: AEGIS Canonical 7-Category Architecture Standard (Drawer Sub-View)
 * Single Purpose File Law: < 350 lines
 * Protocol: Turing Protocol Double-Layer Routing
 */

import React, { FC } from 'react';
import { PlusCircle, ArrowRight, Clock, Bot } from 'lucide-react';
import { buildCanonical200Tasks } from '../../crm/TaskManager/TaskManager.data';
import { TMS_LEASING_TASK_GROUPS } from '../../../portals/md/aicc/daisyDivision.data';
import { SidebarListWrapper } from './SidebarDepartmentsList.styles';

export interface SidebarTasksListProps {
  filterQuery?: string;
  selectedTaskId?: string | null;
  onSelectTask?: (id: string, title: string) => void;
  onOpenCreate?: () => void;
  onNavigateToView?: (route: string) => void;
}

export const SidebarTasksList: FC<SidebarTasksListProps> = ({
  filterQuery = '',
  selectedTaskId,
  onSelectTask,
  onOpenCreate,
  onNavigateToView,
}) => {
  const allTasks = React.useMemo(() => buildCanonical200Tasks(), []);
  const query = filterQuery.trim().toLowerCase();

  const visibleTasks = allTasks.filter(t => {
    if (!query) return true;
    return (
      t.title.toLowerCase().includes(query) ||
      t.taskCode.toLowerCase().includes(query) ||
      (t.statutoryAuthority && t.statutoryAuthority.toLowerCase().includes(query)) ||
      t.reportingChain.supervisorName.toLowerCase().includes(query)
    );
  });

  return (
    <SidebarListWrapper data-testid="sidebar-tasks-list">
      {/* ── Level 1 Category Portals ─────────────────────────────────── */}
      <div style={{ marginBottom: '8px' }}>
        <div
          onClick={() => onNavigateToView?.('/dashboard/tasks/catalog')}
          style={{
            fontSize: '0.68rem',
            color: '#34D399',
            padding: '4px 8px',
            cursor: 'pointer',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            background: 'rgba(16, 185, 129, 0.08)',
            border: '1px solid rgba(16, 185, 129, 0.2)',
            borderRadius: '6px',
            marginBottom: '4px',
          }}
          data-testid="link-all-tasks-catalog"
        >
          📋 Open Tasks Catalog Hub (CRUD) <ArrowRight size={11} />
        </div>
        <div
          onClick={() => onNavigateToView?.('/dashboard/tasks/categories')}
          style={{
            fontSize: '0.68rem',
            color: '#38BDF8',
            padding: '4px 8px',
            cursor: 'pointer',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            background: 'rgba(56, 189, 248, 0.08)',
            border: '1px solid rgba(56, 189, 248, 0.2)',
            borderRadius: '6px',
            marginBottom: '8px',
          }}
          data-testid="link-tasks-categories"
        >
          🏛️ Tasks by Authority (DLD, RERA, FTA) <ArrowRight size={11} />
        </div>
      </div>

      {/* ── P0 DAMAC Hills 2 Leasing TMS Task Collections (AICC-Sanctum Actors) ── */}
      <div style={{ marginBottom: '10px' }} data-testid="sidebar-tms-leasing-collections">
        <div
          style={{
            fontSize: '0.65rem',
            fontWeight: 800,
            color: '#EF4444',
            textTransform: 'uppercase',
            padding: '2px 8px 6px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <span>P0 Leasing Collections ({TMS_LEASING_TASK_GROUPS.length})</span>
          <span style={{ color: '#34D399' }}>DEPT-05 • AICC Actors</span>
        </div>
        {TMS_LEASING_TASK_GROUPS.map(group => (
          <div
            key={group.collectionCode}
            onClick={() => onNavigateToView?.('/aicc-sanctum')}
            data-testid={`sidebar-tms-group-${group.collectionCode}`}
            style={{
              padding: '8px 10px',
              borderRadius: '8px',
              background: 'rgba(239, 68, 68, 0.08)',
              border: '1px solid rgba(239, 68, 68, 0.28)',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              gap: '4px',
              marginBottom: '6px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span
                style={{
                  fontSize: '0.62rem',
                  fontFamily: 'monospace',
                  color: '#FCA5A5',
                  background: 'rgba(239, 68, 68, 0.16)',
                  padding: '1px 5px',
                  borderRadius: '4px',
                  fontWeight: 800,
                }}
              >
                {group.collectionCode}
              </span>
              <span
                style={{
                  fontSize: '0.6rem',
                  color: '#34D399',
                  fontFamily: 'monospace',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '3px',
                }}
              >
                <Bot size={10} /> {group.aiccActorCode}
              </span>
            </div>
            <div style={{ fontSize: '0.74rem', fontWeight: 700, color: '#F8FAFC' }}>
              {group.title}
            </div>
            <div style={{ fontSize: '0.63rem', color: '#FBBF24', fontWeight: 600 }}>
              Actor: {group.aiccActorName}
            </div>
            <div style={{ fontSize: '0.59rem', color: '#94A3B8' }}>{group.reportingChain}</div>
          </div>
        ))}
      </div>

      {/* Header bar with Count and New Task action */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '4px 8px 10px 8px',
        }}
      >
        <span
          style={{
            fontSize: '0.68rem',
            fontWeight: 800,
            color: '#10B981',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
          }}
        >
          Statutory Tasks ({visibleTasks.length}/200)
        </span>
        {onOpenCreate && (
          <button
            onClick={onOpenCreate}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              padding: '2px 8px',
              borderRadius: '4px',
              background: 'rgba(16, 185, 129, 0.15)',
              border: '1px solid rgba(16, 185, 129, 0.3)',
              color: '#34D399',
              fontSize: '0.68rem',
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            <PlusCircle size={12} />
            <span>New Task</span>
          </button>
        )}
      </div>

      {/* ── Level 2 Sub-Items: Tasks with Turing IDs ─────────────────── */}
      {visibleTasks.slice(0, 50).map(task => {
        const isSelected = selectedTaskId === task._id;
        return (
          <div
            key={task._id}
            onClick={() => {
              onSelectTask?.(task._id, task.title);
              onNavigateToView?.(`/dashboard/tasks/${task._id}`);
            }}
            data-testid={`sidebar-task-${task.taskCode}`}
            style={{
              padding: '10px 12px',
              borderRadius: '8px',
              background: isSelected ? 'rgba(16, 185, 129, 0.15)' : '#070D18',
              border: isSelected ? '1px solid #10B981' : '1px solid rgba(255, 255, 255, 0.05)',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
              marginBottom: '6px',
              transition: 'all 0.15s ease',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span
                style={{
                  fontSize: '0.65rem',
                  fontFamily: 'monospace',
                  color: '#34D399',
                  background: 'rgba(16, 185, 129, 0.1)',
                  padding: '2px 6px',
                  borderRadius: '4px',
                  fontWeight: 700,
                }}
              >
                {task.taskCode}
              </span>
              <span
                style={{
                  fontSize: '0.65rem',
                  fontWeight: 800,
                  color: task.priority === 'CRITICAL' ? '#EF4444' : '#F59E0B',
                }}
              >
                {task.priority}
              </span>
            </div>

            <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#F8FAFC' }}>
              {task.title}
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontSize: '0.68rem',
                color: '#64748B',
              }}
            >
              <span>{task.statutoryAuthority || 'Internal'}</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '3px', color: '#94A3B8' }}>
                <Clock size={11} /> {task.defaultSla}
              </span>
            </div>
          </div>
        );
      })}
    </SidebarListWrapper>
  );
};

export default SidebarTasksList;
