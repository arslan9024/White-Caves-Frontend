/**
 * Styled components for CRM Agent Performance Dashboard
 */

import styled from 'styled-components';

export const PageContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Inter', 'Segoe UI', sans-serif;
  background: #0f0f0f;
  color: #ffffff;
  min-height: 100vh;
`;

export const PageHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  gap: 1rem;
`;

export const PageTitle = styled.h1`
  font-size: 1.5rem;
  font-weight: 700;
  color: #c9a84c;
  margin: 0;
`;

export const BackLink = styled.button`
  background: none;
  border: none;
  color: #10b981;
  cursor: pointer;
  font-size: 0.85rem;
  font-weight: 500;
  padding: 0;
  &:hover {
    text-decoration: underline;
    color: #34d399;
  }
`;

export const StatsRow = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
`;

export const StatCard = styled.div<{ $color: string }>`
  background: #0f0f0f;
  border: 1px solid #c9a84c;
  border-radius: 12px;
  padding: 1.25rem;
  border-left: 4px solid ${props => props.$color};
`;

export const StatValue = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: #ffffff;
`;

export const StatLabel = styled.div`
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.5);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-top: 0.25rem;
`;

export const SectionTitle = styled.h2`
  font-size: 1.1rem;
  font-weight: 600;
  color: #c9a84c;
  margin: 0 0 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const AgentGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
  gap: 1.25rem;
  margin-bottom: 2.5rem;
`;

export const AgentCard = styled.div<{ $rank?: number }>`
  background: #0f0f0f;
  border: 1px solid
    ${props =>
      props.$rank === 1
        ? '#c9a84c'
        : props.$rank === 2
          ? '#94A3B8'
          : props.$rank === 3
            ? '#CD7F32'
            : 'rgba(201, 168, 76, 0.3)'};
  border-radius: 12px;
  padding: 1.5rem;
  transition: all 0.2s;
  position: relative;
  overflow: hidden;

  ${props =>
    props.$rank &&
    props.$rank <= 3 &&
    `
    &::before {
      content: '${props.$rank === 1 ? '🥇' : props.$rank === 2 ? '🥈' : '🥉'}';
      position: absolute;
      top: 0.75rem;
      right: 0.75rem;
      font-size: 1.5rem;
    }
  `}

  &:hover {
    box-shadow: 0 4px 20px rgba(201, 168, 76, 0.15);
    transform: translateY(-2px);
  }
`;

export const AgentHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
`;

export const Avatar = styled.div<{ $color: string }>`
  width: 52px;
  height: 52px;
  border-radius: 12px;
  background: ${props => props.$color};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 700;
  font-size: 1.1rem;
`;

export const AgentInfo = styled.div`
  flex: 1;
`;

export const AgentName = styled.div`
  font-size: 1rem;
  font-weight: 600;
  color: #ffffff;
`;

export const AgentRole = styled.div`
  font-size: 0.78rem;
  color: rgba(255, 255, 255, 0.5);
`;

export const StatusDot = styled.span<{ $status: string }>`
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  margin-right: 0.35rem;
  background: ${props =>
    props.$status === 'online' ? '#10B981' : props.$status === 'busy' ? '#F59E0B' : '#94A3B8'};
`;

export const MetricsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.75rem;
`;

export const MetricItem = styled.div`
  background: #1a1a1a;
  border-radius: 8px;
  padding: 0.65rem 0.75rem;
`;

export const MetricValue = styled.div`
  font-size: 1rem;
  font-weight: 700;
  color: #ffffff;
`;

export const MetricLabel = styled.div`
  font-size: 0.7rem;
  color: rgba(255, 255, 255, 0.5);
  margin-top: 0.15rem;
`;

export const PerformanceBar = styled.div`
  margin-top: 1rem;
`;

export const BarTrack = styled.div`
  width: 100%;
  height: 8px;
  background: #2c2c2c;
  border-radius: 4px;
  overflow: hidden;
`;

export const BarFill = styled.div<{ $width: number; $color: string }>`
  height: 100%;
  width: ${props => props.$width}%;
  background: ${props => props.$color};
  border-radius: 4px;
  transition: width 0.5s ease;
`;

export const BarLabel = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.72rem;
  color: rgba(255, 255, 255, 0.5);
  margin-bottom: 0.35rem;
`;

export const LeaderboardTable = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  background: #0f0f0f;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid #c9a84c;
`;

export const LTh = styled.th`
  background: #1a1a1a;
  padding: 0.75rem 1rem;
  text-align: left;
  font-size: 0.72rem;
  font-weight: 600;
  color: #c9a84c;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  border-bottom: 1px solid rgba(201, 168, 76, 0.3);
`;

export const LTd = styled.td`
  padding: 0.75rem 1rem;
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.85);
  border-bottom: 1px solid #2c2c2c;
  vertical-align: middle;
`;

export const LTr = styled.tr`
  &:hover {
    background: rgba(201, 168, 76, 0.08);
  }
  &:last-child td {
    border-bottom: none;
  }
`;
