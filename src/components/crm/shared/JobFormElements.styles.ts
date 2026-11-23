import styled from 'styled-components';
import { theme } from '../../../styles/theme';

const { transitions, radius, typography } = theme;

/* ============================================================================
 * Job Form Elements, Fields, & Actions Styled Components
 * ============================================================================ */

export const JobForm = styled.form`
  padding: 1.5rem;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

export const FormSection = styled.div`
  margin-bottom: 1.5rem;

  &:last-child {
    margin-bottom: 0;
  }

  h4 {
    color: #fff;
    font-size: 0.9375rem;
    font-weight: ${typography.weights.semibold};
    margin: 0 0 1rem 0;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }

  @media (max-width: 768px) {
    margin-bottom: 1.25rem;

    h4 {
      font-size: 0.875rem;
    }
  }
`;

export const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const FormField = styled.div<{ $span2?: boolean; $hasError?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
  grid-column: ${props => (props.$span2 ? 'span 2' : 'span 1')};

  @media (max-width: 768px) {
    grid-column: span 1;
  }

  label {
    color: #94a3b8;
    font-size: 0.8125rem;
    font-weight: ${typography.weights.medium};
  }

  .required {
    color: #ef4444;
    margin-left: 2px;
  }

  input,
  select,
  textarea {
    padding: 0.625rem 0.75rem;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid ${props => (props.$hasError ? '#ef4444' : 'rgba(255, 255, 255, 0.1)')};
    border-radius: ${radius.md};
    color: #fff;
    font-size: 0.875rem;
    font-family: inherit;
    transition: ${transitions.hover};

    &:focus {
      outline: none;
      border-color: #f59e0b;
      background: rgba(255, 255, 255, 0.08);
    }

    &::placeholder {
      color: #64748b;
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }

  textarea {
    resize: vertical;
    min-height: 80px;
    max-height: 200px;
  }

  select {
    cursor: pointer;
    appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='%2394a3b8'%3E%3Cpath fill-rule='evenodd' d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z' clip-rule='evenodd'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 0.5rem center;
    background-size: 1.25rem;
    padding-right: 2rem;
  }
`;

export const InputWithIcon = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.625rem 0.75rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: ${radius.md};
  transition: ${transitions.hover};

  &:focus-within {
    border-color: #f59e0b;
    background: rgba(255, 255, 255, 0.08);
  }

  svg {
    color: #64748b;
    flex-shrink: 0;
    width: 18px;
    height: 18px;
  }

  input {
    flex: 1;
    background: transparent;
    border: none;
    padding: 0;
    color: #fff;
    font-size: 0.875rem;

    &:focus {
      outline: none;
    }

    &::placeholder {
      color: #64748b;
    }
  }
`;

export const SalaryRange = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  input {
    flex: 1;
    padding: 0.625rem 0.75rem;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: ${radius.md};
    color: #fff;
    font-size: 0.875rem;
    transition: ${transitions.hover};

    &:focus {
      outline: none;
      border-color: #f59e0b;
    }

    &::placeholder {
      color: #64748b;
    }
  }

  span {
    color: #64748b;
    font-size: 0.8125rem;
    font-weight: ${typography.weights.medium};
    white-space: nowrap;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0.75rem;

    span {
      order: -1;
    }
  }
`;

export const ComposerActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
  padding: 1.25rem 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.05);

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 1rem;
    gap: 0.5rem;
  }
`;

export const ActionBtn = styled.button<{ $variant?: 'primary' | 'secondary' }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem 1.25rem;
  border-radius: ${radius.lg};
  font-size: 0.875rem;
  font-weight: ${typography.weights.medium};
  cursor: pointer;
  transition: ${transitions.hover};
  border: none;
  font-family: inherit;

  ${props =>
    props.$variant === 'primary'
      ? `
    background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
    color: #000;

    &:hover:not(:disabled) {
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(245, 158, 11, 0.3);
    }
  `
      : `
    background: transparent;
    border: 1px solid rgba(255, 255, 255, 0.2);
    color: #94a3b8;

    &:hover:not(:disabled) {
      background: rgba(255, 255, 255, 0.05);
      color: #fff;
      border-color: rgba(255, 255, 255, 0.3);
    }
  `}

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  svg {
    width: 18px;
    height: 18px;
  }

  @media (max-width: 768px) {
    width: 100%;
    padding: 0.75rem 1rem;
  }
`;
