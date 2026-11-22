import styled from 'styled-components';
import { theme } from '../../../../styles/theme';

const { radius, typography } = theme;

// ============================================================================
// Detail Sections
// ============================================================================

export const DetailSection = styled.div`
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);

  h4 {
    font-size: 0.875rem;
    font-weight: ${typography.weights.semibold};
    color: #94a3b8;
    margin: 0 0 1rem 0;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  @media (max-width: 768px) {
    margin-top: 1.25rem;
    padding-top: 1.25rem;

    h4 {
      font-size: 0.8125rem;
    }
  }
`;

export const OwnerCard = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.02);
  border-radius: 10px;

  @media (max-width: 768px) {
    padding: 0.75rem;
    gap: 0.75rem;
  }
`;

export const OwnerAvatar = styled.div`
  width: 48px;
  height: 48px;
  border-radius: ${radius.xl};
  background: #b45309;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 1.25rem;
  font-weight: ${typography.weights.semibold};
  flex-shrink: 0;

  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
    font-size: 1rem;
  }
`;

export const OwnerDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  flex: 1;
`;

export const OwnerName = styled.span`
  font-weight: ${typography.weights.semibold};
  color: #fff;
  font-size: 0.9375rem;

  @media (max-width: 768px) {
    font-size: 0.875rem;
  }
`;

export const OwnerContact = styled.span`
  font-size: 0.8125rem;
  color: #64748b;

  @media (max-width: 768px) {
    font-size: 0.75rem;
  }
`;

// ============================================================================
// Financial Grid
// ============================================================================

export const FinancialGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
    gap: 0.75rem;
  }
`;

export const FinancialItem = styled.div`
  padding: 1rem;
  background: rgba(255, 255, 255, 0.02);
  border-radius: ${radius.lg};

  @media (max-width: 768px) {
    padding: 0.75rem;
  }
`;

export const FinLabel = styled.span`
  display: block;
  font-size: 0.75rem;
  color: #64748b;
  margin-bottom: 0.25rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

export const FinValue = styled.span`
  display: block;
  font-size: 1rem;
  font-weight: ${typography.weights.semibold};
  color: #fff;

  @media (max-width: 768px) {
    font-size: 0.9375rem;
  }
`;

// ============================================================================
// Description Section
// ============================================================================

export const DescriptionSection = styled.div`
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);

  h4 {
    font-size: 0.875rem;
    font-weight: ${typography.weights.semibold};
    color: #94a3b8;
    margin: 0 0 1rem 0;
    text-transform: uppercase;
  }

  p {
    color: #94a3b8;
    font-size: 0.875rem;
    line-height: 1.6;
    margin: 0;
    white-space: pre-wrap;
  }

  @media (max-width: 768px) {
    margin-top: 1.25rem;
    padding-top: 1.25rem;

    h4 {
      font-size: 0.8125rem;
    }

    p {
      font-size: 0.8125rem;
    }
  }
`;
