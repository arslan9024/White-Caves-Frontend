/**
 * Logic.logic.ts — AICC-Sanctum State, CRUD, Drag-and-Drop Swap & Governance Guards
 * Standing Rules: 12 Locked Departments • Zoe's Team isolated from Aegis • All female except Henry (SUP-11-1-01-1).
 */

import { useState, useCallback, useMemo } from 'react';
import { apiClient } from '../../../utils/apiClient';
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

const STORAGE_KEY = 'wc_aicc_sanctum_departments_v2';
const AEGIS_FORBIDDEN = new Set([
  'aegis',
  'ada',
  'nova',
  'orion',
  'gwynne',
  'grace',
  'turing',
  'sterling',
]);

function loadInitialDepartments(): DepartmentNode[] {
  if (typeof window === 'undefined') return SANCTUM_DEPARTMENTS_DATA;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as DepartmentNode[];
      if (Array.isArray(parsed) && parsed.length === 12) return parsed;
    }
  } catch {}
  return SANCTUM_DEPARTMENTS_DATA;
}

function persistDepartments(depts: DepartmentNode[]) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(depts));
  } catch {}
}

export function useAiccSanctumLogic() {
  const [departments, setDepartments] = useState<DepartmentNode[]>(loadInitialDepartments);
  const [selectedDeptCode, setSelectedDeptCode] = useState<string>('DEPT-08');
  const [standbyRoster, setStandbyRoster] = useState<AgentCard[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [draggedAgentId, setDraggedAgentId] = useState<string | null>(null);
  const [governanceNotice, setGovernanceNotice] = useState<string>('');
  const [liveDelegations] = useState<LiveDelegationEvent[]>([
    {
      id: 'del-01',
      taskId: 'TASK-DH2-RENT-801',
      targetAgent: 'AI Linda Supervisor (SUP-08-1-01-1)',
      role: 'Supervisor — WhatsApp Real Estate Automation & 10-SIM Fleet',
      chain: ['zoe', 'maya', 'nadia-whatsapp-mgr', 'amgr-08-1-01', 'linda'],
      status: 'COMPLETED',
      startedAt: 'Just now',
    },
    {
      id: 'del-02',
      taskId: 'TASK-VAULT-EID-104',
      targetAgent: 'AI Henry Supervisor (SUP-11-1-01-1)',
      role: 'Supervisor — Chief Document Controller & The Record Keeper',
      chain: ['zoe', 'sofia', 'mireille-records-mgr', 'amgr-11-1-01', 'henry'],
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

  const commitDepartments = useCallback((updater: (prev: DepartmentNode[]) => DepartmentNode[]) => {
    setDepartments(prev => {
      const next = updater(prev);
      persistDepartments(next);
      return next;
    });
  }, []);

  const swapManagerSlots = useCallback(
    (deptCode: string, slotA: number, slotB: number) => {
      commitDepartments(prev =>
        prev.map(dept => {
          if (dept.deptCode !== deptCode) return dept;
          const mgrs = [...dept.managers];
          const idxA = mgrs.findIndex(m => m.slot === slotA);
          const idxB = mgrs.findIndex(m => m.slot === slotB);
          if (idxA === -1 || idxB === -1) return dept;
          const tmp = mgrs[idxA].slot;
          mgrs[idxA] = { ...mgrs[idxA], slot: mgrs[idxB].slot };
          mgrs[idxB] = { ...mgrs[idxB], slot: tmp };
          return { ...dept, managers: mgrs.sort((a, b) => (a.slot || 0) - (b.slot || 0)) };
        })
      );
    },
    [commitDepartments]
  );

  const swapManagersById = useCallback(
    (sourceId: string, targetId: string) => {
      if (!sourceId || !targetId || sourceId === targetId) return;
      commitDepartments(prev => {
        const next = prev.map(d => ({ ...d, managers: [...d.managers] }));
        const srcDept = next.find(d => d.managers.some(m => m.id === sourceId));
        const tgtDept = next.find(d => d.managers.some(m => m.id === targetId));
        if (!srcDept || !tgtDept) return prev;
        const srcIdx = srcDept.managers.findIndex(m => m.id === sourceId);
        const tgtIdx = tgtDept.managers.findIndex(m => m.id === targetId);
        const srcMgr = { ...srcDept.managers[srcIdx] };
        const tgtMgr = { ...tgtDept.managers[tgtIdx] };

        if (srcDept.deptCode === tgtDept.deptCode) {
          const tmp = srcMgr.slot;
          srcMgr.slot = tgtMgr.slot;
          tgtMgr.slot = tmp;
          srcDept.managers[srcIdx] = srcMgr;
          srcDept.managers[tgtIdx] = tgtMgr;
          srcDept.managers.sort((a, b) => (a.slot || 0) - (b.slot || 0));
        } else {
          const srcSlot = srcMgr.slot;
          srcMgr.departmentCode = tgtDept.deptCode;
          srcMgr.slot = tgtMgr.slot;
          tgtMgr.departmentCode = srcDept.deptCode;
          tgtMgr.slot = srcSlot;
          srcDept.managers[srcIdx] = tgtMgr;
          tgtDept.managers[tgtIdx] = srcMgr;
        }
        return next;
      });
      void apiClient
        .post('/sanctum/managers/swap', { sourceAgentId: sourceId, targetAgentId: targetId })
        .catch(() => {});
    },
    [commitDepartments]
  );

  const transferManagerToDepartment = useCallback(
    (sourceId: string, targetDeptCode: string) => {
      if (!sourceId || !targetDeptCode) return;
      commitDepartments(prev => {
        const next = prev.map(d => ({ ...d, managers: [...d.managers] }));
        const srcDept = next.find(d => d.managers.some(m => m.id === sourceId));
        const tgtDept = next.find(d => d.deptCode === targetDeptCode);
        if (!srcDept || !tgtDept || srcDept.deptCode === tgtDept.deptCode) return prev;
        const idx = srcDept.managers.findIndex(m => m.id === sourceId);
        const [moved] = srcDept.managers.splice(idx, 1);
        tgtDept.managers.push({
          ...moved,
          departmentCode: tgtDept.deptCode,
          slot: tgtDept.managers.length + 1,
        });
        return next;
      });
      void apiClient
        .post('/sanctum/managers/swap', {
          sourceAgentId: sourceId,
          targetDepartmentCode: targetDeptCode,
        })
        .catch(() => {});
    },
    [commitDepartments]
  );

  const createManager = useCallback(
    (deptCode: string, name: string, roleTitle: string, capability: string) => {
      const tokens = name
        .toLowerCase()
        .replace(/[^a-z\s]/g, ' ')
        .split(/\s+/)
        .filter(Boolean);
      if (tokens.some(t => AEGIS_FORBIDDEN.has(t))) {
        setGovernanceNotice(
          "Blocked: Aegis Team engineering names cannot join Zoe's AICC-Sanctum."
        );
        return false;
      }
      setGovernanceNotice('');
      const cleanName = name.trim();
      const id = `${cleanName.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${Date.now().toString(36).slice(-4)}`;
      commitDepartments(prev =>
        prev.map(dept => {
          if (dept.deptCode !== deptCode) return dept;
          const slot = dept.managers.length + 1;
          const card: AgentCard = {
            id,
            code: `MGR-${deptCode.replace('DEPT-', '')}-${slot}`,
            name: cleanName,
            gender: 'Female',
            roleTitle: roleTitle.trim(),
            tier: 'MANAGER',
            departmentCode: deptCode,
            slot,
            allowedTools: ['sanctum_task'],
            capabilities: capability.trim()
              ? capability
                  .split(',')
                  .map(c => c.trim())
                  .filter(Boolean)
              : ['DH2 Operations'],
            slaResponseMinutes: 15,
            status: 'ACTIVE',
            kpis: { tasksCompleted: 0, accuracyPercent: 100, latencyMs: 180 },
          };
          return { ...dept, managers: [...dept.managers, card] };
        })
      );
      void apiClient
        .post('/sanctum/managers', {
          departmentCode: deptCode,
          name: cleanName,
          roleTitle: roleTitle.trim(),
          gender: 'Female',
        })
        .catch(() => {});
      return true;
    },
    [commitDepartments]
  );

  const demoteToStandby = useCallback(
    (agentId: string) => {
      if (agentId === 'henry' || agentId === 'mireille-records-mgr') {
        setGovernanceNotice(
          'Protected: AI Henry Supervisor (SUP-11-1-01-1) & his Records Division (MGR-11-1) cannot be removed.'
        );
        return;
      }
      setGovernanceNotice('');
      commitDepartments(prev => {
        let found: AgentCard | undefined;
        const updated = prev.map(dept => {
          const mgr = dept.managers.find(m => m.id === agentId);
          if (!mgr) return dept;
          found = mgr;
          return { ...dept, managers: dept.managers.filter(m => m.id !== agentId) };
        });
        if (found) {
          setStandbyRoster(curr => [
            ...curr,
            { ...found!, tier: 'STANDBY', status: 'STANDBY', slot: undefined },
          ]);
        }
        return updated;
      });
      void apiClient.delete(`/sanctum/managers/${encodeURIComponent(agentId)}`).catch(() => {});
    },
    [commitDepartments]
  );

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
    draggedAgentId,
    setDraggedAgentId,
    governanceNotice,
    swapManagerSlots,
    swapManagersById,
    transferManagerToDepartment,
    createManager,
    demoteToStandby,
  };
}
