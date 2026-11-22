import styled from 'styled-components';
import { colors, radius, shadows, spacing, transitions, typography } from './tokens';

export const AdminUsers = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.lg};
`;

export const UsersTable = styled.div`
  background: ${colors.background.secondary};
  border-radius: ${radius.lg};
  overflow: auto;
  box-shadow: ${shadows.sm};

  table {
    width: 100%;
    min-width: 760px;
    border-collapse: collapse;

    thead {
      background: ${colors.background.tertiary};
    }

    th {
      padding: ${spacing.md};
      text-align: left;
      font-size: ${typography.sizes.xs};
      font-weight: ${typography.weights.semibold};
      color: ${colors.text.secondary};
      text-transform: uppercase;
      letter-spacing: 0.5px;
      border-bottom: 1px solid ${colors.border};
    }

    td {
      padding: ${spacing.md};
      border-bottom: 1px solid ${colors.border};
      font-size: ${typography.sizes.base};
      color: ${colors.text.primary};
    }

    tbody tr:hover {
      background: ${colors.background.tertiary};
    }
  }
`;

export const RoleBadge = styled.span<{ $role?: string }>`
  display: inline-block;
  padding: ${spacing.xs} ${radius.xl};
  border-radius: ${radius.xl};
  font-size: ${typography.sizes.xs};
  font-weight: ${typography.weights.semibold};
  background: ${props => {
    switch (props.$role) {
      case 'agent':
        return '#E3F2FD';
      case 'admin':
        return '#FCE4EC';
      default:
        return colors.background.tertiary;
    }
  }};
  color: ${props => {
    switch (props.$role) {
      case 'agent':
        return colors.info;
      case 'admin':
        return colors.error;
      default:
        return colors.text.secondary;
    }
  }};
`;

export const StatusBadge = styled.span<{ $status?: string }>`
  display: inline-block;
  padding: ${spacing.xs} ${radius.xl};
  border-radius: ${radius.xl};
  font-size: ${typography.sizes.xs};
  font-weight: ${typography.weights.semibold};
  background: ${props => (props.$status === 'active' ? '#E8F5E9' : '#FFEBEE')};
  color: ${props => (props.$status === 'active' ? colors.success : colors.error)};
`;

export const ActionBtn = styled.button<{ $danger?: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: ${spacing.sm} ${spacing.md};
  margin-right: ${spacing.xs};
  margin-bottom: ${spacing.xs};
  border: none;
  border-radius: ${radius.sm};
  font-size: ${typography.sizes.sm};
  font-weight: ${typography.weights.medium};
  cursor: pointer;
  background: ${props => (props.$danger ? '#FFEBEE' : '#E3F2FD')};
  color: ${props => (props.$danger ? colors.error : colors.info)};
  transition: ${transitions.hover};

  &:hover {
    background: ${props => (props.$danger ? '#FFCDD2' : '#BBDEFB')};
  }
`;
