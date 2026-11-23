/**
 * useOrganogramRegistry.ts
 *
 * Custom hook to resolve and merge locked database department names into canonical registry.
 */

import { useMemo } from 'react';
import {
  CORPORATE_DEPARTMENTS_12,
  SUPERVISORS_108,
} from '../../../data/assistants108Registry.data';
import { useCorporateDepartments } from '../../../context/CorporateDepartmentsContext';
import { DepartmentRegistryItem } from './types';

export const useOrganogramRegistry = (): DepartmentRegistryItem[] => {
  const { departments: dbDepartments } = useCorporateDepartments();

  return useMemo(() => {
    return CORPORATE_DEPARTMENTS_12.map((dept, idx) => {
      // Find matching confirmed department from DB/context by slug or slot order
      const matchedDbDept = dbDepartments.find(
        d => d.slug === dept.id || d._id === `canonical-${dept.id}` || d.order === idx + 1
      );

      const resolvedName = matchedDbDept?.title || dept.name;
      const resolvedCode = matchedDbDept?.code || dept.code;
      const resolvedColor = matchedDbDept?.color || dept.color;

      return {
        ...dept,
        name: resolvedName,
        code: resolvedCode,
        color: resolvedColor,
        manager: matchedDbDept?.directorOrManagerId?.fullName || 'Human Director',
        aiLead: dept.managerAi.name,
        supervisors: SUPERVISORS_108.filter(s => s.departmentId === dept.id),
      };
    });
  }, [dbDepartments]);
};
