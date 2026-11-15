/**
 * TaskEditDrawer.tsx
 * 7-Category Architecture: View Layer (Sub-component)
 * Full CRUD Drawer form for creating or configuring statutory & operational tasks
 */

import React, { useState, useEffect, useMemo } from 'react';
import type { TaskNode, TaskPriority, TaskStatus } from './TaskManager.types';
import { TASK_PILLARS, TASK_CATEGORIES } from './TaskManager.data';
import { useDirtyStateGuard } from '../../../hooks/useDirtyStateGuard';
import { UnsavedChangesModal, TaskActionBar } from '../../common/UnsavedChangesModal';
import { TaskTriadAndChainFields } from './TaskTriadAndChainFields';

interface TaskEditDrawerProps {
  isOpen: boolean;
  task: TaskNode | null;
  onClose: () => void;
  onSave: (payload: any) => void;
}

export const TaskEditDrawer: React.FC<TaskEditDrawerProps> = ({
  isOpen,
  task,
  onClose,
  onSave,
}) => {
  const [formData, setFormData] = useState<Partial<TaskNode>>({});
  const [initialSnapshot, setInitialSnapshot] = useState<string>('');

  useEffect(() => {
    if (task) {
      const snap = { ...task };
      setFormData(snap);
      setInitialSnapshot(JSON.stringify(snap));
    } else {
      const defaultState: Partial<TaskNode> = {
        title: '',
        pillarId: 'pillar-1',
        pillarName: 'Pillar I: Legal & Regulatory',
        category: 'REGULATORY',
        statutoryAuthority: 'DLD / RERA',
        description: '',
        priority: 'HIGH' as TaskPriority,
        status: 'PENDING' as TaskStatus,
        defaultSla: '4 Hours',
        actor: 'Supervisor Amira (Statutory Compliance Officer)',
        action: 'Execute operational and statutory task workflow',
        results: 'Verified compliance artifact and updated ledger state',
        reportingChain: {
          supervisorName: 'Supervisor Amira',
          supervisorCode: 'SUP-01',
          managerName: 'Manager Farooq',
          managerCode: 'MGR-01',
          directorName: 'Adv. Tariq Mansoor',
          directorCode: 'DIR-01',
          executiveReviewer: 'Sophia Al-Hashemi (Managing Director)',
        },
      };
      setFormData(defaultState);
      setInitialSnapshot(JSON.stringify(defaultState));
    }
  }, [task, isOpen]);

  const isDirty = useMemo(() => {
    if (!isOpen) return false;
    return Boolean(initialSnapshot && JSON.stringify(formData) !== initialSnapshot);
  }, [isOpen, formData, initialSnapshot]);

  const { showPrompt, proceed, cancel, confirmExit } = useDirtyStateGuard({
    isDirty,
    onConfirmDiscard: onClose,
  });

  if (!isOpen) return null;

  const handleSaveData = (shouldClose: boolean) => {
    onSave(formData);
    if (shouldClose) {
      onClose();
    }
  };

  const handleChange = (field: keyof TaskNode, value: any) => {
    setFormData(prev => {
      const updated = { ...prev, [field]: value };
      if (field === 'pillarId') {
        const found = TASK_PILLARS.find(p => p.id === value);
        if (found) {
          updated.pillarName = found.name;
        }
      }
      return updated;
    });
  };

  const handleChainChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      reportingChain: {
        ...(prev.reportingChain || {}),
        [field]: value,
      },
    }));
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-hidden bg-slate-950/70 backdrop-blur-sm flex justify-end"
      data-testid="task-edit-drawer-overlay"
    >
      <div
        className="w-full max-w-xl bg-slate-900 border-l border-slate-800 h-full flex flex-col p-6 shadow-2xl relative animate-in slide-in-from-right duration-200"
        data-testid="task-edit-drawer"
      >
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              {task ? `Configure: ${task.taskCode}` : 'New Operational Task'}
            </span>
            <h2 className="text-lg font-bold text-white mt-1">
              {task ? task.title : 'Register New Dubai Statutory Task'}
            </h2>
          </div>
          <button
            onClick={() => confirmExit(onClose)}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            data-testid="close-drawer-btn"
          >
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-4 space-y-4 pr-1">
          <form className="space-y-4" onSubmit={e => e.preventDefault()}>
            <div>
              <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                Task Title / Statutory Reference
              </label>
              <input
                type="text"
                value={formData.title || ''}
                onChange={e => handleChange('title', e.target.value)}
                placeholder="e.g. Title Deed Verification & Seller Clearances"
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
                data-testid="task-title-input"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                  Operational Pillar
                </label>
                <select
                  value={formData.pillarId || 'pillar-1'}
                  onChange={e => handleChange('pillarId', e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
                >
                  {TASK_PILLARS.filter(p => p.id !== 'all').map(p => (
                    <option key={p.id} value={p.id}>
                      {p.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                  Category
                </label>
                <select
                  value={formData.category || 'REGULATORY'}
                  onChange={e => handleChange('category', e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
                >
                  {TASK_CATEGORIES.filter(c => c.id !== 'all').map(c => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                  Statutory Authority
                </label>
                <input
                  type="text"
                  value={formData.statutoryAuthority || ''}
                  onChange={e => handleChange('statutoryAuthority', e.target.value)}
                  placeholder="e.g. DLD, RERA, FTA, DET"
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                  Target SLA Benchmark
                </label>
                <input
                  type="text"
                  value={formData.defaultSla || '24 Hours'}
                  onChange={e => handleChange('defaultSla', e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-emerald-500 font-mono"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                  Priority
                </label>
                <select
                  value={formData.priority || 'HIGH'}
                  onChange={e => handleChange('priority', e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
                >
                  <option value="CRITICAL">Critical (Immediate SLA)</option>
                  <option value="HIGH">High Priority</option>
                  <option value="MEDIUM">Medium Priority</option>
                  <option value="STANDARD">Standard Operational</option>
                </select>
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                  Status
                </label>
                <select
                  value={formData.status || 'PENDING'}
                  onChange={e => handleChange('status', e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
                >
                  <option value="PENDING">Pending (Backlog)</option>
                  <option value="IN_PROGRESS">In Progress</option>
                  <option value="REVIEW">Under Review</option>
                  <option value="COMPLETED">Completed</option>
                  <option value="BLOCKED">Blocked (Escalated)</option>
                </select>
              </div>
            </div>

            <TaskTriadAndChainFields
              formData={formData}
              onChange={handleChange}
              onChainChange={handleChainChange}
            />
          </form>
        </div>

        <div className="pt-4 border-t border-slate-800">
          <TaskActionBar
            isDirty={isDirty}
            onSave={() => handleSaveData(false)}
            onSaveAndClose={() => handleSaveData(true)}
            onCancel={() => confirmExit(onClose)}
            saveLabel={task ? 'Save Task' : 'Register Task'}
            saveAndCloseLabel="Save & Close"
            saveTestId="save-task-btn"
          />
        </div>
      </div>

      <UnsavedChangesModal
        isOpen={showPrompt}
        onProceed={proceed}
        onCancel={cancel}
      />
    </div>
  );
};
