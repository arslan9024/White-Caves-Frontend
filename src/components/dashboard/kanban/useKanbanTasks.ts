/**
 * useKanbanTasks.ts
 *
 * Hook managing Kanban task state, filtering, stages, and creation.
 */

import { useState } from 'react';
import { KanbanTask } from './types';
import { INITIAL_TASKS } from './constants';

export interface UseKanbanTasksReturn {
  tasks: KanbanTask[];
  filteredTasks: KanbanTask[];
  selectedDeptFilter: string;
  setSelectedDeptFilter: (dept: string) => void;
  isCreateModalOpen: boolean;
  setIsCreateModalOpen: (open: boolean) => void;
  newTaskTitle: string;
  setNewTaskTitle: (val: string) => void;
  newTaskDept: string;
  setNewTaskDept: (val: string) => void;
  newTaskAssignee: string;
  setNewTaskAssignee: (val: string) => void;
  newTaskPriority: KanbanTask['priority'];
  setNewTaskPriority: (val: KanbanTask['priority']) => void;
  newTaskSla: number;
  setNewTaskSla: (val: number) => void;
  moveTask: (taskId: string, targetStage: KanbanTask['stage']) => void;
  handleCreateTask: (e: React.FormEvent) => void;
}

export function useKanbanTasks(initialTasks: KanbanTask[] = INITIAL_TASKS): UseKanbanTasksReturn {
  const [tasks, setTasks] = useState<KanbanTask[]>(initialTasks);
  const [selectedDeptFilter, setSelectedDeptFilter] = useState<string>('all');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDept, setNewTaskDept] = useState('Legal & AML');
  const [newTaskAssignee, setNewTaskAssignee] = useState('AI Sofia');
  const [newTaskPriority, setNewTaskPriority] = useState<KanbanTask['priority']>('HIGH');
  const [newTaskSla, setNewTaskSla] = useState<number>(10);

  const moveTask = (taskId: string, targetStage: KanbanTask['stage']) => {
    setTasks(prev => prev.map(t => (t.id === taskId ? { ...t, stage: targetStage } : t)));
  };

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    const newTask: KanbanTask = {
      id: `TSK-${Math.floor(100 + Math.random() * 900)}`,
      title: newTaskTitle.trim(),
      department: newTaskDept,
      assignee: newTaskAssignee,
      priority: newTaskPriority,
      stage: 'backlog',
      slaMinutes: newTaskSla,
    };

    setTasks(prev => [newTask, ...prev]);
    setNewTaskTitle('');
    setIsCreateModalOpen(false);
  };

  const filteredTasks =
    selectedDeptFilter === 'all' ? tasks : tasks.filter(t => t.department === selectedDeptFilter);

  return {
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
  };
}
