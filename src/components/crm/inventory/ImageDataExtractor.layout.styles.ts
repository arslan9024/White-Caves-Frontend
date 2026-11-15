import styled, { keyframes } from 'styled-components';
import { transitions } from '../../../styles/theme/transitions';
import { typography } from '../../../styles/theme/typography';
import { radius } from '../../../styles/theme/radius';
import { spacing } from '../../../styles/theme/spacing';

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const ImageExtractorContainer = styled.div`
  background: var(--bg-secondary);
  border-radius: ${radius.xl};
  padding: ${spacing.lg};
  border: 1px solid var(--border-color);
`;

export const ExtractorHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  flex-wrap: wrap;
  gap: ${spacing.md};

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const HeaderInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;

  svg {
    color: #f59e0b;
  }
`;

export const HeaderTitle = styled.h3`
  margin: 0;
  font-size: 1.1rem;
  color: var(--text-primary);
`;

export const HeaderSubtext = styled.span`
  font-size: 0.85rem;
  color: var(--text-muted);
`;

export const HeaderActions = styled.div`
  display: flex;
  gap: ${spacing.sm};
`;

export const ActionBtn = styled.button<{ $danger?: boolean }>`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  border: 1px solid var(--border-color);
  background: var(--bg-tertiary);
  border-radius: ${radius.lg};
  cursor: pointer;
  font-size: 0.85rem;
  color: ${props => (props.$danger ? '#ef4444' : 'var(--text-primary)')};
  transition: ${transitions.hover};
  border-color: ${props => (props.$danger ? 'rgba(239, 68, 68, 0.3)' : 'var(--border-color)')};

  &:hover {
    background: ${props => (props.$danger ? 'rgba(239, 68, 68, 0.1)' : 'var(--bg-hover)')};
  }
`;

export const DropZone = styled.div<{ $active?: boolean; $processing?: boolean }>`
  border: 2px dashed var(--border-color);
  border-radius: ${radius.xl};
  padding: 48px;
  text-align: center;
  cursor: pointer;
  transition: ${transitions.all};
  background: var(--bg-tertiary);
  border-color: ${props => (props.$active ? '#f59e0b' : 'var(--border-color)')};
  background: ${props => (props.$active ? 'rgba(245, 158, 11, 0.1)' : 'var(--bg-tertiary)')};
  transform: ${props => (props.$active ? 'scale(1.01)' : 'scale(1)')};
  pointer-events: ${props => (props.$processing ? 'none' : 'auto')};

  &:hover {
    border-color: #f59e0b;
    background: rgba(245, 158, 11, 0.05);
  }

  svg {
    color: var(--text-muted);
    margin-bottom: 12px;
  }

  h4 {
    margin: 0 0 8px;
    color: var(--text-primary);
  }

  p {
    margin: 0;
    color: var(--text-muted);
    font-size: 0.85rem;
  }

  @media (max-width: 768px) {
    padding: 32px 16px;
  }
`;

export const ProcessingState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;

  svg {
    color: #f59e0b;
    animation: ${spin} 1s linear infinite;
  }
`;

export const UploadedFiles = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${spacing.sm};
  margin-top: 16px;
`;

export const FileChip = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  background: var(--bg-tertiary);
  border: 1px solid var(--border-color);
  border-radius: 20px;
  font-size: 0.8rem;
  color: var(--text-secondary);

  svg {
    color: #22c55e;
  }
`;

export const ExtractedResults = styled.div`
  margin-top: 24px;

  h4 {
    margin: 0 0 16px;
    color: var(--text-primary);
    font-size: 1rem;
  }
`;

export const ResultCard = styled.div`
  background: var(--bg-primary);
  border: 1px solid var(--border-color);
  border-radius: 10px;
  margin-bottom: 16px;
  overflow: hidden;
`;

export const ResultHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  background: var(--bg-tertiary);
  border-bottom: 1px solid var(--border-color);
`;

export const ResultSource = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.sm};
  font-weight: ${typography.weights.medium};
  color: var(--text-primary);
`;
