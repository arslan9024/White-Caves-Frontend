import styled from 'styled-components';
import { theme } from '../../../styles/theme';

const { radius, typography } = theme;

/* ============================================================================
 * Job Preview Styled Components
 * ============================================================================ */

export const JobPreview = styled.div`
  padding: 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  background: rgba(255, 255, 255, 0.02);

  h4 {
    color: #94a3b8;
    font-size: 0.8125rem;
    font-weight: ${typography.weights.semibold};
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin: 0 0 1rem 0;
  }

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

export const PreviewCard = styled.div`
  background: rgba(15, 23, 42, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  padding: 1.5rem;
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 1rem;
    border-radius: ${radius.lg};
  }
`;

export const PreviewHeader = styled.div`
  h3 {
    color: #fff;
    font-size: 1.125rem;
    font-weight: ${typography.weights.semibold};
    margin: 0;
  }

  .company {
    color: #f59e0b;
    font-size: 0.875rem;
    font-weight: ${typography.weights.medium};
    margin-top: 0.25rem;
  }

  @media (max-width: 768px) {
    h3 {
      font-size: 1rem;
    }
  }
`;

export const PreviewMeta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);

  span {
    display: flex;
    align-items: center;
    gap: 0.375rem;
    color: #64748b;
    font-size: 0.8125rem;

    svg {
      width: 16px;
      height: 16px;
      flex-shrink: 0;
    }
  }

  @media (max-width: 768px) {
    gap: 0.75rem;
    font-size: 0.75rem;
  }
`;

export const PreviewSection = styled.div`
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.05);

  h5 {
    color: #94a3b8;
    font-size: 0.8125rem;
    font-weight: ${typography.weights.semibold};
    margin: 0 0 0.5rem 0;
  }

  p {
    color: #cbd5e1;
    font-size: 0.875rem;
    line-height: 1.6;
    margin: 0;
    white-space: pre-line;
  }

  @media (max-width: 768px) {
    h5 {
      font-size: 0.75rem;
    }

    p {
      font-size: 0.8125rem;
    }
  }
`;
