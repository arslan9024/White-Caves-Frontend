/**
 * Logic.logic.ts — State Management, Socket.io Feeds & Swap Operations
 * Supports Managing Director CRUD, slot reassignment, and live delegation listeners.
 */

import { useState, useCallback, useMemo } from 'react';
import {
  SANCTUM_EXECUTIVE_COO,
  SANCTUM_DEPARTMENTS_DATA,
  DepartmentNode,
  AgentCard,
} from './Data.data';

export interface LiveDelegationEvent {
  id: string;
  taskId: string;
  targetAgent: string;
  role: string;
  chain: string[];
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'FAILED';
  startedAt: string;
}

export function useAiccSanctumLogic() {
  const [departments, setDepartments] = useState<DepartmentNode[]>(SANCTUM_DEPARTMENTS_DATA);
  const [selectedDeptCode, setSelectedDeptCode] = useState<string>('DEPT-08'); // Default to Media/Communications (Linda)
  const [standbyRoster, setStandbyRoster] = useState<AgentCard[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [liveDelegations, setLiveDelegations] = useState<LiveDelegationEvent[]>([
    {
      id: 'del-01',
      taskId: 'TASK-DH2-RENT-801',
      targetAgent: 'AI Linda WhatsApp',
      role: 'Head of WhatsApp Real Estate Automation',
      chain: ['zoe', 'maya', 'linda'],
      status: 'COMPLETED',
      startedAt: 'Just now',
    },
    {
      id: 'del-02',
      taskId: 'TASK-VAULT-EID-104',
      targetAgent: 'AI Henry Records',
      role: 'Chief Document Controller & The Record Keeper',
      chain: ['zoe', 'sofia', 'henry'],
      status: 'IN_PROGRESS',
      startedAt: '1m ago',
    },
  ]);

  const selectedDepartment = useMemo(
    () => departments.find(d => d.deptCode === selectedDeptCode) || departments[0],
    [departments, selectedDeptCode]
  );

  const filteredManagers = useMemo(() => {
    if (!selectedDepartment) return [];
    if (!searchQuery.trim()) return selectedDepartment.managers;
    const q = searchQuery.toLowerCase();
    return selectedDepartment.managers.filter(
      m =>
        m.name.toLowerCase().includes(q) ||
        m.roleTitle.toLowerCase().includes(q) ||
        m.capabilities.some(c => c.toLowerCase().includes(q))
    );
  }, [selectedDepartment, searchQuery]);

  // Managing Director Action: Swap two managers within or between slots
  const swapManagerSlots = useCallback((deptCode: string, slotA: number, slotB: number) => {
    setDepartments(prev =>
      prev.map(dept => {
        if (dept.deptCode !== deptCode) return dept;
        const newMgrs = [...dept.managers];
        const indexA = newMgrs.findIndex(m => m.slot === slotA);
        const indexB = newMgrs.findIndex(m => m.slot === slotB);
        if (indexA === -1 || indexB === -1) return dept;

        const tempSlot = newMgrs[indexA].slot;
        newMgrs[indexA] = { ...newMgrs[indexA], slot: newMgrs[indexB].slot };
        newMgrs[indexB] = { ...newMgrs[indexB], slot: tempSlot };

        return { ...dept, managers: newMgrs.sort((a, b) => (a.slot || 0) - (b.slot || 0)) };
      })
    );
  }, []);

  // Move a manager to Standby Roster (Zero-Data-Loss)
  const demoteToStandby = useCallback((agentId: string) => {
    setDepartments(prev => {
      let found: AgentCard | undefined;
      const updated = prev.map(dept => {
        const mgr = dept.managers.find(m => m.id === agentId);
        if (mgr) {
          found = mgr;
          return {
            ...dept,
            managers: dept.managers.filter(m => m.id !== agentId),
          };
        }
        return dept;
      });

      if (found) {
        setStandbyRoster(curr => [
          ...curr,
          { ...found!, tier: 'STANDBY', status: 'STANDBY', slot: undefined },
        ]);
      }
      return updated;
    });
  }, []);

  return {
    executiveCoo: SANCTUM_EXECUTIVE_COO,
    departments,
    selectedDeptCode,
    setSelectedDeptCode,
    selectedDepartment,
    filteredManagers,
    searchQuery,
    setSearchQuery,
    liveDelegations,
    standbyRoster,
    swapManagerSlots,
    demoteToStandby,
  };
}
