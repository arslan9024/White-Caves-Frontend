import styled from 'styled-components';
import { colors, mediaQueries, radius, shadows, spacing } from './tokens';

// ==============================================================================
// MAIN CONTAINER
// ==============================================================================

export const DepartmentPanel = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background: ${colors.background.secondary};
  border-radius: ${radius.xl};
  overflow-y: auto;
  box-shadow: ${shadows.sm};

  /* Scrollbar Styling */
  &::-webkit-scrollbar {
    width: ${spacing.sm};
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: ${colors.border};
    border-radius: ${radius.sm};

    &:hover {
      background: ${colors.text.secondary};
    }
  }

  /* Dark Mode */
  [data-theme='dark'] & {
    background: ${colors.background.dark};
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  }

  /* Empty State Styles */
  &.empty {
    align-items: center;
    justify-content: center;
  }
`;

// ==============================================================================
// HEADER
// ==============================================================================

export const ContentHeader = styled.div`
  padding: ${spacing.xl} 28px;
  color: ${colors.text.inverse};
  position: relative;
  overflow: hidden;

  /* Circular background decoration */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    right: -50px;
    width: 200px;
    height: 200px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: ${radius.full};
    z-index: 0;
  }

  ${mediaQueries.tablet} {
    padding: ${spacing.lg} 20px;
  }

  ${mediaQueries.mobile} {
    padding: ${spacing.md} 12px;
  }
`;

export const HeaderContent = styled.div`
  position: relative;
  z-index: 1;
`;

export const ContentBreadcrumbs = styled.nav`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: ${spacing.xs};
  margin-bottom: ${spacing.sm};
  opacity: 0.9;
  font-size: 12px;

  ${mediaQueries.tablet} {
    font-size: 11px;
  }
`;

export const BreadcrumbItem = styled.span<{ $isCurrent?: boolean }>`
  font-weight: ${props => (props.$isCurrent ? 700 : 500)};
  text-transform: uppercase;
  letter-spacing: 0.4px;
`;

export const BreadcrumbSeparator = styled.span`
  opacity: 0.7;
`;

export const HeaderTitle = styled.h1`
  font-size: 32px;
  font-weight: 700;
  margin: 0 0 ${spacing.sm} 0;
  letter-spacing: -0.5px;

  ${mediaQueries.tablet} {
    font-size: 24px;
  }

  ${mediaQueries.mobile} {
    font-size: 18px;
  }
`;

export const HeaderDescription = styled.p`
  font-size: 14px;
  margin: 0;
  opacity: 0.95;
  font-weight: 400;

  ${mediaQueries.mobile} {
    font-size: 12px;
  }
`;

// ==============================================================================
// CONTENT BODY
// ==============================================================================

export const ContentBody = styled.div`
  flex: 1;
  padding: 28px;
  display: flex;
  flex-direction: column;
  gap: ${spacing.xl};

  ${mediaQueries.tablet} {
    padding: 20px;
    gap: ${spacing.lg};
  }

  ${mediaQueries.mobile} {
    padding: 12px;
    gap: ${spacing.md};
  }
`;

// ==============================================================================
// EMPTY STATE
// ==============================================================================

export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 40px;
  text-align: center;
  color: ${colors.text.secondary};

  ${mediaQueries.tablet} {
    padding: 40px ${spacing.lg};
  }

  ${mediaQueries.mobile} {
    padding: 30px 20px;
  }
`;

export const EmptyStateIcon = styled.svg`
  color: ${colors.border};
  margin-bottom: ${spacing.lg};
  opacity: 0.5;

  ${mediaQueries.tablet} {
    width: 48px;
    height: 48px;
  }
`;

export const EmptyStateHeading = styled.h2`
  font-size: 24px;
  font-weight: 600;
  margin: 0 0 ${radius.xl} 0;
  color: ${colors.text.primary};

  ${mediaQueries.tablet} {
    font-size: 20px;
  }
`;

export const EmptyStateText = styled.p`
  font-size: 14px;
  max-width: 400px;
  opacity: 0.7;
`;
