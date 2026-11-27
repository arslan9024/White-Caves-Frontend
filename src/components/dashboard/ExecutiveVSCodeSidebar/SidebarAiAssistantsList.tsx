// FILE: src/components/dashboard/ExecutiveVSCodeSidebar/SidebarAiAssistantsList.tsx
/**
 * SidebarAiAssistantsList.tsx
 * White Caves Real Estate LLC — AICC-Sanctum & AIAMS Left Sidebar Drawer
 * 8-Tier Authority Chain: Arslan Malik (MD) -> Zoe -> Dir (DIR-XX) -> Mgr (MGR-XX-Y)
 * -> 12 Assistant Managers -> 108 Supervisors (Diana, Daisy, Mary, Linda, Henry)
 * + DMS Draggable Open Human Job Positions (< 350 lines)
 */

import React, { FC, useState, useEffect } from 'react';
import { Plus, ArrowRight, GripVertical, Briefcase } from 'lucide-react';
import {
  loadAiAgentsFromStorage,
  saveAiAgentsToStorage,
  AIAMS_SYNC_EVENT,
} from '../../crm/AiAssistantManager/AiAssistantManager.data';
import type { AiAgentRecord } from '../../crm/AiAssistantManager/AiAssistantManager.types';
import { SidebarListWrapper } from './SidebarDepartmentsList.styles';
import {
  isZoesBusinessTeamAgent,
  PORTAL_LINKS,
  OPERATIONAL_SUPERVISOR_SHORTCUTS,
} from './SidebarAiAssistantsList.data';

export interface SidebarAiAssistantsListProps {
  filterQuery?: string;
  selectedAgentId?: string | null;
  onSelectAgent?: (id: string, name: string) => void;
  onNavigateToView?: (route: string) => void;
}

