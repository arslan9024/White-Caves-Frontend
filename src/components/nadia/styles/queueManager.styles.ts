/**
 * NADIA Components - Queue Manager, Loading & Error Styles
 */

import styled, { css } from 'styled-components';
import { tokens, typography } from './tokens';

/**
 * Right Sidebar - Queue Manager
 */
export const QueueManagerContainer = styled.div`
  display: flex;
  flex-direction: column;
  background: ${tokens.colors.surface.primary};
  border: 1px solid ${tokens.colors.border.subtle};
  border-radius: ${tokens.borderRadius.lg};
  box-shadow: ${tokens.shadows.sm};
  overflow: hidden;

  @media (max-width: 768px) {
    grid-column: 1 / -1;
    height: auto;
    max-height: 300px;
  }
`;

export const QueueManagerHeader = styled.div`
  padding: ${tokens.spacing.md};
  border-bottom: 1px solid ${tokens.colors.border.subtle};
  background: ${tokens.colors.surface.secondary};

  h3 {
    margin: 0 0 ${tokens.spacing.md} 0;
    font-size: ${typography.sizes.base};
    font-weight: ${typography.weights.semibold};
    color: ${tokens.colors.text.primary};
  }
`;

export const QueueStats = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${tokens.spacing.sm};
`;

export const StatItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: ${typography.sizes.xs};
  padding: ${tokens.spacing.sm} 0;

  span:first-child {
    color: ${tokens.colors.text.secondary};
  }

  span:last-child {
    color: ${tokens.colors.text.primary};
    font-weight: ${typography.weights.semibold};
  }
`;

export const QueueManagerScroll = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: ${tokens.spacing.md};

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: ${tokens.colors.border.light};
    border-radius: 3px;

    &:hover {
      background: ${tokens.colors.border.dark};
    }
  }
`;

export const QueueItemContainer = styled.div`
  background: ${tokens.colors.surface.secondary};
  padding: ${tokens.spacing.md};
  border-radius: ${tokens.borderRadius.md};
  margin-bottom: ${tokens.spacing.md};
  display: flex;
  flex-direction: column;
  gap: ${tokens.spacing.sm};

  &:last-child {
    margin-bottom: 0;
  }
`;

export const QueueItemHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: ${tokens.spacing.sm};
`;

export const QueueItemName = styled.p`
  margin: 0;
  font-size: ${typography.sizes.sm};
  font-weight: ${typography.weights.semibold};
  color: ${tokens.colors.text.primary};
`;

export const QueueItemMeta = styled.p`
  margin: 0;
  font-size: 11px;
  color: ${tokens.colors.text.tertiary};
`;

export const PriorityBadge = styled.span<{ priority: string }>`
  display: inline-block;
  padding: 2px 6px;
  border-radius: 3px;
  font-size: 10px;
  font-weight: ${typography.weights.semibold};
  text-transform: uppercase;

  ${props => {
    switch (props.priority) {
      case 'URGENT':
        return css`
          background: #fee2e2;
          color: #991b1b;
        `;
      case 'HIGH':
        return css`
          background: #fef3c7;
          color: #92400e;
        `;
      case 'NORMAL':
        return css`
          background: #dbeafe;
          color: #1e40af;
        `;
      default:
        return css`
          background: #f3f4f6;
          color: #6b7280;
        `;
    }
  }}
`;

export const AssignAgentForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${tokens.spacing.sm};
`;

export const AssignAgentInput = styled.input`
  padding: ${tokens.spacing.sm} ${tokens.spacing.md};
  border: 1px solid ${tokens.colors.border.light};
  border-radius: ${tokens.borderRadius.md};
  background: ${tokens.colors.surface.primary};
  color: ${tokens.colors.text.primary};
  font-size: ${typography.sizes.xs};
  transition: border-color ${tokens.transitions.fast};

  &:focus {
    outline: none;
    border-color: ${tokens.colors.primary};
    box-shadow: 0 0 0 3px ${tokens.colors.primary}10;
  }
`;

export const AssignButtonSmall = styled.button`
  padding: ${tokens.spacing.sm} ${tokens.spacing.md};
  background: ${tokens.colors.secondary};
  color: white;
  border: none;
  border-radius: ${tokens.borderRadius.md};
  font-size: ${typography.sizes.xs};
  font-weight: ${typography.weights.semibold};
  cursor: pointer;
  transition: all ${tokens.transitions.fast};

  &:hover:not(:disabled) {
    background: ${tokens.colors.secondary}dd;
  }

  &:disabled {
    background: ${tokens.colors.border.light};
    cursor: not-allowed;
  }
`;

/**
 * Loading & Error States
 */
export const LoadingSpinner = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${tokens.spacing.md};
  padding: ${tokens.spacing.lg};

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  &::before {
    content: '';
    width: 20px;
    height: 20px;
    border: 3px solid ${tokens.colors.border.light};
    border-top-color: ${tokens.colors.primary};
    border-radius: 50%;
    animation: spin 0.6s linear infinite;
  }
`;

export const ErrorAlert = styled.div`
  padding: ${tokens.spacing.md};
  background: #fee2e2;
  color: #991b1b;
  border: 1px solid #fecaca;
  border-radius: ${tokens.borderRadius.md};
  font-size: ${typography.sizes.sm};
  display: flex;
  gap: ${tokens.spacing.sm};
  align-items: flex-start;

  button {
    margin-left: auto;
    background: transparent;
    border: none;
    color: inherit;
    cursor: pointer;
    font-size: ${typography.sizes.base};
    padding: 0;
  }
`;
