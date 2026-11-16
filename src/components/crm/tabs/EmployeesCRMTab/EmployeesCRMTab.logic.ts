import { useState, useMemo } from 'react';
import { EMPLOYEES } from './EmployeesCRMTab.data';
import { Employee } from './EmployeesCRMTab.types';

export function useEmployeesCRMTab() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDept, setSelectedDept] = useState('All');
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);

  const filteredEmployees = useMemo(() => {
    return EMPLOYEES.filter(emp => {
      const matchesSearch =
        emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        emp.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        emp.role.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesDept = selectedDept === 'All' || emp.department === selectedDept;
      return matchesSearch && matchesDept;
    });
  }, [searchQuery, selectedDept]);

  const getTierBadgeClass = (tier: string) => `tier-badge ${tier}`;

  return {
    searchQuery,
    setSearchQuery,
    selectedDept,
    setSelectedDept,
    selectedEmployee,
    setSelectedEmployee,
    filteredEmployees,
    getTierBadgeClass,
  };
}

