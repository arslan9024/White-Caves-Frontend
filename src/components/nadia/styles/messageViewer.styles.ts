/**
 * NADIA Components - Message Viewer & Message Input Styles
 */

import styled from 'styled-components';
import { radius, tokens, typography } from './tokens';

/**
 * Center Pane - Message Viewer
 */
export const MessageViewerContainer = styled.div`
  display: flex;
  flex-direction: column;
  background: ${tokens.colors.surface.primary};
  border: 1px solid ${tokens.colors.border.subtle};
  border-radius: ${tokens.borderRadius.lg};
  box-shadow: ${tokens.shadows.sm};
  overflow: hidden;

  @media (max-width: 768px) {
    grid-column: 1 / -1;
  }
`;

export const MessageViewerHeader = styled.div`
  padding: ${tokens.spacing.md};
  border-bottom: 1px solid ${tokens.colors.border.subtle};
  background: ${tokens.colors.surface.secondary};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const MessageViewerHeaderContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${tokens.spacing.xs};

  h3 {
    margin: 0;
    font-size: ${typography.sizes.base};
    font-weight: ${typography.weights.semibold};
    color: ${tokens.colors.text.primary};
  }

  p {
    margin: 0;
    font-size: ${typography.sizes.sm};
    color: ${tokens.colors.text.secondary};
  }
`;

export const MessageViewerContent = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: ${tokens.spacing.lg};
  display: flex;
  flex-direction: column;
  gap: ${tokens.spacing.md};

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

export const MessageBubble = styled.div<{ sender: 'CUSTOMER' | 'AGENT' }>`
  display: flex;
  flex-direction: ${props => (props.sender === 'CUSTOMER' ? 'row' : 'row-reverse')};
  align-items: flex-end;
  gap: ${tokens.spacing.sm};
`;

export const MessageContent = styled.div<{ sender: 'CUSTOMER' | 'AGENT' }>`
  max-width: 70%;
  background: ${props =>
    props.sender === 'CUSTOMER' ? tokens.colors.primary : tokens.colors.surface.secondary};
  color: ${props => (props.sender === 'CUSTOMER' ? 'white' : tokens.colors.text.primary)};
  padding: ${tokens.spacing.md};
  border-radius: ${tokens.borderRadius.lg};
  word-break: break-word;
  box-shadow: ${tokens.shadows.sm};

  @media (max-width: 768px) {
    max-width: 85%;
  }
`;

export const MessageMetadata = styled.div`
  font-size: ${typography.sizes.xs};
  color: ${tokens.colors.text.tertiary};
  display: flex;
  gap: ${tokens.spacing.sm};
  align-items: center;
  margin-top: ${tokens.spacing.xs};
`;

export const SentimentBadge = styled.span<{ sentiment?: string }>`
  display: inline-flex;
  align-items: center;
  gap: ${tokens.spacing.xs};
  padding: 2px 8px;
  background: ${props => {
    switch (props.sentiment) {
      case 'POSITIVE':
        return '#dcfce7';
      case 'NEGATIVE':
        return '#fee2e2';
      default:
        return '#f3f4f6';
    }
  }};
  color: ${props => {
    switch (props.sentiment) {
      case 'POSITIVE':
        return '#166534';
      case 'NEGATIVE':
        return '#991b1b';
      default:
        return '#6b7280';
    }
  }};
  border-radius: ${tokens.borderRadius.sm};
  font-size: 11px;
  font-weight: ${typography.weights.medium};
`;

export const EmptyState = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: ${tokens.colors.text.tertiary};
  text-align: center;
  padding: ${tokens.spacing.lg};

  p {
    margin: 0;
    font-size: ${typography.sizes.base};
  }
`;

/**
 * Message Input
 */
export const MessageInputContainer = styled.div`
  padding: ${tokens.spacing.md};
  border-top: 1px solid ${tokens.colors.border.subtle};
  background: ${tokens.colors.surface.secondary};
  display: flex;
  flex-direction: column;
  gap: ${tokens.spacing.sm};
`;

export const MessageInputControls = styled.div`
  display: flex;
  gap: ${tokens.spacing.sm};
  align-items: center;
`;

export const MessageTypeSelect = styled.select`
  padding: ${tokens.spacing.sm} ${tokens.spacing.md};
  border: 1px solid ${tokens.colors.border.light};
  border-radius: ${tokens.borderRadius.md};
  background: ${tokens.colors.surface.primary};
  color: ${tokens.colors.text.primary};
  font-size: ${typography.sizes.sm};
  cursor: pointer;
  transition: border-color ${tokens.transitions.fast};

  &:hover {
    border-color: ${tokens.colors.border.dark};
  }

  &:focus {
    outline: none;
    border-color: ${tokens.colors.primary};
    box-shadow: 0 0 0 3px ${tokens.colors.primary}10;
  }
`;

export const MessageTextarea = styled.textarea`
  padding: ${tokens.spacing.md};
  border: 1px solid ${tokens.colors.border.light};
  border-radius: ${tokens.borderRadius.md};
  background: ${tokens.colors.surface.primary};
  color: ${tokens.colors.text.primary};
  font-family: inherit;
  font-size: ${typography.sizes.base};
  resize: none;
  max-height: 150px;
  transition: border-color ${tokens.transitions.fast};

  &:hover {
    border-color: ${tokens.colors.border.dark};
  }

  &:focus {
    outline: none;
    border-color: ${tokens.colors.primary};
    box-shadow: 0 0 0 3px ${tokens.colors.primary}10;
  }

  &:disabled {
    background: ${tokens.colors.surface.secondary};
    cursor: not-allowed;
  }
`;

export const MessageInputFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const CharCount = styled.span<{ isWarning?: boolean }>`
  font-size: ${typography.sizes.xs};
  color: ${props => (props.isWarning ? tokens.colors.warning : tokens.colors.text.tertiary)};
`;

export const SendButton = styled.button`
  padding: ${tokens.spacing.sm} ${tokens.spacing.lg};
  background: ${tokens.colors.primary};
  color: white;
  border: none;
  border-radius: ${tokens.borderRadius.md};
  font-size: ${typography.sizes.base};
  font-weight: ${typography.weights.semibold};
  cursor: pointer;
  transition: all ${tokens.transitions.fast};

  &:hover:not(:disabled) {
    background: ${tokens.colors.primary}dd;
    box-shadow: ${tokens.shadows.md};
  }

  &:active:not(:disabled) {
    transform: scale(0.98);
  }

  &:disabled {
    background: ${tokens.colors.border.light};
    cursor: not-allowed;
  }
`;