export const SidebarAiAssistantsList: FC<SidebarAiAssistantsListProps> = ({
  filterQuery = '',
  selectedAgentId,
  onSelectAgent,
  onNavigateToView,
}) => {
  const [agents, setAgents] = useState<AiAgentRecord[]>(() =>
    loadAiAgentsFromStorage().filter(isZoesBusinessTeamAgent)
  );
  const [draggedId, setDraggedId] = useState<string | null>(null);
  const [dragOverId, setDragOverId] = useState<string | null>(null);

  useEffect(() => {
    const handleSync = (e: Event) => {
      const customEvent = e as CustomEvent<AiAgentRecord[]>;
      const source = Array.isArray(customEvent.detail)
        ? customEvent.detail
        : loadAiAgentsFromStorage();
      setAgents(source.filter(isZoesBusinessTeamAgent));
    };
    window.addEventListener(AIAMS_SYNC_EVENT, handleSync);
    return () => window.removeEventListener(AIAMS_SYNC_EVENT, handleSync);
  }, []);

  const handleSwapDrop = (sourceAgentId: string, targetAgentId: string) => {
    if (!sourceAgentId || !targetAgentId || sourceAgentId === targetAgentId) return;
    setAgents(prev => {
      const next = [...prev];
      const srcIdx = next.findIndex(a => a.agentId === sourceAgentId);
      const tgtIdx = next.findIndex(a => a.agentId === targetAgentId);
      if (srcIdx === -1 || tgtIdx === -1) return prev;
      const srcDept = {
        departmentId: next[srcIdx].departmentId,
        department: next[srcIdx].department,
      };
      const tgtDept = {
        departmentId: next[tgtIdx].departmentId,
        department: next[tgtIdx].department,
      };
      next[srcIdx] = { ...next[srcIdx], ...tgtDept };
      next[tgtIdx] = { ...next[tgtIdx], ...srcDept };
      [next[srcIdx], next[tgtIdx]] = [next[tgtIdx], next[srcIdx]];
      saveAiAgentsToStorage(next);
      return next;
    });
  };

  const query = filterQuery.trim().toLowerCase();
  const visibleAgents = agents.filter(agent => {
    if (!query) return true;
    return [agent.name, agent.agentId, agent.code, agent.role, agent.department, agent.tier].some(
      v => v.toLowerCase().includes(query)
    );
  });

  return (
    <SidebarListWrapper data-testid="sidebar-ai-assistants-list">
      <div style={{ marginBottom: '8px' }}>
        {PORTAL_LINKS.map(({ route, label, color, bg, border, testId, Icon }) => (
          <div
            key={route}
            onClick={() => onNavigateToView?.(route)}
            data-testid={testId}
            style={{
              fontSize: '0.68rem',
              color,
              padding: '5px 8px',
              cursor: 'pointer',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              background: bg,
              border: `1px solid ${border}`,
              borderRadius: '6px',
              marginBottom: '4px',
            }}
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <Icon size={12} /> {label}
            </span>
            <ArrowRight size={11} />
          </div>
        ))}
      </div>

      {/* 5 Operational AI Supervisors Quick Launch (DH2 Leasing Pipeline) */}
      <div
        data-testid="sidebar-5-supervisors-quick-bar"
        style={{
          padding: '7px 8px',
          borderRadius: '6px',
          background: 'rgba(15, 23, 42, 0.85)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          marginBottom: '8px',
        }}
      >
        <div
          style={{
            fontSize: '0.6rem',
            fontWeight: 800,
            color: '#94A3B8',
            textTransform: 'uppercase',
            marginBottom: '5px',
          }}
        >
          5 Operational AI Supervisors (DH2 Live)
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
          {OPERATIONAL_SUPERVISOR_SHORTCUTS.map(sup => (
            <button
              key={sup.code}
              type="button"
              data-testid={`sidebar-sup-launch-${sup.label.toLowerCase()}`}
              onClick={() => onNavigateToView?.(sup.route)}
              style={{
                padding: '3px 7px',
                borderRadius: '5px',
                background: 'rgba(30, 41, 59, 0.9)',
                border: `1px solid ${sup.color}55`,
                color: sup.color,
                fontSize: '0.64rem',
                fontWeight: 800,
                cursor: 'pointer',
              }}
            >
              {sup.label}
            </button>
          ))}
        </div>
      </div>

      {/* DMS Draggable Open Human Job Position under DEPT-05 */}
      <div
        draggable
        onDragStart={e => e.dataTransfer.setData('text/plain', 'OPEN-DEPT05-MGR-LEASING-01')}
        onClick={() => onNavigateToView?.('/aicc-sanctum')}
        data-testid="dms-open-human-leasing-manager-card"
        style={{
          padding: '7px 8px',
          borderRadius: '6px',
          background: 'rgba(245, 158, 11, 0.12)',
          border: '1px dashed rgba(245, 158, 11, 0.45)',
          marginBottom: '8px',
          cursor: 'grab',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: '0.63rem',
            color: '#FBBF24',
            fontWeight: 800,
          }}
        >
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Briefcase size={11} /> OPEN HUMAN ROLE • DEPT-05
          </span>
          <span>DRAG IN DMS</span>
        </div>
        <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#F8FAFC', marginTop: '2px' }}>
          Residential Leasing Manager (+12 AM / 108 Sup / 10 Agents)
        </div>
        <div style={{ fontSize: '0.62rem', color: '#94A3B8' }}>
          Reports to: Dir AI Clara (DIR-05) → AI Zoe → Arslan Malik (MD)
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '4px 8px 8px',
        }}
      >
        <span
          style={{
            fontSize: '0.66rem',
            fontWeight: 800,
            color: '#EF4444',
            textTransform: 'uppercase',
          }}
        >
          Zoe&apos;s Team ({visibleAgents.length}) · Drag to Swap
        </span>
        <button
          type="button"
          onClick={() => onNavigateToView?.('/dashboard/aiams/create')}
          data-testid="sidebar-aiams-register-btn"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            padding: '2px 8px',
            borderRadius: '4px',
            background: 'rgba(239, 68, 68, 0.15)',
            border: '1px solid rgba(239, 68, 68, 0.35)',
            color: '#F87171',
            fontSize: '0.68rem',
            fontWeight: 700,
            cursor: 'pointer',
          }}
        >
          <Plus size={12} />
          <span>Register AI</span>
        </button>
      </div>

      {visibleAgents.map(agent => {
        const isSelected = selectedAgentId === agent.agentId;
        const isDropTarget = dragOverId === agent.agentId && draggedId !== agent.agentId;
        return (
          <div
            key={agent.agentId}
            draggable
            onDragStart={e => {
              setDraggedId(agent.agentId);
              e.dataTransfer.setData('text/plain', agent.agentId);
            }}
            onDragOver={e => {
              e.preventDefault();
              setDragOverId(agent.agentId);
            }}
            onDragLeave={() => setDragOverId(null)}
            onDrop={e => {
              e.preventDefault();
              const src = e.dataTransfer.getData('text/plain') || draggedId || '';
              handleSwapDrop(src, agent.agentId);
              setDraggedId(null);
              setDragOverId(null);
            }}
            onClick={() => {
              onSelectAgent?.(agent.agentId, agent.name);
              onNavigateToView?.(`/dashboard/aiams/${agent.agentId}`);
            }}
            data-testid={`sidebar-ai-agent-${agent.agentId}`}
            style={{
              padding: '8px 10px',
              borderRadius: '8px',
              background: isDropTarget
                ? 'rgba(16, 185, 129, 0.18)'
                : isSelected
                  ? 'rgba(239, 68, 68, 0.15)'
                  : '#070D18',
              border: isDropTarget
                ? '1px dashed #10B981'
                : isSelected
                  ? '1px solid #EF4444'
                  : '1px solid rgba(255, 255, 255, 0.05)',
              cursor: 'grab',
              display: 'flex',
              flexDirection: 'column',
              gap: '4px',
              marginBottom: '6px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <GripVertical size={11} color="#64748B" />
                <span
                  style={{
                    fontSize: '0.63rem',
                    fontFamily: 'monospace',
                    color: '#F87171',
                    background: 'rgba(239,68,68,0.12)',
                    padding: '1px 5px',
                    borderRadius: '4px',
                    fontWeight: 700,
                  }}
                >
                  {agent.code}
                </span>
                <span style={{ fontSize: '0.62rem', fontWeight: 800, color: '#94A3B8' }}>
                  {agent.tier}
                </span>
              </div>
              <span style={{ fontSize: '0.62rem', color: '#10B981', fontWeight: 700 }}>
                {agent.status}
              </span>
            </div>
            <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#F8FAFC' }}>
              {agent.name}
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontSize: '0.65rem',
                color: '#64748B',
                gap: '6px',
              }}
            >
              <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {agent.role}
              </span>
              <span style={{ color: '#38BDF8', flexShrink: 0 }}>{agent.model}</span>
            </div>
          </div>
        );
      })}
    </SidebarListWrapper>
  );
};

export default SidebarAiAssistantsList;
