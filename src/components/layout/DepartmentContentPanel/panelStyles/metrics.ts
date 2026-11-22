import styled from 'styled-components';
import {
  colors,
  mediaQueries,
  radius,
  reducedMotion,
  shadows,
  spacing,
  transitions,
} from './tokens';

// ==============================================================================
// STATS GRID
// ==============================================================================

export const StatsGrid = styled.div<{ $isServiceStats?: boolean }>`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${props => (props.$isServiceStats ? radius.xl : spacing.md)};

  ${mediaQueries.tablet} {
    grid-template-columns: repeat(2, 1fr);
  }

  ${mediaQueries.mobile} {
    grid-template-columns: 1fr;
  }
`;

export const StatCard = styled.div`
  background: ${colors.background.tertiary};
  padding: ${spacing.md};
  border-radius: ${radius.lg};
  border: 1px solid ${colors.border};
  text-align: center;
  transition: ${transitions.hover};

  &:hover {
    border-color: ${colors.primary};
    box-shadow: ${shadows.elevated};
  }

  ${reducedMotion} {
    transition: none;
  }

  /* Dark Mode */
  [data-theme='dark'] & {
    background: ${colors.background.dark};
    border-color: #333333;
  }
`;

export const StatLabel = styled.div`
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-weight: 600;
  color: ${colors.text.secondary};
  margin-bottom: ${spacing.sm};
`;

export const StatValue = styled.div`
  font-size: 24px;
  font-weight: 700;
  color: ${colors.text.primary};
`;

// ==============================================================================
// OVERVIEW SECTION
// ==============================================================================

export const OverviewSection = styled.div`
  margin-top: ${radius.xl};
`;

export const OverviewHeading = styled.h2`
  font-size: 20px;
  font-weight: 600;
  margin: 0 0 ${radius.xl} 0;
  color: ${colors.text.primary};
`;

export const OverviewText = styled.p`
  color: ${colors.text.secondary};
  font-size: 14px;
  line-height: 1.6;
  max-width: 600px;
  margin: 0;
`;

// ==============================================================================
// METRICS SECTION
// ==============================================================================

export const MetricsSection = styled.div``;

export const MetricsSectionHeading = styled.h2`
  font-size: 20px;
  font-weight: 600;
  margin: 0 0 ${spacing.md} 0;
  color: ${colors.text.primary};
`;

export const MetricsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: ${spacing.md};

  ${mediaQueries.tablet} {
    grid-template-columns: repeat(2, 1fr);
  }

  ${mediaQueries.mobile} {
    grid-template-columns: 1fr;
  }
`;

export const LoadingSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.md};
`;

export const MetricCard = styled.div`
  background: linear-gradient(
    135deg,
    ${colors.background.tertiary} 0%,
    ${colors.primaryVeryLight} 100%
  );
  padding: 20px;
  border-radius: 10px;
  border: 1px solid ${colors.border};
  display: flex;
  flex-direction: column;
  gap: ${radius.xl};
  transition: ${transitions.hover};
  cursor: pointer;

  &:hover {
    transform: translateY(-4px);
    border-color: ${colors.primary};
    box-shadow: ${shadows.elevated};
  }

  ${reducedMotion} {
    transition: none;
    &:hover {
      transform: none;
    }
  }

  /* Dark Mode */
  [data-theme='dark'] & {
    background: linear-gradient(135deg, ${colors.background.dark} 0%, rgba(227, 30, 36, 0.04) 100%);
    border-color: #333333;
  }
`;

export const MetricLabel = styled.div`
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-weight: 600;
  color: ${colors.text.secondary};
`;

export const MetricValue = styled.div`
  font-size: 28px;
  font-weight: 700;
  color: ${colors.text.primary};
  line-height: 1;

  ${mediaQueries.mobile} {
    font-size: 24px;
  }
`;

export const MetricChange = styled.div<{ $trend?: 'up' | 'down' | 'stable' }>`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  font-weight: 600;
  color: ${props => {
    switch (props.$trend) {
      case 'up':
        return colors.success;
      case 'down':
        return colors.error;
      case 'stable':
      default:
        return colors.text.secondary;
    }
  }};

  svg {
    flex-shrink: 0;
  }
`;

// ==============================================================================
// ANALYTICS SECTION
// ==============================================================================

export const AnalyticsSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.lg};
  margin-top: ${spacing.md};
`;
