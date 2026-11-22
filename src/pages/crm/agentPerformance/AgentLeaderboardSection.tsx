/**
 * Detailed Agent Leaderboard Table Section
 */

import React, { FC } from 'react';
import { Badge } from '../../../components/ui';
import type { Agent } from './types';
import { AVATAR_COLORS, formatCurrency, getInitials, getPerformanceColor } from './helpers';
import { Avatar, LeaderboardTable, LTd, LTh, LTr, SectionTitle } from './AgentPerformanceStyles';

export interface AgentLeaderboardSectionProps {
  paginatedAgents: Agent[];
  currentPage: number;
  agentsPerPage: number;
}

export const AgentLeaderboardSection: FC<AgentLeaderboardSectionProps> = ({
  paginatedAgents,
  currentPage,
  agentsPerPage,
}) => (
  <>
    <SectionTitle>📊 Detailed Leaderboard</SectionTitle>
    <div style={{ overflowX: 'auto' }}>
      <LeaderboardTable>
        <thead>
          <tr>
            <LTh>#</LTh>
            <LTh>Agent</LTh>
            <LTh>Department</LTh>
            <LTh>Status</LTh>
            <LTh>Deals</LTh>
            <LTh>Revenue</LTh>
            <LTh>Leads</LTh>
            <LTh>Conversion</LTh>
            <LTh>Score</LTh>
          </tr>
        </thead>
        <tbody>
          {paginatedAgents.map((agent, idx) => {
            const globalIdx = (currentPage - 1) * agentsPerPage + idx;
            return (
              <LTr key={agent.id}>
                <LTd
                  style={{
                    fontWeight: 600,
                    color: globalIdx < 3 ? '#c9a84c' : 'rgba(255,255,255,0.5)',
                  }}
                >
                  {globalIdx === 0
                    ? '🥇'
                    : globalIdx === 1
                      ? '🥈'
                      : globalIdx === 2
                        ? '🥉'
                        : `#${globalIdx + 1}`}
                </LTd>
                <LTd>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Avatar
                      $color={AVATAR_COLORS[globalIdx % AVATAR_COLORS.length]}
                      style={{ width: 32, height: 32, fontSize: '0.7rem', borderRadius: 8 }}
                    >
                      {getInitials(agent.name || 'NA')}
                    </Avatar>
                    <div>
                      <div style={{ fontWeight: 500 }}>{agent.name}</div>
                      <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.5)' }}>
                        {agent.email}
                      </div>
                    </div>
                  </div>
                </LTd>
                <LTd>{agent.department}</LTd>
                <LTd>
                  <Badge
                    variant={
                      agent.status === 'online'
                        ? 'success'
                        : agent.status === 'busy'
                          ? 'warning'
                          : 'secondary'
                    }
                    size="small"
                  >
                    {agent.status}
                  </Badge>
                </LTd>
                <LTd style={{ fontWeight: 600 }}>{agent.deals_closed || 0}</LTd>
                <LTd>{formatCurrency(agent.revenue_generated || 0)}</LTd>
                <LTd>{agent.leads_assigned || 0}</LTd>
                <LTd>{agent.conversion_rate || 0}%</LTd>
                <LTd>
                  <span
                    style={{
                      fontWeight: 700,
                      color: getPerformanceColor(agent.performance || 0),
                    }}
                  >
                    {agent.performance || 0}%
                  </span>
                </LTd>
              </LTr>
            );
          })}
        </tbody>
      </LeaderboardTable>
    </div>
  </>
);
