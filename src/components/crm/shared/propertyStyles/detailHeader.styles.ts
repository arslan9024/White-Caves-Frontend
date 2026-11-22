import styled from 'styled-components';
import { theme } from '../../../../styles/theme';

const { radius, typography } = theme;

// ============================================================================
// Property Detail Container
// ============================================================================

export const PropertyDetailContainer = styled.div`
  background: rgba(15, 23, 42, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: ${radius.xl};
  padding: 1.5rem;

  @media (max-width: 768px) {
    padding: 1rem;
    border-radius: ${radius.lg};
  }
`;

export const DetailHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1.5rem;
  gap: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

export const HeaderInfo = styled.div`
  flex: 1;

  h2 {
    font-size: 1.25rem;
    font-weight: ${typography.weights.semibold};
    color: #fff;
    margin: 0 0 0.5rem 0;
  }

  @media (max-width: 768px) {
    h2 {
      font-size: 1.125rem;
    }
  }
`;

export const PropertyAddress = styled.p`
  display: flex;
  align-items: center;
  gap: 0.375rem;
  color: #64748b;
  font-size: 0.875rem;
  margin: 0;

  svg {
    width: 16px;
    height: 16px;
    flex-shrink: 0;
  }
`;

export const HeaderPrice = styled.div`
  text-align: right;

  @media (max-width: 768px) {
    text-align: left;
  }
`;

export const PriceLabel = styled.span`
  display: block;
  font-size: 0.75rem;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 0.25rem;
`;

export const PriceValue = styled.span`
  display: block;
  font-size: 1.25rem;
  font-weight: ${typography.weights.bold};
  color: #10b981;

  @media (max-width: 768px) {
    font-size: 1.125rem;
  }
`;

export const CloseBtn = styled.button`
  background: transparent;
  border: none;
  color: #64748b;
  cursor: pointer;
  padding: 0.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.2s ease;

  &:hover {
    color: #fff;
  }

  svg {
    width: 24px;
    height: 24px;
  }
`;
