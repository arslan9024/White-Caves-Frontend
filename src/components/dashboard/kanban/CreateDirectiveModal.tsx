/**
 * CreateDirectiveModal.tsx
 *
 * Executive modal for creating new department directives.
 */

import React, { FC } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { KanbanTask } from './types';
import { ALL_DEPARTMENTS } from './constants';
import { kanbanStyles } from './styles';

export interface CreateDirectiveModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
  title: string;
  onTitleChange: (val: string) => void;
  department: string;
  onDepartmentChange: (val: string) => void;
  assignee: string;
  onAssigneeChange: (val: string) => void;
  priority: KanbanTask['priority'];
  onPriorityChange: (val: KanbanTask['priority']) => void;
  slaMinutes: number;
  onSlaMinutesChange: (val: number) => void;
}

export const CreateDirectiveModal: FC<CreateDirectiveModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  onTitleChange,
  department,
  onDepartmentChange,
  assignee,
  onAssigneeChange,
  priority,
  onPriorityChange,
  slaMinutes,
  onSlaMinutesChange,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div style={kanbanStyles.modalOverlay}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            style={kanbanStyles.modalContent}
          >
            {/* Header */}
            <div style={kanbanStyles.modalHeader}>
              <div>
                <span
                  style={{
                    background: '#EF4444',
                    color: '#FFFFFF',
                    fontSize: '0.68rem',
                    fontWeight: 900,
                    padding: '2px 6px',
                    borderRadius: '4px',
                    textTransform: 'uppercase',
                  }}
                >
                  Level 7 Executive Suite
                </span>
                <h3 style={{ margin: '4px 0 0 0', fontSize: '1.1rem', fontWeight: 800 }}>
                  👑 Create Department Executive Directive
                </h3>
              </div>
              <button
                type="button"
                onClick={onClose}
                style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: 'none',
                  color: '#FFFFFF',
                  borderRadius: '50%',
                  width: '32px',
                  height: '32px',
                  cursor: 'pointer',
                }}
              >
                ✕
              </button>
            </div>

            {/* Form */}
            <form
              onSubmit={onSubmit}
              style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '12px' }}
            >
              <div>
                <label
                  style={{
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    color: '#475569',
                    display: 'block',
                    marginBottom: '4px',
                  }}
                >
                  Task / Directive Title
                </label>
                <input
                  required
                  type="text"
                  value={title}
                  onChange={e => onTitleChange(e.target.value)}
                  placeholder="e.g., DAMAC Hills 2 Title Deed Registration & PDC Vault Audit"
                  style={{
                    ...kanbanStyles.formInput,
                    padding: '10px',
                  }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label
                    style={{
                      fontSize: '0.78rem',
                      fontWeight: 700,
                      color: '#475569',
                      display: 'block',
                      marginBottom: '4px',
                    }}
                  >
                    Corporate Department
                  </label>
                  <select
                    value={department}
                    onChange={e => onDepartmentChange(e.target.value)}
                    style={kanbanStyles.formInput}
                  >
                    {ALL_DEPARTMENTS.filter(d => d !== 'all').map(d => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    style={{
                      fontSize: '0.78rem',
                      fontWeight: 700,
                      color: '#475569',
                      display: 'block',
                      marginBottom: '4px',
                    }}
                  >
                    Assignee Lead / Supervisor
                  </label>
                  <input
                    required
                    type="text"
                    value={assignee}
                    onChange={e => onAssigneeChange(e.target.value)}
                    placeholder="e.g., AI Victoria (Lead)"
                    style={kanbanStyles.formInput}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label
                    style={{
                      fontSize: '0.78rem',
                      fontWeight: 700,
                      color: '#475569',
                      display: 'block',
                      marginBottom: '4px',
                    }}
                  >
                    Priority Level
                  </label>
                  <select
                    value={priority}
                    onChange={e => onPriorityChange(e.target.value as KanbanTask['priority'])}
                    style={kanbanStyles.formInput}
                  >
                    <option value="CRITICAL">🔴 CRITICAL (Immediate)</option>
                    <option value="HIGH">🟠 HIGH</option>
                    <option value="MEDIUM">🔵 MEDIUM</option>
                  </select>
                </div>

                <div>
                  <label
                    style={{
                      fontSize: '0.78rem',
                      fontWeight: 700,
                      color: '#475569',
                      display: 'block',
                      marginBottom: '4px',
                    }}
                  >
                    Max SLA (Minutes)
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={60}
                    value={slaMinutes}
                    onChange={e => onSlaMinutesChange(Number(e.target.value))}
                    style={kanbanStyles.formInput}
                  />
                </div>
              </div>

              <button type="submit" style={kanbanStyles.submitButton}>
                🚀 Dispatch to Department Backlog
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CreateDirectiveModal;
