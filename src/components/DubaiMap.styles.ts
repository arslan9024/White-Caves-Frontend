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

const markerPulse = keyframes`
  0% {
    opacity: 0.2;
    transform-origin: center;
    transform: scale(1);
  }
  50% {
    opacity: 0.1;
    transform: scale(1.3);
  }
  100% {
    opacity: 0.2;
    transform: scale(1);
  }
`;

// Container
export const DubaiMapContainer = styled.div`
  padding: 3rem 5%;
  background: linear-gradient(135deg, var(--bg-light, #f7fafc) 0%, var(--bg-primary, #ffffff) 100%);

  @media (max-width: 768px) {
    padding: 2rem 5%;
  }
`;

// Header
export const MapHeader = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;

export const MapTitle = styled.h2`
  font-family: ${typography.fontFamily.heading};
  font-size: 2rem;
  color: var(--primary-color, #1a365d);
  margin-bottom: 0.5rem;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

export const MapSubtitle = styled.p`
  color: var(--text-muted, #718096);
  font-size: 1rem;

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

// Filters
export const MapFilters = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-bottom: 2rem;
`;

export const FilterButton = styled.button<{
  $isActive?: boolean;
  $variant?: 'residential' | 'commercial' | 'luxury';
}>`
  padding: 0.75rem 1.5rem;
  background: ${props =>
    props.$isActive ? 'var(--primary-color, #1a365d)' : 'var(--bg-primary, #ffffff)'};
  border: 2px solid
    ${props => (props.$isActive ? 'var(--primary-color, #1a365d)' : 'var(--border-color, #e2e8f0)')};
  border-radius: ${radius.full};
  font-family: ${typography.fontFamily.primary};
  font-size: 0.9rem;
  font-weight: ${typography.weights.medium};
  color: ${props =>
    props.$isActive ? 'var(--text-on-primary, #ffffff)' : 'var(--text-primary, #1a202c)'};
  cursor: pointer;
  transition: ${transitions.hover};

  &:hover {
    border-color: var(--primary-color, #1a365d);
  }

  ${props =>
    props.$isActive &&
    props.$variant === 'residential' &&
    `
    background: var(--success-color, #38a169);
    border-color: var(--success-color, #38a169);
  `}

  ${props =>
    props.$isActive &&
    props.$variant === 'commercial' &&
    `
    background: var(--primary-color, #1a365d);
    border-color: var(--primary-color, #1a365d);
  `}

  ${props =>
    props.$isActive &&
    props.$variant === 'luxury' &&
    `
    background: var(--secondary-color, #c53030);
    border-color: var(--secondary-color, #c53030);
  `}
`;

// Map Wrapper
export const MapWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 500px;
  background: var(--bg-tertiary, #edf2f7);
  border-radius: 0.75rem;
  overflow: hidden;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    height: 350px;
  }
`;

export const MapBackground = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

export const DubaiBaseMap = styled.img`
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const InteractiveMapOverlay = styled.div`
  position: absolute;
  inset: 0;
`;

export const MapSVG = styled.svg`
  width: 100%;
  height: 100%;
`;

// Markers
export const MarkerGroup = styled.g`
  cursor: pointer;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.1);
  }

  &.active .marker-dot {
    stroke: var(--primary-color, #c9a84c);
    stroke-width: 3;
  }
`;

export const MarkerPulse = styled.circle`
  animation: ${markerPulse} 2s infinite;
`;

export const MarkerDot = styled.circle`
  transition: ${transitions.hover};
`;

export const MarkerLabel = styled.text`
  pointer-events: none;
  text-shadow:
    1px 1px 2px white,
    -1px -1px 2px white;
`;

// Info Window
export * from './DubaiMapInfoWindow.styles';
