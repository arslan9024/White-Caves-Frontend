import React, { useState, useEffect } from 'react';
import type { DashboardStats, ConversationMetrics } from '../../../types/phase6.types';

interface DashboardProps {
  stats: DashboardStats;
  metrics: ConversationMetrics[];
  isLoading?: boolean;
  onRefresh?: () => Promise<void>;
}

import {
  Container,
  StatsGrid,
  StatCard,
  StatIcon,
  StatValue,
  StatLabel,
  StatTrend,
  HeaderRow,
  Title,
  RefreshButton,
  MetricsSection,
  MetricCard,
  MetricTitle,
  MetricRow,
  MetricLabel,
  MetricValue,
  ProgressBar,
  ProgressFill,
  EmptyState,
  Chart,
  ChartTitle,
  ChartBar,
  ChartLabel,
  ChartBarContainer,
  ChartBarFill,
  ChartValue,
  LoadingOverlay,
} from './Dashboard.styles';

export const Dashboard: React.FC<DashboardProps> = ({
  stats,
  metrics,
  isLoading = false,
  onRefresh,
}) => {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    if (onRefresh && !isRefreshing) {
      setIsRefreshing(true);
      try {
        await onRefresh();
      } finally {
        setIsRefreshing(false);
      }
    }
  };

  const maxMessages = Math.max(...metrics.map((m) => m.messageCount), 1);
  const maxParticipants = Math.max(...metrics.map((m) => m.participantCount), 1);

  return (
    <Container style={{ position: 'relative' }}>
      {isLoading && (
        <LoadingOverlay>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
          </svg>
        </LoadingOverlay>
      )}

      <HeaderRow>
        <Title>Dashboard</Title>
        <RefreshButton onClick={handleRefresh} disabled={isRefreshing}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M23 4v6h-6M1 20v-6h6" />
            <path d="M3.51 9a9 9 0 0 1 14.85-3.36M20.49 15a9 9 0 0 1-14.85 3.36" />
          </svg>
          {isRefreshing ? 'Refreshing...' : 'Refresh'}
        </RefreshButton>
      </HeaderRow>

      <StatsGrid>
        <StatCard>
          <StatIcon color="#4caf50">💬</StatIcon>
          <StatValue>{stats.totalMessages}</StatValue>
          <StatLabel>Total Messages</StatLabel>
          <StatTrend isPositive={true}>
            <span>↑</span> Updated now
          </StatTrend>
        </StatCard>

        <StatCard>
          <StatIcon color="#2196f3">👥</StatIcon>
          <StatValue>{stats.activeConversations}</StatValue>
          <StatLabel>Active Conversations</StatLabel>
          <StatTrend isPositive={true}>
            <span>↑</span> This week
          </StatTrend>
        </StatCard>

        <StatCard>
          <StatIcon color="#ff9800">📇</StatIcon>
          <StatValue>{stats.totalContacts}</StatValue>
          <StatLabel>Total Contacts</StatLabel>
          <StatTrend isPositive={true}>
            <span>↑</span> Growing
          </StatTrend>
        </StatCard>

        <StatCard>
          <StatIcon color="#f44336">🔔</StatIcon>
          <StatValue>{stats.unreadMessages}</StatValue>
          <StatLabel>Unread Messages</StatLabel>
          <StatTrend isPositive={false}>
            <span>⚠️</span> Attention needed
          </StatTrend>
        </StatCard>

        <StatCard>
          <StatIcon color="#9c27b0">💾</StatIcon>
          <StatValue>{(stats.mediaSize / 1024 / 1024).toFixed(1)} MB</StatValue>
          <StatLabel>Media Storage</StatLabel>
          <StatTrend isPositive={true}>
            <span>↑</span> {(stats.mediaSize / 1024 / 1024).toFixed(1)} MB used
          </StatTrend>
        </StatCard>

        <StatCard>
          <StatIcon color="#00bcd4">⏱️</StatIcon>
          <StatValue>{stats.responseTime}s</StatValue>
          <StatLabel>Avg Response Time</StatLabel>
          <StatTrend isPositive={stats.responseTime < 2}>
            {stats.responseTime < 2 ? '✓ Fast' : '⚠️ Slow'}
          </StatTrend>
        </StatCard>
      </StatsGrid>

      {metrics.length > 0 ? (
        <>
          <Chart>
            <ChartTitle>Messages by Conversation</ChartTitle>
            {metrics.slice(0, 5).map((metric) => (
              <ChartBar key={metric.conversationId}>
                <ChartLabel title={`Conversation ${metric.conversationId.slice(0, 8)}`}>
                  Conversation {metric.conversationId.slice(0, 8)}
                </ChartLabel>
                <ChartBarContainer>
                  <ChartBarFill percentage={(metric.messageCount / maxMessages) * 100} />
                </ChartBarContainer>
                <ChartValue>{metric.messageCount}</ChartValue>
              </ChartBar>
            ))}
          </Chart>

          <Chart>
            <ChartTitle>Participants by Conversation</ChartTitle>
            {metrics.slice(0, 5).map((metric) => (
              <ChartBar key={metric.conversationId}>
                <ChartLabel title={`Conversation ${metric.conversationId.slice(0, 8)}`}>
                  Conversation {metric.conversationId.slice(0, 8)}
                </ChartLabel>
                <ChartBarContainer>
                  <ChartBarFill percentage={(metric.participantCount / maxParticipants) * 100} />
                </ChartBarContainer>
                <ChartValue>{metric.participantCount}</ChartValue>
              </ChartBar>
            ))}
          </Chart>

          <MetricsSection>
            <MetricCard>
              <MetricTitle>Recent Conversation Metrics</MetricTitle>
              {metrics.slice(0, 3).map((metric) => (
                <div key={metric.conversationId}>
                  <MetricRow>
                    <MetricLabel>Conversation {metric.conversationId.slice(0, 8)}</MetricLabel>
                    <MetricValue>{metric.messageCount} messages</MetricValue>
                  </MetricRow>
                  <MetricRow>
                    <MetricLabel style={{ paddingLeft: '12px' }}>
                      Avg Response: {metric.averageResponseTime.toFixed(1)}s
                    </MetricLabel>
                    <MetricValue>{metric.participantCount} participants</MetricValue>
                  </MetricRow>
                </div>
              ))}
            </MetricCard>
          </MetricsSection>
        </>
      ) : (
        <EmptyState>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="3" width="7" height="7" />
            <rect x="14" y="3" width="7" height="7" />
            <rect x="14" y="14" width="7" height="7" />
            <rect x="3" y="14" width="7" height="7" />
          </svg>
          <p>No metrics available yet</p>
        </EmptyState>
      )}
    </Container>
  );
};

export default Dashboard;

