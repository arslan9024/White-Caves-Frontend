import styled, { keyframes } from 'styled-components';
import { typography } from '../styles/theme/typography';
import { transitions } from '../styles/theme/transitions';
import { radius } from '../styles/theme/radius';

// Keyframes
const slideIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-50%) translateX(20px);
  }
  to {
    opacity: 1;
    transform: translateY(-50%) translateX(0);
  }
`;

export const MapInfoWindow = styled.div`
  position: absolute;
  top: 50%;
  right: 2rem;
  transform: translateY(-50%);
  width: 320px;
  background: var(--bg-primary, #ffffff);
  border-radius: 0.75rem;
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.12);
  overflow: hidden;
  z-index: var(--z-popover, 110);
  animation: ${slideIn} 0.3s ease;

  @media (max-width: 768px) {
    width: 280px;
    right: 1rem;
  }
`;

export const InfoHeader = styled.div`
  padding: 1.25rem;
  background: var(--primary-color, #1a365d);
  color: var(--text-on-primary, #ffffff);
`;

export const InfoTitle = styled.h4`
  font-family: ${typography.fontFamily.heading};
  font-size: 1.1rem;
  margin-bottom: 0.25rem;
  margin: 0;
`;

export const AreaType = styled.span<{ type?: 'luxury' | 'residential' | 'commercial' }>`
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: ${radius.full};
  font-size: 0.7rem;
  font-weight: ${typography.weights.semibold};
  text-transform: uppercase;
  background: rgba(255, 255, 255, 0.2);
  margin-top: 0.5rem;

  ${props =>
    props.type === 'luxury' &&
    `
    background: var(--secondary-color, #c53030);
  `}

  ${props =>
    props.type === 'residential' &&
    `
    background: var(--success-color, #38a169);
  `}

  ${props =>
    props.type === 'commercial' &&
    `
    background: rgba(255, 255, 255, 0.3);
  `}
`;

export const InfoProperties = styled.div`
  max-height: 300px;
  overflow-y: auto;
  padding: 1rem;
`;

export const PropertyPreview = styled.div`
  display: flex;
  gap: 0.75rem;
  padding: 0.75rem;
  background: var(--bg-light, #f7fafc);
  border-radius: 0.5rem;
  margin-bottom: 0.75rem;
  cursor: pointer;
  transition: ${transitions.hover};

  &:hover {
    background: var(--bg-tertiary, #edf2f7);
    transform: translateX(4px);
  }

  &:last-child {
    margin-bottom: 0;
  }
`;

export const PropertyImage = styled.img`
  width: 80px;
  height: 60px;
  object-fit: cover;
  border-radius: 0.375rem;
`;

export const PreviewInfo = styled.div`
  flex: 1;
`;

export const PreviewTitle = styled.h5`
  font-size: 0.9rem;
  font-weight: ${typography.weights.semibold};
  color: var(--text-primary, #1a202c);
  margin-bottom: 0.25rem;
  margin: 0;
`;

export const PreviewPrice = styled.div`
  font-size: 0.85rem;
  font-weight: ${typography.weights.bold};
  color: var(--secondary-color, #c53030);
  margin-bottom: 0.25rem;
`;

export const PreviewDetails = styled.span`
  font-size: 0.75rem;
  color: var(--text-muted, #718096);
`;

export const NoProperties = styled.div`
  text-align: center;
  color: var(--text-muted, #718096);
  padding: 1rem;
`;

export const ViewAllButton = styled.button`
  display: block;
  width: calc(100% - 2rem);
  margin: 1rem;
  padding: 0.875rem;
  background: var(--primary-color, #1a365d);
  border: none;
  border-radius: 0.75rem;
  color: var(--text-on-primary, #ffffff);
  font-family: ${typography.fontFamily.heading};
  font-weight: ${typography.weights.semibold};
  cursor: pointer;
  transition: ${transitions.hover};

  &:hover {
    background: var(--primary-hover, #234773);
  }
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  width: 28px;
  height: 28px;
  background: var(--bg-light, #f7fafc);
  border: none;
  border-radius: 50%;
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: var(--z-contentHover, 2);
`;

// Map Legend
export const MapLegend = styled.div`
  margin-top: 1.5rem;
  padding: 1rem;
  background: var(--bg-primary, #ffffff);
  border-radius: 0.75rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.06);
`;

export const LegendTitle = styled.h4`
  font-family: ${typography.fontFamily.heading};
  font-size: 0.9rem;
  color: var(--text-primary, #1a202c);
  margin-bottom: 0.75rem;
  margin: 0;
`;

export const LegendItems = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
`;

export const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
`;

export const LegendDot = styled.div<{ $color: string }>`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: ${props => props.$color};
  flex-shrink: 0;
`;
