import styled from 'styled-components';
import { colors, radius, shadows, spacing, transitions, typeSizes, typography } from './tokens';

export const AlertsSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.md};
`;

export const AlertsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const AlertItem = styled.div<{ $severity?: 'warning' | 'info' }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${radius.xl} ${spacing.md};
  background: ${props => (props.$severity === 'warning' ? '#FFF3E0' : '#E3F2FD')};
  border-left: 4px solid ${props => (props.$severity === 'warning' ? colors.warning : colors.info)};
  border-radius: ${radius.sm};
  cursor: pointer;
  transition: ${transitions.hover};

  &:hover {
    background: ${props => (props.$severity === 'warning' ? '#FFE0B2' : '#BBDEFB')};
  }
`;

export const AlertContent = styled.div`
  display: flex;
  align-items: center;
  gap: ${radius.xl};
  flex: 1;
`;

export const AlertMessage = styled.span`
  font-size: ${typeSizes.base};
  color: ${colors.text.primary};
  font-weight: ${typography.weights.medium};
`;

export const AlertStatus = styled.span<{ $status?: string }>`
  padding: 2px ${spacing.sm};
  border-radius: ${radius.xl};
  font-size: 11px;
  font-weight: ${typography.weights.semibold};
  text-transform: uppercase;
  background: ${props => (props.$status === 'active' ? 'rgba(227, 30, 36, 0.12)' : colors.border)};
  color: ${props => (props.$status === 'active' ? colors.primaryDark : '#616161')};
`;

export const AlertIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  flex-shrink: 0;
  color: ${colors.warning};
`;

export const AlertClose = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  background: none;
  border: none;
  font-size: ${typography.sizes.xl};
  cursor: pointer;
  color: ${colors.text.secondary};
  transition: color ${transitions.durations?.short || '0.2s'};
  flex-shrink: 0;

  &:hover {
    color: ${colors.text.primary};
  }
`;

export const ActivitySection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.md};
`;

export const ActivitiesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${radius.xl};
`;

export const ActivityItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${spacing.md};
  padding: ${radius.xl} ${spacing.md};
  background: ${colors.background.secondary};
  border-radius: ${radius.lg};
  border: 1px solid ${colors.border};
  transition: ${transitions.hover};

  &:hover {
    box-shadow: ${shadows.sm};
  }
`;

export const ActivityIcon = styled.div<{ type?: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: ${radius.full};
  background: ${props => {
    switch (props.type) {
      case 'create':
        return '#E8F5E9';
      case 'update':
        return '#E3F2FD';
      case 'download':
        return '#FFF3E0';
      case 'system':
        return '#F3E5F5';
      default:
        return colors.background.tertiary;
    }
  }};
  color: ${props => {
    switch (props.type) {
      case 'create':
        return colors.success;
      case 'update':
        return colors.info;
      case 'download':
        return colors.warning;
      case 'system':
        return '#9C27B0';
      default:
        return colors.text.secondary;
    }
  }};
  flex-shrink: 0;
`;

export const ActivityContent = styled.div`
  flex: 1;
`;

export const ActivityUser = styled.div`
  font-size: ${typography.sizes.sm};
  font-weight: ${typography.weights.semibold};
  color: ${colors.text.primary};
  margin-bottom: 2px;
`;

export const ActivityAction = styled.div`
  font-size: ${typography.sizes.sm};
  color: ${colors.text.secondary};
`;

export const ActivityTime = styled.div`
  font-size: ${typography.sizes.xs};
  color: ${colors.text.tertiary};
  white-space: nowrap;
`;
