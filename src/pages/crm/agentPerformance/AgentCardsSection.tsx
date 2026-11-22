/**
 * Agent Rankings Cards Grid & Pagination Controls
 */

import React, { FC } from 'react';
import type { Agent } from './types';
import { AVATAR_COLORS, formatCurrency, getInitials, getPerformanceColor } from './helpers';
import {
  AgentCard,
  AgentGrid,
  AgentHeader,
  AgentInfo,
  AgentName,
  AgentRole,
  Avatar,
  BarFill,
  BarLabel,
  BarTrack,
  MetricItem,
  MetricLabel,
  MetricsGrid,
  MetricValue,
  PerformanceBar,
  SectionTitle,
  StatusDot,
} from './AgentPerformanceStyles';

export interface AgentCardsSectionProps {
  agentsCount: number;
  paginatedAgents: Agent[];
  rankedAgentsCount: number;
  currentPage: number;
  totalPages: number;
  agentsPerPage: number;
  onPageChange: React.Dispatch<React.SetStateAction<number>>;
}

export const AgentCardsSection: FC<AgentCardsSectionProps> = ({
  agentsCount,
  paginatedAgents,
  rankedAgentsCount,
  currentPage,
  totalPages,
  agentsPerPage,
  onPageChange,
}) => (
  <>
    {agentsCount > 0 && (
      <SectionTitle>
        🏆 Agent Rankings (Page {currentPage} of {totalPages})
      </SectionTitle>
    )}
    <AgentGrid>
      {paginatedAgents.map((agent, idx) => {
        const globalIdx = (currentPage - 1) * agentsPerPage + idx;
        return (
          <AgentCard key={agent.id} $rank={globalIdx + 1}>
            <AgentHeader>
              <Avatar $color={AVATAR_COLORS[globalIdx % AVATAR_COLORS.length]}>
                {getInitials(agent.name || 'NA')}
              </Avatar>
              <AgentInfo>
                <AgentName>{agent.name}</AgentName>
                <AgentRole>
                  {agent.role} • {agent.department}
                </AgentRole>
                <div style={{ fontSize: '0.75rem', marginTop: '0.2rem' }}>
                  <StatusDot $status={agent.status || 'offline'} />
                  {agent.status === 'online'
                    ? 'Online'
                    : agent.status === 'busy'
                      ? 'Busy'
                      : 'Offline'}
                </div>
              </AgentInfo>
            </AgentHeader>

            <MetricsGrid>
              <MetricItem>
                <MetricValue>{agent.deals_closed || 0}</MetricValue>
                <MetricLabel>Deals Closed</MetricLabel>
              </MetricItem>
              <MetricItem>
                <MetricValue>{formatCurrency(agent.revenue_generated || 0)}</MetricValue>
                <MetricLabel>Revenue</MetricLabel>
              </MetricItem>
              <MetricItem>
                <MetricValue>{agent.leads_assigned || 0}</MetricValue>
                <MetricLabel>Leads Assigned</MetricLabel>
              </MetricItem>
              <MetricItem>
                <MetricValue>{agent.conversion_rate || 0}%</MetricValue>
                <MetricLabel>Conversion</MetricLabel>
              </MetricItem>
            </MetricsGrid>

            <PerformanceBar>
              <BarLabel>
                <span>Performance Score</span>
                <span
                  style={{ fontWeight: 600, color: getPerformanceColor(agent.performance || 0) }}
                >
                  {agent.performance || 0}%
                </span>
              </BarLabel>
              <BarTrack>
                <BarFill
                  $width={agent.performance || 0}
                  $color={getPerformanceColor(agent.performance || 0)}
                />
              </BarTrack>
            </PerformanceBar>
          </AgentCard>
        );
      })}
    </AgentGrid>

    {totalPages > 1 && (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '0.75rem',
          margin: '1.5rem 0',
        }}
      >
        <button
          onClick={() => onPageChange(p => Math.max(1, p - 1))}
          disabled={currentPage === 1}
          style={{
            padding: '0.5rem 1rem',
            borderRadius: 8,
            border: '1px solid #c9a84c',
            background: currentPage === 1 ? '#1a1a1a' : '#0f0f0f',
            color: currentPage === 1 ? 'rgba(255,255,255,0.3)' : '#c9a84c',
            cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
            fontSize: '0.85rem',
          }}
        >
          ← Previous
        </button>
        <span style={{ fontSize: '0.85rem', color: 'rgba(255, 255, 255, 0.6)' }}>
          Page {currentPage} of {totalPages} ({rankedAgentsCount} agents)
        </span>
        <button
          onClick={() => onPageChange(p => Math.min(totalPages, p + 1))}
          disabled={currentPage === totalPages}
          style={{
            padding: '0.5rem 1rem',
            borderRadius: 8,
            border: '1px solid #c9a84c',
            background: currentPage === totalPages ? '#1a1a1a' : '#0f0f0f',
            color: currentPage === totalPages ? 'rgba(255,255,255,0.3)' : '#c9a84c',
            cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
            fontSize: '0.85rem',
          }}
        >
          Next →
        </button>
      </div>
    )}
  </>
);
