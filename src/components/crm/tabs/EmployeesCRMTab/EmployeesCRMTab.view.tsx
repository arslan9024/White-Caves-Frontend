import React from 'react';
import { useEmployeesCRMTab } from './EmployeesCRMTab.logic';
import { EMPLOYEES } from './EmployeesCRMTab.data';
import {
  EmployeesCRMHeader,
  EmployeesCRMStatsDeck,
  EmployeesCRMSearchBar,
  EmployeesCRMTable,
  EmployeesCRMFooter,
} from './EmployeesCRMTab.panels';

export const EmployeesCRMTabView: React.FC = () => {
  const {
    searchQuery,
    setSearchQuery,
    selectedDept,
    setSelectedDept,
    filteredEmployees,
    getTierBadgeClass,
  } = useEmployeesCRMTab();

  return (
    <div>
      <EmployeesCRMHeader />
      <EmployeesCRMStatsDeck />
      <EmployeesCRMSearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedDept={selectedDept}
        setSelectedDept={setSelectedDept}
      />
      <EmployeesCRMTable
        employees={filteredEmployees}
        getTierBadgeClass={getTierBadgeClass}
      />
      <EmployeesCRMFooter
        shownCount={filteredEmployees.length}
        totalCount={EMPLOYEES.length}
      />
    </div>
  );
};

