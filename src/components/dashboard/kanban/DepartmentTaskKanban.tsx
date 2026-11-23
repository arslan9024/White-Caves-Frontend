/**
 * DepartmentTaskKanban.tsx
 *
 * White Caves Real Estate LLC — Department Task Kanban Board (4-Stage Pipeline).
 * Stages:
 * 1. Backlog (Intake & AI Decomposition)
 * 2. In Progress (Supervisor Execution)
 * 3. Manager / Legal Review (Compliance Verification)
 * 4. Founder Approved (Arslan Malik Sovereign Seal)
 *
 * Decomposed under AEGIS V5.1 AEG-042 (< 350 lines, target <= 300).
 */

import React, { FC } from 'react';
import { KanbanTask, KanbanStageConfig } from './types';
import { INITIAL_TASKS, ALL_DEPARTMENTS, KANBAN_STAGES } from './constants';
import { kanbanStyles } from './styles';
import { useKanbanTasks } from './useKanbanTasks';
import { KanbanHeader } from './KanbanHeader';
import { KanbanDepartmentFilter } from './KanbanDepartmentFilter';
import { KanbanColumn } from './KanbanColumn';
import { KanbanCard } from './KanbanCard';
import { CreateDirectiveModal } from './CreateDirectiveModal';

// Re-exports for backwards compatibility
export * from './types';
export * from './constants';
export * from './styles';
export * from './useKanbanTasks';
export * from './KanbanHeader';
export * from './KanbanDepartmentFilter';
export * from './KanbanColumn';
export * from './KanbanCard';
export * from './CreateDirectiveModal';

export const DepartmentTaskKanban: FC = () => {
  const {
    tasks,
    filteredTasks,
    selectedDeptFilter,
    setSelectedDeptFilter,
    isCreateModalOpen,
    setIsCreateModalOpen,
    newTaskTitle,
    setNewTaskTitle,
    newTaskDept,
    setNewTaskDept,
    newTaskAssignee,
    setNewTaskAssignee,
    newTaskPriority,
    setNewTaskPriority,
    newTaskSla,
    setNewTaskSla,
    moveTask,
    handleCreateTask,
  } = useKanbanTasks(INITIAL_TASKS);

  return (
    <div style={kanbanStyles.container} data-testid="department-task-kanban">
      <KanbanHeader onOpenCreateModal={() => setIsCreateModalOpen(true)} />

      {/* 12-Department Filter Pills */}
      <KanbanDepartmentFilter
        selectedDept={selectedDeptFilter}
        totalTaskCount={tasks.length}
        onSelectDept={setSelectedDeptFilter}
      />

      {/* Kanban Columns */}
      <div style={kanbanStyles.columnsGrid}>
        {KANBAN_STAGES.map((stage: KanbanStageConfig) => {
          const stageTasks = filteredTasks.filter((t: KanbanTask) => t.stage === stage.id);
          return (
            <KanbanColumn key={stage.id} stage={stage} tasks={stageTasks} onMoveTask={moveTask} />
          );
        })}
      </div>

      {/* Create Executive Directive Modal */}
      <CreateDirectiveModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateTask}
        title={newTaskTitle}
        onTitleChange={setNewTaskTitle}
        department={newTaskDept}
        onDepartmentChange={setNewTaskDept}
        assignee={newTaskAssignee}
        onAssigneeChange={setNewTaskAssignee}
        priority={newTaskPriority}
        onPriorityChange={setNewTaskPriority}
        slaMinutes={newTaskSla}
        onSlaMinutesChange={setNewTaskSla}
      />
    </div>
  );
};

export default DepartmentTaskKanban;
