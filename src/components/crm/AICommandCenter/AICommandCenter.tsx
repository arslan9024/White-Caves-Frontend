import React, { FC, useState } from 'react';
import {
  Search,
  Zap,
  CheckCircle2,
  Shield,
  Activity,
  ArrowUpRight,
  Crown,
  Users,
  LayoutGrid,
  GitFork,
  Database,
} from 'lucide-react';
import { useAICommandCenterLogic } from './logic/AICommandCenter.logic';
import { COMMAND_CENTER_TEXT } from './data/AICommandCenter.data';
import type { DepartmentDef, SupervisorDef } from '../../../data/assistants108Registry.data';
import AIOrganogramTree from '../../dashboard/organogram/AIOrganogramTree';
import LindaWhatsAppCRM from '../LindaWhatsAppCRM';
import { AiAssistantCrudTable } from './AiAssistantCrudTable';
import { OperationalSupervisorsGrid } from './OperationalSupervisorsGrid';
import { AICommandCenterFilterBar } from './AICommandCenterFilterBar';
import {
  CommandCenterContainer,
  HeaderBanner,
  LiveBadge,
  StatsGrid,
  StatCardWrapper,
  FilterBar,
  SearchInputWrapper,
  DepartmentPills,
  DeptPill,
  AssistantsGrid,
  AssistantCard,
  AssistantHeader,
  TagList,
  CapabilityTag,
  MetricsRow,
  LaunchBtn,
} from './styles/AICommandCenter.style';

export interface AICommandCenterProps {
  onSelectAgent?: (agentId: string) => void;
}

