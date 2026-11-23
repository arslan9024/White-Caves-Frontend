import React from 'react';
import { Search } from 'lucide-react';
import { DEPARTMENTS } from './constants';

interface AIAssistantsFiltersProps {
  selectedDept: string;
  onSelectDept: (dept: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  departmentList?: string[];
}

export const AIAssistantsFilters: React.FC<AIAssistantsFiltersProps> = ({
  selectedDept,
  onSelectDept,
  searchQuery,
  onSearchChange,
  departmentList = DEPARTMENTS,
}) => {
  return (
    <>
      <div className="crm-tabs" style={{ marginBottom: '24px' }}>
        {departmentList.slice(0, 8).map(dept => (
          <button
            key={dept}
            className={`crm-tab ${selectedDept === dept ? 'active' : ''}`}
            onClick={() => onSelectDept(dept)}
          >
            {dept}
          </button>
        ))}
      </div>

      <div className="crm-card" style={{ marginBottom: '16px' }}>
        <div className="crm-search" style={{ maxWidth: '100%' }}>
          <Search size={18} className="crm-search-icon" />
          <input
            type="text"
            className="crm-search-input"
            placeholder="Search assistants by name or role..."
            value={searchQuery}
            onChange={e => onSearchChange(e.target.value)}
          />
        </div>
      </div>
    </>
  );
};
