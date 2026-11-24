import styled, { keyframes } from 'styled-components';
import { typography } from '../../../styles/theme/typography';
import { theme } from '../../../styles/theme';

export * from './DamacAssetFetcherGrid.styles';

const { colors, transitions, radius, spacing } = theme;

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

export const DamacFetcherContainer = styled.div`
  background: var(--bg-secondary);
  border-radius: ${radius.xl};
  padding: ${spacing.lg};
  border: 1px solid var(--border-color);

  @media (prefers-color-scheme: dark) {
    background: #1e1e2e;
    border-color: #333333;
  }
`;

export const FetcherHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  flex-wrap: wrap;
  gap: 12px;
`;

export const HeaderInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;

  svg {
    color: ${colors.primary};
    flex-shrink: 0;
  }

  h3 {
    margin: 0;
    font-size: 1.1rem;
    color: var(--text-primary);
  }

  span {
    font-size: 0.85rem;
    color: var(--text-muted);
  }

  @media (prefers-color-scheme: dark) {
    h3 {
      color: #e2e8f0;
    }
    span {
      color: #94a3b8;
    }
  }
`;

export const ViewToggle = styled.div`
  display: flex;
  gap: ${spacing.xs};
  background: var(--bg-tertiary);
  padding: ${spacing.xs};
  border-radius: ${radius.lg};

  @media (prefers-color-scheme: dark) {
    background: #333333;
  }
`;

export const ViewToggleButton = styled.button<{ $active?: boolean }>`
  padding: ${spacing.sm};
  border: none;
  background: ${props => (props.$active ? 'var(--bg-primary)' : 'transparent')};
  border-radius: ${radius.md};
  cursor: pointer;
  color: ${props => (props.$active ? colors.primary : 'var(--text-muted)')};
  transition: ${transitions.hover};

  &:hover {
    color: ${colors.primary};
  }

  @media (prefers-color-scheme: dark) {
    background: ${props => (props.$active ? '#2a2a3e' : 'transparent')};
  }
`;

export const FetcherInputs = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${spacing.md};
  margin-bottom: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.sm};
`;

export const InputLabel = styled.label`
  font-size: 0.85rem;
  font-weight: ${typography.weights.medium};
  color: var(--text-secondary);
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (prefers-color-scheme: dark) {
    color: #a0aec0;
  }
`;

export const AutoFillButton = styled.button`
  font-size: 0.75rem;
  padding: 4px 8px;
  border: 1px solid var(--border-color);
  background: var(--bg-tertiary);
  border-radius: ${radius.sm};
  cursor: pointer;
  color: ${colors.primary};
  display: flex;
  align-items: center;
  gap: ${spacing.xs};
  transition: ${transitions.hover};

  &:hover {
    background: rgba(227, 30, 36, 0.1);
  }

  @media (prefers-color-scheme: dark) {
    background: #333333;
    border-color: #444444;

    &:hover {
      background: rgba(227, 30, 36, 0.15);
    }
  }
`;

export const TextArea = styled.textarea`
  padding: 12px;
  border: 1px solid var(--border-color);
  border-radius: ${radius.lg};
  background: var(--bg-primary);
  color: var(--text-primary);
  font-family: ${typography.fontFamily.mono};
  font-size: 0.9rem;
  resize: vertical;
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: ${colors.primary};
    box-shadow: 0 0 0 3px rgba(227, 30, 36, 0.1);
  }

  &::placeholder {
    color: var(--text-muted);
    opacity: 0.6;
  }

  @media (prefers-color-scheme: dark) {
    background: #1a1a2e;
    border-color: #333333;
    color: #e2e8f0;
  }
`;

export const FetcherActions = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 20px;
  flex-wrap: wrap;
`;

export const FetchButton = styled.button<{ $variant?: 'primary' | 'danger' | 'default' }>`
  display: flex;
  align-items: center;
  gap: ${spacing.sm};
  padding: 10px 20px;
  border: 1px solid var(--border-color);
  background: ${props => {
    switch (props.$variant) {
      case 'primary':
        return colors.primary;
      case 'danger':
        return 'transparent';
      default:
        return 'var(--bg-tertiary)';
    }
  }};
  border-radius: ${radius.lg};
  cursor: pointer;
  font-size: 0.9rem;
  color: ${props => {
    switch (props.$variant) {
      case 'primary':
        return 'white';
      case 'danger':
        return colors.error;
      default:
        return 'var(--text-primary)';
    }
  }};
  border-color: ${props => {
    switch (props.$variant) {
      case 'primary':
        return colors.primary;
      case 'danger':
        return 'rgba(239, 68, 68, 0.3)';
      default:
        return 'var(--border-color)';
    }
  }};
  transition: ${transitions.hover};

  &:hover:not(:disabled) {
    ${props => {
      switch (props.$variant) {
        case 'primary':
          return `background: ${colors.primaryDark};`;
        case 'danger':
          return 'background: rgba(239, 68, 68, 0.1);';
        default:
          return 'background: var(--bg-hover);';
      }
    }}
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  @media (prefers-color-scheme: dark) {
    background: ${props => {
      switch (props.$variant) {
        case 'primary':
          return colors.primary;
        case 'danger':
          return 'transparent';
        default:
          return '#333333';
      }
    }};

    &:hover:not(:disabled) {
      ${props => {
        switch (props.$variant) {
          case 'primary':
            return `background: ${colors.primaryDark};`;
          case 'danger':
            return 'background: rgba(239, 68, 68, 0.15);';
          default:
            return 'background: #444444;';
        }
      }}
    }
  }
`;

export const SpinningIcon = styled.svg`
  animation: ${spin} 1s linear infinite;
`;
