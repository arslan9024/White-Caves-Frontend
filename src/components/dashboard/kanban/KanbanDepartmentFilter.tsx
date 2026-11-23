/**
 * KanbanDepartmentFilter.tsx
 *
 * Horizontal scrollable filter pills for 12 corporate departments.
 */

import React, { FC } from 'react';
import { ALL_DEPARTMENTS } from './constants';
import { kanbanStyles } from './styles';

export interface KanbanDepartmentFilterProps {
  selectedDept: string;
  totalTaskCount: number;
  onSelectDept: (dept: string) => void;
}

export const KanbanDepartmentFilter: FC<KanbanDepartmentFilterProps> = ({
  selectedDept,
  totalTaskCount,
  onSelectDept,
}) => {
  return (
    <div style={kanbanStyles.filtersScroll}>
      {ALL_DEPARTMENTS.map(dept => {
        const isSelected = selectedDept === dept;
        const label = dept === 'all' ? `All Departments (${totalTaskCount})` : dept;

        return (
          <button
            key={dept}
            type="button"
            onClick={() => onSelectDept(dept)}
            style={kanbanStyles.filterPill(isSelected)}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
};

export default KanbanDepartmentFilter;
