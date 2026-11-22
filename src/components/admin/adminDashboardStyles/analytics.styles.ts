import styled from 'styled-components';
import { colors, mediaQueries, radius, shadows, spacing, transitions, typography } from './tokens';

export const AdminAnalytics = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.xl};
`;

export const FilterSelect = styled.select`
  padding: ${spacing.sm} ${radius.xl};
  margin-left: auto;
  border: 1px solid ${colors.border};
  border-radius: ${radius.sm};
  font-size: ${typography.sizes.base};
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: ${colors.primary};
  }

  ${mediaQueries.tablet} {
    margin-left: 0;
    width: 100%;
  }
`;

export const AnalyticsCharts = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${spacing.lg};

  ${mediaQueries.mobile} {
    grid-template-columns: 1fr;
  }
`;

export const ChartContainer = styled.div`
  background: ${colors.background.secondary};
  padding: ${spacing.lg};
  border-radius: ${radius.lg};
  box-shadow: ${shadows.sm};

  h4 {
    margin: 0 0 ${spacing.md} 0;
    font-size: ${typography.sizes.md};
    font-weight: ${typography.weights.semibold};
    color: ${colors.text.primary};
  }
`;

export const ChartPlaceholder = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-around;
  height: 200px;
  padding: ${spacing.md} 0;

  ${mediaQueries.mobile} {
    height: 160px;
  }
`;

export const ChartBar = styled.div<{ $height?: string }>`
  width: 20%;
  height: ${props => props.$height || '50%'};
  background: #b45309;
  border-radius: ${radius.sm} ${radius.sm} 0 0;
  transition: ${transitions.hover};

  &:hover {
    opacity: 0.8;
  }
`;

export const PaginationContainer = styled.div`
  margin-top: 1rem;
  display: flex;
  justify-content: flex-end;

  ${mediaQueries.mobile} {
    justify-content: center;
  }
`;

export const ReportActions = styled.div`
  display: flex;
  gap: ${spacing.md};
  flex-wrap: wrap;
`;