export const AICommandCenter: FC<AICommandCenterProps> = ({ onSelectAgent }) => {
  const [viewMode, setViewMode] = useState<'grid' | 'organogram' | 'linda' | 'crud'>('grid');
  const {
    searchTerm,
    setSearchTerm,
    selectedDept,
    setSelectedDept,
    selectedAssistantId,
    handleSelectAssistant,
    filteredAssistants,
    departments,
    executive,
    stats,
  } = useAICommandCenterLogic();

  return (
    <CommandCenterContainer data-testid="ai-command-center-root">
      {/* ── HEADER BANNER & VIEW TOGGLE ─────────────────────────────────── */}
      <HeaderBanner>
        <div>
          <h1>{COMMAND_CENTER_TEXT.header.title}</h1>
          <p>{COMMAND_CENTER_TEXT.header.subtitle}</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {/* View Mode Toggle Switch */}
          <div
            style={{ display: 'flex', background: '#F1F5F9', borderRadius: '8px', padding: '3px' }}
          >
            <button
              onClick={() => setViewMode('grid')}
              style={{
                background: viewMode === 'grid' ? '#0F172A' : 'transparent',
                color: viewMode === 'grid' ? '#FFFFFF' : '#475569',
                border: 'none',
                borderRadius: '6px',
                padding: '6px 12px',
                fontSize: '0.76rem',
                fontWeight: 800,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
              }}
            >
              <LayoutGrid size={14} /> Grid Cards
            </button>
            <button
              onClick={() => setViewMode('organogram')}
              style={{
                background: viewMode === 'organogram' ? '#EF4444' : 'transparent',
                color: viewMode === 'organogram' ? '#FFFFFF' : '#475569',
                border: 'none',
                borderRadius: '6px',
                padding: '6px 10px',
                fontSize: '0.76rem',
                fontWeight: 800,
                cursor: 'pointer',
              }}
            >
              🌳 Organogram
            </button>
            <button
              onClick={() => setViewMode('crud')}
              data-testid="toggle-view-crud"
              style={{
                background: viewMode === 'crud' ? '#EF4444' : 'transparent',
                color: viewMode === 'crud' ? '#FFFFFF' : '#475569',
                border: 'none',
                borderRadius: '6px',
                padding: '6px 10px',
                fontSize: '0.76rem',
                fontWeight: 800,
                cursor: 'pointer',
              }}
            >
              ⚡ AI Mesh CRUD
            </button>
          </div>

          <LiveBadge>{COMMAND_CENTER_TEXT.header.badge}</LiveBadge>
          <button
            type="button"
            data-testid="btn-launch-linda"
            onClick={() => {
              handleSelectAssistant('linda');
              setViewMode('linda');
              onSelectAgent?.('linda');
            }}
            style={{
              background: 'linear-gradient(135deg, #25D366, #128C7E)',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '8px',
              padding: '6px 12px',
              fontSize: '0.78rem',
              fontWeight: 800,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
            }}
          >
            🤖 Launch Linda <ArrowUpRight size={14} />
          </button>
        </div>
      </HeaderBanner>

      {/* ── CONDITIONAL SUB-VIEWS (LINDA / ORGANOGRAM / AI CRUD) ───────────── */}
      {viewMode === 'linda' ? (
        <div style={{ marginTop: '1rem' }}>
          <LindaWhatsAppCRM />
        </div>
      ) : viewMode === 'organogram' ? (
        <div style={{ marginTop: '1rem' }}>
          <AIOrganogramTree
            onSelectAssistant={asst => {
              handleSelectAssistant(asst.id);
              setViewMode('grid');
            }}
          />
        </div>
      ) : viewMode === 'crud' ? (
        <div style={{ marginTop: '1rem' }}>
          <AiAssistantCrudTable />
        </div>
      ) : (
        <>
          {/* ── LEVEL 0: EXECUTIVE COMMAND (1 MD + 1 ZOE) ────────────────────── */}
          <div
            style={{
              background: 'linear-gradient(135deg, #1E293B 0%, #0F172A 100%)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              borderLeft: '4px solid #EF4444',
              borderRadius: '16px',
              padding: '1.25rem 1.5rem',
              marginBottom: '1.25rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '1rem',
              boxShadow: '0 8px 24px rgba(15, 23, 42, 0.12)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div
                style={{
                  background: 'rgba(239, 68, 68, 0.15)',
                  border: '1px solid #EF4444',
                  borderRadius: '50%',
                  width: '44px',
                  height: '44px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#EF4444',
                  fontSize: '1.3rem',
                }}
              >
                <Crown size={24} />
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span
                    style={{
                      fontSize: '0.68rem',
                      fontWeight: 900,
                      background: '#EF4444',
                      color: '#FFFFFF',
                      padding: '2px 6px',
                      borderRadius: '4px',
                      textTransform: 'uppercase',
                    }}
                  >
                    Level 0 Sovereign Command
                  </span>
                  <span style={{ fontSize: '0.72rem', color: '#10B981', fontWeight: 800 }}>
                    ● Active
                  </span>
                </div>
                <h2
                  style={{
                    margin: '2px 0 0',
                    fontSize: '1.1rem',
                    fontWeight: 900,
                    color: '#FFFFFF',
                  }}
                >
                  {executive.managingDirector.name}
                </h2>
                <p style={{ margin: 0, fontSize: '0.78rem', color: '#94A3B8' }}>
                  {executive.managingDirector.title} • {executive.managingDirector.clearance}
                </p>
              </div>
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '12px',
                padding: '8px 14px',
              }}
            >
              <img
                src={executive.executiveAi.avatar}
                alt={executive.executiveAi.name}
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  border: '2px solid #EF4444',
                }}
              />
              <div>
                <div style={{ fontSize: '0.9rem', fontWeight: 800, color: '#FFFFFF' }}>
                  {executive.executiveAi.name}
                </div>
                <div style={{ fontSize: '0.75rem', color: '#EF4444', fontWeight: 700 }}>
                  {executive.executiveAi.title}
                </div>
              </div>
            </div>
          </div>

          {/* ── STATS SUMMARY BAR ────────────────────────────────────────────── */}
          <StatsGrid>
            <StatCardWrapper $color="#EF4444">
              <div className="stat-info">
                <span className="label">{COMMAND_CENTER_TEXT.stats.activeAgentsLabel}</span>
                <strong className="value">
                  {stats.optimalCount} / {stats.totalAgents}
                </strong>
              </div>
              <div className="stat-icon">
                <Users size={22} />
              </div>
            </StatCardWrapper>

            <StatCardWrapper $color="#10B981">
              <div className="stat-info">
                <span className="label">{COMMAND_CENTER_TEXT.stats.systemHealthLabel}</span>
                <strong className="value">100.0% Optimal</strong>
              </div>
              <div className="stat-icon">
                <CheckCircle2 size={22} />
              </div>
            </StatCardWrapper>

            <StatCardWrapper $color="#F59E0B">
              <div className="stat-info">
                <span className="label">{COMMAND_CENTER_TEXT.stats.tasksExecutedLabel}</span>
                <strong className="value">{stats.totalTasksToday}</strong>
              </div>
              <div className="stat-icon">
                <Activity size={22} />
              </div>
            </StatCardWrapper>

            <StatCardWrapper $color="#6366F1">
              <div className="stat-info">
                <span className="label">{COMMAND_CENTER_TEXT.stats.slaAdherenceLabel}</span>
                <strong className="value">{stats.slaAdherence}</strong>
              </div>
              <div className="stat-icon">
                <Shield size={22} />
              </div>
            </StatCardWrapper>
          </StatsGrid>

          {/* ── FILTER & SEARCH BAR ──────────────────────────────────────────── */}
          <AICommandCenterFilterBar
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            selectedDept={selectedDept}
            setSelectedDept={setSelectedDept}
            departments={departments}
          />

          {/* ── 108 OPERATIONAL SUPERVISORS GRID ─────────────────────────────── */}
          <OperationalSupervisorsGrid
            filteredAssistants={filteredAssistants}
            selectedAssistantId={selectedAssistantId}
            onSelectAssistant={handleSelectAssistant}
            onLaunchAgent={onSelectAgent}
          />
        </>
      )}
    </CommandCenterContainer>
  );
};

export default AICommandCenter;
