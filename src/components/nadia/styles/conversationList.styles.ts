/**
 * NADIA Components - Dashboard Layout & Conversation List Styles
 */

import styled, { css } from 'styled-components';
import { radius, tokens, typography } from './tokens';

/**
 * Main Dashboard Container
 */
export const NADIADashboardContainer = styled.div`
  display: grid;
  grid-template-columns: 300px 1fr 320px;
  height: 100vh;
  gap: ${tokens.spacing.md};
  background: ${tokens.colors.background.primary};
  padding: ${tokens.spacing.md};
  overflow: hidden;

  @media (max-width: 1200px) {
    grid-template-columns: 280px 1fr 300px;
    gap: ${tokens.spacing.sm};
    padding: ${tokens.spacing.sm};
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr auto;
    height: auto;
  }
`;

/**
 * Left Sidebar - Conversation List
 */
export const ConversationListContainer = styled.div`
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

export const ConversationListHeader = styled.div`
  padding: ${tokens.spacing.md};
  border-bottom: 1px solid ${tokens.colors.border.subtle};
  background: ${tokens.colors.surface.secondary};
  display: flex;
  justify-content: space-between;
  align-items: center;

  h2 {
    margin: 0;
    font-size: ${typography.sizes.base};
    font-weight: ${typography.weights.semibold};
    color: ${tokens.colors.text.primary};
  }
`;

export const ConversationListScroll = styled.div`
  flex: 1;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: ${tokens.colors.border.light};
    border-radius: ${radius.sm};

    &:hover {
      background: ${tokens.colors.border.dark};
    }
  }
`;

export const ConversationListItem = styled.div<{ isSelected?: boolean }>`
  padding: ${tokens.spacing.md};
  cursor: pointer;
  border-bottom: 1px solid ${tokens.colors.border.subtle};
  transition: background-color ${tokens.transitions.fast};

  ${props =>
    props.isSelected &&
    css`
      background-color: ${tokens.colors.primary}15;
      border-left: 4px solid ${tokens.colors.primary};
      padding-left: calc(${tokens.spacing.md} - 4px);
    `}

  &:hover {
    background-color: ${tokens.colors.surface.secondary};
  }

  &:last-child {
    border-bottom: none;
  }
`;

export const ConversationItemHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: ${tokens.spacing.sm};
`;

export const ConversationItemName = styled.p`
  margin: 0;
  font-weight: ${typography.weights.semibold};
  font-size: ${typography.sizes.base};
  color: ${tokens.colors.text.primary};
`;

export const ConversationItemInfo = styled.p`
  margin: 0;
  font-size: ${typography.sizes.xs};
  color: ${tokens.colors.text.tertiary};
`;

export const StatusBadge = styled.span<{ status: string }>`
  display: inline-block;
  padding: 2px 8px;
  border-radius: ${tokens.borderRadius.sm};
  font-size: 11px;
  font-weight: ${typography.weights.semibold};
  text-transform: uppercase;

  ${props => {
    switch (props.status) {
      case 'ACTIVE':
        return css`
          background-color: #dcfce7;
          color: #166534;
        `;
      case 'PENDING':
        return css`
          background-color: #fef3c7;
          color: #92400e;
        `;
      case 'CLOSED':
        return css`
          background-color: #f3f4f6;
          color: #6b7280;
        `;
      case 'SPAM':
        return css`
          background-color: #fee2e2;
          color: #991b1b;
        `;
      default:
        return css`
          background-color: ${tokens.colors.surface.secondary};
          color: ${tokens.colors.text.primary};
        `;
    }
  }}
`;

export const LeadScoreBar = styled.div`
  display: flex;
  align-items: center;
  gap: ${tokens.spacing.sm};
  font-size: ${typography.sizes.xs};
  color: ${tokens.colors.text.secondary};
`;

export const ScoreBarFill = styled.div<{ score: number }>`
  width: 100px;
  height: 4px;
  background: ${tokens.colors.border.subtle};
  border-radius: 2px;
  overflow: hidden;

  &::after {
    content: '';
    display: block;
    height: 100%;
    width: ${props => props.score}%;
    background: ${props =>
      props.score >= 75
        ? tokens.colors.success
        : props.score >= 50
          ? tokens.colors.warning
          : tokens.colors.danger};
    transition: width ${tokens.transitions.base};
  }
`;

export const UnreadBadge = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  background-color: ${tokens.colors.danger};
  color: white;
  border-radius: 50%;
  font-size: ${typography.sizes.xs};
  font-weight: ${typography.weights.semibold};
`;
