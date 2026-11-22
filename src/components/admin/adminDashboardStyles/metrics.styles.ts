import styled from 'styled-components';
import {
  colors,
  mediaQueries,
  radius,
  reducedMotion,
  shadows,
  spacing,
  transitions,
  typeSizes,
  typeWeights,
} from './tokens';

export const MetricsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;

  ${mediaQueries.mobile} {
    grid-template-columns: 1fr;
  }
`;

export const MetricCard = styled.div`
  background: ${colors.background.secondary};
  border-radius: ${radius.xl};
  padding: 20px;
  box-shadow: ${shadows.xs};
  transition: ${transitions.hover};
  border: 1px solid ${colors.border};

  &:hover {
    box-shadow: ${shadows.md};
    transform: translateY(-2px);
  }

  ${reducedMotion} {
    transition: none;
    &:hover {
      transform: none;
    }
  }
`;

export const MetricHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${radius.xl};
  margin-bottom: ${spacing.md};
  color: ${colors.primary};

  svg {
    flex-shrink: 0;
  }
`;

export const MetricTitle = styled.span`
  font-size: ${typeSizes.sm};
  font-weight: ${typeWeights.medium};
  color: ${colors.text.secondary};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const MetricValue = styled.div`
  font-size: ${typeSizes.display};
  font-weight: ${typeWeights.bold};
  color: ${colors.text.primary};
  margin-bottom: ${spacing.xs};
`;

export const MetricSubtext = styled.div`
  font-size: ${typeSizes.sm};
  color: ${colors.text.tertiary};
  margin-bottom: ${radius.xl};
`;

export const MetricBar = styled.div`
  height: 4px;
  background: ${colors.border};
  border-radius: ${radius.xs};
  overflow: hidden;
`;

export const MetricBarFill = styled.div<{ $color?: string }>`
  height: 100%;
  background: ${props => props.$color || colors.primary};
  border-radius: ${radius.xs};
  transition: width ${transitions.durations.standard} ${transitions.easing.easeInOut};
`;

export const MetricStatus = styled.div<{ $status?: string }>`
  font-size: ${typeSizes.xl};
  font-weight: ${typeWeights.bold};
  color: ${props => {
    switch (props.$status) {
      case 'excellent':
        return colors.success;
      case 'good':
        return colors.info;
      case 'warning':
        return colors.warning;
      default:
        return colors.error;
    }
  }};
  margin-bottom: ${radius.xl};
`;

export const MetricDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.sm};
`;

export const DetailItem = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: ${typeSizes.xs};
  color: ${colors.text.secondary};
`;

export const DetailValue = styled.span`
  font-weight: ${typeWeights.semibold};
  color: ${colors.text.primary};
`;
