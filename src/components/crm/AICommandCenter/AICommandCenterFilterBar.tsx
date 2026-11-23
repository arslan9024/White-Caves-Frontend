import React, { FC } from 'react';
import { Search } from 'lucide-react';
import { COMMAND_CENTER_TEXT } from '../data/AICommandCenter.data';
import type { DepartmentDef } from '../../../../data/assistants108Registry.data';
import {
  FilterBar,
  SearchInputWrapper,
  DepartmentPills,
  DeptPill,
} from '../styles/AICommandCenter.style';

export interface AICommandCenterFilterBarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedDept: string;
  setSelectedDept: (dept: string) => void;
  departments: DepartmentDef[];
}

export const AICommandCenterFilterBar: FC<AICommandCenterFilterBarProps> = ({
  searchTerm,
  setSearchTerm,
  selectedDept,
  setSelectedDept,
  departments,
}) => {
  return (
    <FilterBar>
      <SearchInputWrapper>
        <Search size={18} className="search-icon" aria-hidden="true" />
        <input
          type="text"
          aria-label="Search AI assistants, departments, or capabilities"
          placeholder={COMMAND_CENTER_TEXT.filters.searchPlaceholder}
          value={searchTerm}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
          data-testid="ai-search-input"
        />
      </SearchInputWrapper>

      <DepartmentPills role="group" aria-label="Filter by corporate department">
        <DeptPill
          type="button"
          $active={selectedDept === 'all'}
          aria-pressed={selectedDept === 'all'}
          onClick={() => setSelectedDept('all')}
          data-testid="dept-pill-all"
        >
          {COMMAND_CENTER_TEXT.filters.allDepartments} (108 Supervisors)
        </DeptPill>
        {departments.map((dept: DepartmentDef) => (
          <DeptPill
            type="button"
            key={dept.id}
            $active={selectedDept === dept.id}
            aria-pressed={selectedDept === dept.id}
            onClick={() => setSelectedDept(dept.id)}
            data-testid={`dept-pill-${dept.id}`}
          >
            {dept.name} ({dept.managerAi.name})
          </DeptPill>
        ))}
      </DepartmentPills>
    </FilterBar>
  );
};

export default AICommandCenterFilterBar;
