import styled from 'styled-components';
import { theme } from '../../../../styles/theme';

const { typography } = theme;

// ============================================================================
// Property Specs Grid
// ============================================================================

export const PropertySpecsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 1rem;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.02);
  border-radius: 10px;
  margin-top: 1rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    gap: 0.75rem;
    padding: 0.75rem;
  }
`;

export const SpecItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: #64748b;
  padding: 0.5rem;

  svg {
    flex-shrink: 0;
    width: 20px;
    height: 20px;
  }

  @media (max-width: 768px) {
    gap: 0.5rem;
    padding: 0.375rem;

    svg {
      width: 18px;
      height: 18px;
    }
  }
`;

export const SpecContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

export const SpecValue = styled.span`
  font-size: 0.9375rem;
  font-weight: ${typography.weights.semibold};
  color: #fff;

  @media (max-width: 768px) {
    font-size: 0.875rem;
  }
`;

export const SpecLabel = styled.span`
  font-size: 0.75rem;
  color: #64748b;

  @media (max-width: 768px) {
    font-size: 0.7rem;
  }
`;
