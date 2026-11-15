import styled from 'styled-components';
import { transitions } from '../../../styles/theme/transitions';
import { typography } from '../../../styles/theme/typography';
import { radius } from '../../../styles/theme/radius';
import { spacing } from '../../../styles/theme/spacing';

export const PreviewBtn = styled.button`
  padding: ${spacing.xs};
  border: none;
  background: transparent;
  color: var(--text-muted);
  cursor: pointer;
  border-radius: ${radius.sm};
  transition: ${transitions.hover};

  &:hover {
    background: var(--bg-hover);
    color: #f59e0b;
  }
`;

export const ResultActions = styled.div`
  display: flex;
  gap: ${spacing.xs};

  button {
    padding: 6px;
    border: none;
    background: transparent;
    color: var(--text-muted);
    cursor: pointer;
    border-radius: ${radius.sm};
    transition: ${transitions.hover};

    &:hover {
      background: var(--bg-hover);
      color: var(--text-primary);
    }
  }
`;

export const ResultData = styled.div`
  padding: ${spacing.md};
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const DataField = styled.div`
  label {
    display: block;
    font-size: 0.75rem;
    text-transform: uppercase;
    color: var(--text-muted);
    margin-bottom: 6px;
    letter-spacing: 0.5px;
  }
`;

export const FieldValues = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${spacing.sm};
`;

export const ValueChip = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  background: var(--bg-tertiary);
  border: 1px solid var(--border-color);
  border-radius: ${radius.md};
  font-size: 0.85rem;
  color: var(--text-primary);

  input {
    background: transparent;
    border: none;
    color: var(--text-primary);
    font-size: 0.85rem;
    width: 150px;
    outline: none;
  }

  &:hover .edit-btn {
    opacity: 1;
  }
`;

export const EditBtn = styled.button`
  padding: 2px;
  border: none;
  background: transparent;
  color: var(--text-muted);
  cursor: pointer;
  opacity: 0.5;
  transition: opacity 0.2s;

  &:hover {
    color: #f59e0b;
  }
`;

export const ImportSection = styled.div`
  margin-top: 24px;
  padding: ${spacing.md};
  background: rgba(245, 158, 11, 0.1);
  border: 1px solid rgba(245, 158, 11, 0.3);
  border-radius: 10px;
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;

  svg {
    color: #f59e0b;
  }

  span {
    flex: 1;
    font-size: 0.9rem;
    color: var(--text-secondary);
  }

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

export const ImportBtn = styled.button`
  padding: 10px 24px;
  background: #f59e0b;
  border: none;
  border-radius: ${radius.lg};
  color: white;
  font-weight: ${typography.weights.semibold};
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: #d97706;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const ImagePreviewModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.9);
  z-index: var(--z-fullscreen, 700);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
`;

export const PreviewContent = styled.div`
  position: relative;
  max-width: 90%;
  max-height: 90%;

  img {
    max-width: 100%;
    max-height: 80vh;
    border-radius: ${radius.lg};
  }
`;

export const ClosePreviewBtn = styled.button`
  position: absolute;
  top: -40px;
  right: 0;
  background: transparent;
  border: none;
  color: white;
  cursor: pointer;
  padding: ${spacing.sm};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.2s;

  &:hover {
    color: #f59e0b;
  }
`;
