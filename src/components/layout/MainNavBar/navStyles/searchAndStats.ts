import styled from 'styled-components';
import { theme } from '../../../../styles/theme';
import { spacing } from '../../../../styles/theme/spacing';

/* ===============================================
   QUICK STATS BAR
   =============================================== */

export const QuickStatsBar = styled.div`
  display: flex;
  flex-direction: row;
  gap: ${theme.spacing.sm};
  align-items: center;
  padding: ${theme.spacing.sm};
  background: ${theme.colors.background.tertiary};
  border-radius: 8px;

  @media (prefers-color-scheme: dark) {
    background: rgba(255, 255, 255, 0.05);
  }
`;

export const StatItem = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: ${theme.spacing.xs};
  font-size: 12px;
  color: ${theme.colors.text.secondary};

  svg {
    color: ${theme.colors.primary};
    flex-shrink: 0;
  }
`;

export const StatLabel = styled.span`
  font-weight: 500;
  color: ${theme.colors.text.secondary};
`;

export const StatValue = styled.span<{ $status?: 'good' | 'warning' | 'critical' }>`
  font-weight: 600;
  color: ${props => {
    switch (props.$status) {
      case 'good':
        return '#4caf50';
      case 'warning':
        return '#ff9800';
      case 'critical':
        return '#f44336';
      default:
        return theme.colors.text.primary;
    }
  }};
`;

/* ===============================================
   SEARCH BAR
   =============================================== */

export const SearchContainer = styled.div<{ $focused?: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: ${theme.spacing.sm};
  background: ${theme.colors.background.tertiary};
  border: 1px solid transparent;
  border-radius: 8px;
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  transition: all 0.2s ease;

  @media (prefers-color-scheme: dark) {
    background: rgba(255, 255, 255, 0.08);
  }

  ${props =>
    props.$focused &&
    `
    background: ${theme.colors.background.secondary};
    border-color: ${theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(227, 30, 36, 0.15);

    @media (prefers-color-scheme: dark) {
      background: rgba(255, 255, 255, 0.12);
      border-color: ${theme.colors.primary};
    }
  `}
`;

export const SearchIcon = styled.div`
  color: ${theme.colors.text.secondary};
  flex-shrink: 0;
  display: flex;
  align-items: center;
`;

export const SearchInput = styled.input`
  flex: 1;
  border: none;
  background: transparent;
  font-size: 14px;
  color: ${theme.colors.text.primary};
  outline: none;
  min-width: 200px;

  &::placeholder {
    color: ${theme.colors.text.tertiary};
  }

  @media (prefers-color-scheme: dark) {
    color: #ffffff;

    &::placeholder {
      color: rgba(255, 255, 255, 0.5);
    }
  }
`;

export const SearchShortcut = styled.div`
  display: flex;
  gap: ${spacing.xs};

  @media (max-width: 768px) {
    display: none;
  }
`;

export const ShortcutKey = styled.kbd`
  font-size: 11px;
  font-family: ${theme.typography.fontFamily.primary};
  background: ${theme.colors.background.secondary};
  border: 1px solid ${theme.colors.border};
  border-radius: 4px;
  padding: 2px 6px;
  color: ${theme.colors.text.secondary};

  @media (prefers-color-scheme: dark) {
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(255, 255, 255, 0.2);
    color: rgba(255, 255, 255, 0.6);
  }
`;
