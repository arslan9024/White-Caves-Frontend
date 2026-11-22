/**
 * CRM Agent Performance Dashboard
 * Agent metrics, rankings, and performance tracking
 * Route: /owner/crm/agents
 */

import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAgentPerformance } from '../../hooks/crm/useAgentPerformance';
import { formatCurrency } from './agentPerformance/helpers';
import {
  BackLink,
  PageContainer,
  PageHeader,
  PageTitle,
  StatCard,
  StatLabel,
  StatsRow,
  StatValue,
  StatusDot,
} from './agentPerformance/AgentPerformanceStyles';
import { AgentCardsSection } from './agentPerformance/AgentCardsSection';
import { AgentLeaderboardSection } from './agentPerformance/AgentLeaderboardSection';

// ─── Component ──────────────────────────────────────────────────────────

const AgentPerformancePage: FC = () => {
  const navigate = useNavigate();

  // All data fetching, ranking, stats & pagination handled by the hook
  const {
    agents,
    loading,
    teamStats,
    rankedAgents,
    paginatedAgents,
    currentPage,
    setCurrentPage,
    totalPages,
    agentsPerPage,
  } = useAgentPerformance();

  return (
    <PageContainer>
      {/* Header */}
      <PageHeader>
        <div>
          <BackLink onClick={() => navigate('/owner/crm')}>← Back to CRM Hub</BackLink>
          <PageTitle>👥 Agent Performance Dashboard</PageTitle>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <StatusDot $status="online" />
          <span style={{ fontSize: '0.85rem', color: 'rgba(255, 255, 255, 0.6)' }}>
            {teamStats.onlineCount}/{teamStats.total} Online
          </span>
        </div>
      </PageHeader>

      {/* Loading State */}
      {loading && (
        <div
          style={{
            background: 'rgba(16, 185, 129, 0.1)',
            border: '1px solid rgba(16, 185, 129, 0.3)',
            borderRadius: 8,
            padding: '0.75rem 1rem',
            marginBottom: '1rem',
            fontSize: '0.85rem',
            color: '#10b981',
          }}
        >
          ⏳ Loading agent data from server...
        </div>
      )}

      {/* Team Stats */}
      <StatsRow>
        <StatCard $color="#c9a84c">
          <StatValue>{teamStats.total}</StatValue>
          <StatLabel>Total Agents</StatLabel>
        </StatCard>
        <StatCard $color="#10B981">
          <StatValue>{teamStats.totalDeals}</StatValue>
          <StatLabel>Total Deals Closed</StatLabel>
        </StatCard>
        <StatCard $color="#c9a84c">
          <StatValue>{formatCurrency(teamStats.totalRevenue)}</StatValue>
          <StatLabel>Total Revenue</StatLabel>
        </StatCard>
        <StatCard $color="#F59E0B">
          <StatValue>{teamStats.avgPerformance}%</StatValue>
          <StatLabel>Avg Performance</StatLabel>
        </StatCard>
        <StatCard $color="#10b981">
          <StatValue>{teamStats.avgConversion}%</StatValue>
          <StatLabel>Avg Conversion Rate</StatLabel>
        </StatCard>
      </StatsRow>

      {/* Empty State */}
      {!loading && agents.length === 0 && (
        <div
          style={{
            background: 'rgba(201, 168, 76, 0.1)',
            border: '1px solid rgba(201, 168, 76, 0.3)',
            borderRadius: 12,
            padding: '2rem',
            textAlign: 'center',
            marginBottom: '1.5rem',
          }}
        >
          <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>👥</div>
          <div
            style={{
              fontWeight: 600,
              color: 'var(--color-c9a84c, #c9a84c)',
              marginBottom: '0.25rem',
            }}
          >
            No Agents Found
          </div>
          <div style={{ fontSize: '0.85rem', color: 'rgba(255, 255, 255, 0.6)' }}>
            Agent data will appear here once agents are added to the system.
          </div>
        </div>
      )}

      {/* Agent Cards & Pagination */}
      <AgentCardsSection
        agentsCount={agents.length}
        paginatedAgents={paginatedAgents}
        rankedAgentsCount={rankedAgents.length}
        currentPage={currentPage}
        totalPages={totalPages}
        agentsPerPage={agentsPerPage}
        onPageChange={setCurrentPage}
      />

      {/* Leaderboard Table */}
      <AgentLeaderboardSection
        paginatedAgents={paginatedAgents}
        currentPage={currentPage}
        agentsPerPage={agentsPerPage}
      />
    </PageContainer>
  );
};

export default AgentPerformancePage;
