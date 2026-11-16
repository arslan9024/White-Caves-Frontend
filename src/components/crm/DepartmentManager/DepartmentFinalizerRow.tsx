import React from 'react';
import { Check, ArrowUp, ArrowDown, Edit2, Trash2, Plus } from 'lucide-react';
import type { DepartmentNodeItem } from './DepartmentManager.types';
import type { DepartmentSlotDef } from './DepartmentManager.data';
import { inputStyle, iconBtnStyle } from './DepartmentFinalizerTable.styles';

export interface FinalizerRowProps {
  slot: DepartmentSlotDef;
  idx: number;
  slots: DepartmentSlotDef[];
  draft: { title: string; code: string; directorName: string } | null;
  isReadOnly: boolean;
  onDraftChange: (deptId: string, field: 'title' | 'code' | 'directorName', value: string) => void;
  onSaveRow: (deptId: string) => void;
  onMoveDepartment: (fromIdx: number, toIdx: number) => void;
  onOpenEdit: (dept: DepartmentNodeItem) => void;
  onOpenCreateForSlot: () => void;
  onDelete: (deptId: string) => void;
  getDuplicateWarning: (deptId: string, title: string) => string | null;
}

export const FinalizerRow: React.FC<FinalizerRowProps> = ({
  slot,
  idx,
  slots,
  draft,
  isReadOnly,
  onDraftChange,
  onSaveRow,
  onMoveDepartment,
  onOpenEdit,
  onOpenCreateForSlot,
  onDelete,
  getDuplicateWarning,
}) => {
  const dept = slot.dept;

  return (
    <tr
      key={slot.fixedCode}
      data-testid={`finalizer-row-${slot.slotNumber}`}
      style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}
    >
      <td style={{ padding: '10px 8px' }}>
        <span
          style={{
            fontFamily: 'monospace',
            fontWeight: 800,
            fontSize: '0.72rem',
            color: dept?.color || '#EF4444',
            background: 'rgba(239, 68, 68, 0.1)',
            padding: '2px 7px',
            borderRadius: '5px',
          }}
        >
          #{String(slot.slotNumber).padStart(2, '0')}
        </span>
      </td>

      <td style={{ padding: '10px 8px' }}>
        {dept ? (
          <input
            type="text"
            disabled={isReadOnly}
            value={draft?.code ?? dept.code}
            onChange={e => onDraftChange(dept._id, 'code', e.target.value)}
            data-testid={`finalizer-code-input-${slot.slotNumber}`}
            style={{ ...inputStyle, width: '100px', color: '#F87171', fontFamily: 'monospace' }}
          />
        ) : (
          <span style={{ color: '#64748B', fontFamily: 'monospace' }}>{slot.fixedCode}</span>
        )}
      </td>

      <td style={{ padding: '10px 8px' }}>
        {dept ? (
          <div>
            <input
              type="text"
              disabled={isReadOnly}
              value={draft?.title ?? dept.title}
              onChange={e => onDraftChange(dept._id, 'title', e.target.value)}
              onKeyDown={e => e.key === 'Enter' && onSaveRow(dept._id)}
              placeholder="Enter finalized department name..."
              data-testid={`finalizer-title-input-${slot.slotNumber}`}
              style={inputStyle}
            />
            {draft?.title && getDuplicateWarning(dept._id, draft.title) && (
              <span style={{ fontSize: '0.68rem', color: '#F59E0B', fontWeight: 700 }}>
                {getDuplicateWarning(dept._id, draft.title)}
              </span>
            )}
          </div>
        ) : (
          <span style={{ color: '#64748B', fontStyle: 'italic' }}>
            Empty Department Slot #{slot.slotNumber}
          </span>
        )}
      </td>

      <td style={{ padding: '10px 8px' }}>
        {dept ? (
          <input
            type="text"
            disabled={isReadOnly}
            value={draft?.directorName ?? dept.directorOrManagerId?.fullName ?? 'Managing Director'}
            onChange={e => onDraftChange(dept._id, 'directorName', e.target.value)}
            onKeyDown={e => e.key === 'Enter' && onSaveRow(dept._id)}
            data-testid={`finalizer-director-input-${slot.slotNumber}`}
            style={{ ...inputStyle, fontWeight: 500, fontSize: '0.76rem' }}
          />
        ) : (
          <span style={{ color: '#475569' }}>Unassigned</span>
        )}
      </td>

      <td style={{ padding: '10px 8px', textAlign: 'right' }}>
        {dept ? (
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
            <button
              type="button"
              onClick={() => onSaveRow(dept._id)}
              title="Save this department name"
              data-testid={`finalizer-save-row-${slot.slotNumber}`}
              style={{
                ...iconBtnStyle,
                background: 'rgba(16, 185, 129, 0.15)',
                borderColor: '#10B981',
                color: '#10B981',
              }}
            >
              <Check size={13} />
            </button>
            <button
              type="button"
              disabled={idx === 0}
              onClick={() => onMoveDepartment(idx, idx - 1)}
              title="Move Slot Up"
              style={iconBtnStyle}
            >
              <ArrowUp size={12} />
            </button>
            <button
              type="button"
              disabled={idx === 11 || !slots[idx + 1]?.dept}
              onClick={() => onMoveDepartment(idx, idx + 1)}
              title="Move Slot Down"
              style={iconBtnStyle}
            >
              <ArrowDown size={12} />
            </button>
            <button
              type="button"
              onClick={() => onOpenEdit(dept)}
              title="Open Full Details Drawer"
              style={iconBtnStyle}
            >
              <Edit2 size={12} />
            </button>
            <button
              type="button"
              onClick={() => onDelete(dept._id)}
              title="Clear Slot / Demote to Pool"
              style={{ ...iconBtnStyle, color: '#EF4444' }}
            >
              <Trash2 size={12} />
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={onOpenCreateForSlot}
            data-testid={`finalizer-assign-slot-${slot.slotNumber}`}
            style={{ ...iconBtnStyle, color: '#F87171', borderColor: '#EF4444', gap: '4px' }}
          >
            <Plus size={12} />
            <span>Assign Slot</span>
          </button>
        )}
      </td>
    </tr>
  );
};

