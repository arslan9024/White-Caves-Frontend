import styled from 'styled-components';
import {
  colors,
  mediaQueries,
  radius,
  reducedMotion,
  shadows,
  spacing,
  transitions,
} from './tokens';

// ==============================================================================
// SERVICE CONTENT
// ==============================================================================

export const ServiceContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 28px;
`;

export const ServiceHeader = styled.div`
  border-bottom: 2px solid ${colors.border};
  padding-bottom: 20px;
`;

export const ServiceTitle = styled.h2`
  font-size: 24px;
  font-weight: 600;
  margin: 0 0 ${spacing.sm} 0;
  color: ${colors.text.primary};
`;

export const ServiceDescription = styled.p`
  margin: 0;
  color: ${colors.text.secondary};
  font-size: 14px;
`;

// ==============================================================================
// SERVICES SECTION
// ==============================================================================

export const ServicesSection = styled.div``;

export const ServicesSectionHeading = styled.h2`
  font-size: 20px;
  font-weight: 600;
  margin: 0 0 ${spacing.md} 0;
  color: ${colors.text.primary};
`;

export const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: ${spacing.md};

  ${mediaQueries.tablet} {
    grid-template-columns: 1fr;
  }
`;

export const ServiceCard = styled.div`
  background: ${colors.background.tertiary};
  border: 2px solid ${colors.border};
  border-radius: 10px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: ${radius.xl};
  transition: ${transitions.hover};
  cursor: pointer;
  user-select: none;
  outline: none;

  &:hover {
    border-color: ${colors.primary};
    box-shadow: ${shadows.elevated};
    transform: translateY(-4px);
  }

  &:focus-visible {
    border-color: ${colors.primary};
    box-shadow: ${shadows.focus};
  }

  ${reducedMotion} {
    transition: none;
    &:hover {
      transform: none;
    }
  }

  /* Dark Mode */
  [data-theme='dark'] & {
    background: ${colors.background.dark};
    border-color: #333333;
  }
`;

export const ServiceCardTitle = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: ${colors.text.primary};
  margin: 0;

  ${mediaQueries.mobile} {
    font-size: 14px;
  }
`;

export const ServiceCardDescription = styled.p`
  font-size: 13px;
  color: ${colors.text.secondary};
  margin: 0;
  line-height: 1.5;
`;

export const ServiceCardAction = styled.button`
  background: transparent;
  border: none;
  color: ${colors.primary};
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  min-height: 44px;
  padding: ${spacing.xs} 0;
  margin-top: ${spacing.xs};
  transition: ${transitions.standard};
  text-align: left;
  outline: none;

  &:hover {
    transform: translateX(4px);
  }

  &:focus-visible {
    outline: 2px solid ${colors.primary};
    outline-offset: 2px;
    border-radius: ${radius.sm};
  }

  ${reducedMotion} {
    transition: none;
    &:hover {
      transform: none;
    }
  }
`;

// ==============================================================================
// ACTIONS SECTION
// ==============================================================================

export const ActionsSection = styled.div``;

export const ActionsSectionHeading = styled.h3`
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 ${radius.xl} 0;
  color: ${colors.text.primary};
`;

export const ActionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 10px;

  ${mediaQueries.tablet} {
    grid-template-columns: repeat(2, 1fr);
  }

  ${mediaQueries.mobile} {
    grid-template-columns: 1fr;
  }
`;

export const ActionButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${spacing.sm};
  padding: ${radius.xl} ${spacing.md};
  min-height: 44px;
  background: ${colors.background.tertiary};
  border: 1px solid ${colors.border};
  border-radius: ${radius.lg};
  cursor: pointer;
  color: ${colors.text.primary};
  font-size: 13px;
  font-weight: 500;
  transition: ${transitions.hover};
  outline: none;

  svg {
    flex-shrink: 0;
  }

  &:hover {
    background: ${colors.primary};
    color: ${colors.text.inverse};
    border-color: ${colors.primary};
    transform: translateY(-2px);
    box-shadow: ${shadows.elevated};
  }

  &:active {
    transform: translateY(0);
    box-shadow: ${shadows.focus};
  }

  &:focus-visible {
    outline: 2px solid ${colors.primary};
    outline-offset: 2px;
  }

  ${reducedMotion} {
    transition: none;
    &:hover {
      transform: none;
    }
  }

  /* Dark Mode */
  [data-theme='dark'] & {
    background: ${colors.background.dark};
    border-color: #333333;
  }
`;
